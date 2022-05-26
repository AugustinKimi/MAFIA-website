import * as THREE from 'three'
import Experience from '../Experience'
import Sizes from '../Utils/Sizes'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import fragmentShader from '../Shaders/PostProcessNoise/fragment.glsl'
import vertexShader from '../Shaders/PostProcessNoise/vertex.glsl'


export default class PostProcess{
    constructor(){
        this.experience = new Experience()
        this.sizes = new Sizes()
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debugObject = {}
        this.debugObject.noiseAmount = 1
        this.debugObject.noiseStrength = 0.015

        this.setPostProcess()

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Postprocess')
            this.setDebug()
        }
    }

    setPostProcess(){
        this.renderTarget =  new THREE.WebGLRenderTarget(
            800,
            600,
            {
                // samples : this.renderer.instance.getPixelRatio() === 1 ? 2 : 0
            }
        )

        this.effectComposer = new EffectComposer(this.renderer.instance, this.renderTarget)
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)

        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        this.noiseShader = {
            uniforms : {
                tDiffuse : {value : null},
                uTime : {value : 0},
                uAmount : {value : this.debugObject.noiseAmount},
                uStrength : {value : this.debugObject.noiseStrength}
            },
            fragmentShader,
            vertexShader,
        }

        this.unrealBloomPass = new ShaderPass(UnrealBloomPass)
        // this.effectComposer.addPass(this.unrealBloomPass)
        this.unrealBloomPass.strength = 0.3
        this.unrealBloomPass.radius = 1
        this.unrealBloomPass.threshold = 0.6

        

        this.noisePass = new ShaderPass(this.noiseShader)
        this.effectComposer.addPass(this.noisePass)


        this.gammeCorrectionShader = new ShaderPass(GammaCorrectionShader)
        // this.effectComposer.addPass(this.gammeCorrectionShader)
    }

    resize(){
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    }

    setDebug(){
        this.debugFolder.add(this.noisePass.material.uniforms.uAmount, "value").min(0).max(20).step(0.001).name('Amount')
        this.debugFolder.add(this.noisePass.material.uniforms.uStrength, "value").min(0).max(0.1).step(0.00001).name('Strength')
        this.debugFolder.add(this.noisePass, 'enabled')


        this.debugFolder.add(this.unrealBloomPass, 'enabled')
        this.debugFolder.add(this.unrealBloomPass, 'strength').min(0).max(2).step(0.001)
        this.debugFolder.add(this.unrealBloomPass, 'radius').min(0).max(2).step(0.001)
        this.debugFolder.add(this.unrealBloomPass, 'threshold').min(0).max(1).step(0.001)
    }

    update(){
        this.noisePass.material.uniforms.uTime.value = this.time.elapsed
        this.effectComposer.render()
    }
}