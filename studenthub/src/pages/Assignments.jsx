import { useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const suggestedAssignments = [
  {
    id: 1,
    course: "Python Fundamentals",
    title: "Build a Simple Calculator",
    description: "Create a calculator that performs basic arithmetic operations.",
    priority: "Medium",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
  },
  {
    id: 2,
    course: "React Development",
    title: "Build a Reusable Component",
    description: "Create a reusable React component that accepts props.",
    priority: "Medium",
    difficulty: "Intermediate",
    estimatedTime: "3 hours",
  },
  {
    id: 3,
    course: "JavaScript",
    title: "Build a To-Do List",
    description: "Create a to-do list that allows users to add and remove tasks.",
    priority: "High",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
  },
];

function Assignments({ courses }) {
  const [assignments, setAssignments] = useLocalStorage(
    "studentAssignments",
    []
  );

  const [title, setTitle] = useState("");
  const formRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [suggestedDueDate, setSuggestedDueDate] = useState("");
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const availableSuggestions = suggestedAssignments.filter(
    (suggestion) =>
      courses.some(
        (course) =>
          course.name.toLowerCase() === suggestion.course.toLowerCase()
      )
  );
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesCourse =
      courseFilter === "All" || assignment.course === courseFilter;

    const matchesStatus = 
      statusFilter === "All" || assignment.status === statusFilter;
      
    return matchesSearch && matchesCourse && matchesStatus;
  });
  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const overdueAssignments = assignments.filter(
    (assignment) =>
      assignment.status !== "Completed" &&
      assignment.dueDate &&
      assignment.dueDate < today
  ).length;

  function addAssignment(event) {
    event.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !course ||
      !dueDate
    ) {
      alert("Please complete all fields.");
      return;
    }
    if (editingAssignment !== null) {
      setAssignments((previous) =>
        previous.map((assignment) =>
          assignment.id === editingAssignment
            ? {
                ...assignment,
                title: title.trim(),
                description: description.trim(),
                course,
                dueDate,
                priority,
              }
            : assignment
        )
      );
    
      setEditingAssignment(null);
      setTitle("");
      setDescription("");
      setCourse("");
      setDueDate("");
      setPriority("Medium");
    
      alert("Assignment updated successfully!");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      course,
      dueDate,
      priority,
      status: "Pending",
    };

    setAssignments((previous) => [
      ...previous,
      newAssignment,
    ]);

    setTitle("");
    setDescription("");
    setCourse("");
    setDueDate("");
    setPriority("Medium");
  }
  function addSuggestedAssignment(suggestion) {
    setSelectedSuggestion(suggestion);
    setSuggestedDueDate("");
  }
  function saveSuggestedAssignment() {
    const alreadyAdded = assignments.some(
      (assignment) =>
        assignment.suggestionId === selectedSuggestion.id
    );
    
    if (alreadyAdded) {
      alert("You have already added this assignment!");
      setSelectedSuggestion(null);
      return;
    }
    if (!suggestedDueDate) {
      alert("Please select a due date!");
      return;
    }
  
    const newAssignment = {
      id: Date.now(),
      suggestionId: selectedSuggestion.id,
      title: selectedSuggestion.title,
      description: selectedSuggestion.description,
      course: selectedSuggestion.course,
      dueDate: suggestedDueDate,
      priority: selectedSuggestion.priority,
      status: "Pending",
    };
  
    setAssignments((previous) => [...previous, newAssignment]);
  
    setSelectedSuggestion(null);
    setSuggestedDueDate("");
  
    alert("Assignment added successfully!");
  }
  function toggleAssignmentStatus(id) {
    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status:
                assignment.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : assignment
      )
    );
  }
  function deleteAssignment(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmDelete) return;

    setAssignments((previous) =>
      previous.filter((assignment) => assignment.id !== id)
    );
  }

  function editAssignment(assignment) {
    setEditingAssignment(assignment.id);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setCourse(assignment.course);
    setDueDate(assignment.dueDate);
    setPriority(assignment.priority);
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }


  return (
    <main className="assignments-page">
      <h1>My Assignments</h1>
      <p>Organise your coursework and keep track of deadlines.</p>
      <section className="assignment-statistics">
        <h2>Assignment Overview</h2>
        
        <div className="assignment-stats-grid">
          <div className="assignment-stat-card">
            <h3>Total Assignments</h3>
            <p>{totalAssignments}</p>
          </div>
        
          <div className="assignment-stat-card">
            <h3>Completed</h3>
            <p>{completedAssignments}</p>
          </div>
        
          <div className="assignment-stat-card">
            <h3>Pending</h3>
            <p>{pendingAssignments}</p>
          </div>
        
          <div className="assignment-stat-card">
            <h3>Overdue</h3>
            <p>{overdueAssignments}</p>
          </div>
        </div>
      </section>

      <form ref={formRef} onSubmit={addAssignment}>
        <h2>
          {editingAssignment !== null
            ? "Edit Assignment"
            : "Add New Assignment"}
        </h2>
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Assignment description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <select
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        >
          <option value="">Select a course</option>

          {courses.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Due Date</label>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <label>Priority</label>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">
          {editingAssignment !== null
            ? "Update Assignment"
            : "Add Assignment"}
        </button>
      </form>

      <section className="suggested-assignments">
        <h2>Suggested Assignments</h2>
        <p>Explore assignments recommended for your courses.</p>

        <div className="suggestions-grid">
          {availableSuggestions.length > 0 ? (
            availableSuggestions.map((suggestion) => (
              <div className="suggestion-card" key={suggestion.id}>
                <h3>{suggestion.title}</h3>
            
                <p>{suggestion.description}</p>
            
                <p>Course: {suggestion.course}</p>
                <p>Difficulty: {suggestion.difficulty}</p>
                <p>Estimated time: {suggestion.estimatedTime}</p>
            
                <button
                  type="button"
                  onClick={() => addSuggestedAssignment(suggestion)}
                >
                  Add Assignment
                </button>
              </div>
            ))
          ) : (
            <p>No suggested assignments available for your courses yet.</p>
          )}
        </div>
        {selectedSuggestion && (
          <div className="suggestion-form">
            <h3>Set Assignment Deadline</h3>

            <p>{selectedSuggestion.title}</p>

            <label>Choose Due Date:</label>

            <input
              type="date"
              value={suggestedDueDate}
              onChange={(e) => setSuggestedDueDate(e.target.value)}
            />

            <button type="button" onClick={saveSuggestedAssignment}>
              Save Assignment
            </button>

            <button
              type="button"
              onClick={() => setSelectedSuggestion(null)}
            >
              Cancel
            </button>
          </div>
        )}

      </section>
        

      <section>
        <h2>Your Assignments</h2>

        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          value={courseFilter}
          onChange={(event) => setCourseFilter(event.target.value)}
        >
          <option value="All">All Courses</option>

          {courses.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="assignment-status-filters">
          <button
            type="button"
            className={statusFilter === "All" ? "active" : ""}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>
                
          <button
            type="button"
            className={statusFilter === "Pending" ? "active" : ""}
            onClick={() => setStatusFilter("Pending")}
          >
            Pending
          </button>
                
          <button
            type="button"
            className={statusFilter === "Completed" ? "active" : ""}
            onClick={() => setStatusFilter("Completed")}
          >
            Completed
          </button>
        </div>

        {assignments.length === 0 ? (
          <p>No assignments yet. Add your first assignment!</p>
        ) : (
          
          filteredAssignments.map((assignment) => (
            <article key={assignment.id}>
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p>Course: {assignment.course}</p>
              <p>Due: {assignment.dueDate}</p>
              <p>Priority: {assignment.priority}</p>
              <p>Status: {assignment.status}</p>
              <button
                type="button"
                onClick={() => toggleAssignmentStatus(assignment.id)}
              >
                {assignment.status === "Completed"
                  ? "Mark as Pending"
                  : "Mark as Completed"}
              </button>
              <button
                type="button"
                onClick={() => editAssignment(assignment)}
              >
                Edit
              </button>
              <button
                type="button"
                className="delete-assignment-btn"
                onClick={() => deleteAssignment(assignment.id)}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Assignments;