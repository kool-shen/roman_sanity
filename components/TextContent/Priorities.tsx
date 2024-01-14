import React from 'react'
import styles from "@/styles/Project.module.css"

interface PrioritiesProps {
    name: string;
    value: string | number;
  }


export default function Priorities(props:PrioritiesProps) {

  return (
    props.value && 
    <div className={styles.priorities} >
       <h3>{props.name}</h3>
        <p>{props.value}</p>
    </div>
  )
}
