import db from "../../../config/firestore.js";

export function createTicketService(context, userService) {
  const ticketsCollection = db.collection("Tickets");

  return {
    async createTicket(data) {
      const user = await userService.getUserById(data.userId);
      if (!user) {
        throw new Error(`Usuario con ID ${data.userId} no encontrado.`);
      }

      const newTicket = {
        ...data,
        status: "open",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const docRef = await ticketsCollection.add(newTicket);
      return { id: docRef.id, ...newTicket };
    },

    async getAllTickets() {
      const snapshot = await ticketsCollection.get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getTicketById(id) {
      const doc = await ticketsCollection.doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    },

    async updateTicket(id, data) {
      const docRef = ticketsCollection.doc(id);
      const existingDoc = await docRef.get();
      if (!existingDoc.exists) return null;

      const updatedData = {
        ...existingDoc.data(),
        ...data,
        updated_at: new Date(),
      };

      await docRef.update(updatedData);
      return { id: docRef.id, ...updatedData };
    },

    async deleteTicket(id) {
      const docRef = ticketsCollection.doc(id);
      const existingDoc = await docRef.get();
      if (!existingDoc.exists) return false;

      await docRef.delete();
      return true;
    },
  };
}
