// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAf4xoCyXJXkqQ0qstXwaxnanhtcXkl-vk",
  authDomain: "auth.visi.biz.id",
  projectId: "tkk-auth-76381",
  storageBucket: "tkk-auth-76381.firebasestorage.app",
  messagingSenderId: "795380166766",
  appId: "1:795380166766:web:4f9ed4f733407aa346367f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});




