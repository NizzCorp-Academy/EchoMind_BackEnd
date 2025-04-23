import "dotenv/config";
import { getEnv } from "../utils/env";

describe("Environment Variables", () => {
  it("should return the value of an environment variable", () => {
    expect(getEnv("PORT")).toBe(process.env.PORT?.toString());
  });
  it("should end process if there is no env with the name", () => {
    jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error(`process.exit(1) called`);
    });

    expect(() => getEnv("NON_EXISTENT_ENV")).toThrow("process.exit(1) called");
  });
});
