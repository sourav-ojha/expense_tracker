import React from "react";
import styles from "./Detail.module.css";
import { Doughnut } from "react-chartjs-2";
import useTransactions from "../../useTransaction";

const Detail = ({ title }) => {
  const { total, chartData } = useTransactions(title);
  return (
    <div className={styles.box}>
      <div className={styles.card_title}>{title}</div>
      <div className={styles.blank}></div>
      <div className={styles.amount}>Rs {total}</div>
      <div className={styles.graph}>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default Detail;
