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
    cv: "assets/sushant-cv.pdf"                                  // link to your CV (PDF or Drive URL)
  },

  social: {
    github: { url: "https://github.com/sushant4555", handle: "github.com/sushant4555" },
    linkedin: { url: "https://www.linkedin.com/in/sushant-mohurle", handle: "linkedin.com/in/sushant-mohurle" },
    instagram: { url: "https://www.instagram.com/sushant_mohurle", handle: "instagram.com/sushant_mohurle" }
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
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
      { icon: "chip", title: "Electronics", text: "Circuits, sensors and microcontrollers: the physical foundation of what I build." },
      { icon: "code", title: "Software Development", text: "Readable, practical code in C, C++, Java, Python and Node.js." },
      { icon: "iot", title: "IoT & Embedded Systems", text: "Connecting hardware to the real world with sensors, Arduino and live data." },
      { icon: "brain", title: "AI & Emerging Technology", text: "Working with LLMs and prompt engineering to shape what technology does next." }
    ],
    // Add real figures later, e.g. { value: "3", label: "Projects built" }
    stats: [
      { value: "BTech", label: "EXTC Student" },
      { value: "Raymond", label: "Inplant Intern" },
      { value: "Multiple", label: "Projects Built" },
      { value: "Verified", label: "Certifications" }
    ]
  },

  expertise: {
    lede: "Where hardware meets software, and curiosity meets practice.",
    items: [
      { icon: "chip", title: "Electronics & Embedded Systems", text: "Designing and building microcontroller-based circuits and sensor systems." },
      { icon: "iot", title: "IoT Development", text: "Connecting sensors and devices to monitor and respond to the real world." },
      { icon: "globe", title: "Web & Databases", text: "Building web pages and back-end services with HTML, CSS, Node.js and MySQL." },
      { icon: "term", title: "Programming", text: "Writing clear logic in C, C++, Java and Python." },
      { icon: "brain", title: "AI & LLMs", text: "Working with LLMs and prompt engineering to build smarter, more useful tools." },
      { icon: "bulb", title: "Problem Solving", text: "Breaking complex problems into simple, testable steps." }
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

  experience: {
    lede: "Practical industrial training, plant engineering exposure and real-world technology operations.",
    items: [
      {
        role: "Inplant Trainee (Engineering Intern)",
        badge: "Industrial Internship",
        company: "Raymond UCO Denim Pvt. Limited",
        location: "Yavatmal, Maharashtra, India",
        period: "May 2026 – June 2026",
        duration: "1 Month (10/05/2026 – 10/06/2026)",
        ref: "RUDPL/HR&A/YTML/2026",
        summary: "Successfully completed intensive inplant training at Raymond UCO Denim's manufacturing plant in Lohara, Yavatmal. Gained comprehensive hands-on exposure to industrial operations, manufacturing processes, automation systems, and engineering workflows in a high-scale production facility.",
        highlights: [
          "Hands-on exposure to industrial automation, electrical and electronic control systems, and instrumentation.",
          "Observed real-world plant operations, process monitoring, quality assurance protocols, and manufacturing workflows.",
          "Recognized and commended by management for being hardworking, enthusiastic, and cooperative throughout the training."
        ],
        tags: ["Industrial Automation", "Manufacturing Systems", "Instrumentation", "Plant Operations", "Electronics"],
        url: "assets/certificates/raymond-internship.pdf"
      }
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
        art: "match",                         // placeholder artwork: match | gas
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
      }
    ]
  },

  certifications: {
    lede: "Verified certifications and credentials in software development and technology.",
    items: [
      {
        name: "Industrial Inplant Training & Internship",
        org: "Raymond UCO Denim Pvt. Limited • Ref: RUDPL/HR&A/YTML/2026",
        year: "2026",
        url: "assets/certificates/raymond-internship.pdf",
        sample: false
      },
      {
        name: "Core Java Programming",
        org: "NICE Computer Education • Certificate ID: COREJAVA/2025-26/M161",
        year: "2026",
        url: "assets/certificates/Javac.pdf",
        sample: false
      },
      {
        name: "Getting Started with Full Stack Java Development",
        org: "Simplilearn SkillUP • Certificate Code: 10811255",
        year: "2026",
        url: "assets/certificates/getting-started-with-full-stack-java-development.pdf",
        sample: false
      },
      {
        name: "Advanced Python",
        org: "Simplilearn SkillUP • Certificate Code: 10836264",
        year: "2026",
        url: "assets/certificates/advanced-python.pdf",
        sample: false
      },
      {
        name: "C Programming Basics",
        org: "Simplilearn SkillUP • Certificate Code: 10804036",
        year: "2026",
        url: "assets/certificates/c-programming-basics.pdf",
        sample: false
      }
    ]
  },

  contactCopy: {
    sub: "I'm open to internships, projects, collaborations and opportunities in technology."
  }
};
