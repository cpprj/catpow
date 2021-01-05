﻿registerBlockType('catpow/materials',{
	title: '🐾 Materials',
	description:'材料・成分一覧のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items=[],classes,loopParam,loopCount,doLoop,EditMode=false,AltMode=false,currentItemIndex}=attributes;
		const primaryClass='wp-block-catpow-materials';
		
		var states=CP.wordsToFlags(classes);
		
        
		var selectiveClasses=[
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{input:'bool',label:'ループ',key:'doLoop',sub:[
						{label:'content path',input:'text',key:'content_path'},
						{label:'query',input:'textarea',key:'query'},
						{label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
					]}
				]
			}
		];
		const itemSelectiveClasses=[
			'color',
			{label:'ラベル',values:'hasLabel'}
		];
		
		let rtn=[];
		const imageKeys={
			image:{src:"imageSrc",alt:"imageAlt",code:"imageCode",items:"items"}
		};
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected && currentItemIndex==index}
				>
					{itemStates.hasLabel &&
						<div className='label'>
							<RichText
								onChange={(label)=>{item.label=label;save();}}
								value={item.label}
							/>
						</div>
					}
					<ul className="items">
					{item.items.map((subItem,subIndex)=>{
						const subItemStates=CP.wordsToFlags(subItem.classes);
						return (
							<Item
								tag='li'
								set={()=>{
									item.currentItemIndex=subIndex;
									save();
								}}
								attr={item}
								items={item.items}
								index={subIndex}
								isSelected={isSelected && currentItemIndex==index && item.currentItemIndex==subIndex}
							>
								<div class="text">
									<div className="title">
										<RichText
											onChange={(title)=>{subItem.title=title;save();}}
											value={subItem.title}
										/>
									</div>
									<div className="line"></div>
									<div className="amount">
										<RichText
											onChange={(amount)=>{subItem.amount=amount;save();}}
											value={subItem.amount}
										/>
									</div>
									{subItemStates.hasCaption &&
										<div className="caption">
											<RichText
												onChange={(caption)=>{subItem.caption=caption;save();}}
												value={subItem.caption}
											/>
										</div>
									}
								</div>
							</Item>
						);
					})}
					</ul>
				</Item>
			);
		});
		
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
		if(rtn.length<loopCount){
			let len=rtn.length;
			while(rtn.length<loopCount){
				rtn.push(rtn[rtn.length%len]);
			}
		}
		
        return (
			<Fragment>
				<SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.materials || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
					<SelectClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={itemSelectiveClasses}
						filters={CP.filters.materials || {}}
					/>
					<ItemControlInfoPanel/>
				</InspectorControls>
				<Fragment>
					{EditMode?(
						<div className="alt_content">
							<div class="label">
								<Icon icon="edit"/>
							</div>
							<EditItemsTable
								set={setAttributes}
								attr={attributes}
								columns={[
									{type:'text',key:'label',cond:true},
									{type:'items',key:'items',columns:[
										{type:'text',key:'title',cond:true},
										{type:'text',key:'amount',cond:true},
										{type:'text',key:'caption',cond:true},
									],cond:true},
								]}
								isTemplate={states.isTemplate}
							/>
						</div>
					 ):(
						<Fragment>
							{(AltMode && doLoop)?(
								<div className="alt_content">
									<div class="label">
										<Icon icon="welcome-comments"/>
									</div>
									<InnerBlocks/>
								</div>
							):(
								<ul className={classes}>{rtn}</ul>
							)}
						</Fragment>
					 )}
				</Fragment>
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items=[],classes='',loopParam,loopCount,doLoop}=attributes;
		var classArray=_.uniq(classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes}>
					{itemStates.hasLabel &&
						<div className='label'>
							<RichText.Content value={item.label}/>
						</div>
					}
					<ul className="items">
					{item.items.map((subItem,subIndex)=>{
						const subItemStates=CP.wordsToFlags(subItem.classes);
						return (
							<li className={subItem.classes}>
								<div class="text">
									<div className="title">
										<RichText.Content value={subItem.title} />
									</div>
									<div className="line"></div>
									<div className="amount">
										<RichText.Content value={subItem.amount} />
									</div>
									{subItemStates.hasCaption &&
										<div className="caption">
											<RichText.Content value={subItem.caption} />
										</div>
									}
								</div>
							</li>
						);
					})}
					</ul>
				</li>
			);
		});
		return (
			<Fragment>
				<ul className={classes}>
					{rtn}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	}
});