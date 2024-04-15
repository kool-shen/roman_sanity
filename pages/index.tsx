import Head from 'next/head'
import  {getHomepagePhotos, getAllInfo} from "@/sanity/sanity-utils"
import { homepagePhotosType } from '@/types/Project-type'
import Pic from '@/components/Pic/Pic'
import styles from "@/styles/Home.module.css"
import {  useRef, useState } from 'react'
import Layers from '@/components/Pic/Layers'
import { NextSeo } from 'next-seo';
import  {gsap} from "gsap";




export default function Home(props: {homePhotos:homepagePhotosType[], bio: any}) {


const data = props.homePhotos
console.log('data', data);
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

////

//// SWIPE MOBILE

const picRef = useRef<HTMLDivElement>(null);
console.log('picRef', picRef.current);

const nextMobile = () => {
  gsap.to(picRef.current, {
    opacity: 0,
    duration: 0.4, 
    onComplete: () => {
      handleClickNext();
// console.log("next")
      gsap.to(picRef.current, {
        opacity: 1,
        duration: 0.4,  
        ease: 'power2.inOut',
      });
    },
  });
};

const previoustMobile = () => {
   gsap.to(picRef.current, {
    opacity: 0,
    duration: 0.4, 
    onComplete: () => {
      handleClickPrevious()
      gsap.set(picRef.current, { opacity: 0 });
      gsap.to(picRef.current, {
        opacity: 1,
        duration: 0.4, 
                ease: 'power2.inOut',
      });
    },
  });
};

/// SWIPE MOBILE ///

const [fingerTouch, setFingerTouch] = useState<number | undefined>()


const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchStartX = e.touches[0].clientX;
  setFingerTouch(touchStartX);
};

const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchEndX = e.changedTouches[0].clientX;

  if (fingerTouch !== undefined) {
    if (touchEndX > fingerTouch) {
      previoustMobile();
    } else if (touchEndX < fingerTouch) {
      nextMobile();
    }
  }
};

  return (
    
      <>
   <NextSeo
    description={props.bio[0].shortBio}
  />
   
    <div className={`rightPartContainer ${styles.mainContainer}`}>
    <div className={styles.picContainer}
    ref={picRef}
    onTouchStart={handleTouchStart}        
    onTouchEnd={handleTouchEnd}>
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
  const bio = await getAllInfo();

  if (!photos || Object.keys(photos).length === 0) {
    return { notFound: true };
  }

  const photosArray = Object.values(photos);
  // console.log('photos', photos);
  

  return {
    props: { 
      homePhotos: photosArray,
      bio : bio,

     },
    revalidate: 30
  };
}
