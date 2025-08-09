# AI Voice Translation Setup

## Prerequisites

1. **Google Generative AI API Key**: You need to get an API key from Google's AI Studio
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

## Setup Instructions

1. **Create Environment File**:
   Create a `.env.local` file in the root directory with:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Test the Application**:
   - Open http://localhost:3000
   - Type some text in the source language field
   - Select a target language
   - The translation should appear in the output field

## Troubleshooting

### Translation Not Working?
1. **Check API Key**: Make sure `GEMINI_API_KEY` is set in `.env.local`
2. **Check Console**: Open browser dev tools and check for errors
3. **Check Network**: Look at the Network tab to see if API calls are being made
4. **Check Server Logs**: Look at the terminal where you ran `npm run dev` for server-side errors

### Common Issues:
- **"GEMINI_API_KEY is not configured"**: Set up your environment variable
- **"Translation failed"**: Check your API key and internet connection
- **No response**: Make sure the development server is running

## API Endpoint

The translation API is available at `/api/translate` and expects:
```json
{
  "sourceText": "text to translate",
  "selectedLanguage": "target language"
}
```
