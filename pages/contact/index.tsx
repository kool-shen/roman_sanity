import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from "@/styles/contact.module.css"

export default function Contact() 

{

    const router = useRouter();
    const [isRouteChanging, setIsRouteChanging] = useState(false);
  
    useEffect(() => {
      const handleRouteChangeStart = () => {
        setIsRouteChanging(true);
      };
  
      const handleRouteChangeComplete = () => {
        setIsRouteChanging(false);
      };
  
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeComplete);
  
      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    }, [router.events]);

  return (
    <div className={`${styles.fadeOut} ${isRouteChanging ? styles.fadeOutActive : ''}`}>   
        Contact
    </div >
  )
}



