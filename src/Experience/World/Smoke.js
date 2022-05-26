import * as THREE from 'three'
import Experience from '../Experience'
import fragmentShader from '../Shaders/Smokes/fragment.glsl'
import vertexShader from '../Shaders/Smokes/vertex.glsl'


export default class Smoke {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes

        this.setSmokePlane()
    }

    setSmokePlane(){
        this.smokeGeometry = new THREE.PlaneBufferGeometry(this.sizes.width/150, this.sizes.height/150)
        this.testMaterial = new THREE.MeshBasicMaterial({
            color : "#000000",
            // side : THREE.BackSide   
        })
        this.smokeMaterial = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms : {
                uTime : {value : 0}
            },
            transparent :true,
            blending : THREE.AdditiveBlending
        })


        this.smokes = new THREE.Mesh(
            this.smokeGeometry,
            this.smokeMaterial
        )
        // this.smokes.scale.set(0.5, 0.5, 0.5)
        this.smokes.position.y = 0
        this.smokes.position.z = -1.9

        this.scene.add(this.smokes)
    }

    update(){
        this.smokes.material.uniforms.uTime.value = this.time.elapsed
    }
}