'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

type AddPrimitiveModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (type: string, size: number, height: number, count: number) => void;
};

export const AddPrimitiveModal: React.FC<AddPrimitiveModalProps> = ({ visible, onClose, onAdd }) => {
  const [type, setType] = useState<string>('cube');
  const [size, setSize] = useState<number>(1);
  const [height, setHeight] = useState<number>(2);
  const [count, setCount] = useState<number>(1);

  const handleAdd = () => {
    onAdd(type, size, height, count);
    onClose();
  };

  return (
    <Modal
      title="Add primitive"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" onClick={handleAdd}>
          Add
        </Button>,
      ]}
    >
      <div className='modal-block-wrapper'>
        <label>Type of primitive:</label>
        <Select value={type} onChange={setType} className='modal__select'>
          <Option value="cube">Cube</Option>
          <Option value="pyramid">Pyramid</Option>
        </Select>
      </div>

      <div className='modal-block-wrapper'>
        <label>Size:</label>
        <Input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
      </div>

      {type === 'pyramid' && (
        <div className='modal-block-wrapper'>
          <label>Height:</label>
          <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>
      )}

      <div className='modal-block-wrapper'>
        <label>Number of primitives:</label>
        <Input
          type="number"
          value={count}
          min={1}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
    </Modal>
  );
};