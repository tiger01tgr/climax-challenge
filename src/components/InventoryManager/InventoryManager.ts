export type Items = {
	id: string,
	name: string,
	qty: number,
	price: number,
}

export interface InventoryContextType {
	items: Items[];
	addItem: (name: string, qty: number, price: number) => void;
	removeItem: (item: Items) => void;
	updateItem: (id: string, name: string, qty: number, price: number) => void;
}

// I wouldn't design it like this usually, 
// but since we don't want persistent data, this is a simple way of representing a server 

export default class InventoryManager {
	// Fields (properties)
	items: Items[];
	counter: number;

	// Constructor
	constructor() {
		this.items = [];
		this.counter = 0;
	}

	// Methods
	addItem(name: string, qty: number, price: number) {
		const item: Items = {
			id: this.counter.toString(),
			name: name,
			qty: qty,
			price: price,
		}
		this.counter++;
		this.items.push(item);
	}

	removeItem(item: Items) {
		this.items = this.items.filter(i => i.id !== item.id);
	}

	updateItem(id: string, name: string, qty: number, price: number) {
		const item = this.items.find(i => i.id === id);
		if (!item) {
			throw new Error(`Item with ID ${id} not found.`);
		}
		if (item) {
			item.name = name;
			item.qty = qty;
			item.price = price;
		}
		this.items = this.items.map(i => i.id === item.id ? item : i);
	}

	getItems() {
		return this.items;
	}
}