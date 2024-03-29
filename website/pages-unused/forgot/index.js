import { useToasts } from 'react-toast-notifications';

import { Icon } from 'next-pattern-library';
import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import Input from '~/components/elements/input';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Forgot({ siteConfig }) {
  const { addToast } = useToasts();

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
    };

    const res = await fetch('../api/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      await res.json();
      addToast("We've sent you an email with some instructions", {
        appearance: 'info',
        autoDismiss: true,
      });
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

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
  const inputIconEnvelope = <Icon icon={['fas', 'envelope']} />;

  return (
    <>
      <Layout
        meta={{
          siteConfig,
          title: 'Forgot Password',
          description: 'This is the Forgot Password page.',
          image: null,
        }}
        preview={null}
      >
        <Container>
          <div className="pt4  pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Forgot Password"
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

            <div className="flex  flex-wrap  align-center  pt3">
              <div className="pr3">
                <Button
                  /* Options */
                  type="primary"
                  size="medium"
                  text="Reset"
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
