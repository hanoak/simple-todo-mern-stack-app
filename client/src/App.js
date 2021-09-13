import { useState, useEffect } from 'react'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import Todos from './components/Todos';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
	  const getTodos = async () => {
		  const todosFromServer = await fecthTodos();
		  setTodos(todosFromServer);
	  }

	  getTodos();
  }, []);

  const fecthTodos = async () => {
    const res = await fetch('http://localhost:8080/get')
    const data = await res.json();
    return data.todos;
  }


  return (
    <div className="app">
      <div className="container">
	  	<Header />		
		<AddToDo addTodo={addTodo}/>
		{todos.length > 0 ? (<Todos todos={todos} />) : ('No Todos To Show')}		
      </div>
    </div>
  );
}

export default App;