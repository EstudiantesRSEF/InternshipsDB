https://vercel.com/loginThis is a Next.js web application for managing an internships database. Here's how it works:

Technology Stack
Framework: Next.js (a React framework) - makes building web applications with JavaScript easier
UI Libraries: Chakra UI and React Bootstrap for designing the interface
Database: Firebase (Google's real-time database)
Authentication: Firebase Auth with JWT tokens
Email: Nodemailer for sending emails
File Handling: Formidable for uploads, XLSX for spreadsheet imports
Styling: Tailwind CSS and custom CSS
Folder Structure
pages - The website pages

index.js - Home/landing page
internships.js - Lists internships (main feature)
login.js, register.js - User authentication
admin/ - Admin-only pages for managing users and content
api/ - Backend API endpoints (like URLs that the frontend calls to get/send data)
components - Reusable pieces of the UI

Header.js, Footer.js - Site header and footer
LoginForm.js, RegisterForm.js - Login/registration interfaces
BulkUploadUsers.js - Upload multiple users at once
Filters.js - Filter internships by criteria
hooks - Custom JavaScript utilities

useAuth.js - Checks if user is logged in
useUserActions.js - Handles user-related operations
lib & utils - Helper functions

Database configuration files for Firebase
public - Static files (images, uploads folder for storing user files)

styles - CSS styling for the app

How It Works (Flow)
User visits the site → Landing page (index.js) appears
If not logged in → User can register or log in
If logged in → Redirected to internships page to browse opportunities
Admin users can access /admin to manage content and other users
API calls (in api) handle backend operations like:
Creating/deleting users
Approving internship entries
Sending emails
Key Features
User authentication (login/register)
Browse internships database
Save favorites
Admin dashboard for content management
Bulk user creation via spreadsheet upload
Email notifications