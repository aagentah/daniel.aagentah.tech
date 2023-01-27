import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';

import deviceSize from '~/lib/device-size';

export default function Layout({ meta, navWhite, preview, children }) {
  // set device type in context API
  deviceSize();

  const titleClass = meta?.title?.replace(/\s+/g, '-').toLowerCase();
  const pageClass = meta?.pageClass;

  return (
    <>
      <Meta {...meta} />
      {preview && <Alert preview={preview} />}
      <div className={`page  page--${titleClass}  page--${pageClass}`}>
        <Header navWhite={navWhite} {...meta} />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
