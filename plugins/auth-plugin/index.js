export function init(app, config, context) {
  context.log("Iniciando Auth Plugin");
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      res.json({ token: "valid-token", expiresIn: config.tokenExpiration });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  });
}
