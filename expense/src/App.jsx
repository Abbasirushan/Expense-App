import { useState } from "react";

function App() {
  const [cashin, setCashIn] = useState(0);
  const [cashout, setCashOut] = useState(0);
  const [balance, setBalance] = useState(0);
  const [credit, setCredit] = useState("");
  const [cashFlowType, setCashFlowType] = useState("");
  const [expenditure, setExpenditure] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleCreditChange = (e) => {
    setCredit(e.target.value);
  };

  const handleCashFlowChange = (e) => {
    setCashFlowType(e.target.value);
  };

  const handleExpenditureChange = (e) => {
    setExpenditure(e.target.value);
  };

  const handleSubmit = () => {
    const creditValue = parseFloat(credit);

    if (
      !isNaN(creditValue) &&
      creditValue > 0 &&
      cashFlowType &&
      expenditure
    ) {
      if (cashFlowType === "Cash In") {
        setCashIn(cashin + creditValue);
        setBalance(balance + creditValue);
      } else if (cashFlowType === "Cash Out") {
        setCashOut(cashout + creditValue);
        setBalance(balance - creditValue);
      }

      
      setTransactions([
        ...transactions,
        { type: cashFlowType, amount: creditValue, expenditure },
      ]);

      
      setCredit("");
      setCashFlowType("");
      setExpenditure("");
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <>
      <div className="p-5 bg-gray-50 rounded-md shadow-md w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Expense Tracker
        </h1>
        <div className="flex justify-between mb-4">
          <div>
            <strong>Cash In:</strong> {cashin}
          </div>
          <div>
            <strong>Cash Out:</strong> {cashout}
          </div>
          <div>
            <strong>Balance:</strong> {balance}
          </div>
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Credit
          </label>
          <input
            type="text"
            value={credit}
            onChange={handleCreditChange}
            placeholder="Enter credit amount"
            className="input input-bordered input-error w-full"
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Cash Flow
          </label>
          <select
            value={cashFlowType}
            onChange={handleCashFlowChange}
            className="select w-full max-w-xs"
          >
            <option disabled value="">
              Select Cash Flow
            </option>
            <option value="Cash In">Cash In</option>
            <option value="Cash Out">Cash Out</option>
          </select>
        </div>

        {/* Expenditures Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Expenditures
          </label>
          <select
            value={expenditure}
            onChange={handleExpenditureChange}
            className="select w-full max-w-xs"
          >
            <option disabled value="">
              Select Expenditure
            </option>
            <option value="Groceries">Groceries</option>
            <option value="Fuel">Fuel</option>
            <option value="Food/Drink">Food/Drink</option>
            <option value="Car/Bike">Car/Bike</option>
            <option value="Taxi">Taxi</option>
            <option value="Clothes">Clothes</option>
            <option value="Electricity">Electricity</option>
          </select>
        </div>

      
        <button
          className="btn btn-success w-full mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>

        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Transactions
          </h2>
          {transactions.length > 0 ? (
            <ul className="space-y-2">
              {transactions.map((transaction, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
                >
                  <span>
                    <strong>{transaction.type}:</strong> {transaction.expenditure}
                  </span>
                  <span className="font-medium text-gray-700">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
