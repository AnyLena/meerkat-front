import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import "../styles/expenses.css";

import { useAuth } from "../context/useAuth";

const Expenses = ({ eventData, setEventData }) => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [formData, setFormData] = useState(0);
  const { token, user } = useAuth();
  const SERVER = import.meta.env.VITE_SERVER;

  const handleInput = (event, key) => {
    const data = { [key]: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.put(
        `${SERVER}/events/${eventData._id}/expenses`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData((prev) => ({ ...prev, expenses: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (eventData) setUserExpenses(eventData.expenses);
  }, [eventData]);

  useEffect(() => {
    console.log("money", userExpenses);
  }, [userExpenses]);

  useEffect(() => {
    console.log("form", formData);
  }, [formData]);

  return (
    <>
      <section className="expenses">
        <h2 className="event-heading">Expenses</h2>
        <div className="text">
          <p>{location.description}</p>
        </div>
        {eventData.expenses.length > 0 ? (
          <>
            {userExpenses.map((money) => (
              <div className="expense-item" key={money._id}>
                <p>{money.user.name}</p>
                <p>{money.title}</p>
                <p className="expense-amount">{money.amount.toFixed(2)}€</p>
              </div>
            ))}
            <div className="expense-total">
              <p>
                Total{" "}
                {userExpenses
                  .reduce((total, expense) => total + expense.amount, 0)
                  .toFixed(2)}
                €
              </p>
            </div>
          </>
        ) : (
          "no money spend."
        )}
        <Box
          className="expenses-form"
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="What?"
            required
            variant="outlined"
            value={formData.title}
            onChange={(event) => handleInput(event, "title")}
          />
          <TextField
            id="outlined-basic"
            label="How much?"
            required
            variant="outlined"
            type="number"
            inputProps={{ step: "0.01" }}
            value={formData.amount}
            onChange={(event) => handleInput(event, "amount")}
          />

          <Button className="btn-green" onClick={handleAdd}>
            Add
          </Button>
        </Box>
        <div className="average-box">
          <div>Average expense per participant:</div>
          <div className="average">
            {(Number(
              userExpenses.reduce((total, expense) => total + expense.amount, 0)
            ) / Number(eventData.participants.length + 1)).toFixed(2)}
            €
          </div>
        </div>
        <div className="user-amount">
          {/* OWNER CALCULATION */}
          <div className="user-amount-item">
            <h3>{eventData.owner.name}</h3>
            <p>
              {" "}
              payed{" "}
              {userExpenses
                .reduce(
                  (total, expense) =>
                    expense.user.name === eventData.owner.name
                      ? total + expense.amount
                      : total,
                  0
                )
                .toFixed(2)}
              €
            </p>
            <p>
              {(
                userExpenses.reduce(
                  (total, expense) =>
                    expense.user.name === eventData.owner.name
                      ? total + expense.amount
                      : total,
                  0
                ) -
                userExpenses.reduce(
                  (total, expense) => total + expense.amount,
                  0
                ) /
                  (eventData.participants.length + 1)
              ).toFixed(2) < 0
                ? "gives "
                : "gets "}
              <span className="user-amount--bold">
                {(
                  userExpenses.reduce(
                    (total, expense) =>
                      expense.user.name === eventData.owner.name
                        ? total + expense.amount
                        : total,
                    0
                  ) -
                  userExpenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  ) /
                    (eventData.participants.length + 1)
                ).toFixed(2)}
                €
              </span>
            </p>
          </div>
          {/* PARTICIPANT CALCULATION */}
          {eventData.participants.map((participant, index) => (
            <div className="user-amount-item" key={index}>
              <h3>{participant.name}</h3>
              <p>
                payed{" "}
                {userExpenses
                  .reduce(
                    (total, expense) =>
                      expense.user.name === participant.name
                        ? total + expense.amount
                        : total,
                    0
                  )
                  .toFixed(2)}
                €
              </p>
              <p>
                {(
                  userExpenses.reduce(
                    (total, expense) =>
                      expense.user.name === participant.name
                        ? total + expense.amount
                        : total,
                    0
                  ) -
                  userExpenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  ) /
                    (eventData.participants.length + 1)
                ).toFixed(2) < 0
                  ? "gives "
                  : "gets "}
                <span className="user-amount--bold">
                  {(
                    userExpenses.reduce(
                      (total, expense) =>
                        expense.user.name === participant.name
                          ? total + expense.amount
                          : total,
                      0
                    ) -
                    userExpenses.reduce(
                      (total, expense) => total + expense.amount,
                      0
                    ) /
                      (eventData.participants.length + 1)
                  ).toFixed(2) * -1}
                  €
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Expenses;
