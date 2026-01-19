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
```bash
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
```
## ⚙️ Setup & Installation
  ```bash
# Clone repo
   git clone https://github.com/engMohamedAntar/online-courses-platform-api.git
   cd online-courses-platform-api

# Inastall dependencies
  npm install

# Create a `.env` file in the root directory and configure the following environment variables:
```env
HOST= localhost
DB_PORT= 5433
DB_USER= boghdady
DB_PASSWORD= pass123
DB_NAME= online-courses-db

#remote db url (Neon)
Neon_DB_URL= postgresql://neondb_owner:npg_IXuJ5Gh8QrSW@ep-cold-term-ah9k1r3b-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
#jwt
JWT_SECRET= 75b5b11469b4d5656e8a03d268d47bee428490b231104809d63bd6374a3ba783
JWT_EXPIRE_IN= 1h

REFRESH_JWT_SECRET= a309aecad2334492ee2dc2cea61c5248fd87b7461d05c508725048008eef6c6a
REFRESH_JWT_EXPIRE_IN= 7d

#stripe
STRIPE_SECRET= your-stripe-secret
STRIPE_WEBHOOK_SECRET= your-webhook-secret

#aws S3 cridentials
AWS_ACCESS_KEY_ID= your-aws-access-key
AWS_SECRET_ACCESS_KEY= your-aws-secret
AWS_REGION= us-east-1
AWS_BUCKET= onlin-course-platform-bucket

#nodemailer email
EMAIL_USERNAME= your-gmail
EMAIL_PASSWORD= gmail-password

#Google credentials
GOOGLE_CLIENT_ID= 
GOOGLE_SECRET= 
GOOGLE_CALLBACK_URL= 

```

# Start the server
  npm run start:dev

```
## 🧪 Usage

Here are some example commands and requests to interact with the API:

### Run in development mode
```bash
npm run start:dev

# Example: User Signup
  POST /auth/signup
  Content-Type: application/json
  
  {
    "name": "Mohamed Antar",
    "email": "antar@example.com",
    "password": "securepassword"
  }

# Example: Login User
  POST /auth/login
  Content-Type: application/json
  
  {
    "email": "john@example.com",
    "password": "securepassword"
  }

# Example: Fetch All Courses
  GET /courses

# Example: Create Course (Instructor only)
  POST /courses
  Content-Type: multipart/form-data
  Authorization: Bearer <token>
  
  Body: {
      title: "NestJs Course"
      description: "lablabla"
      thumbnail: <file>
      price: 500
    }

# Example: Upload Lesson Video (signed URL)
  GET /upload/signed-url?fileName=lesson1.mp4&contentType=video/mp4
  Authorization: Bearer <token>
  
  Response:
  {
    "uploadUrl": "https://s3.amazonaws.com/...",
    "key": "lessons/<uuid>-lesson1.mp4"
  }
   
```
## Contributing

Follow these steps to contribute:

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m 'Add your message'`  
4. Push to the branch: `git push origin feature/your-feature-name`  
5. Submit a pull request
