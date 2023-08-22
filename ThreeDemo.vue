<template>
  <div class="h-full w-full" ref="wrapDom" style="background-color: pink;">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { BasicThree } from '@/three/basic';
import * as THREE from 'three'


class InitThree extends BasicThree {
  constructor(dom: HTMLDivElement) {
    super(dom)

    // this.scene

    // this.drawPonits()


    this.drawLines()

    this.drawMesh()

    this.drawCube()

    // this.animate(() => {
    //   console.log('1111')
    // })
  }

  drawCube() {
    // threejs 默认提供的 geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2)

    const material = new THREE.MeshBasicMaterial({
      color: 'green',
      side: THREE.DoubleSide // 显示 双面
    })

    const cube = new THREE.Mesh(geometry, material)

    this.animate(() => {

      cube.rotation.x += 0.04
      cube.rotation.y += 0.04
      cube.rotation.z += 0.04
    })

    this.scene.add(cube)
  }

  drawMesh() {
    const geometry = new THREE.BufferGeometry().setFromPoints(arr3D)

    const material = new THREE.MeshBasicMaterial({
      color: 'green',
      side: THREE.DoubleSide // 显示 双面
    })

    const mesh = new THREE.Mesh(geometry, material)

    this.scene.add(mesh)
  }

  drawLines() {
    const geometry = new THREE.BufferGeometry().setFromPoints(arr3D)

    const material =  new  THREE.LineBasicMaterial({
      color: 'blue'
    })

    const line = new THREE.Line(geometry, material)


    // ---- 引入 矩阵
    // const matrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2) // 沿着 y 轴旋转 90度
    // line.applyMatrix4(matrix)
    // ---- 引入 矩阵

    this.scene.add(line)

  }


  // 绘制 3D 点
  drawPonits() {
    const geometry = new THREE.BufferGeometry().setFromPoints(arr3D)
    const material = new THREE.PointsMaterial({
      color: 'red',
      size: 0.2
    })

    const point = new THREE.Points(geometry, material);

    this.scene.add(point)
  }
}

const wrapDom = ref<HTMLDivElement>()

onMounted(() => {
  new InitThree(wrapDom.value!)
})



// THREE.Vector3[]
const arr3D = [
  [1, 5, 1], // new THREE.Vector3(1, 5, 1)
  [3, 5, 1],
  [3, 4, 1],
  [1, 4, 1],
  [1, 3, 1],
  [3, 3, 1],
  [3, 2, 1],
  [1, 2, 1],
  [1, 1, 1],
].map(d => new THREE.Vector3(...d));

const arr2D = [
  [1, 5],
  [3, 5],
  [3, 4],
  [1, 4],
  [1, 3],
  [3, 3],
  [3, 2],
  [1, 2]
].map(d => new THREE.Vector2(...d));



</script>

<style scoped lang="scss"></style>
