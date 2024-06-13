

function fazerLogout() {
  window.location.href ="./index.html";
}


let botaoLogout = document.getElementById("botaoLogout");
botaoLogout.addEventListener('click', fazerLogout);