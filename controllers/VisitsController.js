import VisitsModel from "../models/Visits.js";

export const create = async (req, res) => {
  try {
    const doc = new VisitsModel({
      name: req.body.name,
      time: req.body.time,
      user: req.userId,
    });
    const visit = await doc.save();
    res.json(visit);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось створити",
    });
  }
};

export const getVisits = async (req, res) => {
  try {
    const visits = await VisitsModel.find().populate("user").exec();
    res.json(visits);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати всi імена",
    });
  }
};

export const removeVisit = async (req, res) => {
  try {
    const visitId = req.params.id;
    const visit = await VisitsModel.findByIdAndDelete(visitId);
    res.json(visit);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось видалити",
    });
  }
};
