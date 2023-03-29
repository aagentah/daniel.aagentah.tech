import Link from 'next/link';

import Container from '~/components/layout/container';
import SubscribeBanner from '~/components/subscribe-banner';
import Button from '~/components/elements/button';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Bio({ siteConfig }) {
  // const [items, setItems] = useState([]);
  // const [itemsLength, setItemsLength] = useState(3);
  //
  // useEffect(() => {
  //   const getItems = async () => {
  //     const itemsData = await getAllProjects();
  //     setItemsLength(itemsData.length);
  //     setItems(itemsData);
  //   };
  //
  //   getItems();
  // }, []);

  return (
    <>
      <div className="pb4  mb2  tac">
        <SubscribeBanner />
      </div>

      <Container>
        <div className="col-24">
          {
            // <div className="pt4  pb3  tac">
            //   <Heading
            //     /* Options */
            //     htmlEntity="h2"
            //     text="Latest Projects"
            //     color="black"
            //     size="large"
            //     truncate={0}
            //     onClick={null}
            //     /* Children */
            //     withLinkProps={null}
            //   />
            // </div>
          }

          <div className="flex  flex-wrap  justify-center  ph3">
            {
              // {[...Array(itemsLength)].map((iteration, i) => (
              //   <div key={iteration} className="col-24">
              //     <div className="pa3">
              //       <CardProject
              //         i={i}
              //         item={items && items[i]}
              //         placeholder={!items.length}
              //       />
              //     </div>
              //   </div>
              // ))}
            }

            <div className="col-24  pb3">
              <Button
                /* Options */
                type="primary"
                size="large"
                text="Latest Music"
                color="black"
                fluid={true}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/music',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    as: `/music`,
                    scroll: false,
                  },
                }}
              />
            </div>

            <div className="col-24  pb3">
              <Button
                /* Options */
                type="primary"
                size="large"
                text="Latest Projects"
                color="black"
                fluid={true}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/projects',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    as: `/projects`,
                    scroll: false,
                  },
                }}
              />
            </div>

            <div className="col-24  pb3">
              <Button
                /* Options */
                type="primary"
                size="large"
                text="Latest Posts"
                color="black"
                fluid={true}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/posts',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    as: `/posts`,
                    scroll: false,
                  },
                }}
              />
            </div>

            <div className="col-24  pb3">
              <Button
                /* Options */
                type="primary"
                size="large"
                text="Shows & Exhibitions"
                color="black"
                fluid={true}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={{
                  type: 'next',
                  href: '/shows',
                  target: null,
                  routerLink: Link,
                  routerLinkProps: {
                    as: `/shows`,
                    scroll: false,
                  },
                }}
              />
            </div>

            {
              // <div className="col-24  pb3">
              //   <Button
              //     /* Options */
              //     type="primary"
              //     size="large"
              //     text="Latest Music"
              //     color="black"
              //     fluid={true}
              //     icon={null}
              //     iconFloat={null}
              //     inverted={false}
              //     loading={false}
              //     disabled={false}
              //     skeleton={false}
              //     onClick={null}
              //     /* Children */
              //     withLinkProps={{
              //       type: 'next',
              //       href: '/music',
              //       target: null,
              //       routerLink: Link,
              //       routerLinkProps: {
              //         as: `/music`,
              //         scroll: false
              //       }
              //     }}
              //   />
              // </div>
            }
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
      layout: {
        meta: {
          title: 'Bio',
          description: 'Bio',
          image: null,
        },
      },
    },
  };
}
