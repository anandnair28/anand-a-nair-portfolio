"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const withBasePath = (path: string) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
};

const PROFILE_IMAGE = withBasePath("dp/anand-a-nair-dp.jpeg");

type NavKey = "about" | "education" | "experience" | "skills" | "contact";

const navLinks: { key: NavKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact" },
];

interface MetricCard {
  icon: string;
  label: string;
  figure: string;
  stat: string;
}

interface ArchItem {
  title: string;
  detail: string;
}

interface ExperienceEntry {
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  metrics: MetricCard[];
  architecture: ArchItem[];
}

const experiences: ExperienceEntry[] = [
  {
    title: "BNY — Senior Associate, Full Stack Developer",
    subtitle: "Markets Execution Services | Chennai, India",
    period: "Mar 2024 - Present",
    summary:
      "Owned high-scale metrics computation, Python platform modernisation, and production AI/ML products supporting macro strategy insights and FX execution workflows.",
    metrics: [
      {
        icon: "🚀",
        label: "Metric Highlight",
        figure: "12.5M RECORDS / RUN",
        stat: "Refactored Pandas → Polars\nRuntime: 4 Hours → 1.5 Hours\n(1 Core instead of 4)",
      },
      {
        icon: "⚡",
        label: "CI/CD Impact",
        figure: "Failures: 50% → ~0%",
        stat: "Build Time: 20m → 4m",
      },
    ],
    architecture: [
      {
        title: "Data Pipeline Modernization",
        detail:
          "Migrated core computing layers to Polars, slashing runtimes across equity and fixed income holdings computations processing ~12.5M records/run.",
      },
      {
        title: "Infrastructure & System Maintainability",
        detail:
          "Led Python 3.13 migration across 12 services and built reusable Docker base images, cutting container build time from ~20m to ~4m.",
      },
      {
        title: "AI Integration & LLM Orchestration",
        detail:
          "Deployed automated market communications tool publishing 3 session-aligned summaries/day to 100+ internal recipients.",
      },
      {
        title: "FX Forecasting & ML Models",
        detail:
          "Built FX forecasting models trained on >1B tick datapoints, backtested across 21 currency pairs with ~$1M simulated PnL over 9 months.",
      },
      {
        title: "Technical Leadership",
        detail:
          "Led 4-developer virtual pod across sprint planning, Jira execution, and model governance controls with 2 business owners.",
      },
    ],
  },
  {
    title: "BNY — Associate, Full Stack Developer",
    subtitle: "iFlow, Markets & Macro Strategy Analytics | Chennai, India",
    period: "Jul 2022 - Feb 2024",
    summary:
      "Delivered full-stack features and large-scale data pipelines for a global markets analytics platform, improving deployment speed, data throughput, and engineering quality.",
    metrics: [
      {
        icon: "📊",
        label: "Data Scale",
        figure: "1K → 1.5M Records",
        stat: "Per batch across ~20 pipelines\nMulti-source feeds integrated",
      },
      {
        icon: "🚀",
        label: "Release Speed",
        figure: "4 Hours → 20 Minutes",
        stat: "Production release cycle\n1x/month → 2x/month cadence",
      },
    ],
    architecture: [
      {
        title: "ETL & Data Sourcing",
        detail:
          "Built Oracle-based workflows integrating REST APIs, CSV/NAS, Denodo, Sybase, Vertica, and MSSQL across FX, equities, and fixed income.",
      },
      {
        title: "CI/CD Standardization",
        detail:
          "Designed GitLab CI/CD Docker template deploying 13 services (6 Python, 7 Java) to internal AppEngine.",
      },
      {
        title: "Quality Engineering",
        detail:
          "Integrated SonarQube quality gates and lifted unit test coverage to ~80% across Java and Angular (v2+) services.",
      },
      {
        title: "Angular UI Delivery",
        detail:
          "Delivered enhancements across analytics screens (Flows, Monitor, Global Heatmap, Saved Charts) with CSV/PNG export support.",
      },
    ],
  },
  {
    title: "BNY Mellon — Summer Associate Intern",
    subtitle: "FX Payments | Chennai, India (Remote)",
    period: "Jun 2021 - Aug 2021",
    summary:
      "Modernised an internal FX rate-sheet admin platform by migrating legacy AngularJS to Angular and strengthening RBAC and test coverage for release readiness.",
    metrics: [],
    architecture: [
      {
        title: "AngularJS → Angular Migration",
        detail:
          "Migrated DFX Admin module (1 screen, 4 tabs) within a 6-week window across 2 Agile sprints.",
      },
      {
        title: "Spring Boot & RBAC",
        detail:
          "Implemented REST APIs and enforced role-based authorisation across 4 roles (GAMO, Viewer, Trader, Admin).",
      },
      {
        title: "Test Coverage",
        detail:
          "Achieved ~85% coverage across Angular/Karma and Spring Boot unit tests.",
      },
    ],
  },
  {
    title: "iDatalytics — Research Trainee",
    subtitle: "Kochi, India (Winter Internship)",
    period: "Dec 2019 - Jan 2020",
    summary:
      "Prototyped an NLP-driven recruitment screening workflow by extracting and ranking high-signal resume and job-description content.",
    metrics: [],
    architecture: [
      {
        title: "NLP Prototype",
        detail:
          "Built Python NLP pipeline to extract structured fields from resumes and match against job descriptions.",
      },
      {
        title: "TextRank Ranking",
        detail:
          "Implemented TextRank-based summarisation to surface top relevance signals from profiles and JDs.",
      },
      {
        title: "UiPath Automation",
        detail:
          "Automated outreach-preparation steps, cutting turnaround time for screening inputs and cold-email drafting.",
      },
    ],
  },
];

