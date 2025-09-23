const { document, project } = require('../models');

module.exports = {
  // Obtener todos los documentos
  async getAll(req, res) {
    try {
      const documents = await document.findAll({
        include: { model: project, as: 'project' }
      });
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un documento por ID
  async getOne(req, res) {
    try {
      const oneDocument = await document.findByPk(req.params.id, {
        include: { model: project, as: 'project' }
      });
      if (!oneDocument) return res.status(404).json({ error: "Documento no encontrado" });
      res.json(oneDocument);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear nuevo documento
  async create(req, res) {
    try {
      const newDocument = await document.create(req.body);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar documento existente
  async update(req, res) {
    try {
      const [updated] = await document.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: "Documento no encontrado" });

      const updatedDocument = await document.findByPk(req.params.id);
      res.json(updatedDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar documento
  async delete(req, res) {
    try {
      const deleted = await document.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: "Documento no encontrado" });

      res.json({ message: "Documento eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
