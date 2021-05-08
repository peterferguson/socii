import styles from "@styles/MessagingChannelList.module.css";

export const SkeletonLoader = () => {
  return (
    <div style={{ position: 'relative' }}>
      <ul className={styles['skeleton-loader__list']}>
        <li>
          <div className={styles['skeleton-loader__avatar']}></div>
          <div className={styles['skeleton-loader__text']}>
            <div></div>
            <div></div>
          </div>
        </li>
        <li>
          <div className={styles['skeleton-loader__avatar']}></div>
          <div className={styles['skeleton-loader__text']}>
            <div></div>
            <div></div>
          </div>
        </li>
        <li>
          <div className={styles['skeleton-loader__avatar']}></div>
          <div className={styles['skeleton-loader__text']}>
            <div></div>
            <div></div>
          </div>
        </li>
        <li>
          <div className={styles['skeleton-loader__avatar']}></div>
          <div className={styles['skeleton-loader__text']}>
            <div></div>
            <div></div>
          </div>
        </li>
        <li>
          <div className={styles['skeleton-loader__avatar']}></div>
          <div className={styles['skeleton-loader__text']}>
            <div></div>
            <div></div>
          </div>
        </li>
      </ul>
    </div>
  );
};
