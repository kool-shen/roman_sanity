import { getOneAlbum, getAllAlbums, getOnePhoto, getPhoto, getPhoto2 } from "@/sanity/sanity-utils"
import { albumType, ImageDataType } from "@/types/Project-type";
import styles from "@/styles/Photo.module.css"
import Pic from "@/components/Pic/Pic";
import { useEffect, useState, useRef } from "react";
import Layers from "@/components/Pic/Layers";
import Link from "next/link";
import { NextSeo } from "next-seo";
import List from '@/components/List/List';
import  {gsap} from "gsap";




export default function singlePhoto({ photo, photo2, album, albums   }: { album: albumType [], albums: albumType [], photo : albumType [], photo2 : albumType [] }) {

/// Mobile ou web ///


  const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };
  
  useEffect(() => {
   calculateScreen();
  }, []);

const mergedImages = album[0].images.concat(album[0].images2)

 const slider1IsClicked = photo[0].images.length == 0 ? false : true

  const photoClicked = slider1IsClicked ? photo : photo2

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

const [fingerTouch, setFingerTouch] = useState<number | undefined>()


const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchStartX = e.touches[0].clientX;
  setFingerTouch(touchStartX);
};

const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
  const touchEndX = e.changedTouches[0].clientX;

  if (fingerTouch !== undefined) {
    if (touchEndX > fingerTouch) {
      previoustMobile();
    } else if (touchEndX < fingerTouch) {
      nextMobile();
    }
  }
};

///

const handleLoadedChange = (isLoaded: boolean) => {
  // console.log( isLoaded);
  setIsPicLoaded(isLoaded);

};




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
            <Link href= {`/photo/${album[0].slug}`}>
            <div className={styles.thumbnail}>
 
 </div>
            </Link>
              <div className={styles.picContainer} ref={picRef} 
              onTouchStart={handleTouchStart}       
              onTouchEnd={handleTouchEnd}
>
  {!mobileScreen && (
     <Layers
     onClickRight={() => {
       handleClickNextMobile();
      //  nextMobile()
     }}
     onClickLeft={() => {
       handleClickPreviousMobile();
      //  previoustMobile()
     }}
     
   /> 
  )}
                
                 <Pic
                  src={mergedImages[indexMobile].image}
                  alt={`photo ${indexMobile} sur ${mergedImages[0].image.length} de l'album ${album[0].name}`}
                  width={mergedImages[indexMobile].width}
                  height={mergedImages[indexMobile].height}
                  onLoadedChange={handleLoadedChange}
                /> 


                
              </div>
              
              
            </div>
            <div className={styles.infoContainer}>
                <p> {mergedImages[indexMobile].description}</p>
                <p>{`${indexMobile + 1}/${mergedImages.length}`}</p>
              </div>
         
      </div>
    </div>
  </>
);

  }



  export async function getStaticProps({ params } : { params: { album: string } } ) {
    const [albumName, imageKey] = params.album;
    
  
    const photoData = await getPhoto(albumName, imageKey);
    
    const photoData2 = await getPhoto2(albumName, imageKey);

    const albumData = await getOneAlbum(albumName);

    const allAlbums = await getAllAlbums()
  
  
    return {
      props: {
        photo: photoData,
        photo2: photoData2,
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
  
      album.images2.forEach((image2) => {
        const existingKey2 = uniqueKeys.find(
          (key) => key.params.album.includes (`${album.slug}/${image2.key}`)
        );
  
        if (!existingKey2) {
          uniqueKeys.push({
            params: { album: [`${album.slug}`, `${image2.key}`] },
          });
        }
      });
    });
  
    const paths = uniqueKeys;
  
  
    return {
      paths,
      fallback: "blocking",
    };
  }
