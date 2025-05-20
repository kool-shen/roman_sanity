import { getOneAlbum, getAllAlbums, getPhoto,  } from "@/sanity/sanity-utils"
import { albumType, ImageDataType } from "@/types/Project-type";
import styles from "@/styles/Photo.module.css"
import Pic from "@/components/Pic/Pic";
import { useEffect, useState, useRef } from "react";
import Photo from "@/components/Pic/Photo";
import Link from "next/link";
import { NextSeo } from "next-seo";
import List from '@/components/List/List';
import  {gsap} from "gsap";




export default function singlePhoto({ photo, album, albums   }: { album: albumType [], albums: albumType [], photo : albumType [], photo2 : albumType [] }) {

/// Mobile ou web ///

// 
  const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };
  
  useEffect(() => {
   calculateScreen();
  }, []);

const mergedImages = album[0].images

  const photoClicked = photo

  const clickedPhotoKey  = photoClicked[0].images[0].key
  

/// Trouver l'index de la photo cliquée sur mobile ///

function findMobileIndexByKeyValue(keyToFind:string) {
  for (let i = 0; i < mergedImages.length; i++) {
      if (mergedImages[i].key === keyToFind) {
          return i; 
      }
  }
  return -1; 
}

const mobileIndexPhotoClicked =  findMobileIndexByKeyValue(clickedPhotoKey)


/// Fonction click next + previous 

const [indexMobile, setIndexMobile] = useState(mobileIndexPhotoClicked)

const [isPicLoaded, setIsPicLoaded] = useState(false);



/// NEXT ET PREVIOUS PHOTO



const handleClickNextMobile = () => {
  if (indexMobile + 1 >= mergedImages.length) {
    setIndexMobile(0);
  } else {
    setIndexMobile(indexMobile + 1);
   
  }
};

const handleClickPreviousMobile = () => {
  if (indexMobile - 1 < 0) {
    setIndexMobile(mergedImages.length - 1);
  } else {
    setIndexMobile(indexMobile - 1);
   
  }
};

const picRef = useRef<HTMLDivElement>(null);

const time = mobileScreen ? 0.4 : 0.2



const nextMobile = () => {
  gsap.to(picRef.current, {
    opacity: 0,
    duration: time, 
    onComplete: () => {
      handleClickNextMobile();
      
isPicLoaded &&
// console.log("next")
      gsap.to(picRef.current, {
        opacity: 1,
        duration: time, 
        ease: 'power2.inOut',
      });
    },
  });
};

const previoustMobile = () => {
   gsap.to(picRef.current, {
    opacity: 0,
    duration: time, 
    onComplete: () => {
      handleClickPreviousMobile()
      gsap.set(picRef.current, { opacity: 0 });
      gsap.to(picRef.current, {
        opacity: 1,
        duration: time, 
        ease: 'power2.inOut',
      });
    },
  });
};

/// SWIPE MOBILE ///

const handleTouchStart = () =>  {console.log("start")}
const handleTouchEnd = () =>  {console.log("end")}


return (
  <>
      <NextSeo
    title={album[0].name.toLowerCase()}
    description={`photos de l'album ${album[0].name}`}
    
  />
    <div className={`rightPartContainer ${styles.mainContainer}`}>
 
    <List data={albums} />  
  
     
      <div className={styles.slidersContainer}>
            <div className={styles.photoBlockContainer} >
            {/* <Link href= {`/photo/${album[0].slug}`}>
            <div className={styles.icon}>
            <Pic src= {"/thumbnail_4_squares.png"} alt="vue gallerie" width={100} height={100}/>
 </div> 


            </Link> */}
              <div className={styles.picContainer} ref={picRef} 
              //   onTouchStart={handleTouchStart}       
              // onTouchEnd={handleTouchEnd}
>
            <Photo
               src={album[0].images[mobileIndexPhotoClicked].image}
               alt={`photo`}
               width={album[0].images[mobileIndexPhotoClicked].width}
               height={album[0].images[mobileIndexPhotoClicked].height}
              //  onLoadedChange={handleLoadedChange}
               style = { {objectPosition : "top"}}
               linkNext={
                    // Si on est à la dernière photo, revenir à la première
                    mobileIndexPhotoClicked === album[0].images.length - 1
                  
                      ? `${album[0].slug}/${album[0].images[0].key}`
                      : `${album[0].slug}/${album[0].images[mobileIndexPhotoClicked + 1].key}`
                  }   
                linkPrevious={
                    mobileIndexPhotoClicked === 0
                      ? `${album[0].slug}/${album[0].images[album[0].images.length - 1].key}`
                      : `${album[0].slug}/${album[0].images[mobileIndexPhotoClicked - 1].key}`
                  }
             
              /> 
              </div>
              
              
            </div>
             <div className={styles.infoContainer}>
                <p> {mergedImages[mobileIndexPhotoClicked].description}</p>
                <p>{`${mobileIndexPhotoClicked + 1}/${mergedImages.length}`}</p>
              </div> 
         
      </div>
    </div>
  </>
);

  }



  export async function getStaticProps({ params } : { params: { album: string } } ) {
    const [albumName, imageKey] = params.album;
    
  
    const photoData = await getPhoto(albumName, imageKey);
    

    const albumData = await getOneAlbum(albumName);

    const allAlbums = await getAllAlbums()
  
  
    return {
      props: {
        photo: photoData,
        album: albumData,
        albums: allAlbums,
      },
      revalidate: 60,
    };
  }
  
  export async function getStaticPaths() {
    const albums = await getAllAlbums();



    interface AlbumKey {
      params: {
        album: string[];
      };
    }
    let uniqueKeys: AlbumKey[] = [];
  
    albums?.forEach((album) => {
      album.images.forEach((image) => {

        const matchingAlbum = albums.find((a) =>
          a.images.some((i) => i.key === image.key)
        );
  
        if (matchingAlbum) {
          const albumName = matchingAlbum.slug;

          const existingKey = uniqueKeys.find(
            (key) => key.params.album.includes(`${albumName}/${image.key}`)
          );
  
          if (!existingKey) {
            uniqueKeys.push({
              params: { album: [`${albumName}`, `${image.key}`] },
            });
          }
        }
      });
  
    });
  
    const paths = uniqueKeys;


  // console.log("Generated paths:", paths);
  
    return {
      paths,
      fallback: "blocking",
    };
  }