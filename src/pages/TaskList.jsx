import React, { useState } from "react";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const calculateDaysLeft = (dueDate) => {
    const now = new Date();
    const diff = dueDate.toDate() - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      {tasks.length === 0 && <p>🌱 No tasks match your filters.</p>}
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {tasks.map((task) => {
          const isOverdue =
            task.dueDate && task.dueDate.toDate() < new Date() && task.status !== "Completed";
          const daysLeft =
            task.dueDate && task.status !== "Completed" ? calculateDaysLeft(task.dueDate) : null;

          return (
            <li
              key={task.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "0.5rem",
                backgroundColor: isOverdue ? "#ffe5e5" : "transparent",
                borderRadius: "6px"
              }}
            >
              {editingId === task.id ? (
                <>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    style={{ padding: "0.25rem", marginRight: "0.5rem" }}
                  />
                  <button onClick={() => {
                    onUpdate(task.id, { title: editedTitle });
                    setEditingId(null);
                    setEditedTitle("");
                  }}>💾 Save</button>
                  <button onClick={() => {
                    setEditingId(null);
                    setEditedTitle("");
                  }}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong> — 
                  <span style={{ color: task.status === "Completed" ? "green" : "#999" }}>
                    {task.status}
                  </span>
                  <br />
                  {task.createdAt && (
                    <small>Created: {task.createdAt.toDate().toLocaleString()}</small>
                  )}
                  {task.dueDate && (
                    <>
                      <br />
                      <small>
                        Due: {task.dueDate.toDate().toLocaleDateString()} |{" "}
                        {daysLeft <= 0
                          ? "⚠️ Overdue"
                          : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
                      </small>
                    </>
                  )}
                  <br />
                  {task.status !== "Completed" && (
                    <button onClick={() => onUpdate(task.id, { status: "Completed" })}>
                      ✅ Complete
                    </button>
                  )}
                  <button onClick={() => onDelete(task.id)} style={{ marginLeft: "0.5rem" }}>
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditedTitle(task.title);
                    }}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    ✏️ Edit
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;