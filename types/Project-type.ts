import { PortableTextBlock } from "sanity";

 export type projectType =   { _id : string; _createdAt : Date; name: string; slug?: string; image:string;  url: string; content: PortableTextBlock[]}

export type albumType =   { _id : string; _createdAt : Date; name: string; slug?: string; 
  images: {
    image: string;
    alt?: string;
    description?: string;
    key: string;
    width : number;
    height : number
  }[];
  images2: {
    image: string;
    alt?: string;
    description?: string;
    key?: string;
    width : number;
    height : number
  }[];
  url: string; content: PortableTextBlock[] } 

  export type ImageType = {
    image: string ;
    alt?: string | undefined;
    // description?: string | undefined;
    key: string;
    width? : number;
    height? : number
}

export type ImageDataType = {
  height: number;
  width: number;
  image: string;
  alt?: string | null; // Rendre alt optionnel avec le symbole `?`
  description?: string; // Rendre description optionnel si nécessaire
  key?: string; // Rendre key optionnel si nécessaire
}



export type projectArchiType = {
  _id : string; _createdAt : Date; name:  string; content: PortableTextBlock[]; 
  slug?: string; 
  program:string; sponsor:string; localisation: string; 
  calendar : string;
  surface : number;
  cost: number; 
  images: {
  image: string;
  alt: string;
  key?: string;
  height: number;
  width: number;
}[];
images2: {
  image: string;
  alt: string;
  key?: string;
  height: number;
  width: number;
}[];
  url: string;  } 

  export type homepagePhotosType = {
    name:  string;
    images: {
    image: string;
    key?: string;
    height: number;
    width: number;
  }[];
     } 


export type projectPicProps = {
  project?: projectArchiType[]; // Propriété project correspondant à un projet architectural individuel
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  src: string;
  width: number;
  height: number;
  alt: string;
style?: React.CSSProperties | undefined
;
key?: string;


};