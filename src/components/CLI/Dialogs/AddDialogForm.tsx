'use client'

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useInventoryManager } from "@/components/InventoryManager/InventoryManagerProvider"


const formSchema = z.object({
	name: z.string().min(2).max(50),
	qty: z.coerce.number({"message": "Must be a number."})
		.min(0, {"message": "Quantity must be at least 0."})
		.max(999999999999999, {"message": "Quantity is too large. Please contact support for more information"})
		.refine(
			n => Number.isInteger(n),
			{ message: "Quantity must be a whole number (no decimal points)." }
		),
	price: z.coerce.number({"message": "Must be a number."})
		.min(0.01, {"message": "Price must be greater than 0."})
		.max(999999999999999, {"message": "Price is too high. Please contact support for more information"})
		.refine(
			n => {
			const decimalParts = n.toString().split('.');
			return decimalParts.length === 1 || decimalParts[1].length <= 2;
			},
			{ message: "Price can have at most 2 decimal places." }
		),
})

interface AddDialogFormProps {
	setOpen: (open: boolean) => void
}

const AddDialogForm: React.FC<AddDialogFormProps> = ({ setOpen }) => {

	const inventoryManager = useInventoryManager();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  name: "",
		  qty: 0,
		  price: 0,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// ✅ This will be type-safe and validated.
		inventoryManager.addItem(values.name, values.qty, values.price);
		setOpen(false);
		form.reset();
	};

	return (
		<Form {...form}>
		  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<FormField
			  control={form.control}
			  name="name"
			  render={({ field }) => (
				<FormItem>
				  <FormLabel>Name</FormLabel>
				  <FormControl>
					<Input placeholder="Name of the item" {...field} />
				  </FormControl>
				  <FormDescription>
					This is the public display name of the item.
				  </FormDescription>
				  <FormMessage />
				</FormItem>
			  )}
			/>
			<FormField
			  control={form.control}
			  name="qty"
			  render={({ field }) => (
				<FormItem>
				  <FormLabel>Quantity</FormLabel>
				  <FormControl>
					<Input placeholder="Quantity of the item" {...field} />
				  </FormControl>
				  <FormMessage />
				</FormItem>
			  )}
			/>
			<FormField
			  control={form.control}
			  name="price"
			  render={({ field }) => (
				<FormItem>
				  <FormLabel>Price</FormLabel>
				  <FormControl>
					<Input placeholder="Price of the item" {...field} />
				  </FormControl>
				  <FormMessage />
				</FormItem>
			  )}
			/>
			<Button type="submit">Submit</Button>
		  </form>
		</Form>
	  )

}

export default AddDialogForm