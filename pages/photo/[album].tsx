
import { getOneAlbum, getAllAlbums } from "@/sanity/sanity-utils"
import { albumType} from "@/types/Project-type";
import styles from "@/styles/Album.module.css"
import PicHeight from "@/components/Pic/PicHeight"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import List from '@/components/List/List'
import { NextSeo } from "next-seo";
import NextPrevious from '@/components/NextPrevious/NextPrevious';

export default function Album({ album, allAlbums }: { album: albumType [], allAlbums: albumType [] }) {

const photoData = album.flatMap((album) => [

  ...album.images.map((image) => ({ ...image, albumName: album.name })),
  ...album.images2.map((image) => ({ ...image, albumName: album.name })),
]);


/// 

function findAlbumIndex(albums : albumType[], name: string) {
  return albums.findIndex(album => album.name === name);
}

const albumName = album[0].name
const index = findAlbumIndex(allAlbums, albumName);


const nextIndex = (index + 1 >= allAlbums.length) ? 0 : index + 1

const previousIndex = (index - 1 < 0) ? allAlbums.length - 1 : index - 1 


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



  return (
    <>
     <NextSeo
    title={album[0].name.toLowerCase()}
    description={`Mosaique de l'album "${album[0].name}"`}

  />

    <div className={`rightPartContainer   ${styles.mainContainer}  `}>

    
      <NextPrevious name={album[0].name}  
   
   slugPrevious={`/photo/${allAlbums[previousIndex].slug}`}
   slugNext={`/photo/${allAlbums[nextIndex].slug}`} />
   

   
    <List data={allAlbums} />  
   
     
      <div className={`${styles.modalContainer} fadeOut  ${isRouteChanging ? "fadeOutActive" : ''}`}>  
    

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
//   console.log("DATA DE BASE",albums)
//  console.log("ALBUMPATHS", paths)
  
  return {
    paths,
    fallback: 'blocking', 
  };
} 



