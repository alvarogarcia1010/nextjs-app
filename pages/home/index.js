import { useState, useEffect } from "react";
import Devit from "components/Devit/Devit";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);

  return (
    <>
      <div>
        <header className={styles.header}>
          <h3>Inicio</h3>
        </header>

        <section className={styles.section}>
          {timeline.map((devit) => (
            <Devit
              avatar={devit.avatar}
              id={devit.id}
              key={devit.id}
              message={devit.message}
              username={devit.username}
            />
          ))}
        </section>

        <nav className={styles.nav}></nav>
      </div>
    </>
  );
};

export default HomePage;
