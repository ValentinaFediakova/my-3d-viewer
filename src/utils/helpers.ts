"use client";
import * as THREE from "three";

export const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export function calculateDistance(
  point1: [number, number, number],
  point2: [number, number, number]
): number {
  const vector1 = new THREE.Vector3(...point1);
  const vector2 = new THREE.Vector3(...point2);
  return vector1.distanceTo(vector2);
}
