import List from '@/components/List/List';
import { getAllAlbums } from '@/sanity/sanity-utils';
import { albumType } from '@/types/Project-type';
import styles from "@/styles/Album.module.css"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PicHeight from '@/components/Pic/PicHeight';
import nextPrevious from '@/components/NextPrevious/NextPrevious';




export default function all({ allAlbums   }:     {allAlbums : albumType[]}) {

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

    let data = allAlbums.flatMap((album) => [
        ...album.images.map((image) => ({ ...image, albumSlug: album.slug, albumName: album.name })),
      ]);
    
      if (allAlbums.length === 0) {
        allAlbums = shuffleArray(data);
      }


    //// animation sortie

const router = useRouter();

const isArchi = router.pathname.startsWith('/archi')

const pathName = isArchi ? 'archi' : 'photo'

    
  return (
    <div className={`rightPartContainer ${styles.mainContainer}`}>
    <List data={allAlbums} /> 
    <div className={styles.galleryContainer} style= { { scrollbarWidth : "none"}}>
      {data.map((content: any, index: number) => (
            <div key={index} className={styles.picContainer} >
              <Link legacyBehavior href={`/${pathName}/${content.albumSlug}/${content.key}`} passHref key={content.key}>
                <PicHeight src={content.image} alt={`photo`} width={content.width} height={content.height}
                 
            />
              </Link>
            </div>
          ))}
     </div>
    </div>
  )
}
export async function getStaticProps({ params }: { params: { album: string } }) {
  
  
    const allData = await getAllAlbums(); 
  
   
   
    return {
      props: {
        allAlbums: allData,
      },
      revalidate: 60,
    };
  }

  