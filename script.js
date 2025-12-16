const config = {
  name: "周唯琛",
  tagline: "努力学习 AI 的设计师，记录与分享我的成长过程",
  role: "设计师",
  status: "努力学习AI的设计师",
  location: "山东 · 济宁",
  email: "2087506205@qq.com",
  xiaohongshu: "https://xhslink.com/m/3zQPBRLxpQr",
  resumeUrl: "https://www.kdocs.cn/l/cd6WsUxXzPlM",
  heroPhoto: "",
  aboutPhoto: "assets/profile.jpg.jpg",
  tags: ["产品设计", "交互体验", "前端", "可替换标签"],
  facts: [
    { label: "现居地", value: "山东 · 济宁" },
    { label: "领域", value: "视觉传达设计 · AI 相关学习" },
    { label: "状态", value: "努力学习AI的设计师" },
  ],
  socials: [
    { label: "小红书", href: "https://xhslink.com/m/3zQPBRLxpQr" },
    { label: "微博", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  experiences: [
    {
      title: "校园创业与运营实践",
      meta: "2023 - 2025 · 在校期间",
      description:
        "在学校运营校内表白墙账号，并尝试撸货、收书、劳务、校内零食等小生意，在实践中学习基本运营思路和同学需求，让自己的大学生活非常充实。",
      tags: ["校园运营", "社交媒体", "小生意实践"],
      link: "",
    },
    {
      title: "电商客服与抖音后台实战",
      meta: "2025.06 - 2025.12 · 客服岗位",
      description:
        "毕业后先后在两家公司做客服工作，接触并熟悉抖音电商后台的基础操作流程和部分运营逻辑，从前台沟通中更好地理解用户反馈和店铺运营细节。",
      tags: ["抖音电商", "客服", "电商运营"],
      link: "",
    },
  ],
  showcase: [
    {
      title: "作品集 1",
      image: "作品集/作品集1.jpg",
      link: "#",
    },
    {
      title: "作品集 2",
      image: "作品集/作品集2.jpg",
      link: "#",
    },
    {
      title: "作品集 3",
      image: "作品集/作品集3.jpg",
      link: "#",
    },
  ],
};

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

function setLinks() {
  const resumeLinks = ["#nav-resume", "#hero-resume"];
  resumeLinks.forEach((sel) => {
    const el = qs(sel);
    if (el) el.href = config.resumeUrl;
  });
  const xhsLinks = ["#nav-xhs", "#hero-xhs", "#contact-xhs"];
  xhsLinks.forEach((sel) => {
    const el = qs(sel);
    if (el) el.href = config.xiaohongshu;
  });
  const email = qs("#contact-email");
  if (email) email.href = `mailto:${config.email}`;
}

function setText() {
  qs("#nav-name").textContent = config.name;
  qs("#hero-title").textContent = `你好，我是 ${config.name}`;
  qs("#hero-tagline").textContent = config.tagline;
  qs("#footer-name").textContent = config.name;
  qs("#footer-year").textContent = new Date().getFullYear();
}

function renderChips(containerSelector, items) {
  const container = qs(containerSelector);
  if (!container) return;
  container.innerHTML = items
    .map((item) => `<span class="chip">${item}</span>`)
    .join("");
}

function renderFacts() {
  const container = qs("#quick-facts");
  container.innerHTML = config.facts
    .map(
      (fact) => `
      <div class="fact">
        <div class="label">${fact.label}</div>
        <div class="value">${fact.value}</div>
      </div>
    `
    )
    .join("");
}

function setPhotos() {
  const hero = qs("#photo-hero");
  const about = qs("#photo-about");
  if (hero) hero.src = config.heroPhoto;
  if (about) about.src = config.aboutPhoto;
}

function renderSocials() {
  const container = qs("#social-links");
  container.innerHTML = config.socials
    .map(
      (item) =>
        `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`
    )
    .join("");
}

function renderExperiences() {
  const container = qs("#experience-list");
  container.innerHTML = config.experiences
    .map(
      (exp) => `
      <article class="card glass experience-card reveal">
        <div class="experience-meta">
          <span>${exp.meta}</span>
          ${exp.link && exp.link !== "#" ? `<a class="ghost" href="${exp.link}" target="_blank" rel="noreferrer">查看</a>` : ""}
        </div>
        <h3>${exp.title}</h3>
        <p>${exp.description}</p>
        <div class="chips">
          ${exp.tags.map((t) => `<span class="chip">${t}</span>`).join("")}
        </div>
      </article>
    `
    )
    .join("");
}

function renderShowcase() {
  const container = qs("#showcase-grid");
  container.innerHTML = config.showcase
    .map(
      (item) => `
      <a class="card glass gallery-card reveal" href="${item.link}" target="_blank" rel="noreferrer">
        <img src="${item.image}" alt="${item.title}">
        <div class="gallery-overlay">${item.title}</div>
      </a>
    `
    )
    .join("");
}

function enableSmoothScroll() {
  qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href")?.substring(1);
      const target = targetId && document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const prefersReduced =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });
}

function enableReveal() {
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  qsa(".reveal").forEach((el) => observer.observe(el));
}

function init() {
  setLinks();
  setText();
  setPhotos();
  renderChips("#hero-tags", config.tags);
  renderChips("#about-tags", config.tags);
  renderFacts();
  renderSocials();
  renderExperiences();
  renderShowcase();
  enableSmoothScroll();
  enableReveal();
}

document.addEventListener("DOMContentLoaded", init);

