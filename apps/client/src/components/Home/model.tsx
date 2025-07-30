import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
export default function MeshComponent() {
  const fileUrl = "/octo.glb";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  useEffect(() => {
    mesh.current.position.z = 0;
  });
  return (
    <>
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </>
  );
}
