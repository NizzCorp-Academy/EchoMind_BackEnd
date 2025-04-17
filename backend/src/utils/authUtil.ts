import bcrypt from "bcrypt";

/**
 * @author Jaseem
 * @fiel authUtil.ts
 * @brief AuthUtils - Utility class for authentication-related functions.
 */

class AuthUtils {
  /**
   * @brief Generates a JWT token for the user.
   * @param password string - The password to be hashed.
   * @returns Promise<string> - A promise that resolves to the hashed password.
   * @throws Error - Throws an error if hashing fails.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  /**
   * @brief Compares a password with a hashed password.
   * @param password string - The password to be compared.
   * @param hash string - The hashed password to compare against.
   * @returns Promise<boolean> - A promise that resolves to true if the passwords match, false otherwise.
   * @throws Error - Throws an error if comparison fails.
   */
  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}

export default AuthUtils;
