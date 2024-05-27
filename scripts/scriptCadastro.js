import { auth, databaseRef, dbSet, dbRef, database, createUserWithEmailAndPassword } from './scriptGeral.js';

let checkerMode = 0;
let visibilidade = 1;

function alteraEscrita () {
    if (checkerMode === 0){
        document.getElementById("escritaOpcaoCadastro").innerHTML = "Líder"
        checkerMode = 1;
    }
    else if (checkerMode === 1) {
        document.getElementById("escritaOpcaoCadastro").innerHTML = "Colaborador"
        checkerMode = 0;
    }
}

function criarUsuario () {
    let nome = document.getElementById("nomeUsuario").value;
    let email = document.getElementById("emailUsuario").value;
    let nomeEmpresa = document.getElementById("nomeEmpresa").value;
    let senha = document.getElementById("senhaUsuario").value;
    let senhaconfirmacao = document.getElementById("ConfirmaSenhaUsuario").value;
    let tipoFuncionario = checkerMode;

    // cria autenticacao para usuario
    if(senha === senhaconfirmacao){
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed up
            email = email.slice(0, email.indexOf("."))
            console.log(email)

            // cria tipo de usuario
            dbSet(databaseRef(database, "tipoUsuario/"+email), {
                tipo: tipoFuncionario
            });

            // cria usuario de acordo com o tipo
            if(checkerMode === 1){
                dbSet(databaseRef(database, "lider/"+email), {
                    nomeEmpresa: nomeEmpresa,
                    nome: nome
                });

                // cria empresa
                dbSet(databaseRef(database, "empresa"), {
                    nome: nomeEmpresa
                });
            } else if (checkerMode === 0){
                dbSet(databaseRef(database, "colaborador/"+nomeEmpresa+"/"+email), {
                    nome: nome
                });
            }
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
    } else {
        document.getElementById("")
    }
}



function alterarVisibilidade () {
  console.log("msadokmsaodkm");
  if (visibilidade === 1) {
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 31px;top: -50px;';
    document.getElementById('senhaUsuario').type = 'text';
    visibilidade = 2;
  } else if(visibilidade === 2) {
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho cortado.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 40px;';
    document.getElementById('senhaUsuario').type = 'password';
    visibilidade = 1;
  }
}

let botao_entrar = document.getElementById("cadastrese");
botao_entrar.addEventListener('click', criarUsuario);

let botao_visibilidade = document.getElementById("imagemVisibilidadeSenha");
botao_visibilidade.addEventListener('click', alterarVisibilidade);

let selecionar_tipo = document.getElementById("switch-shadow");
selecionar_tipo.addEventListener('change', alteraEscrita)

export { criarUsuario, alterarVisibilidade };