precision highp float;

varying vec2 vUv;
// Default uniform for previous pass is 'tMap'.
// Can change this using the 'textureUniform' property
// when adding a pass.
uniform sampler2D tMap;
uniform vec2 uResolution;
uniform float uTime;

void main() {
  float t = uTime;
  float ratio = uResolution.x / uResolution.y;
  vec2 uv = vUv;

  vec2 dir = (uv * vec2(ratio, 1.0)) - vec2(0.5 * ratio, 0.5);
  float freq = 30.0;
  float amp = 0.01;
  float dist = sin(length(dir) * freq + t) * amp;
  
  float r = texture2D(tMap, uv + dist * 1.1).r;
  float g = texture2D(tMap, uv + dist * 1.4).g;
  float b = texture2D(tMap, uv + dist * 1.8).b;

  vec3 scene = vec3(r, g, b);

  gl_FragColor = vec4(scene, 1.0);
}