# **InterShala**

A Student-Teacher Appointment Booking Website built with React, Firebase, and Vite.

---

## **Overview**
InterShala is a web-based system that streamlines communication and scheduling between students, teachers, and administrators. The platform enables efficient appointment booking, message management, and user administration.

---

## **Features**
### **Student Features**
- Search for teachers based on department and subject.
- Book appointments with teachers.
- View scheduled appointments.
- Send messages to teachers.

### **Teacher Features**
- View scheduled appointments.
- Approve or cancel student bookings.
- View messages from students.

### **Admin Features**
- Add, edit, and delete teacher accounts.
- View all appointments and messages.

---

## **Technologies Used**
- **Frontend**: React (with Vite for fast bundling and development).
- **Backend**: Firebase Firestore and Firebase Authentication.
- **State Management**: Context API.
- **Styling**: CSS (global styles and inline styles).
- **Hosting**: Netlify.

---

## **Installation and Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/InterShala.git
   cd InterShala
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add Firebase Configuration**:
   - Create a `.env` file in the root directory.
   - Add the following Firebase configuration variables:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   Open your browser and go to:  
   ```
   http://localhost:5173/
   ```

---

## **Project Structure**
```
InterShala/
|
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── auth/            # Login and Register components
│   │   ├── shared/          # Navbar, Footer, etc.
│   │   ├── student/         # Student dashboard and features
│   │   ├── teacher/         # Teacher dashboard and features
│   │   └── admin/           # Admin dashboard and features
│   ├── context/             # Context API (AuthContext)
│   ├── firebase.js          # Firebase configuration
│   ├── App.jsx              # Main application component
│   └── index.css            # Global styling
│
├── .gitignore               # Ignored files and directories
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

---

## **Usage**
### **Login**
- Use the `/login` page to log in as a student, teacher, or admin.
- The role determines the accessible functionalities.

### **Admin Functionalities**
- Navigate to `/admin/dashboard` to manage teachers, appointments, and messages.

### **Student Functionalities**
- Navigate to `/student/dashboard` to search for teachers, book appointments, and send messages.

### **Teacher Functionalities**
- Navigate to `/teacher/dashboard` to view and manage appointments and messages.

---

## **Firebase Rules**
Ensure the following Firestore security rules are in place:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## **Deployment**
### **Deploying on Netlify**
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist/` folder**:
   - Drag and drop the `dist/` folder onto Netlify’s deploy panel.

3. **Set environment variables**:
   - Add your Firebase configuration variables to Netlify's environment settings.

---

## **Future Improvements**
- **Email Notifications**: Notify users about appointment confirmations and updates.
- **Responsive Design**: Improve usability on smaller screens.
- **Analytics Dashboard**: Provide insights for admins (e.g., appointment trends).
- **Multi-language Support**: Cater to a wider audience.
- **Appointment Reminders**: Automatic reminders via email or SMS.

---

## **Contributors**
- **Vamshi Doddi** – Developer  
- Open to contributions! Feel free to create a pull request.

---



