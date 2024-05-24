//import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
//import { auth } from './scriptGeral';

function login() {
  signInWithEmailAndPassword(auth,
    document.getElementById('emailUsuario').value,
    document.getElementById('senhaUsuario').value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('uid', user.uid);
    console.log('accessToken', user.accessToken);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

let visibilidade = 1

function alterarVisibilidade () {
  console.log("msadokmsaodkm")
  if (visibilidade === 1) {
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 31px;top: -50px;';
    document.getElementById('senhaUsuario').type = 'text';
    visibilidade = 2
  }
  else if(visibilidade === 2){
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho cortado.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 40px;';
    document.getElementById('senhaUsuario').type = 'password';
    visibilidade = 1
  }
}