import Link from "next/link";
import styles from "./button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link className={styles.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
