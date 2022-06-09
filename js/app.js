import * as THREE from 'three';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

export default class Sketch {
    constructor(options) {
      this.time = 0
      this.particleTexture = new THREE.TextureLoader().load( './images/1.png' )
      console.log ( this.particleTexture )
      this.dom = options.dom
      this.scene = new THREE.Scene()
      this.color = options.color
      this.color2 = options.color2
      this.width = this.dom.offsetWidth
      this.height = this.dom.offsetHeight
  
      this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.01, 10)
      this.camera.position.z = 1
  
      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.dom.appendChild( this.renderer.domElement )
  
      this.resize()
      this.setupResize()
      this.addObjects()
      this.render()
    }
  
    resize() {
      this.width = this.dom.offsetWidth
      this.height = this.dom.offsetHeight
      this.renderer.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
    }
  
    setupResize() {
      window.addEventListener('resize', this.resize.bind(this))
    }
  
    addObjects() {
      /**
       * Geometries
       */

      this.planeGeometry = new THREE.PlaneBufferGeometry( 2, 2, 30, 30 )
      // points material to position the particles on the planes vertices

      //particles geometry
      this.particleGeometry = new THREE.BufferGeometry();
      

      /**
       * Materials
       */

      // plane material
      this.planeMaterial = new THREE.MeshBasicMaterial(
        {
          wireframe: true,
          color: 0xffffff,
        }
      )

      // particle material
      this.particleMaterial = new THREE.ShaderMaterial({
        uniforms: 
        {
          uTime: 
          {
            value : 0
          },
          uColor1: 
          {
            value: new THREE.Color( this.color )
          },
          uColor2: 
          {
            value: new THREE.Color( this.color2 )
          },
          uTexture:
          {
            value: this.particleTexture
          },
        },
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        fragmentShader: fragment,
        vertexShader: vertex,
      })
      
      /**
       * Meshes
       */

      this.plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial )
      this.particles = new THREE.Points( this.particleGeometry, this.particleMaterial )

      // this.plane.rotation.x = Math.PI / 2
      // this.plane.position.y = - 0.2

      /**
         * calculate the particle positions based of the planes vertices
         */

        // store vertices count of plane
        const planeVerticesCount = this.planeGeometry.attributes.position.array.length
        // new float32array using the planes vertices count as the size of the array
        const vertexArray = new Float32Array( planeVerticesCount )
        // iterate over the array to generate the particles position based on the vertices
        for( let i = 0; i < planeVerticesCount; i++ )
        {
          // Iterate over particle positions and assign array with coords based on the planes vertices
            vertexArray[ i ] = this.plane.geometry.attributes.position.array[ i ]
            vertexArray[ i + 1 ] = this.planeGeometry.attributes.position.array[ i + 1 ]
            vertexArray[ i + 2 ]= this.planeGeometry.attributes.position.array[ i + 2 ]
          // add a new object to the positions array that holds  x, y, z coords
          
            
        }

        //console.log(2601 * 3); // positions of the particles if we use a raw array vs array of objects
        //console.log( vertexArray )

        this.particleGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertexArray , 3 ) )

      /**
       * Add meshes / particles to scene
       */

      // this.scene.add( this.plane )
      this.scene.add( this.particles )

      this.particles.rotation.x = -87 * ( Math.PI / 180 )
      this.particles.position.y =  - 0.2

    }
  
    render() {
      this.time += 0.02
  
      this.particleMaterial.uniforms.uTime.value = this.time
  
      this.renderer.render( this.scene, this.camera )
      window.requestAnimationFrame(this.render.bind(this))
    }
  }
  
  new Sketch(
    {
    dom: document.getElementById('webGL'),
    color: 0xff6600,
    color2: 0xffffcc,
  });