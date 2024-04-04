import { getOneAlbum, getAllAlbums, getOnePhoto, getPhoto, getPhoto2 } from "@/sanity/sanity-utils"
import { albumType, ImageDataType } from "@/types/Project-type";
import styles from "@/styles/Photo.module.css"
import Pic from "@/components/Pic/Pic";
import { useEffect, useState } from "react";
import Layers from "@/components/Pic/Layers";
import Link from "next/link";
import { NextSeo } from "next-seo";
import List from '@/components/List/List';




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

console.log(mergedImages[mobileIndexPhotoClicked])

// console.log("KEY", findMobileIndexByKeyValue(clickedPhotoKey))

/// index de la photo (web ou mobile)

const indexPhotoClicked =findIndexByKeyValue(clickedPhotoKey)

const [indexClicked, setIndexClicked] = useState(indexPhotoClicked)
const [indexUnclicked, setIndexUnclicked] = useState(0)


/// Fonction click next + previous 


/// WEB





const handleClickNext1 = (total:number) => {
  if (indexClicked + 1 >=total) {
    setIndexClicked(0);
  } else {
    setIndexClicked(indexClicked + 1);
  }
};

const handleClickPrevious1 = (total:number) => {
  if (indexClicked - 1 < 0) {
    setIndexClicked(total);
  } else {
    setIndexClicked(indexClicked - 1);
  }
};



const handleClickNext2 = (total:number) => {
  if (indexUnclicked + 1 >= total) {
    setIndexUnclicked(0);
  } else {
    setIndexUnclicked(indexUnclicked + 1);
    
  }
};


const handleClickPrevious2 = (total:number) => {
  if (indexUnclicked - 1 < 0) {
    setIndexUnclicked(total);
  } else {
    setIndexUnclicked(indexUnclicked - 1);
  }
};



/// MOBILE


const [indexMobile, setIndexMobile] = useState(mobileIndexPhotoClicked)

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


////




return (
  <>
      <NextSeo
    title={album[0].name.toLowerCase()}
    description={`photos de l'album ${album[0].name}`}
    
  />
    <div className={`rightPartContainer ${styles.mainContainer}`}>
    <List data={albums} />   
      <div className={styles.slidersContainer}>
            <div className={styles.photoBlockContainer}>
            <div className={styles.iconContainer}> 
            <Link href= {`/photo/${album[0].slug}`}>
            <Pic   
            src={"/thumbnail_black.png"} alt={"thumbnail icon"} 
            width={100} height={100} /> 
            </Link>
       </div>
              <div className={styles.picContainer}>

                <Layers
                  onClickRight={() => {
                    handleClickNextMobile();
                  }}
                  onClickLeft={() => {
                    handleClickPreviousMobile();
                  }}
                  
                />
                <Pic
                  src={mergedImages[indexMobile].image}
                  alt={`photo ${indexMobile} sur ${mergedImages[0].image.length} de l'album ${album[0].name}`}
                  width={mergedImages[indexMobile].width}
                  height={mergedImages[indexMobile].height}
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
