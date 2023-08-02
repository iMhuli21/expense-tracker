const transactionModel = require("../models/transactionModel");

//create transaction
const createTransaction = async (req, res) => {

  const { cost, date, description, transactionType } = req.body;

  const user = req.user._id;

  try {
    const transaction = await transactionModel.create({
      cost,
      date,
      description,
      transactionType,
      user,
    });

    res.status(201).json({success:"Data added"});

  } catch (error) {
    res.status(400).json({msg:error.message});
  }
};

//get transactions
const getTransactions = async (req, res) => {
  const user = req.user._id;

  try {
    const transactions = await transactionModel.find({ user });

    res.status(201).json(transactions);
  } catch (error) {
    res.status(400).json({msg:error.message});
  }
};

//update transaction
const updateTransaction = async (req, res) => {
  const user = req.params.id;
  const { cost, date, description, transactionType } = req.body;

  try {
    const transaction = await transactionModel.findByIdAndUpdate(
      { _id: user },
      {cost, date, description, transactionType}
    );

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};

//delete transaction
const deleteTransaction = async (req, res) => {
  const user = req.params.id;

  try {
    const transaction = await transactionModel.findByIdAndDelete({ _id: user });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
