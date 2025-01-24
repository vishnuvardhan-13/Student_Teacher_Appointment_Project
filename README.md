<h1>InterShala</h1>
A Student-Teacher Appointment Booking Website built with React, Firebase, and Vite.

Overview
InterShala is a web-based application that allows students to book appointments with teachers seamlessly. Admins can manage teachers, view appointments, and messages, while teachers can handle their schedules and respond to student messages. The project leverages React for a dynamic frontend and Firebase for authentication and database management.
Deployed on Netlify: https://intershalaschool.netlify.app/login


Features
Student
Search for teachers based on subject and department.
Book appointments with available teachers.
View scheduled appointments.
Send messages to teachers.
Teacher
View appointments scheduled by students.
Approve or cancel student appointments.
View and respond to messages from students.
Admin
Add and manage teacher accounts.
Delete teacher accounts.
View all appointments and messages.
Technologies Used
Frontend: React (with Vite)
Backend: Firebase Firestore and Firebase Authentication
Styling: CSS (global styles and inline styles)
State Management: Context API

Installation and Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/VamshiRealm/InterShala.git
cd InterShala
Install dependencies:

bash
Copy
Edit
npm install
Add Firebase Configuration:

Create a .env file in the root directory.
Add the following Firebase configuration variables:
makefile
Copy
Edit
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
Run the development server:

bash
Copy
Edit
npm run dev
Open your browser and go to:

arduino
Copy
Edit
http://localhost:5173/
Deployment
To deploy the project on Netlify:

Build the project:

bash
Copy
Edit
npm run build
Deploy the dist/ folder to Netlify:

Drag and drop the dist/ folder onto Netlify’s deploy panel or connect the repository to Netlify.
Ensure Firebase works correctly by updating Firestore rules if needed:

json
Copy
Edit
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
Usage
Login
Use the /login page to log in as a student, teacher, or admin.
The role determines the accessible functionalities.
Admin
Navigate to /admin/dashboard to manage teachers, appointments, and messages.
Student
Navigate to /student/dashboard to search for teachers, book appointments, and send messages.
Teacher
Navigate to /teacher/dashboard to view and manage appointments and messages.
Future Improvements
Add email notifications for appointments and messages.
Implement role-based analytics for admin users.
Improve responsiveness for smaller devices.
Contributors
Vamshi Doddi – Developer
Open to contributions! Feel free to create a pull request.


