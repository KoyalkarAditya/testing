import { describe, expect, it, test } from "@jest/globals";
import { multiply, sum } from "../index";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("add of 5 , 5 is 10", () => {
    expect(sum(5, 5)).toBe(10);
  });
});

describe("multiply module", () => {
  it("mul of 2 and 3 equal to 6", () => {
    expect(multiply(2, 3)).toBe(6);
  });
  it("MUL of 5 , 5 is 25", () => {
    expect(multiply(5, 5)).toBe(25);
  });
});
