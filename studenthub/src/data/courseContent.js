const courseContent = {
  "Python Fundamentals": [
    {
      title: "Introduction to Python",
      lessons: [
        {
          title: "What is Python?",
          content: "Python is a popular, high-level programming language known for its readable syntax. It is used in web development, automation, data science, and artificial intelligence.",
          objectives: [
            "Understand what Python is.",
            "Identify common uses of Python.",
            "Understand why Python is beginner-friendly."
          ]
        },
        {
          title: "Installing Python",
          content: "Before writing Python programs, you need a Python interpreter. You can install Python on your computer or use an online development environment.",
          objectives: [
            "Understand what a Python interpreter does.",
            "Know where to get Python.",
            "Understand how to check your Python installation."
          ]
        },
        {
          title: "Your First Python Program",
          content: "A traditional first program in Python prints the message Hello, World! You can do this using the print() function.",
          objectives: [
            "Understand the print() function.",
            "Write your first Python statement.",
            "Run a simple Python program."
          ]
        }
      ]
    },
    {
      title: "Python Fundamentals",
      lessons: [
        {
          title: "Variables",
          content: "Variables are names used to store and refer to data. In Python, you create a variable by assigning a value to a name.",
          objectives: [
            "Understand what variables are.",
            "Create variables.",
            "Assign different values to variables."
          ]
        },
        {
          title: "Data Types",
          content: "Python provides different data types, including strings, integers, floats, and booleans. Each type represents a different kind of value.",
          objectives: [
            "Identify common Python data types.",
            "Understand the difference between strings and numbers.",
            "Use type() to inspect a value's type."
          ]
        },
        {
          title: "Operators",
          content: "Operators allow you to perform operations on values. Examples include arithmetic operators such as +, -, *, and /.",
          objectives: [
            "Understand arithmetic operators.",
            "Use comparison operators.",
            "Understand logical operators."
          ]
        }
      ]
    },
    {
      title: "Control Flow",
      lessons: [
        {
          title: "If Statements",
          content: "If statements allow a program to make decisions based on conditions.",
          objectives: ["Understand conditions.", "Write if statements.", "Use else and elif."]
        },
        {
          title: "For Loops",
          content: "For loops allow you to repeat instructions for each item in a sequence.",
          objectives: ["Understand iteration.", "Use for loops.", "Loop through sequences."]
        },
        {
          title: "While Loops",
          content: "While loops repeat instructions as long as a condition remains true.",
          objectives: ["Understand while loops.", "Write while loops.", "Avoid unintended infinite loops."]
        }
      ]
    }
  ],

  React: [
    {
      title: "Introduction to React",
      lessons: [
        {
          title: "What is React?",
          content: "React is a JavaScript library for building user interfaces using reusable components.",
          objectives: ["Understand what React is.", "Understand components.", "Identify where React is used."]
        },
        {
          title: "Setting Up React",
          content: "You can create a React project using tools such as Vite, which provides a development environment for building React applications.",
          objectives: ["Understand the React development environment.", "Know what Vite does.", "Recognise the basic project structure."]
        },
        {
          title: "Your First Component",
          content: "A React component is a reusable piece of user interface. Components are commonly written as JavaScript functions that return JSX.",
          objectives: ["Understand components.", "Create a function component.", "Render a component."]
        }
      ]
    },
    {
      title: "React Fundamentals",
      lessons: [
        {
          title: "JSX",
          content: "JSX is a syntax extension that allows you to write HTML-like markup inside JavaScript.",
          objectives: ["Understand JSX.", "Write JSX expressions.", "Recognise JSX differences from HTML."]
        },
        {
          title: "Props",
          content: "Props allow components to receive information from their parent components.",
          objectives: ["Understand props.", "Pass data between components.", "Read props inside a component."]
        },
        {
          title: "State",
          content: "State allows a component to remember information and update its interface when that information changes.",
          objectives: ["Understand component state.", "Use useState.", "Update state correctly."]
        }
      ]
    },
    {
      title: "React Hooks",
      lessons: [
        {
          title: "useState",
          content: "The useState Hook lets functional components store and update state.",
          objectives: ["Understand useState.", "Create state variables.", "Update state."]
        },
        {
          title: "useEffect",
          content: "The useEffect Hook lets components synchronise with external systems, such as browser APIs or network requests.",
          objectives: ["Understand useEffect.", "Understand dependencies.", "Recognise effect cleanup."]
        },
        {
          title: "Custom Hooks",
          content: "Custom Hooks allow you to reuse stateful logic across different React components.",
          objectives: ["Understand custom Hooks.", "Create a custom Hook.", "Reuse component logic."]
        }
      ]
    }
  ],

  Javascript: [
    {
      title: "JavaScript Basics",
      lessons: [
        {
          title: "Introduction to JavaScript",
          content: "JavaScript is a programming language commonly used to make websites interactive.",
          objectives: ["Understand JavaScript.", "Identify its uses.", "Understand its relationship with HTML and CSS."]
        },
        {
          title: "Variables",
          content: "JavaScript variables store values. You can declare them using let, const, or var.",
          objectives: ["Understand variables.", "Use let and const.", "Know when to use each."]
        },
        {
          title: "Data Types",
          content: "JavaScript has data types such as strings, numbers, booleans, objects, and undefined.",
          objectives: ["Identify common data types.", "Understand primitive values.", "Use typeof."]
        }
      ]
    },
    {
      title: "JavaScript Functions",
      lessons: [
        {
          title: "Functions",
          content: "Functions are reusable blocks of code designed to perform particular tasks.",
          objectives: ["Understand functions.", "Declare functions.", "Call functions."]
        },
        {
          title: "Parameters",
          content: "Parameters allow functions to receive values that they can use when executing.",
          objectives: ["Understand parameters.", "Pass arguments.", "Return values."]
        },
        {
          title: "Arrow Functions",
          content: "Arrow functions provide a shorter syntax for writing function expressions in JavaScript.",
          objectives: ["Recognise arrow functions.", "Write arrow functions.", "Understand basic syntax differences."]
        }
      ]
    },
    {
      title: "Advanced JavaScript",
      lessons: [
        {
          title: "Arrays",
          content: "Arrays store ordered collections of values. JavaScript provides methods for adding, removing, and transforming array items.",
          objectives: ["Create arrays.", "Access array elements.", "Use common array methods."]
        },
        {
          title: "Objects",
          content: "Objects store related data as key-value pairs.",
          objectives: ["Create objects.", "Access object properties.", "Update object properties."]
        },
        {
          title: "Promises",
          content: "Promises represent the eventual success or failure of an asynchronous operation.",
          objectives: ["Understand asynchronous operations.", "Understand Promise states.", "Recognise then and catch."]
        }
      ]
    }
  ]
};

export default courseContent;