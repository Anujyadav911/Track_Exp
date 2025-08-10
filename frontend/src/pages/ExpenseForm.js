import React, { useState } from 'react'
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {

    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        date: new Date().toISOString().split('T')[0] // Set today's date as default
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const addExpenses = (e) => {
        e.preventDefault();
        const { amount, text, date } = expenseInfo;
        if (!amount || !text || !date) {
            handleError('Please add Expense Details and Date');
            return;
        }
        addTransaction(expenseInfo);
        setExpenseInfo({ amount: '', text: '', date: new Date().toISOString().split('T')[0] })
    }

    return (
        <div className='container'>
            <form onSubmit={addExpenses}>
                <div>
                    <label htmlFor='text'>Expense Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your Expense Detail...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your Amount...'
                        value={expenseInfo.amount}
                    />
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input
                        onChange={handleChange}
                        type='date'
                        name='date'
                        value={expenseInfo.date}
                    />
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm