
# E-Commerce Application

This is a simple e-commerce application built with Node.js, Express.js, and Sequelize ORM, allowing users to manage categories.

## Getting Started

To get started with the application, follow these instructions:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/e-commerce.git
   cd e-commerce
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Configuration:**

   - Make sure you have MySQL installed and running on your system.
   - Open `util/database.js` and adjust the database configuration (username, password, host, etc.) according to your MySQL settings.

4. **Database Setup:**

   To set up the database schema, run the following command:

   ```bash
   node_modules/.bin/sequelize db:migrate
   ```

5. **Start the Application:**

   To start the server, run the following command:

   ```bash
   nodemon app.js
   ```

   The server will be running on `http://localhost:8080`.

## API Endpoints

The following API endpoints are available:

- **GET /Categories**: Get a list of all categories.
- **GET /Category/:id**: Get details of a specific category by ID.
- **POST /Category**: Create a new category.
- **PUT /Category/:id**: Update an existing category by ID.
- **DELETE /Category/:id**: Delete a category by ID.

## Usage

- Make sure the server is running (`nodemon app.js`).
- Use tools like Postman or any API client to interact with the API endpoints.
- You can create, read, update, and delete categories using the provided API routes.

## Dependencies

- Express.js: Web application framework for Node.js.
- Sequelize: ORM for handling database operations.
- MySQL2: MySQL database driver for Node.js.
- EJS: Template engine for rendering views.
- Body-parser: Middleware to parse JSON request bodies.
- Nodemon: Development dependency to automatically restart the server on code changes.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

- Jatin Singh
- Email: jatinsingh0701@gmail.com

---
