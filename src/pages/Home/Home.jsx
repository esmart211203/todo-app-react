import { useState } from "react";

const Home = () => {
  const user = { name: "Nguyễn Văn A" };
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Học React",
      description: "Xem bài về useState và useEffect",
      status: "Todo",
      due_date: "2025-02-25",
      category: "Học tập",
      tags: ["Urgent", "Learning"],
    },
    {
      id: 2,
      title: "Làm bài tập React",
      description: "Tạo một app đơn giản sử dụng useState và useEffect",
      status: "Todo",
      due_date: "2025-02-26",
      category: "Học tập",
      tags: ["Learning"],
    },
  ]);

  const [categories, setCategories] = useState([
    "Học tập",
    "Công việc",
    "Cá nhân",
    "Sức khỏe",
  ]);
  const [tags, setTags] = useState(["Urgent", "Low Priority", "Home"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Todo",
    due_date: "",
    category: "",
    tags: [],
  });

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  const handleTagChange = (e) => {
    const tag = e.target.value;
    setNewTask((prevTask) => ({
      ...prevTask,
      tags: prevTask.tags.includes(tag)
        ? prevTask.tags.filter((t) => t !== tag)
        : [...prevTask.tags, tag],
    }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return alert("NNhajap cái tiêu đề vào");
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({
      title: "",
      description: "",
      status: "Todo",
      due_date: "",
      category: "",
      tags: [],
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const updateStatus = (id, newStatus) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || task.category === selectedCategory;
    const matchesTag = !selectedTag || task.tags.includes(selectedTag);
    const matchesStatus = !selectedStatus || task.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesTag && matchesStatus;
  });

  return (
    <div
      className="container mt-4 p-4 rounded bg-white text-dark shadow-lg"
      style={{ maxWidth: "100%" }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            📌 Quản lý công việc
          </a>
          <div className="d-flex align-items-center">
            <span className="text-white me-3">👋 Xin chào, {user.name}!</span>
            <button className="btn btn-outline-light">🚪 Đăng xuất</button>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <h2 className="mb-3 text-primary">📌 Danh sách công việc</h2>

          {/* Ô tìm kiếm */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm công việc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Lọc theo danh mục, tag, và trạng thái */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">Tất cả thẻ</option>
                {Array.isArray(tags) &&
                  tags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          {/* Danh sách công việc */}
          <div className="list-group">
            {filteredTasks.map((task) => (
              <div key={task.id} className="list-group-item p-3 mb-2 rounded-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1 text-primary">{task.title}</h5>
                    <p className="mb-1 text-muted">{task.description}</p>
                    <small className="text-muted">
                      🕒 {task.due_date || "Không có hạn"}
                    </small>
                    <div className="mt-1">
                      <span className="badge bg-secondary me-1">
                        {task.status}
                      </span>
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge bg-light text-dark me-1"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => updateStatus(task.id, "In Progress")}
                    >
                      Đang làm
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => updateStatus(task.id, "Done")}
                    >
                      Hoàn thành
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-5" style={{ marginTop: "10px" }}>
          {/* Form thêm danh mục và tag */}
          <div className="container">
            <div className="row g-3 align-items-stretch">
              <div className="col-md-6 d-flex">
                <div className="card shadow-lg border-0 rounded-3 w-100 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary fw-bold">
                      ➕ Thêm danh mục mới
                    </h5>
                    <div className="input-group mt-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập danh mục mới..."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <button
                        className="btn btn-primary rounded-pill px-3"
                        onClick={addCategory}
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 d-flex">
                <div className="card shadow-lg border-0 rounded-3 w-100 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success fw-bold">
                      ➕ Thêm tag mới
                    </h5>
                    <div className="input-group mt-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tag mới..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                      />
                      <button
                        className="btn btn-success rounded-pill px-3"
                        onClick={addTag}
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form thêm công việc */}
          <div className="card p-4 mb-3">
            <h3>✍️ Thêm công việc</h3>
            <form onSubmit={addTask}>
              <input
                type="text"
                name="title"
                className="form-control mb-3"
                placeholder="Tiêu đề công việc"
                value={newTask.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                className="form-control mb-3"
                placeholder="Mô tả công việc"
                value={newTask.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="date"
                name="due_date"
                className="form-control mb-3"
                value={newTask.due_date}
                onChange={handleChange}
              />
              <select
                name="category"
                className="form-select mb-3"
                value={newTask.category}
                onChange={handleChange}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Chọn nhiều tags */}
              <div className="mb-3">
                <h5>🏷️ Chọn tags</h5>
                {tags.map((tag) => (
                  <div key={tag} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`tag-${tag}`}
                      value={tag}
                      checked={newTask.tags.includes(tag)}
                      onChange={handleTagChange}
                    />
                    <label className="form-check-label" htmlFor={`tag-${tag}`}>
                      {tag}
                    </label>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-success w-100">
                Thêm công việc
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
