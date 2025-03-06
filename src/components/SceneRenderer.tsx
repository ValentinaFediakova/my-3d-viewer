'use client'


import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Cube, Pyramid, Primitive } from '@/utils/Primitives';
import { PrimitiveList } from './PrimitiveList';
import { Button } from './Button';
import { AddPrimitiveModal } from './AddPrimitiveModal';

import '@/styles/globals.scss';
import { randomColor } from '@/utils/helpers';

export const SceneRenderer = () => {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleSelect = (index: number) => {
    setPrimitives((prev) => {
      return prev.map((primitive, i) => {
        primitive.setHighlight(i === index);
        return primitive;
      });
    });
    setSelectedId(index);
  };

  const handleAddPrimitive = (type: string, size: number, height: number, count: number) => {
    
    const newPrimitives: Primitive[] = [];
    for (let i = 0; i < count; i++) {
      const color = randomColor()
      const newPrimitive = type === 'cube'
        ? new Cube(size, color)
        : new Pyramid(size, height, color);
      newPrimitive.tryToSetPosition(primitives);
      newPrimitives.push(newPrimitive);
    }

    setPrimitives((prev) => [...prev, ...newPrimitives]);
  };

  const handleClearScene = () => {
    setPrimitives([]);
    setSelectedId(null);
  };

  const handlePrimitiveClick = (index: number) => {
    setPrimitives((prevPrimitives) => {
      return prevPrimitives.map((primitive, i) => {
        if (i === index) {
          primitive.setHighlight(true);
        } else {
          primitive.setHighlight(false);
        }
        return primitive;
      });
    });
  
    setSelectedId(index);
  };

  return (
    <div>
      <Canvas className='scene-canvas'>
        
        {primitives.map((primitive, index) => (
          <mesh
            key={index}
            position={primitive.getPosition()}
            geometry={primitive.getGeometry()}
            material={primitive.materials}
            onClick={() => handlePrimitiveClick(index)}
          >
            <primitive object={primitive.getEdges()} />
          </mesh>
        ))}

        <OrbitControls />
      </Canvas>
      <div className='left-panel'>
        <PrimitiveList
          primitives={primitives}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <div className='left-panel__buttons'>
          <Button text='Clear scene' onClick={handleClearScene}/>
          <Button text='Add group' onClick={() => setIsModalVisible(true)}/>
        </div>
      </div>

      <AddPrimitiveModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddPrimitive}
      />
      
    </div>
  );
};