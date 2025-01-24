const PluginContract = require("../../../core/plugin-contract.js");
const bonusRoutes = require("./routes/bonusRoutes");

class BonusesPlugin extends PluginContract {
    initialize(app, services) {
        bonusRoutes(app, services);
    }
}

module.exports = new BonusesPlugin();