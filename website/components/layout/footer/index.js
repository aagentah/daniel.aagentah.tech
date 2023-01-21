import dynamic from 'next/dynamic';

import Container from '../container';

const IconInstagram = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconInstagram)
);

const IconSoundcloud = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconSoundcloud)
);

const IconYoutube = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconYoutube)
);

const IconSpotify = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconSpotify)
);

export default function Footer() {
  return (
    <footer className="footer  flex  align-center  justify-center">
      <Container>
        <div className="col-24  flex  justify-center  pb3  ph3  ph0-md">
          <div className="col-8  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/daniel.aagentah/"
              target="_blank"
              rel="noreferrer"
            >
              <IconInstagram color="black" size={30} />
            </a>
          </div>

          <div className="col-8  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Soundcloud"
              href="https://soundcloud.com/aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconSoundcloud color="black" size={30} />
            </a>
          </div>
          <div className="col-8  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Youtube"
              href="https://www.youtube.com/@daniel.aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconYoutube color="black" size={30} />
            </a>
          </div>

          <div className="col-8  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Spotify"
              href="https://open.spotify.com/artist/5sAlVt0dBip3YMS6di8JJw?si=GR11QkY8RVySAvsvLMRodg"
              target="_blank"
              rel="noreferrer"
            >
              <IconSpotify color="black" size={30} />
            </a>
          </div>
        </div>

        <div className="flex  justify-center  pt4">
          <p className="t-secondary  bold  f5  lh-copy  almost-black  tac  dib  mla  mra">
            Daniel Aagentah {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}
