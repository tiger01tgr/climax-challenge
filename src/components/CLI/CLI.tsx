'use client'
import React from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
  } from "@/components/ui/command"
import AddDialog from './Dialogs/AddDialog'
import VideoDialog from './Dialogs/VideoDialog'
  

const CLI = () => {

	const [ addDialogOpen, setAddDialogOpen ] = React.useState(false);
	const [ updateDialogOpen, setUpdateDialogOpen ] = React.useState(false);
	const [ removeDialogOpen, setRemoveDialogOpen ] = React.useState(false);

  return (
	<>
		<AddDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
		<VideoDialog open={updateDialogOpen} setOpen={setUpdateDialogOpen} videoPath="/edit.mov" title="Update Item" />
		<VideoDialog open={removeDialogOpen} setOpen={setRemoveDialogOpen} videoPath="/delete.mov" title="Remove Item" />
		<Command className="bg-gray-50 border border-b">
			<CommandInput placeholder="Type a command..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
				<CommandItem onSelect={(value) => setAddDialogOpen(true)}>Add Inventory</CommandItem>
				<CommandItem onSelect={(value) => setUpdateDialogOpen(true)}>Update Inventory</CommandItem>
				<CommandItem onSelect={(value) => setRemoveDialogOpen(true)}>Remove Inventory</CommandItem>
				</CommandGroup>
				<CommandSeparator />

			</CommandList>
		</Command>
	</>
  )
}

export default CLI