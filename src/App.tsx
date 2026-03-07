import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxList, ComboboxEmpty, ComboboxItem } from "@/components/ui/combobox";

import * as Structs from './data/constants.ts';
import { ArrowLeftRight, Shuffle } from 'lucide-react';
import { convert, getRandomConversion, getUnitData, isInputValid, sanitizeInput } from './data/utils.ts';
import React from 'react';
import { ButtonGroup } from './components/ui/button-group.tsx';

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

	const fromUnitData: Structs.UnitData = getUnitData(currentCategoryData, currentEntry.from); 
	const toUnitData: Structs.UnitData = getUnitData(currentCategoryData, currentEntry.to);

	const result: string = convert(sanitizeInput(value), fromUnitData.toBase, toUnitData.fromBase);

	// 3. MIX:
	const handleRandomize = () => {
		const { category: newCategory, from, to } = getRandomConversion(category);
		setCategory(newCategory);

		updateConversionHistory(newCategory, 'from', from);
		updateConversionHistory(newCategory, 'to', to);
		return;
	};
	const handleSwap = () => {
		const currentFrom = currentEntry.from;
		const currentTo = currentEntry.to;

		updateConversionHistory(category, 'from', currentTo);
		updateConversionHistory(category, 'to', currentFrom);
		return;
	};

	return (
	<div className="min-h-screen flex flex-col items-center p-4 sm:p-8 gap-6">
		<Card className='w-full max-w-xl'>
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

				</div>

				<div className='flex gap-2 items-center'>
				<ButtonGroup className='flex-1 flex'>
					{/* FROM */}
					<Input 
						className='flex-1 h-12 text-lg'
						type="text"
						inputMode='decimal' 
						value={value} 
						onChange={(e) => {
							const val = e.target.value;
							if (isInputValid(val)) {
								setValue(val);
							}
						}}
						placeholder="Enter value"
					/>

					{/* TO */}
					<Button
						variant='outline'
						disabled
						className={`
							flex-1 h-12 px-3 flex items-center 
							bg-slate-100 rounded-md border border-slate-200 
							text-lg font-medium text-black truncate
							[&:disabled]:opacity-100
						`}
					>
						{result}
					</Button>
				</ButtonGroup>
				</div>

				<div className='flex gap-2 items-center'>
				<ButtonGroup className='flex-1 flex'>
					<Select 
						value={currentEntry.from} 
						onValueChange={(val) => updateConversionHistory(category, 'from', val)}
					>
						<SelectTrigger className="flex-1">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{currentCategoryData.unitGroups.map((group, index) => (
								<React.Fragment key={group.label}>

									<SelectGroup key={group.label}>
										<SelectLabel>{group.label}</SelectLabel>
										{Object.entries(group.units).map(([key, unit]) => (
											<SelectItem key={key} value={key}>
												{unit.label}
											</SelectItem>
										))}
									</SelectGroup>

									{index < currentCategoryData.unitGroups.length - 1 && (
										<SelectSeparator />
									)}

								</React.Fragment>
							))}
						</SelectContent>
					</Select>

					<Button
						variant="outline"
						size="icon"
						onClick={handleSwap}
						title="Swap units"
					>
						<ArrowLeftRight className='h-4 w-4' />
					</Button>

					<Select 
						value={currentEntry.to} 
						onValueChange={(val) => updateConversionHistory(category, 'to', val)}
					>
						<SelectTrigger className="flex-1">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{currentCategoryData.unitGroups.map((group, index) => (
								<React.Fragment key={group.label}>

									<SelectGroup key={group.label}>
										<SelectLabel>{group.label}</SelectLabel>
										{Object.entries(group.units).map(([key, unit]) => (
											<SelectItem key={key} value={key}>
												{unit.label}
											</SelectItem>
										))}
									</SelectGroup>

									{index < currentCategoryData.unitGroups.length - 1 && (
										<SelectSeparator />
									)}

								</React.Fragment>
							))}
						</SelectContent>
					</Select>
				</ButtonGroup>
				</div>


				<div className='flex gap-2 items-center'>	
					<Button
						className="flex-1 h-14"
						variant="outline"
						size="icon"
						onClick={handleRandomize}
						title="I'm feeling random"
					>
						<Shuffle className='h-5 w-5' />
						I'm feeling random
					</Button>
				</div>


			</CardContent>
		</Card>

		<Card className="w-full max-w-xl">
		<CardContent className="flex divide-x divide-slate-200">
			{/* Left Column: Metric Fact */}
			<div className="flex-1 p-4">
			<h3 className="font-bold">Metric Facts</h3>
			<p className="text-sm text-muted-foreground">
				Metric units are SI-based and used universally in science and engineering.
			</p>
			</div>

			{/* Right Column: Imperial Fact */}
			<div className="flex-1 p-4">
			<h3 className="font-bold">Imperial Facts</h3>
			<p className="text-sm text-muted-foreground">
				Imperial units are largely US-based and rooted in historical body-part measurements.
			</p>
			</div>
		</CardContent>
		</Card>
	</div>
	);
}