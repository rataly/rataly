"use strict";

const fs = require("fs");
const axios = require("axios").default;

const GITHUB_USER = "ramatalay";
const BLOG_HOST = "https://ramazanatalay.medium.com";
const THEME = "tokyonight";

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const icon = function (cfg, size) {
  return (
    '<img src="' +
    cfg.src +
    '" alt="' +
    cfg.alt +
    '" width="' +
    (size || 40) +
    '" height="' +
    (size || 40) +
    '" />'
  );
};

const pin = function (repo) {
  var url = "https://github.com/" + GITHUB_USER + "/" + repo;
  var card =
    "https://github-readme-stats.vercel.app/api/pin/?username=" +
    GITHUB_USER +
    "&repo=" +
    repo +
    "&theme=" +
    THEME +
    "&hide_border=true";
  return '  <a href="' + url + '">\n    <img src="' + card + '" alt="' + repo + '" />\n  </a>';
};

/* ── Header ──────────────────────────────────────────────────────────────── */
const header = [
  '<h1 align="center">Hey, I\'m Ramazan 👋</h1>',
  "",
  '<p align="center">',
  "  <strong>Site Reliability Engineer</strong> · Toronto, Canada 🇨🇦<br/>",
  "  Keeping clouds calm, dashboards green, and on-call quiet<br/>",
  "  <em>Ph.D. Physics → Academia → Cloud &amp; SRE</em>",
  "</p>",
  "",
  '<p align="center">',
  '  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&duration=3200&pause=900&color=7AA2F7&center=true&vCenter=true&multiline=true&repeat=true&width=560&height=70&lines=uptime+%3E%3D+curiosity;terraform+apply+%E2%80%94+carefully;physics+grad%2C+production+guardian" alt="typing" />',
  "</p>",
  "",
  '<p align="center">',
  '  <a href="https://www.linkedin.com/in/ratalay/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>',
  '  <a href="' +
    BLOG_HOST +
    '"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" /></a>',
  '  <a href="https://dev.to/ramazanatalay"><img src="https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" /></a>',
  '  <a href="https://twitter.com/RamazanAtalay35"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>',
  '  <a href="https://www.kaggle.com/ramazanatalay"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white" alt="Kaggle" /></a>',
  "</p>",
].join("\n");

/* ── About ───────────────────────────────────────────────────────────────── */
const about = [
  "## About Me",
  "",
  "I'm a **Site Reliability Engineer at [Loblaw](https://www.loblaw.ca/)**, Canada's largest retailer — where \"scale\" means real shoppers, real carts, and real pressure on the platform.",
  "",
  "I spent years in academia chasing fundamental physics. These days I chase a different kind of particle: the one that escaped in `CrashLoopBackOff`. Same curiosity, better coffee.",
  "",
  "```yaml",
  "name: Ramazan Atalay",
  "role: Site Reliability Engineer @ Loblaw Inc.",
  "location: Toronto, Canada 🇨🇦",
  "status: on-call whisperer · multi-cloud tinkerer",
  "",
  "experience:",
  "  - SRE & Cloud Engineering        (2019 – present)",
  "  - Assistant Professor, Physics   (2013 – 2017)",
  "  - Research & Teaching Assistant  (2006 – 2012)",
  "",
  "specialties:",
  "  - Multi-cloud architecture       (Azure · AWS · GCP)",
  "  - Infrastructure as Code         (Terraform · ARM · CloudFormation)",
  "  - Container orchestration        (Kubernetes · Docker)",
  "  - CI/CD pipelines                (GitHub Actions · Azure DevOps · Jenkins · Octopus)",
  "  - Observability & alerting       (Prometheus · Grafana · Azure Monitor)",
  "  - Cloud security & governance    (IAM · Azure Policy · Security Hub · SCP)",
  "",
  "education:",
  "  - Ph.D. Physics  — Georgia State University, Atlanta GA",
  "  - M.Sc. Physics  — Georgia State University, Atlanta GA",
  "  - B.Sc. Physics  — Middle East Technical University (METU), Ankara",
  "",
  "fun_facts:",
  "  - Still explain incidents with free-body diagrams (joking… mostly)",
  "  - Prefer green Grafana panels to green tea",
  "  - Schrödinger's deploy: live and broken until you open the PR",
  "```",
].join("\n");

/* ── Tech Stack ──────────────────────────────────────────────────────────── */
const cloudIcons = [
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    alt: "AWS",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
    alt: "Azure",
  },
  {
    src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    alt: "GCP",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg",
    alt: "Terraform",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg",
    alt: "Kubernetes",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    alt: "Docker",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
    alt: "nginx",
  },
];

const obsIcons = [
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prometheus/prometheus-original.svg",
    alt: "Prometheus",
  },
  {
    src: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg",
    alt: "Grafana",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
    alt: "Jenkins",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    alt: "GitHub Actions",
  },
];

