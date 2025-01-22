import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import loadPlugins from "./plugin-loader.js";
import { createGlobalContext } from "./plugin-global.js";
import pluginConfig from "../config/plugins.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000; // Cambia el puerto según tu necesidad

app.use(express.json());

(async () => {
  try {
    // Crear el contexto global para los plug-ins
    const globalContext = createGlobalContext();

    // Ruta para probar el backend
    app.get("/", (req, res) => {
      res.send("¡Bienvenido al sistema basado en plug-ins!");
    });

    // Cargar los plug-ins habilitados desde el configurador
    const pluginsPath = path.join(__dirname, "../plugins");
    const plugins = await loadPlugins(pluginsPath, pluginConfig, globalContext);

    // Inicializar los plug-ins
    plugins.forEach((plugin) => {
      console.log(`Iniciando plug-in: ${plugin.name}`);
      plugin.init(app, plugin.config, plugin.context); // Inyecta app, config y context
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el sistema:", error.message);
    process.exit(1); // Termina la ejecución si algo falla
  }
})();
