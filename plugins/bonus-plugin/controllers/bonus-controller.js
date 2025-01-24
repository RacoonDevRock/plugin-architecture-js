export const bonusController = {
    calculateBonus: (context) => async (req, res) => {
        const { userId, bonus } = req.body;
        const bonusService = context.getService("bonusService");

        try {
            const result = await bonusService.calculateBonus(userId, bonus);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getWeights: (context) => async (req, res) => {
        const bonusService = context.getService("bonusService");

        try {
            const weights = await bonusService.getWeights();
            res.json({ weights });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    setWeights: (context) => async (req, res) => {
        const { okr, bsc } = req.body;
        const bonusService = context.getService("bonusService");

        if (!okr || !bsc) {
            return res.status(400).json({ error: "Pesos OKR y BSC requeridos" });
        }

        try {
            const updatedWeights = await bonusService.setWeights(
                { okr, bsc },
                req.user.role // Validar el rol del usuario
            );
            res.json(updatedWeights);
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    },
};
