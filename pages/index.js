import Head from "next/head";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import GitHub from "components/Icons/Github";
import { loginWithGithub, onAuthStateChanged } from "firebase/client";
import styles from "styles/Home.module.css";
import { useRouter } from "next/router";

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
};

export default function Home() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGithub().catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Devter - Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.logo} alt="logo" />
        <h1 className={styles.title}>Devter</h1>
        <h2 className={styles.subtitle}>
          Talk about development <br /> with developers
        </h2>

        {user === USER_STATES.NOT_LOGGED && (
          <Button onClick={handleClick}>
            <GitHub width={24} height={24} fill="#ffffff" />
            Login with GitHub
          </Button>
        )}

        {user === USER_STATES.NOT_KNOW && <span>Loading...</span>}
      </main>
    </div>
  );
}
