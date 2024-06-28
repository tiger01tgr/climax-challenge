import { createContext } from 'react';
import InventoryManager from './InventoryManager';

export const InventoryManagerContext = createContext<InventoryManager>(new InventoryManager());