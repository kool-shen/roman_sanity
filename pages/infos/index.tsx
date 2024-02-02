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
            <h3>{props.priority}</h3>
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
       <Infos priority="architecture" value={data.archi}/>
       <Infos priority="tirages, expositions" value={data.photo} />
       <Link target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${instaurl}`}>
       <Infos priority="instagram" value={data.insta} />
       </Link>
       <Infos priority="code" value="Léo Ferté (liquid/prom)" />
       <Infos priority="copyright" value="@ Roman Cadre" />
      </div>
      <div className={styles.textContainer}>
      <PortableText value={data.bio}/>
      <PortableText value={data.mentions}/>
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