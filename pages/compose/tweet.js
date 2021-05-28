import Button from "components/Button/Button";
import { addDevit } from "firebase/client";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useState } from "react";
import containerStyles from "styles/Home.module.css";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const ComposeTweet = () => {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

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
