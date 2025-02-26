import { DirectionalLight, type WebGLRendererParameters } from 'three';
import { type ConfigOptions } from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    properties: Record<
      string,
      string | number[] | Record<string, string | number[]>
    >;
  }[];
};

export const GLOBE_ELEMENT_ID = 'network-globe-threejs';
export const GLOBE_DATA_URL =
  'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/country-polygons/ne_110m_admin_0_countries.geojson';
export const GLOBE_IMAGE_URL =
  'https://images.ctfassets.net/2vm221913gep/71zMJnM3zRWu04Slh6GPrH/97ab6a889aa82937e1272ff600c1016f/Telnyx_Website_World_Map_For_Globe-fs8.png';
export const GLOBE_SHOW_ATMOSPHERE = true;
export const GLOBE_BACKGROUND_COLOR = 'rgba(0,0,0,0)';
export const GLOBE_ATMOSPHERE_COLOR = '#0E0EAF';
export const GLOBE_POLYGON_CAP_COLOR = '#0E0EAF';
export const GLOBE_POLYGON_SIDE_COLOR = '#0E0EAF';
export const GLOBE_POLYGON_STROKE_COLOR = '#3434EF';
export const GLOBE_ATMOSPHERE_ALTITUDE = 0.125;
export const GLOBE_CONFIG_OPTIONS: ConfigOptions = {
  waitForGlobeReady: true,
  animateIn: false,
};
export const GLOBE_WEBGL_RENDERER_PARAMETERS: WebGLRendererParameters = {
  alpha: true,
  antialias: true,
  precision: 'highp',
};

// face to America north-east coast
export const GLOBE_POSITION = { lat: -8, lng: -36.6 };

export const GLOBE_LIGHT_COLOR = 0xffffff;
export const GLOBE_LIGHT_INTENSITY = Math.PI * 1;
export const GLOBE_LIGHT_POSITION: Pick<
  DirectionalLight['position'],
  'x' | 'y' | 'z'
> = {
  x: -1,
  y: -0.75,
  z: 1,
};

export const GLOBE_AMBIENT_LIGHT_INTENSITY = 1;
export const GLOBE_AMBIENT_LIGHT_COLOR = 0x20208e;

export const GLOBE_CAMERA = {
  zoom: 1.56,
};

export const GLOBE_ROTATION_INTERVAL_MS = 30000;

export const GLOBE_CONTROLS: Pick<
  OrbitControls,
  | 'autoRotate'
  | 'autoRotateSpeed'
  | 'enableDamping'
  | 'enablePan'
  | 'enableZoom'
  | 'enableDamping'
  | 'rotateSpeed'
  | 'minPolarAngle'
  | 'maxPolarAngle'
> = {
  autoRotate: false,
  autoRotateSpeed: 0.125,
  enableDamping: true,
  enablePan: false,
  enableZoom: false,
  rotateSpeed: 0.0625,
  minPolarAngle: Math.PI / 3.5,
  maxPolarAngle: Math.PI - Math.PI / 3,
};

export const VISIBILITY_ANIMATION_MS = 1500;
