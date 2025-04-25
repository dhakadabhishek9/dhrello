# Dhrello 🧩

Dhrello is a simple, Trello-inspired Kanban board built using **React**, **Redux**, and **React Beautiful DnD**. It allows users to manage tasks across different columns using an intuitive drag-and-drop interface.

[🌐 Live Demo](https://dhakadabhishek9.github.io/dhrello/)

---

## 🚀 Features

- ✅ Add new tasks
- ✏️ Edit task statuses by dragging between columns
- ❌ Delete tasks by dragging them into the "Delete" column
- 🔄 Real-time UI updates via Redux state management
- 🎨 Modal popup for task creation

---

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit**
- **Redux Saga**
- **React Beautiful DnD**
- **SCSS**
- **Toast Notifications**
- **axios**

---

## 📁 Project Structure

```plaintext
/public
  └── index.html        # Main HTML file

/src
  ├── components/       # Reusable UI components (e.g., Modal, TaskCard)
  ├── store/            # Redux slices, actions, and reducers
  │   ├── ticketsSlice.js
  │   ├── ticketsSaga.js
  │   └── rootReducer.js
  ├── utils/            # API calls and axios functions
  │   ├── apiCalls.js
  │   └── axios.js
  ├── App.jsx           
  ├── useApp.js         # Custom React hooks (e.g., useApp)
  └── main.jsx          # Entry point of the app, renders App component
  ```

## 📦 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/dhakadabhishek9/dhrello.git
   cd dhrello

2. **Install Dependencies**
    (Node Version must be above 20)
   ```bash
   npm i

3. **Run Local Server**
   ```bash
   npm run dev