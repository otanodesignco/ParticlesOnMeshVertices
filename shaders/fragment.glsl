uniform sampler2D uTexture;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vPos;
varying vec2 vUv;


void main()
{

    vec4 particleTexture = texture2D( uTexture, gl_PointCoord );
    float distanceToCenter = distance( gl_PointCoord, vec2(0.5) );
    float strength = 0.05 / distanceToCenter - 0.1;

    vec3 particleColor = mix( uColor1, uColor2, clamp(strength, 0., 1. ) );



    particleTexture.xyz *= particleColor;

    gl_FragColor = vec4( particleTexture );

}