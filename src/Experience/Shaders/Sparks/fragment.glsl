varying vec2 vUv;
varying vec3 vPosition;
varying float vRotation;
varying float vRotationSpeed;

uniform vec3 uColor;
uniform vec3 uInsideColor;
uniform vec3 uOutsideColor;
uniform float uTime;


vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}


void main(){
    vec2 newUv = gl_PointCoord;
    newUv = rotateUV(newUv, vRotation * uTime * 0.004 * vRotationSpeed);


    float strength = smoothstep( 0.6, 0.8, 1.0 - distance(vec2(0.5), newUv));
    strength = 0.05 / (distance(vec2(newUv.x, (newUv.y - 0.5) * 3.0 + 0.5), vec2(0.5)));

    float fadeAlpha = 1.0 - smoothstep(-1.8, 0.0, vPosition.y);
    vec3 color = mix(uOutsideColor, uInsideColor, strength  );

    gl_FragColor = vec4(color, (fadeAlpha * strength) - 0.3);
}