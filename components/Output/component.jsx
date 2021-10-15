﻿Catpow.Output=(props)=>{
	const {conf,value}=props;
	const {createElemnt:el}=wp.element;
	if(!value)return '';
	switch(conf.output_type){
		case 'group':
			return (
				<ul className="OutputGroup">
					{Object.keys(value).map((key)=>{
						const row=value[key];
						console.log(key);
						console.log(row);
						return (
							<li className="item" key={key}>
								{Object.keys(conf.meta).map((name)=>(
									<dl key={name}>
										<dt>{conf.meta[name].label}</dt>
										<dd><Catpow.Output conf={conf.meta[name]} value={row[name]}/></dd>
									</dl>
								))}
							</li>
						);
					})}
				</ul>
			);
		case 'select':
		case 'radio':
		case 'checkbox':{
			const labels=(Array.isArray(value)?value:[value]).filter((val)=>!!val).map((val)=>conf.dict && conf.dict[val]);
			if(!labels.length){return false;}
			return (
				<ul clasName="OutputLabels">
					{labels.map((label)=><li className="item">{label}</li>)}
				</ul>
			);
		}
		case 'image':
			return (
				<ul className="OutputImages">
					<li className="item">
						{props.images.map((image)=>(
							<img className="image" src={image.url}/>
						))}
					</li>
				</ul>
				
			);
		default:
			return value.join(',');
	}
}