import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/fragmentShader";

export default function ThreeDCanvas({ width, height }) {
  //Setup when component has mounted and rendered for the first time
  useEffect(() => {
    const canvas = document.getElementById("canvas");

    const scene = new THREE.Scene();

    const geometry = new THREE.IcosahedronGeometry(5, 100);

    const material = new THREE.MeshStandardMaterial({
      onBeforeCompile: (shader) => {
        console.log(shader.fragmentShader);
        shader.fragmentShader = shader.fragmentShader.replace(
          /* glsl */ `#include <color_fragment>`,
          /* glsl */ `#include <color_fragment>
          diffuseColor = vec4(1.0, 1.0, 0.0, 1.0); `
        );
      },
    });

    const sphereMesh = new THREE.Mesh(geometry, material);
    sphereMesh.position.z = 0;
    scene.add(sphereMesh);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.z = 20;
    scene.add(camera);

    const pointLight = new THREE.PointLight("#ffffff", 10.0, 60);
    pointLight.position.set(30, 30, 30);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: false,
    });
    renderer.pixelRatio = 2.0;

    const controls = new OrbitControls(camera, canvas);

    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.autoRotateSpeed = 5.0;

    function loop() {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    }
    loop();
  }, []);

  return (
    <canvas id="canvas" width={`${width}px`} height={`${height}px`}></canvas>
  );
}
