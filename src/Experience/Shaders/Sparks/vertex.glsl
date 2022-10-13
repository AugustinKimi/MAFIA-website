varying vec2 vUv;
varying vec3 vPosition;
varying float vRotation;
varying float vRotationSpeed;

uniform float uTime;

attribute float aScale;
attribute float aRandomSpeed;
attribute float aOffset;
attribute float aRotation;
attribute float aRotationSpeed;

void main(){


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float fourier = mod((uTime) * 0.005 * aRandomSpeed, 100.0) / 100.0;
    modelPosition.x += sin((uTime) * 0.0002 * aRandomSpeed + aOffset) * 0.5 ;

    if(modelPosition.y >= -1.0){
        modelPosition.y = -4.0 ;
    }

    modelPosition.y = modelPosition.y + fourier * 4.0;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;


    gl_PointSize = aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);   
    vUv = uv;
    vPosition = modelPosition.xyz;
    vRotation = aRotation;
    vRotationSpeed = aRotationSpeed;
}