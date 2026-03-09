import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxList, ComboboxEmpty, ComboboxItem } from "@/components/ui/combobox";
import { ButtonGroup } from './components/ui/button-group';

import { INITIAL_CATEGORY, INITIAL_HISTORY, CONVERSIONS, CATEGORY_ITEMS } from './data/constants.ts';
import type { Category, ConversionHistory, CategoryData, ConversionEntry, UnitData, CategoryItem} from './data/constants.ts';

import { ArrowLeftRight, Shuffle } from 'lucide-react';
import { convert, getRandomConversion, getUnitData } from './data/utils.ts';
import { formatHumanReadable, isInputValid, sanitizeInput } from './data/format.ts';
import React from 'react';
import { Item, ItemContent, ItemDescription, ItemTitle } from './components/ui/item.tsx';

export default function App() {
	// 1. STATE: These track user choices
	const [category, setCategory] = useState<Category>(INITIAL_CATEGORY);
	const [value, setValue] = useState<string>("");
	
	const [conversionHistory, setConversionHistory] = useImmer<ConversionHistory>(INITIAL_HISTORY);	
	
	const updateConversionHistory = (category: Category, field: 'from' | 'to', value: string) => {
		setConversionHistory(draft => {
			draft[category][field] = value;
		});
	}

	// 2. LOGIC: Derived state (Calculates automatically)
	const currentCategoryData: CategoryData = CONVERSIONS[category];
	const currentEntry: ConversionEntry = conversionHistory[category];

	const fromUnitData: UnitData = getUnitData(currentCategoryData, currentEntry.from); 
	const toUnitData: UnitData = getUnitData(currentCategoryData, currentEntry.to);

	const convertedValue: number = convert(sanitizeInput(value), fromUnitData.toBase, toUnitData.fromBase);
	const result: string = formatHumanReadable(convertedValue);

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
			<CardContent className="space-y-4">
				<div className='flex gap-2 items-center w-full min-w-0'>

					<Combobox 
						autoHighlight
						items={CATEGORY_ITEMS}
						value={CATEGORY_ITEMS.find((item) => item.id === category) || null}
						onValueChange={(item: CategoryItem | null) => {
							if (item) setCategory(item.id as Category);
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

				<div className='flex gap-2 items-center w-full min-w-0'>
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


				{/* UNITS */}
				<div className='flex gap-2 items-center w-full min-w-0'>
				<ButtonGroup className='flex-1 flex min-w-0 overflow-hidden'>
					<Select 
						value={currentEntry.from} 
						onValueChange={(val) => updateConversionHistory(category, 'from', val)}
					>
						<SelectTrigger className="flex-1 min-w-0 truncate">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{currentCategoryData.unitGroups.map((group, index) => (
								<React.Fragment key={group.label}>

									<SelectGroup key={group.label}>
										<SelectLabel>{group.label}</SelectLabel>
										{Object.entries(group.units).map(([key, unit]) => (
											<SelectItem key={key} value={key}>
												{unit.plural}
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
						<SelectTrigger className="flex-1 min-w-0 truncate">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{currentCategoryData.unitGroups.map((group, index) => (
								<React.Fragment key={group.label}>

									<SelectGroup key={group.label}>
										<SelectLabel>{group.label}</SelectLabel>
										{Object.entries(group.units).map(([key, unit]) => (
											<SelectItem key={key} value={key}>
												{unit.plural}
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


				<div className='flex gap-2 items-center w-full min-w-0'>
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

		<Card className="w-full max-w-xl flex flex-col min-h-[400px]">
		<CardContent className="flex flex-grow items-stretch divide-x divide-slate-200">
			{/* Left Column: Metric Fact */}
			<div className='flex-1 min-w-0 pr-6 flex flex-col'>
				
				<h3 className='text-lg font-medium mb-2'>
					{fromUnitData.singular}
					{!!fromUnitData.abbr && (
						<span className="text-sm text-muted-foreground font-normal ml-2">({fromUnitData.abbr})</span>
					)}
				</h3>

				<p className='text-sm text-slate-700'>
					{fromUnitData.desc ?? "No description provided."}	
				</p>

				<div className='pt-2 mt-auto border-t border-slate-100 text-[0.625rem] text-right text-slate-400'>
					{fromUnitData.lastCheck ?? "Au"}
				</div>

			</div>
			<div className='flex-1 min-w-0 pl-6 flex flex-col'>

				<h3 className='text-lg font-medium mb-2'>
					{toUnitData.singular}
					{!!toUnitData.abbr && (
						<span className="text-sm text-muted-foreground font-normal ml-2">({toUnitData.abbr})</span>
					)}
				</h3>

				<p className='text-sm text-slate-700'>
					{toUnitData.desc ?? "No description provided."}	
				</p>

				<div className='pt-2 mt-auto border-t border-slate-100 text-[0.625rem] text-right text-slate-400'>
					{toUnitData.lastCheck ?? "Au"}
				</div>

			</div>
							
		</CardContent>
		</Card>
	</div>
	);
}
