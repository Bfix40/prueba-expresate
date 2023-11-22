const models = require("../models/init-models.js").initModels();

const createCountry = async (req, res) => {
  try {
    const { name, active } = req.body;
    const newCountry = await models.country.create({ name, active });
    res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el país');
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, active } = req.body;
    
    const updatedCountry = await models.country.update(
        { name, active },
        { where: { id } }
    );

    if (updatedCountry[0] === 1) {
      res.status(200).send('País actualizado correctamente');
    } else {
      res.status(404).send('País no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el país');
  }
};

const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCountry = await models.country.destroy({ where: { id } });

        if (deletedCountry === 1) {
            res.status(200).send("País eliminado correctamente");
        } else {
            res.status(404).send("País no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el país");
    }
};

module.exports = {
    createCountry,
    updateCountry,
    deleteCountry,
}