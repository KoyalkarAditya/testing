import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

export const prismaClient = mockDeep<PrismaClient>();

// this monks automatically all the prismaClient keys
//NOTE: __mokes__ folder is to be defined in same folder as original db.ts
