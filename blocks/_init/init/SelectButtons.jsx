﻿import {CP} from './CP.jsx';

CP.SelectButtons=(props)=>{
	const {BaseControl,Button,ButtonGroup}=wp.components;
	return (
		<BaseControl label={props.label} help={props.help} id={'CP-SelectButtons-'+wp.compose.useInstanceId(CP.SelectButtons)}>
			<div className="selectButtons">
				<ButtonGroup>
					{props.options.map((option)=>(
						<Button
							onClick={()=>props.onChange(option.value)}
							isPrimary={props.selected===option.value}
							key={option.value}
						>{option.label}</Button>
					))}
				</ButtonGroup>
			</div>
		</BaseControl>
	);
};