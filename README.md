🧠 Skill Assessment Portal

A full-stack Skill Assessment Platform where users can register, take quizzes based on specific skills, and view their performance reports.
Admins can manage skills, create quizzes, and view reports for all users.

🚀 Features
👤 User

Register and login securely

Take quizzes based on selected skills

View personal quiz reports and scores

🧑‍💼 Admin

Add and manage skills

Create and manage quiz questions for each skill

View all users’ quiz attempts and reports

🧩 Tech Stack
Category	Technologies Used
Frontend	React.js, Bootstrap, Axios, React Router
Backend	Node.js, Express.js
Database	MySQL (via Sequelize ORM)
Authentication	JWT (JSON Web Token)
Environment	dotenv for environment variable management
🗂️ Project Structure
skill-assessment-portal/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   ├── package.json
│   └── .env
│
└── README.md

⚙️ Setup Instructions
🖥️ 1. Clone the Repository
git clone https://github.com/<your-username>/skill-assessment-portal.git
cd skill-assessment-portal

🧱 2. Backend Setup (/backend)
Install dependencies
cd backend
npm install

Configure .env

Create a .env file inside the backend/ folder:

PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=skill_assessment_db
JWT_SECRET=your_jwt_secret

Database Setup

Ensure MySQL is running, then create a database:

CREATE DATABASE skill_assessment_db;


Run Sequelize sync (or create tables automatically on server start).

Start Backend Server
npm start


Your backend should now run on 👉 http://localhost:8080

💻 3. Frontend Setup (/frontend)
Install dependencies
cd ../frontend
npm install

Configure .env

Create a .env file inside the frontend/ folder:

REACT_APP_API_BASE_URL=http://localhost:8080/api

Start Frontend
npm start


Your frontend should now run on 👉 http://localhost:3000

🧩 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user or admin
POST	/api/auth/login	Login and receive JWT token
🧠 Skills
Method	Endpoint	Description
GET	/api/skills	Get all skills
POST	/api/skills	Add new skill (Admin only)
📝 Quiz
Method	Endpoint	Description
POST	/api/questions	Add new quiz question (Admin only)
POST	/api/quiz/submit	Submit quiz answers
GET	/api/quiz/reports/:userId	Get user’s quiz reports
GET	/api/quiz/admin-reports	Get all quiz reports (Admin only)
🧭 Navigation Flow
👨‍💻 User Flow

Register or login

Select a skill

Take quiz

View personal reports

🧑‍💼 Admin Flow

Login as admin

Add skills

Add quiz questions

View reports for all users from Dashboard → “View Reports”

🛠️ Available Scripts
Command	Description
npm start	Start the development server
npm run build	Build for production
npm run dev (backend)	Start backend using nodemon
npm test	Run tests (if added)
🧾 Example Admin Credentials (optional)

You can manually insert an admin user in the database:

INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', '<hashed_password>', 'admin');


(You can generate hashed passwords using bcrypt or register as admin if your /register route allows role input.)

📊 Future Enhancements

Add leaderboards for top scorers

Export reports as PDF or Excel

Add image/video-based questions

Implement pagination and filters on reports

Add forgot-password flow

👨‍💻 Author

Tarun Upadhayay
Software Engineer at In Time Tec