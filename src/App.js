import { useState } from 'react';
import Axios from 'axios';

function App() {

	const [display, setDisplay] = useState("");

	const operations = ['+','-','*','/'];

	const updateDisplay = value => {
		// handle operator base case
		if (operations.includes(value) && display == '') {
			return;
		}
		// handle repeat operator
		if (operations.includes(value) && operations.includes(display.slice(-1))) {
			return;
		}
		
		setDisplay(display + value); 
	}

	const remove = () => {
		if (display.length == 0) {
			return;
		}
		setDisplay(display.slice(0,-1));
	}
 

	const performCalc = () => {

		let url = display.replace("/","d");

		Axios.post("http://127.0.0.1:5000/" + url)
		.then((res) => {
			setDisplay(String(res.data))
			console.log(res)
		})
		.catch((err) => console.log(err))
	}

	return (
		<div className="App">
			<div className = "calculator">
				<div className = "num_display">
					{ display || "0"}
				</div>

				<div className = "ops">
					{/* addition, subtraction, multiplication, division, and the delete button */}
					<button onClick = {() => updateDisplay('+')}>+</button>
					<button onClick = {() => updateDisplay('-')}>-</button>
					<button onClick = {() => updateDisplay('*')}>*</button>
					<button onClick = {() => updateDisplay('/')}>/</button>

					<button onClick = {remove}>DELETE</button> 
				</div>

				<div className = "nums">
					{/* '.', 0 - 9 */}
					<button onClick = {() => updateDisplay('.')}>.</button>
					<button onClick = {() => updateDisplay('0')}>0</button>
					<button onClick = {() => updateDisplay('1')}>1</button>
					<button onClick = {() => updateDisplay('2')}>2</button>
					<button onClick = {() => updateDisplay('3')}>3</button>
					<button onClick = {() => updateDisplay('4')}>4</button>
					<button onClick = {() => updateDisplay('5')}>5</button>
					<button onClick = {() => updateDisplay('6')}>6</button>
					<button onClick = {() => updateDisplay('7')}>7</button>
					<button onClick = {() => updateDisplay('8')}>8</button>
					<button onClick = {() => updateDisplay('9')}>9</button>

					{/* use the = button to make an api call */}
					<button onClick = {performCalc}>=</button>
				</div>
			</div>
		</div>
	);
}

export default App;
