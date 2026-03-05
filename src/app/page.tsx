"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type TabKey =
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "contact"
  | "fun";

const PROFILE_IMAGE = "dp/anand-a-nair-dp.jpeg"; // Set to your image path from /public, e.g. "/anand.jpg"
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const withBasePath = (path: string) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "about", label: "About Me" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact Me" },
  { key: "fun", label: "Fun" },
];

const skills = {
  Languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  "Frameworks & Tools": [
    "Flask",
    "FastAPI",
    "Streamlit",
    "LangChain",
    "Angular",
    "Spring Boot",
    "REST APIs",
    "Node.js",
  ],
  "Data & ML": [
    "Large Language Models (LLMs)",
    "Retrieval-Augmented Generation (RAG)",
    "Agentic AI",
    "Vector Databases",
    "Vector Embeddings",
    "Semantic Search",
    "Machine Learning",
    "scikit-learn",
    "MLflow",
    "Random Forest",
    "XGBoost",
    "Model Training & Evaluation",
    "Hyperparameter Tuning (GridSearchCV)",
  ],
  Data: [
    "Snowflake",
    "Oracle SQL",
    "PL/SQL",
    "Microsoft SQL Server (MSSQL)",
    "Amazon S3",
    "Polars",
  ],
  "DevOps & Monitoring": [
    "CI/CD",
    "Performance Optimisation",
    "Load Testing",
    "Docker",
    "GitLab CI/CD",
    "SonarQube",
  ],
  "Finance & Quant": [
    "Algorithmic Trading",
    "Backtesting",
    "Quantitative Analysis",
  ],
  Others: ["Git", "GitHub", "GitLab", "Microsoft Excel", "UI/UX Design"],
};

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

