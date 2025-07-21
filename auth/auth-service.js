import { auth, googleProvider } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
    this.initAuthStateListener();
  }

  initAuthStateListener() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.notifyAuthStateChange(user);
    });
  }

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthStateChange(callback) {
    this.authStateListeners.push(callback);
  }

  notifyAuthStateChange(user) {
    this.authStateListeners.forEach(callback => callback(user));
  }
}

export const authService = new AuthService();