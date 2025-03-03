import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';

// Example chart components (replace with your actual chart components or libraries)
import BarChart from '../Charts/BarChart';
import DonutChart from '../Charts/DonutChart';
import LineChart from '../Charts/LineChart';
import Chart from '../Charts/Chart'; 
import History from '../../History/History';
import { dollar } from '../../utils/Icons';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    // eslint-disable-next-line
  }, []);

  // Example data placeholders for your charts
  // Replace these with real data from incomes/expenses or from your API
  const cashFlowData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2000 },
    { month: 'Apr', amount: 5000 },
  ];

  const expenseData = [
    { category: 'Rent', value: 1000 },
    { category: 'Utilities', value: 300 },
    { category: 'Office Supplies', value: 200 },
  ];

  const salesData = [
    { date: '2023-01-01', sales: 2000 },
    { date: '2023-02-01', sales: 3000 },
    { date: '2023-03-01', sales: 2500 },
  ];

  const profitLossData = [
    { label: 'Income', value: totalIncome() },
    { label: 'Expenses', value: totalExpenses() },
  ];

  // Example placeholders for “Last Invoices” or “Bank Accounts”
  const lastInvoices = [
    { id: '#INV-001', amount: 1525.5, status: 'Due in 2 days' },
    { id: '#INV-002', amount: 752.2, status: 'Past due 5 days' },
    { id: '#INV-003', amount: 1297.0, status: 'Due in 10 days' },
  ];

  const bankAccounts = [
    { name: 'Checking', balance: 2500.0 },
    { name: 'Savings', balance: 4500.0 },
  ];

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 className="page-title">Business Overview</h1>
        <div className="top-widgets">
          {/* ====== CASH FLOW ====== */}
          <div className="widget card">
            <h2>Cash Flow</h2>
            <BarChart data={cashFlowData} />
            <p className="subtext">Current cash balance: ${totalBalance()}</p>
          </div>

          {/* ====== EXPENSES (DONUT CHART) ====== */}
          <div className="widget card">
            <h2>Expenses</h2>
            <DonutChart data={expenseData} />
            <p className="subtext">
              Total for {new Date().toLocaleString('default', { month: 'long' })}: 
              ${totalExpenses()}
            </p>
          </div>

          {/* ====== PROFIT AND LOSS ====== */}
          <div className="widget card">
            <h2>Profit &amp; Loss</h2>
            <Chart data={profitLossData} />
            <div className="profit-loss-details">
              <p>Income: {dollar}{totalIncome()}</p>
              <p>Expense: {dollar}{totalExpenses()}</p>
              <p>Balance: {dollar}{totalBalance()}</p>
            </div>
          </div>
        </div>

        <div className="middle-widgets">
          {/* ====== LAST INVOICES ====== */}
          <div className="widget card">
            <h2>Last Invoices</h2>
            <ul className="invoice-list">
              {lastInvoices.map((inv) => (
                <li key={inv.id}>
                  <span>{inv.id}</span> 
                  <span>${inv.amount}</span> 
                  <span>{inv.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ====== SALES (LINE CHART) ====== */}
          <div className="widget card">
            <h2>Sales</h2>
            <LineChart data={salesData} />
            <p className="subtext">Sales trend for last 3 months</p>
          </div>

          {/* ====== BANK ACCOUNTS ====== */}
          <div className="widget card">
            <h2>Bank Accounts</h2>
            <ul className="bank-accounts">
              {bankAccounts.map((acc, idx) => (
                <li key={idx}>
                  <span>{acc.name}:</span> <span>${acc.balance}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ====== BOTTOM SECTION: HISTORY + STATS ====== */}
        <div className="bottom-section">
          <div className="history-container card">
            <History />
          </div>

          <div className="stats-container">
            <div className="stats-row card">
              <div className="stat-box">
                <h3>Total Income</h3>
                <p>{dollar}{totalIncome()}</p>
              </div>
              <div className="stat-box">
                <h3>Total Expense</h3>
                <p>{dollar}{totalExpenses()}</p>
              </div>
              <div className="stat-box">
                <h3>Total Balance</h3>
                <p>{dollar}{totalBalance()}</p>
              </div>
            </div>

            <div className="salary-range card">
              <h2 className="salary-title">
                Min <span>Salary</span> Max
              </h2>
              <div className="salary-item">
                <p>
                  ${Math.min(...incomes.map((item) => item.amount))}
                </p>
                <p>
                  ${Math.max(...incomes.map((item) => item.amount))}
                </p>
              </div>
              <h2 className="salary-title">
                Min <span>Expense</span> Max
              </h2>
              <div className="salary-item">
                <p>
                  ${Math.min(...expenses.map((item) => item.amount))}
                </p>
                <p>
                  ${Math.max(...expenses.map((item) => item.amount))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .page-title {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
  }

  /* 
   * CARD / WIDGET STYLING
   * Use consistent styling for each "card"
   */
  .card {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
    padding: 1.5rem;
  }

  /* 
   * TOP WIDGETS 
   * Typically 3 columns for Cash Flow, Expenses, Profit & Loss
   */
  .top-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  /* 
   * MIDDLE WIDGETS 
   * Typically 3 columns for Invoices, Sales, Bank Accounts
   */
  .middle-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .widget h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .widget .subtext {
    margin-top: 1rem;
    font-size: 0.95rem;
    color: #555;
  }

  /* Example styling for profit-loss details */
  .profit-loss-details p {
    margin: 0.3rem 0;
    font-weight: 600;
  }

  /* 
   * Invoice list 
   */
  .invoice-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .invoice-list li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  /* 
   * Bank accounts 
   */
  .bank-accounts {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .bank-accounts li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  /* 
   * BOTTOM SECTION 
   */
  .bottom-section {
    display: grid;
    grid-template-columns: 2fr 1fr; 
    gap: 2rem;
  }

  .history-container {
    /* History component gets its own card styling above */
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .stats-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .stat-box {
      flex: 1;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      text-align: center;
      padding: 1rem;
      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      p {
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  .salary-range {
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    .salary-title {
      font-size: 1.2rem;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 1.8rem;
      }
    }
    .salary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      p {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
  }
`;

export default Dashboard;
