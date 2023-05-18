import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeDCanvas({ width, height }) {
  //Setup when component has mounted and rendered for the first time
  useEffect(() => {
    const canvas = document.getElementById("canvas");

    const scene = new THREE.Scene();

    const geometry = new THREE.IcosahedronGeometry(5, 50);
    const material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.4,
    });
    const sphereMesh = new THREE.Mesh(geometry, material);
    sphereMesh.position.z = 0;
    scene.add(sphereMesh);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.z = 20;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight("#222222", 1.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#ff0000", 10.0, 60);
    pointLight.position.set(30, 30, 30);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });

    const controls = new OrbitControls(camera, canvas);

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
