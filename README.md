Employee Management Portal

Overview
Employee management portal with salary details and report exports.

Features
Backend (.NET Core): RESTful API for CRUD operations, JWT-based authentication and authorization, database schema design, export employee data to CSV.
Frontend (React): User authentication, responsive UI for managing employees, forms for adding and editing employee details, list view with options to edit, delete, and export, export functionality to download CSV file.

Setup and Running the Project

Prerequisites: .NET Core SDK, Node.js and npm, SQL Server, Git.

Backend Setup

Clone repository: git clone (https://github.com/dkabagambe/employee-management/tree/master/EmployeeManagementAPI)
Restore dependencies: dotnet restore
Update database connection string in appsettings.json
Apply migrations: dotnet ef database update
Run project: dotnet run

Frontend Setup

Clone repository: git clone (https://github.com/dkabagambe/employee-management/tree/master/client)
Install dependencies: npm install
Create .env file with REACT_APP_API_URL variable
Run project: npm start

API Endpoints

Authentication:
POST /api/auth/register
POST /api/auth/login

Employee Management:
GET /api/employees
GET /api/employees/{id}
POST /api/employees
PUT /api/employees/{id}
DELETE /api/employees/{id}

Export:
GET /api/employees/export

Frontend Components

Pages:
Login Page
Employee List Page
Employee Form

State Management:
Redux or Context API

API Integration:
Axios for HTTP requests

Security:
JWT-based authentication and authorization

UI/UX:
Responsive design
User-friendly interface
Material-UI or Bootstrap for styling

Performance:
Efficient data handling
Proper error handling and validation

Testing:
Unit and integration tests
