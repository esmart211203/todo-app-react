import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([
    "Work",
    "Personal",
    "Shopping",
  ]);
  const [selectedCategory, setSelectedsCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Todo",
    due_date: "",
    category: "",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return alert("Task title is required!");
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({
      title: "",
      description: "",
      status: "Todo",
      due_date: "",
      category: "",
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div className="container mt-4" style={{ width: "800px" }}>
      <div className="row">
        {/* Danh sách công việc */}
        <div className="col-md-7">
          <h2 className="mb-3">Danh sách công việc</h2>

          {/* Bộ lọc danh mục */}
          <div className="mb-3">
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

          {/* Hiển thị danh sách công việc */}
          {filteredTasks.length === 0 ? (
            <p className="text" style={{ color: "#ffff" }}>
              Không có công việc nào!!!
            </p>
          ) : (
            <div className="list-group">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>
                      {task.title}{" "}
                      <span className="badge bg-secondary">
                        {task.category}
                      </span>
                    </h5>
                    <p className="mb-1">{task.description}</p>
                    <small className="text-muted">
                      Hạn chót: {task.due_date || "Không có hạn"}
                    </small>
                    <br />
                    <span
                      className={`badge ${
                        task.status === "Todo"
                          ? "bg-warning"
                          : task.status === "In Progress"
                          ? "bg-primary"
                          : "bg-success"
                      }`}
                    >
                      {task.status === "Todo"
                        ? "Chưa làm"
                        : task.status === "In Progress"
                        ? "Đang làm"
                        : "Hoàn thành"}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => updateStatus(task.id, "In Progress")}
                    >
                      Đang làm
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
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
              ))}
            </div>
          )}
        </div>

        {/* Form tạo công việc */}
        <div className="col-md-5">
          <div className="card p-4">
            <h3>Thêm công việc</h3>
            <form onSubmit={addTask}>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Tiêu đề công việc"
                  value={newTask.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Mô tả công việc"
                  value={newTask.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  name="due_date"
                  className="form-control"
                  value={newTask.due_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <select
                  name="category"
                  className="form-select"
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
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Thêm công việc
              </button>
            </form>
          </div>

          {/* Thêm danh mục */}
          <div className="card p-4 mt-3">
            <h3>Thêm danh mục</h3>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Danh mục mới"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button className="btn btn-success" onClick={addCategory}>
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
