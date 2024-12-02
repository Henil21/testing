import styles from "./userCard.module.css";

const UserCard = ({ data }) => {
  const { userName, tagMessage } = data;
  return (
    <div className={styles.userCard}>
      <div className={styles.image}>
        <img src="./profile.png" alt="img" />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
              {userName}     
        </div>
        <div className={styles.tagMessage}>
            {tagMessage}
        </div>
      </div>
      <div className={styles.messageCount}>
        3
      </div>
    </div>
  );
};

export default UserCard;
