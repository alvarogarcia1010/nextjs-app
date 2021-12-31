import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import styles from "./Devit.module.css";

const Devit = ({ avatar, userName, content, img, createdAt, id }) => {
  const timeago = useTimeAgo(createdAt);

  return (
    <article className={styles.devit}>
      <div>
        <Avatar alt={userName} src={avatar} />
      </div>
      <section>
        <header>
          <strong>{userName}</strong>
          <span> · </span>
          <date className={styles.date}>{timeago}</date>
        </header>
        <p>{content}</p>
        {img && <img className={styles.img} src={img} />}
      </section>
    </article>
  );
};

export default Devit;
