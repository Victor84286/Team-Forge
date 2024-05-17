
let checkerMode = 0;

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