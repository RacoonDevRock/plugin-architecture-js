import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import loadPlugins from "./plugin-loader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

(async () => {
  const pluginsPath = path.join(__dirname, "../plugins");
  const plugins = await loadPlugins(pluginsPath);

  // Registrar cada plug-in en Express
  plugins.forEach((plugin) => {
    console.log(`Cargando plug-in: ${plugin.name}`);
    plugin.init(app); // Llama al método `init` del plug-in
  });

  // Ruta base
  app.get("/", (req, res) => {
    res.send("¡Bienvenido al sistema Helpdesk!");
  });

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
})();
