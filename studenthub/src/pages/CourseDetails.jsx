import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import courseContent from "../data/courseContent";

const courseDescriptions = {
  "Python Fundamentals":
    "Learn Python from the ground up, covering variables, data types, operators, functions and control flow.",

  React:
    "Learn how to build modern interactive user interfaces using React, components, props, state and Hooks.",

  Javascript:
    "Master JavaScript fundamentals and learn how to create dynamic and interactive web applications.",
};

function CourseDetails({ courses }) {
  const { courseId } = useParams();

  const [completedLessons] = useLocalStorage(
    "completedLessons",
    []
  );

  const course = courses.find(
    item => String(item.id) === courseId
  );

  if (!course) {
    return (
      <main>
        <h2>Course not found</h2>
        <Link to="/courses">Back to My Courses</Link>
      </main>
    );
  }

  const modules = courseContent[course.name] || [];

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      moduleIndex,
      lessonIndex,
      id: `${course.id}-${moduleIndex}-${lessonIndex}`,
    }))
  );

  const totalLessons = allLessons.length;

  const completedCount = allLessons.filter(lesson =>
    completedLessons.includes(lesson.id)
  ).length;

  const remainingLessons = totalLessons - completedCount;

  const progress =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

  const nextLesson = allLessons.find(
    lesson => !completedLessons.includes(lesson.id)
  );

  const courseObjectives = [
    ...new Set(
      allLessons.flatMap(lesson => lesson.objectives)
    ),
  ];
  const [showObjectives, setShowObjectives] = useState(false);

  return (
    <main className="course-details">
      <Link to="/courses">← Back to My Courses</Link>

      <section className="course-overview">
        <h1>{course.name}</h1>

        <p>
          {courseDescriptions[course.name] ||
            `Explore the lessons and modules in ${course.name}.`}
        </p>

        <div className="course-statistics">
          <div>
            <h3>{totalLessons}</h3>
            <p>Total Lessons</p>
          </div>

          <div>
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>

          <div>
            <h3>{remainingLessons}</h3>
            <p>Remaining</p>
          </div>
        </div>
      </section>

      <section className="course-progress">
        <h2>Your Progress</h2>

        <p>{progress}% completed</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {progress === 100 ? (
          <p>Congratulations! You've completed this course!</p>
        ) : nextLesson ? (
          <Link
            className="continue-learning-button"
            to={`/courses/${course.id}/modules/${nextLesson.moduleIndex}/lessons/${nextLesson.lessonIndex}`}
          >
            Continue Learning →
          </Link>
        ) : null}
      </section>

      <section className="course-objectives">
        <button
          className="objectives-toggle"
          onClick={() => setShowObjectives(!showObjectives)}
        >
          <h2>What You'll Learn</h2>
            
          <span>{showObjectives ? "⤊" : "⤋"}</span>
        </button>
            
        <div
          className={`objectives-content ${
            showObjectives ? "expanded" : ""
          }`}
        >
          <ul>
            {courseObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="course-syllabus">
        <h2>Course Syllabus</h2>

        {modules.length === 0 ? (
          <p>No course content has been added yet.</p>
        ) : (
          modules.map((module, moduleIndex) => {
            const moduleCompleted = module.lessons.filter(
              (_, lessonIndex) =>
                completedLessons.includes(
                  `${course.id}-${moduleIndex}-${lessonIndex}`
                )
            ).length;

            const moduleProgress = Math.round(
              (moduleCompleted / module.lessons.length) * 100
            );

            return (
              <article
                className="course-module"
                key={moduleIndex}
              >
                <h3>
                  Module {moduleIndex + 1}: {module.title}
                </h3>

                <p>
                  {moduleCompleted} of {module.lessons.length} lessons completed
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${moduleProgress}%` }}
                  ></div>
                </div>

                <ul>
                  {module.lessons.map((lesson, lessonIndex) => {
                    const lessonId = `${course.id}-${moduleIndex}-${lessonIndex}`;

                    const isCompleted =
                      completedLessons.includes(lessonId);

                    return (
                      <li key={lessonIndex}>
                        <Link
                          to={`/courses/${course.id}/modules/${moduleIndex}/lessons/${lessonIndex}`}
                        >
                          {isCompleted ? "✓ " : "○ "}
                          {lesson.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default CourseDetails;