import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
    
    title: undefined,
    defaultTitle : 'roman cadre',
    titleTemplate : '%s | roman cadre',
    description: 'architecte + photographe basé à Rennes',
  openGraph: {
    images : [
        {
          url: 'https://cdn.sanity.io/images/h6makjy9/production/626a8a2c3a562ec1fd5f87723185be1a9d6ee0b0-1333x2000.jpg',
          width: 1333,
          height: 2000,
          alt: 'Image Roman Cadre',
        },
      ],
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.romancadre.com/',
    siteName: 'romancadre.com',
  },
  themeColor : "black"
  
  
};

export default config;