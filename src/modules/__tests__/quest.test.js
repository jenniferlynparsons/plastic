import Quest from "../quest";

jest.mock("../inventory");

const sampleData = {
  questType: "adventure",
  name: "Basic Quest",
  state: "active",
  inventory: {},
  precondition: () => true,
  postcondition: () => true
};

it("works", () => {
  const obj = new Quest(sampleData);
  expect(obj.name).toBe("Basic Quest");
  expect(obj.state).toBe("active");
});
