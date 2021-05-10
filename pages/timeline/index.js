import Head from "next/head"
import Link from "next/link"

const Timeline = ({ username}) => {
  return (
    <div>
      <Head>
        <title>Timeline - Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is the timeline of {username}</h1>
      <Link href="/"><a>Go home</a></Link>
    </div>
  )
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
}

export default Timeline
