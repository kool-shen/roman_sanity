import { albumType, projectArchiType, infosType } from "@/types/Project-type";
import { createClient, groq } from "next-sanity";
import config from "./config/client-config";




export async function getAllAlbums(): Promise<albumType[] | undefined>  {
    return createClient(config).fetch(

        groq`*[_type == "album" ] | order(_createdAt desc) {
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          "family": family,
          "images": images[] {
            "image": image.asset->url,
            "alt": image.alt,
            "description": description,
            "key": _key,
            "height": image.asset->metadata.dimensions.height,
            "width": image.asset->metadata.dimensions.width,
          },
          

          "content": content,
        }`

    )

}

export async function getAllArchi(): Promise<projectArchiType[] | undefined>  {
  return createClient(config).fetch(

      groq`*[_type == "archi"] | order(_createdAt desc)  {
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          "images": images[] {
            "image": image.asset->url,
            "alt": image.alt,
            "description": description,
            "key": _key,
            "height": image.asset->metadata.dimensions.height,
            "width": image.asset->metadata.dimensions.width,
          },
        
          "content": content,
        }`

  )

}



export async function getOneAlbum(slug:string): Promise<albumType[] >  {
    return createClient(config).fetch(
        groq`*[_type == "album" && slug.current == "${slug}"] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "images": images[] {
              "image": image.asset->url,
             
              "description": description,
              "key": _key,
              "height": image.asset->metadata.dimensions.height,
              "width": image.asset->metadata.dimensions.width,
            },
            
            "content": content,
          }`

    )

}

export async function getOneProject(slug:string): Promise<albumType[] >  {
  return createClient(config).fetch(

      groq`*[_type == "archi" && slug.current == "${slug}"] {
        _id,
        _createdAt,
        name,
        "program" : program,
        "sponsor": sponsor,
        "localisation" : localisation,
        "calendar" : calendar,
        "surface" : surface,
        "cost" : cost,
        "content": content,
        "slug": slug.current,
        "images": images[] {
          "image": image.asset->url,
          "caption": image.photoCaption,
          "description": description,
          "key": _key,
          "height": image.asset->metadata.dimensions.height,
          "width": image.asset->metadata.dimensions.width,
        },
      
        
      }`

  )

}



export async function getOnePhoto(slug : string| undefined)  {
  return createClient(config).fetch(

      groq` *[_type == "album" && "${slug}" in images[]._key]{ "images":images[_key == "${slug}"] {
        "image": image.asset->url,
         "alt": image.alt,
          "description": description,
          "key": _key,
        }, }`

  )

}

export async function getOtherPhotos(key : string| undefined)  {
  return createClient(config).fetch(

      groq` *[_type == "album" && "${key}" in images[]._key] {
          
        name,
        "slug": slug.current,
        "images": images[] {
          "image": image.asset->url,
          "alt": image.alt,
          "description": description,
          "key": _key,
        },
        
      }`

  )

}


export async function getPhoto(albumSlug : string| undefined, key :string| undefined )  {
  return createClient(config).fetch(

      groq` *[_type == "album" && slug.current == "${albumSlug}" ] 
      { "images":images[_key == "${key}"] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        "description": description,
        "key": _key,
      
      },}`

  )

}

export async function getPhotoProject(albumSlug : string| undefined, key :string| undefined )  {
  return createClient(config).fetch(

      groq`*[_type == "archi" && slug.current == "${albumSlug}" ] 
      { "slug": slug.current,
        "images":images[_key == "${key}"] {
        "image": image.asset->url,
        "height": image.asset->metadata.dimensions.height,
        "width": image.asset->metadata.dimensions.width,
        "alt": name,
        "description": name,
        "key": _key,
      
      },}`

  )

}



export async function getHomepagePhotos( )  {
  return createClient(config).fetch(
      groq`*[_type == "home" ] {
        "name" : name,
        "images": images[] {
          "image": image.asset->url,
          "key": _key,
          "height": image.asset->metadata.dimensions.height,
          "width": image.asset->metadata.dimensions.width,
        },
       
      }`

  )

}

export async function getHomepagePhotoType(url:string)  {
  return createClient(config).fetch(
      groq`*[images[].image.asset->url match 
      "${url}" && !(_type == "home")] {
      _type
    }`

  )

}

export async function getAllInfo() : Promise<infosType[] | undefined>{
  return createClient(config).fetch(
  `*[_type == "infos"] 
  {
"archi" : mailArchi,
"photo" : mailPhoto,
"insta" : insta,
"bio" : bio,  
"shortBio": shortBio,
"mentions" : mentions,  
     }`
  )

}