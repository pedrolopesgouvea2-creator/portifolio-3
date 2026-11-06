/* =========================================================
   PORTFÓLIO PEDRO LOPES GOUVEA — JavaScript da página inicial (aulas 1 a 5)
   aula 1 · a página fala: variáveis e template string
   aula 2 · a página responde: if e cliques
   aula 3 · organizando o código: funções e menu
   aula 4 · listas: as skills nascem de arrays
   aula 5 · os dados mandam: for, objetos e trocar de página

   Este arquivo é só da página inicial. As outras páginas têm
   o seu: contato.html → layout.js · projeto.html → layout.js.
   ========================================================= */

/* =========================================================
   PARTE 1 — AULA 1: a página fala
   ========================================================= */

const nome = "Pedro Lopes Gouvea";
const profissao = "Desenvolvedor iniciante";
const cidade = "Campo Mourão";
const anoAtual = 2026;
const anoNascimento = 2011;
const anoDeCurso = 2025;

const idade = anoAtual - anoNascimento; // 15 anos
const curso = anoAtual - anoDeCurso;

const titulo = `Oi, eu sou ${nome}`;
const bio = `tenho ${idade} anos, moro em ${cidade} e sou ${profissao}.`;

console.log(titulo);
console.log(bio);

// Escreve os dados na página inicial
const elHeroH1 = document.querySelector(".hero h1, .hero-nome");
if (elHeroH1) {
  elHeroH1.textContent = nome;
}

const elHeroH2 = document.querySelector(".hero h2, .hero-cargo");
if (elHeroH2) {
  elHeroH2.textContent = `${profissao} - ${cidade}`;
}

const elHeroP = document.querySelector(".hero p, .hero-bio");
if (elHeroP) {
  elHeroP.textContent = `${bio} Gosto de aprender na prática e criar projetos digitais.`;
}

const hora = new Date().getHours();

const elRodapeH5 = document.querySelector(".rodape h5, .rodape-autor");
if (elRodapeH5) {
  elRodapeH5.textContent = `Desenvolvido por ${nome}`;
}

const elRodapeH6 = document.querySelector(".rodape h6, .rodape-data");
if (elRodapeH6) {
  elRodapeH6.textContent = `Feito com HTML, CSS e JavaScript - ${hora}h`;
}


/* =========================================================
   PARTE 2 — AULA 2: a página responde (saudação por horário)
   ========================================================= */

let saudacao = "";

if (hora < 12) {
  saudacao = "Bom dia";
} else if (hora < 18) {
  saudacao = "Boa tarde";
} else {
  saudacao = "Boa noite";
}

if (elHeroH1) {
  elHeroH1.textContent = `${saudacao}! Eu sou ${nome}`;
}


/* =========================================================
   PARTE 3 — AULA 3: organizando o código (funções)
   ========================================================= */

function mostrarBoasVindas() {
  console.log("Bem-vindo ao meu portfólio pessoal!");
}

mostrarBoasVindas();

function escreverPagina(seletor, texto) {
  const elemento = document.querySelector(seletor);
  if (elemento) {
    elemento.textContent = texto;
  }
}

escreverPagina(".logo-texto", "Pedro.dev");
escreverPagina(".sobre-titulo", "Sobre Mim");


/* =========================================================
   PARTE 4 — AULA 4: listas (skills a partir de arrays)
   ========================================================= */

const skillsFront = ["HTML e CSS", "JavaScript", "Layout Responsivo"];
const skillsBack = ["Python", "Node.js básico", "Bancos de Dados"];

function montarLista(seletor, itens) {
  let html = "";

  for (const item of itens) {
    html = html + `<li>${item}</li>`;
  }

  const elemento = document.querySelector(seletor);
  if (elemento) {
    elemento.innerHTML = html;
  }
}

montarLista("#lista-front", skillsFront);
montarLista("#lista-back", skillsBack);


/* =========================================================
   PARTE 5 — AULA 5: os dados mandam (fichas e objetos)
   ========================================================= */

const pessoa = {
  nome: nome,
  cidade: cidade,
  idade: idade,
  email: "pedrolopesgouvea2@gmail.com",
  projetos: [
    "Nexus - Integrated Productivity Dashboard",
    "Easy Work"
  ],
  skills: {
    front: "HTML, CSS e JavaScript",
    back: "Python"
  }
};

console.log(pessoa);
console.log(`${pessoa.nome} mora em ${pessoa.cidade} e tem ${pessoa.idade} anos.`);


/* =========================================================
   AULA 5 (continuação): Projetos gerados a partir da lista
   Nexus e Easy Work adicionados com imagens e links
   ========================================================= */

const projetos = [
  {
    nome: "Nexus",
    descricao: "Integrated Productivity Dashboard — Painel de produtividade e organização pessoal.",
    tecnologias: "Google Sites, UI/UX, Produtividade",
    imagem: "img/nexus.png",
    link: "https://sites.google.com/d/1TFVEcwO84sdx4vBc-dJ_jH1lcKqoaWMQ/p/1CLN_noEz5YH3k5q7JZK9y8A5Cu_2kC80/edit?pli=1"
  },
  {
    nome: "Easy Work",
    descricao: "Plataforma web para facilidades e serviços de trabalho de forma rápida e organizada.",
    tecnologias: "HTML, CSS, JavaScript, Vercel",
    imagem: "img/easywork.png",
    link: "https://easywork-site.vercel.app"
  }
];

function montarProjetos(lista) {
  let html = "";

  for (const projeto of lista) {
    const tag = projeto.nome === "Nexus" ? "Google Sites" : "Vercel";
    html = html + `
      <article class="cartao-projeto cartao">
        <div class="capa-projeto">
          <img src="${projeto.imagem}" alt="Imagem do projeto ${projeto.nome}" class="foto-cartao">
          <span class="etiqueta-tag">${tag}</span>
        </div>
        <div class="conteudo-projeto">
          <h3>${projeto.nome}</h3>
          <p>${projeto.descricao}</p>
          <h4>Tecnologias</h4>
          <p class="projeto-techs">${projeto.tecnologias}</p>
          <div class="links-projeto">
            <a class="botao" href="${projeto.link}" target="_blank" rel="noopener noreferrer">
              <span>Ver Projeto</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  const elemento = document.querySelector("#lista-projetos");
  if (elemento) {
    elemento.innerHTML = html;
  }
}

montarProjetos(projetos);
