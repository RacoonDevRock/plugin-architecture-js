import { createBonusPluginContext } from "./context/bonus-plugin-context.js";
import { bonusRoutes } from "./routes/bonus-routes.js";

export function init(app, config, context) {
    const pluginContext = createBonusPluginContext(context);

    app.use("/bonuses", bonusRoutes(pluginContext));
}
