import React from 'react'
import styles from "@/components/Pic/Layers.module.css"

export default function Layers(props: { onClickRight: React.MouseEventHandler<HTMLDivElement> | undefined; onClickLeft: React.MouseEventHandler<HTMLDivElement> | undefined } ) {
  return (
  <>
    <div className={styles.rightLayer} onClick={props.onClickRight}></div>
    <div className={styles.leftLayer} onClick={props.onClickLeft}></div>
    </>
  )
}
