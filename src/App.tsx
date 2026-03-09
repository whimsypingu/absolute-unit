import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select";
import { ButtonGroup } from './components/ui/button-group';

import { INITIAL_CATEGORY, INITIAL_HISTORY, CONVERSIONS, CATEGORY_ITEMS } from './data/constants.ts';
import type { Category, ConversionHistory, CategoryData, ConversionEntry, UnitData} from './data/constants.ts';

import { ArrowLeftRight, Shuffle } from 'lucide-react';
import { convert, getRandomConversion, getUnitData } from './data/utils.ts';
import { formatHumanReadable, isInputValid, sanitizeInput } from './data/format.ts';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './components/ui/carousel.tsx';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerClose, DrawerTrigger } from './components/ui/drawer.tsx';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';

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
	<div className="h-full w-full overflow-hidden flex flex-col items-center">

		<Carousel 
			plugins={[WheelGesturesPlugin()]}
			opts={{
				align: 'start',
				slidesToScroll: 1,
				loop: true, 
			}}
			orientation='vertical'
			className='w-full max-w-xl md:max-w-3xl h-[100dvh]'
		>
		<div className='pt-2'>
		<CarouselContent className="-mt-0 h-[100dvh]">

			<CarouselItem className="basis-1/1 pt-0 pl-2 pr-2">
				<Card>
					<CardContent className="h-[calc(100dvh-4rem)] flex flex-col p-6 gap-6">

						{/* IM FEELING RANDOM */}
						<div className='flex gap-2 w-full min-w-0 h-24'>
							<Button
								className="flex-1 h-full"
								variant="outline"
								size="icon"
								onClick={handleRandomize}
								title="I'm feeling random"
							>
								<Shuffle className='h-5 w-5' />
								I'm feeling random
							</Button>
						</div>

						{/* CATEGORY */}
						<div className='flex gap-2 items-center w-full min-w-0'>

							<Select 
								value={category} 
								onValueChange={(value: string) => setCategory(value as Category)}
							>
								<SelectTrigger className="w-full h-18 py-6 px-4 flex items-center justify-between">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
									{CATEGORY_ITEMS.map((item) => (
										<SelectItem key={item.id} value={item.id}>
										{item.label}
										</SelectItem>
									))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* FROM AND TO */}
						<div className='flex gap-2 items-center w-full min-w-0'>
						<ButtonGroup className='flex-1 flex h-14'>
							<Input 
								className='flex-1 h-full text-lg'
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

							<Button
								variant='outline'
								disabled
								className={`
									flex-1 h-full px-3 flex items-center 
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



					</CardContent>
				</Card>
			</CarouselItem>

			<CarouselItem className="basis-1/1 pt-0 pl-2 pr-2">
				<Card>
					<CardContent className="h-[calc(100dvh-4rem)] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 p-6 gap-4">

						{/* FROM DESC */}
						<div className='flex-1 min-w-0 flex flex-col md:pr-6'>
							
							<div className='flex w-full items-baseline gap-2'>
								<div className='flex flex-grow items-baseline gap-2'>
									<h3 className='text-lg font-medium mb-2'>{fromUnitData.singular}</h3>

									{!!fromUnitData.abbr && (
										<span className="text-sm text-muted-foreground font-normal">({fromUnitData.abbr})</span>
									)}
								</div>

								{!!fromUnitData.lastCheck && (
									<span className='text-[0.5rem] text-right text-slate-400 border-l border-slate-200 pl-2'>{fromUnitData.lastCheck}</span>
								)}
							</div>

							<Drawer direction="bottom">
								<DrawerTrigger asChild>
									<p className='text-sm text-slate-700 hyphens-auto line-clamp-3 md:line-clamp-none'>
										{fromUnitData.desc ?? "No description provided."}
									</p>
								</DrawerTrigger>

								<DrawerContent className='p-6'>
									<DrawerHeader>
										<DrawerTitle>{fromUnitData.singular}</DrawerTitle>
									</DrawerHeader>

									<p className="text-slate-700 leading-relaxed">
										{fromUnitData.desc}
									</p>

									<DrawerFooter>
										<DrawerClose asChild>
											<Button variant="outline">Close</Button>
										</DrawerClose>
									</DrawerFooter>
								</DrawerContent>
							</Drawer>
						</div>


						{/* TO DESC */}
						<div className='flex-1 min-w-0 flex flex-col md:pl-2'>

							<div className='flex w-full items-baseline gap-2'>
								<div className='flex flex-grow items-baseline gap-2'>
									<h3 className='text-lg font-medium mb-2'>{toUnitData.singular}</h3>

									{!!toUnitData.abbr && (
										<span className="text-sm text-muted-foreground font-normal">({toUnitData.abbr})</span>
									)}
								</div>

								{!!toUnitData.lastCheck && (
									<span className='text-[0.5rem] text-right text-slate-400 border-l border-slate-200 pl-2'>{toUnitData.lastCheck}</span>
								)}
							</div>

							<Drawer direction="bottom">
								<DrawerTrigger asChild>
									<p className='text-sm text-slate-700 hyphens-auto line-clamp-3 md:line-clamp-none'>
										{toUnitData.desc ?? "No description provided."}
									</p>
								</DrawerTrigger>

								<DrawerContent className='p-6'>
									<DrawerHeader>
										<DrawerTitle>{toUnitData.singular}</DrawerTitle>
									</DrawerHeader>

									<p className="text-slate-700 leading-relaxed">
										{toUnitData.desc}
									</p>

									<DrawerFooter>
										<DrawerClose asChild>
											<Button variant="outline">Close</Button>
										</DrawerClose>
									</DrawerFooter>
								</DrawerContent>
							</Drawer>
						</div>


					</CardContent>
				</Card>
			</CarouselItem>

      	</CarouselContent>
		</div>
	  	</Carousel>
	</div>
	);
}


