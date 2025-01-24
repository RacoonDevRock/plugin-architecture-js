import db from "../../../config/firestore.js";
import jwt from "jsonwebtoken";

export function createUserService(context) {
    const secretKey = process.env.JWT_SECRET_KEY || "miClaveSecreta"; // Cambiar por una clave segura
    const weightsCollection = db.collection("Weights");
    const usersCollection = db.collection("Users");

    return {
        async registerUser(data) {
            if (!data.username || !data.password) {
                throw new Error("El nombre de usuario y la contraseña son obligatorios.");
            }
            const userRef = usersCollection.doc(data.username);
            const userSnap = await userRef.get();

            if (userSnap.exists) {
                throw new Error("El usuario ya existe.");
            }

            const user = { id: userRef.id, ...data };
            await userRef.set(user);
            return user;
        },

        async login(data) {
            if (!data.username || !data.password) {
                throw new Error("El nombre de usuario y la contraseña son obligatorios.");
            }

            try {
                // Realizar consulta en Firestore para buscar por el campo username
                const querySnapshot = await usersCollection
                    .where("username", "==", data.username.trim())
                    .get();

                // Verificar si se encontró el usuario
                if (querySnapshot.empty) {
                    throw new Error("Credenciales incorrectas."); // Usuario no encontrado
                }

                // Obtener el primer documento (en caso de múltiples resultados, lo cual no debería pasar)
                const userSnap = querySnapshot.docs[0];
                const userData = userSnap.data();

                // Comparar contraseñas
                if (userData.password !== data.password.trim()) {
                    throw new Error("Credenciales incorrectas."); // Contraseña incorrecta
                }

                // Generar token JWT
                const token = jwt.sign(
                    { id: userSnap.id, role: userData.role }, // Incluye el rol y el ID en el payload
                    secretKey,
                    { expiresIn: "1h" }
                );

                console.log(`Inicio de sesión exitoso para: ${data.username}`);
                return token;
            } catch (error) {
                console.error("Error durante el inicio de sesión:", error.message);
                throw new Error("Credenciales incorrectas.");
            }
        },

        async getUserById(userId) {
            const userRef = usersCollection.doc(userId);
            const userSnap = await userRef.get();

            if (!userSnap.exists) {
                return null;
            }

            return userSnap.data();
        },


        // Obtener los pesos actuales (OKR y BSC)
        async getWeights() {
            const weightsDoc = await weightsCollection.doc("default").get();
            if (!weightsDoc.exists) {
                throw new Error("Pesos no configurados.");
            }
            return weightsDoc.data();
        },

        // Actualizar los pesos
        async setWeights(weights) {
            if (!weights.okr || !weights.bsc) {
                throw new Error("Pesos para OKR y BSC son requeridos.");
            }

            const updatedWeights = { okr: weights.okr, bsc: weights.bsc };
            await weightsCollection.doc("default").set(updatedWeights);
            return updatedWeights;
        },

    };
}
