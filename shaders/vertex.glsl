uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying vec3 vPos;

float PI = 3.141592653589793238;

void main()
{

    vUv = uv;
    vPos = position;

    vec4 mvPosition = modelViewMatrix * vec4( vPos, 1. );
    gl_PointSize = 5. * ( 1. / - mvPosition.z );
    // size attenuation to reduce size based on position from camera
    gl_PointSize *= ( 1. / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;

}