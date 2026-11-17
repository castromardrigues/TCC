
(() => {
  "use strict";

  const arquivo = window.location.pathname.split("/").pop().toLowerCase();

  // O modo discreto possui navegação própria e não deve receber este cabeçalho.
  if (arquivo === "modo-discreto.html" || arquivo === "discreto.html") return;

  const paginaInicial = arquivo === "" || arquivo === "index.html";

  function adicionarEstilos() {
    if (document.getElementById("lia-cabecalho-global-css")) return;

    const style = document.createElement("style");
    style.id = "lia-cabecalho-global-css";

    style.textContent = `
      .lia-cabecalho-global {
        position: relative;
        z-index: 100;
        width: 100%;
        min-height: 76px;
        box-sizing: border-box;
        padding: 12px 4%;
        display: grid;
        grid-template-columns: minmax(180px, 1fr) auto;
        grid-template-rows: auto;
        align-items: center;
        column-gap: 24px;
        row-gap: 12px;
        background: #fffafd;
        border-bottom: 1px solid #eee2ef;
      }

      .lia-marca {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-self: start;
        gap: 2px;
        min-width: 0;
      }

      .lia-logo {
        color: #805d91 !important;
        font-family: "Playfair Display", Georgia, serif;
        font-size: 2rem;
        font-weight: 400 !important;
        line-height: 1.05;
        letter-spacing: 1px;
        text-decoration: none !important;
      }

      .lia-descricao {
        color: #897b8d;
        font-family: "DM Sans", Arial, sans-serif;
        font-size: .72rem;
        font-weight: 400;
        letter-spacing: .2px;
      }

      .lia-controles-topo {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 10px;
        justify-self: end;
        margin: 0;
      }

      .lia-voltar-pagina {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        box-sizing: border-box;
        padding: 8px 16px;
        border: 1px solid #e5d7e8;
        border-radius: 30px;
        background: #fff;
        color: #76558b;
        font-family: "DM Sans", Arial, sans-serif;
        font-size: .88rem;
        font-weight: 400;
        cursor: pointer;
        transition: background .2s ease;
      }

      .lia-voltar-pagina:hover {
        background: #f5edf7;
      }

      .lia-navegacao {
        grid-column: 1 / -1;
        grid-row: 2;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px 30px;
        padding: 8px 0 2px;
      }

      .lia-navegacao a {
        color: #594b60;
        font-family: "DM Sans", Arial, sans-serif;
        font-size: .92rem;
        font-weight: 400;
        text-decoration: none;
      }

      .lia-navegacao a:hover {
        color: #956eaa;
      }

      @media (max-width: 650px) {
        .lia-cabecalho-global {
          grid-template-columns: minmax(0, 1fr) auto;
          column-gap: 10px;
          padding: 12px 16px;
        }

        .lia-logo {
          font-size: 1.8rem;
        }

        .lia-descricao {
          font-size: .62rem;
        }

        .lia-controles-topo {
          gap: 7px;
        }

        .lia-voltar-pagina {
          min-height: 36px;
          padding: 7px 10px;
          font-size: .8rem;
        }

        .lia-navegacao {
          justify-content: flex-start;
          gap: 12px 18px;
        }
      }

      @media (max-width: 380px) {
        .lia-cabecalho-global {
          grid-template-columns: 1fr;
          row-gap: 10px;
        }

        .lia-marca {
          grid-column: 1;
          grid-row: 1;
        }

        .lia-controles-topo {
          grid-column: 1;
          grid-row: 2;
          justify-self: start;
        }

        .lia-navegacao {
          grid-row: 3;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function prepararNavegacao() {
    let header = document.querySelector("header");

    if (!header) {
      header = document.createElement("header");
      document.body.prepend(header);
    }

    header.classList.add("lia-cabecalho-global");

    // Marca e identidade da LIA.
    let marca = header.querySelector(".lia-marca");

    if (!marca) {
      marca = document.createElement("div");
      marca.className = "lia-marca";
      header.prepend(marca);
    }

    let logo = marca.querySelector(".lia-logo");

    if (!logo) {
      logo = header.querySelector(".lia-logo") ||
        header.querySelector('a[href="index.html"], a[href="./index.html"]');
    }

    if (!logo) {
      logo = document.createElement("a");
      logo.textContent = "LIA";
    }

    logo.href = "index.html";
    logo.classList.add("lia-logo");
    logo.setAttribute("aria-label", "LIA - Página inicial");

    if (!marca.contains(logo)) marca.prepend(logo);

    let descricao = marca.querySelector(".lia-descricao");

    if (!descricao) {
      descricao = document.createElement("span");
      descricao.className = "lia-descricao";
      descricao.textContent = "Local de Informação e Apoio";
      marca.appendChild(descricao);
    }

    // Área única dos controles.
    let controles = header.querySelector(".lia-controles-topo");

    if (!controles) {
      controles = document.createElement("div");
      controles.className = "lia-controles-topo";
      header.appendChild(controles);
    }

    // Remove botões antigos de voltar para evitar duplicações.
    const botoesVoltar = header.querySelectorAll(
      ".lia-voltar-pagina, #lia-voltar, .btn-voltar"
    );

    let voltar = controles.querySelector(".lia-voltar-pagina");

    botoesVoltar.forEach((botao) => {
      if (botao !== voltar) botao.remove();
    });

    if (!paginaInicial) {
      if (!voltar) {
        voltar = document.createElement("button");
        voltar.type = "button";
        voltar.className = "lia-voltar-pagina";
        voltar.textContent = "← Voltar";
      }

      // Registra o evento uma única vez.
      if (voltar.dataset.eventoRegistrado !== "true") {
        voltar.addEventListener("click", () => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "index.html";
          }
        });

        voltar.dataset.eventoRegistrado = "true";
      }

      if (voltar.parentElement !== controles) {
        controles.prepend(voltar);
      }
    } else if (voltar) {
      voltar.remove();
    }

    // Menu principal apenas na página inicial.
    const seletoresMenu = [
      'nav[aria-label="Navegação principal"]',
      "nav.lia-menu",
      "nav.lia-navegacao",
      "#mainNav"
    ].join(",");

    let menus = Array.from(header.querySelectorAll(seletoresMenu));

    if (paginaInicial) {
      let menu = menus.shift();

      menus.forEach((item) => item.remove());

      if (!menu) {
        menu = document.createElement("nav");
        menu.className = "lia-navegacao";
        menu.setAttribute("aria-label", "Navegação principal");

        menu.innerHTML = `
          <a href="index.html">Início</a>
          <a href="historia.html">História da LIA</a>
          <a href="projeto.html">Projeto</a>
          <a href="violencias.html">Tipos de violência</a>
          <a href="noticias.html">Notícias</a>
          <a href="apoio.html">Preciso de apoio</a>
        `;
      }

      // Garante que o menu existente também receba os estilos.
      menu.classList.add("lia-navegacao");
      menu.setAttribute("aria-label", "Navegação principal");

      if (!header.contains(menu)) {
        header.appendChild(menu);
      }
    } else {
      menus.forEach((menu) => menu.remove());
    }

    adicionarEstilos();
    // ATUALIZAÇÃO 16/11 - carrega Entrar/Perfil/Sair nas páginas internas.
    if (!document.querySelector('script[data-lia-auth-carregado]')) {
      const script = document.createElement("script");
      script.src = "auth-demo.js";
      script.dataset.liaAuthCarregado = "";
      document.body.appendChild(script);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepararNavegacao);
  } else {
    prepararNavegacao();
  }
})();
