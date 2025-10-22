# Feedback System Documentation

## Overview

The BOUESTI Admission Chatbot now includes a thumbs up/down feedback system for bot responses. This allows users to rate the helpfulness of each answer, providing valuable data for improving the chatbot.

## Current Implementation (Mock)

### Frontend Features

✅ **Thumbs up/down buttons** on each bot message  
✅ **Visual feedback** - buttons highlight when selected  
✅ **Toast notifications** - friendly confirmation messages  
✅ **Toggle functionality** - click again to remove feedback  
✅ **Responsive design** - works on all device sizes  
✅ **Glassmorphism styling** - matches the existing UI  
✅ **Excludes welcome message** - only shows on actual responses  
✅ **Hides during streaming** - appears after message is complete

### Data Structure

Currently, feedback is logged to the browser console with this structure:

```javascript
{
  messageId: "msg_1_1234567890",
  feedback: "positive" | "negative" | null,
  timestamp: "2025-10-22T12:34:56.789Z",
  sessionId: "session_1234567890"
}
```

### User Experience

1. User asks a question
2. Bot responds with an answer
3. Thumbs up/down buttons appear below the message
4. User clicks thumbs up or down
5. Button highlights and toast notification appears
6. User can click again to remove feedback
7. Data is logged to console (ready for backend integration)

## Future Backend Integration

### Step 1: Database Schema

When you're ready to store feedback, create a table like this:

```sql
CREATE TABLE message_feedback (
  id SERIAL PRIMARY KEY,
  message_id VARCHAR(255) NOT NULL,
  feedback VARCHAR(20) CHECK (feedback IN ('positive', 'negative')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_id VARCHAR(255),
  user_message TEXT,
  bot_response TEXT,
  metadata JSONB
);
```

### Step 2: Backend API Endpoint

Create an endpoint in your Express server:

```javascript
// In backend/server.js or a new api/feedback.js file

app.post("/api/feedback", async (req, res) => {
  try {
    const { messageId, feedback, timestamp, sessionId } = req.body;

    // Validate input
    if (!messageId || !["positive", "negative", null].includes(feedback)) {
      return res.status(400).json({ error: "Invalid feedback data" });
    }

    // Store in database
    // await db.query('INSERT INTO message_feedback ...');

    console.log("Feedback received:", { messageId, feedback, timestamp, sessionId });

    res.json({ success: true, message: "Feedback recorded" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});
```

### Step 3: Enable Frontend API Call

In `src/pages/Index.tsx`, uncomment and update this line (around line 73):

```typescript
// Current (line 73):
// await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackData) });

// Change to:
await fetch("/api/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(feedbackData),
});
```

### Step 4: Session Tracking (Optional)

For better analytics, implement session tracking:

```typescript
// In useChatbot.ts or a new hook
const sessionId = useRef("session_" + Math.random().toString(36).substring(7) + "_" + Date.now());
```

## Analytics & Insights

### Metrics to Track

Once backend is integrated, you can analyze:

1. **Response Quality**

   - % of positive vs negative feedback
   - Most helpful responses
   - Most problematic responses

2. **Common Issues**

   - Questions that consistently get negative feedback
   - Topics that need better responses

3. **User Behavior**

   - Feedback submission rate
   - Average session length
   - Most asked questions

4. **Improvement Over Time**
   - Track feedback trends after updates
   - A/B test different response styles

### Example Dashboard Query

```sql
SELECT
  feedback,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM message_feedback
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY feedback;
```

## Database Options

### Quick Start (Development)

- **SQLite** - File-based, zero setup
- **JSON file** - Simple but not scalable

### Production Ready

- **PostgreSQL** - Recommended for Vercel/Heroku
- **MongoDB** - Good for flexible schema
- **Supabase** - Postgres with free tier + auth
- **PlanetScale** - MySQL with generous free tier
- **Firebase Firestore** - Serverless, easy setup

### Recommended: Supabase (Free Tier)

1. Sign up at supabase.com
2. Create a new project
3. Use their SQL editor to create the table
4. Install client: `npm install @supabase/supabase-js`
5. Add environment variables
6. Update feedback endpoint to use Supabase

## Testing the Current Implementation

### How to Test Now

1. Start the development server: `npm run dev:full`
2. Open the browser console (F12)
3. Ask the bot a question
4. Click thumbs up or down on the response
5. Check console for log: `📊 Mock feedback data: {...}`
6. Verify toast notification appears
7. Click again to toggle feedback off

### Expected Console Output

```
📊 Mock feedback data: {
  messageId: "msg_2_1729599296789",
  feedback: "positive",
  timestamp: "2025-10-22T12:34:56.789Z",
  sessionId: "session_1729599296789"
}
```

## UI Customization

### Changing Button Styles

In `src/pages/Index.tsx` (lines 242-263), you can customize:

```typescript
// Active state colors
bg - emerald - 500 / 40; // Positive feedback background
bg - red - 500 / 40; // Negative feedback background

// Inactive state
bg - white / 10; // Default background
text - white / 60; // Default icon color

// Hover effects
hover: scale - 110; // Scale animation
hover: bg - white / 20; // Hover background
```

### Changing Toast Messages

In `src/pages/Index.tsx` (lines 44-61), customize the toast notifications:

```typescript
toast({
  title: "Your custom message here",
  description: "More details...",
  duration: 3000, // milliseconds
});
```

## Privacy Considerations

### Current Implementation

- ✅ No data sent to server
- ✅ No personal information collected
- ✅ Data only in browser console
- ✅ Cleared on page refresh

### When Adding Backend

- ⚠️ Add privacy notice in UI
- ⚠️ Don't store IP addresses unnecessarily
- ⚠️ Consider GDPR compliance
- ⚠️ Allow users to opt out
- ⚠️ Anonymize data after analysis period

## Future Enhancements

### Quick Wins

- [ ] Add "Why?" follow-up for negative feedback
- [ ] Show feedback count to admins
- [ ] Export feedback as CSV for analysis

### Advanced Features

- [ ] Sentiment analysis on conversations
- [ ] Auto-flag responses with low ratings
- [ ] A/B test different prompt templates
- [ ] Show "Was this helpful?" only for complex queries
- [ ] Add comment field for detailed feedback
- [ ] Email notifications for negative feedback
- [ ] Dashboard to view feedback analytics
- [ ] Train/fine-tune model based on feedback

## Questions?

For questions or help implementing the backend:

- Check the console logs to see current data structure
- Review this documentation
- Test thoroughly before connecting to database
- Start with a simple solution (JSON file or SQLite)
- Scale up to production database when ready

## Files Modified

- `src/pages/Index.tsx` - Main feedback UI and logic
- `src/components/ChatWindow.tsx` - Message interface with feedback field
- `FEEDBACK_SYSTEM.md` - This documentation file

---

**Note:** The current implementation is fully functional on the frontend and ready for backend integration whenever you add a database to your project.
