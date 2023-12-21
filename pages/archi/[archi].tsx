import React from 'react'
import { projectArchiType } from '@/types/Project-type';
import  {getAllArchi, getOneProject} from "@/sanity/sanity-utils"
import styles from "@/styles/Project.module.css"
import  {PortableText} from "@portabletext/react"
import { useState } from 'react';
import Pic from '@/components/Pic/Pic';
import Layers from '@/components/Pic/Layers';
import cross from "../../public/cross.png"


export default function archiProject ({archi  } : { archi: projectArchiType [] }){
console.log("data",archi);


//// SLIDER & PHOTO DATA SETTING ////

const [firstSliderIndex, setFirstSliderIndex] = useState(0)
const [secondSliderIndex, setSecondSliderIndex] = useState(0)
const firstSliderLenght = archi[0].images.length
const secondSliderLenght= archi[0].images2 && archi[0].images2.length
const image1 = archi[0].images[firstSliderIndex]
const image2 = archi[0].images2[secondSliderIndex]

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
    ? { transform: "translateY(100%)", transition: "transform 0.5s" }
    : { transition: "transform 0.5s",  };   

 const clickCross = () => {
setCrossClicked(!crossClicked)
console.log(crossClicked, crossStyle)

 }   

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <h2>{archi[0].name}</h2>
        {/* <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div> */}
      </div>
      <div className={styles.slidersContainer}>
        <div className={styles.modal}   style={descriptionStyle}>
          <div className={styles.modalUpperContainer} >
         <div className={styles.logoContainer}  style={crossStyle} > 
        <Pic   
          src={"/cross_white_bold.png"} alt={"cross icon"} 
          width={100} height={100} onClick={clickCross}/> 
       </div>
       <div className={styles.descriptionContainer}>
         <PortableText value={archi[0].content}/>
        </div>
        </div>
        <div className={styles.prioritiesContainer} >
       
       <div className={styles.textContainer} >
       <div className={styles.priorities} >
       <p>Programme</p>
        <p>{archi[0].program}</p>
       </div>
       <div className={styles.priorities}>
        <p>Commanditaire</p>
        <p>{archi[0].sponsor}</p>
       </div>
       <div className={styles.priorities}>
        <p>Localisation</p>
        <p>{archi[0].localisation}</p>
       </div>
       <div className={styles.priorities}>
        <p>Calendrier</p>
        <p>{archi[0].calendar}</p>
       </div>
       <div className={styles.priorities}>
        <p>Surface</p>
        <p>{archi[0].surface}</p>
       </div>
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
        <p>{firstSliderIndex +1} / {firstSliderLenght}</p>
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
        <p>{secondSliderIndex +1} /  {secondSliderLenght}</p>
       </div>
      </div>
      {/* <div className={styles.prioritiesContainer} >
       <div className={styles.logoContainer} style={crossStyle}>
       <Pic   
          src={"/cross_white.png"} alt={"cross icon"} 
          width={100} height={100} onClick={clickCross}/> 
       </div>
       <div className={styles.textContainer} style={descriptionStyle}>
       <div className={styles.priorities} >
       <p>Programme</p>
        <p>{archi[0].program}</p>
       </div>
       <div className={styles.priorities}>
        <p>Commanditaire</p>
        <p>{archi[0].sponsor}</p>
       </div>
       <div className={styles.priorities}>
        <p>Localisation</p>
        <p>{archi[0].localisation}</p>
       </div>
       <div className={styles.priorities}>
        <p>Calendrier</p>
        <p>{archi[0].calendar}</p>
       </div>
       <div className={styles.priorities}>
        <p>Surface</p>
        <p>{archi[0].surface}</p>
       </div>
       </div>
       </div>  */}
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