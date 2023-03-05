import useState from 'react-usestateref';
import classNames from 'classnames';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

import { useApp } from '~/context-provider/app';

const Prompt = dynamic(() => import('~/components/intro/prompt'));
const Midi = dynamic(() => import('~/components/intro/midi'));

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

export default function Intro({
  //
  modifier,
  marginTop,
  marginBottom,
  styles,
  skeleton,
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 420 : 420;
  const imageHeight = app?.deviceSize === 'md' ? null : 400;
  const [hasPlanetRendered, setHasPlanetRendered] = useState(false);
  const [midiActive, setMidiActive] = useState(false);
  const [promptActive, setPromptActive] = useState(true);
  const [rotate, setRotate] = useState({});
  const [rotate2, setRotate2] = useState({});

  useEffect(() => {
    const handleR1 = () => {
      let spin = Math.round(Math.random() * 180);
      setRotate({ transform: `rotate(${spin}deg)` });

      setInterval(() => {
        spin = Math.round(Math.random() * 180);
        setRotate({ transform: `rotate(${spin}deg)` });
      }, 5000);
    };

    const handleR2 = () => {
      let spin = Math.round(Math.random() * 180);
      setRotate2({ transform: `rotate(${spin}deg)` });

      setInterval(() => {
        spin = Math.round(Math.random() * 180);
        setRotate2({ transform: `rotate(${spin}deg)` });
      }, 5000);
    };

    handleR1();
    setTimeout(() => {
      handleR2();
    }, 2500);
  }, []);

  useEffect(() => {
    const img = new Image();

    console.log('loading');

    img.onload = function () {
      console.log('loaded');
      renderPlanet();
    };

    img.onerror = function () {
      console.log('not loaded');
      renderPlanet();
    };

    img.src = '/images/ceres.jpg';
  }, []);

  const promptWrapperClass = classNames({
    active: !midiActive,
  });

  const midiWrapperClass = classNames({
    active: midiActive,
  });

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
    let loaderLoaded = false;

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
      container = document.querySelector('.intro__planet');
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

      loader.load('/images/ceres.jpg', function (texture) {
        const percent = container.clientWidth / 100;
        const percentBy = app?.deviceSize === 'md' ? 15 : 50;
        const percentOf = percent * percentBy;
        loaderLoaded = true;

        let geometry = new THREE.SphereGeometry(
          container.clientWidth - percentOf,
          20,
          20
        );

        let material = new THREE.MeshBasicMaterial({
          map: texture,
          overdraw: 0.5,
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
        overdraw: 0.5,
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = -250;
      mesh.rotation.x = -Math.PI / 2;
      group.add(mesh);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      // renderer.setPixelRatio(window?.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // stats = new Stats();
      // container.appendChild(stats.dom);

      // document.addEventListener('mousemove', onDocumentMouseMove, false);

      //

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      windowHalfX = container.clientWidth;
      windowHalfY = container.clientHeight;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth, container.clientHeight);
    }

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

    setInterval(() => {
      if (!hasPlanetRendered && loaderLoaded) {
        setHasPlanetRendered(true);
      }
    }, 50);
  };

  return (
    <>
      <article
        className={`
          intro
          ${modifier && `intro--${modifier}`}
          ${hasPlanetRendered ? 'loaded' : ''}
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

        {
          //    <div className="intro__barcode  absolute  top  left  ml3">
          //    <Image
          //      /* Options */
          //      src="/images/barcode-black.png"
          //      placeholder={null}
          //      alt={null}
          //      figcaption={null}
          //      height={75}
          //      width={null}
          //      customClass={null}
          //      skeleton={skeleton}
          //      onClick={null}
          //      /* Children */
          //      withLinkProps={null}
          //    />
          //  </div>
        }

        <div className="intro__section  flex  flex-wrap  justify-center  align-center  col-24  ph4  pt5  pt0-md">
          <div className="col-24  col-1-md" />
          <div className="intro__planet__wrapper  col-24  col-11-sm  col-13-lg  justify-center  justify-end-md  mb4  mb0-md">
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

            <div className="intro__planet" />

            <div
              className="planet__hud__wrapper  planet__hud__wrapper--1"
              style={rotate}
            >
              <img className="planet__hud" src="/images/hud-outside.png" />
            </div>

            <div
              className="planet__hud__wrapper  planet__hud__wrapper--2"
              style={rotate2}
            >
              <img className="planet__hud" src="/images/hud-inside.png" />
            </div>
          </div>

          <div className="intro__dialog  col-24  col-7-sm  col-10-lg  flex  justify-center  justify-start-md  tac  tal-md  align-start  align-center-md  relative  ph0  ph3-md  pt3  pt0-md">
            <Prompt
              active={promptActive}
              setMidiActive={setMidiActive}
              setPromptActive={setPromptActive}
            />

            {typeof window !== 'undefined' && (
              <Midi
                active={midiActive}
                setMidiActive={setMidiActive}
                setPromptActive={setPromptActive}
              />
            )}
          </div>
        </div>
      </article>
    </>
  );
}
