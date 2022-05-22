import * as THREE from "three";
import Experience from "../Experience";
import vertexShader from "../Shaders/Fireflies/vertex.glsl";
import fragmentShader from "../Shaders/Fireflies/fragment.glsl";

export default class Fireflies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // setup debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder({
        title: "Fireflies",
        expanded: false,
      });
    }

    // setup

    this.setModel();
  }

  setModel() {
    // firefly geometry

    this.firefliesGeometry = null;
    this.firefliesMaterial = null;
    this.fireflies = null;

    this.firefliesCount = {};
    this.firefliesCount.value = 100;

    this.firefliesSpeed = {};
    this.firefliesSpeed.value = 1;

    const generate = () => {
      if (this.fireflies !== null) {
        this.firefliesGeometry.dispose();
        this.firefliesMaterial.dispose();
        this.scene.remove(this.fireflies);
      }

      this.firefliesGeometry = new THREE.BufferGeometry();
      this.positionArray = new Float32Array(this.firefliesCount.value * 3);
      this.scaleArrary = new Float32Array(this.firefliesCount.value);

      for (let i = 0; i < this.firefliesCount.value; i++) {
        this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
        this.positionArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
        this.positionArray[i * 3 + 2] = Math.random() * 2;

        this.scaleArrary[i] = Math.random();
      }

      this.firefliesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(this.positionArray, 3)
      );
      this.firefliesGeometry.setAttribute(
        "aScale",
        new THREE.BufferAttribute(this.scaleArrary, 1)
      );

      // material
      this.firefliesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 100 },
          uTime: { value: 0 },
          uInsideColor : { value : new THREE.Color("#ffd257")},
          uOutsideColor : { value : new THREE.Color("#637d08")}
        },
        vertexShader ,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      this.fireflies = new THREE.Points(
        this.firefliesGeometry,
        this.firefliesMaterial
      );

      this.scene.add(this.fireflies);
    };

    generate();

    // debug generator
    if (this.debug.active) {
      this.debugFolder.add(this.firefliesCount, "value").min(0).max(5000).step(1).name("FirefliesCount").onChange( generate)
      this.debugFolder.add(this.firefliesMaterial.uniforms.uSize, "value").min(0).max(500).step(1).name("Firefliess Size")
      this.debugFolder.addColor(this.firefliesMaterial.uniforms.uInsideColor, "value").min(0).max(500).step(1).name("Firefliess Inside color")
      this.debugFolder.addColor(this.firefliesMaterial.uniforms.uOutsideColor, "value").min(0).max(500).step(1).name("Firefliess outside colors")
    }
  }

  update() {
    this.firefliesMaterial.uniforms.uTime.value =
      this.time.elapsed * 0.00025 * this.firefliesSpeed.value;
  }
}
