import Avatar from "components/Avatar";
import styles from "./Devit.module.css";

const Devit = ({ avatar, userName, content, createdAt, id }) => {
  return (
    <article className={styles.devit}>
      <div>
        <Avatar alt={userName} src={avatar} />
      </div>
      <section>
        <header>
          <strong>{userName}</strong>
          <span> · </span>
          <date className={styles.date}>{createdAt}</date>
        </header>
        <strong>{userName}</strong>
        <p>{content}</p>
      </section>
    </article>
  );
};

export default Devit;
