const { productType, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const productTypes = await productType.findAll({
        include: {
          model: project,
          as: 'projects'
        }
      });
      res.json(productTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneProductType = await productType.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'projects'
        }
      });
      if (!oneProductType) return res.status(404).json({ error: "ProductType not found" });
      res.json(oneProductType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newProductType = await productType.create(req.body);
      res.status(201).json(newProductType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await productType.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "ProductType not found" });
      const updatedProductType = await productType.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'projects'
        }
      });
      res.json(updatedProductType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await productType.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "ProductType not found" });
      res.json({ message: "ProductType deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
