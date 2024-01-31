export const AdminEmployeeRouter = express.Router();

AdminEmployeeRouter.get("/profile", getEmployeeProfile);
