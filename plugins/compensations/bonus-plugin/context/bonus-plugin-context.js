import { createBonusService } from "../services/bonus-service.js";

export function createBonusPluginContext(globalContext) {
    const userService = globalContext.getService("userService");
    const bonusService = createBonusService(userService);

    // Registrar bonusService en el contexto global
    globalContext.registerService("bonusService", bonusService);

    return {
        ...globalContext,
        bonusService, // También lo incluimos en el contexto específico
    };
}
