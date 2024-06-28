'use client'

import React, { createContext, useState, useContext, useCallback } from 'react'
import InventoryManager, { InventoryContextType, Items } from './InventoryManager'


const InventoryManagerContext = createContext<InventoryContextType>(new InventoryManager());

interface InventoryManagerProps {
  children: React.ReactNode
}

const InventoryManagerProvider: React.FC<InventoryManagerProps> = ({ children }) => {
  const [inventoryManager] = useState(() => new InventoryManager());
  const [items, setItems] = useState<Items[]>([]);

  const addItem = useCallback((name: string, qty: number, price: number) => {
    inventoryManager.addItem(name, qty, price);
    setItems([...inventoryManager.getItems()]);
  }, [inventoryManager]);

  const removeItem = useCallback((item: Items) => {
    inventoryManager.removeItem(item);
    setItems([...inventoryManager.getItems()]);
  }, [inventoryManager]);

  const updateItem = useCallback((id: string, name: string, qty: number, price: number) => {
    inventoryManager.updateItem(id, name, qty, price);
    setItems([...inventoryManager.getItems()]);
  }, [inventoryManager]);

  const value = {
    items,
    addItem,
    removeItem,
    updateItem
  };

  return (
    <InventoryManagerContext.Provider value={value}>
		{children}
    </InventoryManagerContext.Provider>
  )
}

const useInventoryManager = () => {
  const context = useContext(InventoryManagerContext);
  if (context === null) {
    throw new Error('useInventoryManager must be used within a InventoryManagerProvider');
  }
  return context;
}

export { InventoryManagerProvider, useInventoryManager };