/* ==========================================================================
   EDIT YOUR CONTENT HERE. Everything personal lives in this one object.
   ========================================================================== */
window.PORTFOLIO = {
  site: {
    name: "Sushant Mohurle",
    brand: "Sushant",                       // shows as "Sushant." in the nav and footer
    tagline: "Building, learning and creating with technology.",
    year: 2026
  },

  // Profile photo. Replace assets/photo.webp with your own file (same name), or change the path here.
  // Set src to "" to show the placeholder. Transparent or dark-background photos blend best.
  photo: { src: "assets/photo.webp", alt: "Portrait of Sushant Mohurle" },

  contact: {
    email: "sushantmohurle69@gmail.com",   // e.g. "you@gmail.com". Enables the form and email links.
    emailPlaceholder: "sushantmohurle69@gmail.com",
    location: "Yavatmal, Maharashtra, India",
    cv: "https://drive.google.com/file/d/1knEwW0G-KNIhHOnN_khH0yFFFyw-ri3C/view?usp=drivesdk"                                  // link to your CV (PDF or Drive URL)
  },

  social: {
    github:    { url: "https://github.com/sushant4555", handle: "github.com/sushant4555" },
    linkedin:  { url: "https://www.linkedin.com/in/sushant-mohurle", handle: "linkedin.com/in/sushant-mohurle" },
    instagram: { url: "https://www.instagram.com/sushant_mohurle", handle: "instagram.com/sushant_mohurle" }
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" }
  ],

  hero: {
    greeting: "HI, I'M SUSHANT",
    lines: ["Technology", "Enthusiast"],
    intro: "BTech Electronics and Telecommunication Engineering student passionate about electronics, software development, IoT, AI, and building practical technology solutions.",
    status: "OPEN TO OPPORTUNITIES",
    chip: { title: "Electronics Engineer", text: "Electronics and Telecommunication" }
  },

  marquee: ["Electronics", "Software", "IoT", "Embedded", "AI", "Web"],

  about: {
    statement: "I'm a BTech Electronics and Telecommunication Engineering student who enjoys working where hardware meets software. From microcontrollers and sensors to web apps and intelligent systems, I like turning ideas into practical technology that solves real problems.",
    cards: [
      { icon: "chip",  title: "Electronics", text: "Circuits, sensors and microcontrollers: the physical foundation of what I build." },
      { icon: "code",  title: "Software Development", text: "Readable, practical code in C, C++, Java, Python and Node.js." },
      { icon: "iot",   title: "IoT & Embedded Systems", text: "Connecting hardware to the real world with sensors, Arduino and live data." },
      { icon: "brain", title: "AI & Emerging Technology", text: "Working with LLMs and prompt engineering to shape what technology does next." }
    ],
    // Add real figures later, e.g. { value: "3", label: "Projects built" }
    stats: [
      { value: "BTech", label: "Student" },
      { value: "Multiple", label: "Projects" },
      { value: "Technical", label: "Skills" },
      { value: "Continuous", label: "Learning" }
    ]
  },

  expertise: {
    lede: "Where hardware meets software, and curiosity meets practice.",
    items: [
      { icon: "chip",   title: "Electronics & Embedded Systems", text: "Designing and building microcontroller-based circuits and sensor systems." },
      { icon: "iot",    title: "IoT Development", text: "Connecting sensors and devices to monitor and respond to the real world." },
      { icon: "globe",  title: "Web & Databases", text: "Building web pages and back-end services with HTML, CSS, Node.js and MySQL." },
      { icon: "term",   title: "Programming", text: "Writing clear logic in C, C++, Java and Python." },
      { icon: "brain",  title: "AI & LLMs", text: "Working with LLMs and prompt engineering to build smarter, more useful tools." },
      { icon: "bulb",   title: "Problem Solving", text: "Breaking complex problems into simple, testable steps." }
    ]
  },

  // Add, remove or rename anything here. Each group renders automatically.
  skills: {
    lede: "The languages, tools and technologies I work with.",
    groups: [
      { title: "Programming", items: ["C", "C++", "Java", "Python"] },
      { title: "Web & Databases", items: ["HTML", "CSS", "Node.js", "MySQL"] },
      { title: "AI", items: ["LLMs", "Prompt Engineering"] }
    ]
  },

  projects: {
    lede: "Things I've built to learn, test ideas and solve real problems.",
    items: [
      {
        title: "Internship and Job Matching Platform",
        kind: "Web platform",
        description: "A platform designed to connect students and candidates with relevant internships and job opportunities using intelligent matching.",
        tags: ["Web App", "Matching Logic", "Database"],
        art: "match",                         // placeholder artwork: match | gas | env
        image: "",                            // optional: your own screenshot URL / data URI
        demo: "",                             // View Project link
        github: ""                            // repo link (falls back to your GitHub profile)
      },
      {
        title: "LPG Gas Leakage Detection System",
        kind: "Electronics",
        description: "An electronics-based safety system that detects LPG gas leakage and provides an alert for improved safety.",
        tags: ["Electronics", "Gas Sensor", "Alert System"],
        art: "gas", image: "", demo: "", github: ""
      },
    ]
  },

  certifications: {
    lede: "Sample entries below. Replace them with your own certificates.",
    items: [
      { name: "Certification Name", org: "Issuing Organization", year: "20XX", url: "", sample: true },
      { name: "Certification Name", org: "Issuing Organization", year: "20XX", url: "", sample: true },
      { name: "Certification Name", org: "Issuing Organization", year: "20XX", url: "", sample: true }
    ]
  },

  contactCopy: {
    sub: "I'm open to internships, projects, collaborations and opportunities in technology."
  }
};
