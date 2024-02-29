import Profile from "../assets/decorations/traveler.jpg";
import { Box, Button, TextField } from "@mui/material";
import "../styles/todolist.css";
const Todolist = ({ todos }) => {
  return (
    <section>
      <h2 className="event-heading">TO-DO-List</h2>
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
        <section className="todo-owner">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Add new To-Do"
              required
              variant="outlined"
            />
          </Box>
          <button className="btn-green">ADD</button>
        </section>
      </div>
    </section>
  );
};

export default Todolist;
