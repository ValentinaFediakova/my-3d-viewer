"use client";

import {
  BoxGeometry,
  BufferGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshBasicMaterial,
  BufferAttribute,
  DoubleSide,
} from "three";
import { randomColor, randomPosition } from "./helpers";

type Vector3 = [number, number, number];

export abstract class Primitive {
  protected position: Vector3 = [0, 0, 0];
  protected color: string;
  public materials: MeshBasicMaterial[] = [];
  public originalColors: string[] = [];

  constructor(public type: string, color: string) {
    this.color = color;
  }

  setPosition(position: Vector3) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  getColor() {
    return this.color;
  }

  abstract getGeometry(): BufferGeometry;
  abstract getEdges(): LineSegments;

  setHighlight(isHighlighted: boolean): void {
    this.materials.forEach((material, index) => {
      if (isHighlighted) {
        material.color.set("#FFFF00");
      } else {
        const originalColor = this.originalColors[index];
        material.color.set(originalColor);
      }
    });
  }

  setOriginalColors(colors: string[]) {
    this.originalColors = colors;
  }
}

export class Cube extends Primitive {
  private size: number;

  constructor(size: number, color: string) {
    super("cube", color);
    this.size = size;
    this.position = randomPosition();
    const colors = Array(6)
      .fill(0)
      .map(() => randomColor());
    this.materials = colors.map((color) => new MeshBasicMaterial({ color }));
    this.setOriginalColors(colors);
  }

  getGeometry() {
    const geometry = new BoxGeometry(this.size, this.size, this.size);
    return geometry;
  }

  getEdges(): LineSegments {
    const geometry = new BoxGeometry(this.size, this.size, this.size);
    const edges = new EdgesGeometry(geometry);
    return new LineSegments(edges, new LineBasicMaterial({ color: "#000000" }));
  }
}

export class Pyramid extends Primitive {
  private radius: number;
  private height: number;

  constructor(radius: number, height: number, color: string) {
    super("pyramid", color);
    this.radius = radius;
    this.height = height;
    this.position = randomPosition();
    const sideColors = Array(4)
      .fill(0)
      .map(() => randomColor());
    const baseColor = randomColor();

    this.materials = [
      ...sideColors.map(
        (color) =>
          new MeshBasicMaterial({
            color,
            side: DoubleSide,
          })
      ),
      new MeshBasicMaterial({
        color: baseColor,
        side: DoubleSide,
      }),
    ];

    this.setOriginalColors([...sideColors, baseColor]);
  }

  getGeometry() {
    const geometry = new BufferGeometry();

    const halfSize = this.radius;
    const height = this.height;

    const vertices = new Float32Array([
      -halfSize,
      0,
      -halfSize,
      halfSize,
      0,
      -halfSize,
      halfSize,
      0,
      halfSize,
      -halfSize,
      0,
      halfSize,
      0,
      height,
      0,
    ]);

    geometry.setAttribute("position", new BufferAttribute(vertices, 3));

    const indices = new Uint16Array([
      0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4, 0, 1, 2, 0, 2, 3,
    ]);

    geometry.setIndex(new BufferAttribute(indices, 1));

    geometry.clearGroups();
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 1);
    geometry.addGroup(6, 3, 2);
    geometry.addGroup(9, 3, 3);
    geometry.addGroup(12, 6, 4);

    geometry.computeVertexNormals();
    return geometry;
  }

  getEdges(): LineSegments {
    const geometry = new EdgesGeometry(this.getGeometry());
    const material = new LineBasicMaterial({
      color: "#000000",
      depthTest: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const edges = new LineSegments(geometry, material);
    edges.renderOrder = 1;
    return edges;
  }
}
