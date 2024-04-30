import Head from 'next/head'
import  {getAllAlbums, getOneAlbum} from "@/sanity/sanity-utils"
import { albumType } from '@/types/Project-type';
import styles from "@/styles/PhotoHome.module.css"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import List from '@/components/List/List'
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
console.log('props', props);

  if (!props.albums) {
    return <></>;
  }

  /// Mélange des images  ///

  let data = initialData.length > 0 ? initialData : props.albums.flatMap((album) => [
    ...album.images.map((image) => ({ ...image, albumSlug: album.slug, albumName: album.name })),
  ]);

  if (initialData.length === 0) {
    initialData = shuffleArray(data);
  }


  
    return (
        <>
           <NextSeo
    title={"photographie"}
    description={`section photographie`}
    
  />
          <div className={`rightPartContainer ${styles.mainContainer}`}>
        <List data={props.albums}  style={{display: "flex"}}/>
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

  


  