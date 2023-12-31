import { supabase } from '@/lib/initSupabase'
import '@/styles/tailwind.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Layout from '@/components/layoutold'
import Script from 'next/script'
import GoogleAnalytics from "../components/GoogleAnalytics";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import * as gtag from "../lib/gtag"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
 
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
 
    router.events.on("routeChangeComplete", handleRouteChange);
 
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-ZEC8WC6YR2"/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZEC8WC6YR2', {
              page_path: window.location.pathname,
            });
          `,
          }}
      />
      <GoogleAnalytics />
      <SessionContextProvider supabaseClient={supabase}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </>
  )
}
