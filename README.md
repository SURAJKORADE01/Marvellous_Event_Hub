1. Project: Marvellous Event Hub
2. Technologies Used:

    Frontend: Angular

    Backend: Node.js, Express.js
  
    Database: MongoDB (MongoDB Compass)

3. Description:

    The Marvellous Event Hub is a full-stack web application designed for seamless event management and bookings.
    It features a client-server architecture, with:
    A dynamic user-friendly interface built using Angular.
    A robust backend developed with Node.js and Express to handle API requests and business logic.
    MongoDB is used for efficient data storage, including user details, event information, and booking records.

4. Key Features:

    Event Types: Events for All: Open to all users without login.
    Family Members’ Events: Restricted to logged-in users with valid credentials.

5. Registration: New users can register via a form, and their details are stored in MongoDB.

6. Authentication:

    For Family Members’ Events, users log in by providing credentials.
    The backend validates credentials against the MongoDB database and generates a JSON Web Token (JWT) upon success.
  The token is stored in the browser's local storage to enable secure access to subsequent requests without repeated logins.

7. Execution Commands:

    Server-side: npm start
    Client-side: ng serve --o

8. This project demonstrates full-stack development skills, covering frontend, backend, database integration, and secure authentication using JWT.
