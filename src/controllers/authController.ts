/**
 * @file authController.ts
 * @author Muhammad Haseen
 * @brief Controller for handling user authentication.
 *
 * This file contains the `AuthClass` which provides methods for user registration
 * and login functionality.
 */

import UserService from "../services/userService.js";
import AuthUtils from "../utils/authUtil.js";

/**
 * @class AuthClass
 * @brief Handles user authentication operations.
 *
 * This class provides methods for user registration and login functionality.
 */
class AuthClass {
    /**
     * @brief Registers a new user.
     *
     * This method registers a new user by creating a user record in the database
     * and generating an authentication token for the user.
     *
     * @param username The username of the user.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @return An object containing the registered user and their authentication token.
     * @throws Error If the registration process fails.
     */

    async register(username: string, email: string, password: string) {
        const userService = new UserService();
        const authUtils = new AuthUtils();
        const user = await userService.registerUser(username, email, password);
        const token = authUtils.createToken(user._id.toString());
        return { user, token };
    }

    /**
     * @brief Logs in an existing user.
     *
     * This method authenticates a user by verifying their email and password,
     * and generates an authentication token for the user.
     *
     * @param email The email address of the user.
     * @param password The password of the user.
     * @return An object containing the authenticated user and their authentication token.
     * @throws Error If the login process fails.
     */

    async login(email: string, password: string) {
        const userService = new UserService();
        const authUtils = new AuthUtils();
        const user = await userService.logninUser(email, password);
        const token = authUtils.createToken(user._id.toString());
        return { user, token };
    }
}

export default AuthClass;
