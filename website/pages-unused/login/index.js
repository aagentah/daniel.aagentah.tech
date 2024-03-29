import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

import { Icon } from 'next-pattern-library';
import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import Input from '~/components/elements/input';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useUser } from '~/lib/hooks';
import { getSiteConfig } from '~/lib/sanity/requests';

export default function Login({ siteConfig }) {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const { addToast } = useToasts();
  const fwdRoute = router.query?.fwdRoute ? router.query.fwdRoute : null;

  async function loginViaQuery() {
    const body = {
      username: router.query.username,
      password: `${router.query.salt}:${router.query.hash}`,
    };

    const res = await fetch('../api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      addToast(
        'Something went wrong, please try again, or a different browser?',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch('../api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      addToast(
        'Something went wrong, have you used the correct Username/Password?',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    }
  }

  useEffect(() => {
    if (user) Router.push(`${fwdRoute ? `/${fwdRoute}` : '/'}`);
  }, [user, fwdRoute]);

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;
  const inputIconLock = <Icon icon={['fas', 'lock']} />;

  if (router.query?.username && router.query?.hash && router.query?.salt) {
    loginViaQuery();
  }

  return (
    <>
      <Layout
        meta={{
          siteConfig,
          title: 'Log In',
          description: 'This is the Log In page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Login"
              color="white"
              size="large"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <form className="form  form--default" onSubmit={onSubmit}>
            <div className="pv2">
              <Input
                /* Options */
                type="email"
                label="Email"
                name="username"
                value=""
                icon={inputIconEnvelope}
                required
                disabled={false}
                readOnly={false}
              />
            </div>
            <div className="pv2">
              <Input
                /* Options */
                type="password"
                label="Password"
                name="password"
                value=""
                icon={inputIconLock}
                required
                disabled={false}
                readOnly={false}
              />
            </div>

            <div className="flex  flex-wrap  align-center  pt3">
              <div className="pr3">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Login"
                  color="white"
                  fluid={false}
                  icon={buttonIconArrowRight}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'form',
                    href: null,
                    target: null,
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />
              </div>
              <div className="pr3">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text={"I don't have an account"}
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
                    href: '/signup',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: null,
                  }}
                />
              </div>
              <div className="pr3">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Forgot Password"
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
                    href: '/forgot',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: null,
                  }}
                />
              </div>
            </div>
          </form>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
