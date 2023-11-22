const models = require("../models/init-models.js").initModels();
const uuid = require("uuid");
const crypto = require("../utils/crypto");
const { toPromise } = require("../utils/toPromise");

const registerUser = async (data) => {
    const hashedPassword = crypto.hashPassword(data.password);
    const user_id = uuid.v4();
    const newUser = await models.users.create({
        id: user_id,
        ...data,
        password: hashedPassword,
    });
    return {
        message: `User created succesfully with the id: ${user_id}`,
        user: newUser,
    };
};

const addUser = async (req, res) => {
    const [user, err] = await toPromise(registerUser(req.body));
    if (err || !req.body) {
        res.status(400).json({ message: "Data Missing" });
    }
    res.status(201).json({ user });
};

const getAllUsers = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 10; // Número de resultados por página
        const offset = (page - 1) * limit;

        const users = await models.users.findAll({
            limit,
            offset,
            include: [
                {
                    model: country,
                    attributes: ["name"],
                    as: "country",
                },
            ],
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al recuperar la lista de usuarios");
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await models.users.findByPk(id, {
            include: [
                {
                    model: Country,
                    attributes: ["name"],
                    as: "country",
                },
            ],
        });

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al recuperar el usuario");
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, country_id } = req.body;

        const updatedUser = await models.users.update(
            { name, email, password, country_id },
            { where: { id } }
        );

        if (updatedUser[0] === 1) {
            res.status(200).send("Usuario actualizado correctamente");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el usuario");
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await models.users.destroy({ where: { id } });

        if (deletedUser === 1) {
            res.status(200).send("Usuario eliminado correctamente");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el usuario");
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
};