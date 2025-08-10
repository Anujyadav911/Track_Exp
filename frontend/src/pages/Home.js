import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])

    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }



    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const updateExistingExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses/update-dates`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "PUT"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <div>
            <div className='user-section'>
                <div className='header-content'>
                    <div className='logo-section'>
                        <img src='/logo.svg' alt='Expense Tracker Logo' className='app-logo' />
                        <h1>Expense Tracker</h1>
                    </div>
                    <div className='user-info'>
                        <h2>Welcome {loggedInUser}</h2>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className='main-content'>
                <ExpenseDetails
                    incomeAmt={incomeAmt}
                    expenseAmt={expenseAmt}
                />

                <ExpenseForm
                    addTransaction={addTransaction} />

                {expenses.some(expense => !expense.date) && (
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <button 
                            onClick={updateExistingExpenses}
                            style={{
                                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}
                        >
                            📅 Add Dates to Existing Expenses
                        </button>
                    </div>
                )}
                <ExpenseTable
                    expenses={expenses}
                    deleteExpens={deleteExpens}
                />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Home