import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import { SocialProfileJsonLd } from 'next-seo';
import  {readexLight, readexRegular} from '@/font/font'
import  {TeX_Regular, TeX_Italic, TeX_Bold} from '@/local-fonts/localFonts'




export default function App({ Component, pageProps }: AppProps) {

  /// ne pas afficher le menu dans la partie admin
  const router = useRouter();
  const isMenuNeeded = router.pathname !== '/admin' 


  

  return ( 
    <React.Fragment>
  <DefaultSeo {...SEO} 
  additionalLinkTags={[
    {
      rel: 'icon',
      href: '/dot_white_big.png',
    },
      ]}
      canonical =  {`https://www.romancadre.com${router.asPath}`}
  />
  <SocialProfileJsonLd
      type="Person"
      name="Roman Cadre"
      url="https://www.romancadre.com"
      sameAs={[
        'https://www.instagram.com/roman_cadre',
        'https://www.facebook.com/rcadre',
        'https://fr.linkedin.com/in/roman-cadre-1ab15575'
      ]}
    />
    
    <div className={`${isMenuNeeded ? "mainContainer" : "adminContainer"}
     ${readexLight.variable}
      ${readexRegular.variable}
       ${TeX_Regular.variable}
       ${TeX_Italic.variable}
       ${TeX_Bold.variable}
       `}>
  {isMenuNeeded && <Menu />}
  <Component {...pageProps} />
  </div>
  </React.Fragment>
 
  )
}
