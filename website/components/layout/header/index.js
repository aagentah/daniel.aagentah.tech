import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import NProgress from 'nprogress';

import { useApp } from '../../../context-provider/app';
import { useUser } from '~/lib/hooks';

const HeaderDesktop = dynamic(() => import('./desktop'));
const HeaderMobile = dynamic(() => import('./mobile'));

export default function Header({ navblack, siteConfig }) {
  const app = useApp();
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch(`${process.env.SITE_URL}/api/logout`);
    mutate({ user: null });
  };

  useEffect(() => {
    if (app.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [app.isLoading]);

  if (app?.deviceSize) {
    return (
      <div
        className={`header-wrapper ${
          navblack ? 'header-wrapper--black' : null
        }`}
      >
        {app.deviceSize !== 'md' && (
          <HeaderDesktop siteConfig={siteConfig} handleLogout={handleLogout} />
        )}
        {app.deviceSize === 'md' && (
          <HeaderMobile siteConfig={siteConfig} handleLogout={handleLogout} />
        )}
      </div>
    );
  }

  return false;
}
