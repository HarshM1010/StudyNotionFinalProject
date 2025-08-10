# StudyNotion - Full Stack EdTech Platform

StudyNotion is a full-stack MERN web application designed to provide a seamless learning experience for students and powerful course management tools for instructors.

## 🚀 Features

### 👨‍🎓 Student
- Browse and purchase courses
- View enrolled courses
- Leave course reviews
- Add courses to wishlist

### 👩‍🏫 Instructor
- Create and publish courses
- Update course details
- Manage students and reviews

### ⚙️ Other
- JWT-based authentication
- Role-based access control
- Cron service for scheduled tasks (e.g., account deletion)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools
- JWT Authentication
- Cloud Storage (e.g., Cloudinary)
- GitHub for version control

---

## 📂 Folder Structure

StudyNotionFinalProject/
│
├── frontend/ # React frontend
├── backend/ # Node.js backend
└── README.md


## ⚡ Installation & Setup 

1. Clone the repository
 
  git clone https://github.com/HarshM1010/StudyNotionFinalProject.git
  cd StudyNotionFinalProject
  
2. Install dependencies

  cd backend
  npm install
  cd ../frontend
  npm install
  
3. Set environment variables
  Create .env files in both frontend and backend directories and configure:
  PORT=5000
  MONGO_URI=your_mongodb_connection
  JWT_SECRET=your_secret
  CLOUDINARY_KEY=your_key
  CLOUDINARY_SECRET=your_secret
 
4. Run the project
  # Backend
  cd backend
  npm run dev
  
  # Frontend
  cd ../frontend
  npm start


 