const skillCategories = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    label: "Frameworks & Tools",
    items: [
      "FastAPI",
      "Flask",
      "Streamlit",
      "LangChain",
      "Angular",
      "Spring Boot",
      "Node.js",
    ],
  },
  {
    label: "Data & ML",
    items: [
      "LLMs / RAG",
      "Agentic AI",
      "Vector Databases",
      "Machine Learning",
      "scikit-learn",
      "MLflow",
      "XGBoost",
    ],
  },
  {
    label: "Data Platforms",
    items: [
      "Snowflake",
      "Polars",
      "Oracle SQL",
      "Amazon S3",
      "Microsoft SQL Server",
    ],
  },
  {
    label: "DevOps & Infrastructure",
    items: [
      "Docker",
      "CI/CD Pipelines",
      "GitLab CI/CD",
      "SonarQube",
      "Performance Optimisation",
    ],
  },
  {
    label: "Finance & Quant",
    items: [
      "Algorithmic Trading",
      "Backtesting Frameworks",
      "Quantitative Analysis",
    ],
  },
];

const iconSrc = {
  sun: withBasePath("/icons/sun.svg"),
  moon: withBasePath("/icons/moon.svg"),
  phone: withBasePath("/icons/phone.svg"),
  mail: withBasePath("/icons/mail.svg"),
  github: withBasePath("/icons/github.svg"),
  linkedin: withBasePath("/icons/linkedin.svg"),
  leetcode: withBasePath("/icons/leetcode.svg"),
  graduation: withBasePath("/icons/graduation-cap.svg"),
} as const;

