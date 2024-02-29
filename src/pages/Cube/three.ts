import * as THREE from 'three'
// OrbitControls は、カメラの制御を行い、マウスやタッチによる操作を可能にする
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageRight from '../../../public/envImage/right.png'
import imageLeft from '../../../public/envImage/left.png'
import imageUp from '../../../public/envImage/up.png'
import imageDown from '../../../public/envImage/down.png'
import imageFront from '../../../public/envImage/front.png'
import imageBack from '../../../public/envImage/back.png'

export const initThree = () => {
// console.log(THREE)

    // canvas
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement

    // scene
    const scene = new THREE.Scene()

    // sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // camera
    const camera = new THREE.PerspectiveCamera(
      // 視野角
      75,
      // アスペクト比
      sizes.width / sizes.height,
      // カメラに映る最も近い距離
      0.1,
      // カメラに映る最も遠い距離
      3000
    )
    // カメラの位置
    camera.position.set(0, 500, 1000)
    scene.add(camera)

    // renderer
    // canvas をレンダリングする
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    // canvas のサイズを設定
    renderer.setSize(sizes.width, sizes.height)
    // ピクセル比の設定
    renderer.setPixelRatio(window.devicePixelRatio)

    // envimage
    const urls = [
      imageRight,
      imageLeft,
      imageUp,
      imageDown,
      imageFront,
      imageBack,
    ]

    // 6 つの画像を読み込み、1 つのテクスチャとして扱うことができるキューブマップテクスチャを作成する
    const lorder = new THREE.CubeTextureLoader()
    // シーンの背景に設定
    scene.background = lorder.load(urls)

    // controls
    const controls = new OrbitControls(camera, canvas)
    // enableDamping: true カメラの移動を滑らかにする
    controls.enableDamping = true

    // キューブマップテクスチャをレンダリングするためのレンダーターゲット 数値が大きいほど高精細
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(700)

    // cubecamera キューブマップテクスチャをレンダリングするためのカメラ 引数は、near, far, renderTarget
    const cubecamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)
    scene.add(cubecamera)

    // object
    const material = new THREE.MeshBasicMaterial({
      // envMap に cubecamera のレンダーターゲットを指定することで、キューブマップテクスチャを反射させることができる
      envMap: cubecamera.renderTarget.texture,
      // reflectivity: 0.5,
    })
    const geometru = new THREE.SphereGeometry(350, 50, 50)
    const sphiere = new THREE.Mesh(geometru, material)
    sphiere.position.set(0, 100, 0)
    scene.add(sphiere)

    function animate() {
      // update で damping を有効にする
      controls.update()
      cubecamera.update(renderer, scene)
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate)
    }
    animate()
}