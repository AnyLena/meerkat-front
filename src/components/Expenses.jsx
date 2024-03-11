import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { handleDeleteExpense, handleAddExpense } from "../api/expenses.js";

//STYLES
import "../styles/expenses.css";
import { Box, TextField, Button } from "@mui/material";
import { IoIosClose } from "react-icons/io";

const Expenses = ({ eventData, setEventData }) => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
  });
  const { token, user } = useAuth();

  const handleInput = (event, key) => {
    const data = { [key]: event.target.value };
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleAdd = () => {
    handleAddExpense(eventData._id, formData, token, setEventData);
    setFormData({
      title: "",
      amount: "",
    });
  };

  const handleDelete = (expenseId) => {
    handleDeleteExpense(expenseId, eventData._id, token, setEventData);
  };

  const getAmountPayed = (user) => {
    let cost;
    if (user === "total") {
      cost = userExpenses
        .reduce((total, expense) => total + expense.amount, 0)
        .toFixed(2);
    } else {
      cost = userExpenses
        .reduce(
          (total, expense) =>
            expense.user.name === user ? total + expense.amount : total,
          0
        )
        .toFixed(2);
    }
    return cost;
  };

  const getAmountDiff = (user) => {
    const diff = (
      userExpenses.reduce(
        (total, expense) =>
          expense.user.name === user ? total + expense.amount : total,
        0
      ) -
      userExpenses.reduce((total, expense) => total + expense.amount, 0) /
        (eventData.participants.length + 1)
    ).toFixed(2);
    return diff;
  };

  useEffect(() => {
    if (eventData) setUserExpenses(eventData.expenses);
  }, [eventData]);

  return (
    <>
      <section className="expenses">
        <h2 className="event-heading">Expenses</h2>

        {/* RENDERING EXPENSES LIST */}
        <div className="expenses-inside">
          {eventData.expenses.length > 0 ? (
            <>
              {userExpenses.map((money) => (
                <div
                  className={
                    user._id === eventData.owner._id
                      ? "expense-item grid4"
                      : "expense-item grid3"
                  }
                  key={money._id}
                >
                  <p>{money.user.name}</p>
                  <p>{money.title}</p>
                  <p className="expense-amount">{money.amount.toFixed(2)}€</p>
                  {user._id === eventData.owner._id ? (
                    <Button
                      className="btn-red expense-btn"
                      onClick={() => handleDelete(money._id)}
                    >
                      <IoIosClose />
                    </Button>
                  ) : null}
                </div>
              ))}
            </>
          ) : null}

          {/* EXPENSES FORM */}
          <Box
            className="expenses-form"
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
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
              inputProps={{ step: "0.01", min: "0.01" }}
              value={formData.amount}
              onChange={(event) => handleInput(event, "amount")}
            />
            <Button className="btn-green" onClick={handleAdd}>
              Add
            </Button>
          </Box>

          {userExpenses.reduce((total, expense) => total + expense.amount, 0) >
          0 ? (
            <>
              <div className="user-amount">
                {/* OWNER CALCULATION */}
                <div className="user-amount-item">
                  <h3>{eventData.owner.name}</h3>
                  <p> payed {getAmountPayed(eventData.owner.name)}€</p>
                  <p>
                    {getAmountDiff(eventData.owner.name) < 0
                      ? "owes "
                      : "gets "}
                    <span className="user-amount--bold">
                      {getAmountDiff(eventData.owner.name) < 0
                        ? getAmountDiff(eventData.owner.name) * -1
                        : getAmountDiff(eventData.owner.name)}
                      €
                    </span>
                  </p>
                </div>
                {/* PARTICIPANT CALCULATION */}
                {eventData.participants.map((participant, index) => (
                  <div className="user-amount-item" key={index}>
                    <h3>{participant.name}</h3>
                    <p>payed {getAmountPayed(participant.name)}€</p>
                    <p>
                      {getAmountDiff(participant.name) < 0 ? "gives " : "gets "}
                      <span className="user-amount--bold">
                        {getAmountDiff(participant.name) < 0
                          ? getAmountDiff(participant.name) * -1
                          : getAmountDiff(participant.name)}
                        €
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              {/* AVERAGE CALCULATION */}
              <div className="average-box">
                <div>Total spendings:</div>
                <div className="average">{getAmountPayed("total")}€</div>
              </div>
              <div className="average-box">
                <div>Average expense per participant:</div>
                <div className="average">
                  {(
                    getAmountPayed("total") /
                    Number(eventData.participants.length + 1)
                  ).toFixed(2)}
                  €
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Expenses;
