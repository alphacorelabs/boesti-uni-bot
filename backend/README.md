# BOUESTI Chatbot Backend

Express.js backend server with OpenAI integration for the BOUESTI admission chatbot.

## Features

- **OpenAI Integration**: GPT-4 with streaming responses
- **BOUESTI Knowledge Base**: Comprehensive university information
- **CORS Support**: Frontend integration ready
- **Health Check**: API monitoring endpoint

## Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
```

## API Endpoints

### POST /api/chat

Send a message to the chatbot and receive streaming response.

**Request Body:**

```json
{
  "message": "What are the admission requirements?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?"
    }
  ]
}
```

**Response:** Streaming text with JSON chunks

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "status": "OK",
  "message": "BOUESTI Chatbot Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## BOUESTI Knowledge Base

The backend includes comprehensive information about:

- Admission requirements and eligibility
- Application procedures (POST UTME, Direct Entry)
- Available degree programmes (100+ courses)
- Fees structure and payment procedures
- Academic session information
- University facilities and services
- Contact information

The AI assistant is trained to provide accurate, helpful responses about BOUESTI admissions and academic programs.
