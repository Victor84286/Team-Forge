import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  auth,
  databaseRef,
  get,
  child,
  dbRef,
  dbSet,
  database,
} from "./scriptGeral.js";

let colaboradorNum = 0;
let competenciaNum = 0;

function criaProjeto() {
  get(child(dbRef, `numeroProjetos`)).then((quantidadeProjetosBD) => {
    if (quantidadeProjetosBD.exists()) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          let quantidadeProjetos =
            quantidadeProjetosBD.val()["quantidadeProjetos"];

          let colaboradores = [];
          let competencias = [];

          let nome = document.getElementById("nomeProjeto").value;
          let emailKey = user.email.slice(0, user.email.indexOf("@"));

          for (let i = 1; i <= colaboradorNum; i++) {
            colaboradores.push(
              document.getElementById("colaborador" + i).value
            );
          }

          for (let i = 1; i <= competenciaNum; i++) {
            competencias.push(document.getElementById("competencia" + i).value);
          }

          dbSet(
            databaseRef(
              database,
              `projeto/${emailKey}/projeto${quantidadeProjetos}`
            ),
            {
              nome: nome,
              numeroColaboradores: colaboradorNum,
              numeroCompetencias: competenciaNum,
            }
          );
          // adiciona usuario a projeto
          for (let i = 0; i < colaboradorNum; i++) {
            dbSet(
              databaseRef(
                database,
                `projeto/${emailKey}/projeto${quantidadeProjetos}/colaborador/${i}`
              ),
              {
                nome: colaboradores[i],
              }
            );

            dbSet(
              databaseRef(
                database,
                `projeto/${colaboradores[i]}/projeto${quantidadeProjetos}`
              ),
              {
                nome: nome,
                numeroColaboradores: colaboradorNum,
                numeroCompetencias: competenciaNum,
              }
            );
            // adiciona usuario a projeto
            for (let j = 0; j < colaboradorNum; j++) {
              dbSet(
                databaseRef(
                  database,
                  `projeto/${colaboradores[i]}/projeto${quantidadeProjetos}/colaborador/${j}`
                ),
                {
                  nome: colaboradores[j],
                }
              );
            }
            // adiciona competencia a projeto
            for (let j = 0; j < competenciaNum; j++) {
              dbSet(
                databaseRef(
                  database,
                  `projeto/${colaboradores[i]}/projeto${quantidadeProjetos}/competencia/${j}`
                ),
                {
                  competencia: competencias[j],
                }
              );
            }
          }
          // adiciona competencia a projeto
          for (let i = 0; i < competenciaNum; i++) {
            dbSet(
              databaseRef(
                database,
                `projeto/${emailKey}/projeto${quantidadeProjetos}/competencia/${i}`
              ),
              {
                competencia: competencias[i],
              }
            );
          }

          quantidadeProjetos++;
          dbSet(databaseRef(database, "numeroProjetos"), {
            quantidadeProjetos: quantidadeProjetos,
          });

          window.location.href = "./home.html";
        } else {
          window.location.href = "/";
        }
      });
    }
  });
}

function adicionarColaborador() {
  colaboradorNum += 1;
  // Cria um novo elemento input
  let novoInput = document.createElement("input");
  novoInput.type = "text";
  novoInput.className = "colaborador";
  novoInput.id = "colaborador" + colaboradorNum;
  novoInput.placeholder = "Digite o nome do colaborador";

  // Obtém o elemento de referência
  let referencia = document.getElementById("adicionarColaborador");

  // Insere o novo input antes do elemento de referência
  referencia.parentNode.insertBefore(novoInput, referencia);
}

function adicionaCompetencia() {
  competenciaNum += 1;
  // Cria um novo elemento input
  let novoInput = document.createElement("input");
  novoInput.type = "text";
  novoInput.className = "competencia";
  novoInput.id = "competencia" + competenciaNum;
  novoInput.placeholder = "Digite uma competência";

  // Obtém o elemento de referência
  let referencia = document.getElementById("adicionarCompetencia");

  // Insere o novo input antes do elemento de referência
  referencia.parentNode.insertBefore(novoInput, referencia);
}

let botao_adicionar_competencia = document.getElementById(
  "adicionarCompetencia"
);
botao_adicionar_competencia.addEventListener("click", adicionaCompetencia);

let botao_adicionar_colaborador = document.getElementById(
  "adicionarColaborador"
);
botao_adicionar_colaborador.addEventListener("click", adicionarColaborador);

let botao_criar = document.getElementById("botaoCriar");
botao_criar.addEventListener("click", criaProjeto);


function fazerLogout() {
  window.location.href ="./index.html";
}


let botaoLogout = document.getElementById("botaoLogout");
botaoLogout.addEventListener('click', fazerLogout);