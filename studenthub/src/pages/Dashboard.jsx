import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import Statistics from "../components/Statistics";
import CourseCard from "../components/CourseCard";
import UpcomingTasks from "../components/UpcomingTasks";

function Dashboard({
  totalCourses,
  completedCourses,
  inProgressCourses,
  overallProgress,
  courses,
  increaseProgress,
  editCourse,
  deleteCourse
}) {
  const activeCourse = courses.find(course => !course.completed);

  return (
    <main className="dashboard-page">

      {/* Welcome Section */}
      <section className="dashboard-hero">
        <Welcome />
        <p>
          Your learning journey starts here. Keep learning,
          stay consistent and achieve your goals.
        </p>
      </section>

      {/* Learning Statistics */}
      <Statistics
        totalCourses={totalCourses}
        completedCourses={completedCourses}
        inProgressCourses={inProgressCourses}
        overallProgress={overallProgress}
      />

      {/* Continue Learning */}
      <section className="continue-learning">
        <h2>Continue Learning</h2>

        {activeCourse ? (
          <div className="active-course">
            <div>
              <h3>{activeCourse.name}</h3>
              <p>{activeCourse.progress}% completed</p>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${activeCourse.progress}%` }}
                ></div>
              </div>
            </div>

            <Link to="/courses" className="continue-button">
              Continue Learning
            </Link>
          </div>
        ) : (
          <p>No active courses. Add a course to get started!</p>
        )}
      </section>
      <UpcomingTasks />
      

      {/* My Learning */}
      <section className="my-learning">
        <div className="section-heading">
          <h2>My Learning</h2>
          <Link to="/courses">View All</Link>
        </div>

        <div className="course-container">
          {courses.slice(0, 3).map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onIncreaseProgress={increaseProgress}
              onEdit={editCourse}
              onDelete={deleteCourse}
            />
          ))}
        </div>
      </section>

    </main>
  );
}

export default Dashboard;