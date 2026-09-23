# 🇮🇳 JanConnect – AI-Powered Citizen Grievance Navigator

**JanConnect** is an AI-powered civic technology platform designed to help citizens easily report, understand, and track public-service complaints.

Instead of requiring citizens to know which government department handles a particular issue, JanConnect uses AI-assisted grievance classification to identify the appropriate department and generate a structured complaint.

## 🌐 Live Prototype

**Website:**
https://build-for-billions.vercel.app/

---

## 🎯 Problem Statement

Citizens often face difficulties when reporting public-service problems because:

* They may not know which department is responsible.
* Government complaint processes can be difficult to understand.
* Language barriers can make complaint submission harder.
* Citizens may not know how to properly describe their problem.
* Tracking the status of complaints can be inconvenient.

JanConnect aims to simplify this process through an easy-to-use multilingual interface.

---

## 💡 Solution

JanConnect allows a citizen to:

1. Describe their problem using **text or voice**.
2. Select their preferred language.
3. Analyze the complaint using AI-assisted classification.
4. Identify the appropriate government department.
5. Generate a structured complaint.
6. Review and submit the complaint.
7. Receive a complaint ID.
8. Track the complaint status.

### Example

A citizen can enter:

> "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை."

JanConnect identifies the issue as a **Water Supply** complaint and routes it to the relevant department.

---

## ✨ Key Features

### 🗣️ Voice Complaint

Citizens can describe their problem using voice input.

The application supports speech recognition for:

* 🇮🇳 English
* 🇮🇳 Tamil
* 🇮🇳 Hindi

---

### ⌨️ Text Complaint

Users can type their complaint directly into the application.

The system analyzes the description and identifies the relevant service category.

---

### 🤖 AI-Assisted Classification

The application analyzes citizen complaints and categorizes them into suitable departments.

Example categories include:

* Water Supply
* Electricity
* Roads
* Street Lights
* Garbage / Waste Management
* Drainage / Sewage
* Public Transport
* Healthcare
* Sanitation
* Property / Tax
* Police / Public Safety
* Government Schemes
* Other

---

### 🏛️ Department Routing

After analyzing the complaint, JanConnect identifies the likely responsible department.

For example:

| Complaint                | Department                    |
| ------------------------ | ----------------------------- |
| No water supply          | Water Supply Department       |
| Damaged road             | Roads Department              |
| Street light not working | Electricity / Street Lighting |
| Garbage not collected    | Waste Management Department   |
| Drainage blockage        | Drainage / Sewage Department  |

---

### 📝 Complaint Generation

JanConnect converts the citizen's description into a structured complaint containing information such as:

* Complaint category
* Department
* Problem description
* Location
* Priority
* Complaint ID
* Status

This makes the complaint easier to understand and process.

---

### 📊 Complaint Tracking

Citizens can track their submitted complaints.

Example status flow:

```text
Submitted
    ↓
Under Review
    ↓
Assigned to Department
    ↓
In Progress
    ↓
Resolved
```

---

## 🌍 Multilingual Support

JanConnect is designed to support three languages:

### English

Example:

> There has been no drinking water supply in our area for three days.

### தமிழ்

Example:

> எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை.

### हिंदी

Example:

> हमारे इलाके में पिछले तीन दिनों से पानी की आपूर्ति नहीं हो रही है।

The selected language can be used throughout the user interface and complaint workflow.

---

## ♿ Accessibility

The application is designed with accessibility in mind.

Important accessibility considerations include:

* Clear and readable interface
* Large interactive buttons
* Keyboard-friendly navigation
* Visible focus states
* High-contrast interface
* Voice input
* Multilingual support
* Text-based status information
* Simple navigation

---

## 🏗️ System Workflow

```text
                Citizen
                   │
                   ▼
          Enter Complaint
             Text / Voice
                   │
                   ▼
          Language Selection
                   │
                   ▼
          Complaint Analysis
                   │
                   ▼
          AI Classification
                   │
                   ▼
        Identify Department
                   │
                   ▼
       Generate Structured
            Complaint
                   │
                   ▼
          Citizen Reviews
                   │
                   ▼
             Submit
                   │
                   ▼
          Generate Complaint ID
                   │
                   ▼
          Track Complaint
                   │
                   ▼
              Resolved
```

---

## 🧑‍💻 Technology Stack

### Frontend

* React
* Vite
* JavaScript / TypeScript
* HTML5
* CSS / Tailwind CSS
* Lucide Icons

### AI

* AI-assisted complaint classification
* Complaint summarization
* Department identification
* Multilingual complaint processing

### Browser APIs

* Web Speech API for voice input
* Local Storage for prototype data persistence

