import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parsedResponse = sumInput.safeParse(req.body);

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;
  const user = await prismaClient.sum.create({
    data: {
      a: parsedResponse.data.b,
      b: parsedResponse.data.b,
      result: answer,
    },
  });
  console.log(user);
  res.json({
    answer,
    id: user.id,
  });
});

app.get("/sum", (req, res) => {
  const parsedResponse = sumInput.safeParse({
    a: Number(req.headers["a"]),
    b: Number(req.headers["b"]),
  });

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  res.json({
    answer,
  });
});
