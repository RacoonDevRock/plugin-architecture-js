import { createUserService  } from "./services/user-service.js";
import { authRoutes } from "./routes/auth-routes.js";

export function init(app, config, context) {
  
  // Registrar el servicio de usuarios en el contexto global
  const userService = createUserService(context);
  context.registerService("userService", userService); 

  app.use("/auth", authRoutes(userService));
}
