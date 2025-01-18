1. Project: Marvellous Event Hub
2. Technologies Used:

    Frontend: Angular

    Backend: Node.js, Express.js
  
    Database: MongoDB (MongoDB Compass)

3. Description:

    The Marvellous Event Hub is a full-stack web application designed to simplify event management and bookings.
    It features a client-server architecture, with the frontend developed using Angular and the backend built with Node.js and Express.js to handle API requests and business logic.
    The application utilizes MongoDB for efficient storage, including user details, event information, and booking records.

4. The project can be executed with the commands npm start for the server side and ng serve --o for the client side.
5. Once started, the application provides two types of events: Events_for_all and Events_for_family_members.
6. Events_for_all is open to all; no login is required.
   Events_for_family_members is restricted to logged-in users only, i.e., the user must provide valid credentials to access these events.
7. If a user wants to register for an Event_for_all event, a registration form is created on the client side, which accepts the user's details and sends them to the server. The server stores this data in MongoDB Compass.
8. If a user wants to access the family member event, the client side collects the username and password through a form. These credentials are sent to the server for validation via a secure HTTP POST request. The server checks the credentials against the MongoDB database. If the credentials are invalid, the server responds with a 401 Unauthorized status and an "Invalid email or password" message. If the credentials are valid, the server generates a JWT (JSON Web Token) using the jsonwebtoken library.

   Token generation: The token uses a method called jwt.sign(), which contains two parameters: payload and 'secretKey'.
   Payload contains the data that can be used to identify the user and other relevant information, and this information is passed in an encrypted format.
   SecretKey ensures the token's integrity and authenticity.
   The server sends the token back to the client, and the client stores it locally, typically in localStorage. The client uses this token for future requests to authenticate itself.

9. For validation purposes, I have created a reactive form that provides real-time feedback with appropriate error messages. Bootstrap is applied to enhance the GUI.
10. The project provides many key functionalities such as User Authentication, Event Browsing with Filters, and a Seamless Booking Process.
11. This project demonstrates full-stack development skills, covering frontend, backend, database integration, and secure authentication using JWT.
