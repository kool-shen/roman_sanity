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




export default function Photo(props: { albums?: albumType[] }) {

  if (!props.albums) {
    return <></>;
  }

  /// Mélange des images de slider 1 et 2 ///

  let data = props.albums.flatMap((album) => [
    ...album.images.map((image) => ({ ...image, albumSlug: album.slug })),
    ...album.images2.map((image) => ({ ...image, albumSlug: album.slug })),
  ]);

  console.log('data', data.length);


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

data = shuffleArray(data);

//////

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

console.log(albumsRef.current?.children)

////
  
    return (
        <>
          <Head>
            <title>Test Roman Sanity</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
         
          <div className={`rightPartContainer ${styles.mainContainer}`}>
        <div className={styles.titleContainer} ref={albumsRef}>
          {props.albums.map((content: albumType) => (
              <div className={styles.textContainer}>
              <Link href={`photo/${content.slug}`} key={content._id}>
              <h3>{content.name}</h3>
              </Link>
              </div>
            
          ))}
        </div>
        <div className={styles.galleryContainer}>
          {data.map((content: any, index: number) => (
            <div key={index} className={styles.picContainer} style={ content.width < content.height ? { maxWidth: '20%' } : {}}>
              <Link href={`photo/${content.albumSlug}/${content.key}`} key={content.key}>
                <PicHeight src={content.image} alt={content.albumSlug} width={content.width} height={content.height} />
              </Link>
            </div>
          ))}
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

  


  