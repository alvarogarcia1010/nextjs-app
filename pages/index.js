import Head from 'next/head'
import Button from '../components/Button/Button'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Devter - Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src='/logo.png' className={styles.logo} alt='logo' />
        <h1 className={styles.title}>Devter</h1>
        <h2 className={styles.subtitle}>Talk about development <br/> with developers</h2>
        <Button>Login with GitHub</Button>
      </main>
    </div>
  )
}
