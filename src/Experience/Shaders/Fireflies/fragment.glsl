uniform vec3 uInsideColor;
uniform vec3 uOutsideColor;



void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    vec3 color =  mix(uOutsideColor, uInsideColor, strength);

    gl_FragColor = vec4(color, strength);
}