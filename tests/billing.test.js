import { TestWatcher } from "jest";
import { calculatedCost } from "../libs/billing";

test("Lowest Tier", () => {
  const storage = 10;

  const cost = 4000;
  const expectedCost = calculatedCost(storage);
  expect(cost).toEqual(expectedCost);
});

test("Middle Tier", () => {
  const storage = 100;

  const cost = 20000;
  const expectedCost = calculatedCost(storage);
  expect(cost).toEqual(expectedCost);
});

test("Highest Tier", () => {
  const storage = 101;

  const cost = 10100;
  const expectedCost = calculatedCost(storage);
  expect(cost).toEqual(expectedCost);
});
