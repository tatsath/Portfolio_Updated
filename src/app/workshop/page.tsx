"use client";

import Header from "@/components/Header";
import Link from "next/link";

const courses = [
  {
    title: "AI and Generative AI for Finance Masterclass",
    image: "/assets/CT1.png",
    href: "https://masterclass.economictimes.indiatimes.com/ai-generative-ai-finance-services-hariom-tatsat",
  },
  {
    title: "ISB: Advanced Programme in Leadership and Digital Innovation",
    image: "/assets/ISB.jpeg",
    href: "https://www.careers360.com/colleges/indian-school-of-business-hyderabad-campus/advanced-programme-in-leadership-and-digital-innovation-in-finance-certification-course",
  },
];

const audiences = [
  "Risk, compliance, and model governance leaders evaluating AI adoption",
  "Quant research, data science, and engineering teams building AI systems",
  "Trading, portfolio management, and research desks exploring AI-augmented workflows",
  "C-suite and innovation leaders setting AI strategy and budget",
  "L&D and HR teams sponsoring enterprise-wide AI upskilling",
];

const formats = [
  {
    label: "Executive Briefing",
    duration: "Half-day",
    description:
      "A focused session for leadership: what AI and GenAI can and cannot do in finance today, where the real ROI is, and the decisions that determine whether a program succeeds.",
    idealFor: "Boards, executive committees, innovation leadership",
  },
  {
    label: "Hands-On Workshop",
    duration: "1–2 days",
    description:
      "In-depth, practitioner-led sessions covering architecture, use cases, and live walkthroughs. Built for teams that need to leave with a concrete plan, not just slides.",
    idealFor: "Quant, data science, engineering, and risk teams",
  },
  {
    label: "Custom In-House Program",
    duration: "Multi-week, bespoke",
    description:
      "A tailored curriculum built around your firm's data, systems, and regulatory constraints, with ongoing advisory as your team moves from pilot to production.",
    idealFor: "Firms building an internal AI capability from the ground up",
  },
];

const curriculum = [
  {
    title: "Rent the Commodity, Build the Edge",
    description:
      "Which layers of the AI stack to buy off the shelf, which to build in-house, and why the model was never the hard part. The harness around it is.",
    source: "The AI Misconceptions Keeping Financial Enterprises Stuck",
    href: "/financial-ai/misconception-ai-finance-enterprises",
  },
  {
    title: "Match the Tool to the Job",
    description:
      "When retrieval beats an agent, when a single model call beats both, and why the highest-leverage use case at most firms is simply reading documents well.",
    source: "The AI Misconceptions Keeping Financial Enterprises Stuck",
    href: "/financial-ai/misconception-ai-finance-enterprises",
  },
  {
    title: "Agentic Trading, Honestly",
    description:
      "What agentic trading platforms actually do beneath the marketing, the overfitting trap and the profit mirage nobody puts on the slide, and where AI genuinely belongs in the investment workflow.",
    source: "Agentic Trading, Honestly: Where AI Actually Belongs in the Investment Workflow",
    href: "/financial-ai/agentic-trading-honestly",
  },
  {
    title: "The Earnings-Season Workflow That Actually Earns Its Place",
    description:
      "Why summarizing the call is the least valuable thing a model can do for a serious analyst, and the workflow that actually holds up when attention, not intelligence, is the real constraint.",
    source: "How a Hedge Fund Should Actually Use AI for Earnings Season",
    href: "/financial-ai/how-a-hedge-fund-should-use-ai-for-earnings-season",
  },
  {
    title: "Why Watching the Output Is No Longer Enough",
    description:
      "As models plan, reason, and act, judging them purely on output stops working. What interpretability tooling can tell you about a model's behavior, and what it still can't.",
    source: "The Model Knows It Is Being Watched",
    href: "/ai-interpretability/01-why-watching-the-output-is-no-longer-enough",
  },
];

const highlights = [
  "Delivered a 2-day AI and Generative AI executive training for the top management of Ujjivan Small Finance Bank, via ET Masterclass (Economic Times)",
  "Author of Machine Learning & Data Science Blueprints for Finance (O'Reilly, 2020), #1 new release on Amazon in AI",
  "Featured speaker at Federal Reserve Bank of Atlanta, NVIDIA GTC, AI4, NexGen Banking Summit, and Momentum AI Finance",
  "Published researcher in AI interpretability, Beyond the Black Box: Interpretability of LLMs in Finance (arXiv, 2025)",
  "Faculty for the Indian School of Business Advanced Programme in Leadership and Digital Innovation in Finance",
  "15+ years bridging quantitative finance, machine learning, and AI across top-tier financial institutions",
];

const sectionLabelStyle = {
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "var(--text-secondary)",
  marginBottom: "20px",
};

const dividerStyle = {
  height: "1px",
  background:
    "linear-gradient(to right, transparent, var(--text-secondary), transparent)",
  opacity: 0.4,
  margin: "48px 0",
};

const bodyTextStyle = {
  fontSize: "17px",
  lineHeight: 1.8,
  color: "var(--text-primary)",
  margin: 0,
};

