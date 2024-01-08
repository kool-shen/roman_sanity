import React, { useState } from 'react'
import Image from 'next/image'
import styles from "./Pic.module.css"
import { projectPicProps } from '@/types/Project-type'
import { useSchema } from 'sanity'



export default function PicHeight(props : projectPicProps ) {

  const [isLoaded, setIsLoaded] = useState(false)

const handleLoad = () =>  
{setIsLoaded(true)}
 
  return (
    <div className={styles.picContainer2}>
        <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt={props.alt}
          className={`${styles.picLoaded2} ${isLoaded ? '' : styles.hidden}`}  onClick={props.onClick}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          key={props.key}
          sizes={`(min-width: 768px) 40vw, 50vw `}
          onLoadingComplete={()=>{handleLoad()}}
        />
      </div>
  )
}
