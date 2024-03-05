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
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircle } from "react-icons/fa6";
import "../styles/todolist.css";
import { useAuth } from "../context/useAuth";
import Zoom from "@mui/material/Zoom";
import { toggleTodo } from "../api/todos.js";
import { addTodo, deleteTodo, editTodo } from "../api/todos.js";

const Todolist = ({ eventData, setEventData }) => {
  const { token, user } = useAuth();

  const [participantList, setParticipantList] = useState(
    eventData.participants
  );
  const [todoList, setTodoList] = useState(eventData.todos);

  //STATES FOR TO-DO_EDITING
  const [formData, setFormData] = useState({
    assignee: user._id,
    title: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // EVENT HANDLERS FOR TO-DOS
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

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleInputTodo = (e) => {
    console.log(e.target.value);
    console.log(currentTodo);
    const todoTitle = e.target.value;
    setCurrentTodo((prev) => ({ ...prev, title: todoTitle }));
  };

  const handleChangeTodo = (event) => {
    const todoAssignee = event.target.value;
    setCurrentTodo((prev) => ({ ...prev, assignee: todoAssignee }));
  };

  const handleSave = () => {
    editTodo(eventData._id, currentTodo, token, setEventData);
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const handleDelete = (todoId) => {
    deleteTodo(eventData._id, todoId, token, setEventData);
    setIsEditing(false);
    setCurrentTodo(null);
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
    console.log(eventData);
    console.log(user);
  }, [eventData]);

  return (
    <>
      {user._id === eventData.owner._id || eventData.todos.length > 0 ? (
        <h2 className="event-heading">TO-DO-List</h2>
      ) : null}
      <section className="todo-list">
        {todoList.map((todo, index) => (
          <div
            className={
              user._id === eventData.owner._id && user._id === todo.assignee && !todo.done 
                ? "todo-item grid4 item-alert" :
                user._id === eventData.owner._id 
                ? "todo-item grid4" :
                user._id !== eventData.owner._id && user._id === todo.assignee && !todo.done 
                ? "todo-item grid3 item-alert" 
                : "todo-item grid3"
            }
            key={index}
          >
            {user._id === eventData.owner._id || user._id === todo.assignee ? (
              <Button
                onClick={handleToggle}
                id={todo._id}
                className={
                  todo.done
                    ? "btn-check btn-checked"
                    : "btn-check btn-unchecked"
                }
              >
                {todo.done ? <FaRegCircleCheck /> : <FaRegCircle />}
              </Button>
            ) : (
              <Tooltip
                title={"You are not allowed to change todo-status."}
                TransitionComponent={Zoom}
                arrow={true}
                placement="top"
                PopperProps={{
                  popperOptions: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -20],
                        },
                      },
                    ],
                  },
                }}
              >
                <Button id={todo._id} className="btn-check btn-disabled">
                  {todo.done ? <FaRegCircleCheck /> : <FaRegCircle />}
                </Button>
              </Tooltip>
            )}

            {isEditing && currentTodo._id === todo._id ? (
              <TextField
              label="Edit To-Do"
              variant="outlined"
              value={currentTodo.title}
              onChange={handleInputTodo}
            />
            ) : (
              <p>{todo.title}</p>
            )}

            {isEditing && currentTodo._id === todo._id ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assign</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="assign-participant"
                  value={currentTodo.assignee}
                  label="Assign"
                  onChange={handleChangeTodo}
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
            ) : (
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
            )}

           {user._id === eventData.owner._id ? <div className="center-item">
              <Button className="btn-icon" onClick={() => handleEdit(todo)}>
                <FaRegEdit />
              </Button>
            </div>:null}

            {isEditing && currentTodo._id === todo._id ? (
              <>
                <Button
                  className="btn-icon btn-save"
                  id="btn-save"
                  onClick={handleSave}
                >
                  save
                </Button>
                <Button
                  className="btn-icon btn-delete"
                  id="btn-delete"
                  onClick={() => handleDelete(todo._id)}
                >
                  <FaRegTrashAlt />
                </Button>
              </>
            ) : null}
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
