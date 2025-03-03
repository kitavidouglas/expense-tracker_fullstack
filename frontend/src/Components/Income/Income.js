import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
  const {
    addIncome,
    incomes,
    getIncomes,
    deleteIncome,
    totalIncome
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    // eslint-disable-next-line
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className="total-income card">
          <h2>
            Total Income: <span>${totalIncome()}</span>
          </h2>
        </div>

        <div className="income-content">
          <div className="form-container card">
            <Form />
          </div>
          <div className="incomes-list card">
            <h2>All Income Items</h2>
            {incomes.map((income) => {
              const {
                _id,
                title,
                amount,
                date,
                category,
                description,
                type
              } = income;

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
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  .total-income {
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

  .income-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    .form-container,
    .incomes-list {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 1.5rem;
    }

    .incomes-list {
      h2 {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default Income;
