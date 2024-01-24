import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu'
import { useRouter } from 'next/router';



export default function App({ Component, pageProps }: AppProps) {

  /// ne pas afficher le menu dans la partie admin
  const router = useRouter();
  const isMenuNeeded = router.pathname !== '/admin' || '/Screen'



  return ( 
    // <Provider store={store}>
    
    <div className=   {isMenuNeeded ? "mainContainer" : ""}>
  {isMenuNeeded && <Menu />}
  <Component {...pageProps} />
  </div>
  // </Provider>
  )
}
