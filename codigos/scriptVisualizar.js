import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref as databaseRef, child, get, set as dbSet  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

const dbRef = databaseRef(database);


onAuthStateChanged(auth, (user) => {
  if (user){
    get(child(dbRef, `projeto/${user.email.slice(0, user.email.indexOf("."))}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let containerProjetos = document.getElementById("containerProjetos");

        // Cria um novo elemento input
        let containerCard = document.createElement("div");
        containerCard.className = "containerCard";
        let nomeProjeto = document.createElement("p");
        nomeProjeto.innerHTML = "hhh";
        // containerCard.appendChild(nomeProjeto);
        containerProjetos.parentNode.appendChild(nomeProjeto);


      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
})