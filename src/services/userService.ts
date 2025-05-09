import AuthUtils from "../utils/authUtil.js";
import UserModel from "../models/userModel.js";
import { ErrorMessage } from "../utils/errorMessasge.js";
/**
 * @author Jaseem
 * @description UserService class handles user-related operations such as registration, login, and fetching user details.
 * @class UserService
 *
 */

class UserService {
    /**
     * @biref registerUser - Registers a new user in the system.
     *
     * @param username string - username of the user
     * @param email string - email of the user
     * @param password string - password of the user
     * @returns Promise<> - Returns a promise that resolves when the user is registered.
     * @throws Error - Throws an error if the user already exists or if there is a problem with the database.
     */
    async registerUser(username: string, email: string, password: string) {
        const authUtil = new AuthUtils();
        const isExist = await this.doesExistEmail(email);
        if (isExist) {
            throw new ErrorMessage(
                "User already exists with this email",
                400,
                "us01"
            );
        }
        const hash = await authUtil.hashPassword(password);
        let user = await UserModel.create({
            username,
            email,
            password: hash,
        });
        user.password = "";

        return user;
    }

    /**
     * @berif loginUser - Logs in a user by verifying their email and password.
     * @param email string - email of the user
     * @param password string - password of the user
     * @returns return user object if login is successful
     * @throws Error - Throws an error if the user does not exist or if the password is incorrect.
     */
    async logninUser(email: string, password: string) {
        const authUtil = new AuthUtils();
        const user = await UserModel.findOne({ email });
        console.log(email);
        if (!user) {
            throw new ErrorMessage(
                "User does not exist with this email",
                400,
                "us02a"
            );
        }
        const isMatch = await authUtil.comparePassword(password, user.password);
        if (!isMatch) {
            throw new ErrorMessage("Password is incorrect", 400, "us02b");
        }
        return user;
    }

    /**
     * @brief doesExistEmail - Checks if a user exists with the given email.
     * @param email string - email of the user
     * @returns boolean - Returns true if the user exists, false otherwise.
     *
     */
    async doesExistEmail(email: string) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @brief getUserById - Fetches a user by their ID.
     * @param id string - id of the user
     * @returns user object - Returns the user object if found.
     * @throws Error - Throws an error if the user is not found.
     */
    async getUserById(id: string) {
        let user = await UserModel.findById(id);
        if (!user) {
            throw new ErrorMessage("User not found", 404, "us03");
        }
        user.password = "";
        return user;
    }
}

export default UserService;
