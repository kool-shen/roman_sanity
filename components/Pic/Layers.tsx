import React, { useEffect } from 'react'
import styles from "@/components/Pic/Layers.module.css"

export default function Layers(props: 
  { onClickRight: React.MouseEventHandler<HTMLDivElement> | undefined; 
    onClickLeft: React.MouseEventHandler<HTMLDivElement> | undefined;
    index? : number;
    total? : number
    
   } ) {
  
  const cursorStyle =   {  
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='60' viewBox='0 0 32 32'><text x='0' y='20' font-family='Roboto' font-size='11vmin' fill='white'>${props.index}/${props.total}</text></svg>") 0 0, auto`,
}
  
  return (
  <div  >
  
    <div className={styles.rightLayer} onClick={props.onClickRight}
   
     ></div>
    <div className={styles.leftLayer} onClick={props.onClickLeft}></div>
    </div>
  )
}