const resolvedProfileImage = PROFILE_IMAGE ? withBasePath(PROFILE_IMAGE) : "";
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }
    setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField(null), 1400);
    } catch {
      setCopiedField(null);
    }
  };

  const section = useMemo(() => {
    if (!activeTab) {
      return null;
    }

    if (activeTab === "about") {
      return {
        title: "About Me",
        body: (
          <article className="info-card">
            <h3>Professional Summary</h3>
            <p>
              Data-driven full-stack developer building analytics platforms and
              ML-backed products in global markets. Experienced in high-scale
              data processing, CI/CD and cloud-native services, with hands-on
              work in LLM applications and model governance.
            </p>
            <p>
              Known for improving performance, reliability, and delivery speed
              with measurable outcomes.
            </p>
          </article>
        ),
      };
    }

    if (activeTab === "education") {
      return {
        title: "Education",
        body: (
          <article className="info-card">
            <h3 className="title-with-icon">
              <span className="inline-icon" aria-hidden="true">
                <Image src={iconSrc.graduation} alt="" width={18} height={18} />
              </span>
              NIT Tiruchirappalli
            </h3>
            <p className="meta-line">2018 - 2022 | CGPA: 8.22</p>
            <p>
              Bachelor of Technology in Computer Science and Engineering
              (Minor: Economics)
            </p>
          </article>
        ),
      };
    }

    if (activeTab === "experience") {
      return {
        title: "Experience",
        className: "experience-mode",
        body: (
          <div className="experience-shell">
            <div className="experience-scroll">
              <div className="timeline single-column">
              <article className="info-card">
                <h3>BNY - Senior Associate, Full Stack Developer</h3>
                <p className="meta-line">
                  Markets Execution Services | Mar 2024 - Present | Chennai, TN,
                  India
                </p>
                <p>
                  Owned high-scale metrics computation, Python platform
                  modernisation, and production AI/ML products supporting macro
                  strategy insights and FX execution workflows.
                </p>
                <ul className="point-list">
                  <li>
                    Optimised equity and fixed income holdings computations
                    processing ~12.5M records/run by refactoring pipelines from
                    Pandas-style processing to Polars, cutting runtime from ~4
                    hours (4 cores) to ~1.5 hours (1 core).
                  </li>
                  <li>
                    Led migration of 12 Python services from Python 3.9 to
                    Python 3.13, aligning with deprecation and vulnerability
                    requirements while improving release readiness and
                    maintainability.
                  </li>
                  <li>
                    Designed a reusable Docker base image for Python services,
                    reducing container build time from ~20 minutes to ~4
                    minutes and standardising runtime dependencies across
                    services.
                  </li>
                  <li>
                    Strengthened CI/CD with unit testing and SonarQube quality
                    gates for Python services, reducing QA-region deployment
                    issues from ~50% of deployments to near zero.
                  </li>
                  <li>
                    Delivered LLM-based market communications automation,
                    publishing 3 session-aligned summaries/day (APAC/EMEA/US)
                    and generating a configurable macro digest from ~10-15
                    items/day to 100+ internal recipients.
                  </li>
                  <li>
                    Enhanced Flowriter with URL ingestion and configurable
                    writing tools (Polisher, Highlighter) and contributed to
                    modernising the application from Streamlit towards an
                    Angular architecture for scalability.
                  </li>
                  <li>
                    Built and productionised FX forecasting models for Digital
                    Trader (EOD balances and intraday spread by desk), training
                    on &gt;1B tick datapoints and ~1M trades/5 years;
                    backtested 21 currency pairs with ~$1M simulated PnL over 9
                    months.
                  </li>
                  <li>
                    Acted as technical lead for a 4-developer virtual pod,
                    running sprint planning and Jira execution, aligning with 2
                    business owners/traders, and enforcing model governance
                    controls (regression suites, versioning, deployment
                    readiness).
                  </li>
                  <li>
                    Co-owned Markets Data Platform design to centralise datasets
                    in Snowflake, targeting consolidation of 4 applications and
                    ingestion from ~30 source systems into a governed, reusable
                    datastore.
                  </li>
                </ul>
              </article>

              <article className="info-card">
                <h3>BNY - Associate, Full Stack Developer</h3>
                <p className="meta-line">
                  iFlow, Markets &amp; Macro Strategy Analytics | Jul 2022 - Feb
                  2024 | Chennai, TN, India
                </p>
                <p>
                  Delivered full-stack features and large-scale data pipelines
                  for a global markets analytics platform, improving deployment
                  speed, data throughput, and engineering quality across
                  multi-service architecture.
                </p>
                <ul className="point-list">
                  <li>
                    Built scalable ETL and data-sourcing workflows on Oracle,
                    delivering ~20 pipelines and scaling ingestion from ~1,000
                    to ~1.5M records per batch across metric computation jobs.
                  </li>
                  <li>
                    Integrated multi-source data feeds (REST APIs, CSV/NAS,
                    Denodo, Sybase, Vertica, Microsoft SQL Server) to support
                    cross-asset analytics across FX, equities, and fixed income.
                  </li>
                  <li>
                    Designed a standardised GitLab CI/CD template using Docker
                    to deploy 13 services (6 Python, 7 Java) to internal
                    AppEngine, cutting production releases from ~4 hours to ~20
                    minutes.
                  </li>
                  <li>
                    Eliminated deployment-side failures (2 services failing per
                    release to 0) by codifying configuration handling and
                    release readiness checks within CI/CD pipelines.
                  </li>
                  <li>
                    Improved release cadence from 1x/month to 2x/month and
                    enabled on-demand releases via RFC, increasing delivery
                    responsiveness to strategist and client needs.
                  </li>
                  <li>
                    Automated QA-region deployments from ~30 minutes manual
                    effort to 1-click pipelines completing in ~2 minutes,
                    improving environment consistency and developer throughput.
                  </li>
                  <li>
                    Integrated SonarQube quality gates and unit testing to lift
                    coverage to ~80% across Java services and Angular (v2+)
                    front end.
                  </li>
                  <li>
                    Delivered Angular UI enhancements across key analytics
                    screens (Flows, Monitor, Global Heatmap, Saved Charts) and
                    enabled CSV/PNG chart exports.
                  </li>
                  <li>
                    Owned and stabilised 6 production Python metric services
                    post-transition, leading incident response and recomputation
                    procedures and partnering with analytics teams to improve
                    delivery discipline.
                  </li>
                </ul>
              </article>

              <article className="info-card">
                <h3>BNY Mellon - Summer Associate Intern (FX Payments)</h3>
                <p className="meta-line">
                  Jun 2021 - Aug 2021 | Chennai, TN, India (Remote)
                </p>
                <p>
                  Modernised an internal FX rate-sheet admin platform by
                  migrating legacy AngularJS functionality to Angular and
                  strengthening RBAC and test coverage for release readiness.
                </p>
                <ul className="point-list">
                  <li>
                    Migrated a discrete DFX Admin module (1 screen, 4 tabs)
                    from AngularJS to Angular (v2+) within a 6-week delivery
                    window across 2 Agile sprints.
                  </li>
                  <li>
                    Implemented Spring Boot backend integration and REST APIs
                    for migrated flows, improving maintainability by retiring
                    legacy J2EE-style access-control patterns.
                  </li>
                  <li>
                    Enforced role-based authorisation (RBAC) via the internal
                    entitlements API across 4 roles (GAMO, Viewer, Trader,
                    Admin).
                  </li>
                  <li>
                    Built comprehensive unit tests across Angular/Karma and
                    Spring Boot, achieving ~85% coverage.
                  </li>
                  <li>
                    Supported SQL/DBMS configuration updates required for
                    rate-sheet generation and delivery-profile behaviour across
                    channels (SFTP, Email, SWIFT) and formats (XLS, XML, TXT).
                  </li>
                  <li>
                    Collaborated with stakeholders across London and the US to
                    clarify requirements and deliver within corporate
                    engineering standards.
                  </li>
                </ul>
              </article>

              <article className="info-card">
                <h3>iDatalytics - Research Trainee (Winter Internship)</h3>
                <p className="meta-line">
                  Dec 2019 - Jan 2020 | Kochi, KL, India
                </p>
                <p>
                  Prototyped an NLP-driven recruitment screening and outreach
                  workflow by extracting and ranking high-signal resume and
                  job-description content.
                </p>
                <ul className="point-list">
                  <li>
                    Built a Python NLP prototype to extract structured fields
                    (skills, keywords, experience) from resumes and compare
                    against job descriptions, reducing manual screening effort.
                  </li>
                  <li>
                    Implemented TextRank-based ranking/summarisation to surface
                    top relevance signals from profiles and JDs, improving match
                    quality and early-stage review speed.
                  </li>
                  <li>
                    Automated repetitive data handling and outreach-preparation
                    steps using UiPath, cutting turnaround time for screening
                    inputs and cold-email drafting workflows.
                  </li>
                  <li>
                    Cleaned and validated datasets by standardising inputs and
                    correcting noisy entries, improving downstream NLP
                    evaluation quality.
                  </li>
                </ul>
              </article>
              </div>
            </div>
            <div className="scroll-hint" aria-hidden="true">
              <span className="scroll-pill">
                Scroll for more
                <span className="scroll-arrow">↓</span>
              </span>
            </div>
          </div>
        ),
      };
    }

    if (activeTab === "projects") {
      return {
        title: "Projects",
        body: (
          <article className="wip-card">
            <h3>Coming Soon</h3>
            <p>This section will be updated shortly.</p>
          </article>
        ),
      };
    }

    if (activeTab === "skills") {
      return {
        title: "Skills",
        body: (
          <div className="skills-table" role="table" aria-label="Skills">
            {Object.entries(skills).map(([category, items]) => (
              <section className="skill-row" key={category} role="row">
                <h3 role="rowheader">{category}</h3>
                <div className="skill-line" role="cell">
                  {items.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ),
      };
    }

    if (activeTab === "contact") {
      return {
        title: "Contact Me",
        body: (
          <section className="contact-card-clean" aria-label="Contact Details">
            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.phone} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>Phone</p>
                <a href="tel:+918547966900">+91 8547 966 900</a>
              </div>
              <button
                type="button"
                className="contact-action"
                onClick={() => copyText("phone-1", "+91 8547 966 900")}
              >
                {copiedField === "phone-1" ? "Copied" : "Copy"}
              </button>
            </article>

            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.phone} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>Alternate Phone</p>
                <a href="tel:+916238985451">+91 6238 985 451</a>
              </div>
              <button
                type="button"
                className="contact-action"
                onClick={() => copyText("phone-2", "+91 6238 985 451")}
              >
                {copiedField === "phone-2" ? "Copied" : "Copy"}
              </button>
            </article>

            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.mail} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>Mail</p>
                <a href="mailto:nair.anand2000@gmail.com">nair.anand2000@gmail.com</a>
              </div>
              <button
                type="button"
                className="contact-action"
                onClick={() => copyText("mail", "nair.anand2000@gmail.com")}
              >
                {copiedField === "mail" ? "Copied" : "Copy"}
              </button>
            </article>

            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.linkedin} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>LinkedIn</p>
                <a
                  href="https://linkedin.com/in/anandnair28"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/anandnair28
                </a>
              </div>
              <a
                className="contact-action link"
                href="https://linkedin.com/in/anandnair28"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
            </article>

            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.github} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>GitHub</p>
                <a href="https://github.com/anand-a-nair" target="_blank" rel="noreferrer">
                  github.com/anand-a-nair
                </a>
              </div>
              <a
                className="contact-action link"
                href="https://github.com/anand-a-nair"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
            </article>

            <article className="contact-row">
              <span className="contact-icon-wrap">
                <Image src={iconSrc.leetcode} alt="" width={14} height={14} />
              </span>
              <div className="contact-main">
                <p>LeetCode</p>
                <a
                  href="https://leetcode.com/u/5C6mtMabPB"
                  target="_blank"
                  rel="noreferrer"
                >
                  leetcode.com/u/5C6mtMabPB
                </a>
              </div>
              <a
                className="contact-action link"
                href="https://leetcode.com/u/5C6mtMabPB"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
            </article>
          </section>
        ),
      };
    }

    return {
      title: "Fun",
      body: (
        <article className="wip-card">
          <h3>Coming Soon</h3>
          <p>This section will be updated shortly.</p>
        </article>
      ),
    };
  }, [activeTab, copiedField]);

  const openTab = (tabKey: TabKey) => {
    setActiveTab((current) => (current === tabKey ? null : tabKey));
    setMobileMenuOpen(false);
    window.requestAnimationFrame(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const collapseTab = () => {
    setActiveTab(null);
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <main className={`portfolio-shell ${activeTab ? "section-open" : ""}`}>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark and light mode"
        role="switch"
        aria-checked={theme === "dark"}
      >
        <span className="theme-icon" aria-hidden="true">
          <Image src={iconSrc.sun} alt="" width={20} height={20} />
        </span>
        <span className="theme-icon" aria-hidden="true">
          <Image src={iconSrc.moon} alt="" width={20} height={20} />
        </span>
        <span className="toggle-thumb" aria-hidden="true" />
      </button>

      <section className={`tab-zone ${activeTab ? "has-selection" : ""}`}>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="profile-tab-list"
          aria-label="Toggle sections menu"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
          <span>Menu</span>
        </button>
        <button
          type="button"
          className={`mobile-menu-backdrop ${mobileMenuOpen ? "mobile-open" : ""}`}
          aria-hidden={!mobileMenuOpen}
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          id="profile-tab-list"
          className={`tab-row ${mobileMenuOpen ? "mobile-open" : ""}`}
          role="tablist"
          aria-label="Profile Sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
              aria-selected={activeTab === tab.key}
              onClick={() => openTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="hero" ref={heroRef}>
        {section ? (
          <article
            className={`tab-content hero-content ${section.className || ""}`}
            aria-live="polite"
          >
            <header className="content-head">
              <h2>{section.title}</h2>
              <button type="button" className="collapse-link" onClick={collapseTab}>
                Back to Home
              </button>
            </header>
            <div className="content-body">{section.body}</div>
          </article>
        ) : (
          <>
            <p className="hey-line">Hey!</p>
            <p className="intro-line">I am Anand</p>
            <p className="role-line">Full Stack Developer / AI Engineer</p>

            <div className="display-picture" aria-label="Profile Picture">
              {resolvedProfileImage ? (
                <Image
                  src={resolvedProfileImage}
                  alt="Anand"
                  className="profile-image"
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                />
              ) : (
                <span>AN</span>
              )}
            </div>
          </>
        )}
      </section>

    </main>
  );
}
