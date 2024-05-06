import mongoose, { Types } from "mongoose";

export type UserType = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  courses?: [];
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;
