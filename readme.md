# Gemini API Service

This project is an Express.js service that integrates with Google's Gemini AI.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1.  Clone the repository (if applicable) or navigate to the project directory.
2.  Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add the following environment variables:

    ```env
    PORT=3000
    GEMINI_API_KEY=your_google_gemini_api_key
    GEMINI_MODEL=gemini-1.5-flash
    ```

    *Note: You can get an API key from [Google AI Studio](https://aistudio.google.com/).*

## Running the Project

### Development Mode

To run the server in development mode with hot-reloading (using `nodemon` and `ts-node`):

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

### Production Build

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Endpoints

### Generate Text

-   **URL:** `/api/v1/gemini/generate-text`
-   **Method:** `POST`
-   **Body:**

    ```json
    {
      "prompt": "Your prompt here"
    }
    ```

-   **Response:**

    ```json
    {
      "text": "Generated response from Gemini..."
    }
    ```

## Project Structure

-   `src/app.ts`: Express app configuration.
-   `src/handler/`: Route handlers.
-   `src/controller/`: Business logic controllers.
-   `src/repository/`: Data access and external API integrations.
-   `server.ts`: Entry point of the application.