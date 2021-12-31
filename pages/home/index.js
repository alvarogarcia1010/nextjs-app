import { useState, useEffect } from "react";
import Devit from "components/Devit/Devit";
import styles from "./HomePage.module.css";
import containerStyles from "styles/Home.module.css";
import useUser from "hooks/useUser";
import { fetchLatestDevits } from "firebase/client";
import Link from "next/link";
import Head from "next/head";
import Create from "components/Icons/Create";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";

const HomePage = () => {
  const user = useUser();
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline);
  }, [user]);

  return (
    <>
      <div className={containerStyles.container}>
        <main className={containerStyles.main}>
          <Head>
            <title>Inicio / Devter</title>
          </Head>
          <header className={styles.header}>
            <h3>Inicio</h3>
          </header>

          <section className={styles.section}>
            {timeline.map((devit) => (
              <Devit
                avatar={devit.avatar}
                id={devit.id}
                key={devit.id}
                content={devit.content}
                img={devit.img}
                createdAt={devit.createdAt}
                userName={devit.userName}
                userId={devit.userId}
              />
            ))}
          </section>

          <nav className={styles.nav}>
            <Link href="/home">
              <a>
                <Home width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/search">
              <a>
                <Search width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a>
                <Create width={32} height={32} stroke="#09f" />
              </a>
            </Link>
          </nav>
        </main>
      </div>
    </>
  );
};

export default HomePage;
