import React from "react";

const History = ({ history, handleDeleteCalculation }) => {
  return (
    <div className="history">
      <h2 className="history-title">History</h2>
      <ul className="history-list">
        {history.map((calculation, index) => (
          <li key={index} className="history-item">
            <span className="calculation">
              {calculation.num1} {calculation.operation} {calculation.num2} = {calculation.result}
            </span>
            <button key={index}
              className="delete-button"
              onClick={() => handleDeleteCalculation(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
