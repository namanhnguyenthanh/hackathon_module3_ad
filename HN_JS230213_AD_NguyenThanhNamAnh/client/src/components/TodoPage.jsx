import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoPage() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleChangeInput = (e) => {
    setTodoName(e.target.value);
  };

  const getPost = () => {
    axios
      .get("http://localhost:6868/api/v1/todos")
      .then((res) => setTodoList(res.data.todos))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPost();
  }, []);

  const handleAddTodo = () => {
    axios
      .post(
        "http://localhost:6868/api/v1/todos",

        { name: todoName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message == "not admin") {
          alert("not admin");
        } else {
          getPost();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompleted = (id) => {
    axios
      .put(
        `http://localhost:6868/api/v1/todos/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message == "not admin") {
          alert("not admin");
        } else {
          getPost();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnCompleted = (id) => {
    axios
      .put(
        `http://localhost:6868/api/v1/todos/${id}`,
        {
          status: "uncompleted",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message == "not admin") {
          alert("not admin");
        } else {
          getPost();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:6868/api/v1/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message == "not admin") {
          alert("not admin");
        } else {
          getPost();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="bg-info text-center text-white fs-1 p-3">Todo list</h1>
      <div className="container ">
        <div className="d-flex justify-content-center gap-3 mt-4">
          <input type="text" value={todoName} onChange={handleChangeInput} />
          <div style={{ cursor: "pointer" }} onClick={() => handleAddTodo()}>
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-6">
            <h1 className=" text-center ">Uncompleted</h1>
            <ul style={{ listStyle: "none" }}>
              {todoList &&
                todoList
                  .filter((todo) => todo.status == "uncompleted")
                  .map((todo) => (
                    <li className="d-flex justify-content-between align-items-center bg-body-secondary my-3 p-3">
                      <span className="todo-name fs-4">{todo.name}</span>
                      <div>
                        <i
                          class="fa-solid fa-trash-can"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleDelete(todo.id)}
                        ></i>
                        <i
                          class="fa-regular fa-circle-check"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleCompleted(todo.id)}
                        ></i>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="col-6">
            <h1 className=" text-center ">Completed</h1>
            <ul style={{ listStyle: "none" }}>
              {todoList &&
                todoList
                  .filter((todo) => todo.status == "completed")
                  .map((todo) => (
                    <li className="d-flex justify-content-between align-items-center bg-body-secondary my-3 p-3">
                      <span className="todo-name fs-4">{todo.name}</span>
                      <div>
                        <i
                          class="fa-solid fa-trash-can"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleDelete(todo.id)}
                        ></i>
                        <i
                          class="fa-regular fa-circle-check"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleUnCompleted(todo.id)}
                        ></i>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
