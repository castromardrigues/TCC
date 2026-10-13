
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const STORAGE = {
        theme: "lia_theme",
        contrast: "lia_contrast",
        fontSize: "lia_font_size",
        language: "lia_language",
        securityWord: "lia_security_word",
        latitude: "lia_latitude",
        longitude: "lia_longitude"
    };

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const body = document.body;
    const root = document.documentElement;

    /* =====================================================
       TEMA CLARO / ESCURO
    ===================================================== */

    function applyTheme(theme) {
        const isDark = theme === "dark";

        body.classList.toggle("dark", isDark);
        body.classList.toggle("dark-mode", isDark);

        localStorage.setItem(STORAGE.theme, isDark ? "dark" : "light");

        const icon = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        ["#themeToggle", "#themeToggleAccessibility"].forEach(selector => {
            const button = $(selector);
            if (!button) return;

            if (button.querySelector("i")) {
                button.querySelector("i").outerHTML = icon;
            } else {
                button.innerHTML = icon;
            }

            button.setAttribute(
                "aria-label",
                isDark ? "Ativar modo claro" : "Ativar modo escuro"
            );
        });
    }

    function toggleTheme() {
        const current = localStorage.getItem(STORAGE.theme) || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    }

    $("#themeToggle")?.addEventListener("click", toggleTheme);
    $("#themeToggleAccessibility")?.addEventListener("click", toggleTheme);

    applyTheme(localStorage.getItem(STORAGE.theme) || "light");

    /* =====================================================
       CONTRASTE
    ===================================================== */

    function applyContrast(enabled) {
        body.classList.toggle("high-contrast", enabled);
        body.classList.toggle("contrast-mode", enabled);

        localStorage.setItem(STORAGE.contrast, enabled ? "on" : "off");

        const button = $("#contrastToggle");
        if (button) {
            button.setAttribute("aria-pressed", String(enabled));
        }
    }

    $("#contrastToggle")?.addEventListener("click", () => {
        applyContrast(!body.classList.contains("high-contrast"));
    });

    applyContrast(localStorage.getItem(STORAGE.contrast) === "on");

    /* =====================================================
       TAMANHO DA FONTE
    ===================================================== */

    const fontLevels = [14, 15, 16, 17, 18, 19, 20];
    let fontIndex = Number(localStorage.getItem(STORAGE.fontSize));

    if (!Number.isInteger(fontIndex) || fontIndex < 0 || fontIndex >= fontLevels.length) {
        fontIndex = 2;
    }

    function applyFont() {
        const size = fontLevels[fontIndex];

        root.style.setProperty("--lia-font-scale", String(size / 16));
        root.style.fontSize = `${size}px`;

        localStorage.setItem(STORAGE.fontSize, String(fontIndex));
    }

    function changeFont(direction) {
        fontIndex = Math.max(0, Math.min(fontLevels.length - 1, fontIndex + direction));
        applyFont();
    }

    $("#fontDecrease")?.addEventListener("click", () => changeFont(-1));
    $("#fontIncrease")?.addEventListener("click", () => changeFont(1));

    // O index.html atual utiliza fontReset.
    $("#fontReset")?.addEventListener("click", () => {
        fontIndex = 2;
        applyFont();
    });

    // Compatibilidade com páginas que utilizam fontNormal.
    $("#fontNormal")?.addEventListener("click", () => {
        fontIndex = 2;
        applyFont();
    });

    applyFont();

    /* =====================================================
       PAINEL DE ACESSIBILIDADE
    ===================================================== */

    const panel = $("#accessibilityPanel");
    const overlay = $("#accessibilityOverlay");

    function openAccessibility() {
        if (!panel) return;

        panel.classList.add("open", "active");
        overlay?.classList.add("open", "active");

        panel.setAttribute("aria-hidden", "false");
        overlay?.setAttribute("aria-hidden", "false");

        $("#openAccessibility")?.setAttribute("aria-expanded", "true");
    }

    function closeAccessibility() {
        panel?.classList.remove("open", "active");
        overlay?.classList.remove("open", "active");

        panel?.setAttribute("aria-hidden", "true");
        overlay?.setAttribute("aria-hidden", "true");

        $("#openAccessibility")?.setAttribute("aria-expanded", "false");
    }

    $("#openAccessibility")?.addEventListener("click", openAccessibility);
    $("#closeAccessibility")?.addEventListener("click", closeAccessibility);
    overlay?.addEventListener("click", closeAccessibility);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeAccessibility();

        if (event.altKey && event.key.toLowerCase() === "a") {
            event.preventDefault();
            openAccessibility();
        }
    });

    /* =====================================================
       MENU RESPONSIVO
       Compatível com index.html atual e versões anteriores.
    ===================================================== */

    const menuButton = $("#menuToggle") || $("#mobileMenuButton");
    const navigation = $("#navigation") || $("#mainNavigation");

    function closeMobileMenu() {
        navigation?.classList.remove("open", "active");
        menuButton?.classList.remove("active");

        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Abrir menu");
    }

    menuButton?.addEventListener("click", () => {
        if (!navigation) return;

        const isOpen = !navigation.classList.contains("open");

        navigation.classList.toggle("open", isOpen);
        navigation.classList.toggle("active", isOpen);
        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navigation?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMobileMenu();
    });

    /* =====================================================
       MODO DISCRETO
       A navegação abre a página de agenda neutra.
    ===================================================== */

    function enterDiscreetMode() {
        window.location.href = "discreto.html";
    }

    $("#discreetMode")?.addEventListener("click", enterDiscreetMode);

    $$(".enter-discreet-mode").forEach(button => {
        button.addEventListener("click", enterDiscreetMode);
    });

    /* =====================================================
       LEITURA EM VOZ ALTA
    ===================================================== */

    let isReading = false;

    function stopReading() {
        isReading = false;

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }

    function readPage() {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não oferece leitura em voz alta.");
            return;
        }

        stopReading();

        const clone = document.body.cloneNode(true);

        clone.querySelectorAll(
            "script, style, button, input, textarea, select, svg, " +
            "#accessibilityPanel, #accessibilityOverlay"
        ).forEach(element => element.remove());

        const text = clone.innerText.replace(/\s+/g, " ").trim();

        if (!text) return;

        const language = localStorage.getItem(STORAGE.language) || "pt-BR";
        const locale = language === "en"
            ? "en-US"
            : language === "es"
                ? "es-ES"
                : "pt-BR";

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = locale;
        utterance.rate = 0.95;

        utterance.onstart = () => { isReading = true; };
        utterance.onend = () => { isReading = false; };
        utterance.onerror = () => { isReading = false; };

        window.speechSynthesis.speak(utterance);
    }

    $("#readPage")?.addEventListener("click", readPage);
    $("#stopReading")?.addEventListener("click", stopReading);

    /* =====================================================
       IDIOMA
       Importante: a tradução completa precisa de data-i18n
       nos textos de cada página. Não substituímos frases
       automaticamente, pois isso destrói textos e formulários.
    ===================================================== */

    const dictionaries = {
        "pt-BR": {
            home: "Início",
            project: "Projeto",
            violence: "Violências",
            support: "Rede de apoio",
            location: "Localização",
            account: "Conta",
            accessibility: "Acessibilidade",
            discreet: "Modo discreto",
            emergency: "Emergência",
            diary: "Diário",
            settings: "Configurações",
            trustedPeople: "Pessoas confiáveis",
            securityWord: "Palavra de segurança",
            save: "Salvar",
            cancel: "Cancelar"
        },
        en: {
            home: "Home",
            project: "Project",
            violence: "Violence",
            support: "Support network",
            location: "Location",
            account: "Account",
            accessibility: "Accessibility",
            discreet: "Discreet mode",
            emergency: "Emergency",
            diary: "Diary",
            settings: "Settings",
            trustedPeople: "Trusted people",
            securityWord: "Safety word",
            save: "Save",
            cancel: "Cancel"
        },
        es: {
            home: "Inicio",
            project: "Proyecto",
            violence: "Violencias",
            support: "Red de apoyo",
            location: "Ubicación",
            account: "Cuenta",
            accessibility: "Accesibilidad",
            discreet: "Modo discreto",
            emergency: "Emergencia",
            diary: "Diario",
            settings: "Configuración",
            trustedPeople: "Personas de confianza",
            securityWord: "Palabra de seguridad",
            save: "Guardar",
            cancel: "Cancelar"
        }
    };

    function applyLanguage(language) {
        if (!dictionaries[language]) language = "pt-BR";

        localStorage.setItem(STORAGE.language, language);
        root.lang = language;

        // Traduz somente elementos marcados com data-i18n.
        $$("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;
            const translated = dictionaries[language][key];

            if (translated) element.textContent = translated;
        });

        $$("[data-i18n-placeholder]").forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const translated = dictionaries[language][key];

            if (translated) element.placeholder = translated;
        });

        $$("[data-language]").forEach(button => {
            button.setAttribute(
                "aria-pressed",
                String(button.dataset.language === language)
            );
        });

        const selector = $("#languageSelect") || $("#language");
        if (selector && selector.value !== language) {
            selector.value = language;
        }
    }

    $$("[data-language]").forEach(button => {
        button.addEventListener("click", () => {
            applyLanguage(button.dataset.language);
        });
    });

    const languageSelect = $("#languageSelect") || $("#language");

    languageSelect?.addEventListener("change", event => {
        applyLanguage(event.target.value);
    });

    applyLanguage(localStorage.getItem(STORAGE.language) || "pt-BR");

    /* =====================================================
       LOCALIZAÇÃO
       Exige HTTPS ou localhost e permissão do navegador.
    ===================================================== */

    function setupLocation() {
        const button =
            $("#getLocation") ||
            $("#findLocation") ||
            $("#useMyLocation");

        const status =
            $("#locationStatus") ||
            $("#locationMessage") ||
            $("#locationResult");

        const coords =
            $("#coords") ||
            $("#coordinates") ||
            $("#locationCoordinates");

        const map =
            $("#mapLink") ||
            $("#mapsLink") ||
            $("#locationMap");

        if (!button) return;

        button.addEventListener("click", () => {
            if (!navigator.geolocation) {
                if (status) status.textContent =
                    "Este navegador não oferece geolocalização.";
                return;
            }

            if (status) status.textContent =
                "Solicitando permissão de localização…";

            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude.toFixed(6);
                    const longitude = position.coords.longitude.toFixed(6);

                    localStorage.setItem(STORAGE.latitude, latitude);
                    localStorage.setItem(STORAGE.longitude, longitude);

                    if (status) status.textContent = "Localização encontrada.";
                    if (coords) {
                        coords.textContent =
                            `Latitude: ${latitude} • Longitude: ${longitude}`;
                    }

                    if (map) {
                        map.href =
                            `https://www.google.com/maps?q=${latitude},${longitude}`;
                        map.hidden = false;
                    }
                },
                error => {
                    let message = "Não foi possível obter sua localização.";

                    if (error.code === error.PERMISSION_DENIED) {
                        message = "A permissão foi negada. Autorize a localização no navegador.";
                    } else if (error.code === error.TIMEOUT) {
                        message = "A localização demorou demais. Tente novamente.";
                    }

                    if (status) status.textContent = message;
                },
                {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 0
                }
            );
        });
    }

    setupLocation();

    /* =====================================================
       PALAVRA DE SEGURANÇA
       Este recurso só funciona enquanto a página está aberta.
       O navegador pode pedir autorização para o microfone.
    ===================================================== */

    const securityInput =
        $("#word") ||
        $("#securityWord") ||
        $("#securityWordInput");

    const securitySave =
        $("#saveWord") ||
        $("#save");

    const securityStatus =
        $("#securityResult") ||
        $("#securityStatus") ||
        $("#result");

    const securitySaved = $("#saved");

    if (securityInput) {
        const storedWord = localStorage.getItem(STORAGE.securityWord) || "";
        securityInput.value = storedWord;

        if (securitySaved) {
            securitySaved.textContent = storedWord
                ? "Palavra configurada neste navegador."
                : "Nenhuma palavra configurada.";
        }
    }

    securitySave?.addEventListener("click", () => {
        const word = securityInput?.value.trim();

        if (!word || word.length < 2) {
            if (securityStatus) {
                securityStatus.textContent = "Digite uma palavra ou frase com pelo menos dois caracteres.";
            }
            return;
        }

        localStorage.setItem(STORAGE.securityWord, word);

        if (securitySaved) {
            securitySaved.textContent = "Palavra configurada neste navegador.";
        }

        if (securityStatus) {
            securityStatus.textContent =
                "Palavra salva neste navegador. Ela não é sincronizada com outros dispositivos.";
        }
    });

    /* =====================================================
       FORMULÁRIOS: EVITA ENVIO ACIDENTAL
       Cada formulário mantém seu próprio comportamento.
    ===================================================== */

    $$("form[data-confirm-submit]").forEach(form => {
        form.addEventListener("submit", event => {
            const message = form.dataset.confirmSubmit;

            if (message && !window.confirm(message)) {
                event.preventDefault();
            }
        });
    });

});
