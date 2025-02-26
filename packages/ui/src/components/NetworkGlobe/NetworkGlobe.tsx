import { useLayoutEffect, useState } from 'react';
import {
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
} from 'three';
import ThreeGlobe, { type GlobeInstance } from 'globe.gl';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import isMobileUserAgent from '../../utils/isMobileUserAgent';
import {
  GLOBE_IMAGE_URL,
  GLOBE_BACKGROUND_COLOR,
  GLOBE_ATMOSPHERE_ALTITUDE,
  GLOBE_ATMOSPHERE_COLOR,
  GLOBE_CONFIG_OPTIONS,
  GLOBE_CONTROLS,
  GLOBE_ELEMENT_ID,
  GLOBE_SHOW_ATMOSPHERE,
  GLOBE_WEBGL_RENDERER_PARAMETERS,
  GLOBE_LIGHT_COLOR,
  GLOBE_LIGHT_INTENSITY,
  GLOBE_LIGHT_POSITION,
  GLOBE_AMBIENT_LIGHT_INTENSITY,
  GLOBE_POSITION,
  GLOBE_CAMERA,
  GLOBE_AMBIENT_LIGHT_COLOR,
  GLOBE_ROTATION_INTERVAL_MS,
  VISIBILITY_ANIMATION_MS,
} from './utils';
import * as css from './NetworkGlobe.styled';

let orbitControls: OrbitControls;
let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let Globe: GlobeInstance | undefined;

function onWindowResize() {
  const globeElement = document.getElementById(GLOBE_ELEMENT_ID);

  if (!globeElement || !Globe) return;

  Globe.pauseAnimation();
  globeElement.style.visibility = 'hidden';
  Globe.width(window.innerWidth);
  Globe.height(window.innerHeight);

  setTimeout(() => {
    Globe?.resumeAnimation();
    globeElement.style.visibility = 'inherit';
  }, VISIBILITY_ANIMATION_MS);
}

function animate() {
  const globeElement = document.getElementById(GLOBE_ELEMENT_ID);

  if (!globeElement || !Globe) {
    console.error('Failed to attach globe to DOM Element');
    return;
  }

  Globe(globeElement);

  const directionalLight = new DirectionalLight(
    GLOBE_LIGHT_COLOR,
    GLOBE_LIGHT_INTENSITY
  );
  directionalLight.position.set(
    GLOBE_LIGHT_POSITION.x,
    GLOBE_LIGHT_POSITION.y,
    GLOBE_LIGHT_POSITION.z
  );

  const ambientLight = new AmbientLight(
    GLOBE_AMBIENT_LIGHT_COLOR,
    GLOBE_AMBIENT_LIGHT_INTENSITY
  );

  Globe.lights([ambientLight, directionalLight]);

  // Setup camera, light
  camera = Globe.camera();

  camera.aspect = window.innerWidth / window.innerHeight;

  // by layout
  camera.zoom = GLOBE_CAMERA.zoom;

  Globe.pointOfView(GLOBE_POSITION);

  // Setup camera controls
  orbitControls = Globe.controls();
  orbitControls.autoRotate = GLOBE_CONTROLS.autoRotate;
  orbitControls.autoRotateSpeed = GLOBE_CONTROLS.autoRotateSpeed;
  orbitControls.enableDamping = GLOBE_CONTROLS.enableDamping;
  orbitControls.enablePan = GLOBE_CONTROLS.enablePan;
  orbitControls.enableZoom = GLOBE_CONTROLS.enableZoom;
  orbitControls.minPolarAngle = GLOBE_CONTROLS.minPolarAngle;
  orbitControls.maxPolarAngle = GLOBE_CONTROLS.maxPolarAngle;
  orbitControls.rotateSpeed = GLOBE_CONTROLS.rotateSpeed;
  orbitControls.update();
}

async function loadGlobe(
  globeImageUrl: string,
  bumpImageUrl?: GlobeProps['bumpImageUrl'],
  configOptions = GLOBE_CONFIG_OPTIONS,
  webglRendererParameters = GLOBE_WEBGL_RENDERER_PARAMETERS
) {
  try {
    const globeElement = document.getElementById(GLOBE_ELEMENT_ID);

    if (!globeElement) return;

    // Setup renderer
    renderer = new WebGLRenderer(webglRendererParameters);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    Globe = ThreeGlobe({
      rendererConfig: webglRendererParameters,
      ...configOptions,
    })
      .globeImageUrl(globeImageUrl)
      .width(window.innerWidth)
      .height(window.innerHeight)
      .backgroundColor(GLOBE_BACKGROUND_COLOR)
      .showAtmosphere(GLOBE_SHOW_ATMOSPHERE)
      .atmosphereColor(GLOBE_ATMOSPHERE_COLOR)
      .atmosphereAltitude(GLOBE_ATMOSPHERE_ALTITUDE);

    if (bumpImageUrl) {
      Globe.bumpImageUrl(bumpImageUrl);
    }

    window.addEventListener('resize', onWindowResize, false);
  } catch (error) {
    console.error('Could not load Network Globe source data');
    console.error(error);
  }
}

// https://github.com/vasturiano/three-globe?tab=readme-ov-file#globe-layer
export interface GlobeProps {
  globeImageUrl?: string;
  bumpImageUrl?: string;
  visible?: boolean;
}

const NetworkGlobe = ({
  globeImageUrl = GLOBE_IMAGE_URL,
  bumpImageUrl,
  visible,
}: GlobeProps) => {
  const [hasSupport, setHasSupport] = useState(true);

  useLayoutEffect(() => {
    // DOTCOM-3134 - breaks on iOS, too much memory for a mobile device, too long to load
    const support = !isMobileUserAgent(navigator.userAgent);

    if (!support) {
      setHasSupport(!support);
      return;
    }

    loadGlobe(globeImageUrl, bumpImageUrl);
    animate();

    // make sure globe face doesn't get stuck into ocean for a full rotation
    const intervalRef = setInterval(() => {
      if (Globe) {
        Globe.controls().autoRotate = false;
        Globe.controls().update();
      }
    }, GLOBE_ROTATION_INTERVAL_MS);

    return () => {
      clearInterval(intervalRef);
      Globe?._destructor();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (Globe) {
      if (visible) {
        Globe.resumeAnimation();

        if (!Globe.controls().autoRotate) {
          Globe.controls().autoRotate = true;
          Globe.controls().update();
        }
      } else {
        Globe.pointOfView(GLOBE_POSITION);
        Globe.pauseAnimation();
      }
    }

    return () => {
      Globe?.pauseAnimation();
    };
  }, [visible]);

  if (!hasSupport) return null;

  return <css.Wrapper id={GLOBE_ELEMENT_ID}></css.Wrapper>;
};

export default NetworkGlobe;
