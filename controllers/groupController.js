const { group, program } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const groups = await group.findAll({
        include: {
          model: program,
          as: 'program'
        }
      });
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneGroup = await group.findByPk(req.params.id, {
        include: {
          model: program,
          as: 'program'
        }
      });
      if (!oneGroup) return res.status(404).json({ error: "Group not found" });
      res.json(oneGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newGroup = await group.create(req.body);
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await group.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Group not found" });
      const updatedGroup = await group.findByPk(req.params.id);
      res.json(updatedGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await group.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Group not found" });
      res.json({ message: "Group deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
