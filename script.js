const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const sendBtn = document.getElementById("sendBtn");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const formStatus = document.getElementById("formStatus");
const contactForm = document.querySelector(".contact-form");
const langToggle = document.getElementById("langToggle");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const currentPath = window.location.pathname.split("/").pop() || "index.html";
const gaMeasurementId = document
  .querySelector('meta[name="ga4-measurement-id"]')
  ?.getAttribute("content")
  ?.trim();

const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
};

const uiTranslations = {
  ar: {
    "nav.home": "الشاشة الرئيسية",
    "nav.services": "الخدمات",
    "nav.portfolio": "الأعمال",
    "nav.pricing": "الباقات",
    "nav.work": "طريقة العمل",
    "nav.faq": "الأسئلة",
    "nav.about": "من نحن",
    "nav.contact": "تواصل",
    "nav.cta": "احجز استشارة",
    menuLabel: "فتح القائمة",
    toggleLabel: "Switch to English",
    toggleText: "EN",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Work",
    "nav.pricing": "Pricing",
    "nav.work": "Process",
    "nav.faq": "FAQ",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Book a Call",
    menuLabel: "Open menu",
    toggleLabel: "التبديل إلى العربية",
    toggleText: "AR",
  },
};

const formMessages = {
  ar: {
    missing: "يرجى تعبئة الاسم والجوال وتفاصيل المشروع.",
    invalidPhone: "رقم الجوال غير صالح. أدخل رقمًا صحيحًا.",
    openingWhatsapp: "جاري فتح واتساب...",
    whatsappIntro: "مرحبًا TCG، لدي مشروع جديد.",
    fieldName: "الاسم",
    fieldPhone: "الجوال",
    fieldService: "الخدمة",
    fieldDetails: "تفاصيل المشروع",
  },
  en: {
    missing: "Please fill in your name, phone number, and project details.",
    invalidPhone: "The phone number is invalid. Please enter a valid number.",
    openingWhatsapp: "Opening WhatsApp...",
    whatsappIntro: "Hello TCG, I have a new project.",
    fieldName: "Name",
    fieldPhone: "Phone",
    fieldService: "Service",
    fieldDetails: "Project details",
  },
};

