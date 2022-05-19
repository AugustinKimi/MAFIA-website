varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform float uProgress;
uniform vec3 uDarkColor;
uniform vec3 uAccentColor;
uniform vec3 uProgressColor;



void main() {
    vec2 newUv = vUv;
    float strength = 0.05 / (distance(vec2(newUv.x, (newUv.y + 0.3) * 1.2), vec2(0.5, 0.5)) * 0.5) - 0.3;
    vec3 progressColor = mix(uDarkColor, uAccentColor, uProgress);
    vec3 mixedColor = mix(uDarkColor, progressColor, strength );

    gl_FragColor = vec4(mixedColor, 1.0);
}