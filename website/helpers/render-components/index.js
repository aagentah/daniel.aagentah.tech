import dynamic from 'next/dynamic';

import { useApp } from '~/context-provider/app';

const componentList = {
  carousel: dynamic(() => import('~/components/carousel')),
  textBlock: dynamic(() => import('~/components/text-block')),
  textImageBlock: dynamic(() => import('~/components/text-image-block')),
  hero: dynamic(() => import('~/components/hero')),
  gridStore: dynamic(() => import('~/components/grid/store')),
  subscribeBanner: dynamic(() => import('~/components/subscribe-banner')),
  button: dynamic(() => import('~/components/button')),
  homepageIntro: dynamic(() => import('~/components/homepage-intro')),
  homepageAbout: dynamic(() => import('~/components/homepage-about')),
  homepageServices: dynamic(() => import('~/components/homepage-services')),
  homepageShop: dynamic(() => import('~/components/homepage-shop'))
  // ...
};

export default function RenderComponents({ components }) {
  const app = useApp();

  const componentsArray = components.map(component => {
    let key = component._type;

    if (component._type === 'customComponent') {
      key = component.slug;
    }

    return {
      DynamicComponent: componentList[key],
      props: component
    };
  });

  return (
    <>
      {componentsArray.map(component => {
        const { DynamicComponent, props } = component;

        if (DynamicComponent && app?.deviceSize) {
          return <DynamicComponent {...props} />;
        }

        return false;
      })}
    </>
  );
}
