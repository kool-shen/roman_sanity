import React, { useEffect } from 'react'
import { projectArchiType } from '@/types/Project-type';
import  {getAllArchi, getOneProject} from "@/sanity/sanity-utils"
import styles from "@/styles/Project.module.css"
import  {PortableText} from "@portabletext/react"
import { useState } from 'react';
import Pic from '@/components/Pic/Pic';
import PicProject from '@/components/Pic/PicProject';
import Layers from '@/components/Pic/Layers';
import { useRouter } from 'next/router';
import Priorities from '@/components/TextContent/Priorities';
import { NextSeo } from 'next-seo';
import List from '@/components/List/List'


export default function archiProject ({archi, allArchi  } : { archi: projectArchiType [], allArchi: projectArchiType [] }){

  const mergedImages = archi[0]?.images.concat(archi[0]?.images2)

  // console.log(mergedImages)


   /// Mobile ///

   const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

   const calculateScreen = () => {
     window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
   };

   useEffect(() => {
    calculateScreen();
    
  }, []);

 

//// SLIDER & PHOTO DATA SETTING ////

const [firstSliderIndex, setFirstSliderIndex] = useState(0)
const [secondSliderIndex, setSecondSliderIndex] = useState(0)
const [mobileIndex, setMobileIndex] = useState(0)

const firstSliderLenght = archi[0]?.images?.length || 0;
const secondSliderLenght = archi[0]?.images2?.length || 0;
const mobileSliderLenght = mergedImages.length || 0;

const image1 = archi[0]?.images?.[firstSliderIndex] || { image: '', width: 0, height: 0 };
const image2 = archi[0]?.images2?.[secondSliderIndex] || { image: '', width: 0, height: 0 };

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

 const crossStyle = crossClicked
    ? { transform: "rotate(45deg)", transition: "transform 0.5s" }
    : { transition: "transform 0.5s",  };

  const descriptionStyle = !crossClicked
    ? { transform: "translateY(100vh)", transition: "transform 0.5s" }
    : { transition: "transform 0.5s",  };   

 const clickCross = () => {
setCrossClicked(!crossClicked)

 }   

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

  return (
    
    <>
      <NextSeo
    title={archi[0].name.toLowerCase()}
    description={`photos et détails du projet situé à ${archi[0].name}`}
    
  />
    <div className={`rightPartContainer  ${styles.mainContainer}`}>
    <List data={allArchi}/>
      

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
              <div className={styles.picContainer}>
                <Layers 
                  onClickRight={()=> {handleClickNext(mobileIndex, mobileSliderLenght, setMobileIndex)}}
                  onClickLeft={()=> {handleClickPrevious(mobileIndex, mobileSliderLenght, setMobileIndex)}}
                
                />
               <PicProject   
                src={mergedImages[mobileIndex].image} alt={mergedImages[mobileIndex].image} 
                width={mergedImages[mobileIndex].width} height={mergedImages[mobileIndex].height}/>
                
             
              </div>
              <div className={styles.photoInfoContainer}>
                 <p>{mergedImages[mobileIndex].caption}</p>
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
        (
          <div className={styles.photoBlockContainer}>
         
          <div className={styles.picContainer}>
            <Layers 
              onClickRight={()=> {handleClickNext(mobileIndex, mobileSliderLenght, setMobileIndex)}}
              onClickLeft={()=> {handleClickPrevious(mobileIndex, mobileSliderLenght, setMobileIndex)}}
            
            />
           <Pic   
            src={mergedImages[mobileIndex].image} alt={mergedImages[mobileIndex].image} 
            width={mergedImages[mobileIndex].width} height={mergedImages[mobileIndex].height}/>
          </div>
          <div className={styles.mobileBottom}>
          
        <p>{mobileIndex +1} / {mobileSliderLenght}</p> 
      
        
       </div>
         
          
           </div>  
        )}
       
      </div>
    
    </div>
    </>
  )
}


export async function getStaticProps({ params }: { params: { archi: string } }) {
    const { archi } = params;
    // console.log('SlugArchi', archi);
  
    const projectData = await getOneProject(archi); 
    const allArchi =  await getAllArchi();
    // console.log('Data du projet', projectData );
  
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