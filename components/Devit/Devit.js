import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import useDateTimeFormat from "hooks/useDateTimeFormat";
import styles from "./Devit.module.css";

const Devit = ({ avatar, userName, content, img, createdAt, id }) => {
  const router = useRouter();
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <article className={styles.devit} onClick={handleArticleClick}>
      <div>
        <Avatar alt={userName} src={avatar} />
      </div>
      <section>
        <header>
          <strong>{userName}</strong>
          <span> · </span>
          <Link href={`status/${id}`}>
            <a>
              <time title={createdAtFormated} className={styles.date}>
                {timeago}
              </time>
            </a>
          </Link>
        </header>
        <p>{content}</p>
        {img && <img className={styles.img} src={img} />}
      </section>
    </article>
  );
};

export default Devit;
