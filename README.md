# SettleUp - Expo React Native App with Google Login

A sample Expo React Native application with Google authentication.

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

## Google OAuth Setup

To enable Google login, you need to configure OAuth credentials:

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** and **People API**

### 2. Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Fill in the app name and required fields
4. Add scopes: `email`, `profile`, `openid`

### 3. Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**

Create three client IDs:

#### Web Client (required for Expo Go)
- Application type: **Web application**
- Authorized redirect URIs: `https://auth.expo.io/@YOUR_EXPO_USERNAME/settleup`

#### Android Client
- Application type: **Android**
- Package name: `com.brainrot.settleup`
- SHA-1 fingerprint: Run `expo credentials:manager` to get it

#### iOS Client
- Application type: **iOS**
- Bundle ID: `com.brainrot.settleup`

### 4. Update the App
Replace the placeholder client IDs in `app/index.tsx`:

```typescript
const GOOGLE_CLIENT_ID = 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_IOS_CLIENT_ID = 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_ANDROID_CLIENT_ID = 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com';
```

## Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

```
├── app/
│   ├── _layout.tsx    # Root layout with navigation
│   └── index.tsx      # Login screen with Google auth
├── assets/            # App icons and images
├── app.json           # Expo configuration
├── package.json       # Dependencies
└── tsconfig.json      # TypeScript configuration
```

## Tech Stack

- **Expo SDK 52** - React Native framework
- **Expo Router** - File-based routing
- **expo-auth-session** - OAuth authentication
- **TypeScript** - Type safety
