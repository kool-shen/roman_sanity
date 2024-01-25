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

  const animationHome = () =>   {
    // gsap.set(infoRef.current, {opacity: 0});

gsap.from(romanRef.current,  {opacity: 0, duration: 2, 
  // onComplete : () => 
  // gsap.fromTo(infoRef.current, {opacity: 0  },  {opacity: 1, duration: 1 })
 
})

  }


  useEffect(() => {
    animationHome();
    
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

const router = useRouter();

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
  }

    
const clickedStyle = mobileScreen ? "-5vmin" : "5vmin"

const archiStyle = archiClicked || router.pathname.startsWith('/archi') ?
  {transition: "transform 0.2s", transform: `translateX(${clickedStyle})`} :
    {transition: "transform 0.2s", color: "grey" }


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
      <h1 
       onClick={()=>{clickArchi()}}
       style={archiStyle}
       ref={archiRef}
       >architecture</h1>
      </Link>
      
     
      <Link href={"/photo"}>
      <h1
      onClick={()=>{clickPhoto()}}
      style={photoStyle}
      ref={photoRef}
      >photographie</h1>
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
