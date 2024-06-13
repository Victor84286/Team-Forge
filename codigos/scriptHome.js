import { auth, onAuthStateChanged, child, get, dbRef } from "./scriptGeral.js";

let tipo;
let quantidadeProjetos;
get(child(dbRef, `numeroProjetos`)).then((quantidade) => {
  if (quantidade.exists()) {
    quantidadeProjetos = parseInt(quantidade.val()["quantidadeProjetos"]);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    get(
      child(dbRef, `user/${user.email.slice(0, user.email.indexOf("@"))}`)
    ).then((usuario) => {
      if (usuario.exists()) {
        tipo = parseInt(usuario.val()["tipoUser"]);
        console.log(usuario.val()["nome"]);
        document.getElementById("nomePerfil").innerHTML = usuario.val()["nome"];
      }
    });
    get(child(dbRef, `projeto/${user.email.slice(0, user.email.indexOf("@"))}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (tipo === 1) {
            let botao_a = document.createElement("a");
            botao_a.className = "containerNovoProjeto";
            botao_a.href = "./criarProjeto.html";

            let escritaBotao = document.createElement("p");
            escritaBotao.className = "botaoNvovoProjeto";
            escritaBotao.textContent = "+";

            // Obtém o elemento de referência
            let referencia = document.getElementById("containerProjetos");

            // Insere o novo input antes do elemento de referência
            referencia.parentNode.insertBefore(botao_a, referencia);
            botao_a.appendChild(escritaBotao);
            let botao_remover_projeto = document.createElement("input");
            botao_remover_projeto.className = "botaoRemoverProjeto";
            botao_remover_projeto.type = "button";
            botao_remover_projeto.value = "Remover Projeto";
            botao_remover_projeto.addEventListener("click", removerProjeto);

            // Obtém o elemento de referência
            let referenciaRemover =
              document.getElementById("containerProjetos");

            // Insere o novo input antes do elemento de referência
            referenciaRemover.parentNode.insertBefore(
              botao_remover_projeto,
              referenciaRemover
            );
          }
          let containerProjetos = document.getElementById("containerProjetos");
          let referenciaProjetos = snapshot.val();

          for (let i = 0; i < quantidadeProjetos; i++) {
            try {
              let projeto = referenciaProjetos[`projeto${i}`];
              // Cria um novo elemento input
              let containerCard = document.createElement("div");
              containerCard.className = "containerCard";
              containerCard.id = `projeto${i}`;
              let nomeProjeto = document.createElement("h2");
              nomeProjeto.innerHTML = projeto["nome"];
              containerCard.appendChild(nomeProjeto);

              let escritaColaboradores = document.createElement("h3");
              escritaColaboradores.innerHTML = "Colaboradores";
              containerCard.appendChild(escritaColaboradores);

              for (let j = 0; j < projeto["numeroColaboradores"]; j++) {
                let colaboradorNome = document.createElement("p");
                colaboradorNome.innerHTML = projeto["colaborador"][j]["nome"];
                containerCard.appendChild(colaboradorNome);
              }

              let escritaCompetencias = document.createElement("h3");
              escritaCompetencias.innerHTML = "Competências";
              containerCard.appendChild(escritaCompetencias);

              for (let j = 0; j < projeto["numeroCompetencias"]; j++) {
                let colaboradorNome = document.createElement("p");
                colaboradorNome.innerHTML =
                  projeto["competencia"][j]["competencia"];
                containerCard.appendChild(colaboradorNome);
              }
              containerProjetos.appendChild(containerCard);
            } catch (error) {
              console.log("projeto de outro perfil");
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else window.location.href = "/Team-Forge/";
});

function removerProjeto() {
  let escritaNome = document.createElement("p");
  escritaNome.id = "escritaNomeProjeto";
  escritaNome.innerHTML =
    "Escreva o nome do projeto a ser removido.\n<span class='subescritoPopUp'>(Lembramos que remoções são permanentes)</span>";
  let popUpNome = document.createElement("input");
  popUpNome.type = "text";
  popUpNome.id = "nomeProjetoRemover";
  popUpNome.placeholder = "nome";
  let botaoRemoveProjeto = document.createElement("input");
  botaoRemoveProjeto.type = "button";
  botaoRemoveProjeto.id = "botaoRemoveBanco";
  botaoRemoveProjeto.value = "Remover projeto";
  botaoRemoveProjeto.addEventListener("click", removeBancoDados);
  let popUp = document.createElement("div");
  popUp.className = "popUp";

  document.getElementById("containerProjetos").appendChild(popUp);
  popUp.appendChild(escritaNome);
  popUp.appendChild(popUpNome);
  popUp.appendChild(botaoRemoveProjeto);
}

function removeBancoDados() {
  console.log("teste1");
  onAuthStateChanged(auth, (user) => {
    get(
      child(dbRef, `projeto/${user.email.slice(0, user.email.indexOf("@"))}`)
    ).then((snapshot) => {
      let nome = document.getElementById("nomeProjetoRemover");
      let projetos = snapshot.val();
      for (let i = 0; i < quantidadeProjetos; i++) {
        let prj = projetos[`projeto${i}`];
        if (prj != undefined) {
          console.log(prj);
          if (prj[nome] === nome) {
            for (let j = 0; j < prj["numeroColaboradores"]; j++) {
              let colaborador = `colaborador/${j}['nome']`;
              get(child(dbRef, `projeto/${prj[colaborador]}`)).then(
                (projetoColaborador) => {
                  dbSet(databaseRef(projetoColaborador + `/projeto${i}`), {
                    colaborador: null,
                    competencia: null,
                    nome: null,
                    numeroColaboradores: null,
                    numeroCompetencias: null,
                  });
                }
              );
            }
            dbSet(databaseRef(prj), {
              colaborador: null,
              competencia: null,
              nome: null,
              numeroColaboradores: null,
              numeroCompetencias: null,
            });
          }
        }
      }
    });
  });
}

function fazerLogout() {
  window.location.href = "./index.html";
}

let botaoLogout = document.getElementById("botaoLogout");
botaoLogout.addEventListener("click", fazerLogout);
