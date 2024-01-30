import Head from 'next/head'
import  {getAllAlbums, getOneAlbum} from "@/sanity/sanity-utils"
import { albumType } from '@/types/Project-type';
import Image from 'next/image';
import styles from "@/styles/PhotoHome.module.css"
import Link from 'next/link';
import Pic from '@/components/Pic/Pic';
import React, { useEffect, useRef } from 'react';
import PicHeight from '@/components/Pic/PicHeight'
import  {gsap} from "gsap"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextSeo } from 'next-seo';

let initialData : albumType[] = [];


function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Photo(props: { albums?: albumType[] }) {

  if (!props.albums) {
    return <></>;
  }

  /// Mélange des images de slider 1 et 2 ///

  let data = initialData.length > 0 ? initialData : props.albums.flatMap((album) => [
    ...album.images.map((image) => ({ ...image, albumSlug: album.slug, albumName: album.name })),
    ...album.images2.map((image) => ({ ...image, albumSlug: album.slug, albumName: album.name })),
  ]);

  if (initialData.length === 0) {
    initialData = shuffleArray(data);
  }
/// animation hover

const [hoveredData, setHoveredData] = useState<string | null>(null)

const hover = (e : string | null ) => {
 
    setHoveredData(e);
 
}

//// animation liste projets

const albumsRef = useRef<HTMLDivElement>(null);

const menuTimeline = gsap.timeline({
  defaults: { duration: 0.1, ease: "power2" },
});

const albumsAnimation = () => {
  albumsRef
    && Array.from(albumsRef.current?.children as HTMLCollection).forEach((child) =>
    menuTimeline.to(child, { opacity: 1 })
  );};

useEffect(() => {
  albumsAnimation()
}, []);


//// animation sortie

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

////

const [indexClicked, setIndexClicked]= useState(false)

const indexStyle = !indexClicked
? { transform: "translateY(100%)", transition: "transform 0.5s" }
: { transition: "transform 0.5s",};  

const indexButtonStyle = !indexClicked
? { color: "grey"}
: { color: "black"}; 

const clickIndex = ()=>   {
  setIndexClicked(!indexClicked)
  
}

  
    return (
        <>
           <NextSeo
    title={"photographie"}
    description={`section photographie`}
    
  />
          <div className={`rightPartContainer ${styles.mainContainer}`}>
          <h1 onClick={()=>{clickIndex()}} style={indexButtonStyle}>index</h1>
           
        <div className={styles.titleContainer} ref={albumsRef}>
          {props.albums.map((content: albumType) => (
              <div className={styles.textContainer} key={content._id}>
              <Link href={`photo/${content.slug}`} >
              <h3 
               className={hoveredData !== content.name && hoveredData !== null ? styles.hiddenText : ""}
               onMouseEnter={()=>{hover(content.name)}}
               onMouseLeave={()=>{hover(null)}}>
                {content.name}
              </h3>
              </Link>
              </div>
            
          ))}
        </div>
        
        {/*  */}
          <div className={styles.modalContainer}>
          <div className={styles.mobileModal} style={indexStyle}>
        {props.albums.map((content: albumType) => (
              <div className={styles.textContainer} key={content._id}>
              <Link href={`photo/${content.slug}`} >
              <h3>
                {content.name}
              </h3>
              </Link>
              </div>
            
          ))}
          </div> 
        <div className={`fadeOut ${styles.galleryContainer}  ${isRouteChanging ? "fadeOutActive" : ''}`}>
        
       
          {data.map((content: any, index: number) => (
            <div key={index} className={styles.picContainer} >
              <Link href={`photo/${content.albumSlug}/${content.key}`} key={content.key}>
                <PicHeight src={content.image} alt={`photo ${index} de l'album ${content.albumSlug}`} width={content.width} height={content.height} onMouseEnter={()=>{hover(content.albumName)}}
            onMouseLeave={()=>{hover(null)}}/>
              </Link>
            </div>
          ))}
        </div>
        </div>
        </div>
    </>

   
             
    )
  }


  export async function getStaticProps() {
    const albumsObject = await getAllAlbums();
  
    if (!albumsObject || Object.keys(albumsObject).length === 0) {
      return { notFound: true };
    }
  
    const albumsArray = Object.values(albumsObject);
    // console.log('albumsArray', albumsArray);

    
    
  
    return {
      props: { albums: albumsArray },
      revalidate: 30
    };
  }

  


  