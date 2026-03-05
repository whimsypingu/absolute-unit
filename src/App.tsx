import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CONVERSIONS = {
	length: {
		units: {
			meters: { label: 'Meters', factor: 1 },
			feet: { label: 'Feet', factor: 3.28084 },
			inches: { label: 'Inches', factor: 39.3701 },
		}
	},
	weight: {
		units: {
			kilograms: { label: 'Kilograms', factor: 1 },
			pounds: { label: 'Pounds', factor: 2.20462 },
			ounces: { label: 'Ounces', factor: 35.274 },
		}
	}
};


export default function App() {
	// 1. STATE: These track user choices
	const [category, setCategory] = useState<keyof typeof CONVERSIONS>('length');
	const [value, setValue] = useState<string>("");
	
	const [unitHistory, setUnitHistory] = useImmer({
		length: { from: 'meters', to: 'feet' },
		weight: { from: 'kilograms', to: 'pounds'},
	});
	const updateUnitHistory = (category: string, field: 'from' | 'to', value: string) => {
		setUnitHistory(draft => {
			draft[category][field] = value;
		});
	}

	// 2. LOGIC: Derived state (Calculates automatically)
	const currentCategory = CONVERSIONS[category];
	const currentUnits = unitHistory[category];

	const fromUnitData = currentCategory.units[currentUnits.from as keyof typeof currentCategory.units];
	const toUnitData = currentCategory.units[currentUnits.to as keyof typeof currentCategory.units];

	const fromFactor = fromUnitData.factor;
	const toFactor = toUnitData.factor;
	
	const numericValue = parseFloat(value)
	const result = !isNaN(numericValue) ? ((numericValue / fromFactor) * toFactor) : 0;

	return (
	<div className="p-8 max-w-lg mx-auto">
		<Card>
			<CardContent className="space-y-4 pt-6">

				<div className="flex gap-2">
					{Object.keys(CONVERSIONS).map((key) => (
						<Button
							key={key}
							// "default" variant if selected, "outline" if not
							variant={category === key ? "default" : "outline"}
							className="flex-1 capitalize"
							onClick={() => {
								setCategory(key as keyof typeof CONVERSIONS);
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
						value={currentUnits.from} 
						onValueChange={(val) => updateUnitHistory(category, 'from', val)}
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
						value={currentUnits.to} 
						onValueChange={(val) => updateUnitHistory(category, 'to', val)}
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