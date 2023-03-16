﻿import {CP} from './CP.jsx';

CP.SelectPreparedImage=({className,name,value,color,onChange,...otherProps})=>{
	let onClick;
	const {useEffect,useReducer}=wp.element;
	const {getURLparam,setURLparam,setURLparams,removeURLparam}=Catpow.util;
	const [state,dispatch]=useReducer((state,action)=>{
		const newState={...state};
		switch(action.type){
			case 'nextPage':newState.page--;break;
			case 'prevPage':newState.page++;break;
			case 'gotoPage':newState.page=action.page;break;
			case 'update':
				if(action.images){
					newState.images=action.images;
					const bareURL=removeURLparam(value,'c');
					newState.image=action.images.find((image)=>image.url===bareURL);
				}
				if(action.image){newState.image=action.image;}
		}
		return newState;
	},{page:0,images:null,image:null});

	CP.cache.PreparedImage=CP.cache.PreparedImage || {};

	useEffect(()=>{
		if(state.images===null){
			if(CP.cache.PreparedImage[name]){
				dispatch({type:'update',images:CP.cache.PreparedImage[name]});
			}
			else{
				wp.apiFetch({path:'cp/v1/images/'+name}).then((images)=>{
					CP.cache.PreparedImage[name]=images;
					dispatch({type:'update',images});
				});
			}
			
		}
	},[state.images]);
	useEffect(()=>{
		onChange({...state.image,url:setURLparams(state.image?state.image.url:value,{c:color,theme:wpinfo.theme})});
	},[state.image]);
	
	if(state.images===null){return false;}
	return (
		<ul className={'selectPreparedImage '+name+' '+className} {...otherProps}>
			{state.images.map((image)=>{
				const url=setURLparams(image.url,{c:color,theme:wpinfo.theme});
				return (
					<li className={'item '+((value==url)?'active':'')} key={image.url}>
						<img
							src={url}
							alt={image.alt}
							onClick={()=>dispatch({type:'update',image})}
						/>
					</li>
				);
			})}
		</ul>
	);
};