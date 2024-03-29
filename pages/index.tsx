import Head from 'next/head'
import  {getHomepagePhotos} from "@/sanity/sanity-utils"
import { homepagePhotosType } from '@/types/Project-type'
import Pic from '@/components/Pic/Pic'
import styles from "@/styles/Home.module.css"
import {  useState } from 'react'
import Layers from '@/components/Pic/Layers'


export default function Home(props: {homePhotos:homepagePhotosType[]}) {

const data = props.homePhotos
const randomIndex = Math.floor(Math.random() * data[0].images.length)

const albumLength = data[0].images.length

const [activeIndex, setActiveIndex] = useState(randomIndex)

const handleClickNext = () => {
  if (activeIndex + 1 >= albumLength) {
    setActiveIndex(0);
  } else {
    setActiveIndex(activeIndex + 1);
  }
};

const handleClickPrevious = () => {
  if (activeIndex - 1 < 0) {
    setActiveIndex(albumLength - 1);
  } else {
    setActiveIndex(activeIndex - 1);
  }
};


const altText = `photo homepage`;


  return (
      <>

   
    <div className={`rightPartContainer ${styles.mainContainer}`}>
     <div className={styles.picContainer}>
     <Layers 
          onClickRight={()=> {handleClickNext()}}
          onClickLeft={()=> {handleClickPrevious()}}
          index= {activeIndex + 1}
          total=  {data[0].images.length}
        />
      <Pic
      src={data[0].images[activeIndex].image} 
      width={data[0].images[activeIndex].width} 
      height={data[0].images[activeIndex].height} 
      alt={altText} /> 
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
  // console.log('photos', photos);
  

  return {
    props: { homePhotos: photosArray },
    revalidate: 30
  };
}
