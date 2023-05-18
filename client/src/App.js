import React, { useState, useEffect } from "react";
import axios from "axios";
import Calculator from "./Calculator";
import History from "./History";

const App = () => {
	const [display, setDisplay] = useState("0");
	const [history, setHistory] = useState([]);
	const [toClear, setToClear] = useState(false);
	const handleDigitClick = (digit) => {
		if (toClear) {
			setDisplay("0");
			setToClear(false);
		}
		setDisplay((prevDisplay) => {
			if (prevDisplay === "0") {
				return digit.toString();
			} else {
				return prevDisplay + digit.toString();
			}
		});
	};

	const handleOperatorClick = (operator) => {
		setDisplay((prevDisplay) => {
			if (
				prevDisplay.endsWith("+") ||
				prevDisplay.endsWith("-") ||
				prevDisplay.endsWith("*") ||
				prevDisplay.endsWith("/")
			) {
				// If the last character of the display is an operator, replace it with the new operator
				return prevDisplay.slice(0, -1) + operator;
			} else {
				// Otherwise, append the operator to the display
				return prevDisplay + operator;
			}
		});
	};

	const handleCalculate = () => {
		// Make sure toClear is set to true
		setToClear(true);
	  };
	  
	  useEffect(() => {
		const calculateResult = async () => {
		  try {
			// Fetch the expression from the display
			const operatorIndex = display.search(/[+\-*/]/);
			const number1 = parseFloat(display.slice(0, operatorIndex));
			const number2 = parseFloat(display.slice(operatorIndex + 1));
			const operator = display[operatorIndex];
	  
	  
			// Make the API call to calculate the result
			const response = await axios.post("https://calculator-api-uoz3.onrender.com/api/calculate", {
			  num1: number1,
			  num2: number2,
			  operation: operator,
			});
			const result = response.data.result;
	  
			// Update the display with the result
			setDisplay(result.toString());
			setToClear(false);
			// Fetch the updated history
			await fetchHistory();
		  } catch (error) {
			console.error("Error calculating result:", error);
			setDisplay("Error");
		  }
		};
	  
		if (toClear) {
		  calculateResult();
		}
	  }, [toClear]);
	  

	const handleClear = () => {
		setDisplay("0");
	};

	const handleDeleteCalculation = async (index) => {
		const response = await axios.delete(
			`https://calculator-api-uoz3.onrender.com/api/history/${index}`
		);
		const status = response.status;
		if (status === 200) {
			console.log("Calculation deleted successfully");
		} else {
			console.error("Error deleting calculation");
		}
		//set history using fetching from server
		await fetchHistory();
	};

	const fetchHistory = async () => {
		try {
			const response = await axios.get("https://calculator-api-uoz3.onrender.com/api/history");
			setHistory(response.data);
		} catch (error) {
			console.error("Error fetching history:", error);
		}
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	return (
		<div className="App">
			<Calculator
				display={display}
				handleDigitClick={handleDigitClick}
				handleOperatorClick={handleOperatorClick}
				handleCalculate={handleCalculate}
				handleClear={handleClear}
			/>
			<History
				history={history}
				handleDeleteCalculation={handleDeleteCalculation}
			/>
		</div>
	);
};

export default App;
