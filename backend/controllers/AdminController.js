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
        const admin = await FindAdmin("", email);
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
        res.json({ message: "otp sent to your mail" });
      } else {
        res.json({ error: "Wrong Credentials..." });
      }

      // send token
    }
  } else {
    res.json({ message: "Email not found" });
  }
};

//admin otp verify
verify_admin_otp = async function (req, res, next) {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    const adminData = await FindAdmin("", email);

    if (Number(adminData.otp) === otp) {
      const token = await createToken({
        _id: adminData._id,
        role: adminData.role,
        
      });
      res.cookie("adminToken", token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      });
      await AdminModel.findByIdAndUpdate({ _id: adminData._id }, { otp: null });
      const signature = generateSignature({
        _id: existingVendor._id,
        email: existingVendor.email,
        foodTypes: existingVendor.foodTypes,
        name: existingVendor.name,
      });
      return res.json(signature);
    } else {
      responseReturn(res, 401, { error: "Invalid OTP" });
    }
  } catch (err) {
    responseReturn(res, 500, { error: "Internal server error " });
  }
};
