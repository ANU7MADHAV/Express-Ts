import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (email: string) => {
  return jwt.sign({ data: email }, process.env.SE || "", { expiresIn: "1d" });
};
