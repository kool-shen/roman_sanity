import React, { useEffect, useRef } from 'react'
import { projectArchiType } from '@/types/Project-type';
import  {getAllArchi, getOneProject} from "@/sanity/sanity-utils"
import styles from "@/styles/Project.module.css"
import  {PortableText} from "@portabletext/react"
import { useState } from 'react';
import PicProject from '@/components/Pic/PicProject';
import Layers from '@/components/Pic/Layers';
import { useRouter } from 'next/router';
import Priorities from '@/components/TextContent/Priorities';
import { NextSeo } from 'next-seo';
import List from '@/components/List/List'
import  {gsap} from "gsap";
import NextPrevious from '@/components/NextPrevious/NextPrevious';



export default function archiProject ({archi, allArchi  } : { archi: projectArchiType [], allArchi: projectArchiType [], 
   }){

  const mergedImages = archi[0]?.images

  console.log(archi)

  /// 

function findAlbumIndex(archi : projectArchiType[], name: string) {
  return allArchi.findIndex(album => album.name === name);
}

const albumName = archi[0].name
const index = findAlbumIndex(allArchi, albumName);
// console.log('index', index);


const nextIndex = (index + 1 >= allArchi.length) ? 0 : index + 1

const previousIndex = (index - 1 < 0) ? allArchi.length - 1 : index - 1 


   /// Mobile ///

   const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

   const calculateScreen = () => {
     window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
   };

   

 

//// SLIDER & PHOTO DATA SETTING ////

const [mobileIndex, setMobileIndex] = useState(0)


// let mobileIndex = 0

const mobileSliderLenght = mergedImages.length || 0;

 const handleClickNext = (photoIndex:number, albumindex:number, setIndex:React.Dispatch<React.SetStateAction<number>>) => {
   if (photoIndex + 1 >= albumindex) {
     setIndex(0);
   } else {
     setIndex(photoIndex + 1);
   }
};

 const handleClickPrevious = (photoIndex:number, albumindex:number, setIndex:React.Dispatch<React.SetStateAction<number>>) => {
   if (photoIndex - 1 < 0) {
     setIndex(albumindex - 1);
    //  console.log(photoIndex)
   } else {
     setIndex(photoIndex - 1);

  }
 };

 //// ANIMATION DESCRIPTION ////

 const [crossClicked, setCrossClicked]= useState(false)


  const descriptionStyle = !crossClicked
    ? { transform: "translateY(100vh)", transition: "transform 0.5s" }
    : { transition: "transform 0.5s",  };   



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

//// SWIPE MOBILE

const picRef = useRef<HTMLDivElement>(null);
// console.log('picRef', picRef.current);

const time = mobileScreen ? 0.4 : 0.2

const transitionNext = () => {


  gsap.to(picRef.current, {
    opacity: 0,
    duration: time,
    onComplete: () => {
     
      handleClickNext(mobileIndex, mobileSliderLenght, setMobileIndex)

      
      gsap.fromTo(
        picRef.current,
        { opacity: 0 }, 
        {
          opacity: 1, 
          duration: time,
          ease: "power2.inOut",
        }
      );
    },
  });
};

const transitionPrevious = () => {

  
  gsap.to(picRef.current, {
    opacity: 0,
    duration: time,
    onComplete: () => {

      handleClickPrevious(mobileIndex, mobileSliderLenght, setMobileIndex)
      gsap.fromTo(
        picRef.current,
        { opacity: 0 }, 
        {
          opacity: 1, 
          duration: time,
          ease: "power2.inOut",
        }
      );
    },
  });
};

const [fingerTouch, setFingerTouch] = useState<number | undefined>()


const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchStartX = e.touches[0].clientX;
  setFingerTouch(touchStartX);
  // console.log("start")
};

const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchEndX = e.changedTouches[0].clientX;

  if (fingerTouch !== undefined) {
    if (touchEndX > fingerTouch) {
      transitionPrevious();
      // console.log("previous")
    } else if (touchEndX < fingerTouch) {
      transitionNext();
      // console.log("next")
    }
  }
};

