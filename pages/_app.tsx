import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Metadata } from 'next';
import Head from 'next/head'
import { NextSeo } from 'next-seo';
import SEO from '../next-seo.config';

import { DefaultSeo } from 'next-seo';
import React from 'react';



export default function App({ Component, pageProps }: AppProps) {

  /// ne pas afficher le menu dans la partie admin
  const router = useRouter();
  const isMenuNeeded = router.pathname !== '/admin' 


  useEffect(() => {
    const firstVisit = sessionStorage.getItem('firstVisit');
    if (!firstVisit) {
      sessionStorage.setItem('firstVisit', 'true');
      console.log('First visit');
    }
  }, []);

  return ( 
    <React.Fragment>
  <DefaultSeo {...SEO} 
  />
    <div className=   {isMenuNeeded ? "mainContainer" : "adminContainer"}>
  {isMenuNeeded && <Menu />}
  <Component {...pageProps} />
  </div>
  </React.Fragment>
 
  )
}
