import CLI from "@/components/CLI/CLI";
import Inventory from "@/components/Inventory/Inventory";
import InventoryManager from "@/components/InventoryManager/InventoryManager";
import { InventoryManagerProvider } from "@/components/InventoryManager/InventoryManagerProvider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
		<InventoryManagerProvider>
			<div className="flex flex-col w-full">
				<CLI />	
				<Inventory />
			</div>
		</InventoryManagerProvider>
      </div>
    </main>
  );
}
