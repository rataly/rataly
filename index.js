"use strict";

const fs = require("fs");
const axios = require("axios").default;

const GITHUB_USER = "rataly";
const BLOG_HOST = "https://ramazanatalay.medium.com";

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const icon = function (cfg, size) {
  return '<img src="' + cfg.src + '" alt="' + cfg.alt + '" width="' + (size || 40) + '" height="' + (size || 40) + '" />';
};

/* ── Header ──────────────────────────────────────────────────────────────── */
const header = [
  '<h1 align="center">Hi, I\'m Ramazan Atalay 👋</h1>',
  "",
  '<p align="center">',
  "  <strong>Site Reliability Engineer</strong> · Toronto, Canada 🇨🇦<br/>",
  "  Designing resilient cloud infrastructure across Azure · AWS · GCP<br/>",
  "  Ph.D. Physics → Academia → Cloud &amp; DevOps Engineering",
  "</p>",
  "",
  '<p align="center">',
  '  <a href="https://www.linkedin.com/in/ratalay/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>',
  '  <a href="' + BLOG_HOST + '"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" /></a>',
  '  <a href="https://dev.to/ramazanatalay"><img src="https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" /></a>',
  '  <a href="https://twitter.com/RamazanAtalay35"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>',
  '  <a href="https://www.kaggle.com/ramazanatalay"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white" alt="Kaggle" /></a>',
  "</p>",
].join("\n");

/* ── About / YAML card ───────────────────────────────────────────────────── */
const about = [
  "## 👨‍💼 About Me",
  "",
  "I'm a **Site Reliability Engineer at [Loblaw](https://www.loblaw.ca/)**, Canada's largest retailer, where I design and operate cloud infrastructure at scale. With a background in academia (Ph.D. Physics) and years of hands-on cloud engineering, I bridge deep technical rigour with pragmatic production systems.",
  "",
  "```yaml",
  "role:       Site Reliability Engineer @ Loblaw Inc.",
  "location:   Toronto, Canada 🇨🇦",
  "experience:",
  "  - SRE & Cloud Engineering        (2019 – present)",
  "  - Assistant Professor, Physics   (2013 – 2017)",
  "  - Research & Teaching Assistant  (2006 – 2012)",
  "specialties:",
  "  - Multi-cloud architecture       (Azure · AWS · GCP)",
  "  - Infrastructure as Code         (Terraform · ARM · CloudFormation)",
  "  - Container orchestration        (Kubernetes · Docker)",
  "  - CI/CD pipelines                (GitHub Actions · Azure DevOps · Jenkins · Octopus)",
  "  - Observability & alerting       (Prometheus · Grafana · Azure Monitor)",
  "  - Cloud security & governance    (IAM · Azure Policy · Security Hub · SCP)",
  "education:",
  "  - Ph.D. Physics  — Georgia State University, Atlanta GA",
  "  - M.Sc. Physics  — Georgia State University, Atlanta GA",
  "  - B.Sc. Physics  — Middle East Technical University (METU), Ankara",
  "```",
].join("\n");

/* ── Tech Stack (grouped) ────────────────────────────────────────────────── */
const cloudIcons = [
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg", alt: "Azure" },
  { src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", alt: "GCP" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg", alt: "Terraform" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", alt: "Docker" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg", alt: "nginx" },
];
const obsIcons = [
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prometheus/prometheus-original.svg", alt: "Prometheus" },
  { src: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg", alt: "Grafana" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg", alt: "Jenkins" },
];
const langIcons = [
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", alt: "Go" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg", alt: "Bash" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", alt: "Linux" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg", alt: "Redis" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg", alt: "MySQL" },
];

const techStack = [
  "## 🛠️ Tech Stack",
  "",
  "**Cloud & Infrastructure**",
  "",
  "<p>" +
    cloudIcons
      .map(function (i) {
        return icon(i);
      })
      .join("\n  ") +
    "</p>",
  "",
  "**Observability & CI/CD**",
  "",
  "<p>" +
    obsIcons
      .map(function (i) {
        return icon(i);
      })
      .join("\n  ") +
    "</p>",
  "",
  "**Languages & Databases**",
  "",
  "<p>" +
    langIcons
      .map(function (i) {
        return icon(i);
      })
      .join("\n  ") +
    "</p>",
].join("\n");

