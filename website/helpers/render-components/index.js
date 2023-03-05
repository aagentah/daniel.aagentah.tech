import dynamic from 'next/dynamic';

import { useApp } from '~/context-provider/app';

const componentList = {
  carousel: dynamic(() => import('~/components/carousel')),
  textBlock: dynamic(() => import('~/components/text-block')),
  textImageBlock: dynamic(() => import('~/components/text-image-block')),
  hero: dynamic(() => import('~/components/hero')),
  gridProjects: dynamic(() => import('~/components/grid/project')),
  gridPosts: dynamic(() => import('~/components/grid/post')),
  gridMusics: dynamic(() => import('~/components/grid/music')),
  subscribeBanner: dynamic(() => import('~/components/subscribe-banner')),
  button: dynamic(() => import('~/components/button')),
  intro: dynamic(() => import('~/components/intro'), {
    ssr: false,
  }),
  // ...
};

export default function RenderComponents({ components }) {
  const app = useApp();

  const componentsArray = components.map((component) => {
    let key = component._type;

    if (component._type === 'customComponent') {
      key = component.slug;
    }

    return {
      DynamicComponent: componentList[key],
      props: component,
    };
  });

  return (
    <>
      {componentsArray.map((component) => {
        const { DynamicComponent, props } = component;

        if (DynamicComponent && app?.deviceSize) {
          return <DynamicComponent {...props} />;
        }

        return false;
      })}
    </>
  );
}
