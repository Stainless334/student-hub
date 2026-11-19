import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function StudyPlanner({ courses }) {
  const [sessions, setSessions] = useLocalStorage("studySessions", []);
  const [priority, setPriority] = useState("Medium");
  const [course, setCourse] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.completed
  ).length;

  const pendingSessions = totalSessions - completedSessions;

  const completionRate =
    totalSessions === 0
      ? 0
      : Math.round((completedSessions / totalSessions) * 100);

  function addSession(event) {
    event.preventDefault();

    if (!course.trim() || !studyDate || !startTime || !endTime) {
      alert("Please complete all fields.");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be later than start time.");
      return;
    }

    const newSession = {
      id: Date.now(),
      course: course.trim(),
      studyDate,
      startTime,
      endTime,
      priority,
      completed: false,
    };

    setSessions([...sessions, newSession]);

    setCourse("");
    setStudyDate("");
    setStartTime("");
    setEndTime("");
    setPriority("Medium");
  }

  function toggleSession(id) {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  }

  function deleteSession(id) {
    setSessions(sessions.filter((session) => session.id !== id));
  }

  return (
    <main className="study-planner">
      <section className="study-statistics">
        <h2>Study Statistics</h2>

        <div className="statistics-grid">
          <div className="study-stat-card">
            <h3>Total Sessions</h3>
            <p>{totalSessions}</p>
          </div>

          <div className="study-stat-card">
            <h3>Completed Sessions</h3>
            <p>{completedSessions}</p>
          </div>

          <div className="study-stat-card">
            <h3>Pending Sessions</h3>
            <p>{pendingSessions}</p>
          </div>

          <div className="study-stat-card">
            <h3>Completion Rate</h3>
            <p>{completionRate}%</p>
          </div>
        </div>
      </section>
      <h1>Study Planner</h1>
      <p>Organise your study sessions and stay consistent.</p>

      <form onSubmit={addSession}>
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

        <input
          type="date"
          value={studyDate}
          onChange={(event) => setStudyDate(event.target.value)}
        />

        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />

        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
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

        <button type="submit">Add Study Session</button>
      </form>

      <section>
        <h2>Your Study Sessions</h2>

        {sessions.length === 0 ? (
          <p>No study sessions planned yet.</p>
        ) : (
          sessions.map((session) => (
            <article key={session.id}>
              <h3>{session.course}</h3>
              <p>Date: {session.studyDate}</p>
              <p>
                Time: {session.startTime} - {session.endTime}
              </p>
              <p>Priority: {session.priority || "Medium"}</p>
              <p>{session.completed ? "Completed" : "Pending"}</p>

              <button onClick={() => toggleSession(session.id)}>
                {session.completed ? "Undo" : "Mark Completed"}
              </button>

              <button onClick={() => deleteSession(session.id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default StudyPlanner;