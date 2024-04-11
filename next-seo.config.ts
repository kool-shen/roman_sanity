import { DefaultSeoProps } from 'next-seo';
import { createClient, groq } from "next-sanity";
import configClient from "@/sanity/config/client-config";
import { infosType } from './types/Project-type';


const config: DefaultSeoProps = {

    
    title: undefined,
    defaultTitle : 'roman cadre',
    titleTemplate : '%s | roman cadre',
    // description: 'Photographe et architecte Roman Cadre basé à Rennes. Il est connu pour ses projets architecturaux dans toute la région Bretagne, notamment pour la conception de maisons à Saint-Briac et à Lancieux. Il collabore parfois avec son compagnon d’atelier, Paul Cariou.',
    
  openGraph: {
    images : [
        {
          url: 
          'https://cdn.sanity.io/images/h6makjy9/production/626a8a2c3a562ec1fd5f87723185be1a9d6ee0b0-1333x2000.jpg',
     
          alt: 'Image Roman Cadre',
        },
        {
          url: 
          'https://cdn.sanity.io/images/h6makjy9/production/f53ba781414c0569ccb25be0e49c24a2206f9758-1334x2000.jpg',     
          alt: 'Image Roman Cadre',
        },
        {
          url: 
          'https://cdn.sanity.io/images/h6makjy9/production/a2a2bb86a3d28ba972455900c9446b22b368d3e8-3448x5168.jpg',     
          alt: 'Image Roman Cadre',
        },
        {
          url: 
          'https://cdn.sanity.io/images/h6makjy9/production/99120511dda0ece904e5f182600d5852028b0282-3448x5168.jpg',     
          alt: 'Image Roman Cadre',
        },
      ],
    type: 'website',
    locale: 'fr_FR',

    siteName: 'romancadre.com',
  },
  themeColor : "black"
  
  
};

export default config;