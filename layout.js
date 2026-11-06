/* =========================================================
   PORTFÓLIO PEDRO LOPES GOUVEA — JavaScript Geral (layout.js)
   Controla os recursos compartilhados entre as páginas:
   - Modo escuro / claro (com persistência via localStorage)
   - Menu do celular (hambúrguer)
   - Cópia do e-mail com aviso dinâmico
   - Validação do formulário de contato
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     1. MODO ESCURO / CLARO
     O visual padrão do site é preto-azulado.
     A classe .modo-claro ativa o tema claro alternativo.
     ========================================================= */
  const botaoTema = document.querySelector(".botao-tema");
  const corpo = document.body;
  const html = document.documentElement;

  function aplicarTema(ehClaro) {
    if (ehClaro) {
      corpo.classList.add("modo-claro");
      html.classList.add("modo-claro");
      if (botaoTema) {
        botaoTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
        botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        botaoTema.setAttribute("title", "Ativar modo escuro");
      }
    } else {
      corpo.classList.remove("modo-claro");
      html.classList.remove("modo-claro");
      if (botaoTema) {
        botaoTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
        botaoTema.setAttribute("aria-label", "Ativar modo claro");
        botaoTema.setAttribute("title", "Ativar modo claro");
      }
    }
  }

  // Verifica preferência anterior salva
  const temaSalvo = localStorage.getItem("pedro_tema");
  if (temaSalvo === "claro") {
    aplicarTema(true);
  } else {
    aplicarTema(false);
  }

  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      const atualmenteClaro = corpo.classList.contains("modo-claro");
      const novoTemaClaro = !atualmenteClaro;
      aplicarTema(novoTemaClaro);
      localStorage.setItem("pedro_tema", novoTemaClaro ? "claro" : "escuro");
    });
  }


  /* =========================================================
     2. MENU DO CELULAR (HAMBÚRGUER)
     ========================================================= */
  const botaoMenu = document.querySelector(".botao-menu");
  const menu = document.querySelector(".topo nav");

  function abrirMenu() {
    if (!menu || !botaoMenu) return;
    menu.classList.add("aberto");
    botaoMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    botaoMenu.setAttribute("aria-expanded", "true");
  }

  function fecharMenu() {
    if (!menu || !botaoMenu) return;
    menu.classList.remove("aberto");
    botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    botaoMenu.setAttribute("aria-expanded", "false");
  }

  function alternarMenu() {
    if (!menu) return;
    if (menu.classList.contains("aberto")) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", alternarMenu);

    // Fecha o menu ao clicar em qualquer link
    const linksMenu = menu.querySelectorAll("a");
    linksMenu.forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });
  }


  /* =========================================================
     3. CÓPIA DE E-MAIL COM FEEDBACK VISUAL
     ========================================================= */
  const botaoCopiar = document.querySelector("#botao-copiar-email");
  const textoEmail = document.querySelector("#texto-email");
  const avisoCopiado = document.querySelector("#aviso-copiado");

  if (botaoCopiar && textoEmail) {
    botaoCopiar.addEventListener("click", function () {
      const email = textoEmail.textContent.trim();

      function mostrarFeedbackCopia() {
        if (!avisoCopiado) return;
        avisoCopiado.classList.add("visivel");
        setTimeout(function () {
          avisoCopiado.classList.remove("visivel");
        }, 2500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(mostrarFeedbackCopia)
          .catch(function () {
            // Fallback usando input temporário
            copiarFallback(email);
            mostrarFeedbackCopia();
          });
      } else {
        copiarFallback(email);
        mostrarFeedbackCopia();
      }
    });
  }

  function copiarFallback(texto) {
    const inputTemp = document.createElement("input");
    inputTemp.value = texto;
    document.body.appendChild(inputTemp);
    inputTemp.select();
    document.execCommand("copy");
    document.body.removeChild(inputTemp);
  }


  /* =========================================================
     4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     ========================================================= */
  const formulario = document.querySelector("#formulario-contato, #form-contato");
  const campoNome = document.querySelector("#nome");
  const campoEmail = document.querySelector("#email");
  const campoAssunto = document.querySelector("#assunto");
  const campoMensagem = document.querySelector("#mensagem");
  const aviso = document.querySelector("#aviso-formulario, #aviso");

  function validarNome(nome) {
    if (nome === "") {
      return "Digite seu nome.";
    } else if (nome.length < 3) {
      return "O nome precisa ter pelo menos 3 letras.";
    }
    return "";
  }

  function validarEmail(email) {
    if (email === "") {
      return "Digite o seu e-mail.";
    } else if (!email.includes("@")) {
      return "O e-mail precisa conter o símbolo @.";
    } else if (!email.includes(".")) {
      return "Insira um e-mail válido com domínio (ex: @gmail.com).";
    }
    return "";
  }

  function validarAssunto(assunto) {
    if (assunto === "") {
      return "Escolha ou digite um assunto.";
    }
    return "";
  }

  function validarMensagem(mensagem) {
    if (mensagem === "") {
      return "Escreva a sua mensagem.";
    } else if (mensagem.length < 10) {
      return "A mensagem precisa ter pelo menos 10 letras.";
    }
    return "";
  }

  function mostrarAviso(texto, tipo) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.classList.remove("aviso-erro", "aviso-sucesso", "erro", "certo");

    if (tipo === "erro") {
      aviso.classList.add("aviso-erro", "erro");
    } else {
      aviso.classList.add("aviso-sucesso", "certo");
    }
    aviso.classList.add("visivel");
  }

  function enviarMensagem(evento) {
    evento.preventDefault();

    const nome = campoNome ? campoNome.value.trim() : "";
    const email = campoEmail ? campoEmail.value.trim() : "";
    const assunto = campoAssunto ? campoAssunto.value.trim() : "";
    const mensagem = campoMensagem ? campoMensagem.value.trim() : "";

    const erroNome = validarNome(nome);
    const erroEmail = validarEmail(email);
    const erroAssunto = validarAssunto(assunto);
    const erroMensagem = validarMensagem(mensagem);

    if (erroNome !== "") {
      mostrarAviso(erroNome, "erro");
      if (campoNome) campoNome.focus();
    } else if (erroEmail !== "") {
      mostrarAviso(erroEmail, "erro");
      if (campoEmail) campoEmail.focus();
    } else if (erroAssunto !== "") {
      mostrarAviso(erroAssunto, "erro");
      if (campoAssunto) campoAssunto.focus();
    } else if (erroMensagem !== "") {
      mostrarAviso(erroMensagem, "erro");
      if (campoMensagem) campoMensagem.focus();
    } else {
      mostrarAviso(`Mensagem enviada com sucesso! Valeu, ${nome}. Entrarei em contato em breve.`, "certo");
      if (formulario) formulario.reset();
    }
  }

  if (formulario) {
    formulario.addEventListener("submit", enviarMensagem);
  }

});
