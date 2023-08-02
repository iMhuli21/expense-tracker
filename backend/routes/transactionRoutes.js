const express      = require("express")
const router       = express.Router()
const {
    createTransaction,
    getTransactions, 
    updateTransaction,
    deleteTransaction
}                  = require("../controllers/transactionController")

//get all user transactions
router.get("/", getTransactions)

//create user transaction
router.post("/", createTransaction)

//update user transaction
router.put("/:id", updateTransaction)

//delete user transaction
router.delete("/:id", deleteTransaction)

module.exports = router

