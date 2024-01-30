import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    salt: { type: String, required: true },
    otp: { type: String, required: true, default: "", expires: 600 },

    role: { type: String, default: "admin" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret._v;
      },
    },
    timestamps: true,
  }
);

export const AdminModel = mongoose.model("Admin", AdminSchema);
