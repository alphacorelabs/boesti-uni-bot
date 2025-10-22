# BOUESTI Chatbot - System Architecture

## Architecture Overview

The BOUESTI Admission Inquiry Chatbot is a modern web application built with a React frontend and Express.js serverless backend, integrated with OpenAI's GPT-4 for intelligent responses.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   USER LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│  👤 Students/Prospective Students                                              │
│  📱 Web Browsers (Desktop/Mobile/Tablet)                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTPS
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PRESENTATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🎨 React 18 Frontend (Vite)                                                  │
│  ├── Glassmorphism UI Components                                               │
│  ├── Real-time Chat Interface                                                  │
│  ├── Responsive Design (Tailwind CSS)                                          │
│  ├── TypeScript Support                                                        │
│  └── Custom Hooks (useChatbot.ts)                                             │
│                                                                                 │
│  📦 Static Assets                                                              │
│  ├── BOUESTI Logo & Branding                                                  │
│  ├── Icons (Lucide React)                                                     │
│  └── Fonts & Styles                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ REST API (JSON)
                                        │ Streaming Response
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               APPLICATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🚀 Backend Services                                                           │
│                                                                                 │
│  ┌─── Development Environment ────┐  ┌─── Production Environment ────┐        │
│  │                                │  │                               │        │
│  │  Express.js Server             │  │  Vercel Serverless Functions │        │
│  │  ├── /api/chat (POST)         │  │  ├── api/chat.js             │        │
│  │  ├── /api/health (GET)        │  │  └── api/health.js           │        │
│  │  ├── CORS Middleware          │  │                               │        │
│  │  └── OpenAI Integration       │  │  Auto-scaling                 │        │
│  │                                │  │  CDN Distribution             │        │
│  │  Port: 3001                    │  │  Global Edge Network          │        │
│  └────────────────────────────────┘  └───────────────────────────────┘        │
│                                                                                 │
│  🔧 API Endpoints                                                              │
│  ├── POST /api/chat - Chat processing with streaming                          │
│  └── GET /api/health - System health monitoring                               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ OpenAI API
                                        │ GPT-4 Model
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 AI/ML LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🤖 OpenAI GPT-4 Integration                                                  │
│  ├── Streaming Chat Completions                                                │
│  ├── Context-aware Responses                                                   │
│  ├── Conversation History Management                                           │
│  └── Token Optimization                                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ System Prompt
                                        │ Knowledge Injection
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                KNOWLEDGE BASE                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  📚 BOUESTI Knowledge Repository (In-Memory Dataset)                          │
│                                                                                 │
│  🏫 University Information                                                     │
│  ├── Institution Details (Name, Location, History)                            │
│  ├── Official Abbreviation (BOUESTI)                                          │
│  └── Contact Information                                                       │
│                                                                                 │
│  🎓 Academic Programs Dataset                                                  │
│  ├── 100+ Degree Programs                                                     │
│  ├── Faculty Departments (15+ Faculties)                                      │
│  ├── Program Categories (Science, Arts, Technology)                           │
│  └── Course Requirements & Prerequisites                                       │
│                                                                                 │
│  📋 Admissions Dataset                                                         │
│  ├── Eligibility Criteria (UTME Scores, O'Level Requirements)                 │
│  ├── Application Procedures (POST-UTME, Direct Entry)                         │
│  ├── Important Dates & Deadlines                                              │
│  └── Document Requirements                                                     │
│                                                                                 │
│  💰 Financial Information                                                      │
│  ├── Tuition Fees Structure (by Program Type)                                 │
│  ├── Acceptance Fees                                                           │
│  ├── Payment Procedures & Methods                                              │
│  └── Scholarship Information                                                   │
│                                                                                 │
│  🌐 External System Integration                                               │
│  ├── JAMB Portal References                                                    │
│  ├── University Portal (portal.bouesti.edu.ng)                               │
│  └── Official Registration Procedures                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Environment Variables
                                        │ Configuration
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            CONFIGURATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ⚙️ Environment Configuration                                                  │
│  ├── OpenAI API Keys (Secure Storage)                                         │
│  ├── CORS Settings                                                             │
│  ├── Port Configuration                                                        │
│  └── Node Environment Settings                                                 │
│                                                                                 │
│  🔒 Security & Authentication                                                  │
│  ├── API Key Management                                                        │
│  ├── Request Rate Limiting                                                     │
│  └── CORS Policy Enforcement                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

## Data Flow Architecture

```

┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ User │───▶│ Frontend │───▶│ Backend │───▶│ OpenAI │
│ Browser │ │ React │ │ API Server │ │ GPT-4 │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
▲ │ │ │
│ ▼ ▼ ▼
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ │ UI State │ │ Knowledge │ │ AI Response │
│ │ Management │ │ Base │ │ Generation │
│ └─────────────┘ └─────────────┘ └─────────────┘
│ │ │
└───────────────────────────────────────┴───────────────────┘
Streaming Response Flow

````

## Component Breakdown

### Frontend Components
- **ChatWindow**: Main conversation interface
- **ChatInput**: User message input with validation
- **MessageBubble**: Individual message rendering
- **TypingIndicator**: Real-time typing feedback
- **ConnectionStatus**: Network status monitoring
- **SampleQuestions**: Quick-start question templates
- **Header**: University branding and navigation

### Backend Services
- **Chat API**: Message processing and OpenAI integration
- **Health Check**: System monitoring and status
- **Knowledge Base**: Static dataset injection
- **Streaming Handler**: Real-time response delivery

### Knowledge Base Structure

#### 1. University Information Dataset
```javascript
{
  fullName: "Bamidele Olumilua University of Education, Science and Technology",
  abbreviation: "BOUESTI",
  location: "Ikere-Ekiti, Ekiti State, Nigeria",
  formerName: "College of Education, Ikere-Ekiti",
  website: "portal.bouesti.edu.ng"
}
````

#### 2. Academic Programs Dataset (100+ Programs)

```javascript
{
  faculties: [
    "Biological Science",
    "Health Science",
    "Management Science",
    "Computing and Information Science",
    "Engineering",
    "Arts Education",
    // ... 15+ more faculties
  ],
  programs: [
    {
      faculty: "Computing and Information Science",
      degree: "B.Sc. Computer Science",
      type: "Science",
      requirements: ["Mathematics", "Physics", "English"]
    }
    // ... 100+ programs
  ]
}
```

#### 3. Admissions Dataset

```javascript
{
  eligibility: {
    utmeScore: 150,
    oLevelCredits: 5,
    requiredSubjects: ["English", "Mathematics"],
    maxSittings: 2
  },
  applicationProcess: [
    "Visit portal.bouesti.edu.ng",
    "Create account and verify email",
    "Pay ₦2,000 application fee",
    "Complete application form"
  ],
  importantDates: {
    session: "2025/2026",
    applicationDeadline: "TBA"
  }
}
```

#### 4. Financial Information Dataset

```javascript
{
  acceptanceFee: 50000,
  tuitionFees: {
    nonScience: 175550,
    science: 200550,
    technology: 210550
  },
  paymentStructure: {
    firstSemester: "60%",
    secondSemester: "40%"
  }
}
```

## Technology Stack

### Frontend Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Glassmorphism
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useCallback)
- **HTTP Client**: Fetch API with streaming support

