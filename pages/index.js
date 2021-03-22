import Head from 'next/head'
import { useState } from 'react'
import Button from '../components/Button/Button'
import GitHub from '../components/Icons/Github'
import { loginWithGithub } from '../firebase/client'
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleClick = () => {
    //const [user, setUser] = useState(null)
    loginWithGithub()
      .then(user => {
        const { additionalUserInfo } = user
        const { username, profile} = additionalUserInfo
        const { avatar_url, blog } = profile

        console.log(user)
      })
      .catch(error => console.log(error))
  }
  
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
        <Button onClick={handleClick}>
          <GitHub width={24} height={24} fill="#ffffff" />
          Login with GitHub
        </Button>
      </main>
    </div>
  )
}