const pageContentTranslations = {
  "index.html": [
    { selector: "title", mode: "text", en: "TCG - Web Design and App Development in Libya" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "The Code Gate (TCG) is a Libya-based digital studio focused on websites, mobile apps, and WhatsApp automation." },
    { selector: ".hero-scene-copy .badge", en: "Integrated tech solutions in Libya" },
    { selector: ".hero-scene-copy h1", en: "We build a real digital product, not a decorative website" },
    { selector: ".hero-copy", en: "At TCG, we focus on outcomes: stronger speed, better conversion, and a user experience that supports real growth." },
    { selector: ".hero-scene-copy .btn-primary", en: "Start Your Project" },
    { selector: ".hero-scene-copy .btn-secondary", en: "Browse Services" },
    { selector: ".hero-trust", mode: "html", en: "<span>⎯</span> 120+ successful projects • 98% on-time delivery • Ongoing technical support" },
    { selector: ".hero-locations", mode: "html", en: "<span>⌖</span> Serving Tripoli, Benghazi, Misrata, and all of Libya" },
    { selector: ".home-service-deck .section-title", en: "Choose the section you need" },
    { selector: ".home-service-card strong", en: ["Services", "Work", "Pricing", "OTP Service"] },
    { selector: ".home-service-card p", en: [
      "All TCG digital services in one place: web, mobile, automation, and integrations.",
      "Execution samples and project patterns that show the quality of experience and outcomes you can reach.",
      "Flexible plans for small, growing, and custom implementation needs.",
      "One-time password solutions for signup, login, and transaction verification inside your digital products."
    ] },
    { selector: ".home-service-link", en: ["Explore", "Explore", "Explore", "Explore"] },
    { selector: ".home-insight-copy .badge", en: "Why TCG" },
    { selector: ".home-insight-copy h2", en: "We turn an idea into a digital experience built to grow" },
    { selector: ".home-insight-copy p", en: "We do not just build an interface. We design the full journey across brand, performance, usability, and scalability as your project grows." },
    { selector: ".home-insight-card strong", en: ["Clearer design", "Faster execution", "Future-ready growth"] },
    { selector: ".home-insight-card p", en: [
      "Well-structured interfaces make the product easier to understand and guide users toward the right action.",
      "An organized system reduces complexity during delivery and helps launch faster.",
      "We build the website or app so new services and integrations can be added later without rebuilding from zero."
    ] },
    { selector: ".home-metric-card span", en: ["Projects delivered", "On-time commitment", "Support and scale readiness", "Flexible system integrations"] },
    { selector: ".home-process-copy .badge", en: "Process" },
    { selector: ".home-process-copy h2", en: "A clear path from idea to launch" },
    { selector: ".home-process-copy p", en: "We split execution into short, understandable stages so the next step is always clear." },
    { selector: ".home-process-card strong", en: ["Understand the need", "Design the experience", "Build and integrate", "Launch and improve"] },
    { selector: ".home-process-card p", en: [
      "We gather the details and define the business and technical target with precision.",
      "We organize the content, interfaces, and user flow before building.",
      "We implement the interface, logic, and integrations on top of a stable structure.",
      "We launch the product, monitor performance, and improve results after release."
    ] },
    { selector: ".home-cta-shell .badge", en: "Ready to begin?" },
    { selector: ".home-cta-shell h2", en: "If you have an idea or an existing project, we can turn it into a clear execution plan." },
    { selector: ".home-cta-shell .btn-primary", en: "Book a Call" },
    { selector: ".home-cta-shell .btn-secondary", en: "See Work" },
    { selector: ".footer-brand p", en: "We build modern digital experiences in Libya that combine design, performance, and business outcomes." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Services", "Work", "Pricing", "Contact"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Process", "FAQ", "About", "WhatsApp Direct"] },
    { selector: ".floating-wa", en: "WhatsApp" },
    { selector: ".floating-wa", mode: "attr", attr: "aria-label", en: "Contact on WhatsApp" },
    { selector: "#scrollTopBtn", mode: "attr", attr: "aria-label", en: "Back to top" },
  ],
  "services.html": [
    { selector: "title", mode: "text", en: "Services | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "TCG digital services in Libya: web development, mobile apps, and WhatsApp automation." },
    { selector: ".studio-hero-copy h1", en: "Services organized like a digital product system, not a generic list" },
    { selector: ".studio-hero-copy p", en: "Each path here is built around a clear outcome: acquiring customers, operating a service, automating workflows, or building a scalable product." },
    { selector: ".studio-actions .btn-primary", en: "Start Your Project" },
    { selector: ".studio-actions .btn-secondary", en: "Compare Plans" },
    { selector: ".studio-section-head h2", en: ["Choose the track that matches your current stage", "What makes our service delivery different"] },
    { selector: ".studio-link-card h3", en: ["Web Development", "Mobile Apps", "WhatsApp Bots", "OTP Service", "Custom Solution"] },
    { selector: ".studio-link-card p", en: [
      "Corporate websites, landing pages, dashboards, and user experiences built for speed, clarity, and conversion.",
      "Mobile products for bookings, orders, daily workflows, or delivering a complete service on iOS and Android.",
      "Automated conversations, order intake, categorization, and routing into the team or internal system without manual load.",
      "One-time password delivery for signup, login, and transaction verification flows across your apps and platforms.",
      "If your project spans multiple channels, we define the right scope, plan, and launch phase before execution."
    ] },
    { selector: ".studio-link-arrow", en: ["Explore", "Explore", "Explore", "Explore", "Book a Session"] },
    { selector: ".studio-grid-3 .studio-card h3", en: ["Planning before delivery", "Intentional integrations", "Ready to scale"] },
    { selector: ".studio-grid-3 .studio-card p", en: [
      "We start from the real business goal and define flows, screens, and priorities before building.",
      "The service is not built in isolation. We connect it with WhatsApp, CRM, or API only when it creates real value.",
      "Even if you start small, the structure stays ready to grow instead of forcing a full rebuild later."
    ] },
    { selector: ".footer-brand p", en: "We turn each service into a clear execution path that can be measured and improved." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Services", "Work", "Pricing", "Process"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["FAQ", "About", "Contact", "WhatsApp Direct"] },
  ],
  "portfolio.html": [
    { selector: "title", mode: "text", en: "Work | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "Selected project patterns and digital product execution examples from TCG." },
    { selector: ".studio-hero-copy h1", en: "Work presented as systems and outcomes, not static images" },
    { selector: ".studio-hero-copy p", en: "Instead of a conventional gallery, this page shows the kinds of products we actually build: platforms, apps, automation, and operating dashboards." },
    { selector: ".studio-actions .btn-primary", en: "Request a Similar Project" },
    { selector: ".studio-actions .btn-secondary", en: "Back to Services" },
    { selector: ".studio-metric-card span", en: ["Delivery patterns", "Operating tracks", "Product team"] },
    { selector: ".studio-case-card h3", en: ["Corporate Services Site", "Booking App", "WhatsApp Bot", "Landing Pages", "Internal Operations Dashboard", "API Integration"] },
    { selector: ".studio-case-card p", en: [
      "A strong marketing interface with conversion pages and an internal tracking layer for the commercial team.",
      "A short booking flow, direct notifications, and flexible appointment management inside the app.",
      "Order intake, classification, and routing without manual repetition or lost conversations.",
      "Pages focused on campaigns and ads with content that pushes toward one clear next step.",
      "Tracking for status, requests, team workload, and priorities inside a clear daily management interface.",
      "Connections between digital channels and internal systems so the product works as one operating ecosystem."
    ] },
    { selector: ".studio-section-head h2", en: "How we read the project before we build it" },
    { selector: ".studio-grid-2 .studio-card h3", en: ["Clear commercial goal", "Product maturity level"] },
    { selector: ".studio-grid-2 .studio-card p", en: [
      "We do not build an interface in isolation. We define whether the goal is lead generation, faster ordering, or smoother internal operations.",
      "Is it a quick MVP, an operating platform, or an automation layer? That changes scope and design decisions immediately."
    ] },
    { selector: ".footer-brand p", en: "We present work as operating patterns and likely outcomes, not a collection of similar screenshots." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Work", "Services", "Pricing", "Process"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["FAQ", "About", "Contact", "WhatsApp Direct"] },
  ],
  "pricing.html": [
    { selector: "title", mode: "text", en: "Pricing | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "TCG pricing tiers designed around your growth stage, from launch to scale and custom execution." },
    { selector: ".studio-hero-copy h1", en: "Plans built around growth stage, not random feature lists" },
    { selector: ".studio-hero-copy p", en: "This page is designed to simplify the decision: what fits a new project, what fits expansion, and when a custom plan is the right path." },
    { selector: ".studio-section-head h2", en: "Choose the execution layer that fits now" },
    { selector: ".studio-tier h3", en: ["Launch Plan", "Growth Plan", "Scale Plan", "Custom Plan"] },
    { selector: ".studio-tier p", en: [
      "For businesses that need a clear presence and a fast digital start within a defined scope.",
      "For products that need a stronger experience, broader integrations, and extended development after launch.",
      "For projects already in motion that now need automation, better flows, and stronger connections across channels.",
      "When the project does not fit fixed plans, we define a custom scope and roadmap."
    ] },
    { selector: ".studio-tier:nth-of-type(1) .studio-list li", en: ["Company site or landing page", "Core content and clear structure", "Initial launch support"] },
    { selector: ".studio-tier:nth-of-type(2) .studio-list li", en: ["Deeper user experience", "Additional pages or screens", "API integration when needed"] },
    { selector: ".studio-tier:nth-of-type(3) .studio-list li", en: ["Operational automation layers", "Customer journey improvement", "Ongoing optimization"] },
    { selector: ".studio-tier:nth-of-type(4) .studio-list li", en: ["Discovery session", "Scope and delivery direction", "Priority and budget planning"] },
    { selector: ".studio-link-arrow", en: ["Start Here", "Most Requested", "Request It", "Book a Call"] },
    { selector: ".studio-grid-2:last-of-type .studio-card h3", en: ["How do you choose the right plan?", "What plans are not meant to do"] },
    { selector: ".studio-grid-2:last-of-type .studio-card p", en: [
      "If the goal is a fast launch, start with the launch plan. If you already have a live product or active audience, growth or scale is usually the better fit.",
      "We do not force complex projects into a fixed pricing shell. When your case needs special analysis, we move it into a custom plan directly."
    ] },
    { selector: ".footer-brand p", en: "Pricing here reflects the stage of the project, not a generic package template." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Pricing", "Services", "Work", "Process"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["FAQ", "About", "Contact", "WhatsApp Direct"] },
  ],
  "work.html": [
    { selector: "title", mode: "text", en: "Process | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "A clear TCG delivery process from discovery to launch and optimization." },
    { selector: ".studio-hero-copy h1", en: "A transparent process that removes chaos before delivery begins" },
    { selector: ".studio-hero-copy p", en: "We structure the project into clear stages: understand, decide, design, build, then improve. The client always knows what is happening now and what comes next." },
    { selector: ".studio-timeline-step h3", en: ["Need analysis", "Define the right solution", "Design the experience", "Build and deliver", "Launch and improve"] },
    { selector: ".studio-timeline-step p", en: [
      "We understand the business goal, target audience, and the pain point the product must solve.",
      "Should this be a website, app, automation, or a mix? This prevents choosing the wrong path from the start.",
      "We define user flows, page or screen structure, and the main content messages.",
      "Phased execution with reviews, integrations, and practical testing instead of building blindly until the end.",
      "After launch, we review real usage and apply improvements based on reality, not assumptions."
    ] },
    { selector: ".footer-brand p", en: "Strong delivery starts with a clear path before the first line of code." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Process", "Services", "Work", "Pricing"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["FAQ", "About", "Contact", "WhatsApp Direct"] },
  ],
  "faq.html": [
    { selector: "title", mode: "text", en: "FAQ | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "Frequently asked questions about TCG delivery timelines, support, integrations, and custom work." },
    { selector: ".studio-hero-copy h1", en: "Frequently asked questions with direct, practical answers" },
    { selector: ".studio-hero-copy p", en: "Instead of vague cards or long explanations, we focused here on the questions that affect the decision to start: timeline, support, integrations, and flexibility." },
    { selector: ".studio-faq summary", en: [
      "How long does delivery usually take?",
      "Is there support after handoff?",
      "Can you connect CRM, ERP, or an external API?",
      "Do you work on fully custom projects?",
      "Can we start small and expand later?"
    ] },
    { selector: ".studio-faq p", en: [
      "Usually between two and eight weeks, depending on the number of pages or screens, the level of customization, and the integrations required.",
      "Yes. Support can be included in a defined package or provided through a separate follow-up plan depending on the project.",
      "Yes, if the systems involved support integration, we implement it within the appropriate project scope.",
      "Yes. When fixed plans do not fit the project, we move directly to a custom execution plan.",
      "In many cases this is the best scenario. We build the first phase in a way that allows later expansion without tearing everything down."
    ] },
    { selector: ".studio-single-cta h3", en: "Do you have a question specific to your project?" },
    { selector: ".studio-single-cta p", en: "Send the case details and we will give you a direct answer instead of generic assumptions." },
    { selector: ".studio-single-cta .studio-link-arrow", en: "Contact Now" },
    { selector: ".footer-brand p", en: "We remove ambiguity early so the project starts on a clear foundation." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["FAQ", "Services", "Pricing", "Process"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Work", "About", "Contact", "WhatsApp Direct"] },
  ],
  "about.html": [
    { selector: "title", mode: "text", en: "About | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "About The Code Gate: a digital product team connecting strategy, experience, development, and operations." },
    { selector: ".studio-hero-copy h1", en: "TCG is a digital product team connecting idea and execution" },
    { selector: ".studio-hero-copy p", en: "We do not work as isolated page builders. We work as a team that shapes how the product should appear, how it should serve the user, and how it should connect to daily operations." },
    { selector: ".studio-metric-card span", en: ["Experience clarity", "Intentional delivery", "Connected operations"] },
    { selector: ".studio-grid-2 .studio-card h3", en: ["Our vision", "Our method", "Our focus", "How we collaborate"] },
    { selector: ".studio-grid-2 .studio-card p", en: [
      "Technology should be a tool for operation and growth, not just a polished interface with no real effect.",
      "We understand the goal first, shape the flows and experience next, then build the most suitable solution instead of forcing a preset template.",
      "Web, mobile apps, WhatsApp automation, and API integration inside one system ready to grow.",
      "With clarity in decisions, less complexity, and development driven by outcomes rather than showmanship."
    ] },
    { selector: ".footer-brand p", en: "We work like a product team, not a page factory." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["About", "Services", "Work", "Pricing"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Process", "FAQ", "Contact", "WhatsApp Direct"] },
  ],
  "contact.html": [
    { selector: "title", mode: "text", en: "Contact | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "Contact TCG through email, direct phone, or the WhatsApp project request form." },
    { selector: ".studio-hero-copy h1", en: "A cleaner, clearer, more professional contact page" },
    { selector: ".studio-hero-copy p", en: "Choose the right channel or send your request directly through the form. The page is built to reduce friction and make the next step obvious." },
    { selector: ".studio-contact-cards .studio-card h3", en: ["Primary Email", "Technical Support", "Eng. Firas Hammami", "Eng. Mohammed Alafi"] },
    { selector: 'label[for="name"]', en: "Name" },
    { selector: "#name", mode: "attr", attr: "placeholder", en: "Your full name" },
    { selector: 'label[for="phone"]', en: "Phone / WhatsApp" },
    { selector: 'label[for="service"]', en: "Requested service" },
    { selector: '#service option[value="تطوير موقع"]', en: "Website Development" },
    { selector: '#service option[value="تطبيق موبايل"]', en: "Mobile App" },
    { selector: '#service option[value="بوت واتساب"]', en: "WhatsApp Bot" },
    { selector: '#service option[value="حل تقني متكامل"]', en: "Integrated Tech Solution" },
    { selector: 'label[for="contactPerson"]', en: "Contact with" },
    { selector: '#contactPerson option[value="firas"]', en: "Eng. Firas Hammami" },
    { selector: '#contactPerson option[value="mohammed"]', en: "Eng. Mohammed Alafi" },
    { selector: 'label[for="details"]', en: "Project details" },
    { selector: "#details", mode: "attr", attr: "placeholder", en: "Write your project details here..." },
    { selector: "#sendBtn", en: "Send Request via WhatsApp" },
    { selector: ".footer-brand p", en: "If you already have an idea or a live project, we will help you define the next step clearly." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Contact", "Services", "Work", "Pricing"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Process", "FAQ", "About", "WhatsApp Direct"] },
  ],
  "mobile-apps.html": [
    { selector: "title", mode: "text", en: "Mobile Apps in Libya | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "Professional iOS and Android mobile app development in Libya by TCG." },
    { selector: ".section-stage-top h1", en: "Mobile apps with a lighter, more dynamic product feel" },
    { selector: ".section-stage-top p", en: "Instead of repeating generic cards, this page now presents the service inside a flexible, more readable product grid." },
    { selector: ".section-stage-top .btn-primary", en: "Start Your App" },
    { selector: ".section-stage-top .btn-secondary", en: "Back to Services" },
    { selector: ".mobile-card strong", en: ["Modern UI/UX", "Smart notifications", "API integration", "Launch and follow-up"] },
    { selector: ".mobile-card p", en: [
      "Smooth, easy-to-use interfaces designed for real daily mobile usage.",
      "Real-time notifications that keep users connected to requests and service events.",
      "Connections with sales systems, management tools, or the external services your product needs.",
      "Publishing, monitoring, and improving the app after launch based on real usage."
    ] },
    { selector: ".footer-brand p", en: "We design mobile apps that support real operations and still feel modern without unnecessary complexity." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Mobile Apps", "Services", "Pricing", "Contact"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Work", "Process", "FAQ", "WhatsApp Direct"] },
  ],
  "web-development.html": [
    { selector: "title", mode: "text", en: "Web Development in Libya | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "Professional web development in Libya by TCG." },
    { selector: ".section-stage-top h1", en: "Professional web development with a more future-ready structure" },
    { selector: ".section-stage-top p", en: "Instead of one repeated row of cards, this page now presents a clearer capability view for the service." },
    { selector: ".section-stage-top .btn-primary", en: "Request a Quote" },
    { selector: ".section-stage-top .btn-secondary", en: "Back to Services" },
    { selector: ".orbit-card strong", en: ["High performance", "Technical SEO", "Dashboards", "Built for Libya"] },
    { selector: ".orbit-card p", en: [
      "Fast loading and a smooth experience that preserves a professional first impression.",
      "A search-friendly structure with clear pages and a clean content layout.",
      "Flexible management for content, services, and requests without unnecessary technical weight.",
      "A design approach that fits the local market and its real communication paths."
    ] },
    { selector: ".footer-brand p", en: "We build web as an operating and growth layer, not just an isolated front-end." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["Web Development", "Services", "Work", "Contact"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Pricing", "Process", "FAQ", "WhatsApp Direct"] },
  ],
  "whatsapp-automation.html": [
    { selector: "title", mode: "text", en: "WhatsApp Bots in Libya | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "WhatsApp automation for businesses in Libya by TCG." },
    { selector: ".section-stage-top h1", en: "WhatsApp bots for smarter sales automation" },
    { selector: ".section-stage-top p", en: "Instead of repeating the same section style, this page presents the service as a clearer, more specialized automation flow." },
    { selector: ".section-stage-top .btn-primary", en: "Request a WhatsApp Bot" },
    { selector: ".section-stage-top .btn-secondary", en: "Back to Services" },
    { selector: ".auto-card strong", en: ["Automated replies", "Smart routing", "CRM integration", "Performance reporting"] },
    { selector: ".auto-card p", en: [
      "Instant answers to frequent questions that reduce pressure on the team.",
      "Classify conversations and send them to the right team or person faster.",
      "Connect customers and conversations with your sales or follow-up system.",
      "Measure response, conversion, and engagement so the flow keeps improving."
    ] },
    { selector: ".footer-brand p", en: "Automation for us is a tool to improve operations and sales, not just repeated auto-replies." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["WhatsApp Bots", "Services", "Process", "Contact"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Work", "Pricing", "FAQ", "WhatsApp Direct"] },
  ],
  "otp-service.html": [
    { selector: "title", mode: "text", en: "OTP Service in Libya | TCG" },
    { selector: 'meta[name="description"]', mode: "attr", attr: "content", en: "TCG OTP service for one-time password delivery across signup, login, and transaction verification flows." },
    { selector: ".section-stage:nth-of-type(1) h1", en: "Reliable OTP delivery for identity and transaction verification" },
    { selector: ".section-stage:nth-of-type(1) .section-stage-top > p:not(.badge):not(.hero-trust):not(.hero-locations)", en: "We provide OTP solutions for one-time verification codes across apps and platforms, supporting signup, login, two-factor authentication, and sensitive action confirmation." },
    { selector: ".section-stage:nth-of-type(1) .btn-primary", en: "Request the Service" },
    { selector: ".section-stage:nth-of-type(1) .btn-secondary", en: "Back to Services" },
    { selector: ".hero-trust", mode: "html", en: "<span>⎯</span> Faster delivery • Flexible integration • Clearer verification experience" },
    { selector: ".hero-locations", mode: "html", en: "<span>⌖</span> Built for apps, e-commerce, dashboards, and financial workflows" },
    { selector: ".auto-card strong", en: ["Fast verification", "Two-factor authentication", "API integration", "Higher reliability"] },
    { selector: ".auto-card p", en: [
      "Instant code delivery to support user signup and secure account access.",
      "An added security layer to protect accounts and sensitive operations inside your system.",
      "Flexible integration with your existing apps or systems so OTP can be deployed without unnecessary complexity.",
      "A clear send-and-verify flow that improves delivery success and reduces user friction during verification."
    ] },
    { selector: ".section-stage:nth-of-type(2) .badge", en: "Use Cases" },
    { selector: ".section-stage:nth-of-type(2) h2", en: "When do you need OTP inside your product?" },
    { selector: ".section-stage:nth-of-type(2) .section-stage-top p", en: "This service fits any product that needs fast and secure user verification or confirmation of an important action." },
    { selector: ".section-stage:nth-of-type(2) .auto-card strong", en: ["New account signup", "User login", "Transaction approval", "Access recovery"] },
    { selector: ".section-stage:nth-of-type(2) .auto-card p", en: [
      "Verify the phone number during signup to improve data quality and reduce fake accounts.",
      "Add extra protection when users sign in, especially for sensitive or permission-heavy systems.",
      "Confirm payment, withdrawal, or sensitive data updates to improve platform and user security.",
      "Verify identity during account recovery or password reset with a fast and secure flow."
    ] },
    { selector: ".section-stage:nth-of-type(3) .badge", en: "Launch Ready" },
    { selector: ".section-stage:nth-of-type(3) h2", en: "If you need OTP inside your current product, we can structure it quickly and clearly." },
    { selector: ".section-stage:nth-of-type(3) .btn-primary", en: "Start Now" },
    { selector: ".section-stage:nth-of-type(3) .btn-secondary", en: "View Pricing" },
    { selector: ".footer-brand p", en: "Our OTP solutions are built for secure, fast verification experiences that integrate cleanly with your digital products." },
    { selector: ".footer-shell > .footer-links:nth-of-type(2) a", en: ["OTP Service", "Services", "Pricing", "Contact"] },
    { selector: ".footer-shell > .footer-links:nth-of-type(3) a", en: ["Work", "Process", "FAQ", "WhatsApp Direct"] },
  ],
};

if (gaMeasurementId) {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId);
}

const getStoredUiLanguage = () => {
  const langParam = new URLSearchParams(window.location.search).get("lang");
  if (langParam === "ar" || langParam === "en") return langParam;
  return "ar";
};

const setStoredUiLanguage = (lang) => {
  try {
    localStorage.setItem("uiLang", lang);
  } catch {
    // Ignore storage failures.
  }
};

const storeOriginalValue = (el, mode, attr) => {
  const attrKey = attr ? attr.replace(/[^a-z0-9]+/gi, "_") : "";
  const key = mode === "attr" ? `i18nAttr${attrKey}` : `i18n${mode[0].toUpperCase()}${mode.slice(1)}`;
  if (el.dataset[key]) return;
  if (mode === "html") {
    el.dataset[key] = el.innerHTML;
    return;
  }
  if (mode === "attr") {
    el.dataset[key] = el.getAttribute(attr) || "";
    return;
  }
  el.dataset[key] = el.textContent || "";
};

const restoreOriginalValue = (el, mode, attr) => {
  const attrKey = attr ? attr.replace(/[^a-z0-9]+/gi, "_") : "";
  const key = mode === "attr" ? `i18nAttr${attrKey}` : `i18n${mode[0].toUpperCase()}${mode.slice(1)}`;
  const original = el.dataset[key];
  if (original === undefined) return;
  if (mode === "html") {
    el.innerHTML = original;
    return;
  }
  if (mode === "attr") {
    el.setAttribute(attr, original);
    return;
  }
  el.textContent = original;
};

const applyEntryTranslation = (entry, lang) => {
  const mode = entry.mode || "text";
  let targets = [];
  try {
    targets = entry.selector === "title"
      ? [document.querySelector("title")]
      : Array.from(document.querySelectorAll(entry.selector));
  } catch {
    return;
  }

  targets.forEach((el, index) => {
    if (!el) return;
    storeOriginalValue(el, mode, entry.attr);

    if (lang === "ar") {
      restoreOriginalValue(el, mode, entry.attr);
      return;
    }

    const value = Array.isArray(entry.en) ? entry.en[index] : entry.en;
    if (typeof value !== "string") return;

    if (mode === "html") {
      el.innerHTML = value;
      return;
    }
    if (mode === "attr") {
      el.setAttribute(entry.attr, value);
      return;
    }
    el.textContent = value;
  });
};

const applyPageLanguage = (lang) => {
  const entries = pageContentTranslations[currentPath] || [];
  entries.forEach((entry) => applyEntryTranslation(entry, lang));
};

const getLanguageHref = (lang) => {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("lang", lang);
  return nextUrl.toString();
};

const applyUiLanguage = (lang) => {
  const copy = uiTranslations[lang] || uiTranslations.ar;
  const nextLang = lang === "ar" ? "en" : "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  document.body?.classList.toggle("ui-en", lang === "en");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || !copy[key]) return;
    el.textContent = copy[key];
  });
  menuBtn?.setAttribute("aria-label", copy.menuLabel);
  langToggle?.setAttribute("aria-label", copy.toggleLabel);
  if (langToggle) langToggle.textContent = copy.toggleText;
  if (langToggle instanceof HTMLAnchorElement) {
    langToggle.href = getLanguageHref(nextLang);
  }
  applyPageLanguage(lang);
};

let currentUiLanguage = getStoredUiLanguage();
applyUiLanguage(currentUiLanguage);

langToggle?.addEventListener("click", (event) => {
  event.preventDefault();
  currentUiLanguage = currentUiLanguage === "ar" ? "en" : "ar";
  setStoredUiLanguage(currentUiLanguage);
  window.location.assign(getLanguageHref(currentUiLanguage));
});

const sectionLinks = Array.from(document.querySelectorAll(".menu a"));
const sectionMap = sectionLinks
  .map((link) => {
    const hash = link.getAttribute("href") || "";
    if (!hash.startsWith("#") || hash.length < 2) return null;
    const section = document.querySelector(hash);
    if (!section) return null;
    return { link, section };
  })
  .filter(Boolean);

const isMobileNav = () => window.matchMedia("(max-width: 980px)").matches;

const closeMenu = () => {
  menu?.classList.remove("open");
  menuOverlay?.classList.remove("show");
  menuBtn?.setAttribute("aria-expanded", "false");
  if (isMobileNav()) document.body.classList.remove("nav-open");
};

const openMenu = () => {
  menu?.classList.add("open");
  menuOverlay?.classList.add("show");
  menuBtn?.setAttribute("aria-expanded", "true");
  if (isMobileNav()) document.body.classList.add("nav-open");
};

menuBtn?.addEventListener("click", () => {
  if (menu?.classList.contains("open")) {
    closeMenu();
    return;
  }
  openMenu();
  trackEvent("mobile_menu_open", { page_path: window.location.pathname });
});
menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
menuOverlay?.addEventListener("click", closeMenu);

document.addEventListener("click", (event) => {
  if (!menu?.classList.contains("open")) return;
  const target = event.target;
  const clickedInsideMenu = target instanceof Node && menu.contains(target);
  const clickedToggle = target instanceof Node && menuBtn?.contains(target);
  if (!clickedInsideMenu && !clickedToggle) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (!isMobileNav()) {
    document.body.classList.remove("nav-open");
    menuOverlay?.classList.remove("show");
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  if (reduceMotion) {
    el.classList.add("show");
    return;
  }
  el.style.transitionDelay = `${index * 65}ms`;
  revealObserver.observe(el);
});

const animateNumber = (el) => {
  const target = Number(el.dataset.target || 0);
  if (!Number.isFinite(target)) return;
  if (reduceMotion) {
    el.textContent = `${target}`;
    return;
  }

  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = `${Math.floor(progress * target)}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateNumber(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll(".num").forEach((num) => statsObserver.observe(num));

const setStatus = (message = "", isError = false) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.style.color = isError ? "" : "#86ffd8";
  if (isError) formStatus.style.removeProperty("color");
};

const submitContactForm = (event) => {
  event?.preventDefault();

  if (contactForm && !contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = document.getElementById("name")?.value.trim() || "";
  const phoneRaw = document.getElementById("phone")?.value.trim() || "";
  const service = document.getElementById("service")?.value || "حل تقني متكامل";
  const person = document.getElementById("contactPerson")?.value || "firas";
  const details = document.getElementById("details")?.value.trim() || "";
  const copy = formMessages[currentUiLanguage] || formMessages.ar;

  if (!name || !phoneRaw || !details) {
    setStatus(copy.missing, true);
    return;
  }

  const digits = phoneRaw.replace(/[^\d+]/g, "");
  if (digits.length < 8) {
    setStatus(copy.invalidPhone, true);
    return;
  }

  const waNumber = person === "mohammed" ? "218922917708" : "218946510065";
  const message = [
    copy.whatsappIntro,
    `${copy.fieldName}: ${name}`,
    `${copy.fieldPhone}: ${phoneRaw}`,
    `${copy.fieldService}: ${service}`,
    `${copy.fieldDetails}: ${details}`,
  ].join("\n");

  setStatus(copy.openingWhatsapp, false);
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  trackEvent("generate_lead", {
    method: "whatsapp_form",
    service_interest: service,
    destination_contact: waNumber,
  });
  window.open(waLink, "_blank", "noopener");
};

contactForm?.addEventListener("submit", submitContactForm);

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("contact_click", { method: "phone", value: link.getAttribute("href") || "" });
  });
});

document.querySelectorAll("a[href^='mailto:']").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("contact_click", { method: "email", value: link.getAttribute("href") || "" });
  });
});

document.querySelectorAll("a[href*='wa.me']").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("contact_click", { method: "whatsapp", source: "direct_link" });
  });
});

document.querySelectorAll("a[href$='.html']").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("index.html#")) return;
    trackEvent("service_page_click", { target_page: href });
  });
});

const setActiveLink = () => {
  if (sectionMap.length === 0) {
    sectionLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isCurrentPage = href === currentPath || (currentPath === "" && href === "index.html");
      link.classList.toggle("active", isCurrentPage);
      if (isCurrentPage) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    return;
  }

  let activeId = "";
  let nearest = Infinity;

  sectionMap.forEach(({ section }) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - 130);

    if (rect.top <= 130 && rect.bottom >= 130) {
      activeId = section.id;
      nearest = -1;
      return;
    }

    if (nearest !== -1 && distance < nearest) {
      nearest = distance;
      activeId = section.id;
    }
  });

  sectionMap.forEach(({ link, section }) => {
    const isActive = section.id === activeId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    scrollTopBtn?.classList.toggle("show", window.scrollY > 280);
    setActiveLink();
    ticking = false;
  });
};

window.addEventListener("scroll", onScroll, { passive: true });

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

setActiveLink();
onScroll();
