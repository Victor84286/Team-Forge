import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref as databaseRef, child, get, set as dbSet  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4xaVxDsfBcb8jPGgxvfcH87S2IF3QQCg",
  authDomain: "teamforge-c553c.firebaseapp.com",
  databaseURL: "https://teamforge-c553c-default-rtdb.firebaseio.com",
  projectId: "teamforge-c553c",
  storageBucket: "teamforge-c553c.appspot.com",
  messagingSenderId: "404114126474",
  appId: "1:404114126474:web:40d1a72900762d34f11f73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage();

const dbRef = databaseRef(database);
const stRef = storageRef(storage);

export { auth, dbRef, stRef, database, createUserWithEmailAndPassword, onAuthStateChanged, getDatabase, databaseRef, child, get, dbSet }