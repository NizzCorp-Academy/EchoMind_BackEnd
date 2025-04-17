import AuthUtils from "../utils/authUtil";
import UserModel from "../models/userModel";

class UserService {
  /**
   * @author Jaseem
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
    const hash = authUtil.hashPassword(password);
    const user = new UserModel({
      username,
      email,
      password: hash,
    });
    await user.save();
    return user;
  }
}

export default UserService;
