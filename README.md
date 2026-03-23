# Call Analytics Dashboard – Backend

## Project Description

The **Backend of the Call Analytics Dashboard** is a RESTful API server that manages and serves **Call Data Records (CDRs)** to the frontend. It handles all data operations including creating, reading, and updating call records, as well as **user authentication and authorization**.  

Key features of the backend include:  
- **User management** – Sign up, login, and token-based authentication (JWT)  
- **Secure API endpoints** – Protect sensitive call data with authentication  
- **CRUD operations for CDRs** – Add, view, and manage call records  
- **Data validation and error handling** – Ensures reliable and consistent responses  
- **Scalable architecture** – Ready to integrate with modern frontend dashboards  

This backend powers the analytics and visualization features of the dashboard by providing **fast, reliable, and secure access** to call data.  

---

## Technology Stack

### Backend
- **Node.js & Express.js** – Server and API framework  
- **MongoDB / PostgreSQL** – Database for storing call records and user data  
- **JWT (JSON Web Tokens)** – Authentication and secure access  
- **Mongoose / Sequelize** – Database modeling and queries  
- **Cors & Body-parser** – Middleware for request handling  

### API & Authentication
- **RESTful API Endpoints** – Expose data to the frontend  
- **Token-based Authentication** – Users must log in to access protected routes  
- **Validation & Error Handling** – Ensures secure and reliable operations  

### Deployment Options
- **Render / Railway / Heroku** – Recommended platforms for hosting the backend  

---

## Deployment

### Local Setup
1. Clone the backend repository:
```bash
git clone <https://github.com/Divyatariwala/call-analytics-dashboard-backend>

2. Install dependencies
    npm install

3. Start the backend server
    npm run dev

4. API is available at:
    http://localhost:5000

5. Live Deployment
Access the deployed backend (if hosted) here:
https://call-analytics-dashboard-backend.onrender.com