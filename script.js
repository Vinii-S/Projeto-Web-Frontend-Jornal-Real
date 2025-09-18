// Cria animação de encolher/expandir o menu lateral
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.querySelector('.menu-lateral').classList.toggle('shrink');
});

// Carrega o conteúdo das páginas sem recarregar a página inteira
document.querySelectorAll('.menu-itens a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        fetch(url)
            .then(res => res.text())
            .then(html => {
                document.querySelector('.main-conteudo').innerHTML = html;
                window.history.pushState({}, '', url);
            });
    });
});

// Permite navegação pelo botão voltar/avançar do navegador
window.addEventListener('popstate', () => {
    fetch(location.pathname)
        .then(res => res.text())
        .then(html => {
            document.querySelector('.main-conteudo').innerHTML = html;
        });
});

// Carrega o conteúdo inicial se estiver na index.html
if (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === '/Projeto-Web-Frontend-Jornal-Real/'
) {
    fetch('/componentes/home.html')
        .then(res => res.text())
        .then(html => {
            document.querySelector('.main-conteudo').innerHTML = html;
        });
}
// Carrega notícias e reclamações dentro do main quando clicadas
document.addEventListener('click', function (e) {
    const link = e.target.closest('a'); // pega o <a> mais próximo do clique
    if (!link) return;

    const url = link.getAttribute('href');

    // Garante que só trate links internos das notícias OU reclamações
    if (url && (url.includes('/componentes/noticias/') || url.includes('/componentes/reclamacoes.html'))) {
        e.preventDefault();
        fetch(url)
            .then(res => res.text())
            .then(html => {
                document.querySelector('.main-conteudo').innerHTML = html;
                window.history.pushState({}, '', url);
            });
    }
});