const langIcons = [
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    alt: "Python",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    alt: "Go",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
    alt: "Bash",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
    alt: "Linux",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg",
    alt: "Redis",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    alt: "MongoDB",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
    alt: "MySQL",
  },
];

const techStack = [
  "## Tech Stack",
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

/* ── Featured Projects ───────────────────────────────────────────────────── */
const repos = ["devops-exercises", "TerraformAzure", "docker-swarm-visualizer", "java-maven-app"];

const projects = [
  "## Featured Projects",
  "",
  "> Side quests in IaC, containers, and DevOps practice. Stars optional. Learning required.",
  "",
  '<p align="center">',
  repos.map(pin).join("\n"),
  "</p>",
].join("\n");

/* ── Writing ─────────────────────────────────────────────────────────────── */
async function fetchMediumPosts() {
  try {
    var rssUrl =
      "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(BLOG_HOST + "/feed");
    var response = await axios.get(rssUrl, { timeout: 8000 });
    var data = response.data;
    if (!data || data.status !== "ok" || !data.items || !data.items.length) return null;
    return data.items
      .slice(0, 5)
      .map(function (item) {
        var date = new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return (
          '    <li><a target="_blank" href="' +
          item.link +
          '">' +
          item.title +
          " — " +
          date +
          "</a></li>"
        );
      })
      .join("\n");
  } catch (err) {
    console.warn("Could not fetch Medium posts:", err.message);
    return null;
  }
}

/* ── Stats + Snake ───────────────────────────────────────────────────────── */
const stats = [
  "## GitHub Stats",
  "",
  '<p align="center">',
  '  <img height="160" src="https://github-readme-stats.vercel.app/api?username=' +
    GITHUB_USER +
    "&show_icons=true&count_private=true&theme=" +
    THEME +
    '&hide_border=true" alt="stats" />',
  '  <img height="160" src="https://github-readme-stats.vercel.app/api/top-langs/?username=' +
    GITHUB_USER +
    "&layout=compact&theme=" +
    THEME +
    '&hide_border=true" alt="top languages" />',
  "</p>",
  '<p align="center">',
  '  <img src="https://github-readme-streak-stats.herokuapp.com/?user=' +
    GITHUB_USER +
    "&theme=" +
    THEME +
    '&hide_border=true" alt="streak" />',
  "</p>",
  '<p align="center">',
  '  <img src="https://github-profile-trophy.vercel.app/?username=' +
    GITHUB_USER +
    "&theme=" +
    THEME +
    '&row=1&no-frame=true&margin-w=8" alt="trophies" />',
  "</p>",
].join("\n");

const snake = [
  "## Contribution Graph",
  "",
  "> Watch commits eat yesterday's laziness.",
  "",
  '<p align="center">',
  '  <picture>',
  '    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/' +
    GITHUB_USER +
    "/" +
    GITHUB_USER +
    '/output/github-snake-dark.svg" />',
  '    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/' +
    GITHUB_USER +
    "/" +
    GITHUB_USER +
    '/output/github-snake.svg" />',
  '    <img alt="github contribution snake" src="https://raw.githubusercontent.com/' +
    GITHUB_USER +
    "/" +
    GITHUB_USER +
    '/output/github-snake.svg" />',
  "  </picture>",
  "</p>",
].join("\n");

/* ── Assemble & write ────────────────────────────────────────────────────── */
(async function () {
  var postItems = await fetchMediumPosts();
  var fallback =
    '    <li>Visit <a href="' + BLOG_HOST + '">my blog</a> for the latest posts.</li>';

  var writing = [
    "## Recent Writing",
    "",
    "> Notes from the field on Cloud, SRE, and DevOps — published on [Medium](" +
      BLOG_HOST +
      ") and [Dev.to](https://dev.to/ramazanatalay).",
    "",
    "<details>",
    "  <summary>Recent articles</summary>",
    "  <ul>",
    postItems || fallback,
    "  </ul>",
    "</details>",
  ].join("\n");

  var footer = [
    "---",
    "",
    '<p align="center">',
    '  <i>"In theory, theory and practice are the same.<br/>In production, they are not."</i>',
    "</p>",
    "",
    '<p align="center">',
    '  <img src="https://komarev.com/ghpvc/?username=' +
      GITHUB_USER +
      '&label=Profile%20Views&color=7aa2f7&style=flat" alt="profile views" />',
    "</p>",
  ].join("\n");

  var readme = [
    header,
    "",
    "---",
    "",
    about,
    "",
    "---",
    "",
    techStack,
    "",
    "---",
    "",
    projects,
    "",
    "---",
    "",
    writing,
    "",
    "---",
    "",
    stats,
    "",
    "---",
    "",
    snake,
    "",
    footer,
  ].join("\n");

  fs.writeFile("README.md", readme, function (err) {
    if (err) return console.error("Error writing README.md:", err);
    console.info("✅  README.md written successfully");
  });
})();
