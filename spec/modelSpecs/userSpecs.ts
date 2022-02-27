import { User } from "../../src/models/user";

const user = new User();
describe("User Model", () => {
  // Do methods exists

  it("should have create method", () => {
    expect(user.create).toBeDefined();
  });

  it("should have index method ", () => {
    expect(user.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(user.show).toBeDefined();
  });

  // Test methods

  it("create method should add user", async () => {
    const result = await user.create({
      firstname: "test_fname",
      lastname: "test_lname",
      password: "test_password",
    });

    expect(result.id?.toString()).toEqual("1");
  });
});
