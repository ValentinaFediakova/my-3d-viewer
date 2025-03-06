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
import { randomColor, calculateDistance } from "./helpers";

type Vector3 = [number, number, number];

export abstract class Primitive {
  protected position: Vector3 = [0, 0, 0];
  protected color: string;
  public materials: MeshBasicMaterial[] = [];
  public originalColors: string[] = [];
  public size: number;

  constructor(public type: string, color: string, size: number) {
    this.color = color;
    this.size = size;
  }

  setPosition(position: Vector3) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  public tryToSetPosition(primitives: Primitive[]) {
    const maxRetries = 100;
    let retries = 0;
    let newPosition;
    let isColliding;

    newPosition = this.generateRandomPosition();
    isColliding = this.checkCollisions(newPosition, primitives);

    while (retries < maxRetries && isColliding) {
      newPosition = this.shiftObjectAway(newPosition);
      isColliding = this.checkCollisions(newPosition, primitives);

      if (!isColliding) {
        break;
      }

      retries++;
    }

    if (retries === maxRetries) {
      this.placeOutsideArea(primitives);
    } else {
      this.setPosition(newPosition);
    }
  }

  private shiftObjectAway(
    position: [number, number, number]
  ): [number, number, number] {
    const shiftAmount = 50;
    const newPos: [number, number, number] = [...position] as [
      number,
      number,
      number
    ];

    newPos[0] += Math.random() > 0.5 ? shiftAmount : -shiftAmount;
    newPos[1] += Math.random() > 0.5 ? shiftAmount : -shiftAmount;
    newPos[2] += Math.random() > 0.5 ? shiftAmount : -shiftAmount;

    return newPos;
  }

  private generateRandomPosition(): [number, number, number] {
    return [
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
    ];
  }

  private checkCollisions(
    position: [number, number, number],
    primitives: Primitive[]
  ) {
    return primitives.some((other) => {
      const distance = calculateDistance(position, other.getPosition());
      const combinedSize = this.size + other.size + 100;

      return distance < combinedSize;
    });
  }

  private placeOutsideArea(primitives: Primitive[]) {
    const maxX = Math.max(...primitives.map((p) => p.getPosition()[0]));
    const maxY = Math.max(...primitives.map((p) => p.getPosition()[1]));
    const maxZ = Math.max(...primitives.map((p) => p.getPosition()[2]));

    this.setPosition([maxX + 150, maxY + 150, maxZ + 150]);
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
  constructor(size: number, color: string) {
    super("cube", color, size);
    this.size = size;
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
    super("pyramid", color, Math.max(radius, height));
    this.radius = radius;
    this.height = height;
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
