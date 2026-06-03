"use client";

import { useState } from "react";

export default function ContactBlock() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", organization: "", reason: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid var(--shadow-color)",
    backgroundColor: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <section
      style={{
        borderTop: "1px solid var(--shadow-color)",
        marginTop: "64px",
        paddingTop: "56px",
        paddingBottom: "16px",
      }}
    >
      <div style={{ maxWidth: "640px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text-headings)",
            marginBottom: "8px",
          }}
        >
          Speaking, collaboration &amp; inquiries
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            marginBottom: "32px",
            lineHeight: 1.7,
          }}
        >
          Conference talks, podcast appearances, research collaboration, media quotes — use the form below and I will get back to you.
        </p>

        {status === "success" ? (
          <div
            style={{
              padding: "20px 24px",
              borderRadius: "10px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--accent-primary)",
              color: "var(--text-headings)",
              fontSize: "15px",
              lineHeight: 1.6,
            }}
          >
            Message received — thank you. I will be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label htmlFor="contact-org" style={labelStyle}>Organization</label>
                <input
                  id="contact-org"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Firm or institution"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="contact-reason" style={labelStyle}>Reason</label>
                <select
                  id="contact-reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="" disabled>Select one</option>
                  <option value="Speaking">Speaking</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Media">Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" style={labelStyle}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Brief description of the opportunity or question"
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
              />
            </div>

            {status === "error" && (
              <p style={{ color: "var(--accent-primary)", fontSize: "14px", margin: 0 }}>
                Something went wrong. Please try emailing directly at hariom_tatsat@mfe.berkeley.edu
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "13px 32px",
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--button-text-dark)",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "opacity 0.2s ease",
                }}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
