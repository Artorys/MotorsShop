import { Router } from "express";
import {
  userDeleteController,
  userListSpecificController,
  userCreateController,
  userLoginController,
  userUpdateController,
} from "../controllers/user.controller";
import { AuthTokenCheck } from "../middlewares/auth.middleware";
import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { loginSchema } from "../schemas/login.schema";

const userRoute = Router();
const routeName = "/user";

userRoute.post(routeName, userCreateController);
userRoute.post(
  routeName + "/login",
  schemaValidationMiddleware(loginSchema),
  userLoginController
);
userRoute.delete(routeName, AuthTokenCheck, userDeleteController);
userRoute.get(routeName, AuthTokenCheck, userListSpecificController); //
userRoute.patch(routeName + "/:id", userUpdateController);

export default userRoute;
