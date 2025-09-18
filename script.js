
function atualizarRelogio() {
  // 1. Pega a data e hora atual do computador
  const agora = new Date();

  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = String(agora.getFullYear()).slice(-2);
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const horaFormatada = `${horas}:${minutos}`;
  const dataHoraFinal = `${horaFormatada} ${dataFormatada}`;
  const elementoRelogio = document.getElementById("datahora");

  if (elementoRelogio) {
    elementoRelogio.textContent = dataHoraFinal;
  }
}

// --- FUNÇÃO DE CARREGAR CONTEÚDO ---
function loadContent(url, pushHistory = true) {
  let fetchUrl = url;

  // Se a URL for a página inicial...
  if (
    url.endsWith("index.html") ||
    url === "/" ||
    url === "/Projeto-Web-Frontend-Jornal-Real/"
  ) {
    fetchUrl = "/componentes/home.html";
  }

  // Busca o conteúdo
  fetch(fetchUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Página não encontrada: " + fetchUrl);
      return res.text();
    })
    .then((html) => {
      document.querySelector(".main-conteudo").innerHTML = html;
      if (pushHistory) {
        window.history.pushState({ path: url }, "", url);
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar:", err);
      document.querySelector(".main-conteudo").innerHTML =
        "<h1>Erro 404: Página não encontrada.</h1>";
    });
}



// Animação do menu
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector(".menu-lateral").classList.toggle("shrink");
});

//Carrega o conteúdo inicial
loadContent(window.location.pathname, false);

//Listener para TODOS os links <a>
document.addEventListener("click", function (e) {
  // Pega o <a> mais próximo do clique
  const link = e.target.closest("a");

  // Se não for um link, ou for um link externo (...) deixa o navegador agir
  if (
    !link ||
    link.target === "_blank" ||
    !link.href.startsWith(window.location.origin)
  ) {
    return;
  }

  // Pega a URL
  const url = link.getAttribute("href");

  // Se o link for para a página de login (...) deixa o navegador redirecionar.
  if (url.includes("login.html") || url.includes("cadastro.html")) {
    return;
  }

  e.preventDefault();
  loadContent(url, true); // true para adicionar ao histórico
});

//RODA O RELÓGIO 
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

//ADICIONA O LISTENER DO "VOLTAR" 
window.addEventListener("popstate", (e) => {
  // Carrega o conteúdo da URL atual (que o navegador acabou de mudar)
  // O 'false' é para não criar uma nova entrada no histórico
  loadContent(location.pathname, false);
});
