import * as THREE from 'three'
import { ExtrudeGeometry, Object3D, Shape } from 'three'
import { SVGLoader, SVGResult, SVGResultPaths } from 'three/examples/jsm/loaders/SVGLoader.js'
import { logoSVG } from 'utils/logoSVG'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function init3D(): void {
  //-------- ----------
  // SCENE, CAMERA, RENDERER, LIGHT
  //-------- ----------
  const canvas: HTMLElement | null = document.querySelector('canvas')

  if (!canvas) {
    return
  }

  const canvasHeight: number = 300
  const canvasWidth: number = window.innerWidth
  // hover flags
  let isHovered: boolean = false
  let turnToRight: boolean = true

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xD5E1E1)

  const camera = new THREE.PerspectiveCamera(25, canvasWidth / canvasHeight, .1, 1000)
  camera.position.setZ(60)
  camera.position.setY(5)
  camera.position.setX(0)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  })
  renderer.setSize(canvasWidth, canvasHeight)

  renderer.domElement.addEventListener('mouseenter', (): void => {
    isHovered = true
  })

  renderer.domElement.addEventListener('mouseleave', (): void => {
    isHovered = false
  })

  const pointLight = new THREE.PointLight(0xffffff, 5000)
  const pointLight2 = new THREE.PointLight(0xffffff, 10000)
  pointLight.position.set(30, 40, 50)
  pointLight2.position.set(-40, -20, 50)
  const ambientLight = new THREE.AmbientLight(0xffffff, .3)
  scene.add(pointLight, pointLight2, ambientLight)

  //-------- ----------
  // SVG LOADER PARSE, CREATE SHAPE, SHAPE GEOMETRY, MESH
  //-------- ----------
  const extrudeSettings = {
    steps: 2,
    depth: 50,
    bevelEnabled: false,
    bevelThickness: 2,
    bevelSize: 20,
    bevelOffset: -20,
    bevelSegments: 2,
  }

  const data: SVGResult = new SVGLoader().parse(logoSVG)
  let initialRotation: number = 0

  data.paths.forEach((path: SVGResultPaths): void => {
    const shape: Shape[] = SVGLoader.createShapes(path)

    const geometry: ExtrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings).scale(.1, .1, .1)
    const color: string = path.userData!.node.dataset.color
    const material = new THREE.MeshStandardMaterial(
      {
        color: color,
        metalness: .2,
        roughness: .03,
      },
    )

    const mesh = new THREE.Mesh(geometry, material)

    window.addEventListener('scroll', () => {
      mesh.rotation.x = Math.PI + window.scrollY * .004
    })

    mesh.rotateX(Math.PI)
    mesh.position.set(-62, 18.5, 0)
    scene.add(mesh)

    initialRotation = mesh.rotation.x
  })

  //-------- ----------
  // RENDER
  //-------- ----------
  animate()

  function animate(): void {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    // TODO: hover animation
    // hover()
  }

  function hover(): void {
    const firstChild: Object3D = scene.children[0]

    scene.children.forEach((mesh: Object3D): void => {
      if (isHovered) {
        if (turnToRight) {
          mesh.rotateX(.001)

          if (firstChild.rotation.x > .05) {
            turnToRight = false
          }
        } else {
          // mesh.rotateY(-.001)

          if (firstChild.rotation.x < .05) {
            turnToRight = true
          }
        }
      } else {
        if (firstChild.rotation.x > 0) {
          mesh.rotateX(-.001)
        }
      }
    })
  }

  //-------- ----------
  // HELPERS
  //-------- ----------
  // initHelpers()

  function initHelpers(): void {
    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)
    const controls = new OrbitControls(camera, renderer.domElement) as any
    scene.add(lightHelper, gridHelper)
  }
}
