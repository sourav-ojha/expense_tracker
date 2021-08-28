import React, { useContext, useState } from "react";
import styles from "./Main.module.css";
import { ExpenseTrackerContext } from "../../context/context";
import { expenseCategories, incomeCategories } from "./categories";
import DeleteBtn from "../../assets/delete-button.svg";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const { balance, addTransaction, transactions, deleteTransaction } =
    useContext(ExpenseTrackerContext);
  var today = new Date();
  const dateValue =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState({
    type: "Income",
    category: "Other",
    amount: "",
    date: dateValue,
  });

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      setFormData({
        ...formData,
        [name]: value,
        category: "Other",
      });
    } else
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    });

    setFormData({
      type: "Income",
      category: "Other",
      amount: "",
      date: dateValue,
    });
    setValid(false);
  };
  return (
    <div className={styles.box}>
      <div className={styles.card}>
        <div className={styles.card_title}>Expense Tracker</div>
        <div className={styles.net_amt}>Net Amount Rs: {balance}</div>
        <hr />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_row}>
            <label htmlFor="type" className={styles.input_col}>
              Type
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </label>
            <label htmlFor="category" className={styles.input_col}>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {selectedCategories.map((t) => (
                  <option value={t.type}>{t.type}</option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.input_row}>
            <label htmlFor="amount" className={styles.input_col}>
              Amount
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={(e) => {
                  handleChange(e);
                  e.target.value ? setValid(true) : setValid(false);
                }}
              />
            </label>
            <label htmlFor="Date" className={styles.input_col}>
              Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className={`${valid ? styles.valid_btn : ""} ${styles.submit_btn}`}
            disabled={valid ? false : true}
          >
            Create
          </button>
        </form>
        <div className={styles.transactions}>
          {transactions.map((t) => (
            <div
              className={`${styles.transaction} ${
                t.type === "Income"
                  ? styles.income_transaction
                  : styles.expense_transaction
              }`}
            >
              <div>
                <div className={styles.trans_category}>{t.category}</div>
                <div className={styles.trans_details}>
                  <span>Rs {t.amount} -</span>
                  <span>- {t.date}</span>
                </div>
              </div>
              <img
                src={DeleteBtn}
                className={styles.trans_delete}
                onClick={() => deleteTransaction(t.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