const contactItems = [
  {
    key: "phone-1",
    iconKey: "phone" as const,
    label: "Phone",
    value: "+91 8547 966 900",
    href: "tel:+918547966900",
    action: "copy" as const,
  },
  {
    key: "phone-2",
    iconKey: "phone" as const,
    label: "Alternate Phone",
    value: "+91 6238 985 451",
    href: "tel:+916238985451",
    action: "copy" as const,
  },
  {
    key: "mail",
    iconKey: "mail" as const,
    label: "Email",
    value: "nair.anand2000@gmail.com",
    href: "mailto:nair.anand2000@gmail.com",
    action: "copy" as const,
  },
  {
    key: "linkedin",
    iconKey: "linkedin" as const,
    label: "LinkedIn",
    value: "linkedin.com/in/anandnair28",
    href: "https://linkedin.com/in/anandnair28",
    action: "visit" as const,
  },
  {
    key: "github",
    iconKey: "github" as const,
    label: "GitHub",
    value: "github.com/anand-a-nair",
    href: "https://github.com/anand-a-nair",
    action: "visit" as const,
  },
  {
    key: "leetcode",
    iconKey: "leetcode" as const,
    label: "LeetCode",
    value: "leetcode.com/u/5C6mtMabPB",
    href: "https://leetcode.com/u/5C6mtMabPB",
    action: "visit" as const,
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observerRef.current?.observe(s));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField(null), 1400);
    } catch {
      setCopiedField(null);
    }
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="page-root">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <button className="nav-brand" onClick={() => scrollTo("hero")}>
          ANAND.
        </button>
        <div className="nav-links">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className={`nav-link ${activeSection === link.key ? "active" : ""}`}
              onClick={() => scrollTo(link.key)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Image
              src={theme === "light" ? iconSrc.moon : iconSrc.sun}
              alt=""
              width={18}
              height={18}
            />
          </button>
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ── Mobile Nav ── */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className={`mobile-nav-link ${activeSection === link.key ? "active" : ""}`}
              onClick={() => scrollTo(link.key)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <section id="hero" className="hero-section">
        <div className="hero-grid">
          <div className="hero-text">
            <p className="hero-greeting">👋 Hey! I am</p>
            <h1 className="hero-name">ANAND NAIR</h1>
            <p className="hero-tagline">
              Building High-Performance AI Products
              <br />
              &amp; Large-Scale Data Pipelines.
            </p>
            <p className="hero-desc">
              Full-stack architecture optimized for measurable business outcomes.
            </p>
            <div className="hero-ctas">
              <button className="cta-primary" onClick={() => scrollTo("experience")}>
                View Experience ↓
              </button>
              <button className="cta-secondary" onClick={() => scrollTo("contact")}>
                Contact Me
              </button>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="profile-ring">
              {PROFILE_IMAGE ? (
                <Image
                  src={PROFILE_IMAGE}
                  alt="Anand Nair"
                  className="profile-img"
                  fill
                  sizes="(max-width: 720px) 230px, 310px"
                  priority
                />
              ) : (
                <span className="profile-initials">AN</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="page-section">
        <div className="section-inner">
          <h2 className="section-title">About Me</h2>
          <div className="neu-card about-card">
            <p>
              Data-driven full-stack developer building analytics platforms and
              ML-backed products in global markets. Experienced in high-scale
              data processing, CI/CD, and cloud-native services, with hands-on
              work in LLM applications and model governance.
            </p>
            <p>
              Known for improving performance, reliability, and delivery speed
              with measurable outcomes. I thrive at the intersection of
              engineering rigour and product thinking.
            </p>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="page-section">
        <div className="section-inner">
          <h2 className="section-title">Education</h2>
          <div className="neu-card">
            <div className="edu-header">
              <div className="edu-icon-wrap">
                <Image
                  src={iconSrc.graduation}
                  alt=""
                  width={22}
                  height={22}
                />
              </div>
              <div>
                <h3>NIT Tiruchirappalli</h3>
                <p className="edu-meta">2018 – 2022 | CGPA: 8.22</p>
              </div>
            </div>
            <p className="edu-degree">
              B.Tech in Computer Science and Engineering (Minor: Economics)
            </p>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="page-section">
        <div className="section-inner">
          <h2 className="section-title">Experience</h2>
          <div className="experience-stack">
            {experiences.map((exp, idx) => (
              <div key={idx} className="exp-entry">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-title">{exp.title}</h3>
                    <p className="exp-subtitle">{exp.subtitle}</p>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <p className="exp-summary">{exp.summary}</p>

                {exp.metrics.length > 0 ? (
                  <div className="exp-body">
                    <div className="metrics-col">
                      {exp.metrics.map((m, mi) => (
                        <div key={mi} className="metric-card">
                          <div className="metric-label">
                            {m.icon} {m.label}
                          </div>
                          <div className="metric-figure">{m.figure}</div>
                          <div className="metric-stat">{m.stat}</div>
                        </div>
                      ))}
                    </div>
                    <div className="arch-col">
                      <div className="arch-label">Project Architecture</div>
                      {exp.architecture.map((a, ai) => (
                        <div key={ai} className="arch-item">
                          <span className="arch-bullet">•</span>
                          <div>
                            <strong>{a.title}</strong>
                            <p>{a.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="simple-arch">
                    {exp.architecture.map((a, ai) => (
                      <div key={ai} className="arch-item">
                        <span className="arch-bullet">•</span>
                        <div>
                          <strong>{a.title}</strong>
                          <p>{a.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="page-section">
        <div className="section-inner">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="skills-grid">
            {skillCategories.map((cat) => (
              <div key={cat.label} className="neu-card">
                <h3 className="skill-category">{cat.label}</h3>
                <div className="skill-pills">
                  {cat.items.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="page-section">
        <div className="section-inner">
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-grid">
            {contactItems.map((item) => (
              <div key={item.key} className="neu-card contact-row">
                <div className="contact-icon-wrap">
                  <Image src={iconSrc[item.iconKey]} alt="" width={16} height={16} />
                </div>
                <div>
                  <p className="contact-label">{item.label}</p>
                  <a
                    className="contact-value"
                    href={item.href}
                    target={item.action === "visit" ? "_blank" : undefined}
                    rel={item.action === "visit" ? "noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                </div>
                {item.action === "copy" ? (
                  <button
                    className="contact-action"
                    onClick={() => copyText(item.key, item.value)}
                  >
                    {copiedField === item.key ? "Copied!" : "Copy"}
                  </button>
                ) : (
                  <a
                    className="contact-action"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <p>Anand A Nair © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
