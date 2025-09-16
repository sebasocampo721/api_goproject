const { instructor, user } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const instructors = await instructor.findAll({
        include: {
          model: user,
          as: 'user'
        }
      });
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneInstructor = await instructor.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'user'
        }
      });
      if (!oneInstructor) return res.status(404).json({ error: "Instructor not found" });
      res.json(oneInstructor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newInstructor = await instructor.create(req.body);
      res.status(201).json(newInstructor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await instructor.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Instructor not found" });
      const updatedInstructor = await instructor.findByPk(req.params.id, {
        include: { model: user, as: 'user' }
      });
      res.json(updatedInstructor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await instructor.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Instructor not found" });
      res.json({ message: "Instructor deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
