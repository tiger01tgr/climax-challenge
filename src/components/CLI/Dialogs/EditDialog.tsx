"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import EditDialogForm from './EditDialogForm'
import { Items } from '@/components/InventoryManager/InventoryManager'

interface EditDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  item: Items | null
}

const EditDialog: React.FC<EditDialogProps> = ({ open, setOpen, item }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Edit Item</DialogTitle>
        {item && <EditDialogForm setOpen={setOpen} item={item} />}
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog