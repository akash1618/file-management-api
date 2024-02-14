# File Management API

This is a simple file management API built with Node.js. It allows users to upload, list, delete files, search for files.

## Instructions

To run the application, follow these steps:

1. Clone the repository to your local machine:

   git clone https://github.com/your-username/file-management-api.git


2. Navigate to the project directory: 

    cd file-management-api

3. Install dependencies using npm:

    npm install

4. Start the server:
    
    node index.js

5. The server will start running on http://localhost:3000.



# API Endpoints

## File Management

POST /api/files/upload: Upload a file. Include the file in the request body.
GET /api/files/list: List all uploaded files.
DELETE /api/files/delete/:fileName: Delete a specific file by its name.
GET /api/files/search?q=searchTerm: Search for files containing the specified search term.


# Additional Notes
Files are uploaded to the uploads directory by default.
Basic authentication is required for accessing the API endpoints. Use the username and password specified in the authMiddleware.js file.
