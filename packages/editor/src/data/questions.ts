type File = {
  name: string;
  language: "javascript" | "css" | "html";
  content: string;
};

type QuestionerInfo = {
  name: String;
  profilePic: string;
  additionalInfo?: string;
};

type AllowedTech = "html" | "css" | "js" | "react";
type AllowedCompanies =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "Apple"
  | "Microsoft";

type TechStack = AllowedTech[];
type Companies = AllowedCompanies[];

type Requirement = string[]; // An array of strings representing the requirements.
type Note = string[]; // An array of strings representing the notes.

type QuestionType = "ui" | "logical";

type CommonInput = number[] | string | number | object;
type CommonOutput = number | boolean | string | number[] | object;

type TestCases = {
  input: CommonInput; // More specific but still flexible input types
  output: CommonOutput; // More specific but still flexible output types
  description: string; // Description of the test case
};

type QuestionDetails = {
  name: string;
  questionaerInfo: QuestionerInfo;
  techStack: TechStack;
  difficulty: "Easy" | "Medium" | "Hard";
  time: number;
  questionDescription: string;
  requirements: Requirement;
  notes: Note;
  companies: Companies;
  questionType: QuestionType;
  testCases?: TestCases[];
};
export type Question = {
  initialVanillaFiles: File[];
  initialReactFiles: File[];
  solutionVanillaFiles: File[];
  solutionReactFiles: File[];
  questionDetails: QuestionDetails;
};

export const question: Question = {
  initialVanillaFiles: [
    {
      name: "index.html",
      language: "html",
      content: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add your task" />
        <div>
          <button>Submit</button>
        </div>
      </div>
      <ul>
        <li>
          <span>Walk the dog</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Water the plants</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Wash the dishes</span>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  </body>
</html>



`,
    },
    {
      name: "style.css",
      language: "css",
      content: `body {
  font-family: sans-serif;
}

`,
    },
    {
      name: "index.js",
      language: "javascript",
      content: `// Write your JavaScript here.

`,
    },
  ],
  initialReactFiles: [
    {
      name: "public/index.html",
      language: "html",
      content: `<!DOCTYPE html>
  <html>
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`,
    },
    {
      name: "src/App.js",
      language: "javascript",
      content: `
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add your task" />
        <div>
          <button>Submit</button>
        </div>
      </div>
      <ul>
        <li>
          <span>Walk the dog</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Water the plants</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Wash the dishes</span>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
}

`,
    },
    {
      name: "src/index.js",
      language: "javascript",
      content: `const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
    },
    {
      name: "src/style.css",
      language: "css",
      content: `body {
  font-family: sans-serif;
}
`,
    },
  ],
  solutionVanillaFiles: [
    {
      name: "index.html",
      language: "html",
      content: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task" />
        <div>
          <button id="submit">Submit</button>
        </div>
      </div>
      <ul>
        <li>
          <span>Walk the dog</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Water the plants</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Wash the dishes</span>
          <button>Delete</button>
        </li>
      </ul>
    </div>
    <script src="src/index.js"></script>
  </body>
</html>



`,
    },
    {
      name: "style.css",
      language: "css",
      content: `body {
  font-family: sans-serif;
}
`,
    },
    {
      name: "index.js",
      language: "javascript",
      content: `
(() => {
  // Retain a reference to the elements which persist
  // throughout usage of the app.
  const $inputEl = document.querySelector('input');
  const $submitButtonEl = document.querySelector('#submit');
  const $todoListEl = document.querySelector('ul');

  function addTask(label) {
    // Create the DOM elements for the new task.
    const $newTaskElement = document.createElement('li');

    const $span = document.createElement('span');
    $newTaskElement.appendChild($span);
    // Using Node.textContent here instead of Element.innerHTML
    // to prevent XSS (Cross Site Scripting).
    $span.textContent = label;

    const $btn = document.createElement('button');
    $btn.textContent = 'Delete';
    $newTaskElement.appendChild($btn);

    // Add the new task to the list.
    $todoListEl.append($newTaskElement);
  }

  function deleteTask($itemEl) {
    // Remove the task from the list.
    $itemEl.parentNode.removeChild($itemEl);
  }

  $submitButtonEl.addEventListener('click', () => {
    addTask($inputEl.value);
    // Reset the input so that new tasks can be added.
    $inputEl.value = '';
  });

  // Add a listener to the list instead of individual tasks.
  // This is called event delegation and the benefit is that
  // the Delete button of newly-added tasks will also respond
  // to clicks without you having to manually add event listeners
  // to them. You also don't have to remove any event listeners
  // when the task is removed.
  $todoListEl.addEventListener('click', (event) => {
    // Check that the button is being clicked and not something
    // else (e.g. the task label).
    if (event.target.tagName === 'BUTTON') {
      deleteTask(event.target.parentNode);
    }
  });
})();


`,
    },
  ],
  solutionReactFiles: [
    {
      name: "public/index.html",
      language: "html",
      content: `<!DOCTYPE html>
  <html>
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`,
    },
    {
      name: "src/App.js",
      language: "javascript",
      content: `let id = 0;

const INITIAL_TASKS = [
  { id: id++, label: 'Walk the dog' },
  { id: id++, label: 'Water the plants' },
  { id: id++, label: 'Wash the dishes' },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              setTasks(
                tasks.concat({
                  id: id++,
                  label: newTask.trim(),
                }),
              );
              setNewTask('');
            }}>
            Submit
          </button>
        </div>
      </div>
      <ul>
        {tasks.map(({ id, label }) => (
          <li key={id}>
            <span>{label}</span>
            <button
              onClick={() => {
                setTasks(
                  tasks.filter((task) => task.id !== id),
                );
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


`,
    },
    {
      name: "src/index.js",
      language: "javascript",
      content: `const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
    },
    {
      name: "src/style.css",
      language: "css",
      content: `body {
  font-family: sans-serif;
}

`,
    },
  ],
  questionDetails: {
    name: "Todo List",
    questionaerInfo: {
      name: "YanghSun Tay",
      profilePic:
        "https://media.licdn.com/dms/image/v2/D5603AQFB72zuIqxYrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684230919345?e=1744848000&v=beta&t=k1XZNF3EGY4g8MbqRfgp6bGPxWYQdH5_9cRp73CWgu0",
      additionalInfo: "Ex-Meta Staff Engineer",
    },
    techStack: ["html", "js", "react"],
    difficulty: "Medium",
    time: 20,
    questionDescription: `You're given some existing HTML for a Todo List app. Add the following functionality to the app:

Add new tasks on clicking the "Submit" button, 
The <input> field should be cleared upon successful addition, 
Remove tasks from the Todo List upon clicking the "Delete" button.`,
    requirements: [],
    notes: [
      `The focus of this question is on functionality, not the styling. There's no need to write any custom CSS.`,
      `You may modify the markup (e.g. adding ids, data attributes, replacing some tags, etc), but the result should remain the same visually.`,
      `You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).`,
    ],
    companies: ["Apple", "Microsoft", "Twitter"],
    questionType: "ui",
  },
};
