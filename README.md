# Military-assets-manage-system
A web-based system for managing military equipment assets including purchases, transfers, assignments, and tracking, with role-based access control (RBAC).
Features
✅ Role-Based Access Control (Admin, Commander, Logistics)
✅ Secure authentication with JWT
✅ Asset purchasing, transferring, assignment, and expending
✅ Dashboard with stats, graphs, and charts
✅ Filters and search for quick access
✅ Responsive UI styled in Indian Army theme
✅ Protected routes using React Router

⚙️ Tech Stack
Frontend	Backend
ReactJS + Tailwind CSS	Node.js + Express
Axios	MongoDB + Mongoose
React Router DOM	JWT Auth
Chart/Graph libraries (e.g., Chart.js, Recharts)	Bcrypt for password hashing

🚀 Deployment
Service	URL
Frontend	Netlify
Backend	Render

📂 Project Structure
pgsql
Copy
Edit
military-asset-management/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
└── README.md
🛠️ Setup Instructions
🔹 Backend
bash
Copy
Edit
cd backend
npm install
# Configure .env (DB URL, JWT secret)
npm start
🔹 Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev # or npm run build + serve for production
