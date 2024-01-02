import styles from "@/styles/ArchiHome.module.css"
import  {getAllArchi} from "@/sanity/sanity-utils"
import { projectArchiType } from '@/types/Project-type';
import Image from 'next/image';
import { SetStateAction, useState } from "react";
import Pic from "@/components/Pic/Pic";
import PicHeight from "@/components/Pic/PicHeight"
import Link from "next/link";

export default function Archi(props: { projectsArchi?: projectArchiType[] }) {

const data = (props.projectsArchi)

const [hoveredData, setHoveredData] = useState<string | null>(null)

const hover = (e : string | null ) => {
  setTimeout(() => {
    setHoveredData(e);
  }, 500); 
}




  return (
   
   <div className={`rightPartContainer ${styles.mainContainer}`}>
    <div className={styles.titleContainer}>
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
    <div className={styles.galleryContainer}>
      {data?.map((project, index) => (     
       <div 
       className={`${styles.picContainer} ${hoveredData !== project.name && hoveredData !== null  && styles.hiddenPhoto}`} 
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
