const express = require('express');
const { getAllTransactions, addTransaction, deleteTransaction, updateExistingExpenses }
    = require('../Controllers/ExpenseController');
const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.delete('/:expenseId', deleteTransaction);
router.put('/update-dates', updateExistingExpenses);

module.exports = router;