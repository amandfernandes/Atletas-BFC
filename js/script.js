import { hex_sha256 } from "./sha256.mjs";

const target = "321e390ae563bdb2e6a87512838cfb33b29656a9757d063cbce54d9d23c68be2";
const increment ="Atleta-BFC";
const message = document.getElementById('Mensagem');

document.getElementById("Enviar").onclick = () => {
    const permission = document.getElementById("Senha").value;
    if (hex_sha256(permission + increment) === target){
        message.innerHTML = "Bem-vindo!";
        sessionStorage.setItem("Logged", "1");
        window.location.href = "Home/Home.html";
    } else {
        message.innerHTML = "SENHA INCORRETA!"
    }
}

document.getElementById("Sign-out").onclick = () => {
    sessionStorage.removeItem("Logged");
}