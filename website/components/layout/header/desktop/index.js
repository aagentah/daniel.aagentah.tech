import Link from 'next/link';
import { Icon } from 'next-pattern-library';

import Button from '~/components/elements/button';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';

export default function Header({ siteConfig, handleLogout }) {
  const [user, { mutate }] = useUser();
  const app = useApp();

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const iconFacebook = <Icon icon={['fab', 'facebook']} />;
  const iconInstagram = <Icon icon={['fab', 'twitter']} />;
  const iconEmail = <Icon icon={['fas', 'envelope']} />;

  return (
    <div className="header  header--desktop  flex  justify-center  align-center">
      <div className="col-3  flex  align-center  ph4">
        <h1 className="t-primary  almost-black  f5">
          <a href="/" className="almost-black  link">
            {
              // <img className="w3" src="/images/logo.png" />
            }
          </a>
        </h1>
      </div>
      <nav className="nav  col-21">
        <ul className="flex  flex-wrap  justify-end  pr3  pt3  ls-none">
          {siteConfig?.menu?.map?.length &&
            siteConfig.menu.map((iteration, i) => {
              let path = iteration?.slug?.current;
              if (path === 'home') path = '';

              return (
                <li className="nav__desktop__item">
                  <Button
                    /* Options */
                    type="secondary"
                    size="large"
                    text={iteration?.title}
                    color="black"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: `/${path}`,
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null
                    }}
                  />
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
