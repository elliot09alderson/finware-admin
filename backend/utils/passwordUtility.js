import bcrypt from "bcrypt";

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
