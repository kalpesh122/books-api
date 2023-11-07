
### Book Routes

This file contains the routes related to managing books.

- **GET /books**
  - Description: Retrieve a list of all books.
  - Controller: `bookController.getAllBooks`
  - Response: Returns a list of book objects.

- **GET /books/:bookId**
  - Description: Retrieve a specific book by its unique ID.
  - Controller: `bookController.getBookById`
  - Response: Returns the details of the specified book.

- **POST /books**
  - Description: Create a new book.
  - Middleware: `trimRequestBody` (used to remove extra whitespace from the request body).
  - Controller: `bookController.createBook`
  - Request Body: Expects a JSON object with book details.
  - Response: Returns the newly created book object.

- **PATCH /books/:bookId**
  - Description: Update an existing book by its unique ID.
  - Middleware: `trimRequestBody` (used to remove extra whitespace from the request body).
  - Controller: `bookController.updateBook`
  - Request Body: Expects a JSON object with book details to update.
  - Response: Returns the updated book object.

- **DELETE /books/:bookId**
  - Description: Delete a specific book by its unique ID.
  - Controller: `bookController.deleteBook`
  - Response: Returns a confirmation message indicating the deletion.


# Books API

## Overview

The Books API is a Node.js and Express-based application designed for managing book-related data. This documentation provides information on setting up and using the API.

## Installation

Before running the project, make sure to install the required dependencies. Use the following command:

```bash
npm install


Usage
Development Mode
To run the application in development mode with hot-reloading, use the following command
npm run start


Development Mode (without PM2)
For development purposes without PM2, use the following command:
npm run dev

Production Mode
To run the application in production mode with PM2, use the following command:
npm run prod


Code Quality
To check your code for linting errors, use:
npm run lint

To format your code, use:
npm run format



- **Use of TypeScript**:
  - **Pros**:
    - Improved Type Safety: TypeScript provides static typing, which helps catch type-related errors at compile-time, reducing runtime errors.
    - Better IDE Support: TypeScript enhances code completion and refactoring features in development tools, making coding more efficient.
    - Enhanced Readability: Strongly-typed code is often more self-documenting, making it easier for developers to understand and maintain the codebase.

- **Class-Based Approach**:
  - **Explanation**:
    - A class-based approach is used for organizing and structuring the code. Classes are a fundamental building block in object-oriented programming, making it easier to encapsulate data and behavior, leading to cleaner and more maintainable code.

- **Service Layer**:
  - **Explanation**:
    - A service layer is introduced to separate business logic from controllers, improving code organization and reusability. This architecture follows the principle of Separation of Concerns (SoC) and keeps controllers lightweight and focused on handling HTTP requests.

- **Use of Joi Validations**:
  - **Explanation**:
    - Joi is a popular validation library that helps ensure that data sent to the server is valid and safe. It enforces data integrity by specifying the structure and constraints for request data, reducing the risk of processing malformed or malicious inputs.

 Certainly, here's the information about the use of PM2 formatted as you requested:

- **Use of PM2 (Process Manager)**:
-  **Pros**:
  - **Process Management**: PM2 simplifies process management by allowing you to start, stop, and monitor Node.js applications. It can also automatically restart the application in case of a crash, improving application availability.
  
  - **Load Balancing**: PM2 can manage multiple instances of your application, distributing incoming requests to different instances, which can enhance the application's performance and scalability.

  - **Logging and Monitoring**: PM2 provides built-in tools for logging and monitoring application performance, making it easier to diagnose issues and track application health.

  - **Environment Management**: PM2 allows you to configure and manage different environments, such as development, staging, and production, with separate configurations for each.
  
  - **Ecosystem File**: PM2 can be configured using an ecosystem file, which defines various aspects of application management, making it easier to maintain and deploy applications.






