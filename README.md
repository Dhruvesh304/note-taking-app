# 📝 Glossary Note-Taking App

A minimal and modern note-taking app built using **React.js** and **Tailwind CSS**, with support for **highlighting glossary terms** inside your notes.

---

## 🚀 Features

- ✍️ Create, edit, and delete notes
- 📌 Pin and manage important notes
- 🧠 Auto-highlight glossary terms in text
- 📚 Full rich-text editing with custom-built editor
- ⚡ Fast performance with Vite
- 💡 Clean and responsive UI using Tailwind CSS

---

## 📁 Folder Structure

├── public/
├── src/
│ ├── assets/ # Static assets
│ ├── Components/ # Reusable components
│ │ ├── FullEditor.jsx
│ │ ├── Glossary.jsx
│ │ ├── NavBar.jsx
│ │ ├── Note.jsx
│ │ └── Notes.jsx
│ ├── App.jsx
│ ├── App.css
│ ├── GlossaryViewer.jsx
│ ├── index.css
│ └── main.jsx
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json

---

## 📦 Tech Stack

- **React.js** – UI Library
- **Tailwind CSS** – Utility-first CSS framework
- **Vite** – Fast build tool and dev server
- **Custom Glossary Logic** – For highlighting terms

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
2. Install Dependencies
bash
Copy code
npm install
3. Run the App
bash
Copy code
npm run dev
Then open http://localhost:5173 in your browser.
✨ Customization
To modify the glossary terms used in the highlighting logic, go to:

css
Copy code
src/Components/Glossary.jsx
You can update the list or logic to suit your use case.
📌 Future Improvements (To-Do)
 Add authentication (Login/Signup)

 Cloud sync with Firebase or MongoDB

 Tagging or categorization for notes

 Dark mode toggle

 Search functionality
🙏 Acknowledgements
React Docs – https://reactjs.org/

Tailwind CSS – https://tailwindcss.com/

Vite – https://vitejs.dev/
