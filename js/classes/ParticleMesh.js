import { ShaderMaterial, BufferGeometry, Points, AdditiveBlending, BufferAttribute, Vector3 } from 'three'
import vertexShader from '../../shaders/vertex.glsl'
import fragmentShader from '../../shaders/fragment.glsl'

// creates a particle mesh from a geometry
export default class ParticleMesh
{

    constructor( obj )
    {
        this.sampleGeometry = obj.sampleGeometry
        this.uniforms = obj.uniforms
        this.geometry = new BufferGeometry()
        this.material = new ShaderMaterial(
            {
                uniforms: this.uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                blending: AdditiveBlending,
            })

            this.generateMesh()
    }

    generateMesh()
    {
        // store vertices count of sample geometry
        const planeVerticesCount = this.sampleGeometry.attributes.position.array.length

        let coords = []
        // new float32array using the sample geometry vertices
        this.vertexArray = new Float32Array( planeVerticesCount )
        // iterate over the array to generate the particles position based on the sample geometries vertices
        for( let i = 0; i < planeVerticesCount; i+=3 )
        {
          // assign position values to x, y, z temp variables each set
          const x = this.sampleGeometry.attributes.position.array[ i ]
          const y = this.sampleGeometry.attributes.position.array[ i + 1 ]
          const z = this.sampleGeometry.attributes.position.array[ i + 2 ]
          // add each set to a coords array
          coords.push(
          {
            x: x,
            y: y,
            z: z,
          })
        }
        // iterate over array of point objects
        for( let j = 0; j < coords.length; j++ )
        {
          // iterate over points array and check for duplicates and if none add to final array
          let exists = false
          
          let tmpPoints = coords[ j ]
          let tmpPos = []

          for( let k = 0; k < tmpPos.length; k++ )
          {
            if( tmpPoints[k].x == coords[j].x && tmpPoints[k].y == coords[j].y && tmpPoints[k].z == coords[j].z)
            {
              exists = true
            }
          }

          if( !exists )
          {
            this.vertexArray.set(
            [
              coords[j].x,
              coords[j].y,
              coords[j].z
            ],
            j * 3
            )
          }
        }
        console.log( this.sampleGeometry.attributes.position.array.length )
        console.log( this.vertexArray.length )

        // set attribute for particle position
        this.geometry.setAttribute( 'position', new BufferAttribute( this.vertexArray , 3 ) )

        this.particles = new Points( this.geometry, this.material ) 
    }


}