import { useEffect, useState } from "react"
import styles from "./menu.module.css"
import Link from "next/link"
import { useRouter } from "next/router";

export default function Menu() {

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
  console.log(photoClicked, archiClicked)
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
       >roman cadre</h1>
       </Link>
      
      
      <div className={styles.photoArchiContainer}>

      <Link href={"/archi"}>
      <h1 
       onClick={()=>{clickArchi()}}
       style={archiStyle}
       >architecture</h1>
      </Link>
      
     
      <Link href={"/photo"}>
      <h1
      onClick={()=>{clickPhoto()}}
      style={photoStyle}
      >photographie</h1>
      </Link>
      </div>
    
     

      <Link href={"/infos"}>
      <h1  onClick={() => { clickHome() }}>infos</h1>
    
  </Link>
 
     </div>
     
    </div>
  )
}
