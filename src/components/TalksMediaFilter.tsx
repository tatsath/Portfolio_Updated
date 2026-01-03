"use client";

import { useState } from "react";

type TalkType = "all" | "keynote" | "podcast" | "webinar" | "panel" | "teaching";

interface TalkItem {
  id: string;
  type: TalkType;
  title: string;
  event: string;
  year: string;
  image: string;
  link: string;
}

interface TalksMediaFilterProps {
  talks: TalkItem[];
}

export default function TalksMediaFilter({ talks }: TalksMediaFilterProps) {
  const [activeFilter, setActiveFilter] = useState<TalkType>("all");

  const filteredTalks = activeFilter === "all" 
    ? talks 
    : talks.filter(talk => talk.type === activeFilter);

  const filterButtons = [
    { id: "all", label: "All" },
    { id: "keynote", label: "Keynotes & Conferences" },
    { id: "podcast", label: "Podcasts" },
    { id: "webinar", label: "Webinars" },
    { id: "panel", label: "Guest Lectures / Panels" },
    { id: "teaching", label: "Selected Teaching" },
  ] as const;

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden" as const,
    boxShadow: "var(--card-shadow)",
    transition: "var(--hover-transition)",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
  };

  return (
    <div>
      {/* Filter Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveFilter(button.id as TalkType)}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "var(--hover-transition)",
              backgroundColor:
                activeFilter === button.id
                  ? "var(--accent-primary)"
                  : "var(--bg-card)",
              color:
                activeFilter === button.id
                  ? "var(--bg-main)"
                  : "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== button.id) {
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
                e.currentTarget.style.opacity = "0.8";
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== button.id) {
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Talks Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredTalks.map((talk) => (
          <div key={talk.id} className="card" data-aos="fade-up" style={cardStyle}>
            <a
              href={talk.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                className="ccimg"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  height: "200px",
                }}
              >
                <img
                  src={talk.image}
                  alt={talk.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s ease",
                    objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    padding: "6px 12px",
                    backgroundColor: "var(--accent-primary)",
                    color: "var(--bg-main)",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    borderRadius: "4px",
                  }}
                >
                  {talk.type === "keynote" ? "Keynote" :
                   talk.type === "podcast" ? "Podcast" :
                   talk.type === "webinar" ? "Webinar" :
                   talk.type === "panel" ? "Panel" :
                   talk.type === "teaching" ? "Teaching" : "Talk"}
                </div>
              </div>
            </a>
            <div
              className="cdesc"
              style={{
                padding: "20px",
                flexGrow: 1,
                fontSize: "16px",
                lineHeight: 1.5,
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                {talk.event} • {talk.year}
              </div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text-headings)",
                  margin: 0,
                }}
              >
                {talk.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {filteredTalks.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-secondary)",
          }}
        >
          No items found in this category.
        </div>
      )}
    </div>
  );
}


