export const AdminRouter = express.Router();
import {
  CreateAdmin,
  verify_admin_otp,
  CreateAdminEmployee,
  AdminLogin,
} from "../controllers";

AdminRouter.post("/create", CreateAdmin);
AdminRouter.post("/employee", CreateAdminEmployee);
AdminRouter.post("/login", AdminLogin);
AdminRouter.get("/verify/otp", verify_admin_otp);
