// function calculateRemainingCourses(totalCourses, completedCourses) {
//     let remainingCourses = totalCourses - completedCourses;
//     return remainingCourses;
// }

// console.log(calculateRemainingCourses(10, 4))

// let courses = ["Python", "Javascript", "React", "AI Engineering", "Database"];
// console.log(courses[3]);
// console.log(courses[2]);

// console.log(courses);

// let courses = ["Python", "Javascript", "React"];
// courses.push("AI Engineering");
// courses.push("Database");
// console.log(courses)
// console.log(courses.length)
// for (let i = 0; i < courses.length; i++) {
//     console.log(courses[i])
// }

// const secondCourse = {
//     name: "React",
//     instructor: "Dave",
//     progress: 25,
//     completed: false

// };
// console.log(secondCourse.name);
// console.log(secondCourse.progress);
// console.log(secondCourse.completed);

const course = [
    {
        name:"Python",
        instructor: "Alex",
        progress: 60
    },
    {
        name: "React",
        instructor: "Sarah",
        progress: 25
    },
    {
        name: "Javascript",
        instructor: "David",
        progress: 40
    }
]

for (let i= 0; i < course.length; i++){
    console.log(course[i].name + " - " + course[i].progress + "%")
};

 [
          { id: 1, name: "Python Fundamentals", progress: 0, completed: false},
          { id: 2, name: "React", progress: 0, completed: false},
          { id: 3, name: "Javascript", progress: 0, completed: false}
        ];