# DistroPackageManager

A comprehensive full-stack application for managing Linux distribution packages across web and mobile platforms.

## 📋 Project Overview

DistroPackageManager is a multi-platform package management system consisting of:

- **Backend API**: RESTful API server for package management
- **Web Frontend**: Modern React-based user interface
- **Mobile App**: Flutter-based mobile application

The application enables users to manage, track, and distribute packages across different Linux distributions with a unified interface.

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Task Scheduling**: node-cron
- **HTTP Client**: axios

### Frontend

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI/Styling**: CSS
- **Internationalization**: Multi-language support (Arabic, English, French)

### Mobile App

- **Framework**: Flutter
- **Language**: Dart
- **Authentication**: Firebase
- **Platforms**: Android, iOS, Linux, macOS, Windows, Web

## 📁 Project Structure

```text
DistroPackageManager/
├── backend/                    # Node.js Express API server
│   ├── controllers/           # Business logic
│   │   ├── BackEndController.js
│   │   ├── NotificationController.js
│   │   ├── PackageController.js
│   │   ├── RepositoryController.js
│   │   └── UserController.js
│   ├── models/               # MongoDB schemas
│   │   ├── BackEndModel.js
│   │   ├── CounterModel.js
│   │   ├── NotificationModel.js
│   │   ├── PackageModel.js
│   │   ├── RepositoryModel.js
│   │   ├── SettingsModel.js
│   │   └── UserModel.js
│   ├── routes/               # API route definitions
│   │   ├── BackEndRoutes.js
│   │   ├── NotificationRoutes.js
│   │   ├── PackageRoutes.js
│   │   ├── RepositoryRoutes.js
│   │   └── UserRoutes.js
│   ├── server.js             # Express server entry point
│   └── package.json          # Dependencies
│
├── frontend/                  # React TypeScript web application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── linkInput/
│   │   │   └── sidebar/
│   │   ├── pages/            # Page components
│   │   │   ├── backend-list/
│   │   │   ├── dashboard/
│   │   │   ├── homepage/
│   │   │   ├── notifications-list/
│   │   │   ├── package-list/
│   │   │   ├── repository-list/
│   │   │   ├── settings/
│   │   │   ├── shell/
│   │   │   └── stats/
│   │   ├── translations/     # i18n files (AR, EN, FR)
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json
│
├── mobileapp/                 # Flutter mobile application
│   ├── lib/
│   │   ├── app/              # App configuration
│   │   │   ├── AppColors.dart
│   │   │   ├── AppConsts.dart
│   │   │   ├── modules/
│   │   │   ├── routes/
│   │   │   └── widgets/
│   │   ├── firebase_options.dart
│   │   └── main.dart
│   ├── android/              # Android-specific files
│   ├── ios/                  # iOS-specific files
│   ├── windows/              # Windows-specific files
│   ├── macos/                # macOS-specific files
│   ├── linux/                # Linux-specific files
│   ├── web/                  # Web-specific files
│   ├── pubspec.yaml          # Flutter dependencies
│   └── analysis_options.yaml
│
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker image definition
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Flutter SDK** (for mobile app)
- **Docker & Docker Compose** (optional, for containerized setup)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:

   ```text
   DBURI=mongodb+srv://username:password@cluster.mongodb.net/DistroPackageManager?retryWrites=true&w=majority
   PORT=5001
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (default Vite port)

### Mobile App Setup

1. Navigate to the mobile app directory:

   ```bash
   cd mobileapp
   ```

2. Install Flutter dependencies:

   ```bash
   flutter pub get
   ```

3. Run the app:

   ```bash
   flutter run
   ```

### Docker Setup (Optional)

To run the entire stack with Docker Compose:

```bash
docker-compose up
```

This will start:

- Backend API on `http://localhost:5001`
- MongoDB on `http://localhost:27017`

## 📋 Available Features

### Backend API

- **User Management**: Registration, login, authentication
- **Package Management**: Create, read, update, delete packages
- **Repository Management**: Manage distribution repositories
- **Notifications**: System notifications for users
- **Settings**: Application configuration
- **Backend Information**: System metrics and health checks

### Web Frontend

- **Dashboard**: Overview and statistics
- **Package List**: Browse and manage packages
- **Repository Management**: Manage package repositories
- **Notifications**: View system notifications
- **Backend List**: Monitor backend instances
- **Settings**: User preferences and app settings
- **Multi-language Support**: Available in Arabic, English, and French

### Mobile Application

- **Firebase Integration**: Authentication and cloud services
- **Cross-platform**: Native support for Android, iOS, and web
- **Responsive UI**: Adaptive layouts for different screen sizes

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Support**: Cross-Origin Resource Sharing configured
- **Environment Variables**: Sensitive data stored in `.env` files

## 🌍 Internationalization

The frontend supports multiple languages:

- **English** (en)
- **Arabic** (ar)
- **French** (fr)

Translation files are located in `frontend/src/translations/`

## 📱 Database Models

- **User**: User accounts and authentication
- **Package**: Package information and metadata
- **Repository**: Distribution repositories
- **Notification**: User notifications
- **Settings**: Application settings
- **BackEnd**: Backend instance information
- **Counter**: Counters for tracking

## 🧪 Testing

Currently, no automated tests are configured. You can add tests using:

- **Backend**: Jest or Mocha
- **Frontend**: Vitest or Jest
- **Mobile**: Flutter testing framework

## 📝 API Endpoints

The backend provides REST endpoints for:

- `/api/users` - User management
- `/api/packages` - Package operations
- `/api/repositories` - Repository management
- `/api/notifications` - Notification handling
- `/api/backend` - Backend information
- `/api/settings` - Settings management

## 🛠️ Development Scripts

### Backend Scripts

```bash
npm run dev    # Start development server with nodemon
npm run test   # Run tests (not yet configured)
```

### Frontend Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

### Mobile

```bash
flutter run        # Run on connected device
flutter build apk  # Build Android APK
flutter build ios  # Build iOS app
flutter build web  # Build web version
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running and accessible
- Verify the connection string in your `.env` file
- Check network connectivity to MongoDB Atlas (if using cloud)

### Port Already in Use

- Backend default port: 5001
- Frontend default port: 5173
- MongoDB default port: 27017

Change ports in respective configuration files if needed.

### CORS Errors

- Ensure CORS is properly configured in the backend
- Check that frontend and backend URLs match in backend configuration

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Flutter Documentation](https://flutter.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For issues and questions, please open an issue in the repository or contact the development team.
