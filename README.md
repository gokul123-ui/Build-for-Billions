# 🏛️ JANCONNECT – AI-Powered Citizen Grievance Navigator

JANCONNECT is a modern, multilingual citizen grievance platform designed to help citizens report municipal and public service issues easily in **English**, **Tamil (தமிழ்)**, or **Hindi (हिन्दी)**.

Using AI classification and dynamic speech recognition, JanConnect automatically routes casual citizen complaints to the correct government department, generates formal structured complaint documents, simulates transmission to a municipal government portal, and tracks resolution status in real time.

---

## 🌟 Key Features

1. **Exact 3-Language Support**: English, Tamil (தமிழ்), and Hindi (हिन्दी) with prominent header switcher `[ 🌐 English | தமிழ் | हिन्दी ]`.
2. **Multilingual Voice & Text Input**: Speaks or types complaints. Automatically configures Web Speech API locales:
   - English: `en-IN`
   - Tamil: `ta-IN`
   - Hindi: `hi-IN`
3. **AI Department Classifier**: 
   - Supports external AI model API key via `VITE_AI_API_KEY`.
   - Built-in robust multilingual rule-based classifier fallback matching 14+ categories across English, Tamil, and Hindi keywords.
4. **Structured Complaint Generation**: Converts casual speech into structured complaint summaries, priority levels (`High`, `Medium`, `Low`), and requested department actions.
5. **Interactive Status Timeline**: Visual progress tracking (`Submitted` → `Under Review` → `Assigned` → `In Progress` → `Resolved`).
6. **Demo Mode & Status Simulation**: Preset sample complaints in Tamil, Hindi, and English + a "Simulate Next Status Step" button for live evaluation and hackathon demos.
7. **Accessibility Features**:
   - Dynamic font scaling (`Normal`, `Large`, `Extra Large`).
   - High Contrast mode for visually impaired citizens.
   - Reduce Motion toggle.
   - Screen-reader friendly ARIA labels and high-visibility keyboard focus indicators.
8. **Client-side Persistence**: Saves all complaints and timeline history into browser `localStorage`.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Voice Recognition**: Web Speech API (`webkitSpeechRecognition`)

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
Ensure Node.js (v18+) and npm (v9+) are installed on your machine.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional AI Key)
Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```
Inside `.env`:
```env
VITE_AI_API_KEY=your_gemini_or_ai_api_key_here
```
> **Note**: If `VITE_AI_API_KEY` is omitted or left empty, JanConnect automatically uses its built-in multilingual fallback rule-based classifier so the application remains 100% functional without external APIs.

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

---

## 🤖 How the AI Classifier Works

The classifier engine (`src/services/aiClassifier.ts`) follows a two-tier architecture:

1. **External AI API (Primary)**:
   If `VITE_AI_API_KEY` is present in environment variables, JanConnect sends the complaint description to the Gemini API endpoint to extract category, priority, and multi-lingual summaries.
2. **Offline Rule-Based Classifier (Fallback)**:
   If no API key is provided or if network fails, JanConnect runs an offline keyword matcher evaluating terms across all 14 categories in English, Tamil, and Hindi:
   - **Water Supply**: `water`, `குடிநீர்`, `தண்ணீர்`, `पानी`, `जल`
   - **Electricity**: `electricity`, `மின்சாரம்`, `மின்தடை`, `बिजली`, `कटौती`
   - **Roads**: `pothole`, `சாலை`, `பள்ளம்`, `सड़क`, `गड्ढा`
   - **Garbage**: `garbage`, `குப்பை`, `கழிவு`, `कचरा`, `गंदगी`
   - **Street Lights**: `street light`, `தெருவிளக்கு`, `வெளிச்சம்`, `स्ट्रीट लाइट`, `अंधेरा`
   - **Drainage**: `sewage`, `சாக்கடை`, `கழிவுநீர்`, `नाली`, `सीवर`
   - ...and 8 additional categories.

---

## 🎤 How Voice Recognition Works

Voice speech input (`src/services/speechRecognition.ts`) wraps the browser's `SpeechRecognition` / `webkitSpeechRecognition` API.

- When the citizen changes the application language, the speech locale dynamically changes:
  - English: `recognition.lang = 'en-IN'`
  - Tamil: `recognition.lang = 'ta-IN'`
  - Hindi: `recognition.lang = 'hi-IN'`
- If browser speech recognition is unavailable, a friendly notification prompts the citizen to use text input.

---

## 🌐 How to Add Another Language (e.g. Telugu, Kannada, Bengali)

1. Open `src/types/index.ts` and add the language code to `Language` type:
   ```ts
   export type Language = 'en' | 'ta' | 'hi' | 'te';
   ```
2. Create `src/i18n/te.ts` with translations for all keys matching `src/i18n/en.ts`.
3. Import `te` in `src/i18n/index.ts` and register it in `translations`.
4. Add locale mapping in `src/services/speechRecognition.ts` (e.g., `'te-IN'`).
5. Update language switcher in `src/components/Header.tsx`.

---

## 🏛️ How to Replace Mock Submission with a Real Government Portal API

Currently, `src/services/storageService.ts` simulates backend portal persistence by saving complaints to `localStorage`.

To connect to a live municipal or state government API (e.g., CPGRAMS / TN Grievance Portal / Rajasthan Sampark):

1. Open `src/services/storageService.ts`.
2. Replace `saveComplaint()` with an async fetch call to your government API endpoint:
   ```ts
   export async function submitToGovernmentPortal(draftData: ComplaintData) {
     const response = await fetch('https://api.gov-portal.example.in/grievances/create', {
       method: 'POST',
       headers: { 
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${process.env.GOV_API_TOKEN}`
       },
       body: JSON.stringify({
         citizen_description: draftData.citizenDescription,
         department_code: draftData.categoryId,
         location_street: draftData.location,
         district: draftData.district,
         state: draftData.state
       })
     });
     return await response.json();
   }
   ```
3. Update `src/pages/ReviewComplaintPage.tsx` to await the API response and receive the official government tracking ID.

---

## 📜 License & Hackathon Demonstration

Built for citizen empowerment and hackathon demonstration. All major features, multilingual voice input, AI classification, review, submission, status timeline tracking, and accessibility settings are fully functional.
