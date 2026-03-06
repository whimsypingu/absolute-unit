import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox, ComboboxTrigger, ComboboxValue, ComboboxContent, ComboboxInput, ComboboxList, ComboboxEmpty, ComboboxGroup, ComboboxItem } from "@/components/ui/combobox";

import * as Structs from './data/types.ts';
import { Shuffle } from 'lucide-react';
import { convert } from './data/utils.ts';

export default function App() {
	// 1. STATE: These track user choices
	const [category, setCategory] = useState<Structs.Category>(Structs.INITIAL_CATEGORY);
	const [value, setValue] = useState<string>("");
	
	const [conversionHistory, setConversionHistory] = useImmer<Structs.ConversionHistory>(Structs.INITIAL_HISTORY);	
	
	const updateConversionHistory = (category: Structs.Category, field: 'from' | 'to', value: string) => {
		setConversionHistory(draft => {
			draft[category][field] = value;
		});
	}

	// 2. LOGIC: Derived state (Calculates automatically)
	const currentCategoryData: Structs.CategoryData = Structs.CONVERSIONS[category];
	const currentEntry: Structs.ConversionEntry = conversionHistory[category];

	const fromUnitData: Structs.UnitData = currentCategoryData.units[currentEntry.from];
	const toUnitData: Structs.UnitData = currentCategoryData.units[currentEntry.to];

	const result = convert(value, fromUnitData.toBase, toUnitData.fromBase);

	// 3. RANDOMIZE
	const handleRandomize = () => {
		let randomCategory: Structs.Category = category;
		while (randomCategory === category) {
			randomCategory = Structs.CATEGORIES[Math.floor(Math.random() * Structs.CATEGORIES.length)];
		}

		setCategory(randomCategory);

		const unitKeys: string[] = Object.keys(Structs.CONVERSIONS[randomCategory].units);

		if (unitKeys.length < 2) {
			updateConversionHistory(randomCategory, 'from', unitKeys[0]);
			updateConversionHistory(randomCategory, 'to', unitKeys[0]);
			return;
		}

		const randomFrom: string = unitKeys[Math.floor(Math.random() * unitKeys.length)];
		let randomTo: string = randomFrom;
		while (randomTo === randomFrom) {
			randomTo = unitKeys[Math.floor(Math.random() * unitKeys.length)];
		}

		updateConversionHistory(randomCategory, 'from', randomFrom);
		updateConversionHistory(randomCategory, 'to', randomTo);
		return;
	}

	return (
	<div className="p-8 max-w-lg mx-auto">
		<Card>
			<CardContent className="space-y-4 pt-6">

				<div className='flex gap-2 items-center'>

					<Combobox 
						autoHighlight
						items={Structs.CATEGORY_ITEMS}
						value={Structs.CATEGORY_ITEMS.find((item) => item.id === category) || null}
						onValueChange={(item: Structs.CategoryItem | null) => {
							if (item) setCategory(item.id as Structs.Category);
						}}
					>
						<ComboboxInput
							className="flex-1" 
							placeholder="Select a category" 
							showClear 
						/>
						<ComboboxContent>
							<ComboboxEmpty>No items found.</ComboboxEmpty>
							<ComboboxList>
							{(item) => (
								<ComboboxItem key={item} value={item}>
								{item.label}
								</ComboboxItem>
							)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>

					<Button
						variant="outline"
						size="icon"
						onClick={handleRandomize}
						title="I'm feeling random"
					>
						<Shuffle className='h-4 w-4' />
					</Button>
				</div>

				<div className='flex gap-2 items-center'>	
					{/* FROM */}
					<Input 
						className='flex-1'
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
							{Object.entries(currentCategoryData.units).map(([key, unit]) => (
								<SelectItem key={key} value={key}>
									{unit.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='flex gap-2 items-center'>	
					{/* TO */}
					<div className="flex-1 text-center text-xl font-bold p-4 bg-slate-100 rounded-lg">
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
							{Object.entries(currentCategoryData.units).map(([key, unit]) => (
								<SelectItem key={key} value={key}>
									{unit.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

			</CardContent>
		</Card>
	</div>
	);
}