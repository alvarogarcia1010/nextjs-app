import Avatar from "components/Avatar";
import styles from "./Devit.module.css";

const Devit = ({ avatar, username, message, id }) => {
  return (
    <article className={styles.devit}>
      <div>
        <Avatar alt={username} src={avatar} />
      </div>
      <section>
        <strong>{username}</strong>
        <p>{message}</p>
      </section>
    </article>
  );
};

export default Devit;
