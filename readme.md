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

Base URL: `http://localhost:3000/api/v1`

### 1. Health Check

Check if the service is running.

-   **URL:** `/ping`
-   **Method:** `GET`
-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:** `{ "message": "pong" }`

### 2. Generate Text

Generate text using Google Gemini AI based on a text prompt.

-   **URL:** `/generate-text`
-   **Method:** `POST`
-   **Headers:**
    -   `Content-Type: application/json`
-   **Body:**

    ```json
    {
      "prompt": "Explain quantum computing in simple terms"
    }
    ```

-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:**

        ```json
        {
          "text": "Quantum computing is..."
        }
        ```

-   **Error Response:**
    -   **Code:** 400 Bad Request (if prompt is missing)
    -   **Code:** 500 Internal Server Error

### 3. Generate Text from Image

Generate text/description based on an image and a text prompt.

-   **URL:** `/generate-from-image`
-   **Method:** `POST`
-   **Headers:**
    -   `Content-Type: multipart/form-data`
-   **Body (Form Data):**
    -   `prompt` (text): The instruction for the AI (e.g., "Describe this image").
    -   `image` (file): The image file to upload (JPEG, PNG).
-   **Example (cURL):**

    ```bash
    curl --location 'http://localhost:3000/api/v1/generate-from-image' \
    --form 'prompt="Describe this image"' \
    --form 'image=@"/path/to/your/image.png"'
    ```

    *Note: Do not manually set the `Content-Type` header when using cURL for multipart/form-data; let cURL handle the boundary.*

-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:**

        ```json
        {
          "text": "The image shows a..."
        }
        ```

-   **Error Response:**
    -   **Code:** 400 Bad Request (if prompt or image is missing, or incorrect file type)
    -   **Code:** 500 Internal Server Error

### 4. Generate Text from Document

Generate text/summary based on a document and a text prompt.

-   **URL:** `/generate-from-document`
-   **Method:** `POST`
-   **Headers:**
    -   `Content-Type: multipart/form-data`
-   **Body (Form Data):**
    -   `prompt` (text): The instruction for the AI (e.g., "Summarize this document"). Defaults to "Tolong buatkan ringkasan dari dokumen berikut" if omitted.
    -   `document` (file): The document file to upload (PDF only).
-   **Example (cURL):**

    ```bash
    curl --location 'http://localhost:3000/api/v1/generate-from-document' \
    --form 'prompt="Summarize this document"' \
    --form 'document=@"/path/to/your/document.pdf"'
    ```

-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:**

        ```json
        {
          "output": "Here is the summary of the document..."
        }
        ```

-   **Error Response:**
    -   **Code:** 400 Bad Request (if document is missing or incorrect file type)
    -   **Code:** 500 Internal Server Error

### 5. Generate Text from Audio

Generate text/transcript based on an audio file and a text prompt.

-   **URL:** `/generate-from-audio`
-   **Method:** `POST`
-   **Headers:**
    -   `Content-Type: multipart/form-data`
-   **Body (Form Data):**
    -   `prompt` (text): The instruction for the AI (e.g., "Transcribe this audio"). Defaults to "Tolong buatkan transkrip dari audio berikut" if omitted.
    -   `audio` (file): The audio file to upload (MP3 only).
-   **Example (cURL):**

    ```bash
    curl --location 'http://localhost:3000/api/v1/generate-from-audio' \
    --form 'prompt="Transcribe this audio"' \
    --form 'audio=@"/path/to/your/audio.mp3"'
    ```

-   **Success Response:**
    -   **Code:** 200 OK
    -   **Content:**

        ```json
        {
          "output": "This is the transcription of the audio..."
        }
        ```

-   **Error Response:**
    -   **Code:** 400 Bad Request (if audio is missing or incorrect file type)
    -   **Code:** 500 Internal Server Error

## Project Structure

-   `src/app.ts`: Express app configuration.
-   `src/handler/`: Route handlers.
-   `src/controller/`: Business logic controllers.
-   `src/repository/`: Data access and external API integrations.
-   `server.ts`: Entry point of the application.