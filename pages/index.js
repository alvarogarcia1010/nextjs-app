import Head from 'next/head'
import { useState, useEffect } from 'react'
import Button from '../components/Button/Button'
import GitHub from '../components/Icons/Github'
import { loginWithGithub, onAuthStateChanged } from '../firebase/client'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGithub()
      .then(user => {
        setUser(user)
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
        
        {user === null && (
          <Button onClick={handleClick}>
            <GitHub width={24} height={24} fill="#ffffff" />
            Login with GitHub
          </Button>
        )}

        {user && user.avatar && (
          <div>
            <img src={user.avatar} />
            <strong>{user.username}</strong>
          </div>
        )}
        
      </main>
    </div>
  )
}
