import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from "./Pic.module.css"
import { projectPicProps } from '@/types/Project-type'


export default function Pic(props: projectPicProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    props.onLoadedChange && props.onLoadedChange(true)  };

  useEffect(() => {
   }, [props.src ]);


  return (
    <Image
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props?.alt}
      className={`${styles.picLoaded} ${isLoaded ? '' : styles.hidden}`}        
      onClick={props.onClick}
      style={ {opacity : isLoaded ? 1 : 0}}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      key={props.key}
      sizes={`(min-width: 768px) 40vw, 70vw `}
      loading="lazy"
      onLoad={handleLoad}
    />
  );
}
