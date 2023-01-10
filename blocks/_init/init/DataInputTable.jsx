﻿import {CP} from './CP.jsx';

CP.DataInputTable=(props)=>{
	const {cols,value,onChange}=props;
	const {useCallback,useMemo}=wp.element;
	const el=wp.element.createElement;
	const Row=useCallback((props)=>{
		const {cols,value,onChange}=props;
		return (
			<tr className="DataInputTable__body__row">
			{Object.keys(cols).map((c)=>(
				<td className="DataInputTable__body__row__cell" key={c}>
					<CP.DynamicInput
						value={value[c]}
						onChange={(val)=>{
							value[c]=val;
							onChange(value);
						}}
						param={cols[c]}
					/>
				</td>
			))}
			</tr>
		);
	},[]);
	const defaultRowValues=useMemo(()=>{
		const rowValue={};
		Object.keys(cols).forEach((c)=>{
			rowValue[c]=cols[c].default || '';
		});
		return [rowValue];
	},[cols]);
	const colsWithoutLabel=useMemo(()=>{
		const colsWithoutLabel={};
		Object.keys(cols).forEach((c)=>{
			const {label,...otherParams}=cols[c];
			colsWithoutLabel[c]=otherParams;
		});
		return colsWithoutLabel;
	},[cols]);

	return (
		<table className="DataInputTable">
			<thead className="DataInputTable__head">
				<tr className="DataInputTable__head__row">
				{Object.keys(cols).map((c)=>(
					<th className="DataInputTable__head__row__cell" key={c}>{cols[c].label || c}</th>
				))}
				</tr>
			</thead>
			<tbody className="DataInputTable__body">
			{(value || defaultRowValues).map((rowValue,index)=>(
				<Row
					cols={colsWithoutLabel}
					value={rowValue}
					onChange={(rowValue)=>{
						if(!value){onChange([rowValue]);return;}
						value[index]=rowValue;
						onChange(value);
					}}
					onDelete={()=>{
						if(!value){onChange([]);return;}
						value.splice(index,1);
						onChange(value);
					}}
					onClone={()=>{
						if(!value){onChange([defaultRowValues]);return;}
						value.splice(index,0,JSON.parse(JSON.stringify(rowValue)));
						onChange(value);
					}}
					key={index}
				/>
			))}
			</tbody>
		</table>
	);
};