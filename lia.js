
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const accessibilityToggle = $("#accessibilityToggle");
  const accessibilityPanel = $("#accessibilityPanel");
  const accessibilityClose = $("#accessibilityClose");
  const languageSelect = $("#languageSelect");
  const themeSelect = $("#themeSelect");
  const contrastToggle = $("#contrastToggle");
  const speechToggle = $("#speechToggle");
  const toast = $("#siteToast");

  const translations = {
    pt: {
      skip: "Pular para o conteúdo",
      navHome: "Início",
      navAbout: "Sobre a LIA",
      navHistory: "Nossa história",
      navViolence: "Violências",
      navResources: "Recursos",
      navNews: "Notícias",
      navAccount: "Conta",
      languageLabel: "Idioma",

      accessEyebrow: "PERSONALIZE SUA EXPERIÊNCIA",
      accessTitle: "Acessibilidade",
      fontSize: "Tamanho do texto",
      reset: "Padrão",
      theme: "Tema visual",
      lightTheme: "Claro",
      darkTheme: "Escuro",
      contrast: "Alto contraste",
      readAloud: "Leitura em voz alta",
      accessNote: "Os ajustes visuais podem ser alterados a qualquer momento.",

      heroEyebrow: "VOCÊ NÃO ESTÁ SOZINHA",
      heroTitle: 'LIA é mais que um site, é uma <span>rede de apoio.</span>',
      heroDescription: "Um espaço de informação, acolhimento e orientação para mulheres que precisam ser ouvidas, compreender seus direitos e encontrar caminhos para viver com mais segurança.",
      heroHelp: "Preciso de apoio",
      heroKnow: "Conheça a LIA",
      heroNote: "Um espaço de informação, respeito e acolhimento.",
      heroQuote: "Você tem direito de ser feliz!",

      resourceKicker: "UM CAMINHO DE CADA VEZ",
      resourceInfoTitle: "Informação",
      resourceInfoText: "Entenda os tipos de violência e reconheça sinais.",
      resourceSafetyTitle: "Segurança",
      resourceSafetyText: "Conheça orientações para planejar sua segurança.",
      resourceSupportTitle: "Acolhimento",
      resourceSupportText: "Encontre caminhos para buscar apoio.",
      resourceToolsTitle: "Recursos",
      resourceToolsText: "Conheça as ferramentas da plataforma.",

      aboutEyebrow: "SOBRE A LIA",
      aboutTitle: "Uma amiga virtual, um espaço de orientação.",
      aboutText: "A LIA é um projeto que reúne informação, acolhimento e caminhos para que mulheres possam conhecer seus direitos e identificar recursos de apoio. A proposta é tornar informações importantes mais acessíveis, em um ambiente organizado e cuidadoso.",
      aboutPoint1: "Informação acessível e organizada",
      aboutPoint2: "Orientação com respeito e acolhimento",
      aboutPoint3: "Informações sobre recursos de segurança",
      aboutPoint4: "Caminhos para conhecer serviços de apoio",
      aboutLink: "Descubra a história da LIA",
      phoneMessage: "Você merece ser ouvida.",
      phoneInfo: "Informação acessível",
      phoneGuidance: "Orientação acolhedora",
      phoneSafety: "Recursos de segurança",

      storyEyebrow: "NOSSA HISTÓRIA",
      storyTitle: "De uma ideia, nasceu uma missão.",
      storyText: "A LIA nasceu com o propósito de aproximar mulheres da informação, do acolhimento e dos caminhos de apoio. Este projeto busca mostrar como a tecnologia pode ser usada com responsabilidade para tornar conteúdos importantes mais acessíveis.",
      storyButton: "Conheça a história da LIA",

      violenceEyebrow: "INFORMAÇÃO É UM DIREITO",
      violenceTitle: "Toda forma de violência precisa ser reconhecida.",
      violenceDescription: "Conhecer os sinais pode ajudar a compreender uma situação e buscar orientação. A responsabilidade pela violência nunca é da vítima.",
      physicalTitle: "Violência física",
      physicalText: "Ações que prejudicam a integridade ou a saúde corporal.",
      psychTitle: "Violência psicológica",
      psychText: "Ameaças, humilhações, controle e ações que causam dano emocional.",
      sexualTitle: "Violência sexual",
      sexualText: "Atos ou situações que violam a liberdade sexual.",
      propertyTitle: "Violência patrimonial",
      propertyText: "Controle, retenção ou destruição de bens, documentos e recursos.",
      moralTitle: "Violência moral",
      moralText: "Condutas como calúnia, difamação e injúria.",
      digitalTitle: "Violência digital",
      digitalText: "Abusos e ameaças praticados com recursos digitais.",
      vicariousTitle: "Violência vicária",
      vicariousText: "Violência contra pessoas próximas para causar sofrimento à mulher.",
      cycleTitle: "Ciclo da violência",
      cycleText: "Entenda padrões que podem ocorrer em relações abusivas.",
      learnMore: "Saiba mais",

      supportEyebrow: "VOCÊ MERECE SER OUVIDA",
      supportTitle: "Você não precisa passar por isso sozinha.",
      supportText: "Se você precisa de orientação, existem serviços e pessoas que podem ajudar. Escolha o caminho mais adequado à sua situação, respeitando seu tempo e sua segurança.",
      supportButton: "Conheça as opções de apoio",
      helplineTitle: "Ligue 180",
      helplineText: "Central de Atendimento à Mulher",
      psychSupportTitle: "Apoio psicológico",
      psychSupportText: "Informações para buscar acolhimento",
      legalTitle: "Orientação jurídica",
      legalText: "Conheça caminhos e serviços de orientação",
      socialTitle: "Serviços sociais",
      socialText: "Encontre informações sobre atendimento",

      toolsEyebrow: "RECURSOS DA PLATAFORMA",
      toolsTitle: "Informação e ferramentas em um só lugar.",
      toolsDescription: "Conheça os recursos previstos para apoiar a organização de informações e o acesso a orientações úteis.",
      discreetTitle: "Modo discreto",
      discreetText: "Conheça a proposta de uma interface com aparência de agenda.",
      diaryTitle: "Diário pessoal",
      diaryText: "Conheça a proposta de organização de anotações pessoais.",
      trustedTitle: "Pessoas de confiança",
      trustedText: "Planeje como organizar contatos de pessoas escolhidas por você.",

      safetyEyebrow: "SUA SEGURANÇA IMPORTA",
      safetyTitle: "Informação para fazer escolhas com mais segurança.",
      safetyText: "Se houver perigo imediato, procure um local seguro e acione os serviços de emergência quando puder fazê-lo com segurança.",
      safetyButton: "Orientações de emergência",

      footerDescription: "Informação, acolhimento e orientação para mulheres. Uma iniciativa que acredita no poder do conhecimento.",
      footerExplore: "Explore",
      footerHelp: "Encontre apoio",
      footerProject: "O projeto",
      projectLink: "Sobre o projeto",
      collaboratorsLink: "Colaboradores",
      tutorialLink: "Tutorial do modo discreto",
      copyright: "Projeto acadêmico de informação e orientação.",
      footerDisclaimer: "A LIA é uma plataforma informativa e não substitui atendimento profissional ou serviços de emergência.",
      backTop: "Voltar ao início ↑",

      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
      accessOpen: "Abrir acessibilidade",
      accessClose: "Fechar acessibilidade",
      increaseFont: "Aumentar fonte",
      decreaseFont: "Diminuir fonte",
      selectLanguage: "Selecionar idioma",
      closeButton: "Fechar"
    },

    en: {
      skip: "Skip to content",
      navHome: "Home",
      navAbout: "About LIA",
      navHistory: "Our story",
      navViolence: "Types of abuse",
      navResources: "Resources",
      navNews: "News",
      navAccount: "Account",
      languageLabel: "Language",

      accessEyebrow: "PERSONALIZE YOUR EXPERIENCE",
      accessTitle: "Accessibility",
      fontSize: "Text size",
      reset: "Default",
      theme: "Appearance",
      lightTheme: "Light",
      darkTheme: "Dark",
      contrast: "High contrast",
      readAloud: "Read aloud",
      accessNote: "Visual settings can be changed at any time.",

      heroEyebrow: "YOU ARE NOT ALONE",
      heroTitle: 'LIA is more than a website. It is a <span>support network.</span>',
      heroDescription: "A space for information, care and guidance for women who need to be heard, understand their rights and find ways to live more safely.",
      heroHelp: "I need support",
      heroKnow: "Discover LIA",
      heroNote: "A space for information, respect and care.",
      heroQuote: "You deserve to be happy!",

      resourceKicker: "ONE STEP AT A TIME",
      resourceInfoTitle: "Information",
      resourceInfoText: "Learn about types of abuse and recognize warning signs.",
      resourceSafetyTitle: "Safety",
      resourceSafetyText: "Explore guidance for planning your safety.",
      resourceSupportTitle: "Support",
      resourceSupportText: "Find ways to seek support.",
      resourceToolsTitle: "Resources",
      resourceToolsText: "Explore the platform's tools.",

      aboutEyebrow: "ABOUT LIA",
      aboutTitle: "A virtual companion and a space for guidance.",
      aboutText: "LIA is a project that brings together information, care and pathways to help women understand their rights and identify support resources. Its goal is to make important information more accessible in an organized and thoughtful environment.",
      aboutPoint1: "Accessible, organized information",
      aboutPoint2: "Respectful and supportive guidance",
      aboutPoint3: "Information about safety resources",
      aboutPoint4: "Ways to find support services",
      aboutLink: "Discover LIA's story",
      phoneMessage: "You deserve to be heard.",
      phoneInfo: "Accessible information",
      phoneGuidance: "Supportive guidance",
      phoneSafety: "Safety resources",

      storyEyebrow: "OUR STORY",
      storyTitle: "A mission grew from an idea.",
      storyText: "LIA was created to bring women closer to information, support and pathways to assistance. This project explores how technology can be used responsibly to make important information more accessible.",
      storyButton: "Discover LIA's story",

      violenceEyebrow: "INFORMATION IS A RIGHT",
      violenceTitle: "Every form of abuse deserves recognition.",
      violenceDescription: "Recognizing warning signs can help people understand a situation and seek guidance. Responsibility for abuse never lies with the victim.",
      physicalTitle: "Physical abuse",
      physicalText: "Actions that harm physical integrity or health.",
      psychTitle: "Psychological abuse",
      psychText: "Threats, humiliation, control and actions that cause emotional harm.",
      sexualTitle: "Sexual abuse",
      sexualText: "Acts or situations that violate sexual freedom.",
      propertyTitle: "Economic or property abuse",
      propertyText: "Control, withholding or destruction of property, documents or resources.",
      moralTitle: "Reputational abuse",
      moralText: "Conduct such as slander, defamation and insult.",
      digitalTitle: "Digital abuse",
      digitalText: "Abuse and threats carried out using digital tools.",
      vicariousTitle: "Vicarious abuse",
      vicariousText: "Harming people close to a woman to cause her suffering.",
      cycleTitle: "Cycle of abuse",
      cycleText: "Understand patterns that may occur in abusive relationships.",
      learnMore: "Learn more",

      supportEyebrow: "YOU DESERVE TO BE HEARD",
      supportTitle: "You do not have to go through this alone.",
      supportText: "If you need guidance, services and people may be able to help. Choose a path that suits your situation while considering your time and safety.",
      supportButton: "Explore support options",
      helplineTitle: "Call 180",
      helplineText: "Women's Support Center in Brazil",
      psychSupportTitle: "Psychological support",
      psychSupportText: "Information on finding support",
      legalTitle: "Legal guidance",
      legalText: "Explore guidance services and options",
      socialTitle: "Social services",
      socialText: "Find information about available services",

      toolsEyebrow: "PLATFORM RESOURCES",
      toolsTitle: "Information and tools in one place.",
      toolsDescription: "Explore planned resources for organizing information and accessing useful guidance.",
      discreetTitle: "Discreet mode",
      discreetText: "Learn about an interface designed to look like a personal planner.",
      diaryTitle: "Personal journal",
      diaryText: "Explore the concept of organizing personal notes.",
      trustedTitle: "Trusted people",
      trustedText: "Plan how to organize contacts chosen by you.",

      safetyEyebrow: "YOUR SAFETY MATTERS",
      safetyTitle: "Information to help you make safer choices.",
      safetyText: "If you are in immediate danger, seek a safe place and contact emergency services when you can do so safely.",
      safetyButton: "Emergency guidance",

      footerDescription: "Information, care and guidance for women. An initiative that believes in the power of knowledge.",
      footerExplore: "Explore",
      footerHelp: "Find support",
      footerProject: "The project",
      projectLink: "About the project",
      collaboratorsLink: "Project contributors",
      tutorialLink: "Discreet mode tutorial",
      copyright: "An academic information and guidance project.",
      footerDisclaimer: "LIA is an informational platform and does not replace professional care or emergency services.",
      backTop: "Back to top ↑",

      menuOpen: "Open menu",
      menuClose: "Close menu",
      accessOpen: "Open accessibility",
      accessClose: "Close accessibility",
      increaseFont: "Increase font",
      decreaseFont: "Decrease font",
      selectLanguage: "Select language",
      closeButton: "Close"
    },

    es: {
      skip: "Saltar al contenido",
      navHome: "Inicio",
      navAbout: "Sobre LIA",
      navHistory: "Nuestra historia",
      navViolence: "Violencias",
      navResources: "Recursos",
      navNews: "Noticias",
      navAccount: "Cuenta",
      languageLabel: "Idioma",

      accessEyebrow: "PERSONALIZA TU EXPERIENCIA",
      accessTitle: "Accesibilidad",
      fontSize: "Tamaño del texto",
      reset: "Predeterminado",
      theme: "Tema visual",
      lightTheme: "Claro",
      darkTheme: "Oscuro",
      contrast: "Alto contraste",
      readAloud: "Lectura en voz alta",
      accessNote: "Puedes cambiar los ajustes visuales en cualquier momento.",

      heroEyebrow: "NO ESTÁS SOLA",
      heroTitle: 'LIA es más que un sitio web, es una <span>red de apoyo.</span>',
      heroDescription: "Un espacio de información, acogida y orientación para mujeres que necesitan ser escuchadas, comprender sus derechos y encontrar caminos para vivir con más seguridad.",
      heroHelp: "Necesito apoyo",
      heroKnow: "Conoce LIA",
      heroNote: "Un espacio de información, respeto y acogida.",
      heroQuote: "¡Tienes derecho a ser feliz!",

      resourceKicker: "UN PASO A LA VEZ",
      resourceInfoTitle: "Información",
      resourceInfoText: "Conoce los tipos de violencia y reconoce las señales.",
      resourceSafetyTitle: "Seguridad",
      resourceSafetyText: "Encuentra orientación para planificar tu seguridad.",
      resourceSupportTitle: "Acogida",
      resourceSupportText: "Encuentra maneras de buscar apoyo.",
      resourceToolsTitle: "Recursos",
      resourceToolsText: "Conoce las herramientas de la plataforma.",

      aboutEyebrow: "SOBRE LIA",
      aboutTitle: "Una compañía virtual y un espacio de orientación.",
      aboutText: "LIA es un proyecto que reúne información, acogida y caminos para que las mujeres conozcan sus derechos e identifiquen recursos de apoyo. Su objetivo es facilitar el acceso a información importante en un entorno organizado y cuidadoso.",
      aboutPoint1: "Información accesible y organizada",
      aboutPoint2: "Orientación respetuosa y acogedora",
      aboutPoint3: "Información sobre recursos de seguridad",
      aboutPoint4: "Caminos para encontrar servicios de apoyo",
      aboutLink: "Descubre la historia de LIA",
      phoneMessage: "Mereces ser escuchada.",
      phoneInfo: "Información accesible",
      phoneGuidance: "Orientación acogedora",
      phoneSafety: "Recursos de seguridad",

      storyEyebrow: "NUESTRA HISTORIA",
      storyTitle: "De una idea nació una misión.",
      storyText: "LIA nació con el propósito de acercar a las mujeres a la información, la acogida y las vías de apoyo. Este proyecto busca mostrar cómo utilizar la tecnología responsablemente para facilitar el acceso a información importante.",
      storyButton: "Conoce la historia de LIA",

      violenceEyebrow: "LA INFORMACIÓN ES UN DERECHO",
      violenceTitle: "Toda forma de violencia debe ser reconocida.",
      violenceDescription: "Reconocer las señales puede ayudar a comprender una situación y buscar orientación. La responsabilidad de la violencia nunca es de la víctima.",
      physicalTitle: "Violencia física",
      physicalText: "Acciones que perjudican la integridad o la salud corporal.",
      psychTitle: "Violencia psicológica",
      psychText: "Amenazas, humillaciones, control y acciones que causan daño emocional.",
      sexualTitle: "Violencia sexual",
      sexualText: "Actos o situaciones que vulneran la libertad sexual.",
      propertyTitle: "Violencia patrimonial",
      propertyText: "Control, retención o destrucción de bienes, documentos y recursos.",
      moralTitle: "Violencia moral",
      moralText: "Conductas como calumnia, difamación e injuria.",
      digitalTitle: "Violencia digital",
      digitalText: "Abusos y amenazas realizados mediante recursos digitales.",
      vicariousTitle: "Violencia vicaria",
      vicariousText: "Violencia contra personas cercanas para causar sufrimiento a la mujer.",
      cycleTitle: "Ciclo de la violencia",
      cycleText: "Comprende patrones que pueden aparecer en relaciones abusivas.",
      learnMore: "Saber más",

      supportEyebrow: "MERECES SER ESCUCHADA",
      supportTitle: "No tienes que pasar por esto sola.",
      supportText: "Si necesitas orientación, existen servicios y personas que pueden ayudar. Elige el camino adecuado para tu situación, respetando tu tiempo y tu seguridad.",
      supportButton: "Conoce las opciones de apoyo",
      helplineTitle: "Llama al 180",
      helplineText: "Centro de Atención a la Mujer en Brasil",
      psychSupportTitle: "Apoyo psicológico",
      psychSupportText: "Información para encontrar apoyo",
      legalTitle: "Orientación jurídica",
      legalText: "Conoce las vías y los servicios de orientación",
      socialTitle: "Servicios sociales",
      socialText: "Encuentra información sobre atención",

      toolsEyebrow: "RECURSOS DE LA PLATAFORMA",
      toolsTitle: "Información y herramientas en un solo lugar.",
      toolsDescription: "Conoce los recursos previstos para organizar información y acceder a orientación útil.",
      discreetTitle: "Modo discreto",
      discreetText: "Conoce la propuesta de una interfaz con apariencia de agenda.",
      diaryTitle: "Diario personal",
      diaryText: "Conoce la propuesta para organizar notas personales.",
      trustedTitle: "Personas de confianza",
      trustedText: "Planifica cómo organizar los contactos que tú elijas.",

      safetyEyebrow: "TU SEGURIDAD IMPORTA",
      safetyTitle: "Información para tomar decisiones más seguras.",
      safetyText: "Si existe peligro inmediato, busca un lugar seguro y contacta con los servicios de emergencia cuando puedas hacerlo con seguridad.",
      safetyButton: "Orientación para emergencias",

      footerDescription: "Información, acogida y orientación para mujeres. Una iniciativa que cree en el poder del conocimiento.",
      footerExplore: "Explora",
      footerHelp: "Encuentra apoyo",
      footerProject: "El proyecto",
      projectLink: "Sobre el proyecto",
      collaboratorsLink: "Colaboradores",
      tutorialLink: "Tutorial del modo discreto",
      copyright: "Proyecto académico de información y orientación.",
      footerDisclaimer: "LIA es una plataforma informativa y no sustituye la atención profesional ni los servicios de emergencia.",
      backTop: "Volver al inicio ↑",

      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      accessOpen: "Abrir accesibilidad",
      accessClose: "Cerrar accesibilidad",
      increaseFont: "Aumentar fuente",
      decreaseFont: "Disminuir fuente",
      selectLanguage: "Seleccionar idioma",
      closeButton: "Cerrar"
    }
  };

  function readPreference(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // A página continua funcionando sem armazenamento local.
    }
  }

  let currentLanguage = readPreference("lia-language", "pt");
  if (!translations[currentLanguage]) currentLanguage = "pt";

  let fontSize = Number(readPreference("lia-font-size", "16"));
  if (!Number.isFinite(fontSize)) fontSize = 16;
  fontSize = Math.min(20, Math.max(14, fontSize));

  let toastTimeout;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3000);
  }

  function applyLanguage(language) {
    if (!translations[language]) language = "pt";

    currentLanguage = language;
    const dictionary = translations[language];

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.innerHTML = dictionary[key];
      }
    });

    $$("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (dictionary[key]) {
        element.setAttribute("aria-label", dictionary[key]);
      }
    });

    $$("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (dictionary[key]) {
        element.setAttribute("placeholder", dictionary[key]);
      }
    });

    document.documentElement.lang =
      language === "pt" ? "pt-BR" : language === "en" ? "en" : "es";

    if (languageSelect) languageSelect.value = language;

    if (accessibilityToggle) {
      accessibilityToggle.setAttribute("aria-label", dictionary.accessOpen);
    }

    if (accessibilityClose) {
      accessibilityClose.setAttribute("aria-label", dictionary.closeButton);
    }

    $("#fontIncrease")?.setAttribute("aria-label", dictionary.increaseFont);
    $("#fontDecrease")?.setAttribute("aria-label", dictionary.decreaseFont);

    languageSelect?.setAttribute("aria-label", dictionary.selectLanguage);

    savePreference("lia-language", language);
    updateSpeechLanguage();
  }

  function applyTheme(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "light";

    document.body.dataset.theme = selectedTheme;
    document.documentElement.dataset.theme = selectedTheme;

    if (themeSelect) themeSelect.value = selectedTheme;

    savePreference("lia-theme", selectedTheme);
  }

  function applyFontSize(size) {
    fontSize = Math.min(20, Math.max(14, size));

    document.documentElement.style.setProperty(
      "--base-font",
      `${fontSize}px`
    );

    savePreference("lia-font-size", String(fontSize));
  }

  function applyContrast(enabled) {
    document.body.classList.toggle("high-contrast", enabled);
    document.documentElement.classList.toggle("high-contrast", enabled);

    if (contrastToggle) contrastToggle.checked = enabled;

    savePreference("lia-contrast", enabled ? "on" : "off");
  }

  function closeAccessibilityPanel() {
    if (!accessibilityPanel || !accessibilityToggle) return;

    accessibilityPanel.hidden = true;
    accessibilityToggle.setAttribute("aria-expanded", "false");
  }

  function updateSpeechLanguage() {
    const voiceLanguages = {
      pt: "pt-BR",
      en: "en-US",
      es: "es-ES"
    };

    document.documentElement.dataset.speechLanguage =
      voiceLanguages[currentLanguage] || "pt-BR";

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function speakPage() {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      const messages = {
        pt: "Este navegador não oferece suporte à leitura em voz alta.",
        en: "Speech reading is not supported in this browser.",
        es: "Este navegador no admite la lectura en voz alta."
      };

      showToast(messages[currentLanguage]);

      if (speechToggle) speechToggle.checked = false;
      return;
    }

    window.speechSynthesis.cancel();

    const content = $("#conteudo");
    if (!content) return;

    const text = content.innerText.trim();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =
      document.documentElement.dataset.speechLanguage || "pt-BR";
    utterance.rate = 0.92;

    utterance.onend = () => {
      if (speechToggle) speechToggle.checked = false;
    };

    utterance.onerror = () => {
      if (speechToggle) speechToggle.checked = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  // Inicializa as preferências salvas.
  applyLanguage(currentLanguage);
  applyFontSize(fontSize);
  applyTheme(readPreference("lia-theme", "light"));
  applyContrast(readPreference("lia-contrast", "off") === "on");

  if ($("#currentYear")) {
    $("#currentYear").textContent = new Date().getFullYear();
  }

  // Fecha os painéis com Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAccessibilityPanel();
    }
  });

  // Painel de acessibilidade.
  accessibilityToggle?.addEventListener("click", () => {
    if (!accessibilityPanel) return;

    const willOpen = accessibilityPanel.hidden;
    accessibilityPanel.hidden = !willOpen;

    accessibilityToggle.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) accessibilityClose?.focus();
  });

  accessibilityClose?.addEventListener("click", () => {
    closeAccessibilityPanel();
    accessibilityToggle?.focus();
  });

  document.addEventListener("click", (event) => {
    if (
      accessibilityPanel &&
      !accessibilityPanel.hidden &&
      !accessibilityPanel.contains(event.target) &&
      accessibilityToggle &&
      !accessibilityToggle.contains(event.target)
    ) {
      closeAccessibilityPanel();
    }
  });

  // Troca de idioma.
  languageSelect?.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
  });

  // Tema claro ou escuro.
  themeSelect?.addEventListener("change", () => {
    applyTheme(themeSelect.value);
  });

  // Tamanho do texto.
  $("#fontIncrease")?.addEventListener("click", () => {
    applyFontSize(fontSize + 1);
  });

  $("#fontDecrease")?.addEventListener("click", () => {
    applyFontSize(fontSize - 1);
  });

  $("#fontReset")?.addEventListener("click", () => {
    applyFontSize(16);
  });

  // Alto contraste.
  contrastToggle?.addEventListener("change", () => {
    applyContrast(contrastToggle.checked);
  });

  // Leitura em voz alta.
  speechToggle?.addEventListener("change", () => {
    if (speechToggle.checked) {
      speakPage();
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  // Interrompe a leitura ao sair da página.
  window.addEventListener("pagehide", () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  // Tela de boas-vindas e primeiro acesso.
  const welcomeScreen = $("#welcomeScreen");

  if (welcomeScreen) {
    const welcomeTitle = $("#welcomeTitle");
    const welcomeMessage = $(".welcome-message");
    const welcomePhrase = $("#welcomePhrase");
    const welcomeContinue = $("#welcomeContinue");
    const welcomePrivacy = $(".welcome-privacy");

    // Remove a opção de entrar sem criar uma conta.
    welcomeContinue?.remove();

    // Atualiza o texto da apresentação.
    if (welcomeTitle) {
      welcomeTitle.textContent = "Bem-vinda à LIA!";
    }

    if (welcomeMessage) {
      welcomeMessage.textContent =
        "Este espaço foi pensado com carinho para acolher você. Aqui, informação, respeito e orientação caminham juntos. Você merece ser ouvida, respeitada e viver com segurança.";
    }

    if (welcomePrivacy) {
      welcomePrivacy.textContent =
        "Crie sua conta para acessar a plataforma e conhecer os recursos da LIA.";
    }

    const phrases = [
      "Você não precisa ter todas as respostas hoje.",
      "Sua voz importa. Seus sentimentos importam.",
      "Você merece respeito, segurança e tranquilidade.",
      "Pedir ajuda não é fraqueza. Você merece acolhimento.",
      "Um pequeno passo também é um começo.",
      "Você merece ser tratada com carinho e respeito."
    ];

    if (welcomePhrase) {
      const index = Math.floor(Math.random() * phrases.length);
      welcomePhrase.textContent = phrases[index];
    }

    let accountCreated = false;

    try {
      accountCreated =
        localStorage.getItem("lia-account-created") === "true";
    } catch {
      accountCreated = false;
    }

    // Sem cadastro: mantém a tela de boas-vindas visível.
    // Com cadastro: libera a página inicial.
    // ATUALIZAÇÃO 16/11 - cadastro existente não significa sessão ativa.
    welcomeScreen.hidden = Boolean(window.LIAAuthDemo && window.LIAAuthDemo.atual());
  }
});
