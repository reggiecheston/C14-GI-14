import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodoListPageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      todos: [],
      description: "",
      editingIndex: null,
      editedTodo: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAddTodo = () => {
    const { newTodo, description, todos } = this.state;
    if (newTodo.trim() !== "") {
      this.setState({
        todos: [
          ...todos,
          { text: newTodo, description, detailedDescription: "" },
        ],
        newTodo: "",
        description: "",
      });
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter((todo, i) => i !== index);
    this.setState({ todos: updatedTodos });
  };

  handleEditTodo = (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[index].editing = true;
    this.setState({
      todos: updatedTodos,
      editingIndex: index,
      editedTodo: todos[index].text,
    });
  };

  handleSaveTodo = (index) => {
    const { todos, editedTodo } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[index].text = editedTodo;
    updatedTodos[index].editing = false;
    this.setState({ todos: updatedTodos, editingIndex: null, editedTodo: "" });
  };

  handleCancelEdit = (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[index].editing = false;
    this.setState({ todos: updatedTodos, editingIndex: null, editedTodo: "" });
  };

  handleEditedTodoChange = (e) => {
    this.setState({ editedTodo: e.target.value });
  };

  render() {
    const { newTodo, todos, editingIndex, editedTodo, description } =
      this.state;

    return (
      <div>
        <h2>Todo List Page</h2>
        <div>
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={this.handleInputChange}
          />
          <textarea
            placeholder="Detailed Description"
            value={description}
            onChange={this.handleDescriptionChange}
          />

          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.editing ? (
                <>
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={this.handleEditedTodoChange}
                  />
                  <button onClick={() => this.handleSaveTodo(index)}>
                    Save
                  </button>
                  <button onClick={() => this.handleCancelEdit(index)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button onClick={() => this.handleEditTodo(index)}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDeleteTodo(index)}>
                    Delete
                  </button>
                  <Link
                    to={{
                      pathname: `/todos/${index}`,
                      state: { todos },
                    }}
                  >
                    {todo.description ? "View Details" : null}
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
