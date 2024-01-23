import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoListPage from "./components/TodoListPage";
import TodoDetailPage from "./components/TodoDetailPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todos/:id" element={<TodoDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
