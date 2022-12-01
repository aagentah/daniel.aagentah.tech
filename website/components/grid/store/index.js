import { useEffect, useState } from 'react';

import Container from '~/components/layout/container';
import CardStore from '~/components/card/store';

import { getAllStore } from '~/lib/sanity/requests';

export default function GridItems({ padding, marginTop, marginBottom }) {
  const [items, setItems] = useState(null);
  const [itemsLength, setItemsLength] = useState(12);

  useEffect(() => {
    const getItems = async () => {
      const itemsData = await getAllStore();
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
                    <CardStore i={i} item={items && items[i]} />
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
