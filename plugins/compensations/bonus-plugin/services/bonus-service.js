export function createBonusService(userService) {
    return {
        // Método para calcular el bonus
        async calculateBonus(userId, bonusAmount) {
            const user = await userService.getUserById(userId);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const weights = await userService.getWeights();
            const scores = user.scores || {};
            const weightedScore = (scores.okr * weights.okr) + (scores.bsc * weights.bsc);

            return {
                user: user.name,
                weightedScore,
                bonus: weightedScore * bonusAmount,
            };
        },

        // Método para obtener los pesos actuales
        async getWeights() {
            return await userService.getWeights();
        },

        // Método para actualizar los pesos
        async setWeights(weights, userRole) {
            if (userRole !== "admin") {
                throw new Error("Acceso denegado: Solo administradores pueden actualizar los pesos");
            }

            return await userService.setWeights(weights);
        },
    };
}
