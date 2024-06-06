import { auth, onAuthStateChanged, child, get, dbRef } from "./scriptGeral.js";

let tipo;
let quantidadeProjetos;
get(child(dbRef, `numeroProjetos`)).then((quantidade) => {
  if(quantidade.exists()) {
      quantidadeProjetos = parseInt(quantidade.val()["quantidadeProjetos"]);
    }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    get(child(dbRef, `user/${user.email.slice(0, user.email.indexOf("@"))}`)).then((usuario) => {
      if (usuario.exists()) {
        tipo = parseInt(usuario.val()['tipoUser']);
      }
    });
    get(child(dbRef, `projeto/${user.email.slice(0, user.email.indexOf("@"))}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if(tipo === 1){
            let botao_a = document.createElement("a");
            botao_a.className = "containerNovoProjeto";
            botao_a.href = "criarProjeto.html";

            let escritaBotao = document.createElement("p");
            escritaBotao.className = "botaoNvovoProjeto";
            escritaBotao.textContent  = "+";

            // Obtém o elemento de referência
            let referencia = document.getElementById("containerProjetos");

            // Insere o novo input antes do elemento de referência
            referencia.parentNode.insertBefore(botao_a, referencia);
            botao_a.appendChild(escritaBotao);
            console.log(botao_a);
          }
          let containerProjetos = document.getElementById("containerProjetos");
          let referenciaProjetos = snapshot.val();
          for (let i = 0; i < quantidadeProjetos; i++) {
            let projeto = referenciaProjetos["projeto0"];
            console.log(projeto["colaborador"][0]["nome"])
            // Cria um novo elemento input
            let containerCard = document.createElement("div");
            containerCard.className = "containerCard";
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
              colaboradorNome.innerHTML = projeto["competencia"][j]["competencia"];
              containerCard.appendChild(colaboradorNome);
            }
            containerProjetos.appendChild(containerCard);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else window.location.href = '/Team-Forge/';
});