### Deployment

* Vercel

### Development Environment

* Visual Studio Code
* Git
* GitHub
* Node.js
* npm

---

## 📁 Project Structure

A typical project structure is:

```text
Build for Billions/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── i18n/
│   │   ├── en.ts
│   │   ├── ta.ts
│   │   └── hi.ts
│   │
│   ├── App.*
│   └── main.*
│
├── public/
│
├── package.json
├── package-lock.json
├── vite.config.*
├── tailwind.config.*
├── README.md
└── .gitignore
```

> The exact structure may vary depending on the implementation generated for the prototype.

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Open the project

```bash
cd "Build for Billions"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The terminal will provide a local URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## ☁️ Deployment

The prototype is deployed using Vercel.

### Build command

```bash
npm run build
```

### Output directory

```text
dist
```

### Start development server

```bash
npm run dev
```

Live prototype:

**https://build-for-billions.vercel.app/**

---

## 🔐 Environment Variables

If an external AI API is used, sensitive API keys should **not** be placed directly inside frontend code.

For example:

```text
OPENAI_API_KEY=your_api_key_here
```

Environment variables should be configured through the deployment platform.

For Vercel:

```text
Vercel
   ↓
Project
   ↓
Settings
   ↓
Environment Variables
```

Never commit secret API keys to GitHub.

---

## 🧪 Demo Scenario

### Scenario: Water Supply Complaint

A Tamil-speaking citizen reports:

```text
எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை.
```

The system can generate:

```text
Category:
Water Supply

Department:
Water Supply Department

Complaint:
There has been no drinking water supply
in our area for three days.

Status:
Submitted
```

A complaint ID can then be generated:

```text
JNC-2026-0001
```

The citizen can use this ID to track the complaint.

---

## 📱 User Journey

### Step 1 – Open JanConnect

The citizen opens the application.

### Step 2 – Select Language

The citizen selects:

```text
English
Tamil
Hindi
```

### Step 3 – Report Problem

The citizen enters a complaint through:

```text
🎤 Voice
or
⌨️ Text
```

### Step 4 – Analyze

JanConnect analyzes the complaint.

### Step 5 – Identify Department

The system identifies the relevant department.

### Step 6 – Review Complaint

The citizen reviews the generated complaint.

### Step 7 – Submit

The complaint is submitted through the prototype workflow.

### Step 8 – Track

The citizen receives a complaint ID and can track the status.

---

## 💎 Innovation

Traditional complaint systems often expect citizens to already understand the government structure.

JanConnect changes the interaction model:

```text
Traditional System

Citizen
   ↓
Find Department
   ↓
Find Complaint Portal
   ↓
Understand Form
   ↓
Submit Complaint
```

JanConnect:

```text
Citizen
   ↓
Describe Problem
   ↓
AI Understands Problem
   ↓
Department Identified
   ↓
Complaint Generated
   ↓
Submit & Track
```

The citizen focuses on **describing the problem**, rather than understanding the administrative structure.

---

## 🎯 Target Users

JanConnect can be useful for:

* Rural citizens
* Urban citizens
* Elderly citizens
* Citizens unfamiliar with government portals
* Users with limited digital literacy
* Multilingual users
* Users who prefer voice interaction

---

## 🔮 Future Enhancements

Future versions can include:

* Real government portal integration
* Real-time complaint tracking
* SMS notifications
* WhatsApp integration
* Mobile application
* Location-based department detection
* GPS-based complaint location
* Image upload for evidence
* Video upload
* Automatic priority detection
* Emergency complaint escalation
* Government department APIs
* Analytics dashboard
* Admin dashboard
* Complaint history
* AI-powered duplicate complaint detection
* Automatic translation
* More Indian languages

---

## 🔒 Privacy & Security

A production version should implement:

* Secure authentication
* Encrypted communication
* Secure API keys
* Role-based access control
* Input validation
* Rate limiting
* Secure database storage
* Protection of personally identifiable information
* Proper data retention policies

The prototype should not be considered a replacement for an official government grievance system until appropriate government integrations and security controls are implemented.

---

## 📌 Project Status

**Current Status:** Prototype / MVP

The deployed prototype demonstrates the core concept of an AI-powered multilingual citizen grievance navigator.

🌐 **Live Demo:**
https://build-for-billions.vercel.app/

---

## 👥 Project

**Project Name:** JanConnect

**Project Theme:** AI for Civic Services

**Project Type:** Web Application / AI Prototype

**Deployment:** Vercel

---

## 📄 License

This project is currently intended as a prototype and educational/project demonstration.

Add an appropriate open-source license if the project is later released publicly.
