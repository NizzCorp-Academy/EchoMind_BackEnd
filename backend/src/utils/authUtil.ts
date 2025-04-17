import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

type JwtPayload = {
  userId: string;
};

/**
 * @author Jaseem
 * @fiel authUtil.ts
 * @brief AuthUtils - Utility class for authentication-related functions.
 */

class AuthUtils {
  /**
   * @method hashPassword
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
   * @method comparePassword
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

  /**
   * @method createToken
   * @brief create a JWT token with userId as payload.
   * @param userId string  the userId to be user as the payload
   * @returns string  return the Jwt token after signing
   */
  createToken(userId: string) {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "15d",
    });
    // const token = jwt.sign(userId, JWT_SECRET, {
    //   expiresIn: "15d",
    // });
    return token;
  }
  /**
   * @method verifyToken
   * @brief verify the token provide which the JWT SECRETE and return the payload
   * @param token string the token which needed to be verify
   * @returns returns the decoded data in this case userId after verifying
   */
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export default AuthUtils;
