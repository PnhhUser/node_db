import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    statusActive: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
