import React from 'react'
import Image from 'next/image'
import styles from "./Pic.module.css"
import { projectPicProps } from '@/types/Project-type'



export default function Pic(props : projectPicProps ) {

 
  return (
    <div className={styles.picContainer2}>
        <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt={props.alt}
          className={styles.picLoaded2}
          onClick={props.onClick}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          key={props.key}
          sizes={`(min-width: 768px) 40vw, 50vw `}
          
        />
      </div>
  )
}
