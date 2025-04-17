import "dotenv/config";
import express from "express";
import { PORT } from "./utils/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
