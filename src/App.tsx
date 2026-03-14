import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select";
import { ButtonGroup } from './components/ui/button-group';

import { INITIAL_CATEGORY, INITIAL_HISTORY, CONVERSIONS, CATEGORY_ITEMS } from './data/constants.ts';
import type { Category, ConversionHistory, CategoryData, ConversionEntry, UnitData} from './data/constants.ts';

import { ArrowLeftRight, Shuffle, Copy, Check } from 'lucide-react';
import { convert, getRandomConversion, getUnitData } from './data/utils.ts';
import { formatCopyPaste, formatHumanReadable, isInputValid, sanitizeInput } from './data/format.ts';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './components/ui/carousel.tsx';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerClose, DrawerTrigger } from './components/ui/drawer.tsx';
import { toast } from 'sonner';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';
import { Toaster } from './components/ui/sonner.tsx';
import { Slider } from './components/ui/slider.tsx';

import { NativeCanvasCompare } from './components/native-canvas.tsx';

export default function App() {
	// 1. STATE: These track user choices
	const [category, setCategory] = useState<Category>(INITIAL_CATEGORY);
	const [value, setValue] = useState<string>("1");
	
	const [conversionHistory, setConversionHistory] = useImmer<ConversionHistory>(INITIAL_HISTORY);	
	
	const updateConversionHistory = (category: Category, field: 'from' | 'to', value: string) => {
		setConversionHistory(draft => {
			draft[category][field] = value;
		});
	}

	const [copied, setCopied] = useState(false);

	// 2. LOGIC: Derived state (Calculates automatically)
	const currentCategoryData: CategoryData = CONVERSIONS[category];
	const currentEntry: ConversionEntry = conversionHistory[category];

	const fromUnitData: UnitData = getUnitData(currentCategoryData, currentEntry.from); 
	const toUnitData: UnitData = getUnitData(currentCategoryData, currentEntry.to);

	const inputValue: number = parseFloat(sanitizeInput(value));
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

	// 4. COPY:
	const handleCopy = () => {
		const copiedText = formatCopyPaste(result, toUnitData);
		navigator.clipboard.writeText(copiedText);
		setCopied(true);
		toast.success('Copied:', {
			description: copiedText, //see index.css [data-sonner-x] for styling
			position: 'bottom-center'
		});
	};
	useEffect(() => {
		setCopied(false);
		return () => {};
	}, [result]);

	return (
	<>
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
						<div className='flex gap-2 w-full min-w-0 h-12 md:h-24'>
							<Button
								className="flex-1 h-full text-lg md:text-2xl"
								variant="outline"
								size="icon"
								onClick={handleRandomize}
								title="I'm feeling random"
							>
								<Shuffle className='size-5 md:size-8' />

								<span className='hidden md:inline md:pl-2'>I'm feeling random</span>
								<span className='md:hidden'>Random</span>
							</Button>
						</div>

						{/* CATEGORY */}
						<div className='flex gap-2 items-center w-full min-w-0'>

							<Select 
								value={category} 
								onValueChange={(value: string) => setCategory(value as Category)}
							>
								<SelectTrigger className="w-full py-2 md:py-6 px-3 md:px-4 flex items-center justify-between text-sm md:text-xl">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
									{CATEGORY_ITEMS.map((item) => (
										<SelectItem key={item.id} value={item.id} className='text-sm md:text-xl md:py-3'>
										{item.label}
										</SelectItem>
									))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* INPUT AND OUTPUT */}
						<div className='flex gap-2 items-center w-full min-w-0'>
						<ButtonGroup className='flex-1 flex h-14 md:h-24'>
							<Input 
								className='flex-1 h-full px-3 md:px-4 text-base md:text-xl'
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
								onClick={handleCopy}
								className={`
									flex-1 h-full px-3
									bg-slate-100 rounded-md border border-slate-200 
									text-base md:text-xl font-bold text-black
									relative items-center justify-center
								`}
							>
								<span className='truncate'>{result}</span>

								<div className='absolute top-2 right-2 md:p-1 rounded hover:bg-slate-200 transition-colors'>
									{copied ? (
										<Check className='size-2 md:size-4 text-green-600' />
									) : (
										<Copy className='size-2 md:size-4 text-slate-500' />
									)}
								</div>
							</Button>
						</ButtonGroup>
						</div>

						{/* SLIDER */ }
						<div className='flex gap-2 items-center w-full min-w-0'>
							<Slider 
								value={[inputValue]}
								onValueChange={(vals) => setValue(vals[0].toString())}
								min={0}
								max={100}
							/>
						</div>

						{/* SELECT UNITS */}
						<div className='flex gap-2 items-center w-full min-w-0'>
						<ButtonGroup className='flex-1 flex min-w-0 overflow-hidden'>
							<Select 
								value={currentEntry.from} 
								onValueChange={(val) => updateConversionHistory(category, 'from', val)}
							>
								<SelectTrigger className="flex-1 min-w-0 truncate py-2 md:py-6 px-3 md:px-4 flex items-center justify-between text-sm md:text-xl">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{currentCategoryData.unitGroups.map((group, index) => (
										<React.Fragment key={group.label}>

											<SelectGroup key={group.label}>
												<SelectLabel>{group.label}</SelectLabel>
												{Object.entries(group.units).map(([key, unit]) => (
													<SelectItem key={key} value={key} className='text-sm md:text-xl md:py-3'>
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
								className="h-auto w-8 md:w-14 shrink-0 flex items-center justify-center"
								variant="outline"
								size="icon"
								onClick={handleSwap}
								title="Swap units"
							>
								<ArrowLeftRight className='size-4' />
							</Button>

							<Select 
								value={currentEntry.to} 
								onValueChange={(val) => updateConversionHistory(category, 'to', val)}
							>
								<SelectTrigger className="flex-1 min-w-0 truncate py-2 md:py-6 px-3 md:px-4 flex items-center justify-between text-sm md:text-xl">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{currentCategoryData.unitGroups.map((group, index) => (
										<React.Fragment key={group.label}>

											<SelectGroup key={group.label}>
												<SelectLabel>{group.label}</SelectLabel>
												{Object.entries(group.units).map(([key, unit]) => (
													<SelectItem key={key} value={key} className='text-sm md:text-xl md:py-3'>
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

						
						{/* VISUALIZATION */}
						<div className='flex gap-2 items-center w-full h-full min-w-0'>
							<NativeCanvasCompare
								conversionCategory={category}
								src1={ fromUnitData.customImg ? currentEntry.from : category }
								cnt1={inputValue}
								src2={ toUnitData.customImg ? currentEntry.to : category }
								cnt2={convertedValue}
							/>
						</div>

					</CardContent>
				</Card>
			</CarouselItem>

			<CarouselItem className="basis-1/1 pt-0 pl-2 pr-2">
				<Card>
					<CardContent className="h-[calc(100dvh-4rem)] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 p-6 gap-4">

						{/* FROM DESC */}
						<Drawer direction="bottom">
							<DrawerTrigger asChild>
								<div className='pointer-events-auto md:pointer-events-none flex-1 min-w-0 flex flex-col md:pr-6'>
									
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

									<p className='text-sm text-slate-700 hyphens-auto line-clamp-3 md:line-clamp-none'>
										{fromUnitData.desc ?? "No description provided."}
									</p>
								</div>
							</DrawerTrigger>

							<DrawerContent className='p-6'>
								<DrawerHeader>
									<DrawerTitle>{fromUnitData.singular}</DrawerTitle>
								</DrawerHeader>

								<div className='flex-1 overflow-y-auto'>
									<p className="text-slate-700 leading-relaxed">
										{fromUnitData.desc}
									</p>
								</div>

								<DrawerFooter className='pb-0'>
									<DrawerClose asChild>
										<Button variant="outline">Ok</Button>
									</DrawerClose>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>


						{/* TO DESC */}
						<Drawer direction="bottom">
							<DrawerTrigger asChild>
								<div className='pointer-events-auto md:pointer-events-none flex-1 min-w-0 flex flex-col md:pl-2'>
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

									<p className='text-sm text-slate-700 hyphens-auto line-clamp-3 md:line-clamp-none'>
										{toUnitData.desc ?? "No description provided."}
									</p>
								</div>
							</DrawerTrigger>

							<DrawerContent className='p-6 flex flex-col'>
								<DrawerHeader>
									<DrawerTitle>{toUnitData.singular}</DrawerTitle>
								</DrawerHeader>

								<div className='flex-1 overflow-y-auto'>
									<p className="text-slate-700 leading-relaxed">
										{toUnitData.desc}
									</p>
								</div>

								<DrawerFooter className='pb-0'>
									<DrawerClose asChild>
										<Button variant="outline">Ok</Button>
									</DrawerClose>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>

					</CardContent>
				</Card>
			</CarouselItem>

      	</CarouselContent>
		</div>
	  	</Carousel>
	</div>

	<Toaster />
	</>
	);
}


