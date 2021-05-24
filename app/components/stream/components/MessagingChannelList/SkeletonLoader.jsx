import styles from "@styles/MessagingChannelListLoader.module.css"
import React from "react"

export const SkeletonLoader = () => {
  return (
    <div className="relative">
      <ul className={styles["skeleton-loader__list"]}>
        {[1, 2, 3, 4].map((key) => (
          <li key={`loader-list-element-${key}`}>
            <div className={styles["skeleton-loader__avatar"]} />
            <div className={styles["skeleton-loader__text"]}>
              <div />
              <div />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
