import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4xaVxDsfBcb8jPGgxvfcH87S2IF3QQCg",
    authDomain: "teamforge-c553c.firebaseapp.com",
    projectId: "teamforge-c553c",
    storageBucket: "teamforge-c553c.appspot.com",
    messagingSenderId: "404114126474",
    appId: "1:404114126474:web:40d1a72900762d34f11f73",

    databaseURL: "https://teste-7c0e4-default-rtdb.firebaseio.com",
    measurementId: "G-HW4VSHP6LZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage();

const dbRef = ref(database);
const stRef = storageRef(storage);

export { auth, dbRef, stRef }