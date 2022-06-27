import React from 'react';

import styles from './FilesEmpty.module.css';

export const FilesEmpty = () => {
  const list = [1, 2, 3, 4];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Files</h2>

      <div className={styles.list}>
        {list.map((number) => (
          <div className={styles.emptyLines} key={number} />
        ))}
      </div>
    </div>
  );
};
