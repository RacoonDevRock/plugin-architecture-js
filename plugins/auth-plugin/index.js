export function init(app) {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      res.json({ message: "Inicio de sesión exitoso", token: "12345" });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  });

  app.post("/register", (req, res) => {
    res.json({ message: "Registro exitoso" });
  });
}
