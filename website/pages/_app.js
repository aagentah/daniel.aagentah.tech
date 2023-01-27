import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ToastProvider } from 'react-toast-notifications';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';

import { AppProvider } from '../context-provider/app';
import Layout from '~/components/layout';

import '../styles/index.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;
  const { siteConfig, page, preview, layout } = pageProps;

  return (
    <>
      <PlausibleProvider domain="daniel.aagentah.tech">
        <AppProvider>
          <ParallaxProvider>
            <ToastProvider>
              <PageTransition
                timeout={transitionTimeout}
                classNames="page-transition"
                loadingComponent={null}
                loadingDelay={transitionTimeout}
                loadingTimeout={{
                  enter: transitionTimeout,
                  exit: transitionTimeout
                }}
                loadingClassNames="loading-indicator"
              >
                <Layout
                  meta={{
                    siteConfig,
                    title: layout?.meta?.title,
                    description: layout?.meta.description,
                    image: layout?.meta?.image,
                    pageClass: layout?.meta?.pageClass
                  }}
                  // navWhite={page?.slug.current === 'home'}
                  preview={preview}
                >
                  <Component {...pageProps} />
                </Layout>
              </PageTransition>
            </ToastProvider>
          </ParallaxProvider>
        </AppProvider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
