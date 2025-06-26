# 🎓 Graduation Project - Medical Appointment Booking System with Chatbot

## 📌 Project Overview

This is a **medical appointment booking system** developed as a **graduation project** for university students. The project allows **students** to easily book appointments with doctors, while **doctors** can manage appointments and medical records. A built-in **chatbot** is also included to answer common student questions.

Built with **Angular 19**, it supports **role-based access control** for:
- 👨‍⚕️ Doctors
- 👩‍🎓 Students
- 🔒 Admins (not publicly accessible)

---

## 🔍 Project Features

### ✅ For Students:
- Browse and search clinics and doctors
- Book appointments and view past bookings
- View medical records
- Fill out feedback forms
- Receive notifications
- Use an AI chatbot for guidance

### ✅ For Doctors:
- View and manage appointments
- Add/edit medical examination records
- Review patient history
- View bookings with filters
- Secure role-based login

### 🔐 For Admin (not accessible publicly):
- Manage clinics, doctors, students, feedback, and news
- View dashboard statistics

---

## 🧠 System Analysis

### 🔧 Tools & Technologies:
- **Frontend**: Angular 19
- **Styling**: Bootstrap 5 + custom CSS
- **Routing**: Angular Router with Lazy Loading
- **Authentication**: JWT-based authentication
- **Guards**: Role-based route protection (`authGuard`, `userGuard`, `doctorGuard`, `adminGuard`)
- **Deployment**: [Vercel](https://vercel.com)

### 📁 Architecture:
- Fully componentized architecture for scalability
- Modular routing with lazy loading for performance
- Follows Angular best practices with standalone components
- Chatbot integrated in a separate reusable component

---

## 🧪 Test Users

### 👨‍🎓 **Login as Student**
You can login using the following link:
[Login as Student](https://graduation-project-withchatbot.vercel.app/#/login)

> You can register a new student or use a test account.

---

### 👨‍⚕️ **Login as Doctor**
Use the following credentials:

- **Email**: `emanshehata258@gmail.com`  
- **Password**: `Eman@123456`

---

### 🛑 **Admin Access**
Admin features are not available for external users for security reasons.

---

## 💡 Credits

- Developed by: **Iman Shehata and Mohamed Salah**
- Supervised by: Faculty Of Computers And Informatics Tanta University
- Year: 2025

---

## 📬 Contact

For inquiries or questions, feel free to reach out via [email](mailto:emanshehata258@gmail.com).
