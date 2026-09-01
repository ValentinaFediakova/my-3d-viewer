# My 3D Viewer

An interactive 3D viewer built with **Next.js, React, TypeScript, Three.js, and React Three Fiber**.

The application allows users to create groups of 3D primitives, interact with them directly in the scene, and manage them through the UI.

🌐 **Live Demo:**  
[View My 3D Viewer](https://my-3d-viewer.vercel.app/)

## ✨ Features

- Add groups of **cubes** and **pyramids**
- Configure primitive size, height, and quantity
- Generate objects at random positions in the 3D scene
- Collision-aware object placement
- Random colors for individual primitive faces
- Select objects directly in the 3D scene
- Select objects from the UI list
- Synchronize selection between the scene and the list
- Highlight the currently selected primitive
- Clear all objects from the scene
- Orbit and zoom around the scene with camera controls
- Real-time updates when new primitives are added

## 🛠 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Three.js**
- **React Three Fiber**
- **Drei**
- **Ant Design**
- **SCSS**

## 🧩 Implementation Details

The 3D scene is rendered using **React Three Fiber**, while **Drei's OrbitControls** provides interactive camera controls.

Each primitive is represented as a mesh and has its own geometry and materials.

### Cubes

Cubes are created with Three.js `BoxGeometry`. Each face receives a randomly generated color.

### Pyramids

Pyramid geometry is created manually using `BufferGeometry`, vertex positions, indices, and geometry groups.

This makes it possible to assign separate materials and colors to individual pyramid faces.

### Object Placement

New primitives are assigned random positions in 3D space.

Before a position is accepted, the application checks for collisions with existing objects. If the generated position is too close to another primitive, the object is moved until a suitable position is found.

### Object Selection

Objects can be selected in two ways:

- by clicking a primitive directly in the 3D scene;
- by selecting it from the list in the UI.

The selected primitive is highlighted, and the selection state is synchronized between the scene and the interface.

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AddPrimitiveModal.tsx
│   ├── Button.tsx
│   ├── PrimitiveList.tsx
│   └── SceneRenderer.tsx
│
├── styles/
│   └── globals.scss
│
└── utils/
    ├── Primitives.ts
    └── helpers.ts
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/ValentinaFediakova/my-3d-viewer.git
```

Go to the project directory:

```bash
cd my-3d-viewer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📦 Production Build

```bash
npm run build
npm run start
```

## 📝 About the Project

This project was implemented as a **technical test assignment**.

The task was to build a single-page application with an interactive 3D viewer where users can:

- create groups of cubes and pyramids with specified dimensions and quantity;
- display generated primitives at random positions with random colors;
- display all created primitives in a UI list;
- select primitives from the list and highlight the corresponding object in the scene;
- add multiple groups of primitives;
- clear the scene and the UI list.

Optional requirements included:

- assigning random colors to individual primitive faces;
- allowing primitives to be selected directly from the 3D viewer;
- building primitives as meshes using `BufferGeometry`;
- using TypeScript, React, Three.js, and a third-party UI component library.

## 💡 What This Project Demonstrates

- Integration of Three.js with React through React Three Fiber
- Custom geometry creation with `BufferGeometry`
- Working with multiple materials on a single mesh
- Managing synchronization between a 3D scene and React UI
- Interactive object selection
- Basic collision detection and procedural object placement
- Building reusable 3D primitive abstractions with TypeScript
