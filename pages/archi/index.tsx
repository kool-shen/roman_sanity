import styles from "@/styles/ArchiHome.module.css"
import  {getAllArchi} from "@/sanity/sanity-utils"
import { projectArchiType } from '@/types/Project-type';
import { useState, useRef, useEffect } from "react";
import PicHeight from "@/components/Pic/PicHeight"
import Link from "next/link";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Archi(props: { projectsArchi?: projectArchiType[] }) {

const data = (props.projectsArchi)


/// Mobile ///

const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

const calculateScreen = () => {
  window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
};

useEffect(() => {
 calculateScreen();
 
}, []);

const hideIfMobile =  {display: mobileScreen ? "none" : ""} 
const showIfMobile =  {display: mobileScreen ? "" : "none"} 

/// animation hover

const [hoveredData, setHoveredData] = useState<string | null>(null)

const hover = (e : string | null ) => {
  setTimeout(() => {
    setHoveredData(e);
  }, 500); 
}

//// animation liste projets

const projectsRef = useRef<HTMLDivElement>(null);

const menuTimeline = gsap.timeline({
  defaults: { duration: 0.1, ease: "power2" },
});

const projectsAnimation = () => {
  projectsRef
    && Array.from(projectsRef.current?.children as HTMLCollection).forEach((child) =>
    menuTimeline.to(child, { opacity: 1 })
  );};

useEffect(() => {
  projectsAnimation()
}, []);

console.log(projectsRef.current?.children)

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
   
   <div className={`rightPartContainer ${styles.mainContainer}`}>
    <div className={styles.titleContainer} ref={projectsRef} >
        {data?.map((project, index) => (
          <div className={styles.textContainer}>
          <Link href={`/archi/${project.slug}`}>
          <h3 key={index} 
          className={hoveredData !== project.name && hoveredData !== null ?   styles.hiddenText : ""}
          onMouseEnter={()=>{hover(project.name)}}
          onMouseLeave={()=>{hover(null)}}>
            {project.name}
          </h3>
          </Link>   
          </div>   
                
        ))}
    </div>
    <div className={`fadeOut ${styles.galleryContainer}  ${isRouteChanging ? "fadeOutActive" : ''}`}>
      {data?.map((project, index) => ( 
        <div className={styles.projectContainer}>  
       <div 
       className={styles.picContainer} 
       key={index}>
        <Link href={`/archi/${project.slug}`}>
          <PicHeight
          src={project.images[0].image} 
          width={project.images[0].width} 
          height={project.images[0].height} 
          alt={project.name}
          onMouseEnter={()=>{hover(project.name)}}
          onMouseLeave={()=>{hover(null)}}
          /> 
        </Link> 
       
      </div>
      <h3>{project.name}</h3>
      </div>  
      ))}        
  </div>
</div>
  )
}

export async function getStaticProps() {
    const archiData = await getAllArchi();
  
    if (!archiData || Object.keys(archiData).length === 0) {
      return { notFound: true };
    }
  
    const archiArray = Object.values(archiData);
    
  
    return {
      props: { projectsArchi: archiArray },
      revalidate: 30
    };
  }
