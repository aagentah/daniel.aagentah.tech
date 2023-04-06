import { useState } from 'react';
import Link from 'next/link';

import dynamic from 'next/dynamic';

import { Icon } from 'next-pattern-library';
import Container from '~/components/layout/container';

import Button from '~/components/elements/button';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';

const IconInstagram = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconInstagram)
);

const IconSoundcloud = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSoundcloud)
);

const IconYoutube = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconYoutube)
);

const IconSpotify = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSpotify)
);

const IconGithub = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconGithub)
);

const IconTwitter = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconTwitter)
);

const IconBandcamp = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconBandcamp)
);

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
        bg-almost-black
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

        <h1 className="t-primary  almost-white  f6">
          <a href="/" className="almost-white  link  tac  fw6">
            Daniel Aagentah
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

        <nav className="nav  flex  flex-wrap  pt3">
          <Container>
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
                        color="white"
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
              {user ? (
                <>
                  <li className="col-24  pb4">
                    <Button
                      /* Options */
                      type="secondary"
                      size="x-large"
                      text="Profile"
                      color="white"
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
                        routerLinkProps: null,
                      }}
                    />
                  </li>
                  <li className="col-24  pb4">
                    <Button
                      /* Options */
                      type="secondary"
                      size="x-large"
                      text="Log Out"
                      color="white"
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
                    //     color="white"
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
                    //     color="white"
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

            <div className="col-24  flex  flex-wrap  justify-center  pb3  ph3  ph0-md">
              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/daniel.aagentah/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconInstagram color="#e6e6e6" size={30} />
                </a>
              </div>

              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Soundcloud"
                  href="https://soundcloud.com/aagentah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconSoundcloud color="#e6e6e6" size={30} />
                </a>
              </div>
              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Youtube"
                  href="https://www.youtube.com/@daniel.aagentah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconYoutube color="#e6e6e6" size={30} />
                </a>
              </div>

              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Spotify"
                  href="https://open.spotify.com/artist/5sAlVt0dBip3YMS6di8JJw?si=GR11QkY8RVySAvsvLMRodg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconSpotify color="#e6e6e6" size={30} />
                </a>
              </div>

              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Github"
                  href="https://github.com/aagentah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGithub color="#e6e6e6" size={30} />
                </a>
              </div>

              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Twitter"
                  href="https://twitter.com/Aagentah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTwitter color="#e6e6e6" size={30} />
                </a>
              </div>

              <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
                <a
                  aria-label="Bandcamp"
                  href="https://aagentah.bandcamp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBandcamp color="#e6e6e6" size={30} />
                </a>
              </div>
            </div>

            <div className="flex  justify-center  pt4">
              <p className="t-secondary  bold  f5  lh-copy  almost-white  tac  dib  mla  mra">
                Daniel Aagentah {new Date().getFullYear()}
              </p>
            </div>
          </Container>
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
