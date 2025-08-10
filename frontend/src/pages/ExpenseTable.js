import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {
    console.log('Expenses data:', expenses); // Debug log

    return (
        <div className="expense-list">
            {expenses.map((expense, index) => {
                console.log('Expense item:', expense); // Debug log for each expense
                return (
                    <div key={index} className="expense-item">
                        <button className="delete-button" onClick={() =>
                            deleteExpens(expense._id)}>❌</button>
                        <div className="expense-description">{expense.text}</div>
                        <div className="expense-date">
                            {expense.date ? (
                                <>
                                    <span className="date-icon">📅</span>
                                    {new Date(expense.date).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </>
                            ) : expense.createdAt ? (
                                <>
                                    <span className="date-icon">📅</span>
                                    {new Date(expense.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </>
                            ) : (
                                <span className="no-date">No Date</span>
                            )}
                        </div>
                        <div
                            className="expense-amount"
                            style={{ color: expense.amount > 0 ? '#27ae60' : '#c0392b' }}
                        >₹{expense.amount}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExpenseTable;
