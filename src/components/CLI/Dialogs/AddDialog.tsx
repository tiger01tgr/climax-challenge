"use client"

import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import AddDialogForm from './AddDialogForm'

interface AddDialogProps {
	open: boolean
	setOpen: (open: boolean) => void
}

const AddDialog: React.FC<AddDialogProps> = ({ open, setOpen }) => {
  return (
	<Dialog open={open} onOpenChange={setOpen}>
	<DialogContent>
		<DialogTitle>Add an Item</DialogTitle>
		<AddDialogForm setOpen={setOpen} />
	</DialogContent>
	</Dialog>

  )
}

export default AddDialog