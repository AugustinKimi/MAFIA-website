import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0


        this.trackLoading()
        this.setLoaders()
        this.startLoading()
    }

    trackLoading(){
        this.loaderScreen =  document.querySelector(".loader-screen")
        this.loaderProgress =  document.querySelector(".loading-progress")
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                this.loaderScreen.style.opacity = "0"
            },
        
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                this.loaderProgress.innerHTML = `${Math.round(itemsLoaded/itemsTotal * 100)}%`
                console.log(itemUrl, itemsLoaded, itemsTotal, itemsLoaded/itemsTotal * 100)
            },
        )
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader(this.loadingManager)
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}