/* ── Featured Projects (repo pin cards) ──────────────────────────────────── */
const repos = [
  { repo: "devops-exercises", label: "DevOps Exercises" },
  { repo: "TerraformAzure", label: "Terraform Azure" },
  { repo: "docker-swarm-visualizer", label: "Docker Swarm Visualizer" },
  { repo: "java-maven-app", label: "Java Maven App" },
];

const repoCards = repos
  .map(function (r) {
    var url = "https://github.com/" + GITHUB_USER + "/" + r.repo;
    var cardUrl = "https://github-readme-stats.vercel.app/api/pin/?username=" + GITHUB_USER + "&repo=" + r.repo + "&theme=tokyonight&hide_border=true";
    return '  <a href="' + url + '">\n    <img src="' + cardUrl + '" />\n  </a>';
  })
  .join("\n");

const projects = ["## 💾 Featured Projects", "", '<p align="center">', repoCards, "</p>"].join("\n");

/* ── Writing ─────────────────────────────────────────────────────────────── */
async function fetchMediumPosts() {
  try {
    var rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(BLOG_HOST + "/feed");
    var response = await axios.get(rssUrl, { timeout: 8000 });
    var data = response.data;
    if (!data || data.status !== "ok" || !data.items || !data.items.length) return null;
    return data.items
      .slice(0, 5)
      .map(function (item) {
        var date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        return '    <li><a target="_blank" href="' + item.link + '">' + item.title + " — " + date + "</a></li>";
      })
      .join("\n");
  } catch (err) {
    console.warn("Could not fetch Medium posts:", err.message);
    return null;
  }
}

/* ── Stats ───────────────────────────────────────────────────────────────── */
// FIX: original was missing `username=` — caused the stats card to fail
const stats = ["## 📊 GitHub Stats", "", '<p align="center">', '  <img height="160" src="https://github-readme-stats.vercel.app/api?username=' + GITHUB_USER + '&show_icons=true&count_private=true&theme=tokyonight&hide_border=true" alt="stats" />', '  <img height="160" src="https://github-readme-stats.vercel.app/api/top-langs/?username=' + GITHUB_USER + '&layout=compact&theme=tokyonight&hide_border=true" alt="top languages" />', "</p>", '<p align="center">', '  <img src="https://github-readme-streak-stats.herokuapp.com/?user=' + GITHUB_USER + '&theme=tokyonight&hide_border=true" alt="streak" />', "</p>", '<p align="center">', '  <img src="https://github-profile-trophy.vercel.app/?username=' + GITHUB_USER + '&theme=tokyonight&row=1&no-frame=true&margin-w=8" alt="trophies" />', "</p>"].join("\n");

/* ── Assemble & write ────────────────────────────────────────────────────── */
(async function () {
  var postItems = await fetchMediumPosts();
  var fallback = '    <li>Visit <a href="' + BLOG_HOST + '">my blog</a> for the latest posts.</li>';

  var writing = ["## ✒️ Recent Writing", "", "> I write about Cloud, SRE, and DevOps practices on [Medium](" + BLOG_HOST + ") and [Dev.to](https://dev.to/ramazanatalay).", "", "<details>", "  <summary>📖 Recent articles</summary>", "  <ul>", postItems || fallback, "  </ul>", "</details>"].join("\n");

  var footer = ['<p align="center">', '  <img src="https://komarev.com/ghpvc/?username=' + GITHUB_USER + '&label=Profile%20Views&color=0e75b6&style=flat" alt="profile views" />', "</p>"].join("\n");

  var readme = [header, "", "---", "", about, "", "---", "", techStack, "", "---", "", projects, "", "---", "", writing, "", "---", "", stats, "", "---", "", footer].join("\n");

  fs.writeFile("README.md", readme, function (err) {
    if (err) return console.error("Error writing README.md:", err);
    console.info("✅  README.md written successfully");
  });
})();
