import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/SECRETS";

export const GenSalt = async () => {
  return await bcrypt.genSalt();
};

export const GenEncpass = async (pass, salt) => {
  return await bcrypt.hash(pass, salt);
};

export const ValidatePassword = async (enteredPassword, EncPassword, salt) => {
  //comparing both pass
  return (await GenEncpass(enteredPassword, salt)) === EncPassword;
};

//validate Signature
export const validateSignature = async (req) => {
  const signature = req.get("Authorization");
  if (signature) {
    const payload = await jwt.verify(signature.split(" ")[1], JWT_SECRET);
    req.user = payload;
    return true;
  }
  return false;
};
