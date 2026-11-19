import { useState } from "react";
import exploreCourses from "../data/exploreCourses";

function Explore({ onAddCourse }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(exploreCourses.map((course) => course.category)),
  ];

  const filteredCourses = exploreCourses.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page">
      <h1>Explore Courses</h1>
      <p>Discover new subjects and expand your knowledge.</p>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? "active" : ""
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="explore-courses">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="explore-course-card" key={course.id}>
              <h2>{course.name}</h2>
              <p>{course.description}</p>

              <div className="course-info">
                <span>{course.category}</span>
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>

              <button onClick={() => onAddCourse(course)}>
                Add to My Courses
              </button>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;