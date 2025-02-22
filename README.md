# Frontend Forge

🚀 **Frontend Forge** is an open-source coding platform where developers can practice frontend challenges using **HTML, CSS, JavaScript, and React**. It features an embedded browser and code editor, allowing users to solve UI design challenges and logical coding problems interactively.

---

## 🌟 Features

- 🖥 **UI Design Challenges** – Build and improve frontend skills by solving design problems.
- 🧠 **Logical Coding Problems** – Solve JavaScript-based algorithmic challenges.
- 📝 **Embedded Code Editor** – Write and test code directly in the browser.
- ⚡ **Turborepo Monorepo** – Structured for scalable frontend development.
- 🤝 **Open Source Contributions** – Add new challenges and help improve the platform!

---

## 📂 Folder Structure

```
frontend-forge/
├── apps/
│   ├── web/       # Main NextJs application (frontend + backend)
│
├── packages/
│   ├── ui/        # ShadCN-based UI components
│   ├── editor/    # Custom code editor component
│
├── .turbo/        # Turbo cache (ignored)
├── .next/         # Next.js build folder (ignored)
├── node_modules/  # Dependencies (ignored)
├── package.json   # Root package.json for dependencies
├── turbo.json     # Turborepo configuration
└── README.md      # You are here! 🎉
```

---

## 🛠 Getting Started

### 1️⃣ **Fork & Clone the Repository**
```sh
git clone https://github.com/Frontend-Forge/frontend-forge
cd frontend-forge
```

### 2️⃣ **Install Dependencies**
```sh
pnpm install  # Ensure you have pnpm installed
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env.local` file inside `apps/web/` and add:
```
DATABASE_URL=your_database_url
```

### 4️⃣ **Setup Database**
- Create a collection named `questions` in your database.
- You can find sample questions in [this repository](https://github.com/Frontend-Forge/questions).

### 5️⃣ **Run the Project**
```sh
pnpm dev  # Starts the development server
```
🚀 The app should now be running at `http://localhost:3000` 🎉

---

## 🤝 Contributing

We welcome contributions! Here’s how you can help:

### 🛠 **Setting Up the Project for Contribution**
1. **Fork the repository** and clone it locally.
2. Install dependencies using `pnpm install`.
3. Follow the [installation steps](#-getting-started).
4. Pick an issue from the [Issues tab](https://github.com/Frontend-Forge/frontend-forge/issues) and start working on it!

### 💡 **Want to Contribute Questions?**
If you'd like to add new frontend challenges, visit the [Frontend Forge Questions](https://github.com/Frontend-Forge/questions) repository and follow the contribution guidelines.

---

## ⭐ Support the Project
- Give this project a **star** ⭐ on GitHub!
- Share with your friends and fellow developers!

---

## 📜 License
Frontend Forge is open-source under the **MIT License**.

🚀 **Happy coding! Let’s build something amazing together.** 🎨💻
