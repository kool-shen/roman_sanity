import React, { useState } from 'react'
import Image from 'next/image'
import styles from "./Pic.module.css"
import { projectPicProps } from '@/types/Project-type'


export default function Pic(props: projectPicProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    // Appeler la fonction de rappel du parent avec la valeur de isLoaded
    props.onChildLoadChange && props.onChildLoadChange(true);
  };

  return (
    <Image
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props?.alt}
      className={styles.picLoaded}
      onClick={props.onClick}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      key={props.key}
      sizes={`(min-width: 768px) 40vw, 70vw `}
      loading="lazy"
      onLoad={() => {
        handleLoad();
      }}
    />
  );
}
