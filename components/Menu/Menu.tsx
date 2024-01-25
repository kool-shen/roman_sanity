import { useEffect, useState, useRef, useLayoutEffect } from "react"
import styles from "./menu.module.css"
import Link from "next/link"
import { useRouter } from "next/router";
import  {gsap} from "gsap";


export default function Menu() {

  /// Animation ///

  const romanRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const archiRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);


  const animationHome = () => {
    gsap.set(infoRef.current, {opacity: 0});
    gsap.set(romanRef.current, {opacity: 0});
  
    gsap.to(romanRef.current, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to(infoRef.current, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
             gsap.to(archiRef.current, {transform: 'translateY(-200%)', duration: 0.8, onComplete: () => {
             gsap.to(photoRef.current, {transform: 'translateY(200%)', duration: 0.8});
             }});
           
          }
        });
      }
    });
  };

  const router = useRouter();

  const [layersDisplay, setLayersDisplay]= useState("block")

  const isHomepage = router.pathname === '/'

  useEffect(() => {
    if (isHomepage) {
      animationHome();
      setLayersDisplay("block");
    } 
else    {      setLayersDisplay("none");
}
    
  }, []);

  

   /// Mobile ///

   const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

   const calculateScreen = () => {
     window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
   };

   useEffect(() => {
    calculateScreen();
    
  }, []);


  //////



const [archiClicked, setArchiClicked] = useState(false)
const [photoClicked, setPhotoClicked] = useState(false)

const clickArchi =()=>{
  setArchiClicked(true),
  setPhotoClicked(false)
  // console.log(photoClicked, archiClicked)
  }
  
  // 

  const clickPhoto =()=>{
    setArchiClicked(false),
    setPhotoClicked(true)
  }

  const clickHome =()=>{
    setArchiClicked(false),
    setPhotoClicked(false)
  setLayersDisplay("none")
  }

    
const clickedStyle = mobileScreen ? "-5vmin" : "5vmin"



const archiStyle: React.CSSProperties = archiClicked || router.pathname.startsWith('/archi') ?
  { transition: "transform 0.2s", transform: `translateX(${clickedStyle})`, position: "relative" } :
  { transition: "transform 0.2s", color: "grey", position: "relative" };


    const photoStyle = photoClicked || router.pathname.startsWith('/photo') ?
    {transition: "transform 0.2s", transform: `translateX(${clickedStyle})`} :
      {transition: "transform 0.2s", color: "grey"}



  return (
    <div className={styles.mainContainer}>
     <div className={styles.titleContainer}>
       <Link href={"/"}>
       <h1 
       onClick={()=>{clickHome()}}
       ref={romanRef}
       >roman cadre</h1>
       </Link>
      
      
      <div className={styles.photoArchiContainer}>

      <Link href={"/archi"}>
        <div className={styles.textContainer} style={archiStyle}>
        <h1 
       onClick={()=>{clickArchi()}}
      style={{color: archiClicked || router.pathname.startsWith('/archi')? "black":"grey"}}
       
       >architecture</h1>
        <div className={styles.layer1} ref={archiRef} style={{display:  layersDisplay}}></div> 
        </div>
      
       
      </Link>
      
     
      <Link href={"/photo"}>
      <div className={styles.textContainer} style={photoStyle}>
      <h1
      onClick={()=>{clickPhoto()}}
      style={{color : photoClicked || router.pathname.startsWith('/photo')? "black" : "grey" }}
      ref={photoRef}
      >photographie</h1>
        <div className={styles.layer2} ref={photoRef} style={{display:  layersDisplay}  }></div> 

      </div>
      </Link>
      </div>
    
     

      <Link href={"/infos"}>
      <h1  
      onClick={() => { clickHome() }}
      ref={infoRef}
      >infos</h1>
    
  </Link>
 
     </div>
     
    </div>
  )
}
