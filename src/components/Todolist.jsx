import Profile from "../assets/decorations/traveler.jpg";
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
import axios from "axios";
import { useAuth } from "../context/useAuth";
import Zoom from "@mui/material/Zoom";
import { createTheme } from "@mui/material/styles";

const Todolist = ({ eventData, setEventData }) => {
  const { token, user } = useAuth();
  const [formData, setFormData] = useState({
    assignee: user._id,
    title: "",
  });
  const handleEdit = () => {
    console.log("edit");
  };

  const [participantList, setParticipantList] = useState(
    eventData.participants
  );

  const handleAdd = async () => {
    const SERVER = import.meta.env.VITE_SERVER;

    try {
      const response = await axios.post(
        `${SERVER}/events/${eventData._id}/todos/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        assignee: user._id,
        title: "",
      });
    }
  };

  const [todoId, setTodoId] = useState("");

  const toggleTodo = async (event) => {
    const SERVER = import.meta.env.VITE_SERVER;
    const todoId = !event.target.id ? event.target.parentNode.id : event.target.id;
    try {
      const response = await axios.put(
        `${SERVER}/events/${eventData._id}/todos/${todoId}/toggle`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData(response.data);
    } catch (error) {
      console.error(error);
    }
    };

  const handleChange = (event) => {
    const data = { assignee: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleInput = (event) => {
    const data = { title: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  return (
    <section>
      <h2 className="event-heading">TO-DO-List</h2>
      <div className="todo-list">
        {eventData.todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <Button onClick={toggleTodo} id={todo._id} className="btn-check">
              {todo.done ? <FaRegCircleCheck /> : <FaRegCircle />}
            </Button>
            <p>{todo.title}</p>
            <Tooltip
              title={
                user._id === todo.assignee
                  ? "You"
                  : participantList.find(
                      (participant) => participant._id === todo.assignee
                    )?.name
                  ? participantList.find(
                      (participant) => participant._id === todo.assignee
                    )?.name
                  : ""
              }
              TransitionComponent={Zoom}
              arrow={false}
              placement="top"
              PopperProps={{
                popperOptions: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -50], // Adjust the position of the Tooltip
                      },
                    },
                  ],
                },
              }}
            >
              <div className="center-item">
                <img
                  className="profile-small"
                  src={
                    user._id === todo.assignee
                      ? user.picture
                      : participantList.find(
                          (participant) => participant._id === todo.assignee
                        )?.picture
                      ? participantList.find(
                          (participant) => participant._id === todo.assignee
                        )?.picture
                      : Profile
                  }
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
                {participantList.map((participant) => (
                  <MenuItem key={participant._id} value={participant._id}>
                    <img
                      className="profile-small assign-img"
                      src={participant.picture}
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
      </div>
    </section>
  );
};

export default Todolist;
