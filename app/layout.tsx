"use client";
import React, { useState, createContext, useEffect } from "react";
import Link from "next/link";

import { ThemeContext } from "./ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const themeStyles =
    theme === "light"
      ? { backgroundColor: "#f4f4f4", color: "#222", transition: "all 0.3s ease" }
      : { backgroundColor: "#1e1e1e", color: "#f0f0f0", transition: "all 0.3s ease" };

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: "Segoe UI, sans-serif", ...themeStyles }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {/* Header */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 30px",
              backgroundColor: theme === "light" ? "#ffffff" : "#2a2a2a",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderBottom: theme === "light" ? "1px solid #ddd" : "1px solid #444",
              transition: "all 0.3s ease",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <div style={{ fontWeight: 600 }}>Student: 20900837</div>

            <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Courtroom Simulation</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ position: "relative" }}>
                <button
                  aria-label="Menu"
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 22,
                    color: theme === "light" ? "#222" : "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  ☰
                </button>

                {menuOpen && (
                  <ul
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 10px)",
                      background: theme === "light" ? "#fff" : "#333",
                      listStyle: "none",
                      padding: "10px 0",
                      borderRadius: 8,
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                      minWidth: 150,
                      textAlign: "left",
                    }}
                  >
                    {[
                      { name: "Home", link: "/" },
                      { name: "About", link: "/about" },
                      { name: "Court Room", link: "/courtroom" },
                    ].map((item) => (
                      <li key={item.link} style={{ padding: "8px 16px" }}>
                        <Link
                          href={item.link}
                          style={{
                            textDecoration: "none",
                            color: theme === "light" ? "#222" : "#f0f0f0",
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={toggleTheme}
                style={{
                  backgroundColor: theme === "light" ? "#222" : "#f0f0f0",
                  color: theme === "light" ? "#fff" : "#222",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </header>

          <main style={{ minHeight: "85vh", padding: "40px 20px" }}>{children}</main>

          <footer
            style={{
              padding: "20px",
              textAlign: "center",
              borderTop: theme === "light" ? "1px solid #ccc" : "1px solid #444",
              background: theme === "light" ? "#f9f9f9" : "#111",
              color: theme === "light" ? "#222" : "#f0f0f0",
              transition: "all 0.3s ease",
            }}
          >
            &copy; {new Date().getFullYear()} Sikram | Student No: 20900837 | Date:{" "}
            {new Date().toLocaleDateString()}
          </footer>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
