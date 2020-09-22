﻿registerBlockType('catpow/formblock',{
	title: '🐾 FormBlock',
	description:'テーマに定義された編集可能なフォームを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className,isSelected,clientId}){
        const {content_path,inputs,data_id,values,actions,EditMode=false}=attributes;
		
		let postDataSelection=false;
		
		if(!actions && content_path){
			const path=content_path.substr(0,content_path.lastIndexOf('/'));
			wp.apiFetch({path:'cp/v1/'+path+'/actions'}).then((actions)=>{
				Object.keys(actions).map((key)=>actions[key].json='action');
				setAttributes({actions});
			});
		}
		
        return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={[
							{
								icon: 'edit',
								title: 'EditMode',
								isActive: EditMode,
								onClick: () => setAttributes({EditMode:!EditMode})
							}
						]}
					/>
				</BlockControls>
				<div class={"formBlock embedded_content"+(EditMode?' editMode':'')}>
					<div class="label">{content_path || 'not selected'}</div>
					<InnerBlocks
						allowedBlocks={['catpow/formblockcontent']}
					/>
				</div>
				<InspectorControls>
					<PanelBody title="フォーム">
						<TreeSelect
							label='path'
							selectedId={content_path}
							tree={cpEmbeddablesTree.formblock}
							onChange={(content_path)=>{
								const path=content_path.substr(0,content_path.lastIndexOf('/'));
								wp.apiFetch({path:'cp/v1/'+path+'/template'}).then((template)=>{
									console.log(template);
									wp.data.dispatch('core/block-editor').replaceInnerBlocks(
										clientId,
										CP.createBlocks(template)
									);
								});
								setAttributes({content_path,actions:null});
							}}
						/>
					</PanelBody>
					<PanelBody title="入力値" initialOpen={false}>
						<TextControl
							label='入力名'
							value={inputs}
							onChange={(inputs)=>{setAttributes({inputs});}}
						/>
						<TextControl
							label='データID'
							value={data_id}
							onChange={(data_id)=>{setAttributes({data_id});}}
						/>
						<TextareaControl
							label='初期値'
							value={values}
							onChange={(values)=>{setAttributes({values});}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
        );
    },

	save({attributes,className,setAttributes}){
		return <InnerBlocks.Content/>;
	}
});

registerBlockType('catpow/formblockcontent',{
	title:'🐾 FormBlockContent',
	icon:'editor-code',
	category:'catpow',
    parent:['catpow/formblock'],
	attributes:{
		name:{type:'attribute',label:'名前',selector:'formBlockContent',attribute:'name',default:'edit'},
		action:{type:'attribute',label:'アクション',selector:'formBlockContent',attribute:'action',default:'{}'}
	},
	edit({attributes,className,setAttributes,clientId}){
		const {name}=attributes;
		
		const parentClientId=wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId,'catpow/formblock')[0];
		const parentBlock=wp.data.select('core/block-editor').getBlock(parentClientId);
		const actions=parentBlock.attributes.actions;
		
        return (
			<Fragment>
				<div className={'formBlockContent embedded_content'}>
					<div class="label">{name}</div>
					<InnerBlocks template={[['catpow/section']]} templateLock={false}/>
				</div>
				<InspectorControls>
					<PanelBody title="設定" initialOpen={true}>
						<TextControl
							label='名前'
							value={name}
							onChange={(name)=>{setAttributes({name});}}
						/>
					</PanelBody>
					{actions &&
						<SelectClassPanel
							title='アクション'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={actions}
							initialOpen={true}
						/>
					}
				</InspectorControls>
        	</Fragment>
		);
    },
	save({attributes,className,setAttributes}){
		const {name,action}=attributes;
		return (
			<Fragment>
				<formBlockContent name={name} action={action}>
					<InnerBlocks.Content/>
				</formBlockContent>
			</Fragment>
		);
	}
});