import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import { useState} from 'react';
import useLocalStorage from "./hooks/useLocalStorage";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import StudyPlanner from "./pages/StudyPlanner";
import CourseDetails from "./pages/CourseDetails";
import LessonViewer from "./pages/LessonViewer";
import Explore from "./pages/Explore";
import Notes from "./pages/Notes";
import Assignments from "./pages/Assignments";
import './App.css'

function App() {

  const [courses, setCourses] = useLocalStorage("courses", [
    { id: 1, name: "Python Fundamentals", progress: 0, completed: false },
    { id: 2, name: "React", progress: 0, completed: false },
    { id: 3, name: "Javascript", progress: 0, completed: false }
  ]);
  const [newCourse, setNewCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const { theme } = useContext(ThemeContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);



  const filteredCourses = courses.filter(course => {
    const matchesFilter =
      filter === "Completed"
        ? course.completed
        : filter === "In Progress"
          ? !course.completed
          :true
    const matchSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchSearch
  
  });
  const totalCourses = courses.length;

  const completedCourses = courses.filter(
    course => course.completed
  ).length;
  const inProgressCourses = courses.filter(
    course => !course.completed
  ).length;

  const overallProgress = totalCourses === 0
    ? 0
    : Math.round(
      courses.reduce((total, course) => total + course.progress, 0)
      / totalCourses
    );

    const addCourse = (event) => {
      event.preventDefault();
      if (newCourse.trim() === "") return;
      const formattedName = newCourse
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

        if (!formattedName) return;

        const alreadyExists = courses.some(
          course => course.name.toLowerCase() === formattedName.toLocaleLowerCase()
        );
        if (alreadyExists) {
          alert("This course already exists!");
          return;
        }

      const course = {
        id: Date.now(),
        name: formattedName,
        progress: 0,
        completed: false
      };
      setCourses(previousCourses => [...previousCourses, course]);
      
      setNewCourse("");
      
    };

    const deleteCourse = (selected) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (!confirmDelete) return;
      setCourses(previousCourses => 
        previousCourses.filter(course => course.id !== selected)
      );
    };
    const editCourse = (selectedId) => {
      const currentCourse = courses.find(
        course => course.id === selectedId
      );
      const newName = window.prompt(
        "Enter the new course",
        currentCourse.name
      );

      if (!newName || !newName.trim()) return;

      const formattedName = newName
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

      const alreadyExists = courses.some(
        course =>
          course.id !== selectedId &&
        course.name.toLowerCase() === formattedName.toLocaleLowerCase()
      );

      if (alreadyExists) {
        alert("A course with this name already exists!");
        return;
      }
      setCourses(previousCourses =>
        previousCourses.map(course =>
          course.id === selectedId
            ? {...course, name: formattedName}
            : course

        )
      );
    };

    const increaseProgress = (selectedId) => {
      setCourses(previousCourses =>
        previousCourses.map(course =>
          course.id === selectedId
            ? {
                ...course,
                progress: Math.min(course.progress + 10, 100),
                completed: Math.min(course.progress + 10, 100) === 100
              }
            : course
        )
      );
    };
    const [displayName, setDisplayName] = useLocalStorage(
      "displayName",
      ""
    );
    const addExploreCourse = (exploreCourse) => {
    const alreadyExists = courses.some(
      (course) =>
        course.name.toLowerCase() === exploreCourse.name.toLowerCase()
    );

    if (alreadyExists) {
      alert("You have already added this course!");
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: exploreCourse.name,
      progress: 0,
      completed: false,
    };

    setCourses((prevCourses) => [...prevCourses, newCourse]);

    alert("Course added successfully!");
    };


  return (
    <div className={`app ${theme} ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Navbar
        displayName={displayName} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                totalCourses={totalCourses}
                completedCourses={completedCourses}
                inProgressCourses={inProgressCourses}
                overallProgress={overallProgress}
                courses={courses}
                increaseProgress={increaseProgress}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <Courses
                newCourse={newCourse}
                setNewCourse={setNewCourse}
                addCourse={addCourse}
                filteredCourses={filteredCourses}
                increaseProgress={increaseProgress}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setFilter={setFilter}
                filter={filter}
              />
            }
          />
          <Route
            path="/study-planner"
            element={<StudyPlanner courses={courses} />}
          />
          <Route
            path="/courses/:courseId"
            element={<CourseDetails courses={courses} />}
          />
          <Route
            path="/courses/:courseId/modules/:moduleIndex/lessons/:lessonIndex"
            element={<LessonViewer courses={courses} />}
          />
          <Route 
            path="/explore" 
            element={<Explore onAddCourse={addExploreCourse} />}
          />
          <Route
            path="/assignments"
            element={<Assignments courses={courses} />}
          />
          <Route path="/notes" element={<Notes />} />
          <Route
            path="/settings"
            element={
              <Settings
                displayName={displayName}
                setDisplayName={setDisplayName}
              />
            }
          />
        </Routes>
      </main>

    </div>
    
  )
}

export default App