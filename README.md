# Path Finder Pro

> Connect with professionals who've been where you're going

Path Finder Pro is a mentorship platform that connects high school graduates with experienced professionals in their field of interest. Get real insights, guidance, and mentorship for your university journey and career path.

![Path Finder Pro](C:\Users\USER\.vscode\python1\hack\path-finder-pro\home.png)


---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [Key Features in Detail](#-key-features-in-detail)
- [Usage](#-usage)
- [Database Seeding](#-database-seeding)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## ✨ Features

- 🔐 **User Authentication**: Secure sign-up and login for both students and mentors
- 👥 **Mentor Profiles**: Detailed profiles showcasing mentors' expertise, experience, and career insights
- 🔍 **Browse Mentors**: Filter and search for mentors by field of work, experience, and company
- 💬 **Mentor Requests**: Students can send mentor requests; mentors can accept or decline
- 📊 **Personalized Dashboard**: Role-based dashboards for students and mentors
- 🤖 **AI Chatbot**: Interactive AI assistant to answer questions about careers and education
- 📝 **Feedback System**: Contact form for users to provide feedback
- 🎨 **Modern UI**: Beautiful, responsive design built with shadcn/ui and Tailwind CSS

![Dashboard View](C:\Users\USER\.vscode\python1\hack\path-finder-pro\contact.png)


---

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Edge Functions

### Additional Tools
- **TanStack Query** - Data fetching and caching
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

![Mentors Page](C:\Users\USER\.vscode\python1\hack\path-finder-pro\mentors.png)



## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lampard7crypt/path-finder-pro.git
   cd path-finder-pro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```


### Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:

   ```
   http://localhost:8080
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:

   ```bash
   npm run preview
   ```

![Authentication Page](C:\Users\USER\.vscode\python1\hack\path-finder-pro\signup.png)


---

## 📁 Project Structure

```
path-finder-pro/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Navigation.tsx
│   │   ├── ChatBot.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Auth.tsx
│   │   ├── Mentors.tsx
│   │   ├── Dashboard.tsx
│   │   └── Contact.tsx
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # Third-party integrations
│   │   └── supabase/      # Supabase client and types
│   ├── lib/               # Utility functions
│   └── main.tsx           # Application entry point
├── supabase/
│   ├── migrations/        # Database migrations
│   └── functions/         # Supabase Edge Functions
│       └── chat/          # AI chatbot function
├── scripts/
│   ├── seed-data.ts       # Database seeding script
│   └── README.md          # Seeding instructions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Key Features in Detail

### For Students

- **Browse Mentors**: Search through a directory of professionals across various industries
- **Send Mentor Requests**: Connect with mentors by sending personalized requests
- **Track Requests**: Monitor the status of your mentor requests (pending, accepted, declined)
- **View Dashboard**: Access your profile and request history in one place

### For Mentors

- **Create Profile**: Build a comprehensive profile showcasing your expertise and experience
- **Manage Requests**: Review and respond to mentorship requests from students
- **Career Insights**: Share your career journey and insights with mentees
- **Edit Profile**: Update your profile information anytime

### AI Chatbot

The platform includes an AI-powered chatbot that can answer questions about:
- Career paths and opportunities
- University course selection
- Industry insights
- Finding the right mentor

![AI Chatbot](C:\Users\USER\.vscode\python1\hack\path-finder-pro\AIBot.png)

*Screenshot 5: AI chatbot interface for instant career guidance*

---

## 💻 Usage

### Sign Up

1. Navigate to the **Auth** page (`/auth`)
2. Click **Sign Up**
3. Fill in your details:
   - Full Name
   - Email Address
   - Password
   - Role (Student or Mentor)
4. Click **Sign Up**

### For Students

1. **Browse Mentors**: Visit the **Mentors** page to see all available mentors
2. **Send Request**: Click on a mentor card to view their profile and send a mentorship request
3. **Manage Requests**: Check your **Dashboard** to see request statuses

### For Mentors

1. **Complete Profile**: After signing up, go to your **Dashboard** and create your mentor profile
   - Add your job title
   - Specify your company (optional)
   - Select your field of work
   - Write a bio and career insights
   - Add years of experience
2. **Review Requests**: Check your **Dashboard** for incoming mentor requests
3. **Respond**: Accept or decline requests from students

---

**Path Finder Pro** was developed by:
- Lampard Kipyegon
- Emmanuel Kibet
- Tiffany Ndindi
- Sheila Njeri
- Constantine Joseph

This project was created for the AIS Hackathon on November 21-22, 2025.

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by the Path Finder Pro team**
