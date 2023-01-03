import { Icon } from 'next-pattern-library';

import Container from '../container';

export default function Footer() {
  const iconFacebook = <Icon icon={['fab', 'facebook']} />;
  const iconInstagram = <Icon icon={['fab', 'twitter']} />;
  const iconEmail = <Icon icon={['fas', 'envelope']} />;

  return (
    <footer className="footer  flex  align-center  justify-center">
      <Container>
        <div className="flex  justify-center  mb3">
          <p className="t-secondary  bold  f5  lh-copy  almost-black  tac  dib  mla  mra">
            Daniel aagentah {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex  justify-center  mb4">
          <div className="dib  mr3  flex  justify-center  align-center">
            <a className="almost-black  f4" href="" target="_blank">
              {iconFacebook}
            </a>
          </div>
          <div className="dib  mr3  flex  justify-center  align-center">
            <a className="almost-black  f4" href="" target="_blank">
              {iconInstagram}
            </a>
          </div>
          <div className="dib  mr3  flex  justify-center  align-center">
            <a className="almost-black  f4" href="" target="_blank">
              {iconEmail}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