useEffect(() => {
  calculateScreen()
  setMobileIndex(0)
}, [router.asPath]); 

  return (
    
    <>
      <NextSeo
    title={archi[0].name.toLowerCase()}
    description={`photos et détails du projet situé à ${archi[0].name}`}
    
  />
    <div className={`rightPartContainer  ${styles.mainContainer}`}>
        {!mobileScreen && (
 <List data={allArchi}/>
        )}

      <div className={`${styles.slidersContainer}   ${isRouteChanging ? "fadeOutActive" : ''}`}>
        <div className={styles.modal}   style={descriptionStyle}>
          <div className={styles.modalUpperContainer} >
       <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div>
        </div>
        <div className={styles.prioritiesContainer} >
       
         <Priorities 
         name={"programme"}
         value={archi[0].program}/>
         <Priorities 
         name={"commanditaire"}
         value={archi[0].sponsor}/>
         <Priorities 
         name={"localisation"}
         value={archi[0].localisation}/>
         <Priorities 
         name={"calendrier"}
         value={archi[0].calendar}/>
         <Priorities 
         name={"surface"}
         value={archi[0].surface}/>
       
       </div> 
        </div>
          {!mobileScreen ? (
              <div className={styles.photoBlockContainer}>
              <div className={styles.photoContainer}>
              <div className={styles.picContainer} >
                <Layers 
                  onClickRight={()=> {handleClickNext(mobileIndex, mobileSliderLenght, setMobileIndex)}}
                  onClickLeft={()=> {handleClickPrevious(mobileIndex, mobileSliderLenght, setMobileIndex)}}
                
                />
               {mergedImages[mobileIndex] ? (
  <PicProject
    src={mergedImages[mobileIndex].image}
    alt={mergedImages[mobileIndex].image}
    width={mergedImages[mobileIndex].width}
    height={mergedImages[mobileIndex].height}
  />
) : ""}
               
                
             
              </div>
              <div className={styles.photoInfoContainer}>
              {mergedImages[mobileIndex] && ( 
                <p>{mergedImages[mobileIndex].caption}</p>
              )}
                 
                 <p>{mobileIndex +1} / {mobileSliderLenght}</p>
              </div> 
              </div>
             
              <div className={styles.mobileBottom}>
              
            <p>{mobileIndex +1} / {mobileSliderLenght}</p> 
           </div>
            
          <div className={styles.modalUpperContainer} >
       <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div>
        </div>
        <div className={styles.prioritiesContainer} >
       
         <Priorities 
         name={"programme"}
         value={archi[0].program}/>
         <Priorities 
         name={"commanditaire"}
         value={archi[0].sponsor}/>
         <Priorities 
         name={"localisation"}
         value={archi[0].localisation}/>
         <Priorities 
         name={"calendrier"}
         value={archi[0].calendar}/>
         <Priorities 
         name={"surface"}
         value={archi[0].surface}/>
       
       </div> 
        </div>
   )
        :
        (<>
          <NextPrevious name={archi[0].name}  
   
   slugPrevious={`/archi/${allArchi[previousIndex].slug}`}
   slugNext={`/archi/${allArchi[nextIndex].slug}`} /> 
    {mergedImages[mobileIndex] ? (
      <div className={styles.photoBlockContainer} 
          ref={picRef}
          onTouchStart={handleTouchStart}        
          onTouchEnd={handleTouchEnd} >
          
  <PicProject
            src={mergedImages[mobileIndex].image} 
            alt={mergedImages[mobileIndex].image} 
            width={mergedImages[mobileIndex].width} 
            height={mergedImages[mobileIndex].height}
            style={{height : "95%"}}
          />
          <div className={styles.photoInfoContainer}>
          <p>{mergedImages[mobileIndex].caption}</p>
          <p>{mobileIndex +1} / {mobileSliderLenght}</p>
          </div>
         
          
           </div> 
    )
     :""}
          
           <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div>
           <div className={styles.prioritiesContainer} >
       
         <Priorities 
         name={"programme"}
         value={archi[0].program}/>
         <Priorities 
         name={"commanditaire"}
         value={archi[0].sponsor}/>
         <Priorities 
         name={"localisation"}
         value={archi[0].localisation}/>
         <Priorities 
         name={"calendrier"}
         value={archi[0].calendar}/>
         <Priorities 
         name={"surface"}
         value={archi[0].surface}/>
       
       </div> 
           </> 
        )}
      </div>
    </div>
    </>
  )
}


export async function getStaticProps({ params }: { params: { archi: string } }) {
    const { archi } = params;
  
    const projectData = await getOneProject(archi); 
    const allArchi =  await getAllArchi();
  
    return {
      
      props: {
        archi : projectData,
        allArchi : allArchi,
      },
      revalidate: 60,
    };
  }

export async function getStaticPaths() {
    const projects = await getAllArchi();
  
    const paths = projects?.map((album: projectArchiType) => ({
      params: { archi: album.slug }, 
    }));
    // console.log("DATA DE BASE",projects)
    // console.log("PROJECTPATHS", paths)
    
  
  
    return {
      paths,
      fallback: "blocking", 
    };
  } 