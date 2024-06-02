import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth, databaseRef, dbSet, database, createUserWithEmailAndPassword } from './scriptGeral.js';

let colaboradorNum = 0;
let competenciaNum = 0;

function criaProjeto () {

    onAuthStateChanged(auth, (user) => {
        if (user){
            let colaboradores = [];
            let competencias = [];

            let nome = document.getElementById("nomeProjeto").value;
            let emailKey = user.email.slice(0, user.email.indexOf("."));


            for (let i = 1; i<=colaboradorNum; i++){
                console.log(document.getElementById("colaborador"+i).value);
                colaboradores.push(document.getElementById("colaborador"+i).value);
            }

            dbSet(databaseRef(database, "projeto/" + emailKey + "/" + nome + "/numColaboradores"), {
                numero: colaboradorNum
            });

            dbSet(databaseRef(database, "projeto/" + emailKey + "/" + nome + "/numCompetencias"), {
                numero: competenciaNum
            });
            // adiciona usuario a projeto
            for (let i = 0; i<colaboradorNum; i++){
                dbSet(databaseRef(database, "projeto/" + emailKey + "/" + nome + "/colaborador/" + i), {
                    nome: colaboradores[i]
                });
            }

            for (let i = 1; i<=competenciaNum; i++){
                competencias.push(document.getElementById("competencia"+i).value);
            }
            // adiciona competencia a projeto
            for (let i = 0; i<competenciaNum; i++){
                dbSet(databaseRef(database, "projeto/" + emailKey + "/" + nome + "/competencia/" + i), {
                    competencia: competencias[i]
                });
            }

        } else {
          document.getElementById('info').innerHTML = 'saiu';
        }
    });

}

function adicionarColaborador () {
    colaboradorNum+=1;
    // Cria um novo elemento input
    let novoInput = document.createElement("input");
    novoInput.type = "text";
    novoInput.className = "colaborador";
    novoInput.id = "colaborador"+colaboradorNum;
    novoInput.placeholder = "Digite o nome do colaborador";

    // Obtém o elemento de referência
    let referencia = document.getElementById("adicionarColaborador");

    // Insere o novo input antes do elemento de referência
    referencia.parentNode.insertBefore(novoInput, referencia);
}

function adicionaCompetencia () {
    competenciaNum+=1;
    // Cria um novo elemento input
    let novoInput = document.createElement("input");
    novoInput.type = "text";
    novoInput.className = "competencia";
    novoInput.id = "competencia"+competenciaNum;
    novoInput.placeholder = "Digite uma competência";

    // Obtém o elemento de referência
    let referencia = document.getElementById("adicionarCompetencia");

    // Insere o novo input antes do elemento de referência
    referencia.parentNode.insertBefore(novoInput, referencia);
}

let botao_adicionar_competencia = document.getElementById("adicionarCompetencia");
botao_adicionar_competencia.addEventListener('click', adicionaCompetencia);

let botao_adicionar_colaborador = document.getElementById("adicionarColaborador");
botao_adicionar_colaborador.addEventListener('click', adicionarColaborador);

let botao_criar = document.getElementById("botaoCriar");
botao_criar.addEventListener('click', criaProjeto);