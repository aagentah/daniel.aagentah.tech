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
      <div className="col-6  flex  align-center  ph4">
        <h1 className="t-primary  almost-black  f4  fw6">
          <a href="/" className="almost-black  link">
            Daniel Aagentah
          </a>
        </h1>
      </div>
      <nav className="nav  col-18">
        <ul className="flex  flex-wrap  justify-end  pr3  ls-none">
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
                    text={`_${iteration?.title.toLowerCase()}`}
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
                      routerLinkProps: null,
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
