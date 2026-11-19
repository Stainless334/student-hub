import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function UpcomingTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskType, setTaskType] = useState("Assignment");
  const [dueDate, setDueDate] = useState("");

  function addTask(event) {
    event.preventDefault();

    if (!taskTitle.trim() || !dueDate) {
      alert("Please enter a task title and due date.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      type: taskType,
      dueDate,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setDueDate("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(id) {
    const selectedTask = tasks.find(task => task.id === id);

    const updatedTitle = prompt(
      "Enter the new task title:",
      selectedTask.title
    );

    if (!updatedTitle || !updatedTitle.trim()) return;

    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, title: updatedTitle.trim() }
          : task
      )
    );
  }

  return (
    <section className="upcoming-tasks">
      <h2>Upcoming Tasks</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={event => setTaskTitle(event.target.value)}
        />

        <select
          value={taskType}
          onChange={event => setTaskType(event.target.value)}
        >
          <option>Assignment</option>
          <option>Quiz</option>
          <option>Lesson</option>
          <option>Study Session</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={event => setDueDate(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : (
          tasks.map(task => (
            <div className="task-card" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.type} · Due: {task.dueDate}</p>
                <p>{task.completed ? "Completed" : "Pending"}</p>
              </div>

              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button onClick={() => editTask(task.id)}>
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default UpcomingTasks;