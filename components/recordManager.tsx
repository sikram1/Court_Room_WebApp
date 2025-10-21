"use client";
import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../app/ThemeContext";

type RecordType = {
  id: number;
  userName: string;
  sessionStage: string | null;
  caseDocument: string;
  createdAt: string;
};

export default function RecordManager() {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // ---------------- FETCH ALL ----------------
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/records");
      const data = await res.json();

      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        console.warn("Invalid data format, using empty array:", data);
        setRecords([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ---------------- DELETE ----------------
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this record?")) return;
    try {
      const res = await fetch("/api/records", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Deleted successfully!");
        fetchRecords();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch("/api/records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, caseDocument: editedContent }),
      });
      if (res.ok) {
        alert("Updated successfully!");
        setEditingId(null);
        fetchRecords();
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div
      style={{
        background: isDark ? "#2a2a2a" : "rgba(255,255,255,0.96)",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        color: isDark ? "#f3f4f6" : "#111827",
        boxShadow: isDark
          ? "0 4px 12px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0, color: isDark ? "#f9fafb" : "#111827" }}>
        Saved Records
      </h3>
      <button
        onClick={fetchRecords}
        style={{
          display: "inline-flex",
          marginBottom: 8,
          background: isDark ? "#1e3a8a" : "#e0f2fe",
          gap: 6,
          alignItems: "center",
          border: isDark ? "1px solid #374151" : "1px solid #93c5fd",
          color: isDark ? "#f3f4f6" : "#1e3a8a",
          borderRadius: 6,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        <img src="/icons/refresh-icon.svg" alt="Save" width={16} height={16} />
        Refresh
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {records.map((r) => (
            <li
              key={r.id}
              style={{
                borderBottom: `1px solid ${isDark ? "#444" : "#ddd"}`,
                padding: "8px 0",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {r.userName} — {r.sessionStage}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: isDark ? "#9ca3af" : "#666",
                }}
              >
                {new Date(r.createdAt).toLocaleString()}
              </div>

              {editingId === r.id ? (
                <div>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 100,
                      borderRadius: 4,
                      border: `1px solid ${isDark ? "#555" : "#ccc"}`,
                      background: isDark ? "#1e1e1e" : "#fff",
                      color: isDark ? "#f3f4f6" : "#111827",
                      marginTop: 6,
                      padding: 6,
                      fontFamily: "Consolas, monospace",
                    }}
                  />
                  <button
                    onClick={() => handleUpdate(r.id)}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      marginTop: 4,
                      marginRight: 8,
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      background: isDark ? "#333" : "#f3f4f6",
                      border: `1px solid ${isDark ? "#555" : "#d1d5db"}`,
                      borderRadius: 6,
                      padding: "6px 12px",
                      marginTop: 4,
                      cursor: "pointer",
                      color: isDark ? "#f3f4f6" : "#111827",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: 13,
                      background: isDark ? "#1e1e1e" : "#f9fafb",
                      color: isDark ? "#f3f4f6" : "#111827",
                      padding: 6,
                      borderRadius: 4,
                      marginTop: 6,
                    }}
                  >
                    {r.caseDocument.slice(0, 200)}...
                  </pre>
                  <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => {
                        setEditingId(r.id);
                        setEditedContent(r.caseDocument);
                      }}
                      style={{
                        display: "inline-flex",
                        background: isDark ? "#1e3a8a" : "#e0f2fe",
                        color: isDark ? "#f3f4f6" : "#1e3a8a",
                        gap: 6,
                        border: `1px solid ${isDark ? "#374151" : "#93c5fd"}`,
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <img src="/icons/edit-icon.svg" alt="Save" width={16} height={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      style={{
                        display: "inline-flex",
                        background: isDark ? "#7f1d1d" : "#e0f2fe",
                        color: isDark ? "#f3f4f6" : "#1e3a8a",
                        gap: 6,
                        border: `1px solid ${isDark ? "#444" : "#93c5fd"}`,
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <img src="/icons/delete-icon.svg" alt="Save" width={16} height={16} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
