import { useParams, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import courseContent from "../data/courseContent";

function LessonViewer({ courses }) {
  const { courseId, moduleIndex, lessonIndex } = useParams();

  const course = courses.find(
    item => String(item.id) === courseId
  );

  const [completedLessons, setCompletedLessons] = useLocalStorage(
    "completedLessons",
    []
  );

  if (!course) {
    return <h2>Course not found.</h2>;
  }

  const modules = courseContent[course.name] || [];

  const currentModule = modules[Number(moduleIndex)];
  const lesson = currentModule?.lessons[Number(lessonIndex)];

  if (!lesson) {
    return (
      <main>
        <h2>Lesson not found.</h2>
        <Link to={`/courses/${course.id}`}>
          Back to Course
        </Link>
      </main>
    );
  }

  // Create a unique ID for this lesson
  const lessonId = `${course.id}-${moduleIndex}-${lessonIndex}`;

  const isCompleted = completedLessons.includes(lessonId);

  // Get all lessons in the course
  const allLessons = modules.flatMap((module, mIndex) =>
    module.lessons.map((item, lIndex) => ({
      ...item,
      moduleIndex: mIndex,
      lessonIndex: lIndex
    }))
  );

  const currentPosition = allLessons.findIndex(
    item =>
      item.moduleIndex === Number(moduleIndex) &&
      item.lessonIndex === Number(lessonIndex)
  );

  const previousLesson = allLessons[currentPosition - 1];
  const nextLesson = allLessons[currentPosition + 1];

  function toggleCompleted() {
    if (isCompleted) {
      setCompletedLessons(
        completedLessons.filter(id => id !== lessonId)
      );
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  }

  return (
    <main className="lesson-viewer">
      <Link to={`/courses/${course.id}`}>
        ← Back to {course.name}
      </Link>

      <h1>{lesson.title}</h1>

      <p>
        Module {Number(moduleIndex) + 1}: {currentModule.title}
      </p>

      <section>
        <h2>Lesson Content</h2>
        <p>{lesson.content}</p>
      </section>

      <section>
        <h2>Learning Objectives</h2>

        <ul>
          {lesson.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </section>

      <button onClick={toggleCompleted}>
        {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
      </button>

      <p>
        {isCompleted ? "Lesson completed!" : "Lesson not completed yet."}
      </p>

      <div className="lesson-navigation">
        {previousLesson ? (
          <Link
            to={`/courses/${course.id}/modules/${previousLesson.moduleIndex}/lessons/${previousLesson.lessonIndex}`}
          >
            ← Previous Lesson
          </Link>
        ) : (
          <span>First Lesson</span>
        )}

        {nextLesson ? (
          <Link
            to={`/courses/${course.id}/modules/${nextLesson.moduleIndex}/lessons/${nextLesson.lessonIndex}`}
          >
            Next Lesson →
          </Link>
        ) : (
          <span>Last Lesson</span>
        )}
      </div>
    </main>
  );
}

export default LessonViewer;