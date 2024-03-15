import { useEffect, useState } from 'react';

import Container from '~/components/layout/container';
import CardPost from '~/components/card/post';

import { getAllPosts } from '~/lib/sanity/requests';

export default function GridItems({ padding, marginTop, marginBottom }) {
  const [items, setItems] = useState([]);
  const [itemsLength, setItemsLength] = useState(12);

  useEffect(() => {
    const getItems = async () => {
      const itemsData = await getAllPosts();
      setItemsLength(itemsData.length);
      setItems(itemsData);
    };

    getItems();
  }, []);

  return (
    <>
      {itemsLength > 0 && (
        <Container>
          <section
            className={`grid  grid--items  pv${padding}  mt${marginTop}  mb${marginBottom}`}
          >
            <div className="flex  flex-wrap">
              {[...Array(itemsLength)].map((iteration, i) => (
                <div key={iteration} className="col-24  col-6-md">
                  <div className="pa3">
                    <CardPost
                      i={i}
                      item={items && items[i]}
                      placeholder={!items.length}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
