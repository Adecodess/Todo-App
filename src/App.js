
import React, { useCallback, useState, useEffect } from "react";

const App = () => {
  const [newTodo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  
    const onNewTodo = useCallback((event) => {
      setTodo(event.target.value);
    }, []);

    const formSubmitted = useCallback(
      (event) => {
        event.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([
          {
            id: todos.length + 1,
            content: newTodo,
            done: false,
          },
          ...todos,
        ]);
        setTodo("");
      },
      [newTodo, todos]
    );

    useEffect(() => {
      console.log("todos", todos);
    }, [todos]);

    // create cache version of the function
    const addTodo = useCallback(
      (todo, index) => (event) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1, {
          ...todo,
          done: !todo.done,
        });
        setTodos(newTodos);
      },
      [todos]
    );

    const removeTodo = useCallback(
      (todo) => (event) => {
        setTodos(todos.filter((oldTodos) => oldTodos != todo));
      },
      [todos]
    );
    const markAllDOne = useCallback(() => {
      // create copy of the array
      // create a copy of each item
      // update the property to be true on each of the new items
      const updatedTodos = todos.map((todo) => {
        return {
          ...todo,
          done: true,
        };
      });
      setTodos(updatedTodos);
    }, [todos]);
  

  return (
    <React.Fragment>
      <div className="mainApp">
        <section>
          <h1>Enter Todo</h1>
          <form onSubmit={formSubmitted}>
            <label htmlFor="newTodo"></label>
            <input
              id="newTodo"
              name="newTodo"
              value={newTodo}
              onChange={onNewTodo}
            ></input>
            <button className="btn">Enter Item</button>
            <button className="btn" onClick={markAllDOne}>
              Mark All done
            </button>
          </form>
        </section>
        <div className="removeBtn">
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id}>
                <input
                  checked={todo.done}
                  type="checkbox"
                  onChange={addTodo(todo, index)}
                ></input>
                <span className={todo.done ? "done" : ""}>{todo.content}</span>
                <button className="rbtn" onClick={removeTodo(todo)}>
                  Remove Item
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

/* const App = () => {
//   const [name, setName] = useState("ade");
//   return (
//     <React.Fragment>
//       <form>
//         <label>Enter your name</label>
//         <input
//           value={name}
//           onChange={(event) => {
//             setName(event.target.value);
//           }}
//         ></input>
//       </form>
//       <h1> hello {name}</h1
//     </React.Fragment>
//   );
// }; */
