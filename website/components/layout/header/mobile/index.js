import { useState } from 'react';
import Link from 'next/link';

import { Icon } from 'next-pattern-library';
import Button from '~/components/elements/button';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';

export default function Header({ siteConfig, handleLogout }) {
  const [user, { mutate }] = useUser();
  const app = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  const buttonIconSignIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const buttonIconSignOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const iconFacebook = <Icon icon={['fab', 'facebook']} />;
  const iconInstagram = <Icon icon={['fab', 'twitter']} />;
  const iconEmail = <Icon icon={['fas', 'envelope']} />;

  return (
    <div
      className={`
        header
        header--mobile
        ${navOpen ? 'collapsed' : ''}
        bg-almost-white
        flex
        justify-center
        align-center
      `}
    >
      <div className="flex  flex-wrap  justify-center  align-center">
        <button className="header__burger" onClick={toggleNav} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1a1a1a"
          >
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </button>

        <h1 className="t-primary  almost-black  f6">
          <a href="/" className="almost-black  link">
            <img
              className="header--mobile__logo  w2"
              src="/images/logo-black.png"
            />
          </a>
        </h1>
      </div>

      <nav className="nav--mobile  pa3">
        <div className="flex  flex-wrap  pb4  mb3">
          <button className="header__burger" onClick={toggleNav} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#1a1a1a"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </button>
        </div>

        {
          // <div className="flex  flex-wrap  pb4">
          //   <SearchBar />
          // </div>
        }

        <nav className="nav  flex  flex-wrap">
          <ul className="col-24  flex  flex-wrap  ls-none  pv3">
            {siteConfig?.menu?.map?.length &&
              siteConfig.menu.map((iteration, i) => {
                let path = iteration?.slug?.current;
                if (path === 'home') path = '';

                return (
                  <li className="nav__mobile__item  col-24  pb4">
                    <Button
                      /* Options */
                      type="secondary"
                      size="x-large"
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
                        routerLinkProps: null
                      }}
                    />
                  </li>
                );
              })}
            {user ? (
              <>
                <li className="col-24  pb4">
                  <Button
                    /* Options */
                    type="secondary"
                    size="x-large"
                    text="Profile"
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
                      href: '/profile',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: null
                    }}
                  />
                </li>
                <li className="col-24  pb4">
                  <Button
                    /* Options */
                    type="secondary"
                    size="x-large"
                    text="Log Out"
                    color="black"
                    fluid={false}
                    icon={buttonIconSignOut}
                    iconFloat={null}
                    inverted
                    loading={false}
                    disabled={false}
                    onClick={handleLogout}
                    /* Children */
                    withLinkProps={null}
                  />
                </li>
              </>
            ) : (
              <>
                {
                  // <li className="col-24  pb4">
                  //   <Button
                  //     /* Options */
                  //     type="secondary"
                  //     size="large"
                  //     text="Sign Up"
                  //     color="black"
                  //     fluid={false}
                  //     icon={null}
                  //     iconFloat={null}
                  //     inverted
                  //     loading={false}
                  //     disabled={false}
                  //     onClick={null}
                  //     /* Children */
                  //     withLinkProps={{
                  //       type: 'next',
                  //       href: '/signup',
                  //       target: null,
                  //       routerLink: Link,
                  //       routerLinkProps: null,
                  //     }}
                  //   />
                  // </li>
                  // <li className="col-24  pb4">
                  //   <Button
                  //     /* Options */
                  //     type="secondary"
                  //     size="large"
                  //     text="Login"
                  //     color="black"
                  //     fluid={false}
                  //     icon={buttonIconSignIn}
                  //     iconFloat={null}
                  //     inverted
                  //     loading={false}
                  //     disabled={false}
                  //     onClick={null}
                  //     /* Children */
                  //     withLinkProps={{
                  //       type: 'next',
                  //       href: '/login',
                  //       target: null,
                  //       routerLink: Link,
                  //       routerLinkProps: null,
                  //     }}
                  //   />
                  // </li>
                }
              </>
            )}
          </ul>
          <div className="col-24  flex  flex-wrap  pb3">
            <div className="dib  mr3  flex  justify-center  align-center">
              <a className="almost-black  f3" href="" target="_blank">
                {iconFacebook}
              </a>
            </div>
            <div className="dib  mr3  flex  justify-center  align-center">
              <a className="almost-black  f3" href="" target="_blank">
                {iconInstagram}
              </a>
            </div>
            <div className="dib  mr3  flex  justify-center  align-center">
              <a className="almost-black  f3" href="" target="_blank">
                {iconEmail}
              </a>
            </div>
          </div>
        </nav>

        {
          // <div className="col-6">
          //   <span className={`loading-indicator  ${isLoadingClass}`}>
          //     <div className="lds-ring">
          //       <div></div>
          //       <div></div>
          //       <div></div>
          //       <div></div>
          //     </div>
          //   </span>
          // </div>
        }
      </nav>
    </div>
  );
}
