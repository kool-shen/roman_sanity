import React, { useRef, useEffect } from 'react'
import styles from './list.module.css'
import { albumType, projectArchiType } from '@/types/Project-type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import  {gsap} from "gsap"


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


  return (
    <div className={styles.titleContainer} ref={albumsRef} style={style}>
      {!isArchi && (
  <div className={styles.textContainer}>
  <Link href={"/photo/all"}>
    <h3 style={router.pathname === '/photo/all' ? 
           { fontFamily: "var(--texItalic)" } : {}}>TOUS</h3>
           </Link>
  </div>
      )}
    
      
      {(data as albumType[]).map((content: albumType) => (
        <div className={styles.textContainer} key={content._id} style={categoryPage ? {opacity : 0} :{opacity : 1} }>
          <Link legacyBehavior href={`/${pathName}/${content.slug}`} passHref>
            <a style={{ display: 'flex' }}>
              <h3 className={styles.hiddenText}
               style={new RegExp(`^/${pathName}/${content.slug}(\/.*)?$`).test(router.asPath)  ? 
               { fontFamily: "var(--texItalic)" } : {}} 
              >{content.name}</h3>
              
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;




