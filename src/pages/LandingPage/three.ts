import * as THREE from 'three'
import * as dat from 'lil-gui'
import  bg from '../../../public/images/LandingBg.jpg'

export const initThree = () => {

  // UIデバッグを実装
  const gui = new dat.GUI()

  const parameters = {
    materialColor: "#ffffff",
  }

  gui.addColor(parameters, "materialColor").onChange(() => {
    material.color.set(parameters.materialColor)
    particlesMaterial.color.set(parameters.materialColor)
  })

  // キャンバスの取得
  const canvas = document.querySelector('.webgl') as HTMLCanvasElement

  // シーンの作成
  const scene = new THREE.Scene()

  // 背景用のテクスチャ
  const textureLoader = new THREE.TextureLoader()
  const bgTexture = textureLoader.load(bg)
  scene.background = bgTexture

  // サイズの指定
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.z = 6
  scene.add(camera)

  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })
  renderer.setSize(sizes.width, sizes.height)
   // ここでレンダラーのピクセル比を設定することで、高解像度のディスプレイでのパフォーマンスを向上させることができる
  renderer.setPixelRatio(window.devicePixelRatio)

  // マテリアルの作成
  const material = new THREE.MeshPhysicalMaterial({
    color: "#3c94d7",
    metalness: 0.865,
    roughness: 0.373,
    flatShading: true,
  })

  gui.add(material, 'metalness').min(0).max(1).step(0.001)
  gui.add(material, 'roughness').min(0).max(1).step(0.001)

  // メッシュの作成
  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
  )
  const mesh2 = new THREE.Mesh(
    new THREE.OctahedronGeometry(),
    material
  )
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  )
  const mesh4 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(),
    material
  )

  // mesh1.position.set(2, 0, 0)
  // mesh2.position.set(-1, 0, 0)
  // mesh3.position.set(2, 0, -6)
  // mesh4.position.set(5, 0, 3)

  scene.add(mesh1, mesh2, mesh3, mesh4)
  const meshes = [mesh1, mesh2, mesh3, mesh4]

  // パーティクルの追加
  // giometry
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 700
  // パーティクルの位置をランダムに設定する
  const positionArray = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  )

  // material
  const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    // color: '#ffffff',
    size: 0.025,
  })

  // mesh化
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  // lightを追加
  const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
  directionalLight.position.set(0.5, 1, 0)
  scene.add(directionalLight)

  // ブラウザのリサイズに対応
  window.addEventListener('resize', () => {
    // サイズの更新
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // カメラのアスペクト比の更新
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // レンダラーのサイズの更新
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  // ホイールの実装
  let speed = 0
  let rotation = 0
  window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0002
    // console.log(speed)
  })

  function rot() {
    rotation += speed
    speed *= 0.93

    // giometryの回転
    mesh1.position.x = 2 + 3.8 * Math.cos(rotation)
    mesh1.position.z = -3 + 3.8 * Math.sin(rotation)
    mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI /2)
    mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI /2)
    mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI)
    mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI)
    mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 * Math.PI /2)
    mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 * Math.PI /2)

    window.requestAnimationFrame(rot)
  }

  rot()

  // カーソルの位置の取得
  interface Cursor {
    x: number
    y: number
  }
  const cursor: Cursor = {
    x: 0,
    y: 0,
  }

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    // console.log(cursor.x)
    cursor.y = e.clientY / sizes.height - 0.5
    // console.log(cursor.y)
  })

  // アニメーション
  const clock = new THREE.Clock()

  const animate = () => {
    renderer.render(scene, camera)

    let getDelta = clock.getDelta()

    // meshの回転
    for (const mesh of meshes) {
      mesh.rotation.x += 0.2 * getDelta
      mesh.rotation.y += 0.22 * getDelta
    }

    // カメラの制御
    camera.position.x += cursor.x * getDelta * 0.5
    camera.position.y += -cursor.y * getDelta * 0.5

    window.requestAnimationFrame(animate)
  }

  animate()
}