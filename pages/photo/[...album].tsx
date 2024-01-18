import { getOneAlbum, getAllAlbums, getOnePhoto, getPhoto, getPhoto2 } from "@/sanity/sanity-utils"
import { albumType, ImageDataType } from "@/types/Project-type";
import styles from "@/styles/Photo.module.css"
import Pic from "@/components/Pic/Pic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layers from "@/components/Pic/Layers";
import Link from "next/link";


export default function singlePhoto({ photo, photo2, album   }: { album: albumType [], photo : albumType [], photo2 : albumType [] }) {

/// Mobile ou web ///


  const [mobileScreen, setMobileScreen] = useState<boolean | undefined>();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };
  
  useEffect(() => {
   calculateScreen();
  }, []);

const mergedImages = album[0]?.images.concat(album[0]?.images2)
console.log(mergedImages)

 const slider1IsClicked = photo[0].images.length == 0 ? false : true

  const photoClicked = slider1IsClicked ? photo : photo2

  const clickedPhotoKey  = photoClicked[0].images[0].key
  

  function findIndexByKeyValue(keyValue:string) {
    const index = !slider1IsClicked ? album[0].images2.findIndex(image => image.key === keyValue) : 
    album[0].images.findIndex(image => image.key === keyValue)
    return index;
}


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

/// index de la photo (web ou mobile)

const indexPhotoClicked = !mobileScreen ? findIndexByKeyValue(clickedPhotoKey) : mobileIndexPhotoClicked

const [indexClicked, setIndexClicked] = useState(indexPhotoClicked)
const [indexUnclicked, setIndexUnclicked] = useState(0)

const IndexClickedSlider = slider1IsClicked ? album[0].images.length : album[0].images2.length




const IndexUnclickedSlider = !slider1IsClicked ? album[0].images.length : album[0].images2.length

const clickedPhoto = slider1IsClicked? album[0].images[indexClicked] : album[0].images2[indexClicked]
const unclickedPhoto = slider1IsClicked? album[0].images2[indexUnclicked] : album[0].images[indexUnclicked]

/// Fonction click next + previous 


const handleClickNext = (photoIndex: number, albumIndex: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
  if (photoIndex + 1 >= albumIndex) {
    setIndex(0);
  } else {
    setIndex(photoIndex + 1);
    console.log("Next Index:", photoIndex + 1);
  }
};

const handleClickPrevious = (photoIndex: number, albumIndex: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
  if (photoIndex - 1 < 0) {
    setIndex(albumIndex - 1);
    console.log("Previous Index:", albumIndex - 1);
  } else {
    setIndex(photoIndex - 1);
    console.log("Previous Index:", photoIndex - 1);
  }
};


////

const handleClickNextMobile = () => {
  if (indexClicked + 1 >= mergedImages.length) {
    setIndexClicked(0);
  } else {
    setIndexClicked(indexClicked + 1);
   
  }
};

const handleClickPreviousMobile = () => {
  if (indexClicked - 1 < 0) {
    setIndexClicked(mergedImages.length - 1);
  } else {
    setIndexClicked(indexClicked - 1);
   
  }
};


//////

function PhotoBlock({index , indexSlider, setIndex, photo}:



    {index : number, indexSlider : number, setIndex: React.Dispatch<React.SetStateAction<number>>, photo: ImageDataType} ) {
  return (
    <div className={styles.photoBlockContainer}>
      <div className={styles.picContainer}>
        <Layers 
          onClickRight={()=> {handleClickNext(index, indexSlider, setIndex)}}
          onClickLeft={()=> {handleClickPrevious(index, indexSlider, setIndex)}}
        />
        <Pic onClick={()=> {handleClickNext(index, indexSlider, setIndex)} }   
          src={photo.image} alt={photo.image} width={photo.width} height={photo.height}/> 
      </div>
        <p>{`${index + 1}/${indexSlider}`}</p>  
    </div>
  );
}


console.log ("index", mobileIndexPhotoClicked, "lenght", mergedImages.length, "photo", clickedPhoto)

console.log("index", indexClicked, "lenght", IndexClickedSlider, "photo", clickedPhoto)


////






    return (
      <div className={`rightPartContainer ${styles.mainContainer}`}>
        <Link href={`/photo/${album[0].slug}`}>
        <h2>{album[0].name}</h2>
        </Link>
       <div className={styles.slidersContainer}>
        {!mobileScreen ? (<>
          {slider1IsClicked ? (
        <>
          <PhotoBlock 
            index={indexClicked} 
            indexSlider={IndexClickedSlider} 
            setIndex={setIndexClicked} 
            photo={clickedPhoto} 
          />
          <PhotoBlock 
            index={indexUnclicked} 
            indexSlider={IndexUnclickedSlider} 
            setIndex={setIndexUnclicked} 
            photo={unclickedPhoto} 
          />
        </>
      ) : (
        <>
          <PhotoBlock 
            index={indexUnclicked} 
            indexSlider={IndexUnclickedSlider} 
            setIndex={setIndexUnclicked} 
            photo={unclickedPhoto} 
          />
          <PhotoBlock 
            index={indexClicked} 
            indexSlider={IndexClickedSlider} 
            setIndex={setIndexClicked} 
            photo={clickedPhoto} 
          />
        </>
      )}
        
        </>
          
        ): (

          <>
           <div className={styles.photoBlockContainer}>
      <div className={styles.picContainer}>
      <Layers 
          onClickRight={()=> {handleClickNextMobile()}}
          onClickLeft={()=> {handleClickPreviousMobile()}}
        />
        <Pic  
        onClick={()=> {handleClickNextMobile()} }
          src={mergedImages[indexClicked].image}
          alt={mergedImages[indexClicked].image}
          width={mergedImages[indexClicked].width} 
          height={mergedImages[indexClicked].height}/> 
          
      </div>
      <p>{`${indexClicked + 1}/${mergedImages.length}`}</p>  
    </div>
          </>
        ) }
       
      
    
      </div>  
    
      
  </div>
    )
  }



  export async function getStaticProps({ params } : { params: { album: string } } ) {
    const [albumName, imageKey] = params.album;
    
  
    const photoData = await getPhoto(albumName, imageKey);
    
    const photoData2 = await getPhoto2(albumName, imageKey);

    const albumData = await getOneAlbum(albumName);
  
  
    return {
      props: {
        photo: photoData,
        photo2: photoData2,
        album: albumData,
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
  
      // Ajouter également les clés des images2
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
      fallback: false,
    };
  }
