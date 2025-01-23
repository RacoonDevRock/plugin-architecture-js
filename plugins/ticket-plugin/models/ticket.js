export class Ticket {
  constructor({
    title,
    description,
    status = "open",
    created_at = new Date(),
    updated_at = new Date(),
  }) {
    // Validaciones básicas
    if (!title || typeof title !== "string") {
      throw new Error("El campo 'title' es obligatorio y debe ser un string.");
    }

    this.title = title;
    this.description = description || "";
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static validateStatus(status) {
    const validStatuses = ["open", "in progress", "resolved", "closed"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `El estado '${status}' no es válido. Debe ser uno de: ${validStatuses.join(
          ", "
        )}`
      );
    }
  }
}
