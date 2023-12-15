import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '@/components/Menu/Menu'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const isMenuNeeded = router.pathname !== '/admin';

  return ( 
    <div className=   {isMenuNeeded ? "mainContainer" : ""}>
  {isMenuNeeded && <Menu />}
  <Component {...pageProps} />
  </div>
  
  )
}
