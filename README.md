### My 3D Viewer

My 3D Viewer is a web application designed for visualizing and interacting with 3D models in real-time. The app is built using Next.js for rendering the application, Three.js for handling 3D graphics, and TypeScript for improved code quality and maintainability.

### Demo https://my-3d-viewer.vercel.app/

### 🚀 Features:

🖼️ Load 3D Models: Upload and view 3D models (OBJ, STL, GLTF formats).

🛠️ Interactive 3D objects: Rotate, zoom, and move models in 3D space.

🎨 Customizable objects: Change size, position, and color for each 3D object (cube, pyramid).

🔄 Real-time updates: Modify properties and see changes in real-time.

### 🛠️ Technologies:

Next.js — Frontend framework for React-based development.

Three.js — JavaScript library for creating 3D models and scenes in the browser.

TypeScript — A typed superset of JavaScript for enhanced developer experience and maintainability.

React — For creating the user interface and handling state management.

### 📦 Installation:

Clone the repository:
git clone https://github.com/ValentinaFediakova/my-3d-viewer.git

Go to the project folder:
cd my-3d-viewer

Install dependencies:
npm install

Run the app:
npm run dev

Visit the application in your browser at http://localhost:3000

### This project was implemented as a test task. Here is the task:

Create a 1 page web-application with simple UI and interactive 3D viewer that can
display a few geometric primitives (boxes and pyramids). Possible design is
demonstrated above. Web-application should satisfy the following functionality:

1. User should be able to add a group of the specied primitive type, parameters
   and number. For example, '+' button that opens a popup menu where user can
   specify type of the primitive (box or pyramid), primitives parameters (length,
   width, height) and number of displayed primitives.
2. Once user accept to add specied primitive:
   a. Specied primitives should be displayed in the viewer in random places
   and with random colors. Number and size of primitives should be from
   user input in point 1.
   b. List of all displayed primitives should appear in UI with specied position
   in viewer and marked with assigned color from point 2.a.
3. User should be able to select an element from the list in UI. Once the element is
   selected, an appropriate primitive in the viewer should be also visually selected,
   e.g. change color for specied (from code) one. Selecting another element
   should reset selection of already selected primitive in viewer, i.e. reset it state
   before selection.
4. Adding a new group should add primitives both to list in UI and on scene.
5. Have possibility to clear the scene and UI list.
   (\*) Additional optional requirements:
6. When adding new primitives group, each primitive side (i.e. each side of box or
   pyramid) should have the random color.
7. Have possibility to select primitive from the viewer, i.e. clicking on the object in
   viewer should accept selection both to the viewer and UI list.
   Requirements to the implementation:
8. Everything should be written in Typescript.
9. The frontend should be written using React or Angular and Three.js (it's okay to
   use wrappers such as react-three-ber)
10. UI components should be built using components from a third-party component
    library (Ant Design, Material UI, React Aria, etc.) and customized using CSS.
11. Each primitive should be represented as a single mesh and created using
    BufferGeometry
