import { DefaultSeoProps } from 'next-seo';



const config: DefaultSeoProps = {
    
    title: undefined,
    defaultTitle : 'roman cadre',
    titleTemplate : '%s | roman cadre',
    description: 'Photographe et architecte Roman Cadre basé à Rennes. Il est connu pour ses projets architecturaux dans toute la région Bretagne, notamment pour la conception de maisons à Saint-Briac et à Lancieux. Il collabore parfois avec son compagnon d’atelier, Paul Cariou.',
    
  openGraph: {
    images : [
        {
          url: '/dot_white_big.png',
     
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