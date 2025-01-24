export function createUserService(context) {
  const usersDB = context.database.users;

  return {
    async registerUser(data) {
      if (!data.username || !data.password) {
        throw new Error(
          "El nombre de usuario y la contraseña son obligatorios."
        );
      }
      const user = { id: Date.now(), ...data };
      usersDB.push(user);
      return user;
    },

    async login(data) {
      const user = usersDB.find(
        (u) => u.username === data.username && u.password === data.password
      );
      if (!user) {
        throw new Error("Credenciales incorrectas.");
      }
      return `token-${user.id}`; // Simulación de token
    },

    async getUserById(userId) {
      return usersDB.find((user) => user.id === userId) || null;
    },
  };
}
