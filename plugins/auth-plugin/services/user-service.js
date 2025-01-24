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
            const userRef = usersCollection.doc(data.username);
            const userSnap = await userRef.get();

            if (!userSnap.exists || userSnap.data().password !== data.password) {
                throw new Error("Credenciales incorrectas.");
            }

            const token = jwt.sign({ id: userRef.id }, secretKey, { expiresIn: "1h" });
            return token;
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
