import { describe, expect, test, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prismaClient } from "../__mocks__/db";
// vi.mock("../db", () => ({
//   prismaClient: { sum: { create: vi.fn() } },
// }));
//use this if u don't want to monk using the v-test-mock-extended which provides advantage of mocking all the prismaClient keys with out explicity writing all the functions like above NOTE: __mokes__ folder is to be defined in same folder
vi.mock("../db");
describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    prismaClient.sum.create.mockResolvedValue({
      id: 3,
      a: 1,
      b: 2,
      result: 3,
    });
    //mockResolvedValue returns the values of the specified as we are accessing the id in the res.json({id : user.id}) in the response to remove the type error we provide this
    vi.spyOn(prismaClient.sum, "create");
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(prismaClient.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
      },
    }); // testing the create function is called with right key-value pairs

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
    expect(res.body.id).toBe(3);
  });
  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });
  it("should return the sum of two negative numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: -1,
      b: -2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-3);
  });

  it("should return the sum of two zero number", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });
});
