"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       CONFIGURAÇÕES
    ========================================================= */

    const STORAGE = {
        theme: "lia_theme",
        contrast: "lia_contrast",
        fontSize: "lia_font_size",
        language: "lia_language",
        account: "lia_account"
    };

    const body = document.body;
    const root = document.documentElement;

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);


    /* =========================================================
       TEMA
    ========================================================= */

    function applyTheme(theme) {

        body.classList.toggle("dark", theme === "dark");

        localStorage.setItem(
            STORAGE.theme,
            theme
        );

        const mainButton =
            $("#themeToggle");

        const accessButton =
            $("#themeToggleAccessibility");

        if (mainButton) {

            mainButton.innerHTML =
                theme === "dark"
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';

            mainButton.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Ativar modo claro"
                    : "Ativar modo noturno"
            );
        }

        if (accessButton) {

            accessButton.innerHTML =
                theme === "dark"
                    ? '<i class="fa-solid fa-sun"></i> Modo claro'
                    : '<i class="fa-solid fa-moon"></i> Modo noturno';
        }
    }


    function toggleTheme() {

        applyTheme(
            body.classList.contains("dark")
                ? "light"
                : "dark"
        );
    }


    $("#themeToggle")?.addEventListener(
        "click",
        toggleTheme
    );

    $("#themeToggleAccessibility")?.addEventListener(
        "click",
        toggleTheme
    );


    applyTheme(
        localStorage.getItem(STORAGE.theme) || "light"
    );


    /* =========================================================
       CONTRASTE
    ========================================================= */

    function applyContrast(enabled) {

        body.classList.toggle(
            "high-contrast",
            enabled
        );

        localStorage.setItem(
            STORAGE.contrast,
            enabled ? "on" : "off"
        );
    }


    $("#contrastToggle")?.addEventListener(
        "click",
        () => {

            applyContrast(
                !body.classList.contains(
                    "high-contrast"
                )
            );

        }
    );


    applyContrast(
        localStorage.getItem(STORAGE.contrast) === "on"
    );


    /* =========================================================
       TAMANHO DA FONTE
    ========================================================= */

    const fontScales = [
        0.90,
        1,
        1.10,
        1.20
    ];


    let fontIndex =
        Number(
            localStorage.getItem(
                STORAGE.fontSize
            )
        );


    if (
        !Number.isInteger(fontIndex) ||
        fontIndex < 0 ||
        fontIndex >= fontScales.length
    ) {

        fontIndex = 1;
    }


    function applyFont() {

        root.style.setProperty(
            "--lia-font-scale",
            fontScales[fontIndex]
        );

        root.style.fontSize =
            `${16 * fontScales[fontIndex]}px`;

        localStorage.setItem(
            STORAGE.fontSize,
            String(fontIndex)
        );
    }


    $("#fontDecrease")?.addEventListener(
        "click",
        () => {

            fontIndex =
                Math.max(
                    0,
                    fontIndex - 1
                );

            applyFont();
        }
    );


    $("#fontNormal")?.addEventListener(
        "click",
        () => {

            fontIndex = 1;

            applyFont();
        }
    );


    $("#fontIncrease")?.addEventListener(
        "click",
        () => {

            fontIndex =
                Math.min(
                    fontScales.length - 1,
                    fontIndex + 1
                );

            applyFont();
        }
    );


    applyFont();


    /* =========================================================
       ACESSIBILIDADE
    ========================================================= */

    const panel =
        $("#accessibilityPanel");

    const overlay =
        $("#accessibilityOverlay");


    function openAccessibility() {

        if (!panel) return;

        panel.classList.add("open");

        overlay?.classList.add("open");

        panel.setAttribute(
            "aria-hidden",
            "false"
        );

        overlay?.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function closeAccessibility() {

        if (!panel) return;

        panel.classList.remove("open");

        overlay?.classList.remove("open");

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

        overlay?.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    $("#openAccessibility")?.addEventListener(
        "click",
        openAccessibility
    );


    $("#closeAccessibility")?.addEventListener(
        "click",
        closeAccessibility
    );


    overlay?.addEventListener(
        "click",
        closeAccessibility
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAccessibility();
            }

            if (
                event.altKey &&
                event.key.toLowerCase() === "a"
            ) {

                event.preventDefault();

                openAccessibility();
            }
        }
    );


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    const mobileButton =
        $("#mobileMenuButton");

    const navigation =
        $("#mainNavigation");


    mobileButton?.addEventListener(
        "click",
        () => {

            const open =
                navigation?.classList.toggle(
                    "open"
                ) || false;


            mobileButton.classList.toggle(
                "active",
                open
            );


            mobileButton.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );
        }
    );


    navigation?.querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                    mobileButton?.classList.remove(
                        "active"
                    );

                    mobileButton?.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            );

        });


    /* =========================================================
       LEITURA DE PÁGINA
    ========================================================= */

    let reading = false;


    function readableText() {

        const clone =
            document.body.cloneNode(true);


        clone.querySelectorAll(
            "script,style,button,input,textarea,select,svg"
        ).forEach(
            element => element.remove()
        );


        return clone.innerText
            .replace(/\s+/g, " ")
            .trim();
    }


    function stopReading() {

        reading = false;

        window.speechSynthesis?.cancel();
    }


    function readPage() {

        if (
            !("speechSynthesis" in window)
        ) {

            alert(
                "Seu navegador não oferece leitura de voz."
            );

            return;
        }


        stopReading();

        reading = true;


        const text =
            readableText();


        const chunks =
            text.match(
                /.{1,220}(?:\s|$)/g
            ) || [text];


        let index = 0;


        function speakNext() {

            if (
                !reading ||
                index >= chunks.length
            ) {

                return;
            }


            const utterance =
                new SpeechSynthesisUtterance(
                    chunks[index]
                );


            const language =
                localStorage.getItem(
                    STORAGE.language
                ) || "pt-BR";


            utterance.lang =
                language === "en"
                    ? "en-US"
                    : language === "es"
                        ? "es-ES"
                        : "pt-BR";


            utterance.rate = 0.95;


            utterance.onend = () => {

                index++;

                speakNext();
            };


            window.speechSynthesis.speak(
                utterance
            );
        }


        speakNext();
    }


    $("#readPage")?.addEventListener(
        "click",
        readPage
    );


    $("#stopReading")?.addEventListener(
        "click",
        stopReading
    );


    /* =========================================================
       IDIOMAS
       
       Agora o sistema aceita:
       .language-button
       [data-language]
       #pt-BR
       #en
       #es
    ========================================================= */


    const translations = {

        "pt-BR": {

            "Início": "Início",
            "Home": "Início",

            "Conheça a LIA": "Conheça a LIA",
            "Meet LIA": "Conheça a LIA",

            "Violências": "Violências",
            "Violence": "Violências",

            "Rede de apoio": "Rede de apoio",
            "Support network": "Rede de apoio",

            "Localização": "Localização",
            "Location": "Localização",

            "Meu cadastro": "Meu cadastro",
            "My registration": "Meu cadastro",

            "Conta": "Conta",
            "Account": "Conta",

            "Acessibilidade": "Acessibilidade",
            "Accessibility": "Acessibilidade",

            "Início": "Início",

            "Voltar para LIA": "Voltar para LIA",
            "Back to LIA": "Voltar para LIA",

            "Local • Informação • Apoio":
                "Local • Informação • Apoio",

            "LOCAL • INFORMAÇÃO • APOIO":
                "LOCAL • INFORMAÇÃO • APOIO",

            "Sobre o projeto":
                "Sobre o projeto",

            "Sobre a LIA":
                "Sobre a LIA",

            "Segurança":
                "Segurança",

            "Configuração":
                "Configuração",

            "Palavra de segurança":
                "Palavra de segurança",

            "Pessoas confiáveis":
                "Pessoas confiáveis",

            "Biometria":
                "Biometria",

            "Diário":
                "Diário",

            "Emergência":
                "Emergência",

            "Apoio":
                "Apoio",

            "Local":
                "Local",

            "Informação":
                "Informação",

            "Privacidade":
                "Privacidade",

            "Meu perfil":
                "Meu perfil",

            "Informações de emergência":
                "Informações de emergência",

            "Informações de saúde":
                "Informações de saúde",

            "Salvar informações":
                "Salvar informações",

            "Limpar dados":
                "Limpar dados"
        },


        "en": {

            "Início": "Home",
            "Home": "Home",

            "Conheça a LIA": "Meet LIA",
            "Meet LIA": "Meet LIA",

            "Violências": "Violence",
            "Violence": "Violence",

            "Rede de apoio": "Support network",
            "Support network": "Support network",

            "Localização": "Location",
            "Location": "Location",

            "Meu cadastro": "My registration",
            "My registration": "My registration",

            "Conta": "Account",
            "Account": "Account",

            "Acessibilidade": "Accessibility",
            "Accessibility": "Accessibility",

            "Voltar para LIA":
                "Back to LIA",

            "Back to LIA":
                "Back to LIA",

            "Local • Informação • Apoio":
                "Local • Information • Support",

            "LOCAL • INFORMAÇÃO • APOIO":
                "LOCAL • INFORMATION • SUPPORT",

            "Sobre o projeto":
                "About the project",

            "Sobre a LIA":
                "About LIA",

            "Segurança":
                "Security",

            "Configuração":
                "Settings",

            "Palavra de segurança":
                "Security word",

            "Pessoas confiáveis":
                "Trusted people",

            "Biometria":
                "Biometrics",

            "Diário":
                "Diary",

            "Emergência":
                "Emergency",

            "Apoio":
                "Support",

            "Local":
                "Location",

            "Informação":
                "Information",

            "Privacidade":
                "Privacy",

            "Meu perfil":
                "My profile",

            "Informações de emergência":
                "Emergency information",

            "Informações de saúde":
                "Health information",

            "Salvar informações":
                "Save information",

            "Limpar dados":
                "Clear data"
        },


        "es": {

            "Início": "Inicio",
            "Home": "Inicio",

            "Conheça a LIA": "Conoce LIA",
            "Meet LIA": "Conoce LIA",

            "Violências": "Violencias",
            "Violence": "Violencias",

            "Rede de apoio": "Red de apoyo",
            "Support network": "Red de apoyo",

            "Localização": "Ubicación",
            "Location": "Ubicación",

            "Meu cadastro": "Mi registro",
            "My registration": "Mi registro",

            "Conta": "Cuenta",
            "Account": "Cuenta",

            "Acessibilidade": "Accesibilidad",
            "Accessibility": "Accesibilidad",

            "Voltar para LIA":
                "Volver a LIA",

            "Back to LIA":
                "Volver a LIA",

            "Local • Informação • Apoio":
                "Local • Información • Apoyo",

            "LOCAL • INFORMAÇÃO • APOIO":
                "LOCAL • INFORMACIÓN • APOYO",

            "Sobre o projeto":
                "Sobre el proyecto",

            "Sobre a LIA":
                "Sobre LIA",

            "Segurança":
                "Seguridad",

            "Configuração":
                "Configuración",

            "Palavra de segurança":
                "Palabra de seguridad",

            "Pessoas confiáveis":
                "Personas de confianza",

            "Biometria":
                "Biometría",

            "Diário":
                "Diario",

            "Emergência":
                "Emergencia",

            "Apoio":
                "Apoyo",

            "Local":
                "Localización",

            "Informação":
                "Información",

            "Privacidade":
                "Privacidad",

            "Meu perfil":
                "Mi perfil",

            "Informações de emergência":
                "Información de emergencia",

            "Informações de saúde":
                "Información de salud",

            "Salvar informações":
                "Guardar información",

            "Limpar dados":
                "Borrar datos"
        }

    };


    /* =========================================================
       TRADUZIR TEXTO
    ========================================================= */

    function translateElementText(element, language) {

        if (
            !element ||
            element.children.length > 0
        ) {
            return;
        }


        const original =
            element.textContent
                .replace(/\s+/g, " ")
                .trim();


        if (!original) return;


        const dictionary =
            translations[language];


        if (!dictionary) return;


        if (
            dictionary[original]
        ) {

            element.textContent =
                dictionary[original];

            return;
        }


        /*
         * Também procura frases menores
         * dentro do texto.
         */

        let translated =
            original;


        Object.keys(dictionary)
            .sort(
                (a, b) =>
                    b.length - a.length
            )
            .forEach(
                key => {

                    if (
                        translated.includes(key)
                    ) {

                        translated =
                            translated.replace(
                                key,
                                dictionary[key]
                            );
                    }
                }
            );


        if (
            translated !== original
        ) {

            element.textContent =
                translated;
        }
    }


    /* =========================================================
       ELEMENTOS COM data-i18n
    ========================================================= */

    function translateDataElements(language) {

        const dictionary =
            translations[language];


        $$("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;


                if (
                    dictionary[key]
                ) {

                    element.textContent =
                        dictionary[key];
                }
            });
    }


    /* =========================================================
       TRADUÇÃO DA NAVEGAÇÃO
    ========================================================= */

    function translateNavigation(language) {

        const dictionary =
            translations[language];


        const nav =
            $("#mainNavigation");


        if (!nav) return;


        nav.querySelectorAll("a")
            .forEach(link => {

                const text =
                    link.textContent
                        .replace(/\s+/g, " ")
                        .trim();


                if (
                    dictionary[text]
                ) {

                    link.textContent =
                        dictionary[text];
                }
            });


        const accessibility =
            $("#openAccessibility");


        if (accessibility) {

            const icon =
                accessibility.querySelector("i");


            if (icon) {

                accessibility.innerHTML =
                    "";

                accessibility.appendChild(
                    icon
                );

                accessibility.append(
                    " " +
                    dictionary[
                        "Acessibilidade"
                    ]
                );

            } else {

                accessibility.textContent =
                    dictionary[
                        "Acessibilidade"
                    ];
            }
        }
    }


    /* =========================================================
       TRADUÇÃO GERAL DA PÁGINA
    ========================================================= */

    function translatePage(language) {

        if (
            !translations[language]
        ) {

            language = "pt-BR";
        }


        document.documentElement.lang =
            language;


        translateDataElements(
            language
        );


        translateNavigation(
            language
        );


        /*
         * Traduz somente textos que possuem
         * correspondência segura no dicionário.
         *
         * Não mexemos em:
         * inputs,
         * placeholders,
         * valores,
         * IDs,
         * links,
         * scripts.
         */

        const elements =
            document.body.querySelectorAll(
                "h1,h2,h3,h4,h5,h6,p,span,a,strong,small,label,button"
            );


        elements.forEach(
            element => {

                if (
                    element.closest(
                        "script,style"
                    )
                ) {

                    return;
                }


                if (
                    element.dataset.i18n
                ) {

                    return;
                }


                /*
                 * Evita alterar elementos
                 * que possuem outros elementos
                 * importantes dentro deles.
                 */

                if (
                    element.children.length === 0
                ) {

                    translateElementText(
                        element,
                        language
                    );
                }

            }
        );


        /*
         * Títulos da página.
         */

        const title =
            document.title;


        const titleTranslations = {

            "en": {

                "Conheça a LIA":
                    "Meet LIA",

                "Conheça a LIA — LIA":
                    "Meet LIA — LIA",

                "Palavra de Segurança — LIA":
                    "Security Word — LIA",

                "Localização — LIA":
                    "Location — LIA",

                "Biometria — LIA":
                    "Biometrics — LIA",

                "Emergência — LIA":
                    "Emergency — LIA",

                "Diário — LIA":
                    "Diary — LIA",

                "Pessoas Confiáveis — LIA":
                    "Trusted People — LIA",

                "Conta | LIA":
                    "Account | LIA"
            },

            "es": {

                "Conheça a LIA":
                    "Conoce LIA",

                "Palavra de Segurança — LIA":
                    "Palabra de Seguridad — LIA",

                "Localização — LIA":
                    "Ubicación — LIA",

                "Biometria — LIA":
                    "Biometría — LIA",

                "Emergência — LIA":
                    "Emergencia — LIA",

                "Diário — LIA":
                    "Diario — LIA",

                "Pessoas Confiáveis — LIA":
                    "Personas de Confianza — LIA",

                "Conta | LIA":
                    "Cuenta | LIA"
            }

        };


        if (
            titleTranslations[language]?.[title]
        ) {

            document.title =
                titleTranslations[
                    language
                ][title];
        }
    }


    /* =========================================================
       APLICAR IDIOMA
    ========================================================= */

    function applyLanguage(language) {

        if (
            !translations[language]
        ) {

            language = "pt-BR";
        }


        localStorage.setItem(
            STORAGE.language,
            language
        );


        document.documentElement.lang =
            language;


        translatePage(
            language
        );


        /*
         * Todos os formatos de botão
         * agora funcionam.
         */

        $$(
            ".language-button, [data-language]"
        ).forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.language === language
            );

        });


        /*
         * Atualiza o texto dos botões
         * caso estejam presentes.
         */

        const languageButtons =
            $$(
                ".language-button, [data-language]"
            );


        languageButtons.forEach(
            button => {

                const buttonLanguage =
                    button.dataset.language;


                if (
                    !buttonLanguage
                ) return;


                if (
                    buttonLanguage === language
                ) {

                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                } else {

                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );
                }
            }
        );
    }


    /* =========================================================
       BOTÕES DE IDIOMA
    ========================================================= */

    function bindLanguageButtons() {

        $$(
            ".language-button, [data-language]"
        ).forEach(button => {

            /*
             * Evita adicionar o mesmo evento
             * duas vezes.
             */

            if (
                button.dataset.languageReady === "true"
            ) {

                return;
            }


            button.dataset.languageReady =
                "true";


            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    const language =
                        button.dataset.language;


                    if (
                        language
                    ) {

                        applyLanguage(
                            language
                        );
                    }
                }
            );

        });
    }


    bindLanguageButtons();


    /*
     * Também procura novamente depois que
     * algum componente for carregado.
     */

    setTimeout(
        bindLanguageButtons,
        300
    );


    setTimeout(
        bindLanguageButtons,
        1000
    );


    /* =========================================================
       VLIBRAS
       Só carrega quando a pessoa pede.
    ========================================================= */

    let vlibrasLoaded = false;
    let vlibrasLoading = false;


    function loadVlibras() {

        if (vlibrasLoaded) return;

        if (vlibrasLoading) return;


        vlibrasLoading = true;


        const existing =
            document.querySelector(
                'script[src*="vlibras-plugin.js"]'
            );


        if (existing) {

            vlibrasLoaded = true;

            vlibrasLoading = false;

            return;
        }


        const script =
            document.createElement(
                "script"
            );


        script.src =
            "https://vlibras.gov.br/app/vlibras-plugin.js";


        script.async = true;


        script.onload = () => {

            vlibrasLoaded = true;

            vlibrasLoading = false;


            try {

                new window.VLibras.Widget(
                    "https://vlibras.gov.br/app"
                );

            } catch (error) {

                console.error(
                    "Erro ao iniciar VLibras:",
                    error
                );
            }
        };


        script.onerror = () => {

            vlibrasLoading = false;

            alert(
                "Não foi possível carregar o VLibras agora."
            );
        };


        document.body.appendChild(
            script
        );
    }


    window.activateVLibras =
        loadVlibras;


    $("#activateVlibras")
        ?.addEventListener(
            "click",
            loadVlibras
        );


    /* =========================================================
       LOCALIZAÇÃO
    ========================================================= */

    function setupLocation() {

        const buttons =
            $(
                "#locate, #getLocation, #locateMe"
            );


        if (!buttons) return;


        const buttonList =
            $$(
                "#locate, #getLocation, #locateMe"
            );


        buttonList.forEach(
            button => {

                if (
                    button.dataset.locationReady
                ) return;


                button.dataset.locationReady =
                    "true";


                button.addEventListener(
                    "click",
                    requestLocation
                );
            }
        );
    }


    function requestLocation() {

        const status =
            $(
                "#status, #locationStatus"
            );


        const coords =
            $(
                "#coords, #coordinates, #locationCoordinates"
            );


        const map =
            $(
                "#mapLink, #mapsLink, #locationMap"
            );


        if (
            !navigator.geolocation
        ) {

            if (status) {

                status.textContent =
                    "A geolocalização não está disponível neste navegador.";
            }

            return;
        }


        if (status) {

            status.textContent =
                "Solicitando sua localização...";
        }


        navigator.geolocation.getCurrentPosition(

            position => {

                const latitude =
                    position.coords.latitude
                        .toFixed(6);


                const longitude =
                    position.coords.longitude
                        .toFixed(6);


                const accuracy =
                    Math.round(
                        position.coords.accuracy
                    );


                localStorage.setItem(
                    "lia_latitude",
                    latitude
                );


                localStorage.setItem(
                    "lia_longitude",
                    longitude
                );


                localStorage.setItem(
                    "lia_accuracy",
                    accuracy
                );


                if (status) {

                    status.textContent =
                        "Localização encontrada.";
                }


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

                console.error(
                    "Erro de localização:",
                    error
                );


                if (status) {

                    status.textContent =
                        "Não foi possível obter sua localização.";
                }


                if (coords) {

                    coords.textContent =
                        "Verifique a permissão de localização do navegador e tente novamente.";
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }


    setupLocation();


    /* =========================================================
       PALAVRA DE SEGURANÇA
    ========================================================= */

    function setupSecurityWord() {

        const input =
            $(
                "#word, #securityWord, #securityWordInput"
            );


        const save =
            $(
                "#save, #saveWord"
            );


        const result =
            $(
                "#result, #securityResult, #securityStatus"
            );


        const saved =
            $(
                "#saved"
            );


        if (!input) return;


        const stored =
            localStorage.getItem(
                "lia_security_word"
            ) || "";


        if (stored) {

            input.value =
                stored;


            if (saved) {

                saved.textContent =
                    `Palavra configurada: ${stored}`;
            }

        } else {

            if (saved) {

                saved.textContent =
                    "Nenhuma palavra configurada.";
            }
        }


        save?.addEventListener(
            "click",
            () => {

                const word =
                    input.value
                        .trim();


                if (
                    word.length < 2
                ) {

                    if (result) {

                        result.textContent =
                            "Digite uma palavra ou frase.";
                    }

                    return;
                }


                localStorage.setItem(
                    "lia_security_word",
                    word
                );


                if (saved) {

                    saved.textContent =
                        `Palavra configurada: ${word}`;
                }


                if (result) {

                    result.textContent =
                        "Palavra salva neste navegador.";
                }
            }
        );


        const startListening =
            $(
                "#startListening, #startSecurityListening, #test, #testWord"
            );


        const stopListening =
            $(
                "#stopListening, #stopSecurityListening"
            );


        let recognition = null;


        function startRecognition() {

            const SpeechRecognition =
                window.SpeechRecognition ||
                window.webkitSpeechRecognition;


            if (!SpeechRecognition) {

                if (result) {

                    result.textContent =
                        "O reconhecimento de voz não está disponível neste navegador.";
                }

                return;
            }


            const expected =
                (
                    localStorage.getItem(
                        "lia_security_word"
                    ) || ""
                )
                .toLowerCase()
                .trim();


            if (!expected) {

                if (result) {

                    result.textContent =
                        "Configure primeiro sua palavra de segurança.";
                }

                return;
            }


            recognition =
                new SpeechRecognition();


            recognition.lang =
                "pt-BR";


            recognition.continuous =
                true;


            recognition.interimResults =
                false;


            recognition.onstart =
                () => {

                    if (result) {

                        result.textContent =
                            "Escutando...";
                    }
                };


            recognition.onresult =
                event => {

                    let transcript =
                        "";


                    for (
                        let i =
                            event.resultIndex;

                        i <
                        event.results.length;

                        i++
                    ) {

                        transcript +=
                            event.results[i][0].transcript;
                    }


                    transcript =
                        transcript
                            .toLowerCase()
                            .trim();


                    if (
                        transcript.includes(
                            expected
                        )
                    ) {

                        if (result) {

                            result.textContent =
                                "Palavra reconhecida. Abrindo ligação de emergência...";
                        }


                        recognition.stop();


                        window.location.href =
                            "tel:190";
                    }
                };


            recognition.onerror =
                event => {

                    console.error(
                        "Reconhecimento de voz:",
                        event
                    );


                    if (result) {

                        result.textContent =
                            "Não foi possível utilizar o reconhecimento de voz.";
                    }
                };


            recognition.start();
        }


        function stopRecognition() {

            recognition?.stop();

            recognition = null;


            if (result) {

                result.textContent =
                    "Reconhecimento de voz interrompido.";
            }
        }


        startListening?.addEventListener(
            "click",
            startRecognition
        );


        stopListening?.addEventListener(
            "click",
            stopRecognition
        );
    }


    setupSecurityWord();


    /* =========================================================
       EMERGÊNCIA
    ========================================================= */

    function setupEmergency() {

        const button =
            $(
                "#emergencyButton, #startEmergency"
            );


        if (!button) return;


        const countdownElement =
            $(
                "#countdown, #emergencyCountdown"
            );


        const status =
            $(
                "#emergencyStatus"
            );


        button.addEventListener(
            "click",
            () => {

                let seconds = 5;


                if (countdownElement) {

                    countdownElement.textContent =
                        seconds;
                }


                if (status) {

                    status.textContent =
                        "Ligação de emergência iniciará em alguns segundos.";
                }


                const timer =
                    setInterval(
                        () => {

                            seconds--;


                            if (countdownElement) {

                                countdownElement.textContent =
                                    seconds;
                            }


                            if (
                                seconds <= 0
                            ) {

                                clearInterval(
                                    timer
                                );


                                navigator.geolocation?.getCurrentPosition(
                                    position => {

                                        localStorage.setItem(
                                            "lia_latitude",
                                            position.coords.latitude
                                        );

                                        localStorage.setItem(
                                            "lia_longitude",
                                            position.coords.longitude
                                        );
                                    },
                                    () => {}
                                );


                                window.location.href =
                                    "tel:190";
                            }

                        },
                        1000
                    );
            }
        );
    }


    setupEmergency();


    /* =========================================================
       CONTA
    ========================================================= */

    function loadAccountPreview() {

        const name =
            localStorage.getItem(
                "lia_account_name"
            );


        const photo =
            localStorage.getItem(
                "lia_account_photo"
            );


        $$(
            "[data-account-name]"
        ).forEach(
            element => {

                if (name) {

                    element.textContent =
                        name;
                }
            }
        );


        $$(
            "[data-account-photo]"
        ).forEach(
            element => {

                if (
                    photo &&
                    element.tagName === "IMG"
                ) {

                    element.src =
                        photo;
                }
            }
        );
    }


    loadAccountPreview();


    /* =========================================================
       MODO DISCRETO
    ========================================================= */

    function openDiscreetMode() {

        window.location.href =
            "discreto.html";
    }


    $$(
        "#openDiscreetMode, #discreetMode"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                openDiscreetMode
            );
        }
    );


    /* =========================================================
       TECLA DE SAÍDA DO MODO DISCRETO
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() === "k"
            ) {

                window.location.href =
                    "index.html";
            }
        }
    );


    /* =========================================================
       INICIALIZAÇÃO FINAL
    ========================================================= */

    /*
     * IMPORTANTE:
     *
     * Português agora é o idioma padrão.
     *
     * Se a pessoa nunca escolheu idioma,
     * o site começa em português.
     *
     * Se escolheu inglês ou espanhol,
     * a preferência permanece salva.
     */

    const savedLanguage =
        localStorage.getItem(
            STORAGE.language
        );


    applyLanguage(
        savedLanguage || "pt-BR"
    );


    /*
     * Caso algum botão seja criado
     * depois do carregamento.
     */

    setTimeout(
        () => {

            bindLanguageButtons();

            applyLanguage(
                localStorage.getItem(
                    STORAGE.language
                ) || "pt-BR"
            );

        },
        500
    );

});