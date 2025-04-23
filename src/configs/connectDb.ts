import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env";

class DbConnection {
  async connectDB() {
    try {
      const res = await mongoose.connect(MONGO_URI);
      console.log(`DB Connecting ${res.connection.host}`);
    } catch (error) {
      console.log("Error in connectin db: ", error);
      process.exit(1);
    }
  }
}

export default DbConnection;
