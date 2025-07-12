/* ---------- Dynamic YEAR in footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Header scroll & active‑link logic ---------- */
let activeSectionId = "home";

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });

  activeSectionId = id;
  updateActiveNav();
  toggleMobileMenu(false); // close on mobile
}

function updateActiveNav() {
  document.querySelectorAll(".nav-desktop button").forEach(btn => {
    btn.classList.toggle("active", btn.id === `nav-${activeSectionId}`);
  });
}

function toggleMobileMenu(forceState = null) {
  const menu = document.getElementById("mobileMenu");
  if (forceState === false) menu.style.display = "none";
  else if (forceState === true) menu.style.display = "flex";
  else menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  header.classList.toggle("scrolled", window.scrollY > 50);

  const ids = ["home", "about", "skills", "projects", "contact"];
  for (const id of ids) {
    const sec = document.getElementById(id);
    if (sec && window.scrollY + 100 >= sec.offsetTop && window.scrollY + 100 < sec.offsetTop + sec.offsetHeight) {
      activeSectionId = id;
      updateActiveNav();
      break;
    }
  }
});

/* ---------- Skills data & render ---------- */
/* ---------- Skills data & render ---------- */
const skillsData = [
  {
    title: "Frontend Development",
    skills: [
    
      { name: "Html5", level: 90 },
      { name: "CSS", level: 90 },
      { name: "Bootstrap", level: 90 },
      { name: "Java Script", level: 80 },
      { name: "React js", level: 70 }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Python.js", level: 85 },
      { name: "JAVA", level: 80 },
      { name: "Spring Boot", level: 85 },
      { name: "Postman API", level: 90 },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 80 },
   
    ]
  }
];

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  skillsData.forEach(({ title, skills }) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `<h3>${title}</h3>`;
    skills.forEach(s => {
      card.innerHTML += `
        <div class="skill-progress-group">
          <div class="skill-label"><span>${s.name}</span><span>${s.level}%</span></div>
          <div class="skill-bar"><div class="skill-bar-fill" style="width:${s.level}%"></div></div>
        </div>`;
    });
    grid.appendChild(card);
  });
}


/* ---------- Project data & render ---------- */
const projectData = [
  {title:"E‑Commerce Platform",desc:"Full‑stack shop with Stripe payments.",img:"https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["React","Node.js","MongoDB"],live:"#",code:"#",cat:"Web Development"},
  {title:"Task Management App",desc:"Realtime drag‑and‑drop tasks.",img:"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["React","TypeScript","Socket.io"],live:"#",code:"#",cat:"Web App"},
  {title:"Weather Dashboard",desc:"Forecasts & maps.",img:"https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["Vue","OpenWeather","Chart.js"],live:"#",code:"#",cat:"Web App"},
  {title:"Social Media Analytics",desc:"Data viz & reports.",img:"https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["Next.js","D3","Python"],live:"#",code:"#",cat:"Analytics"},
  {title:"Mobile Banking App",desc:"Secure transactions & budgets.",img:"https://images.pexels.com/photos/3943725/pexels-photo-3943725.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["React Native","Firebase"],live:"#",code:"#",cat:"Mobile App"},
  {title:"Learning Management System",desc:"Courses & video streaming.",img:"https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800",tech:["React","AWS","Prisma"],live:"#",code:"#",cat:"Education"},
];

const categories = ["All","Web Development","Web App","Mobile App","Analytics","Education"];
let selectedCategory = "All";

function renderCategoryFilters() {
  const wrap = document.getElementById("categoryFilters");
  wrap.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.toggle("active", cat === selectedCategory);
    btn.onclick = () => { selectedCategory = cat; renderCategoryFilters(); renderProjects(); };
    wrap.appendChild(btn);
  });
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  const filtered = selectedCategory === "All" ? projectData : projectData.filter(p => p.cat === selectedCategory);
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="info">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tech-tags">${p.tech.map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="actions">
          <a class="view" href="${p.live}" target="_blank">View Live</a>
          <a class="code" href="${p.code}" target="_blank">View Code</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ---------- Contact form handler ---------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name:form.name.value,
    email:form.email.value,
    subject:form.subject.value,
    message:form.message.value
  };
  console.log("Message received:", data);
  alert("Thanks! Your message has been sent.");
  form.reset();
});

/* ---------- Init ---------- */
renderSkills();
renderCategoryFilters();
renderProjects();
updateActiveNav(); // highlight "Home" on load
