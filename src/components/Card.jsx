import React from 'react';
import styles from './Card.module.css';

export default function Card({ image, name, species }) {
  const placeholder = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%230b0b0b'/><text x='50%' y='50%' fill='%23ffffff' font-size='18' font-family='Arial' dominant-baseline='middle' text-anchor='middle'>Imagem indisponível</text></svg>`

  return (
    <article className={styles.card}>
      <img
        src={image || placeholder}
        alt={name}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = placeholder }}
      />
      <div className={styles.cardBody}>
        <h3>{name}</h3>
        <p className={styles.species}>{species}</p>
      </div>
    </article>
  );
}
