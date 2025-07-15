# CyberNinja - E-Learning Platform

A modern, interactive e-learning platform built with React and Firebase, designed to provide cybersecurity education through structured learning paths, interactive challenges, and hands-on practice labs.

## 🚀 Features

### For Students

- **Interactive Learning Paths** - Structured courses with progress tracking
- **Practice Labs** - Hands-on cybersecurity exercises and simulations
- **Challenges** - Competitive coding and security challenges
- **Progress Tracking** - Visual progress indicators and achievement badges
- **User Dashboard** - Personalized learning experience with analytics

### For Educators & Administrators

- **Admin Dashboard** - Comprehensive course and user management
- **Course Management** - Create, edit, and organize learning content
- **User Analytics** - Track student progress and engagement
- **Challenge Management** - Create and manage interactive challenges
- **Settings & Configuration** - Platform customization and settings

### Platform Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - User preference-based theme switching
- **Real-time Authentication** - Secure user registration and login
- **Role-based Access** - Different interfaces for students, teachers, and admins
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - Responsive CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions
- **AOS** - Animate On Scroll library

### Backend & Database

- **Firebase** - Authentication, Firestore database, and hosting
- **Express.js** - Backend server for additional functionality
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling

### Development Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **Concurrently** - Run multiple commands simultaneously

## 📁 Project Structure

```
src/
├── authentication/          # Auth components (login, signup, admin)
├── Components/             # Reusable UI components
│   ├── common/            # Shared components (Button, Card, etc.)
│   └── Layout/            # Layout components
├── context/               # React context providers
├── Layouts/               # Page layouts and navigation
├── Pages/                 # Main application pages
│   ├── Admin/            # Admin-specific pages
│   ├── Dashboard/        # User dashboard
│   ├── HomePage/         # Landing page
│   ├── LearningPaths/    # Course content
│   ├── PracticeLab/      # Interactive labs
│   └── Profile/          # User profile management
├── Routes/               # Application routing
├── services/             # API and external service integrations
└── styles/               # Global styles and themes
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account and project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-learning-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will start both the Vite development server and the Express backend server concurrently.

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📝 Available Scripts

- `npm run dev` - Start development server (Vite + Express)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start Express server only
- `npm start` - Start production server

## 🔐 Authentication & Authorization

The platform supports three user roles:

1. **Public Users** - Can browse courses and sign up
2. **Authenticated Users** - Full access to learning features
3. **Administrators** - Complete platform management access

## 🎨 Customization

### Themes

The platform supports both light and dark themes. Users can toggle between themes using the theme toggle in the header.

### Styling

- Global styles are in `src/styles/`
- Component-specific styles are co-located with components
- Bootstrap 5 classes are used for responsive design
- Custom CSS variables for consistent theming

## 🚀 Deployment

### Firebase Hosting

1. Build the project: `npm run build`
2. Deploy to Firebase: `firebase deploy`

### Other Platforms

The application can be deployed to any static hosting service that supports React applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔮 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with external learning platforms
- [ ] AI-powered learning recommendations
- [ ] Multi-language support
- [ ] Advanced challenge types
- [ ] Real-time collaboration features

---

**CyberNinja** - Empowering the next generation of cybersecurity professionals through interactive learning.
