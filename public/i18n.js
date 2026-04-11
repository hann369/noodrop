/* ═══════════════════════════════════════════════════════════════
   Metacognition — i18n.js  v2.0
   All locales INLINE — no external JSON files, no 404s.
   Works on file://, localhost, Vercel — everywhere.
═══════════════════════════════════════════════════════════════ */
(function(global){

  var STORAGE_KEY = 'nd_lang';
  var DEFAULT     = 'en';
  var SUPPORTED   = ['en','de','pt'];
  var COUNTRY_LANG = {
    DE:'de',AT:'de',CH:'de',LI:'de',LU:'de',
    PT:'pt',BR:'pt',AO:'pt',MZ:'pt',CV:'pt',GW:'pt',ST:'pt',TL:'pt'
  };
  var FLAGS = {en:'🇬🇧',de:'🇩🇪',pt:'🇧🇷'};

  /* ─────────────────────────────────────────────────────────────
     LOCALES
  ───────────────────────────────────────────────────────────── */
  var L = {
    en:{
      nav:{home:'Home',library:'Library',stacks:'Stacks',skillmaxxing:'Skillmaxxing',blog:'Blog',marketplace:'Marketplace',nooai:'NooAI',login:'Login',getStarted:'Get started'},
      landing:{
        heroKicker:'Brain health & optimization',
        heroSub:'Research-backed tools for people serious about what goes in — and what stays out — of their brain.',
        heroCta1:'Explore the library',heroCta2:'Build a stack',
        statCompounds:'Compounds',statStudies:'Studies cited',statAccess:'Early access',
        pillarsEyebrow:'What we cover',
        pillarsH2:'Five pillars of brain health.',
        pillarsSub:'From what you take to what you avoid — every variable that shapes how your brain performs.',
        pillar1Desc:'Evidence-graded compounds for cognition, memory, focus, and neuroprotection.',
        pillar1Tag:'Compound library →',
        pillar2Desc:'Heavy metals, solvents, pesticides. What damages neural tissue and how to reduce exposure.',
        pillar2Tag:'Threat index',
        pillar3Desc:'Emerging evidence on BBB penetration, neuroinflammation, and long-term accumulation.',
        pillar3Tag:'Exposure guide',
        pillar4Desc:'Sleep, stress, exercise, nutrition. The foundations no supplement can replace.',
        pillar4Tag:'Protocols',
        pillar5Desc:'Synergies, interactions, timing. Build protocols that work together, not against each other.',
        pillar5Tag:'Stack builder →',
        threatsEyebrow:'What to avoid',
        threatsH2:'Optimization starts with subtraction.',
        threatsSub:'The biggest gains often come from removing threats, not adding supplements.',
        compoundsEyebrow:'Compound library',
        compoundsH2:'What actually works.',
        viewAll:'View full library →',
        stackEyebrow:'Stack builder',
        stackH2:'Your stack. Your protocol.',
        stackSub:'Build compound stacks based on your goals, check interactions, and get dosing windows — all in one place.',
        stackCta:'Build your stack',
        reviewsH2:'Real users. Real protocols.',
        closingEyebrow:'A note on who this is for',
        closingH2:"This isn't for everyone.",
        closingCta:'Start researching'
      },
      index:{
        heroH1:'Explore the library.',
        buildStack:'Build a stack',marketplace:'Marketplace →',loading:'Loading compounds…',
        catAll:'All',catRacetams:'Racetams',catCholinergics:'Cholinergics',
        catStimulants:'Stimulants',catAdaptogens:'Adaptogens',catMisc:'Miscellaneous'
      },
      hero_sub:"No marketing claims. Only compounds proven in clinical studies. Your personal stack in 2 minutes.",
      hero_cta:"Find my stack",
      hero_trust:"Free · No account required · Based on PubMed data",
      quiz_step_label:"Step {n} of 5",
      quiz_next:"Continue",
      quiz_back:"Back",
      quiz_loading:"Calculating your stack…",
      result_email_headline:"Where should we send your stack?",
      result_email_cta:"Get Stack",
      result_skip:"Skip →",
      blog:{
        eyebrow:'Metacognition · Research & Insights',
        h1:'Deep dives. Evidence first. No fluff.',
        sub:"Research breakdowns, protocol guides, and skillmaxxing science — written for people who actually want to understand what they're putting in their brain.",
        tabAll:'All Posts',tabNootropics:'Nootropics',tabSkillmaxxing:'Skillmaxxing',
        tabScience:'Science',tabProtocols:'Protocols',
        readArticle:'Read article →',latestPosts:'Latest Posts',
        nlH2:'Stay <strong>sharp.</strong>',
        nlSub:'New research, protocol updates, and compound breakdowns — straight to your inbox. No spam.',
        nlPlaceholder:'your@email.com',nlBtn:'Subscribe →',
        noPostsTitle:'No posts yet.',noPostsSub:'First articles are on the way.',minRead:'min read'
      },
      post:{
        backToBlog:'Back to Blog',morePosts:'More from the Lab',minRead:'min read',
        notFound:'Post not found.',notFoundSub:'This article may have been removed or the link is wrong.',
        loadError:'Could not load article.',loadErrorSub:'Check your connection and try again.'
      },
      common:{
        cookieNotice:'We use cookies to improve your experience.',
        accept:'Accept',impressum:'Impressum',copyright:'© 2026 Metacognition · Educational purposes only.'
      }
    },
    de:{
      nav:{home:'Start',library:'Bibliothek',stacks:'Stacks',skillmaxxing:'Skillmaxxing',blog:'Blog',marketplace:'Marktplatz',nooai:'NooAI',login:'Anmelden',getStarted:'Loslegen'},
      landing:{
        heroKicker:'Gehirngesundheit & Optimierung',
        heroSub:'Evidenzbasierte Tools für Menschen, die es genau nehmen — was ins Gehirn kommt und was draußen bleibt.',
        heroCta1:'Bibliothek erkunden',heroCta2:'Stack aufbauen',
        statCompounds:'Substanzen',statStudies:'Zitierte Studien',statAccess:'Früher Zugang',
        pillarsEyebrow:'Was wir abdecken',
        pillarsH2:'Fünf Säulen der Gehirngesundheit.',
        pillarsSub:'Von dem, was du nimmst, bis zu dem, was du vermeidest — jede Variable, die deine Gehirnleistung beeinflusst.',
        pillar1Desc:'Evidenzbasierte Substanzen für Kognition, Gedächtnis, Fokus und Neuroprotektion.',
        pillar1Tag:'Substanzbibliothek →',
        pillar2Desc:'Schwermetalle, Lösungsmittel, Pestizide. Was neuronales Gewebe schädigt und wie man die Exposition reduziert.',
        pillar2Tag:'Bedrohungsindex',
        pillar3Desc:'Neue Erkenntnisse zu BHS-Penetration, Neuroinflammation und Langzeitakkumulation.',
        pillar3Tag:'Expositionsleitfaden',
        pillar4Desc:'Schlaf, Stress, Sport, Ernährung. Die Grundlagen, die kein Supplement ersetzen kann.',
        pillar4Tag:'Protokolle',
        pillar5Desc:'Synergien, Interaktionen, Timing. Protokolle aufbauen, die zusammenwirken.',
        pillar5Tag:'Stack Builder →',
        threatsEyebrow:'Was zu vermeiden ist',
        threatsH2:'Optimierung beginnt mit Weglassen.',
        threatsSub:'Die größten Gewinne entstehen oft durch das Entfernen von Bedrohungen, nicht durch das Hinzufügen von Supplements.',
        compoundsEyebrow:'Substanzbibliothek',
        compoundsH2:'Was wirklich funktioniert.',
        viewAll:'Gesamte Bibliothek →',
        stackEyebrow:'Stack Builder',
        stackH2:'Dein Stack. Dein Protokoll.',
        stackSub:'Substanz-Stacks nach deinen Zielen zusammenstellen, Interaktionen prüfen und Dosierungsfenster erhalten.',
        stackCta:'Stack aufbauen',
        reviewsH2:'Echte Nutzer. Echte Protokolle.',
        closingEyebrow:'Ein Hinweis: für wen das ist',
        closingH2:'Das ist nicht für jeden.',
        closingCta:'Recherche starten'
      },
      index:{
        heroH1:'Die Bibliothek erkunden.',
        buildStack:'Stack aufbauen',marketplace:'Marktplatz →',loading:'Substanzen werden geladen…',
        catAll:'Alle',catRacetams:'Racetame',catCholinergics:'Cholinerga',
        catStimulants:'Stimulanzien',catAdaptogens:'Adaptogene',catMisc:'Sonstiges'
      },
      hero_sub:"Keine Marketing-Versprechen. Nur Compounds, die in klinischen Studien funktionieren. Dein persönlicher Stack in 2 Minuten.",
      hero_cta:"Stack finden",
      hero_trust:"Kostenlos · Kein Account nötig · Basiert auf PubMed-Daten",
      quiz_step_label:"Schritt {n} von 5",
      quiz_next:"Weiter",
      quiz_back:"Zurück",
      quiz_loading:"Dein Stack wird berechnet...",
      result_email_headline:"Wohin sollen wir deinen Stack schicken?",
      result_email_cta:"Stack erhalten",
      result_skip:"Überspringen →",
      blog:{
        eyebrow:'Metacognition · Forschung & Einblicke',
        h1:'Tiefe Einblicke. Evidenz zuerst. Kein Füllstoff.',
        sub:'Forschungsanalysen, Protokollführer und Skillmaxxing-Wissenschaft — für Menschen, die wirklich verstehen wollen, was sie in ihr Gehirn stecken.',
        tabAll:'Alle Beiträge',tabNootropics:'Nootropika',tabSkillmaxxing:'Skillmaxxing',
        tabScience:'Wissenschaft',tabProtocols:'Protokolle',
        readArticle:'Artikel lesen →',latestPosts:'Neueste Beiträge',
        nlH2:'Bleib <strong>scharf.</strong>',
        nlSub:'Neue Forschung, Protokoll-Updates und Substanz-Analysen — direkt in dein Postfach. Kein Spam.',
        nlPlaceholder:'deine@email.com',nlBtn:'Abonnieren →',
        noPostsTitle:'Noch keine Beiträge.',noPostsSub:'Die ersten Artikel kommen bald.',minRead:'Min. Lesezeit'
      },
      post:{
        backToBlog:'Zurück zum Blog',morePosts:'Mehr aus dem Labor',minRead:'Min. Lesezeit',
        notFound:'Beitrag nicht gefunden.',notFoundSub:'Dieser Artikel wurde möglicherweise entfernt oder der Link ist falsch.',
        loadError:'Artikel konnte nicht geladen werden.',loadErrorSub:'Überprüfe deine Verbindung und versuche es erneut.'
      },
      common:{
        cookieNotice:'Wir verwenden Cookies, um deine Erfahrung zu verbessern.',
        accept:'Akzeptieren',impressum:'Impressum',copyright:'© 2026 Metacognition · Nur zu Bildungszwecken.'
      }
    },
    pt:{
      nav:{home:'Início',library:'Biblioteca',stacks:'Stacks',skillmaxxing:'Skillmaxxing',blog:'Blog',marketplace:'Marketplace',nooai:'NooAI',login:'Entrar',getStarted:'Começar'},
      landing:{
        heroKicker:'Saúde cerebral e otimização',
        heroSub:'Ferramentas baseadas em evidências para pessoas sérias sobre o que entra — e o que fica de fora — do cérebro.',
        heroCta1:'Explorar a biblioteca',heroCta2:'Criar stack',
        statCompounds:'Compostos',statStudies:'Estudos citados',statAccess:'Acesso antecipado',
        pillarsEyebrow:'O que cobrimos',
        pillarsH2:'Cinco pilares da saúde cerebral.',
        pillarsSub:'Do que você toma ao que você evita — cada variável que molda o desempenho do seu cérebro.',
        pillar1Desc:'Compostos com grau de evidência para cognição, memória, foco e neuroproteção.',
        pillar1Tag:'Biblioteca de compostos →',
        pillar2Desc:'Metais pesados, solventes, pesticidas. O que danifica o tecido neural e como reduzir a exposição.',
        pillar2Tag:'Índice de ameaças',
        pillar3Desc:'Evidências emergentes sobre penetração na BHE, neuroinflamação e acumulação a longo prazo.',
        pillar3Tag:'Guia de exposição',
        pillar4Desc:'Sono, estresse, exercício, nutrição. As bases que nenhum suplemento pode substituir.',
        pillar4Tag:'Protocolos',
        pillar5Desc:'Sinergias, interações, timing. Construa protocolos que funcionem juntos.',
        pillar5Tag:'Stack Builder →',
        threatsEyebrow:'O que evitar',
        threatsH2:'A otimização começa pela subtração.',
        threatsSub:'Os maiores ganhos muitas vezes vêm de remover ameaças, não de adicionar suplementos.',
        compoundsEyebrow:'Biblioteca de compostos',
        compoundsH2:'O que realmente funciona.',
        viewAll:'Ver biblioteca completa →',
        stackEyebrow:'Stack Builder',
        stackH2:'Seu stack. Seu protocolo.',
        stackSub:'Monte stacks com base nos seus objetivos, verifique interações e obtenha janelas de dosagem.',
        stackCta:'Criar meu stack',
        reviewsH2:'Usuários reais. Protocolos reais.',
        closingEyebrow:'Uma nota sobre para quem isso é',
        closingH2:'Isso não é para todos.',
        closingCta:'Começar a pesquisar'
      },
      index:{
        heroH1:'Explorar a biblioteca.',
        buildStack:'Criar stack',marketplace:'Marketplace →',loading:'Carregando compostos…',
        catAll:'Todos',catRacetams:'Racetams',catCholinergics:'Colinérgicos',
        catStimulants:'Estimulantes',catAdaptogens:'Adaptógenos',catMisc:'Diversos'
      },
      hero_sub:"Sem promessas de marketing. Apenas compostos comprovados em estudos clínicos. Seu stack pessoal em 2 minutos.",
      hero_cta:"Encontrar meu stack",
      hero_trust:"Grátis · Sem necessidade de conta · Baseado em dados PubMed",
      quiz_step_label:"Passo {n} de 5",
      quiz_next:"Continuar",
      quiz_back:"Voltar",
      quiz_loading:"Calculando seu stack…",
      result_email_headline:"Para onde devemos enviar seu stack?",
      result_email_cta:"Receber Stack",
      result_skip:"Pular →",
      blog:{
        eyebrow:'Metacognition · Pesquisa & Insights',
        h1:'Análises profundas. Evidências primeiro. Sem enrolação.',
        sub:'Análises de pesquisa, guias de protocolo e ciência de skillmaxxing — para pessoas que querem entender o que estão colocando no cérebro.',
        tabAll:'Todos os posts',tabNootropics:'Nootrópicos',tabSkillmaxxing:'Skillmaxxing',
        tabScience:'Ciência',tabProtocols:'Protocolos',
        readArticle:'Ler artigo →',latestPosts:'Posts recentes',
        nlH2:'Fique <strong>afiado.</strong>',
        nlSub:'Novas pesquisas, atualizações de protocolos e análises — diretamente na sua caixa de entrada. Sem spam.',
        nlPlaceholder:'seu@email.com',nlBtn:'Inscrever-se →',
        noPostsTitle:'Nenhum post ainda.',noPostsSub:'Os primeiros artigos estão a caminho.',minRead:'min de leitura'
      },
      post:{
        backToBlog:'Voltar ao Blog',morePosts:'Mais do Laboratório',minRead:'min de leitura',
        notFound:'Post não encontrado.',notFoundSub:'Este artigo pode ter sido removido ou o link está errado.',
        loadError:'Não foi possível carregar o artigo.',loadErrorSub:'Verifique sua conexão e tente novamente.'
      },
      common:{
        cookieNotice:'Usamos cookies para melhorar sua experiência.',
        accept:'Aceitar',impressum:'Aviso Legal',copyright:'© 2026 Metacognition · Apenas para fins educacionais.'
      }
    }
  };

  /* ─────────────────────────────────────────────────────────────
     CORE
  ───────────────────────────────────────────────────────────── */
  var _lang  = DEFAULT;
  var _ready = false;
  var _queue = [];

  function t(key, lang) {
    var locale = L[lang || _lang] || L[DEFAULT];
    var parts  = key.split('.');
    var val    = locale;
    for (var i = 0; i < parts.length; i++) {
      if (val == null) return key;
      val = val[parts[i]];
    }
    return (val != null) ? String(val) : key;
  }

  function translateDOM() {
    document.documentElement.lang = _lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var v = t(el.getAttribute('data-i18n'));
      if (v && v !== el.getAttribute('data-i18n')) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var v = t(el.getAttribute('data-i18n-html'));
      if (v && v !== el.getAttribute('data-i18n-html')) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var v = t(el.getAttribute('data-i18n-placeholder'));
      if (v && v !== el.getAttribute('data-i18n-placeholder')) el.placeholder = v;
    });
    document.dispatchEvent(new CustomEvent('nd:translated',{detail:{lang:_lang}}));
  }

  /* ─────────────────────────────────────────────────────────────
     SWITCHER
  ───────────────────────────────────────────────────────────── */
  function buildSwitcher() {
    if (document.getElementById('nd-lang-switcher')) return;
    var anchor = document.getElementById('navRight')
               || document.querySelector('.nd-header__right');
    if (!anchor) return;

    var wrap = document.createElement('div');
    wrap.id = 'nd-lang-switcher';
    wrap.style.cssText = 'display:flex;align-items:center;gap:2px;margin-right:8px;flex-shrink:0;';

    SUPPORTED.forEach(function(lang){
      var btn = document.createElement('button');
      btn.setAttribute('data-lang', lang);
      btn.setAttribute('aria-label', lang.toUpperCase());
      btn.textContent = FLAGS[lang] + '\u00A0' + lang.toUpperCase();
      btn.className = 'nd-lang-btn' + (lang === _lang ? ' nd-lang-active' : '');
      btn.addEventListener('click', function(){ setLang(lang); });
      wrap.appendChild(btn);
    });

    anchor.insertBefore(wrap, anchor.firstChild);

    if (!document.getElementById('nd-i18n-css')) {
      var s = document.createElement('style');
      s.id = 'nd-i18n-css';
      s.textContent =
        '.nd-lang-btn{background:none;border:none;cursor:pointer;font-size:12px;font-weight:400;' +
        'letter-spacing:.04em;padding:4px 7px;border-radius:6px;color:rgba(245,240,232,.36);' +
        'transition:color .15s,background .15s;font-family:inherit;line-height:1;}' +
        '.nd-lang-btn:hover{color:rgba(245,240,232,.75);background:rgba(245,240,232,.07);}' +
        '.nd-lang-btn.nd-lang-active{color:var(--orange,#E8541A);background:rgba(232,84,26,.1);}' +
        'body.light .nd-lang-btn{color:rgba(20,20,18,.35);}' +
        'body.light .nd-lang-btn:hover{color:rgba(20,20,18,.72);background:rgba(20,20,18,.06);}' +
        'body.light .nd-lang-btn.nd-lang-active{color:var(--orange,#E8541A);}';
      document.head.appendChild(s);
    }
  }

  function updateSwitcher() {
    document.querySelectorAll('.nd-lang-btn').forEach(function(btn){
      btn.classList.toggle('nd-lang-active', btn.getAttribute('data-lang') === _lang);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     DETECTION
  ───────────────────────────────────────────────────────────── */
  function detect(cb) {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return cb(stored);

    var browser  = ((navigator.language || navigator.userLanguage || 'en').split('-')[0]).toLowerCase();
    var fallback = SUPPORTED.indexOf(browser) !== -1 ? browser : DEFAULT;

    var done  = false;
    var timer = setTimeout(function(){
      if (!done){ done=true; cb(fallback); }
    }, 1400);

    fetch('https://ipapi.co/json/')
      .then(function(r){ return r.json(); })
      .then(function(d){
        if (done) return;
        done=true; clearTimeout(timer);
        cb(COUNTRY_LANG[((d&&d.country_code)||'').toUpperCase()] || fallback);
      })
      .catch(function(){
        if (done) return;
        done=true; clearTimeout(timer);
        cb(fallback);
      });
  }

  /* ─────────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────────── */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    _lang = lang; _ready = true;
    localStorage.setItem(STORAGE_KEY, lang);
    translateDOM();
    updateSwitcher();
  }

  function init() {
    detect(function(lang){
      _lang = lang; _ready = true;
      translateDOM();
      buildSwitcher();
      _queue.forEach(function(fn){ fn(t); });
      _queue = [];
    });
  }

  function onReady(fn) {
    if (_ready) fn(t); else _queue.push(fn);
  }

  global.i18n = {
    init:init, t:t, setLang:setLang, onReady:onReady,
    getLang:function(){ return _lang; },
    supported:SUPPORTED
  };

})(window);
