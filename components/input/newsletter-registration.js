import { useRef, useState } from "react";

import styles from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [isValid, setIsValid] = useState(true);
  const emailInputRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

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
      .then((response) => response.json())
      .then((data) => console.log(data));

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
