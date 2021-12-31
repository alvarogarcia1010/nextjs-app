import Avatar from "components/Avatar";
import Button from "components/Button/Button";
import { addDevit, uploadImage } from "firebase/client";
import useUser from "hooks/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import containerStyles from "styles/Home.module.css";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const ComposeTweet = () => {
  const user = useUser();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const [task, setTask] = useState(null);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [imgURL, setImgURL] = useState(null);

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

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
      img: imgURL,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];

    const task = uploadImage(file);
    setTask(task);
  };

  return (
    <div className={containerStyles.container}>
      <Head>
        <title>Devitear / Devter</title>
      </Head>
      <main className={containerStyles.main}>
        {user && (
          <section className={containerStyles.avatarContainer}>
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            className={containerStyles.textarea}
            style={
              drag === DRAG_IMAGE_STATES.DRAG_OVER
                ? { border: "3px dashed #09f" }
                : { border: "3px solid transparent" }
            }
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className={containerStyles.removeImage}>
              <button
                className={containerStyles.buttonClose}
                onClick={() => setImgURL(null)}
              >
                x
              </button>
              <img className={containerStyles.composeImage} src={imgURL} />
            </section>
          )}
          <div className="p-15">
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ComposeTweet;
