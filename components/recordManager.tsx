//components/recordManager.tsx
"use client";
import React, { useEffect, useState } from "react";

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

  // ---------------- FETCH ALL ----------------
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/records");
      const data = await res.json();
  
      // Defensive check
      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        console.warn("Invalid data format, using empty array:", data);
        setRecords([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load records");
      setRecords([]); // fallback
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
        background: "rgba(255,255,255,0.96)",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
      }}
    >
      <h3>Saved Records</h3>
      <button
        onClick={fetchRecords}
        style={{
          display: "inline-flex",
          marginBottom: 8,
          background: "#e0f2fe",
          gap:6,
          alignItems:"center",
          border: "1px solid #93c5fd",
          color: "#1e3a8a",
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
                borderBottom: "1px solid #ddd",
                padding: "8px 0",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {r.userName} — {r.sessionStage}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>
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
                      border: "1px solid #ccc",
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
                      background: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: 6,
                      padding: "6px 12px",
                      marginTop: 4,
                      cursor: "pointer",
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
                      background: "#f9fafb",
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
                        marginBottom: 8,
                        background: "#e0f2fe",
                        gap:6,
                        border: "1px solid #93c5fd",
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
                        marginBottom: 8,
                        background: "#e0f2fe",
                        gap:6,
                        border: "1px solid #93c5fd",
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: "pointer",
                        gap:6,
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
