#extension GL_OES_standard_derivatives : enable

precision highp float;
precision highp int;

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D tMap;

void main() {
  vec3 tex = texture2D(tMap, vUv).rgb;
  float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
  float d = fwidth(signedDist);
  float alpha = smoothstep(-d, d, signedDist);

  if (alpha < 0.01) discard;
  
  gl_FragColor.rgb = uColor;
  gl_FragColor.a = alpha;
}