import { getConeccion } from './../database/database'


const getLanguages = async (req, res) => {
    try {
        const coneccion = await getConeccion();
        const result = await coneccion.query("SELECT id, name, programmers from language")
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getLanguage = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const coneccion = await getConeccion();
        const result = await coneccion.query("SELECT id, name, programmers from language WHERE id = ?", id)
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const addLanguage = async (req, res) => {
    try {
        const { name, programmers } = req.body;

        if (name === undefined || programmers === undefined) {
            res.status(404).json({ message: "Bad request. Please fill all field" });
        }

        const language = { name, programmers }
        const coneccion = await getConeccion();
        await coneccion.query("INSERT INTO language SET ?", language);
        res.json({ message: "Language added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, programmers } = req.body;

        if (id === undefined || name === undefined || programmers === undefined) {
            res.status(404).json({ message: "Bad request. Please fill all field" });
        }
        const language = { id, name, programmers }
        const coneccion = await getConeccion();
        const result = await coneccion.query("UPDATE language SET ? WHERE id = ?", [language, id])
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const delateLanguage = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const coneccion = await getConeccion();
        const result = await coneccion.query("DELETE FROM language WHERE id = ?", id)
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    updateLanguage,
    delateLanguage
};


