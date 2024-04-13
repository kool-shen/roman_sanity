import React, { useRef, useEffect } from 'react'
import styles from './nextPrevious.module.css'
import Link from 'next/link';
import Pic from '../Pic/Pic';


interface nPProps {
    name : string;
    slugNext: string;
    slugPrevious: string;
 
 }

 function NextPrevious({ name, slugPrevious, slugNext }: nPProps) {
  return (
    <div className={styles.container}>
        <Link href={slugPrevious}>
        <h1>&lt;</h1>
        </Link>
      <h1>{name}</h1>
       <Link href={slugNext}>
      <h1>&gt;</h1>
      </Link>
    </div>
  );
}

export default NextPrevious;




