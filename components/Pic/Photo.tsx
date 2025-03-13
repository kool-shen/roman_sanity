import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Photo.module.css';
import { photoProps } from '@/types/Project-type';
import { useRouter } from 'next/router';

export default function Photo(props: photoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
   setIsLoaded(false);
    console.log("new page loaded")
  }, [router.asPath]);


const handleTransition = async (path: string) => {
  setIsLoaded(false);
  await new Promise((resolve) => setTimeout(resolve));
  router.push(path);
};

 const minSwipeDistance = 50; // Distance minimum en pixels pour qu'un swipe soit détecté

const handleTouchStart = (e: React.TouchEvent) => {
   setTouchStart(e.targetTouches[0].clientX);
 };

   const handleTouchMove = (e: React.TouchEvent) => {
     setTouchEnd(e.targetTouches[0].clientX);
   };

   const handleTouchEnd = () => {
     if (!touchStart || !touchEnd) return;

     const distance = touchStart - touchEnd;

     if (distance > minSwipeDistance) { 
       // Swipe gauche, aller à l'image suivante
       handleTransition(props.linkNext);
     }

     if (distance < -minSwipeDistance) {
       // Swipe droite, aller à l'image précédente
       handleTransition(props.linkPrevious);
       console.log("droite")
     }

     // Réinitialiser les valeurs
     setTouchStart(null);
     setTouchEnd(null);
   };

  return (
    <>
      <div
       
      >
     
          <div className={styles.rightLayer} 
          onClick={(e) => handleTransition(props.linkNext)}
          ></div>
     
    
          <div className={styles.leftLayer}         
       onClick={(e) => handleTransition(props.linkPrevious)}
          ></div>
        
      </div>
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        alt={props?.alt}
        className={`${styles.picLoaded} ${!isLoaded ? styles.fadeOut : styles.fadeIn}
          
        }`} 
        onClick={props.onClick}
        style={props.style}
        sizes={`(min-width: 768px) 30vw, 70vw`}
      onLoad={() => setIsLoaded(true)} 
      key={props.src}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
      /> 
    </>
  );
}