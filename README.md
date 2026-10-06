

# ⚡ SyncBoard — Real-Time Collaborative Kanban Workspace

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Socket.io-4.7.5-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

SyncBoard is a full-stack, real-time collaborative Kanban application modeled after Trello. Built with the **MERN** stack and **Socket.io**, changes made by any user—such as dragging cards between columns, editing task metadata, or deleting items—are immediately persisted to **MongoDB** and broadcasted live to all connected clients without needing a page refresh.

---

## 📸 Screenshots

> *Add screenshots or a GIF of your running application here!*

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ [⚡ SyncBoard]                           🟢 2 Users Online              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  TO DO [2]               IN PROGRESS [1]          DONE [1]              │
│  ┌────────────────────┐  ┌────────────────────┐   ┌──────────────────┐  │
│  │ HIGH               │  │ LOW                │   │ MEDIUM           │  │
│  │ Design Wireframes  │  │ Configure Tailwind │   │ Project Setup    │  │
│  └────────────────────┘  └────────────────────┘   └──────────────────┘  │
│  ┌────────────────────┐                                                 │
│  │ MEDIUM             │                                                 │
│  │ Set Up Socket.io   │                                                 │
│  └────────────────────┘                                                 │
└─────────────────────────────────────────────────────────────────────────┘

```

---

## ✨ Features

* **⚡ Live Collaboration:** Bidirectional real-time state synchronization via WebSockets (Socket.io).
* **🎯 Drag and Drop:** Smooth task reordering within columns and status transfers across columns powered by `@hello-pangea/dnd`.
* **🍃 Data Persistence:** Full MongoDB & Mongoose schema design with dynamic database seeding on first launch.
* **🟢 Active Presence Counter:** Live tracking of connected active users.
* **🎨 Dark Mode UI:** Modern, clean interface styled with Tailwind CSS and Lucide React icons.
* **📝 Task Management Modal:** Modal interface to edit task titles, descriptions, priority levels (`High`, `Medium`, `Low`), or delete cards.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**

* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS, Lucide React
* **Drag & Drop:** `@hello-pangea/dnd`
* **Real-Time Client:** `socket.io-client`

### **Backend (`/server`)**

* **Runtime:** Node.js & Express.js
* **Database:** MongoDB & Mongoose ORM
* **Real-Time Engine:** Socket.io
* **Utilities:** `dotenv`, `cors`, `nodemon`

---

## 📁 Repository Structure

```text
kanban-project/
├── server/                 # Express backend & WebSocket server
│   ├── models/             # Mongoose schemas (Card, Column)
│   ├── routes/             # REST API routes
│   ├── socket/             # Socket.io event handlers
│   ├── utils/              # Seed data & board state helpers
│   ├── .env.example        # Environment variable template
│   └── index.js            # Server entry point
└── client/                 # React frontend application
    ├── src/
    │   ├── components/     # Navbar, Column, Card, CardModal
    │   ├── context/        # Socket.io React context provider
    │   ├── App.jsx         # Main application canvas
    │   └── main.jsx        # App root
    └── tailwind.config.js

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)
* [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or a local MongoDB server instance.

---

### 1. Clone the Repository

```bash
git clone [https://github.com/](https://github.com/)<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git
cd kanban-project

```

---

### 2. Configure & Start Backend (`/server`)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env

```

Open `.env` in your text editor and set your environment variables:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kanban_db?retryWrites=true&w=majority

```

Start the backend server in development mode:

```bash
npm run dev

```

*(Server will start on `http://localhost:4000` and automatically connect to MongoDB).*

---

### 3. Configure & Start Frontend (`/client`)

Open a new terminal tab and run:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev

```

Open `http://localhost:5173` in your browser. Open it in two different tabs or windows side-by-side to test real-time collaboration!

---

## 📡 WebSocket Event Flow

| Event Name | Direction | Payload | Description |
| --- | --- | --- | --- |
| `card_moved` | Client ➔ Server | `updatedBoardState` | Emitted when a card is dragged to a new position/column |
| `card_added` | Client ➔ Server | `{ columnId, newCard }` | Emitted when a new card is created |
| `card_updated` | Client ➔ Server | `updatedCard` | Emitted when card details or priority are modified |
| `card_deleted` | Client ➔ Server | `{ cardId, columnId }` | Emitted when a card is removed |
| `board_updated` | Server ➔ Broadcast | `fullBoardState` | Broadcasts the updated board state to all room clients |
| `user_presence_updated` | Server ➔ Broadcast | `{ activeUsers }` | Updates live connected user count |

---

