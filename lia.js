
(() => {
    "use strict";
  
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  
    // Menu responsivo
    const menuButton = $("#menuToggle") || $("#mobileMenuButton");
    const navigation = $("#navigation") || $("#mainNavigation");
  
    if (menuButton && navigation) {
      menuButton.addEventListener("click", () => {
        const opened = navigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(opened));
        menuButton.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
      });
  
      $$("#navigation a, #mainNavigation a").forEach(link => {
        link.addEventListener("click", () => {
          navigation.classList.remove("is-open");
          menuButton.setAttribute("aria-expanded", "false");
        });
      });
    }
  
    // Tema
    const themeButtons = ["themeToggle", "themeToggleAccessibility"]
      .map(id => document.getElementById(id)).filter(Boolean);
  
    function applyTheme(dark) {
      document.body.classList.toggle("dark-theme", dark);
      try { localStorage.setItem("lia_theme", dark ? "dark" : "light"); } catch {}
    }
  
    try { applyTheme(localStorage.getItem("lia_theme") === "dark"); } catch {}
  
    themeButtons.forEach(button => {
      button.addEventListener("click", () => {
        applyTheme(!document.body.classList.contains("dark-theme"));
      });
    });
  
    // Contraste
    const contrastButtons = ["contrastToggle", "contrastToggleSettings"]
      .map(id => document.getElementById(id)).filter(Boolean);
  
    function applyContrast(enabled) {
      document.body.classList.toggle("high-contrast", enabled);
      try { localStorage.setItem("lia_contrast", enabled ? "on" : "off"); } catch {}
    }
  
    try { applyContrast(localStorage.getItem("lia_contrast") === "on"); } catch {}
  
    contrastButtons.forEach(button => {
      button.addEventListener("click", () => {
        applyContrast(!document.body.classList.contains("high-contrast"));
      });
    });
  
    // Tamanho de texto
    function applyFont(size) {
      document.body.classList.remove("font-small", "font-large");
      if (size === "small") document.body.classList.add("font-small");
      if (size === "large") document.body.classList.add("font-large");
      try { localStorage.setItem("lia_font_size", size); } catch {}
    }
  
    try { applyFont(localStorage.getItem("lia_font_size") || "normal"); } catch {}
  
    const decrease = $("#fontDecrease");
    const increase = $("#fontIncrease");
    const reset = $("#fontReset") || $("#fontNormal");
  
    if (decrease) decrease.addEventListener("click", () => applyFont("small"));
    if (increase) increase.addEventListener("click", () => applyFont("large"));
    if (reset) reset.addEventListener("click", () => applyFont("normal"));
  
    // Painel de acessibilidade
    const panel = $("#accessibilityPanel");
    const overlay = $("#accessibilityOverlay");
    const openPanel = $("#openAccessibility");
    const closePanel = $("#closeAccessibility");
  
    function setPanel(open) {
      if (!panel) return;
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      if (overlay) {
        overlay.classList.toggle("is-visible", open);
        overlay.setAttribute("aria-hidden", String(!open));
      }
      if (openPanel) openPanel.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open && closePanel) closePanel.focus();
      if (!open && openPanel) openPanel.focus();
    }
  
    if (openPanel) openPanel.addEventListener("click", () => setPanel(true));
    if (closePanel) closePanel.addEventListener("click", () => setPanel(false));
    if (overlay) overlay.addEventListener("click", () => setPanel(false));
  
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && panel?.classList.contains("is-open")) {
        setPanel(false);
      }
    });
  
    // Leitura em voz alta
    const readButton = $("#readPage");
    const stopButton = $("#stopReading");
  
    if (readButton) {
      readButton.addEventListener("click", () => {
        if (!("speechSynthesis" in window)) {
          alert("A leitura em voz alta não está disponível neste navegador.");
          return;
        }
        speechSynthesis.cancel();
        const main = $("main") || document.body;
        const text = main.innerText.trim().slice(0, 12000);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.documentElement.lang || "pt-BR";
        speechSynthesis.speak(utterance);
      });
    }
  
    if (stopButton) {
      stopButton.addEventListener("click", () => {
        if ("speechSynthesis" in window) speechSynthesis.cancel();
      });
    }
  
    // Tradução básica de elementos explicitamente marcados.
    const dictionaries = {
      "pt-BR": {},
      en: {
        "Início": "Home", "Projeto": "Project", "Violências": "Violence",
        "Rede de apoio": "Support network", "Localização": "Location",
        "Conta": "Account", "Modo discreto": "Discreet mode",
        "Acessibilidade": "Accessibility", "Preciso de apoio": "I need support",
        "Fechar": "Close", "Acessibilidade": "Accessibility"
      },
      es: {
        "Início": "Inicio", "Projeto": "Proyecto", "Violências": "Violencias",
        "Rede de apoio": "Red de apoyo", "Localização": "Ubicación",
        "Conta": "Cuenta", "Modo discreto": "Modo discreto",
        "Acessibilidade": "Accesibilidad", "Preciso de apoio": "Necesito ayuda",
        "Fechar": "Cerrar"
      }
    };
  
    const originalText = new WeakMap();
    const originalPlaceholder = new WeakMap();
  
    $$("[data-i18n]").forEach(el => originalText.set(el, el.textContent));
    $$("[data-i18n-placeholder]").forEach(el => originalPlaceholder.set(el, el.getAttribute("placeholder")));
  
    function applyLanguage(language) {
      const dictionary = dictionaries[language] || dictionaries["pt-BR"];
  
      $$("[data-i18n]").forEach(el => {
        const original = originalText.get(el);
        if (original === undefined) return;
        el.textContent = dictionary[original] || original;
      });
  
      $$("[data-i18n-placeholder]").forEach(el => {
        const original = originalPlaceholder.get(el);
        if (original === undefined) return;
        el.setAttribute("placeholder", dictionary[original] || original);
      });
  
      document.documentElement.lang = language;
      try { localStorage.setItem("lia_language", language); } catch {}
    }
  
    const languageSelects = [$("#languageSelect"), $("#settingsLanguage")].filter(Boolean);
    let language = "pt-BR";
    try { language = localStorage.getItem("lia_language") || "pt-BR"; } catch {}
  
    languageSelects.forEach(select => {
      select.value = language;
      select.addEventListener("change", () => {
        applyLanguage(select.value);
        languageSelects.forEach(other => { other.value = select.value; });
      });
    });
  
    applyLanguage(language);
  
    // Geolocalização genérica para botões que usem os IDs esperados.
    const locationButton = $("#getLocation") || $("#findLocation") || $("#useMyLocation");
    const locationStatus = $("#locationStatus") || $("#locationStatusText");
  
    if (locationButton && locationStatus && !$("#coordinates")) {
      locationButton.addEventListener("click", () => {
        if (!navigator.geolocation) {
          locationStatus.textContent = "Seu navegador não oferece geolocalização.";
          return;
        }
        locationStatus.textContent = "Aguardando autorização...";
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          try {
            localStorage.setItem("lia_latitude", String(latitude));
            localStorage.setItem("lia_longitude", String(longitude));
          } catch {}
          locationStatus.textContent = "Localização obtida.";
          const map = $("#mapLink") || $("#openMap");
          if (map) {
            map.href = `https://www.google.com/maps/search/serviços+de+apoio/@${latitude},${longitude},14z`;
            map.hidden = false;
          }
        }, () => {
          locationStatus.textContent = "Não foi possível acessar a localização. Verifique a permissão do navegador.";
        });
      });
    }
  
    // Formulários marcados explicitamente para confirmação.
    $$("[data-confirm-submit]").forEach(form => {
      form.addEventListener("submit", event => {
        const message = form.getAttribute("data-confirm-submit") || "Deseja continuar?";
        if (!confirm(message)) event.preventDefault();
      });
    });
  })();
  