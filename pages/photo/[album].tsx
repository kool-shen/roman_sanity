
import { getOneAlbum, getAllAlbums, getOnePhoto, getPhoto } from "@/sanity/sanity-utils"
import { albumType,  ImageType} from "@/types/Project-type";
import styles from "@/styles/Album.module.css"
import  {PortableText} from "@portabletext/react"
import Pic from "@/components/Pic/Pic";
import PicHeight from "@/components/Pic/PicHeight"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import List from '@/components/List/List'
import { NextSeo } from "next-seo";

export default function Album({ album, allAlbums }: { album: albumType [], allAlbums: albumType [] }) {

const photoData = album.flatMap((album) => [

  ...album.images.map((image) => ({ ...image, albumName: album.name })),
  ...album.images2.map((image) => ({ ...image, albumName: album.name })),
]);

console.log('albums', allAlbums);

//// ANIMATION DESCRIPTION ////

const [crossClicked, setCrossClicked]= useState(false)

const crossStyle = crossClicked
   ? { transform: "rotate(45deg)", transition: "transform 0.5s" }
   : { transition: "transform 0.5s",  };

 const descriptionStyle = !crossClicked
   ? { transform: "translateY(100vh)", transition: "transform 0.5s" }
   : { transition: "transform 0.5s",  };   

  

const clickCross = () => {
setCrossClicked(!crossClicked)
// console.log(crossClicked, crossStyle)

}   

const contentExists = album[0].content?.length > 0 ? true : false
// console.log(contentExists);


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

/// Mobile ou web ///


const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

const calculateScreen = () => {
  window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
};

useEffect(() => {
 calculateScreen();
}, []);

const lisStyle = mobileScreen
    ? { display: "none"}
    : { display: "flex",  }; 

  return (
    <>
     <NextSeo
    title={album[0].name.toLowerCase()}
    description={`Mosaique de l'album "${album[0].name}"`}

  />

    <div className={`rightPartContainer   ${styles.mainContainer}  `}>

     
    <List data={allAlbums} />  
 
      <div className={`${styles.modalContainer} fadeOut  ${isRouteChanging ? "fadeOutActive" : ''}`}>  
      {contentExists && (<div className={styles.modal}   style={descriptionStyle}>
     <PortableText value={album[0].content}/>
        </div>)}
     <div className={styles.galleryContainer } >
    
     {photoData.map((content, i) => (
      <div className={styles.picContainer} key={content.key}
      >             
        <Link href={`/photo/${album[0].slug}/${content.key}`} >
         <PicHeight src={content.image} alt={`photo ${i} de l'album ${content.albumName}`} width={content.width} height={content.height}/>
        </Link>
       </div>
          ))}
     </div>
       </div>  
    </div>
    </>
  );
}
//// FETCH API SERVER-SIDE ////

export async function getStaticProps({ params }: { params: { album: string } }) {
  const { album } = params;

  const albumData = await getOneAlbum(album); 

  const allData = await getAllAlbums(); 

 
 
  return {
    props: {
      album : albumData,
      allAlbums: allData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const albums = await getAllAlbums();

  const paths = albums?.map((album: albumType) => ({
    params: { album: album.slug }, 
  }));
  console.log("DATA DE BASE",albums)
 console.log("ALBUMPATHS", paths)
  


  return {
    paths,
    fallback: 'blocking', 
  };
} 



