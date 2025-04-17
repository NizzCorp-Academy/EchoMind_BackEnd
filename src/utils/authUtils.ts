// start 2.26pm
import { genSalt, compare, hash } from "bcrypt"

class AuthUtils {
    async hashingPassword(password: string) {
      const salt = await genSalt(10);
      const hashedpassword = await hash(password, salt);
      return hashedpassword;
    }
  
    async comparePassword(password: string, hash: string) {
      const res = await compare(password, hash);
      return res;
    }
  }
  
  export default AuthUtils;
  