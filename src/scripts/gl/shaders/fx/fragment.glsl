precision highp float;

varying vec2 vUv;
// Default uniform for previous pass is 'tMap'.
// Can change this using the 'textureUniform' property
// when adding a pass.
uniform sampler2D tMap;
uniform float uTime;

void main() {
  float t = uTime;
  vec2 uv = vUv;

  vec4 raw = texture2D(tMap, uv);
  gl_FragColor = raw;
}