
import { getOneAlbum, getAllAlbums, getOnePhoto, getPhoto } from "@/sanity/sanity-utils"
import { albumType,  ImageType} from "@/types/Project-type";
import styles from "@/styles/Album.module.css"
import  {PortableText} from "@portabletext/react"
import Pic from "@/components/Pic/Pic";
import PicHeight from "@/components/Pic/PicHeight"
import Link from "next/link";

export default function Album({ album }: { album: albumType [] }) {

const photoData = album.flatMap((album) => [
  ...album.images.map((image) => ({ ...image, albumName: album.name })),
  ...album.images2.map((image) => ({ ...image, albumName: album.name })),
]);


console.log('album', album);
  
  return (
    <div className={`rightPartContainer ${styles.mainContainer}`}>
      <div className={styles.infoContainer}>
     <h1>{album[0].name}</h1>
     <PortableText value={album[0].content}/>
     </div>
     <div className={styles.galleryContainer}>
     {photoData.map((content, i) => (
            <div className={styles.picContainer}>
              <Link href={`/photo/${album[0].slug}/${content.key}`}>
              <PicHeight src={content.image} alt={content.albumName} width={content.width} height={content.height}/>
              </Link>
            </div>
          ))}
     </div>
    </div>
  );
}
//// FETCH API SERVER-SIDE ////

export async function getStaticProps({ params }: { params: { album: string } }) {
  const { album } = params;
  console.log('SlugAlbum', album);

  const albumData = await getOneAlbum(album); 
  console.log('Data de l album', albumData[0].images[0] );

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
    fallback: false, 
  };
} 



