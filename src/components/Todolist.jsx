import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircle } from "react-icons/fa6";
import "../styles/todolist.css";
import { useAuth } from "../context/useAuth";
import Zoom from "@mui/material/Zoom";
import { toggleTodo } from "../api/todos.js";
import { addTodo } from "../api/todos.js";

const Todolist = ({ eventData, setEventData }) => {
  const { token, user } = useAuth();
  const [formData, setFormData] = useState({
    assignee: user._id,
    title: "",
  });
  const [participantList, setParticipantList] = useState(
    eventData.participants
  );
  const [todoList, setTodoList] = useState(eventData.todos);

  const handleAdd = async () => {
    addTodo(eventData._id, formData, token, setEventData);

    setFormData({
      assignee: user._id,
      title: "",
    });
  };

  const handleToggle = (event) => {
    const todoId = !event.target.id
      ? !event.target.parentNode.id
        ? event.target.parentNode.parentNode.id
        : event.target.parentNode.id
      : event.target.id;
    toggleTodo(eventData._id, todoId, token, formData, setEventData);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleChange = (event) => {
    const data = { assignee: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleInput = (event) => {
    const data = { title: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const getAssigned = (todo, value) => {
    let assignee;

    if (user._id === todo.assignee) {
      assignee = user;
    } else {
      const participant = participantList.find(
        (participant) => participant._id === todo.assignee
      );

      if (participant) {
        assignee = participant;
      } else {
        // owner
        assignee = eventData.owner;
      }
    }

    if (assignee && value === "name") {
      return assignee.name;
    }

    if (assignee && value === "picture" && assignee.picture) {
      return assignee.picture.url;
    }

    return "Assign Task";
  };

  useEffect(() => {
    setParticipantList(eventData.participants);
    setTodoList(eventData.todos);
    console.log(eventData)
    console.log(user)
  }, [eventData]);

  return (
    <>
      {user._id === eventData.owner._id || eventData.todos.length > 0 ? (
        <h2 className="event-heading">TO-DO-List</h2>
      ) : null}
      <section className="todo-list">
        {todoList.map((todo, index) => (
          <div className="todo-item" key={index}>
            <Button onClick={handleToggle} id={todo._id} className="btn-check">
              {todo.done ? <FaRegCircleCheck /> : <FaRegCircle />}
            </Button>
            <p>{todo.title}</p>
            <Tooltip
              title={getAssigned(todo, "name")}
              TransitionComponent={Zoom}
              arrow={false}
              placement="top"
              PopperProps={{
                popperOptions: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -50],
                      },
                    },
                  ],
                },
              }}
            >
              <div className="center-item">
                <img
                  className="profile-small"
                  src={getAssigned(todo, "picture")}
                  alt=""
                />
              </div>
            </Tooltip>

            <div className="center-item">
              <Button className="btn-edit" onClick={handleEdit}>
                <FaRegEdit />
              </Button>
            </div>
          </div>
        ))}
      </section>

      {user._id === eventData.owner._id ? (
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
              value={formData.title}
              onChange={handleInput}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Assign</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="assign-participant"
                value={formData.assignee}
                label="Assign"
                onChange={handleChange}
              >
                <MenuItem key={user._id} value={user._id}>
                  <img
                    className="profile-small assign-img"
                    src={user.picture.url}
                    alt=""
                  />
                  {user.name}
                </MenuItem>
                {participantList.map((participant) => (
                  <MenuItem key={participant._id} value={participant._id}>
                    <img
                      className="profile-small assign-img"
                      src={participant.picture.url}
                      alt=""
                    />
                    {participant.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button className="btn-green" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </section>
      ) : null}
    </>
  );
};

export default Todolist;
