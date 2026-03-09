const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const sendBtn = document.getElementById("sendBtn");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const formStatus = document.getElementById("formStatus");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gaMeasurementId = document
  .querySelector('meta[name="ga4-measurement-id"]')
  ?.getAttribute("content")
  ?.trim();

const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
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

sendBtn?.addEventListener("click", () => {
  const name = document.getElementById("name")?.value.trim() || "";
  const phoneRaw = document.getElementById("phone")?.value.trim() || "";
  const service = document.getElementById("service")?.value || "حل تقني متكامل";
  const person = document.getElementById("contactPerson")?.value || "firas";
  const details = document.getElementById("details")?.value.trim() || "";

  if (!name || !phoneRaw || !details) {
    setStatus("يرجى تعبئة الاسم والجوال وتفاصيل المشروع.", true);
    return;
  }

  const digits = phoneRaw.replace(/[^\d+]/g, "");
  if (digits.length < 8) {
    setStatus("رقم الجوال غير صالح. أدخل رقمًا صحيحًا.", true);
    return;
  }

  const waNumber = person === "mohammed" ? "218922917708" : "218916510065";
  const message = [
    "مرحبًا TCG، لدي مشروع جديد.",
    `الاسم: ${name}`,
    `الجوال: ${phoneRaw}`,
    `الخدمة: ${service}`,
    `تفاصيل المشروع: ${details}`,
  ].join("\n");

  setStatus("جاري فتح واتساب...", false);
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  trackEvent("generate_lead", {
    method: "whatsapp_form",
    service_interest: service,
    destination_contact: waNumber,
  });
  window.open(waLink, "_blank", "noopener");
});

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
  if (sectionMap.length === 0) return;

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
    link.classList.toggle("active", section.id === activeId);
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
