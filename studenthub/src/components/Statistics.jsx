function Statistics({ totalCourses, completedCourses, inProgressCourses, overallProgress }) {
    return (
      <div className='statistics'>
        <h2>My Learning Statistics</h2>

        <div className='stats-container'>
          <div className='stat-card'>
            <h3>Total Courses</h3>
            <p>{totalCourses}</p>
          </div>
          <div className='stat-card'>
            <h3>Completed</h3>
            <p>{completedCourses}</p>
          </div>
          <div className='stat-card'>
            <h3>In Progress</h3>
            <p>{inProgressCourses}</p>
          </div>
          <div className='stat-card'>
            <h3>Overall Progress</h3>
            <p>{overallProgress}%</p>
          </div>
        </div>
      </div>
    );
}

export default Statistics