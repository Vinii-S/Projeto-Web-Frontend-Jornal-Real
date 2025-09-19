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
        window.history.pushState({ path: fetchUrl }, "", url);
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar:", err);
      if (document.querySelector(".main-conteudo")) {
        document.querySelector(".main-conteudo").innerHTML =
          "<h1>Erro 404: Página não encontrada.</h1>";
      }
    });
}
//RODA O RELÓGIO 
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// Procura os elementos principais do SPA
const mainContentArea = document.querySelector(".main-conteudo");
const menuToggleButton = document.getElementById("menu-toggle");

// Animação do menu
if (mainContentArea && menuToggleButton) {
  
  // Animação do menu
  menuToggleButton.addEventListener("click", function () {
    document.querySelector(".menu-lateral").classList.toggle("shrink");
  });

  // Carrega o conteúdo inicial (home)
  loadContent(window.location.pathname, false);
  // Garante que o estado inicial (home) esteja no histórico
  window.history.replaceState({ path: "/componentes/home.html" }, "", window.location.pathname);


  // Listener para TODOS os links <a>
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");

    // Se não for um link, ou for externo, deixa o navegador agir
    if (
      !link ||
      link.target === "_blank" ||
      !link.href.startsWith(window.location.origin)
    ) {
      return;
    }

    const url = link.getAttribute("href");

    // Se for link de login/cadastro, deixa o navegador agir (recarregar a pág)
    if (url.includes("login.html") || url.includes("cadastro.html")) {
      return;
    }

    // Se for qualquer outro link, previne o recarregamento
    e.preventDefault();
    loadContent(url, true); // true para adicionar ao histórico
  });

  // ADICIONA O LISTENER DO "VOLTAR" (só na página principal)
  window.addEventListener("popstate", (e) => {
    // Se o estado (e.state) existir (o usuário clicou em algo)...
    if (e.state && e.state.path) {
        // Carrega o componente salvo no 'path' (ex: /componentes/home.html)
        loadContent(e.state.path, false);
    } else {
        // Se for o estado inicial (ex: F5 na página de notícia)
        loadContent(location.pathname, false);
    }
  });
}
