import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as Structs from './data/conversions.ts';

export default function App() {
	// 1. STATE: These track user choices
	const [category, setCategory] = useState<Structs.Category>(Structs.InitialCategory);
	const [value, setValue] = useState<string>("");
	
	const [conversionHistory, setConversionHistory] = useImmer<Structs.ConversionHistory>(Structs.InitialHistory);	
	
	const updateConversionHistory = (category: Structs.Category, field: 'from' | 'to', value: string) => {
		setConversionHistory(draft => {
			draft[category][field] = value;
		});
	}

	// 2. LOGIC: Derived state (Calculates automatically)
	const currentCategory: Structs.CategoryData = Structs.CONVERSIONS[category];
	const currentEntry: Structs.ConversionEntry = conversionHistory[category];

	const fromUnitData: Structs.UnitData = currentCategory.units[currentEntry.from];
	const toUnitData: Structs.UnitData = currentCategory.units[currentEntry.to];

	const fromFactor = fromUnitData.factor;
	const toFactor = toUnitData.factor;
	
	const numericValue = parseFloat(value)
	const result = !isNaN(numericValue) ? ((numericValue / fromFactor) * toFactor) : 0;

	return (
	<div className="p-8 max-w-lg mx-auto">
		<Card>
			<CardContent className="space-y-4 pt-6">

				<div className="flex gap-2">
					{Object.keys(Structs.CONVERSIONS).map((key) => (
						<Button
							key={key}
							// "default" variant if selected, "outline" if not
							variant={category === key ? "default" : "outline"}
							className="flex-1 capitalize"
							onClick={() => {
								setCategory(key as Structs.Category);
							}}
						>
							{key}
						</Button>
					))}
				</div>

				<div className="grid grid-cols-[1fr_auto] gap-2 items-center">
					{/* FROM */}
					<Input 
						type="number" 
						value={value} 
						onChange={(e) => setValue(e.target.value)} 
						placeholder="Enter value"
					/>

					<Select 
						value={currentEntry.from} 
						onValueChange={(val) => updateConversionHistory(category, 'from', val)}
					>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.keys(currentCategory.units).map(u => (
								<SelectItem key={u} value={u}>{u}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-[1fr_auto] gap-2 items-center">
					{/* TO */}
					<div className="text-center text-xl font-bold p-4 bg-slate-100 rounded-lg">
						{result.toFixed(2)}
					</div>

					<Select 
						value={currentEntry.to} 
						onValueChange={(val) => updateConversionHistory(category, 'to', val)}
					>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.keys(currentCategory.units).map(u => (
								<SelectItem key={u} value={u}>{u}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

			</CardContent>
		</Card>
	</div>
	);
}