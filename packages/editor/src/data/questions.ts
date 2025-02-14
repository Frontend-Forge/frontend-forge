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
      content:
        '<!DOCTYPE html>\n<html>\n<head>\n  <title>Vanilla JS App</title>\n</head>\n<body>\n  <div id="app">Hello</div>\n</body>\n</html>',
    },
    { name: "style.css", language: "css", content: "" },
    { name: "index.js", language: "javascript", content: "" },
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
      content: `function App() {
    return (
      <div>
        <h1>Hello from React!</h1>
      </div>
    );
  }`,
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
    { name: "src/style.css", language: "css", content: "" },
  ],
  solutionVanillaFiles: [
    {
      name: "index.html",
      language: "html",
      content: "Solution",
    },
    { name: "style.css", language: "css", content: ".solution {}" },
    {
      name: "index.js",
      language: "javascript",
      content: `console.log("solution")`,
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
      content: `function App() {
    return (
      <div>
        <h1>Solution from React!</h1>
      </div>
    );
  }`,
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
    { name: "src/style.css", language: "css", content: ".solution {}" },
  ],
  questionDetails: {
    name: "Tabs",
    questionaerInfo: {
      name: "YanghSun Tay",
      profilePic:
        "https://media.licdn.com/dms/image/v2/D5603AQFB72zuIqxYrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684230919345?e=1744848000&v=beta&t=k1XZNF3EGY4g8MbqRfgp6bGPxWYQdH5_9cRp73CWgu0",
      additionalInfo: "Ex-Meta Staff Engineer",
    },
    techStack: ["html", "css", "js"],
    difficulty: "Medium",
    time: 15,
    questionDescription: `Build a tabs component that displays one panel of content at a
      time depending on the active tab element. Some HTML is provided
      for you as example contents.`,
    requirements: [
      `Clicking on a tab makes it the active tab. Add a visual
                indication (e.g. using blue text color) for the active tab to
                differentiate it from the non-active tabs.`,
      `At all times, only one panel's contents should be
                displayed — the one corresponding to the active tab's.`,
    ],
    notes: [
      `The focus of this question is on functionality, not the
                styling. There's no need to write any custom CSS except for
                highlighting the active tab.`,
      `The focus of this question is on functionality, not the
                styling. There's no need to write any custom CSS except for
                highlighting the active tab.`,
      `You may want to think about ways to improve the user
                experience of the application and implement them (you get bonus
                credit for doing that during interviews`,
    ],
    companies: ["Google", "Apple", "Twitter"],
  },
};
