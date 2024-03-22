import React, { useState, useEffect } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  status: string;
}

const App: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState<string>("");
  const [editTaskStatus, setEditTaskStatus] = useState<string>("");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTodoTasks = localStorage.getItem("todoTasks");
    const storedInProgressTasks = localStorage.getItem("inProgressTasks");
    const storedDoneTasks = localStorage.getItem("doneTasks");

    if (storedTodoTasks) setTodoTasks(JSON.parse(storedTodoTasks));
    if (storedInProgressTasks)
      setInProgressTasks(JSON.parse(storedInProgressTasks));
    if (storedDoneTasks) setDoneTasks(JSON.parse(storedDoneTasks));
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [todoTasks, inProgressTasks, doneTasks]);

  const handleAddTask = (status: string) => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000),
        title: newTaskTitle.trim(),
        status: status,
      };

      switch (status) {
        case "todo":
          setTodoTasks([...todoTasks, newTask]);
          break;
        case "inProgress":
          setInProgressTasks([...inProgressTasks, newTask]);
          break;
        case "done":
          setDoneTasks([...doneTasks, newTask]);
          break;
        default:
          break;
      }

      setNewTaskTitle("");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditTaskTitle(task.title);
    setEditTaskStatus(task.status);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      const updatedTasks = [...todoTasks, ...inProgressTasks, ...doneTasks].filter((task) => task.id !== editingTask.id);
      const updatedTask: Task = {
        ...editingTask,
        title: editTaskTitle,
        status: editTaskStatus,
      };
      switch (editTaskStatus) {
        case "todo":
          setTodoTasks([...updatedTasks, updatedTask].filter(task => task.status === "todo"));
          break;
        case "inProgress":
          setInProgressTasks([...updatedTasks, updatedTask].filter(task => task.status === "inProgress"));
          break;
        case "done":
          setDoneTasks([...updatedTasks, updatedTask].filter(task => task.status === "done"));
          break;
        default:
          break;
      }
      setEditingTask(null);
      setEditTaskTitle("");
      setEditTaskStatus("");
    }
  };

  const handleDeleteTask = (task: Task) => {
    const updatedTasks = [...todoTasks, ...inProgressTasks, ...doneTasks].filter((t) => t.id !== task.id);
    switch (task.status) {
      case "todo":
        setTodoTasks(updatedTasks.filter(task => task.status === "todo"));
        break;
      case "inProgress":
        setInProgressTasks(updatedTasks.filter(task => task.status === "inProgress"));
        break;
      case "done":
        setDoneTasks(updatedTasks.filter(task => task.status === "done"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="column todo">
        <h2>Todo</h2>
        <ul>
          {todoTasks.map((task) => (
            <li key={task.id}>
              {editingTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <>
                  {task.title}
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={() => handleAddTask("todo")}>Add Task</button>
      </div>
      <div className="column inProgress">
        <h2>In Progress</h2>
        <ul>
          {inProgressTasks.map((task) => (
            <li key={task.id}>
              {editingTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <>
                  {task.title}
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={() => handleAddTask("inProgress")}>Add Task</button>
      </div>
      <div className="column done">
        <h2>Done</h2>
        <ul>
          {doneTasks.map((task) => (
            <li key={task.id}>
            {editingTask?.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={() => handleAddTask("done")}>Add Task</button>
    </div>
  </div>
);
};

export default App;
