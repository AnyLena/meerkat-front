import Profile from "../assets/decorations/traveler.jpg";

const Todolist = ({ todos }) => {
  return (
    <section>
      <h2>TO-DO-List</h2>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <div
              className="circle"
              style={{
                backgroundColor: todo.done ? "var(--secondary-color)" : "white",
              }}
            ></div>
            <p> {todo.title}</p>
            <div className="profile-img">
              <img src={Profile} alt="" />
            </div>
            <button>edit</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Todolist;
