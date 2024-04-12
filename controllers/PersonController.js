import EmployesModel from "../models/Employes.js";

export const create = async (req, res) => {
  try {
    const doc = new EmployesModel({
      name: req.body.name,
      imgUrl: req.body.imgUrl || new Date(),
      user: req.userId,
    });
    const person = await doc.save();
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось створити",
    });
  }
};
export const update = async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await EmployesModel.findByIdAndUpdate(personId, {
      name: req.body.name,
      imgUrl: req.body.imgUrl,
    });
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось змiнити",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const persons = await EmployesModel.find().populate("user").exec();
    res.json(persons);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await EmployesModel.findById(personId);
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await EmployesModel.findByIdAndDelete(personId);
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось видалити",
    });
  }
};
