import React, { useState } from 'react';
import styles from '../styles/FlippableCard.module.css';

export default function FlippableCard({ frontContent, backContent }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.cardContainer} onClick={handleFlip}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        {/* Cara frontal */}
        <div className={styles.cardFront}>
          {frontContent}
        </div>
        {/* Cara trasera */}
        <div className={styles.cardBack}>
          {backContent}
        </div>
      </div>
    </div>
  );
}
