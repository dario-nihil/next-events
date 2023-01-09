import { useRef, useState, useContext } from "react";

import NotificationContext from "../../store/notification-context";
import styles from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [isValid, setIsValid] = useState(true);
  const emailInputRef = useRef();
  const ctx = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    ctx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    if (
      enteredEmail.trim().length === 0 ||
      !enteredEmail.trim().includes("@")
    ) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() =>
        ctx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        })
      )
      .catch((error) =>
        ctx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        })
      );

    emailInputRef.current.value = "";
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
        {!isValid && <p>Please enter a valid email</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
