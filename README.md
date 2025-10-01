# 🎓 Online Courses Platform API

A **NestJS RESTful API** for an online courses platform.  
It supports authentication, course management, enrollments, lessons, payments, file uploads, and notifications.

---

## 🚀 Features

- **Authentication & Authorization**  
  - JWT authentication  
  - Role-based access (`student`, `instructor`, `admin`)  

- **Users Module**  
  - Profile management  
  - Role assignment  

- **Courses Module**  
  - Create, update, list courses  
  - Instructor–course relationship  

- **Enrollments Module**  
  - Enroll users after successful payment  
  - Prevent duplicate enrollments  

- **Lessons Module**  
  - Manage lessons per course  
  - Upload lesson videos (via signed S3 URLs)  

- **Payments Module**  
  - Stripe integration  
  - Payment status tracking  

- **Upload Module**  
  - AWS S3 integration  
  - Profile image & course thumbnail uploads  
  - Pre-signed URLs for large video uploads  

- **Notifications Module**  
  - Email notifications using Nodemailer (Gmail SMTP)  
  - Trigger notifications on enrollment, payments, etc.  

- **Database Module**  
  - TypeORM with PostgreSQL  
  - Entity relationships handled with decorators  

---

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/) — backend framework  
- [TypeORM](https://typeorm.io/) — ORM  
- [PostgreSQL](https://www.postgresql.org/) — database  
- [AWS S3](https://aws.amazon.com/s3/) — file storage  
- [Stripe](https://stripe.com/) — payments  
- [Nodemailer](https://nodemailer.com/) — email notifications  

---

## 📂 Project Structure

src/
├── auth/ # Authentication & authorization
├── user/ # User entity & profile management
├── course/ # Course creation & management
├── enrollment/ # Course enrollments
├── lesson/ # Lessons within courses
├── payment/ # Stripe payments
├── upload/ # File uploads (AWS S3)
├── notification/ # Email notifications
├── database/ # Database module (TypeORM config)
└── main.ts # App entry point

## ⚙️ Setup & Installation

1. **Clone repo**
   ```bash
   git clone https://github.com/engMohamedAntar/online-courses-platform-api.git
   cd online-courses-platform-api

   

