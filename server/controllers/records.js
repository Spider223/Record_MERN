const Record = require("../models/Record");

const getAllRecords = async (req, res) => {
  const records = await Record.find({});
  res.status(200).json({ records });
};

const createRecord = async (req, res) => {
  const record = await Record.create(req.body);
  res.status(201).json({ record });
};

const getRecord = async (req, res) => {
  const { id: recordId } = req.params;
  const record = await Record.find({ _id: recordId });

  if (!record) {
    return res
      .status(404)
      .json({ msg: `No Record found with id: ${recordId}` });
  }

  res.status(200).json({ record });
};

const updateRecord = async (req, res) => {
  const { id: recordId } = req.params;
  const record = await Record.findOneAndUpdate({ _id: recordId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!record) {
    return `No Record with id: ${recordId}`, 404;
  }

  res.status(200).json({ record });
};

const deleteRecord = async (req, res) => {
  const { id: recordId } = req.params;
  const record = await Record.findOneAndDelete({ _id: recordId });

  if (!record) {
    return res
      .status(404)
      .json({ msg: `No record found with id: ${recordId}` });
  }

  res.status(200).json({ record });
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
