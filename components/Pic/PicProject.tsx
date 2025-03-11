import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from "./Pic.module.css"
import { projectPicProps } from '@/types/Project-type'


export default function PicProject(props : projectPicProps ) {


const [isLoaded, setIsLoaded] = useState(false)

const handleLoad = () =>  
{
 setIsLoaded(true); 
}

useEffect(() => {
  setIsLoaded(false);
}, [props.src]);
 
  return (
        <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt={props?.alt}
          className={`${styles.picProjectLoaded} ${isLoaded ? styles.fadeIn : styles.fadeOut}`}  
          onClick={props.onClick}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          key={props.key}
          sizes={`(min-width: 768px) 40vw, 70vw `}
          loading='lazy'
          onLoad={()=>{handleLoad()}}
        />
     
  )
}