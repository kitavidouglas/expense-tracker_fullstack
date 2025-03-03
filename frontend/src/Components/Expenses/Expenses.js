import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
  const {
    expenses,
    getExpenses,
    deleteExpense,
    totalExpenses
  } = useGlobalContext();

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>

        {/* TOTAL EXPENSE CARD */}
        <div className="total-expense card">
          <h2>
            Total Expense: <span>${totalExpenses()}</span>
          </h2>
        </div>

        {/* MAIN GRID: FORM + LIST */}
        <div className="expense-content">
          <div className="form-container card">
            <ExpenseForm />
          </div>

          <div className="expenses-list card">
            <h2>All Expense Items</h2>
            {expenses.map((expense) => {
              const {
                _id,
                title,
                amount,
                date,
                category,
                description,
                type
              } = expense;

              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  .total-expense {
    margin: 1rem 0;
    padding: 1rem;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    text-align: center;

    h2 {
      font-size: 1.8rem;

      span {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-green);
      }
    }
  }

  .expense-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    /* Reusable card styles for both form and list */
    .form-container,
    .expenses-list {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 1.5rem;
    }

    .expenses-list {
      h2 {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default Expenses;
