const authenticateToken = require("../../../../core/middleware/authenticateToken.js")

module.exports = (app, services) => {
    const { dataService, authService } = services;

    app.post("/bonuses", async (req, res) => {
        const { userId, bonus } = req.body;
        try {
            const user = await dataService.getUsers().find((u) => u.id === userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const scores = user.scores;
            const weights = await dataService.getWeights();
            const weightedScore = (scores.okr * weights.okr) + (scores.bsc * weights.bsc);
            const calculatedBonus = weightedScore * bonus;

            res.json({ user: user.name, weightedScore, bonus: calculatedBonus });
        } catch (error) {
            res.status(500).json({ error: "Error processing bonus request" });
        }
    });

    app.get("/bonuses/weights", async (req, res) => {
        const weights = await dataService.getWeights();
        res.json({ weights });
    });

    app.post("/bonuses/weights", authenticateToken, async (req, res) => {
        const { okr, bsc } = req.body;

        if (!okr || !bsc) {
            return res.status(400).json({ error: "Weights for OKR and BSC are required" });
        }
        // Verificar si el usuario tiene permisos
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied: Admins only" });
        }

        try {
            const updatedWeights = await dataService.setWeights({ okr, bsc });
            res.json(updatedWeights);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Error setting weights" });
        }
    });

};
