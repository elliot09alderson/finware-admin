import { AdminModel } from "../models/AdminSchema";
import { ValidatePassword } from "../utils/passwordUtility";

export const FindAdmin = async (id, email) => {
  if (email) {
    return await AdminModel.findOne({ email });
  } else {
    return await AdminModel.findById(id);
  }
};

export const CreateAdmin = async (req, res, next) => {
  const { email, password, username, phone } = req.body;

  const isPresent = await FindAdmin(" ", email);
  if (isPresent) {
    return res.json({
      message: "Admin Already Exist",
    });
  }
  const admin = AdminModel.create({ email, password, username, phone });
  res.json({
    admin,
  });
};

export const CreateAdminEmployee = async (req, res, next) => {
  const {} = req.body;
};
// ****** ADmin login
export const AdminLogin = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (username || email) {
    if (username) {
      const admin = await AdminModel.findOne({ username });
      if (!admin) {
        res.json({
          code: 400,
          message: "admin doesn't exist, use valid credentials",
        });
      }
    } else {
      if (email) {
        const admin = await AdminModel.findOne({ email });
        const isValidated = await ValidatePassword(
          password,
          admin.password,
          admin.salt
        );

        if (!isValidated) {
          return res.json({ message: "invalid Credentials !" });
        }

        // Send mail
        await sendEmail(
          email,
          "Seller login OTP from one stop fashion hub",
          { name: admin.name, otp: otp },
          "./template/welcome.handlebars"
        );

        await AdminModel.updateOne({ _id: admin._id }, { otp: otp });
        responseReturn(res, 201, { message: "otp sent to your mail" });
      } else {
        responseReturn(res, 400, { error: "Wrong Credentials..." });
      }

      // send token
    }
  }
};
