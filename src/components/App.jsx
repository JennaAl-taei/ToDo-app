import './App.css';
import { useState, useEffect } from 'react';
import Input from './input';
import List from './List';

function App() {
	const [todo, setTodo] = useState('');
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => {
				const uncompletedTodos = data.filter((todo) => !todo.complete).map((todo) => todo.title);

				setTodos(uncompletedTodos);
				setLoading(false);
			});
	}, []);

	function addTodo() {
		if (todo !== '') {
			setTodos([...todos, todo]);
			setTodo('');
		}
	}

	const complete = (text) => {
		const uncompletedTodos = todos.filter((todo) => todo !== text);
		setTodos(uncompletedTodos);
	};

	return (
		<div className="App">
			<img className="logo" src="/logo.png" alt="techover" />
			<Input setTodo={setTodo} todo={todo} addTodo={addTodo} />
			<List todos={todos} complete={complete} loading={loading} />
		</div>
	);
}

export default App;
