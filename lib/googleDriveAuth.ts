import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.meet.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts',
];

const provider = new GoogleAuthProvider();
// Add all requested Drive scopes to provider
DRIVE_SCOPES.forEach((scope) => {
  provider.addScope(scope);
});
// Set prompt to select account / consent if needed
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// In-memory cache for the access token (Never persisted to localStorage for security)
let cachedAccessToken: string | null = null;
let cachedGoogleUser: User | null = null;

/**
 * Initialize auth state listener. Call this on app load.
 */
export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  if (typeof window === 'undefined') return () => {};

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedGoogleUser = user;
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User logged into Firebase, but token is fresh/unset in this memory session
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      cachedGoogleUser = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Initiates the Google Sign-in popup with Google Drive scopes.
 * Must be called from a user action (e.g. button click).
 */
export const googleSignInForDrive = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Drive OAuth access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    cachedGoogleUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Drive sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Retrieve cached in-memory access token.
 */
export const getDriveAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Get current Google User object.
 */
export const getDriveUser = (): User | null => {
  return cachedGoogleUser || auth.currentUser;
};

/**
 * Check if the user is authenticated with an active Drive token.
 */
export const isDriveConnected = (): boolean => {
  return !!cachedAccessToken && !!auth.currentUser;
};

/**
 * Sign out and clear cached in-memory tokens.
 */
export const logoutFromDrive = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.warn('Error signing out of Firebase Auth:', err);
  } finally {
    cachedAccessToken = null;
    cachedGoogleUser = null;
  }
};
