import { useEffect } from "react";
import * as THREE from "three";

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

    const ambientLight = new THREE.AmbientLight("#ffffff");
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });

    renderer.render(scene, camera);
  }, []);

  return (
    <canvas id="canvas" width={`${width}px`} height={`${height}px`}></canvas>
  );
}
