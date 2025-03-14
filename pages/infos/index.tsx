import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from "@/styles/contact.module.css"
import { getAllInfo } from '@/sanity/sanity-utils'
import { infosType } from '@/types/Project-type'
import  {PortableText} from "@portabletext/react"
import Link from 'next/link'
import { NextSeo } from 'next-seo'


export default function InfoPage(props: { infos: infosType[] }) 


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
            <p className={styles.priority}>{props.priority}</p>
            <p>{props.value}</p>
        </div>
      )
    }

    interface PrioritiesProps {
      priority: string;
      value: string ;
    }

const data = props.infos[0]

// console.log('data', data);

const instaurl = data.insta.replace("@", "");

  return (
    <>
   <NextSeo
    title={"infos"}
    description={`section infos`}
  />
   
    <div className={`rightPartContainer fadeOut  ${styles.mainContainer}   ${isRouteChanging ? "fadeOutActive" : ''}`}>
      <div className={styles.titleContainer}>
      <div className={styles.infoBloc}>
            <p className={styles.priority}>Contact</p>
            <p>roman.cadre@gmail.com</p>
            <p>+33 6 71 59 32 41</p>
        </div>
       <Infos priority="Tirages" value={"prints@romancadre.com"} />
       <div className={styles.infoBloc}>
            <p className={styles.priority}>Atelier</p>
            <p>26, avenue Pierre Donzelot</p>
            <p>35700 Rennes</p>
        </div>
       <Link target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${instaurl}`}>
       <Infos priority="Instagram" value={data.insta} />
       </Link>
       <div className={styles.infoBloc}>
            <p className={styles.priority}>Crédits</p>
            <p>Code : Léo Ferté (liquid/prom)</p>
            <p>Design : Adèle Trevilly</p>
        </div>
       <Infos priority="Copyright" value="Roman Cadre ©" />
      </div>
      <div className={styles.textContainer}>
      <PortableText value={data.bio}/>
      </div>
    
    </div>
    </>
  )
}



export async function getStaticProps() {
  const infodata = await getAllInfo();


  if (!infodata || Object.keys(infodata).length === 0) {
    return { notFound: true };
  }

  const infosArray = Object.values(infodata);
  

  return {
    props: { infos: infosArray },
    revalidate: 30
  };
}