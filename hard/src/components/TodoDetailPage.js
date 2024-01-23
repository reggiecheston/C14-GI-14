import React, { Component } from "react";
import { useParams } from "react-router-dom";

class TodoDetailPage extends Component {
  render() {
    const { match, location } = this.props;
    const { id } = match?.params || {};
    const todos = location?.state?.todos;

    if (!id || !todos || !todos[id]) {
      return <div>No details matching your selection.</div>;
    }

    const todo = todos[id];

    return (
      <div>
        <h2>Todo Detail Page</h2>
        <p>Todo ID: {id}</p>
        <p>Todo Text: {todo.text}</p>
        {todo.detailedDescription && (
          <p>Detailed Description: {todo.detailedDescription}</p>
        )}
      </div>
    );
  }
}

export default TodoDetailPage;
