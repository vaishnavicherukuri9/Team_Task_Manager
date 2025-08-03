import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import TaskList from "../pages/TaskList";
import MessageFeed from "../pages/MessageFeed";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const dueTimestamp = newDueDate ? Timestamp.fromDate(new Date(newDueDate)) : null;

    await addDoc(collection(db, "tasks"), {
      title: newTask,
      status: "Pending",
      userId: auth.currentUser.uid,
      createdAt: Timestamp.now(),
      dueDate: dueTimestamp
    });

    setNewTask("");
    setNewDueDate("");
    // re-fetch tasks
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(data);
  };

  const handleUpdateTask = async (id, updates) => {
    await updateDoc(doc(db, "tasks", id), updates);
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(data);
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(data);
  };

  const completionRate = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    return total ? ((completed / total) * 100).toFixed(1) : 0;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    return matchesTitle && matchesStatus;
  });

  const hasUrgentTasks = tasks.some(task => {
    if (!task.dueDate || task.status === "Completed") return false;
    const daysLeft = (task.dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 2;
  });

  return (
    <div style={{ padding: "2rem", position: "relative" }}>
      <h2>Welcome, {auth.currentUser?.displayName || "Intern"} 👋</h2>

      {hasUrgentTasks && (
        <div style={{ background: "#ffeeba", padding: "1rem", borderRadius: "6px", marginBottom: "1rem" }}>
          ⏰ You have tasks due in less than 2 days!
        </div>
      )}

      <form onSubmit={handleAddTask} style={{ marginBottom: "1rem" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search task title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* ✅ Inline Progress Display */}
      <div style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        width: "150px",
        height: "8px",
        background: "#ddd",
        borderRadius: "4px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${completionRate()}%`,
          height: "100%",
          background: "#4caf50"
        }} />
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
      <MessageFeed />
    </div>
  );
};

export default Dashboard;