import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ParticleMesh  from './classes/ParticleMesh'

export default class Sketch {
    constructor(options) {
      this.time = 0
      this.particleTexture = new THREE.TextureLoader().load( './images/1.png' )
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
      
      this.controls = new OrbitControls( this.camera, this.renderer.domElement )
      this.controls.enableDamping = true

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
  
    addObjects()
    {
      /**
       * Geometries
       */
       this.params = 
       {
         sampleGeometry: new THREE.IcosahedronBufferGeometry( 0.2, 5),
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
         }
       }
   

      this.particlesMesh = new ParticleMesh( this.params )


      console.log( this.particlesMesh.particles)
      this.scene.add( this.particlesMesh.particles )

      

    }
  
    render() {
      this.time += 0.02
      
      this.particlesMesh.particles.rotation.y = this.time * 0.2
      this.particlesMesh.particles.rotation.z = this.time * 0.2

      this.renderer.render( this.scene, this.camera )
      window.requestAnimationFrame(this.render.bind(this))
      this.controls.update()
    }
  }
  
  new Sketch(
    {
    dom: document.getElementById('webGL'),
    color: 0xff6600,
    color2: 0xffffcc,
  });