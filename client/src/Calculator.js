import React from "react";

const Calculator = ({
	display,
	handleDigitClick,
	handleOperatorClick,
	handleCalculate,
	handleClear,
}) => {
	const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
	const operators = ["/", "*", "+", "-"];

	return (
		<div className="calculator">
			<div className="display">{display}</div>
			<div className="operators">
				{operators.map((operator) => (
					<button key={operator} onClick={() => handleOperatorClick(operator)}>
						{operator}
					</button>
				))}
				<button onClick={handleClear}>AC</button>
			</div>
			<div className="digits">
				{digits.map((digit) => (
					<button key={digit} onClick={() => handleDigitClick(digit)}>
						{digit}
					</button>
				))}
				<button onClick={() => handleDigitClick(".")}>.</button>
				<button onClick={handleCalculate}>=</button>
			</div>
		</div>
	);
};

export default Calculator;
