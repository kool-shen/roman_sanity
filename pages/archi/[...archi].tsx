import Pic from '@/components/Pic/Pic';
import { getAllArchi, getOneProject, getPhotoProject } from '@/sanity/sanity-utils';
import { albumType } from '@/types/Project-type';
import styles from '@/styles/ProjectPhoto.module.css'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Photo from '@/components/Pic/Photo';
import List from '@/components/List/List';
import { NextSeo } from "next-seo";



export default function ArchiSinglePhoto({ photo, album, albums }: { 
  album: albumType[], 
  albums: albumType[], 
  photo: albumType[] 
}) {

/// DATA DE LA PHOTO ///

const photoData  = photo[0].images[0]

/// LINK PHOTO SUIVANTE OU PRÉCÉDENTE ///

const mergedImages = album[0].images;

const photoClicked = photo;

const clickedPhotoKey = photoClicked[0].images[0].key;

/// Trouver l'index de la photo cliquée sur mobile ///
function findMobileIndexByKeyValue(keyToFind: string) {
  for (let i = 0; i < mergedImages.length; i++) {
    if (mergedImages[i].key === keyToFind) {
      return i;
    }
  }
  return -1;
}

const mobileIndexPhotoClicked = findMobileIndexByKeyValue(clickedPhotoKey);

// Si l'index de la photo cliquée est le dernier de la série, passer à la première photo
const nextIndex =
  mobileIndexPhotoClicked === mergedImages.length - 1
    ? 0 // retourne à la première photo si c'est la dernière
    : mobileIndexPhotoClicked + 1;

const nextUrl = `${album[0].slug}/${mergedImages[nextIndex].key}`;

const previousIndex = mobileIndexPhotoClicked === 0
  ? mergedImages.length - 1 // retourne à la dernière photo si c'est la première
  : mobileIndexPhotoClicked - 1;

const previousUrl = `${album[0].slug}/${mergedImages[previousIndex].key}`;


  return (
    <>
        <NextSeo
        title={album[0].name.toLowerCase()}
        description={`photos de l'album ${album[0].name}`}
        
      />
    <div className={`rightPartContainer ${styles.mainContainer}`}>
    

    <List data={albums} />  
    <div className={styles.slidersContainer}>
    <div className={styles.photoBlockContainer} >
      <Link href={`/archi/${album[0].slug}`}>
    <div className={styles.icon}>
    <Pic src= {"/thumbnail_4_squares.png"} alt="vue gallerie" width={100} height={100}/>
</div> 

</Link>
      <div className={styles.picContainer}  
     
>
    <Photo
       src={photoData.image}
       alt={`photo`}
       width={photoData.width}
       height={photoData.height}
       style = { {objectPosition : "bottom"}}
       linkNext={nextUrl}
       linkPrevious={previousUrl}
      /> 



      </div>
      
      
    </div>
      <div className={styles.infoContainer}>
        <p> {photoData.description}</p>
 <p>{`${mobileIndexPhotoClicked + 1}/${mergedImages.length}`}</p> 
      </div>   
 
</div>
</div>
</>
  );
}

export async function getStaticProps({ params }: { params: { archi: string[] } }) {
  const [albumName, imageKey] = params.archi;
  
  const photoData = await getPhotoProject(albumName, imageKey);
  const albumData = await getOneProject(albumName);
  const allAlbums = await getAllArchi();
  
  return {
    props: {
      photo: photoData,
      album: albumData,
      albums: allAlbums,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const albums = await getAllArchi();
  
  interface ArchiKey {
    params: {
      archi: string[];
    };
  }
  
  let uniqueKeys: ArchiKey[] = [];
  
  albums?.forEach((album) => {
    album.images.forEach((image) => {
      if (image.key) { // Vérifie que image.key existe
        const matchingAlbum = albums.find((a) =>
          a.images.some((i) => i.key === image.key)
        );
        
        if (matchingAlbum && matchingAlbum.slug) {
          const albumName = matchingAlbum.slug;
          
          const existingKey = uniqueKeys.find(
            (key) => key.params.archi[0] === albumName && key.params.archi[1] === image.key
          );
          
          if (!existingKey) {
            uniqueKeys.push({
              params: { archi: [albumName, image.key] },
            });
          }
        }
      }
    });
  });
  
  const paths = uniqueKeys;
  
  return {
    paths,
    fallback: "blocking",
  };
}