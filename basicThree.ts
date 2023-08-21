import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class BasicThree {
  public scene: THREE.Scene // threejs 基本概念之一： scene（场景）

  private dom: HTMLDivElement // 渲染 webgl 的父级容器
  private controls: OrbitControls // 辅助工具：使得鼠标可以 控制 摄像机的运动
  private renderer: THREE.WebGLRenderer // threejs 基本概念之一： renderer（渲染器）
  private camera: THREE.PerspectiveCamera // threejs 基本概念之一： camera（摄像机）

  constructor(dom: HTMLDivElement) {
    this.dom = dom
    this.scene = new THREE.Scene() // 初始化 场景
    this.camera = this.initCamera() // 初始化 摄像机
    this.renderer = this.initRenderer(dom) // 初始化渲染器

    // 初始化 摄像机的 controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(1, 1, 1)

    this.addHelper() // 增加 网格 和 坐标轴 的辅助工具
    this.animate() // 启动动画函数
  }

  private initCamera() {
    // Field of View（相机可视角度的范围）
    const fov = 75 
    const aspect = this.dom.offsetWidth / this.dom.offsetHeight
    const near = 0.1
    const far = 1000000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    // 将相机 放在合适的位置
    camera.position.set(2.6363042712380986, 5.220899971406846, 6.232079279872723)
    return camera
  }

  private initRenderer(dom: HTMLDivElement) {
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(dom.offsetWidth, dom.offsetHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(renderer.domElement)

    return renderer
  }

  // 动画函数，每一帧 会执行一次自己
  public animate (...fns: (() => void)[]) {
    fns.forEach((fn) => fn())

    requestAnimationFrame(() => {
      this.animate(...fns)
    })

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  // 增加 坐标轴 和 网格的 辅助工具
  private addHelper() {
    // 坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    axesHelper.position.y = 0.01
    this.scene.add(axesHelper)

    // 10*10 的辅助网格
    const gridHelper = new THREE.GridHelper(10, 10)
    this.scene.add(gridHelper)
  }
}