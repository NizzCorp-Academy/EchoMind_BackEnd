import UserService from "../services/userService";

/**
 * @class UserControll
 * @file userController.ts
 * @date 2025-04-19
 * @author Muhamamd Haseen
 * @brief Controller class for handling user-related operations.
 *
 * This controller currently supports retrieval of a user by their ID.
 *
 * @note Consider renaming to UserController for consistency.
 */

class UserControll {
  /**
   * @function getUser
   * @brief Retrieves user information based on the provided user ID.
   *
   * @param userId The unique identifier of the user to retrieve.
   * @return The user object corresponding to the provided ID.
   *
   * @details
   * This method utilizes the UserService to fetch user details by their ID.
   * It does not currently include error handling—consider adding validation
   * and error responses for production readiness.
   */

  async getUser(userId: string) {
    const userService = new UserService();
    const user = await userService.getUserById(userId);
    return user;
  }
}

export default UserControll;
