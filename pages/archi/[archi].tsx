import React, { useEffect } from 'react'
import { projectArchiType } from '@/types/Project-type';
import  {getAllArchi, getOneProject} from "@/sanity/sanity-utils"
import styles from "@/styles/Project.module.css"
import  {PortableText} from "@portabletext/react"
import { useState } from 'react';
import Pic from '@/components/Pic/Pic';
import Layers from '@/components/Pic/Layers';
import { useRouter } from 'next/router';
import Priorities from '@/components/TextContent/Priorities';
import Index from '@/components/Pic/Index';


export default function archiProject ({archi  } : { archi: projectArchiType [] }){


   /// Mobile ///

   const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

   const calculateScreen = () => {
     window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
   };

   useEffect(() => {
    calculateScreen();
    
  }, []);

  const hideIfMobile =  {display: mobileScreen ? "none" : ""} 

//// SLIDER & PHOTO DATA SETTING ////

const [firstSliderIndex, setFirstSliderIndex] = useState(0)
const [secondSliderIndex, setSecondSliderIndex] = useState(0)
const firstSliderLenght = archi[0]?.images?.length || 0;
const secondSliderLenght = archi[0]?.images2?.length || 0;

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
     console.log(photoIndex)
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
    <div className={`rightPartContainer fadeOut  ${styles.mainContainer}   ${isRouteChanging ? "fadeOutActive" : ''}`}>
      <div className={styles.infoContainer} >
        <h2>{archi[0].name}</h2>
        <div className={styles.logoContainer}  style={crossStyle} > 
         <Pic   
            src={"/cross_black.png"} alt={"cross icon"} 
            width={100} height={100} onClick={clickCross}/> 
       </div>
      </div>
      <div className={styles.slidersContainer}>
        <div className={styles.modal}   style={descriptionStyle}>
          <div className={styles.modalUpperContainer} >
       <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div>
        </div>
        <div className={styles.prioritiesContainer} >
       
       <div className={styles.textContainer} >
         <Priorities 
         name={"Programme"}
         value={archi[0].program}/>
         <Priorities 
         name={"Commanditaire"}
         value={archi[0].sponsor}/>
         <Priorities 
         name={"Localisation"}
         value={archi[0].localisation}/>
         <Priorities 
         name={"Calendrier"}
         value={archi[0].calendar}/>
         <Priorities 
         name={"Surface"}
         value={archi[0].surface}/>
       </div>
       </div> 
        </div>
       <div className={styles.photoBlockContainer}>
        <div className={styles.picContainer}>
          <Layers 
            onClickRight={()=> {handleClickNext(firstSliderIndex, firstSliderLenght, setFirstSliderIndex)}}
            onClickLeft={()=> {handleClickPrevious(firstSliderIndex, firstSliderLenght, setFirstSliderIndex)}}
          />
          <Pic   
          src={image1.image} alt={image1.image} 
          width={image1.width} height={image1.height}/>  
        </div>
        <Index index={firstSliderIndex +1} length={firstSliderLenght}/>
       </div>
       <div className={styles.photoBlockContainer}>
         
        <div className={styles.picContainer}>
          <Layers 
            onClickRight={()=> {handleClickNext(secondSliderIndex, secondSliderLenght, setSecondSliderIndex)}}
            onClickLeft={()=> {handleClickPrevious(secondSliderIndex, secondSliderLenght, setSecondSliderIndex)}}
          />
         <Pic   
          src={image2.image} alt={image2.image} 
          width={image2.width} height={image2.height}/>
        </div>
        <Index index={secondSliderIndex +1} length={secondSliderLenght}/> </div>
      </div>
    
    </div>
  )
}


export async function getStaticProps({ params }: { params: { archi: string } }) {
    const { archi } = params;
    console.log('SlugArchi', archi);
  
    const projectData = await getOneProject(archi); 
    console.log('Data du projet', projectData );
  
    return {
      
      props: {
        archi : projectData,
      },
      revalidate: 60,
    };
  }

export async function getStaticPaths() {
    const projects = await getAllArchi();
  
    const paths = projects?.map((album: projectArchiType) => ({
      params: { archi: album.slug }, 
    }));
    console.log("DATA DE BASE",projects)
    console.log("PROJECTPATHS", paths)
    
  
  
    return {
      paths,
      fallback: false, 
    };
  } 