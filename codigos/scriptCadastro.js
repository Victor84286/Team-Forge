import { auth, databaseRef, dbSet, database, createUserWithEmailAndPassword } from './scriptGeral.js';

let visibilidade = 1;
let removido = 0;

function criarUsuario() {
    let nome = document.getElementById("nomeUsuario").value;
    let email = document.getElementById("emailUsuario").value;
    let nomeEmpresa = document.getElementById("nomeEmpresa").value;
    let senha = document.getElementById("senhaUsuario").value;
    let senhaconfirmacao = document.getElementById("ConfirmaSenhaUsuario").value;
    let tipoUser = parseInt(document.getElementById("selecioneOpcao").value);  // Convertendo para número

    // cria autenticacao para usuario
    if (senha === senhaconfirmacao) {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed up
                let emailKey = email.slice(0, email.indexOf("@"));

                // cria tipo de usuario
                dbSet(databaseRef(database, "projeto/" + emailKey), {
                    quantidadeProjetos: 0
                });

                dbSet(databaseRef(database, "user/" + emailKey), {
                    nomeEmpresa: nomeEmpresa,
                    nome: nome,
                    tipoUser: tipoUser
                });
                if (tipoUser === 1) {
                    // cria empresa
                    dbSet(databaseRef(database, "empresa"), {
                        nome: nomeEmpresa
                    });
                }
                window.location.href = "/";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Erro na criação do usuário:", errorCode, errorMessage);
            });
    } else {
        console.error("As senhas não correspondem.");
    }
}



function alterarVisibilidade () {
  if (visibilidade === 1) {
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 31px;top: 25px;;width: 90px';
    document.getElementById('senhaUsuario').type = 'text';
    visibilidade = 2;
  } else if(visibilidade === 2) {
    document.getElementById('imagemVisibilidadeSenha').src = 'assetsApp\\olho cortado.png';
    document.getElementById('imagemVisibilidadeSenha').style = 'height: 40px;';
    document.getElementById('senhaUsuario').type = 'password';
    visibilidade = 1;
  }
}


function alterarVisibilidadeConfirmacao () {
    if (visibilidade === 1) {
      document.getElementById('imagemVisibilidadeSenhaConfirmacao').src = 'assetsApp\\olho.png';
      document.getElementById('imagemVisibilidadeSenhaConfirmacao').style = 'height: 31px;top: 25px;;width: 90px';
      document.getElementById('ConfirmaSenhaUsuario').type = 'text';
      visibilidade = 2;
    } else if(visibilidade === 2) {
      document.getElementById('imagemVisibilidadeSenhaConfirmacao').src = 'assetsApp\\olho cortado.png';
      document.getElementById('imagemVisibilidadeSenhaConfirmacao').style = 'height: 40px;';
      document.getElementById('ConfirmaSenhaUsuario').type = 'password';
      visibilidade = 1;
    }
  }

function removeOpcao() {
    if( removido === 0){
        document.getElementById("opcaoSelecione").remove();
        removido = 1;
    }
}

let botao_entrar = document.getElementById("cadastrese");
botao_entrar.addEventListener('click', criarUsuario);

let botao_visibilidade = document.getElementById("imagemVisibilidadeSenha");
botao_visibilidade.addEventListener('click', alterarVisibilidade);

let botao_visibilidade_confirmacao = document.getElementById("imagemVisibilidadeSenhaConfirmacao");
botao_visibilidade_confirmacao.addEventListener('click', alterarVisibilidadeConfirmacao);

let selecionar_tipo = document.getElementById("selecioneOpcao");
selecionar_tipo.addEventListener('click', removeOpcao);

export { criarUsuario, alterarVisibilidade };