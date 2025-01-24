export const authController = {
    registerUser: (userService) => async (req, res) => {
        try {
            const user = await userService.registerUser(req.body);
            res.status(201).json({ message: "Usuario registrado", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    loginUser: (userService) => async (req, res) => {
        try {
            const token = await userService.login(req.body);
            res.json({ message: "Inicio de sesión exitoso", token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
};