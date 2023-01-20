﻿import {CP} from './CP.jsx';

CP.ColorVarTracer=(props)=>{
	const {target}=props;
	const {useMemo}=wp.element;
	
	const vars=useMemo(()=>{
		const vars={};
		if(target){
			const styles=getComputedStyle(target);
			['b','s','t','m','a','i'].forEach((k)=>{
				['','-container'].forEach((p)=>{
					const name=`--cp${p}-tones-${k}-h`;
					vars[name]=styles.getPropertyValue(name);
				})
			});
		}
		return vars;
	},[target]);
	
	return <div style={vars}>{props.children}</div>;
};