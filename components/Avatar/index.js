import styles from "./Avatar.module.css";

const Avatar = ({ alt, src, text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} title={alt} src={src} alt={alt} />
      {text && <strong>{text || alt}</strong>}
    </div>
  );
};

export default Avatar;
