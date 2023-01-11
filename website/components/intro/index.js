import useState from 'react-usestateref';
import classNames from 'classnames';
import { useRef, useEffect } from 'react';

import Image from '~/components/elements/image';

import { useApp } from '~/context-provider/app';

/**
 * @param {string} image [required]
 * @param {string} title [required]
 * @param {string} description
 * @param {string} heroButtonText
 * @param {string} link
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 * @param {string} skeleton [required]
 **/

export default function HeroDefault({
  //
  modifier,
  marginTop,
  marginBottom,
  styles,
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 420 : 420;
  const imageHeight = app?.deviceSize === 'md' ? null : 400;
  const [inputValue, setInputValue] = useState('');
  const [enteredValue, setEnteredValue] = useState('');
  const [responseValue, setResponseValue] = useState('');
  const [hasPlanetRendered, setHasPlanetRendered] = useState(false);
  const [emailInputActive, setEmailInputActive] = useState(false);
  const lastRef = useRef(null);

  useEffect(() => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  }, []);

  useEffect(() => {
    renderPlanet();
  }, []);

  const handleInputBlur = event => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  };

  const [terminal, setTerminal, terminalRef] = useState([
    <p>init exo:navigator</p>,
    <h1 className="primary-color">
      <span className="black">usr</span>&nbsp;daniel.aagentah
    </h1>,
    <p>
      {app?.deviceSize === 'md' ? 'select' : 'type'} "
      <span
        className="underline  cp"
        onClick={() => handleSubmit(null, 'prompts')}
      >
        prompts
      </span>
      "
    </p>
  ]);

  const commandClass = classNames({
    email: emailInputActive
  });

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputChange = event => {
    let value = event.target.value;

    setInputValue(value);
  };

  const handleSubmit = (e, prompt) => {
    if (e) {
      e.preventDefault();
    }

    let val = prompt || inputValue;
    val = val.toLowerCase();

    const firstLines = [];
    const nextLines = [];
    let filterTerminal = terminalRef.current;

    if (val) {
      firstLines.push(val);

      for (let i = 0; i < terminalRef.current.length; i++) {
        if (filterTerminal.length > 7) {
          filterTerminal = filterTerminal.filter((item, i) => i !== 0);
        } else {
          break;
        }
      }

      setTerminal([...filterTerminal, ...firstLines]);
      setInputValue('');
      setEnteredValue(val);
    }

    setTimeout(() => {
      filterTerminal = terminalRef.current;

      if (emailInputActive && validateEmail(val)) {
        setEmailInputActive(false);
        nextLines.push('subscribe succesful');
      } else {
        switch (val) {
          case 'prompts':
            nextLines.push(
              <p>
                available prompts:
                <span className="db">
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'projects')}
                  >
                    planet.midi
                  </span>
                  "
                  <br />
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'music')}
                  >
                    planet.switch
                  </span>
                  "
                  <br />
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'posts')}
                  >
                    planet.data
                  </span>
                  "
                </span>
              </p>
            );
            break;
          case 'showPrompts':
            nextLines.push('showPrompts');
            break;
          case 'projects':
            nextLines.push('exec projects.render();');
            break;
          case 'subscribe':
            setEmailInputActive(true);
            nextLines.push(
              <p>
                please enter email or{' '}
                <span
                  className="underline  cp"
                  onClick={() => handleSubmit(null, 'cancel')}
                >
                  "cancel"
                </span>
              </p>
            );
            break;
          case 'cancel':
            setEmailInputActive(false);
            nextLines.push('subscribe cancelled');
            break;
          case 'escape':
            nextLines.push('there is no escape...');
            break;
          default:
            if (val) {
              nextLines.push(`unknown: "${val}"`);
            } else {
              nextLines.push('');
            }
        }
      }

      for (let i = 0; i < terminalRef.current.length; i++) {
        if (filterTerminal.length > 7) {
          filterTerminal = filterTerminal.filter((item, i) => i !== 0);
        } else {
          break;
        }
      }

      setTerminal([...filterTerminal, ...nextLines]);
      setInputValue('');
      setEnteredValue(val);
    }, 300);
  };

  const renderPlanet = () => {
    if (hasPlanetRendered) {
      return;
    }

    let container;
    let stats;
    let camera;
    let scene;
    let renderer;
    let group;
    let mouseX = 0;
    let mouseY = 0;
    let loader;
    let id;
    let windowHalfX;
    let windowHalfY;

    // let kickId = 0;

    const rotateRand = () => {
      // const kickId = Planet.kickId;

      const random_boolean1 = Math.random() < 0.5;
      const random_boolean2 = Math.random() < 0.5;

      const ran1And9 = () => {
        return Math.floor(Math.random() * 1) + 1;
      };

      const action = () => {
        // if (kickId !== Planet.kickId) {
        // window.clearInterval(intervalListener);
        // }

        group.rotation.y = group.rotation.y;
        group.rotation.x = group.rotation.x;

        if (random_boolean1) {
          if (random_boolean2) {
            group.rotation.y += parseFloat(`0.001`);
            group.rotation.x -= parseFloat(`0.001`);
          } else {
            group.rotation.y -= parseFloat(`0.001`);
            group.rotation.x += parseFloat(`0.001`);
          }
        } else if (random_boolean2) {
          group.rotation.y += parseFloat(`0.001`);
          group.rotation.x += parseFloat(`0.001`);
        } else {
          group.rotation.y -= parseFloat(`0.001`);
          group.rotation.x -= parseFloat(`0.001`);
        }
      };

      const intervalListener = self.setInterval(() => {
        action();
      }, 10);
    };

    // document.querySelector('.js-btn-scale-up').addEventListener(
    //   'click',
    //   () => {
    //     animate();
    //     const scale = 0.005;
    //
    //     const intervalListener = self.setInterval(() => {
    //       action();
    //     }, 10);
    //
    //     const action = () => {
    //       if (group.scale.x >= 1) {
    //         group.scale.set(1, 1, 1);
    //         cancelAnimationFrame(id);
    //         // requestAnimationFrame(animate);
    //         window.clearInterval(intervalListener);
    //       } else {
    //         group.scale.x += scale;
    //         group.scale.y += scale;
    //         group.scale.z += scale;
    //       }
    //     };
    //   },
    //   false
    // );

    function init() {
      container = document.querySelector('.planet');
      console.log('container', container);

      windowHalfX = container.clientWidth;
      windowHalfY = container.clientHeight;

      camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        1,
        2000
      );
      camera.position.z = 500;

      scene = new THREE.Scene();

      group = new THREE.Group();
      scene.add(group);

      // earth

      loader = new THREE.TextureLoader();

      loader.load('/images/ceres.jpg', function(texture) {
        const times = app?.deviceSize === 'md' ? 0 : 45;

        let geometry = new THREE.SphereGeometry(
          container.clientWidth - (container.clientWidth / 100) * times,
          20,
          20
        );

        let material = new THREE.MeshBasicMaterial({
          map: texture,
          overdraw: 0.5
        });
        let mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      });

      // shadow

      let canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;

      let context = canvas.getContext('2d');
      let gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      let texture = new THREE.CanvasTexture(canvas);

      let geometry = new THREE.PlaneBufferGeometry(300, 300, 3, 3);
      let material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = -250;
      mesh.rotation.x = -Math.PI / 2;
      group.add(mesh);

      renderer = new THREE.CanvasRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // stats = new Stats();
      // container.appendChild(stats.dom);

      // document.addEventListener('mousemove', onDocumentMouseMove, false);

      //

      // window.addEventListener('resize', onWindowResize, false);
    }

    // function onWindowResize() {
    //   windowHalfX = container.clientWidth;
    //   windowHalfY = container.clientHeight;
    //
    //   camera.aspect = container.clientWidth / container.clientHeight;
    //   camera.updateProjectionMatrix();
    //
    //   renderer.setSize(container.clientWidth, container.clientHeight);
    // }

    // function onDocumentMouseMove(event) {
    //   mouseX = event.clientX - windowHalfX;
    //   mouseY = event.clientY - windowHalfY;
    // }

    //

    function animate() {
      id = requestAnimationFrame(animate);
      render();
      // stats.update();
    }

    function render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    init();
    animate();

    rotateRand();

    group.scale.set(0.5, 0.5, 0.5);
    renderer.setClearColor(0x000000, 0);
    setHasPlanetRendered(true);
  };

  return (
    <>
      <article
        className={`
        intro
        ${modifier && `intro--${modifier}`}
        mt${marginTop}
        mb${marginBottom}
      `}
        style={styles}
      >
        {
          // <img
          //   className="intro__image--mobile  db  dn-md"
          //   src="/images/logo-black.png"
          // />
        }

        <div className="intro__barcode  absolute  top  left  ml3">
          <Image
            /* Options */
            src="/images/barcode-black.png"
            placeholder={null}
            alt={null}
            figcaption={null}
            height={75}
            width={null}
            customClass={null}
            skeleton={skeleton}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="intro__terminal  flex  flex-wrap  justify-center  col-24  ph4">
          <div className="col-24  col-1-md" />
          <div className="intro__image  col-24  col-13-md  justify-center  justify-end-md  mb4  mb0-md">
            {
              // <Image
              //   /* Options */
              //   src="/images/logo-black.png"
              //   placeholder={null}
              //   alt={null}
              //   figcaption={null}
              //   height={imageHeight}
              //   width={null}
              //   customClass={null}
              //   skeleton={skeleton}
              //   onClick={null}
              //   /* Children */
              //   withLinkProps={null}
              // />
            }

            <div className="planet" />

            <img className="planet__hud" src="/images/hud-2.png" />
          </div>

          <div className="col-24  col-10-md  flex  align-center  justify-start  justify-start-md  ph0  ph3-md">
            <div className="terminal__prompt__wrapper  db  t-primary">
              {terminal.map((string, i) => (
                <p
                  className={`terminal__prompt  terminal__prompt--${i +
                    1}  tal`}
                >
                  <span className="terminal__prompt__content" />
                  <p className="f5  f4-md  db  pb2  t-primary">$ {string}</p>
                </p>
              ))}

              <p
                className={`terminal__prompt  terminal__prompt--command  ${commandClass}  tal`}
              >
                <p className="f5  f3-md  db  t-primary">
                  ${' '}
                  {
                    // <span className="terminal__prompt__value">{inputValue}</span>
                  }
                  {!inputValue && <span className="dib  blink">_</span>}
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    ref={lastRef}
                    onBlur={handleInputBlur}
                    maxLength={25}
                    name="terminal"
                    autoFocus
                    className="terminal__input"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={inputValue}
                    placeholder=""
                  />
                </form>
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
