# Sellium Backend

This is a REST API project developed with **NestJS** and **PostgreSQL** that allows for managing users with recursive relationships. The application includes a database configuration using **TypeORM** and environment variables handled with **dotenv**. Additionally, it features an **OCR** ​​service that processes images to extract specific data using the Google Cloud Document AI API.

## Project Structure

The project is organized as follows:

### Core Files:

- `app.module.ts`: Configures the core modules of the application, including the database connection and the OCR module.
- `main.ts`: The main bootstrap file that starts the NestJS application.
- `database.config.ts`: Contains the **TypeORM** configuration for the PostgreSQL database connection. It uses **dotenv** to load environment variables from a `.env` file.
- `user.entity.ts`: Defines the `User` entity with a recursive relationship in the database, allowing a user to recruit other users.
- `ocr.service.ts`: Implements an OCR service that uses the Google Cloud Document AI API to process images and extract relevant data.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-user/your-repo.git
```

2. Install the dependencies:

```bash
npm install

```

3. Create a .env file in the root of the project with the following structure:

```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   NODE_ENV=development
   PROJECT_ID=your_project_id
   LOCATION=us
   PROCESSOR_ID=your_processor_id
```
