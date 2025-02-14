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
    <form>
      <input type="text" />
    </form>
    <!-- You can ignore this file, it is only used by GFE to
      intercept the form submission event. -->
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
      content: `(() => {
  const SUBMIT_URL =
    'https://www.greatfrontend.com/api/questions/contact-form';

  const $form = document.querySelector('form');
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if ($form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }

    if ($form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }

    try {
      const formData = new FormData($form);
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      const text = await response.text();
      alert(text);
    } catch (_) {
      alert('Error submitting form!');
    }
  });
})();
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
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}>
      <input type="text" />
    </form>
  );
}

const SUBMIT_URL =
  'https://www.greatfrontend.com/api/questions/contact-form';

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;

  try {
    if (form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }

    if (form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }

    const formData = new FormData(form);
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    const text = await response.text();
    alert(text);
  } catch (_) {
    alert('Error submitting form!');
  }
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
    <form
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="post">
      <div>
        <label for="name-input">Name</label>
        <input id="name-input" name="name" type="text" />
      </div>
      <div>
        <label for="email-input">Email</label>
        <input id="email-input" name="email" type="email" />
      </div>
      <div>
        <label for="message-input">Message</label>
        <textarea
          id="message-input"
          name="message"></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
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

form {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

label {
  font-size: 12px;
}

input,
textarea {
  display: block;
}

`,
    },
    {
      name: "index.js",
      language: "javascript",
      content: `
(() => {
  const SUBMIT_URL =
    'https://www.greatfrontend.com/api/questions/contact-form';

  const $form = document.querySelector('form');
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if ($form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }

    if ($form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }

    try {
      const formData = new FormData($form);
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      const text = await response.text();
      alert(text);
    } catch (_) {
      alert('Error submitting form!');
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
      content: `function App() {
  return (
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="post">
      <div>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="message-input">Message</label>
        <textarea
          id="message-input"
          name="message"></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
}

const SUBMIT_URL =
  'https://www.greatfrontend.com/api/questions/contact-form';

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;

  try {
    if (form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }

    if (form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }

    const formData = new FormData(form);
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    const text = await response.text();
    alert(text);
  } catch (_) {
    alert('Error submitting form!');
  }
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

form {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

label {
  font-size: 12px;
}

input,
textarea {
  display: block;
}

`,
    },
  ],
  questionDetails: {
    name: "Contact Form",
    questionaerInfo: {
      name: "YanghSun Tay",
      profilePic:
        "https://media.licdn.com/dms/image/v2/D5603AQFB72zuIqxYrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684230919345?e=1744848000&v=beta&t=k1XZNF3EGY4g8MbqRfgp6bGPxWYQdH5_9cRp73CWgu0",
      additionalInfo: "Ex-Meta Staff Engineer",
    },
    techStack: ["html", "js"],
    difficulty: "Easy",
    time: 15,
    questionDescription: `Building forms is a common task in Front End. In this exercise, we will build a basic "Contact Us" form, commonly seen on marketing websites for visitors to ask questions or provide feedback.`,
    requirements: [
      `The form should contain the following elements:
Name field,
Email field,
Message field, (Since the message can be long, a <textarea> will be more suitable.),
Submit button,
Contains the text "Send",
Clicking on the submit button submits the form.`,
      `The form and submission should be implemented entirely in HTML. Do not use any JavaScript or framework-specific features for this question.`,
      `There is no need to do any client-side validation on the fields. Validation will be done on the server side.`,
    ],
    notes: [
      `You do not need JavaScript for this question, the focus is on HTML form validation and submission.`,
    ],
    companies: ["Apple", "Microsoft"],
    questionType: "ui",
  },
};
