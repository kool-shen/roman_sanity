import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu'
import { useRouter } from 'next/router';
import { useEffect } from 'react';



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
    // <Provider store={store}>
    
    <div className=   {isMenuNeeded ? "mainContainer" : ""}>
  {isMenuNeeded && <Menu />}
  <Component {...pageProps} />
  </div>
  // </Provider>
  )
}
