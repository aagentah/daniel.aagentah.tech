import dynamic from 'next/dynamic';

import Container from '../container';

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

export default function Footer() {
  return (
    <footer className="footer  flex  align-center  justify-center">
      <Container>
        <div className="col-24  flex  flex-wrap  justify-center  pb3  ph3  ph0-md">
          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/daniel.aagentah/"
              target="_blank"
              rel="noreferrer"
            >
              <IconInstagram color="white" size={30} />
            </a>
          </div>

          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Soundcloud"
              href="https://soundcloud.com/aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconSoundcloud color="white" size={30} />
            </a>
          </div>
          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Youtube"
              href="https://www.youtube.com/@daniel.aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconYoutube color="white" size={30} />
            </a>
          </div>

          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Spotify"
              href="https://open.spotify.com/artist/5sAlVt0dBip3YMS6di8JJw?si=GR11QkY8RVySAvsvLMRodg"
              target="_blank"
              rel="noreferrer"
            >
              <IconSpotify color="white" size={30} />
            </a>
          </div>

          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Github"
              href="https://github.com/aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub color="white" size={30} />
            </a>
          </div>

          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Twitter"
              href="https://twitter.com/Aagentah"
              target="_blank"
              rel="noreferrer"
            >
              <IconTwitter color="white" size={30} />
            </a>
          </div>

          <div className="col-6  col-3-md  flex  justify-center  pt4  pt0-md">
            <a
              aria-label="Bandcamp"
              href="https://aagentah.bandcamp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <IconBandcamp color="white" size={30} />
            </a>
          </div>
        </div>

        <div className="flex  justify-center  pt4">
          <p className="t-secondary  bold  f5  lh-copy  almost-white  tac  dib  mla  mra">
            Daniel Aagentah {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}
