import Head from 'next/head'
import  {getHomepagePhotos, getHomepagePhotoType} from "@/sanity/sanity-utils"
import { homepagePhotosType } from '@/types/Project-type'
import Pic from '@/components/Pic/Pic'
import PicHeight from '@/components/Pic/PicHeight'
import styles from "@/styles/Home.module.css"
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function Home(props: {homePhotos:homepagePhotosType[]}) {

const data = props.homePhotos
const randomIndex = Math.floor(Math.random() * data[0].images.length)

console.log(data[0].images[randomIndex].image)

const [photoType, setPhotoType] = useState()

async function fetchPhotoType() {
  const url = data[0].images[randomIndex].image;
  const result = await getHomepagePhotoType(url); 
 setPhotoType(result[0]._type) 
}


useEffect(() => {
  fetchPhotoType();
  console.log(photoType)
}, [randomIndex, data]);

let link = 
photoType &&
photoType === "album" ? "photo" : photoType

  return (
 
    
      <><Head>
      <title>Test Roman Sanity</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className={`rightPartContainer ${styles.mainContainer}`}>
    <div className={styles.picContainer}>
     {photoType && (
       <Link href={`/${link}`}>
       <PicHeight  src={data[0].images[randomIndex].image} width={data[0].images[randomIndex].width} height={data[0].images[randomIndex].height} alt={data[0].name} /> 
      </Link>
     )}
    </div>
   </div>
    </>
        
  )
}


export async function getStaticProps() {
  const photos = await getHomepagePhotos();

  if (!photos || Object.keys(photos).length === 0) {
    return { notFound: true };
  }

  const photosArray = Object.values(photos);
  console.log('photos', photos);
  

  return {
    props: { homePhotos: photosArray },
    revalidate: 30
  };
}
