import Button from "components/Button/Button";
import { useState } from "react";
import containerStyles from "styles/Home.module.css";

const ComposeTweet = () => {
  const [message, setMessage] = useState("");
  const isButtonDisabled = false;

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = () => {};

  return (
    <div className={containerStyles.container}>
      <main className={containerStyles.main}>
        <form onSubmit={handleSubmit}>
          <textarea
            className={containerStyles.textarea}
            onChange={handleChange}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          <div className="p-15">
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ComposeTweet;
