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


    function Infos(props : PrioritiesProps) {

      return (
        props.value && 
        <div className={styles.infoBloc}>
            <h3>{props.priority}</h3>
            <p>{props.value}</p>
        </div>
      )
    }

    interface PrioritiesProps {
      priority: string;
      value: string ;
    }

  return (
    <div className={`rightPartContainer fadeOut  ${styles.mainContainer}   ${isRouteChanging ? "fadeOutActive" : ''}`}>
      <div className={styles.titleContainer}>
       <Infos priority="architecture" value="roman.cadre@gmail.com" />
       <Infos priority="tirages, expositions" value="roman.cadre.photo@gmail.com" />
       <Infos priority="instagram" value="@romancadre" />
       <Infos priority="site web" value="Léo Ferté" />
       <Infos priority="copyright" value="@ Roman Cadre" />
      </div>
    
    </div>
  )
}



