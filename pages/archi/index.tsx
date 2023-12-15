import styles from "@/styles/ArchiHome.module.css"
import  {getAllArchi} from "@/sanity/sanity-utils"
import { projectArchiType } from '@/types/Project-type';
import Image from 'next/image';
import Pic from "@/components/Pic/Pic";
import Link from "next/link";

export default function Archi(props: { projectsArchi?: projectArchiType[] }) {

    const data = (props.projectsArchi)
    console.log("static", data)

  return (
   
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
            {data?.map((project, index) => (
             <Link href={`/archi/${project.slug}`}>
              <h2 key={index}>
                  {project.name}
              </h2>   
            </Link>          
            )
            )}
            </div>
             <div className={styles.galleryContainer}>
             {data?.map((project, index) => (
              
<div className={styles.picContainer} key={index}>
          <Link href={`/archi/${project.slug}`}>
           <Pic  src={project.images[0].image} 
           width={project.images[0].width} 
           height={project.images[0].height} 
           alt={project.name} /> 
          </Link> 
          </div>
        )
        )}
              
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
