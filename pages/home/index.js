import { useState, useEffect } from "react";
import Devit from "components/Devit/Devit";
import styles from "./HomePage.module.css";
import containerStyles from "styles/Home.module.css";
import useUser from "hooks/useUser";

const HomePage = () => {
  const user = useUser();
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    user &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline);
  }, [user]);

  return (
    <>
      <div className={containerStyles.container}>
        <main className={containerStyles.main}>
          <header className={styles.header}>
            <h3>Inicio</h3>
          </header>

          <section>
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
        </main>
      </div>
    </>
  );
};

export default HomePage;