export default function WorkshopPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "32px",
          zIndex: 1100,
          backgroundColor: "var(--text-headings)",
          color: "var(--bg-main)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          fontSize: "12px",
          letterSpacing: "0.02em",
        }}
      >
        Prepared for prospective corporate clients. Shared privately. Please
        do not redistribute.
      </div>
      <Header topOffset={32} />

      <main
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "152px 24px 80px",
        }}
      >
        {/* Hero */}
        <section style={{ marginBottom: "40px" }}>
          <p style={sectionLabelStyle}>Corporate Training</p>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "var(--text-headings)",
              letterSpacing: "0.02em",
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            AI and GenAI in Finance
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "720px",
              margin: 0,
            }}
          >
            Courses and corporate workshops for financial institutions,
            taking leadership and technical teams from "we bought the
            models" to "we have AI in trustworthy production."
          </p>
        </section>

        {/* Courses I've taught */}
        <section style={{ marginBottom: "0" }}>
          <h2 style={sectionLabelStyle}>Courses I've Taught</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {courses.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)",
                  textDecoration: "none",
                  transition: "var(--hover-transition)",
                }}
              >
                <div
                  style={{
                    height: "150px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "14px 16px",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  {c.title}
                </div>
              </a>
            ))}
          </div>
        </section>

        <div style={dividerStyle} />

        {/* What clients say */}
        <section>
          <h2 style={sectionLabelStyle}>What Clients Say</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(220px, 320px) 1fr",
              gap: "36px",
              alignItems: "center",
            }}
            className="testimonial-grid"
          >
            <img
              src="/assets/WorkshopFeedback.png"
              alt="LinkedIn post from Chandralekha Chaudhuri, Head of HR at Ujjivan Small Finance Bank, on the AI and Generative AI executive program"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 8px 32px var(--shadow-color)",
                display: "block",
              }}
            />
            <div>
              <blockquote
                style={{
                  margin: "0 0 20px",
                  paddingLeft: "20px",
                  borderLeft: "3px solid var(--text-headings)",
                  fontSize: "21px",
                  fontWeight: 600,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--text-headings)",
                }}
              >
                "It equipped us with cutting-edge tools that can help
                navigate the ever-evolving financial landscape more
                efficiently&nbsp;&hellip; it truly was an eye-opening
                session. This training cultivated a forward-thinking
                mindset, which can enable the management to make informed
                strategic decisions."
              </blockquote>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--text-headings)",
                  margin: "0 0 4px",
                }}
              >
                Chandralekha Chaudhuri
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Head of HR, Ujjivan Small Finance Bank, following a 2-day
                AI and Generative AI program for top management, delivered
                via ET Masterclass (Economic Times)
              </p>
            </div>
          </div>
        </section>

        <div style={dividerStyle} />

        {/* Overview */}
        <section style={{ marginBottom: "0" }}>
          <h2 style={sectionLabelStyle}>The Corporate Workshop</h2>
          <p style={{ ...bodyTextStyle, marginBottom: "16px" }}>
            Beyond the courses above, I also run direct, in-house workshops
            for teams. Most financial firms have already bought the models
            and the compute. Very few have them doing trustworthy work in
            production. This program closes that gap directly, not with
            another vendor pitch, but with the operating knowledge a firm
            needs to build, govern, and ship AI internally.
          </p>
          <p style={bodyTextStyle}>
            Delivered in person or virtually to leadership teams, quant and
            data science groups, and enterprise-wide cohorts at banks, asset
            managers, and fintechs, the workshop is built around the same
            questions that come up in every serious AI initiative: what to
            rent versus build, how to match the tool to the job, and how to
            get something into production that people actually trust.
          </p>
        </section>

        <div style={dividerStyle} />

        {/* Who it's for */}
        <section>
          <h2 style={sectionLabelStyle}>Who It's For</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {audiences.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(128,128,128,0.15)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "6px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-headings)",
                    display: "inline-block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div style={dividerStyle} />

        {/* Formats */}
        <section>
          <h2 style={sectionLabelStyle}>Format Options</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {formats.map((f, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(128,128,128,0.2)",
                  borderRadius: "10px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  {f.duration}
                </span>
                <h3
                  style={{
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "var(--text-headings)",
                    margin: 0,
                  }}
                >
                  {f.label}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {f.description}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  Ideal for: {f.idealFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={dividerStyle} />

        {/* Curriculum */}
        <section>
          <h2 style={sectionLabelStyle}>What We Cover</h2>
          <p style={{ ...bodyTextStyle, marginBottom: "28px", fontSize: "15px", color: "var(--text-secondary)" }}>
            Each module is grounded in research and writing I've already
            published, and the workshop walks through the argument live and
            applies it to your firm's own use cases.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {curriculum.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "18px",
                  padding: "18px 0",
                  borderBottom:
                    i < curriculum.length - 1
                      ? "1px solid rgba(128,128,128,0.15)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--text-headings)",
                      margin: "0 0 6px",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "var(--text-primary)",
                      margin: "0 0 8px",
                    }}
                  >
                    {c.description}
                  </p>
                  <Link
                    href={c.href}
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontStyle: "italic",
                      borderBottom: "1px solid var(--text-secondary)",
                      paddingBottom: "1px",
                    }}
                  >
                    From: {c.source} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={dividerStyle} />

        {/* Why this program */}
        <section>
          <h2 style={sectionLabelStyle}>Why This Program</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {highlights.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(128,128,128,0.15)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "6px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-headings)",
                    display: "inline-block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div style={dividerStyle} />

        {/* CTA */}
        <section>
          <h2 style={sectionLabelStyle}>Book This Workshop</h2>
          <p style={{ ...bodyTextStyle, marginBottom: "20px" }}>
            For in-person or virtual delivery, custom curriculum design, or
            multi-session enterprise programs, reach out directly with your
            team size, timeline, and goals.
          </p>
          <a
            href="mailto:hariom_tatsat@mfe.berkeley.edu?subject=Workshop Inquiry: AI and GenAI in Finance"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "var(--text-headings)",
              color: "var(--bg-main)",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            hariom_tatsat@mfe.berkeley.edu
          </a>
        </section>
      </main>
    </div>
  );
}
