import { auth, onAuthStateChanged, child, get, dbRef } from "./scriptGeral.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
      get(child(dbRef, `user/${user.email.slice(0, user.email.indexOf("@"))}`)).then((usuario) => {
        if (usuario.exists()) {
          console.log(usuario.val()['nome']);
          document.getElementById("nomePerfil").innerHTML = usuario.val()['nome'];
        }
      });
    }
});