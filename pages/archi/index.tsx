import styles from "@/styles/ArchiHome.module.css"
import  {getAllArchi} from "@/sanity/sanity-utils"
import { projectArchiType } from '@/types/Project-type';
import List from '@/components/List/List'
import { NextSeo } from 'next-seo';


export default function Archi(props: { projectsArchi?: projectArchiType[] }) {





  return (
    <>
   <NextSeo
      title="architecture"
      
    />
   
   <div className={`rightPartContainer ${styles.mainContainer}`}>
   
    <List data={props.projectsArchi}  style={ {display: "flex"} }/>
    
</div>
</>
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
