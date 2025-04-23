import "dotenv/config";
import AuthUtils from "../utils/authUtil";

describe("Auth Utils ", () => {
  it("should return a hashed value", async () => {
    const value = "valuetobehased";
    const authUtil = new AuthUtils();
    const hash = await authUtil.hashPassword(value);
    expect(hash).not.toBe(value);
  });
  it("should return a true  wheh try to compare hashed value", async () => {
    const value = "valuetobehased";
    const authUtil = new AuthUtils();
    const hash = await authUtil.hashPassword(value);
    await expect(authUtil.comparePassword(value, hash)).resolves.toBe(true);
  });
  it("should return a false wheh try to compare hashed value with any other passowrds", async () => {
    const value = "valuetobehased";
    const authUtil = new AuthUtils();
    const hash = await authUtil.hashPassword(value);
    await expect(
      authUtil.comparePassword("someotherpassword", hash)
    ).resolves.toBe(false);
  });
  it("should create a token and return it ", () => {
    const userId = "someuserid";
    const authUtil = new AuthUtils();
    const token = authUtil.createToken(userId);
    expect(token).not.toBe(userId);
  });
  it("should return the original payload ", () => {
    const userId = "someuserid";
    const authUtil = new AuthUtils();
    const token = authUtil.createToken(userId);
    const decode = authUtil.verifyToken(token);
    expect(decode?.userId).toBe(userId);
  });

  it("should return null if the token wasn't valid", () => {
    const authUtil = new AuthUtils();
    const decode = authUtil.verifyToken("sometoken");
    expect(decode).toBe(null);
  });
});
