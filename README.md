# BOUESTI Admission Inquiry Chatbot

An AI-powered chatbot designed to provide instant answers about admissions, programs, requirements, and deadlines for Bamidele Olumilua University of Science & Technology (BOUESTI).

**Developer**: Egbeyemi Adeniyi Olorunfemi  
**Department**: Computer Science  
**University**: Bamidele Olumilua University of Science & Technology  
**Project Type**: Final Year Project

## Features

- **Modern Glassmorphism UI**: Beautiful, responsive design with glass-like effects
- **Real-time Chat Interface**: Interactive conversation with streaming responses
- **Mobile Responsive**: Optimized for all device sizes
- **Quick Questions**: Pre-defined common questions for easy access
- **University Branding**: Custom BOUESTI colors and branding throughout

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with OpenAI GPT-4
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Icons**: Lucide React
- **UI Components**: Custom glassmorphism components
- **AI Integration**: OpenAI API with streaming responses

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd boesti-uni-bot
```

2. Install dependencies:

```bash
npm install
```

3. Set up the backend environment:

```bash
cd backend
cp .env.example .env
# Edit .env and add your OpenAI API key
```

4. Start both frontend and backend:

```bash
cd ..
npm run dev:full
```

5. Open your browser and navigate to `http://localhost:5173`

### Running Frontend and Backend Separately

**Frontend only:**

```bash
npm run dev
```

**Backend only:**

```bash
cd backend
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── assets/             # Static assets (images, etc.)
└── lib/                # Utility functions
```

## Features Overview

### Chat Functionality

- Interactive chat interface with bot responses
- Typing indicators and streaming text effects
- Message history with timestamps
- Quick question buttons for common inquiries

### Topics Covered

- **Admission Requirements**: Entry requirements for all programs
- **Required Documents**: What students need to submit
- **Important Dates**: Application deadlines and academic calendar
- **Financial Information**: Fees, scholarships, and payment options
- **Program Details**: Information about courses, especially Computer Science

### Responsive Design

- Mobile-first approach
- Adaptive layouts for tablets and desktops
- Touch-friendly interactions
- Optimized performance across devices

## Customization

The chatbot responses can be customized by editing the `useChatbot.ts` hook in the `src/hooks/` directory. The design system uses CSS custom properties for easy theming.

## Contributing

This project is part of a final year Computer Science project at BOUESTI. For contributions or questions, please contact the developer.

## License

This project is developed as an academic project for Bamidele Olumilua University of Science & Technology.

---

**About BOUESTI**: Bamidele Olumilua University of Science & Technology is a leading institution committed to excellence in science, technology, and innovation education in Nigeria.
