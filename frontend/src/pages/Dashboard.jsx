import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Tasks with pagination + search + filter
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks", {
        params: {
          page,
          limit: 5,
          search,
          status: filterStatus,
        },
      });

      setTasks(res.data.tasks);
      setTotalPages(res.data.pages);
    } catch (err) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [page, search, filterStatus, navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/tasks", form);
      }

      setForm({ title: "", description: "", status: "pending" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Task Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card">
        <input style={{padding:5 , margin:5}}
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select style={{padding:5 , margin:5}}
          value={filterStatus}
          onChange={(e) => {
            setPage(1);
            setFilterStatus(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task Form */}
      <div className="card">
        <h3>{editingId ? "Edit Task" : "Create Task"}</h3>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button type="submit" disabled={submitting}>
            {submitting
              ? "Processing..."
              : editingId
              ? "Update Task"
              : "Add Task"}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>

              <span className={`status ${task.status}`}>
                {task.status}
              </span>

              <div className="actions">
                <button onClick={() => editTask(task)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;