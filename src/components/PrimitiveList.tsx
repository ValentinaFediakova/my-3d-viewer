'use client';

import React from 'react';
import { Primitive } from '@/utils/Primitives';

type PrimitiveListProps = {
  primitives: Primitive[];
  selectedId: number | null;
  onSelect: (index: number) => void;
};

export const PrimitiveList: React.FC<PrimitiveListProps> = ({ primitives, selectedId, onSelect }) => {

  const renderPrimitiveColors = (primitive: Primitive) => {
    return primitive.originalColors.map((originalColor, index) => (
      <span className='primitive-list-item__color' key={index} style={{ backgroundColor: `${originalColor}`}}></span>
    ));
  };

  return (
    <div className='primitive-list'>
      {primitives.map((primitive, index) => (
        <div
          className='primitive-list__item'
          key={index}
          onClick={() => onSelect(index)}
          style={{
            backgroundColor: selectedId === index ? 'rgb(107 110 197)' : '',
          }}
        >
          <div>
            <div className='primitive-list__item-type'>{primitive.type}</div>
            <div>{renderPrimitiveColors(primitive)}</div>
          </div>
          <div>position: {primitive.getPosition().map((item, index) => (<span key={index}>{item.toFixed()}, </span>))}</div>
        </div>
      ))}
    </div>
  );
};
