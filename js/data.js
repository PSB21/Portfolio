// All site content lives here. Edit this file to update the portfolio —
// no HTML changes needed.
window.PORTFOLIO = {
  name: "Pratik Bagad",
  firstName: "Pratik",
  roles: [
    "Full Stack Developer",
    "React & Node.js Engineer",
    "Production Problem-Solver",
    "Clean-Code Advocate",
  ],
  tagline:
    "I build fast, scalable web applications and make sure they land in production without drama — from pixel-perfect React front ends to robust Node.js APIs.",
  email: "pratikbagad2001@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/pratikbagad/",
    github: "https://github.com/PSB21",
  },
  // Optional: drop a PDF in /assets and set e.g. "assets/Pratik_Bagad_Resume.pdf"
  resume: "",

  stats: [
    { value: 2, suffix: "+", label: "Years building for the web" },
    { value: 20, suffix: "+", label: "Technologies in the toolkit" },
    { value: 1, suffix: "", label: "Excellence Award (2025)" },
  ],

  about: {
    heading: "Engineering with intent.",
    paragraphs: [
      "I'm a passionate Full Stack Developer with over two years of experience building seamless, scalable and innovative web applications. I love turning complex ideas into experiences that feel simple to use.",
      "My sweet spot is the JavaScript ecosystem — React and Next.js on the front, Node.js and Express on the back — with a strong focus on clean code, scalability and intuitive design. I thrive in dynamic teams where creativity meets technology, and I'm always learning something new.",
      "Away from the editor you'll find me solving problems in C++, practising yoga, or at the occasional tech meet-up.",
    ],
    pillars: [
      {
        title: "Ownership to production",
        text: "I don't stop at merge. I stay close to releases, monitor rollouts and resolve issues quickly.",
      },
      {
        title: "Clean, scalable code",
        text: "Readable components, well-shaped APIs and tests that make change safe.",
      },
      {
        title: "Always learning",
        text: "Competitive programming and new tools keep my problem-solving sharp.",
      },
    ],
  },

  skills: [
    {
      group: "Frontend",
      icon: "◐",
      items: ["React", "Next.js", "JavaScript", "Redux", "HTML5", "CSS3", "SCSS"],
    },
    {
      group: "Backend & APIs",
      icon: "◑",
      items: ["Node.js", "Express.js", "GraphQL", "REST APIs", "Python"],
    },
    {
      group: "Data",
      icon: "◒",
      items: ["MySQL", "Query design", "Data modelling"],
    },
    {
      group: "Cloud & Delivery",
      icon: "◓",
      items: ["Azure DevOps", "Vercel", "Git", "GitHub", "CI/CD"],
    },
    {
      group: "Tooling & Quality",
      icon: "◔",
      items: ["Vite", "Webpack", "Babel", "Jest", "npm", "Postman"],
    },
    {
      group: "Problem Solving",
      icon: "◕",
      items: ["C++", "Data Structures", "Algorithms", "Debugging"],
    },
  ],

  experience: [
    {
      role: "Software Developer — Full Stack",
      company: "Cogitate Technology Solutions",
      period: "Present",
      points: [
        "Build and maintain full stack features with React, Node.js and modern JavaScript tooling.",
        "Played a key role in the staggered production release of IH — ensuring a smooth rollout and prompt resolution of issues.",
        "Recognised with the Excellence Award (Oct 2025) for technical expertise, proactive problem-solving and commitment to team success.",
      ],
      tags: ["React", "Node.js", "JavaScript", "Azure DevOps"],
    },
  ],

  award: {
    title: "Excellence Award",
    issuer: "Cogitate Technology Solutions",
    date: "October 2025",
    quote:
      "Pratik has been instrumental in supporting IH during its staggered production release, demonstrating both technical expertise and unwavering dedication. As a developer, he has gone above and beyond typical responsibilities to ensure smooth rollout and prompt resolution of issues. His proactive approach, problem-solving skills, and commitment to team success have been invaluable.",
  },

  // Add projects here to show a "Selected Work" section, e.g.
  // { title: "Project name", description: "What it does", tags: ["React"], live: "https://…", code: "https://github.com/…" }
  projects: [],
};
