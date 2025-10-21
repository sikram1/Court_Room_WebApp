"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  // theme colors
  const isDark = theme === "dark";
  const textColor = isDark ? "#f9f9f9" : "#374151";
  const bgColor = isDark ? "#1f1f1f" : "#f9fafb";
  const cardBg = isDark ? "#2c2c2c" : "#fff";
  const boxShadow = isDark ? "0 8px 24px rgba(255,255,255,0.06)" : "0 8px 24px rgba(0,0,0,0.06)";

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: 20,
        backgroundColor: bgColor,
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: "2rem", marginBottom: 12 }}
      >
        Welcome to the Court Room Simulation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ maxWidth: 600, lineHeight: 1.6, fontSize: 16, color: textColor }}
      >
        Step into a realistic courtroom environment where you’ll handle web accessibility,
        security, and validation challenges. Fix issues before they escalate to a court trial!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Link href="/courtroom">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid #2563eb",
              background: "transparent",
              color: "#2563eb",
              fontSize: 15,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Start Simulation
          </motion.button>
        </Link>

        <Link href="/about">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#10b981", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid #10b981",
              background: "transparent",
              color: "#10b981",
              fontSize: 15,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          marginTop: 50,
          background: cardBg,
          borderRadius: 10,
          padding: 20,
          boxShadow,
          maxWidth: 640,
          textAlign: "left",
        }}
      >
        <h3 style={{ marginTop: 0, color: textColor }}>How it works:</h3>
        <ul style={{ lineHeight: 1.8, color: textColor, paddingLeft: 20 }}>
          <li>Set a timer and begin your simulation session.</li>
          <li>Respond to messages and fix accessibility or validation issues.</li>
          <li>Save your work at any time.</li>
          <li>Ignore issues... and get summoned to court!</li>
        </ul>
      </motion.div>
    </main>
  );
}