### Backend Stack

- **Runtime**: Node.js
- **Framework**: Express.js (Development) / Vercel Functions (Production)
- **AI Integration**: OpenAI API (GPT-4)
- **Middleware**: CORS, JSON parsing
- **Environment**: dotenv configuration

### Deployment & Infrastructure

- **Hosting**: Vercel (Serverless)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS
- **Scaling**: Auto-scaling serverless functions

## Security Architecture

### API Security

- Environment variable protection for API keys
- CORS policy enforcement
- Request validation and sanitization
- Rate limiting (Vercel built-in)

### Data Security

- No persistent data storage
- In-memory knowledge base
- Secure API key management
- HTTPS encryption for all communications

## Performance Optimization

### Frontend Performance

- Component lazy loading
- Optimized bundle size with Vite
- Responsive image loading
- CSS optimization with Tailwind

### Backend Performance

- Streaming response implementation
- Conversation history optimization (last 10 messages)
- Serverless cold start optimization
- CDN caching for static assets

## Monitoring & Analytics

### Health Monitoring

- `/api/health` endpoint for system status
- Connection status tracking in frontend
- Error handling and user feedback
- Request/response logging

### User Experience

- Real-time typing indicators
- Streaming response visualization
- Mobile-responsive design
- Offline state handling

## Future Architecture Considerations

### Potential Enhancements

1. **Database Integration**: Add persistent storage for conversation history
2. **User Authentication**: Implement student login system
3. **Analytics Dashboard**: Track usage patterns and popular questions
4. **Multi-language Support**: Add support for local languages
5. **Voice Interface**: Integrate speech-to-text capabilities
6. **Push Notifications**: Real-time updates for admission deadlines

### Scalability Considerations

- Horizontal scaling with serverless architecture
- Database sharding for user data
- Redis caching for frequently accessed data
- Load balancing for high-traffic periods

---

**Architecture Designed by**: Egbeyemi Adeniyi Olorunfemi  
**Institution**: BOUESTI Computer Science Department  
**Project Type**: Final Year Project
