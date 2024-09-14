import React, { useRef, useEffect, useState, SetStateAction } from 'react'
import styles from './list.module.css'
import { albumType, projectArchiType } from '@/types/Project-type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import  {gsap} from "gsap"
import { set, useSchema } from 'sanity';


interface ListProps {
  data: projectArchiType[] | undefined | albumType[];
  style?: React.CSSProperties;
 }

 const List: React.FC<ListProps> = ({ data, style }) => {

  const router = useRouter();

  const categoryPage = router.pathname === '/photo' || router.pathname === '/archi'

  console.log(router.pathname)

 const isArchi = router.pathname.startsWith('/archi')

 const pathName = isArchi ? 'archi' : 'photo'

  /// animation 

const albumsRef = useRef<HTMLDivElement>(null);

const menuTimeline = gsap.timeline({
  defaults: { duration: 0.08, ease: "power2" },
});

const albumsAnimation = () => {
  albumsRef
    && Array.from(albumsRef.current?.children as HTMLCollection).forEach((child) =>
    menuTimeline.to(child, { opacity: 1 })
  );};

useEffect(() => {
  if (categoryPage) {
    albumsAnimation();
  }
}, [categoryPage]);

const  [type, setType] = useState()


const clickType = (i:any) =>   {
  setType(i)
  
}

const resetType = () =>   {
  setType(undefined)
  console.log("reset")
}

  return (
    <div className={styles.titleContainer} ref={albumsRef} style={style}  >
       {!isArchi && (<>
        <div className={styles.textContainer}
      
        >
       <h3 onClick={() => {
       clickType("commissioned");}}
       style={{ color: type === "personal" ? "grey" : undefined }}
className={styles.text}
      >
        Commande</h3>   
     </div>
     <div className={styles.textContainer}>
       <h3 onClick={() => {
       clickType("personal");
     }}
     style={{ color: type === "commissioned" ? "grey" : undefined }}
     >
      Personnel</h3>   
     </div>
     <div className={styles.barContainer}>
      <div className={styles.bar}></div>
    </div>
  {/* <div className={styles.textContainer}
  >
    
  <Link href={"/photo/all"}
  >
    <h3 style={router.pathname === '/photo/all' ? 
           { fontFamily: "var(--texItalic)" } : {}}>TOUS</h3>
           </Link>
  </div> */}
  </> )} 


    
      
      {(data as albumType[]).map((content: albumType) => (
        <div className={styles.textContainer} key={content._id} style={categoryPage ? {opacity : 0} :{opacity : 1} }
        onClick={() => {
          resetType();
        }}>
          <Link legacyBehavior href={`/${pathName}/${content.slug}`} passHref>
            <a style={{ display: 'flex' }}>
            <h3 className={styles.hiddenText}
    style={{
        fontFamily: new RegExp(`^/${pathName}/${content.slug}(\/.*)?$`).test(router.asPath) ? "var(--texItalic)" : undefined,
        color: content.family === type || type === undefined ? "black" : "grey"
    }}
>
    {content.name}
</h3>
              
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;




