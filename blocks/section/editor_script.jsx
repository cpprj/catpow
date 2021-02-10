﻿CP.config.section={
	devices:['sp','tb'],
	imageKeys:{
		navIcon:{src:"navIcon"},
		image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt",srcset:"imageSrcset"},
		headerImage:{mime:"headerImageMime",src:"headerImageSrc",alt:"headerImageAlt",srcset:"headerImageSrcset"},
		headerBackgroundImage:{mime:"headerBackgroundImageMime",src:"headerBackgroundImageSrc",alt:"headerBackgroundImageAlt",srcset:"headerBackgroundImageSrcset",sources:"headerBackgroundImageSources"},
		backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset",sources:"backgroundImageSources"}
	},
	imageSizes:{
		image:'medium',
		headerImage:'medium_large'
	}
};

registerBlockType('catpow/section',{
	title: '🐾 Section',
	description:'見出しと内容のまとまりを表すセクションのブロックです。',
	icon: 'id-alt',
	category: 'catpow',
	attributes:{
		id:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'id'},
		classes:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'class',default:'wp-block-catpow-section article level3 center catch'},
		navIcon:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'data-icon'},
		
		SectionTag:{type:'text',default:'section'},
		HeadingTag:{type:'text',default:'h2'},

		prefix:{source:'children',selector:'header div.prefix'},
		title:{type:'array',source:'children',selector:'header h2,.header .heading',default:['Title']},
		read:{type:'array',source:'children',selector:'header p'},

		headerImageMime:{source:'attribute',selector:'header .image [src]',attribute:'data-mime'},
		headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		headerImageSrcset:{source:'attribute',selector:'header .image [src]',attribute:'srcset'},
		headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
		headerImageCode:{source:'text',selector:'header .image'},
		
		headerBackgroundImageMime:{source:'attribute',selector:'header .background [src]',attribute:'data-mime'},
		headerBackgroundImageSrc:{source:'attribute',selector:'header .background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		headerBackgroundImageSrcset:{source:'attribute',selector:'header .background [src]',attribute:'srcset'},
		headerBackgroundImageAlt:{source:'attribute',selector:'header .background [src]',attribute:'alt'},
		headerBackgroundImageCode:{source:'text',selector:'header .background'},
		headerBackgroundImageSources:CP.getPictureSoucesAttributesForDevices(
			CP.config.section.devices,'header .background picture','dummy_bg.jpg'
		),

		imageMime:{source:'attribute',selector:'.image [src]',attribute:'data-mime'},
		imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		imageSrcset:{source:'attribute',selector:'.image [src]',attribute:'srcset'},
		imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
		imageCode:{source:'text',selector:'.image'},

		backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		backgroundImageSrcset:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'srcset'},
		backgroundImageCode:{source:'text',selector:'.wp-block-catpow-section>.background'},
		backgroundImageSources:CP.getPictureSoucesAttributesForDevices(
			CP.config.section.devices,'.wp-block-catpow-section>.background picture','dummy_bg.jpg'
		),
		
		frameImageCss:{source:'text',selector:'style.frameImageCss'},
		borderImageCss:{source:'text',selector:'style.borderImageCss'},
		
		iconSrc:{source:'attribute',selector:'.icon [src]',attribute:'src',default:cp.theme_url+'/images/dummy_icon.svg'},
		iconAlt:{source:'attribute',selector:'.icon [src]',attribute:'alt'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
        const {
			SectionTag,HeadingTag,
			id,classes,prefix,title,read,
			headerImageMime,headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
			headerBackgroundImageCode,
			imageMime,imageSrc,imageSrcset,imageAlt,imageCode,
			backgroundImageSrc,backgroundImageCode,
			frameImageCss,borderImageCss,
			iconSrc,iconAlt
		}=attributes;
		
		if(!id){
			setAttributes({id:'s'+(new Date().getTime().toString(16))})
		}
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.section;
		
		const selectiveClasses=[
			{input:'buttons',filter:'sectionTag',key:'SectionTag',label:'セクションタグ',values:['article','section','aside','div']},
			{input:'buttons',filter:'headingTag',key:'HeadingTag',label:'見出しタグ',values:['h1','h2','h3','h4']},
			{
				label:'タイプ',
				filter:'type',
				type:'gridbuttons',
				values:[
					'scene',
					'article',
					'column'
				],
				sub:{
					scene:[
						'color',
						'pattern',
						{label:'プレフィクス',values:'hasPrefix'},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage}
						]},
						{label:'ヘッダ背景画像',values:'hasHeaderBackgroundImage',sub:[
							{input:'picture',label:'背景画像',keys:imageKeys.headerBackgroundImage,devices},
							{label:'薄く',values:'paleHeaderBG'}
						]},
						{label:'抜き色文字',values:'inverseText',sub:[
							{label:'ヘッダ背景色',values:'hasHeaderBackgroundColor'}
						]},
						{label:'リード',values:'hasRead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',label:'背景画像',keys:imageKeys.backgroundImage,devices},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'背景色',values:'hasBackgroundColor'},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'ヘッダ画像コード',
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:'ヘッダ背景画像コード',
									key:'headerBackgroundImageCode',
									cond:states.hasHeaderBackgroundImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					article:[
						'color',
						{label:'レベル',values:{level2:'2',level3:'3',level4:'4'}},
						{label:'見出しタイプ',filter:'heading_type',values:{header:'ヘッダ',headline:'ヘッドライン',catch:'キャッチ'}},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{
								input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage,
								cond:(!states.isTemplate || !headerImageCode)
							}
						]},
						{label:'リード',values:'hasRead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'背景色',values:'hasBackgroundColor'},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:'フレーム画像',values:'hasFrameImage',sub:[
							{input:'frame',css:'frameImageCss',sel:'#'+id},
						]},
						{label:'ボーダー画像',values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents'},
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'ヘッダ画像コード',
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					column:[
						'color',
						'pattern',
						{label:'アイコン',values:'hasIcon',sub:[
							{input:'icon'}
						]},
						{label:'画像',values:'hasImage',sub:[
							{input:'image',keys:imageKeys.image}
						]},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'線',values:{no_border:'なし',thin_border:'細',bold_border:'太'}},
						{label:'角丸',values:'round'},
						{label:'影',values:'shadow',sub:[{label:'内側',values:'inset'}]},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:'ボーダー画像',values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents'},
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'画像コード',
									key:'imageCode',
									cond:states.hasImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					]
				},
				bind:{
					scene:['level2'],
					column:['level3']
				}
			}
		];
		
		var level=CP.getNumberClass({attr:attributes},'level');
		
		
        return [
			<BlockControls>
				<AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>,
			<SectionTag id={id} className={classes}>
				{states.hasImage && 
					<div class="image">
						{(states.isTemplate && imageCode)?(
							<DummyImage text={imageCode}/>
						):(
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								size={imageSizes.image}
							/>
						)}
					</div>
				}
				<div class='contents'>
					<header>
						<div class="title">
							{states.hasIcon && 
								<div class="icon">
									<img src={iconSrc} alt={iconAlt}/>
								</div>
							}
							{states.hasPrefix && 
								<div class="prefix">
									<RichText tagName="div" value={prefix} onChange={(prefix)=>setAttributes({prefix:prefix})}/>
								</div>
							}
							{states.hasHeaderImage &&
								<div class="image">
									{(states.isTemplate && headerImageCode)?(
										<DummyImage text={headerImageCode}/>
									):(
										<SelectResponsiveImage
											set={setAttributes}
											attr={attributes}
											keys={imageKeys.headerImage}
											size={imageSizes.headerImage}
										/>
									)}
								</div>
							}
							<HeadingTag className="heading">
								<RichText tagName="div" value={title} onChange={(title)=>setAttributes({title:title})}/>
							</HeadingTag>
							{states.hasRead && 
								<p><RichText tagName="div" value={read} onChange={(read)=>setAttributes({read:read})}/></p>
							}
						</div>
						
						{states.hasHeaderBackgroundImage && 
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									<DummyImage text={headerBackgroundImageCode}/>
								):(
									<SelectResponsiveImage
										set={setAttributes}
										attr={attributes}
										keys={imageKeys.headerBackgroundImage}
									/>
								)}
							</div>
						}
					</header>
					<div class="text"><InnerBlocks/></div>
				</div>
				{states.hasBackgroundImage && 
					<div class="background">
						{(states.isTemplate && backgroundImageCode)?(
							<DummyImage text={backgroundImageCode}/>
						):(
							<SelectResponsiveImage
								set={setAttributes}
								attr={attributes}
								keys={imageKeys.backgroundImage}
							/>
						)}
					</div>
				}
				{states.hasBorderImage && (
					<style>{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style>{frameImageCss}</style>
				)}
			</SectionTag>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.section || {}}
				/>
				<PanelBody title="ID" icon="admin-links" initialOpen={false}>
					<TextControl
						label='ID'
						onChange={(id)=>{setAttributes({id:id});}}
						value={id}
					/>
				</PanelBody>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classes}
					/>
				</PanelBody>
			</InspectorControls>
        ];
    },
	save({attributes,className,setAttributes}){
        const {
			SectionTag,HeadingTag,
			id,navIcon,classes,prefix,title,read,
			headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
			headerBackgroundImageCode,
			imageSrc,imageSrcset,imageAlt,imageCode,
			backgroundImageSrc,backgroundImageCode,
			frameImageCss,borderImageCss,
			iconSrc,iconAlt
		}=attributes;
		
		var level=CP.getNumberClass({attr:attributes},'level');
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.section;
		
		return (
			<SectionTag id={id} className={classes} data-icon={navIcon}>
				{states.hasImage && 
					<div class="image">
						{(states.isTemplate && imageCode)?(
							imageCode
						):(
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								size='medium_large'
							/>
						)}
					</div>
				}
				<div class="contents">
					<header>
						<div class="title">
							{states.hasIcon && 
								<div class="icon">
									<img src={iconSrc} alt={iconAlt}/>
								</div>
							}
							{states.hasPrefix && 
								<div class="prefix"><RichText.Content value={prefix}/></div>
							}
							{states.hasHeaderImage &&
								<div class="image">
									{(states.isTemplate && headerImageCode)?(
										headerImageCode
									):(
										<ResponsiveImage
											attr={attributes}
											keys={imageKeys.headerImage}
										/>
									)}
								</div>
							}
							<HeadingTag className="heading">
								<RichText.Content value={title}/>
							</HeadingTag>
							{states.hasRead && <p><RichText.Content value={read}/></p>}
						</div>
						{states.hasHeaderBackgroundImage &&
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									headerBackgroundImageCode
								):(
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.headerBackgroundImage}
										devices={devices}
									/>
								)}
							</div>
						}
					</header>
					<div class="text"><InnerBlocks.Content/></div>
				</div>
				{states.hasBackgroundImage && 
					<div class="background">
						{(states.isTemplate && backgroundImageCode)?(
							backgroundImageCode
						):(
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
								devices={devices}
							/>
						)}
					</div>
				}
				{states.hasBorderImage && (
					<style className="borderImageCss">{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style className="frameImageCss">{frameImageCss}</style>
				)}
			</SectionTag>
		);
	},
	deprecated:[
		{
			attributes:{
				id:{source:'attribute',selector:'section',attribute:'id'},
				classes:{source:'attribute',selector:'section',attribute:'class',default:'wp-block-catpow-section article level3 center catch'},
				navIcon:{source:'attribute',selector:'section',attribute:'data-icon'},

				prefix:{source:'children',selector:'header div.prefix'},
				title:{type:'array',source:'children',selector:'header h2,header .heading',default:['Title']},
				read:{type:'array',source:'children',selector:'header p'},

				headerImageMime:{source:'attribute',selector:'header .image [src]',attribute:'data-mime'},
				headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
				headerImageSrcset:{source:'attribute',selector:'header .image [src]',attribute:'srcset'},
				headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
				headerImageCode:{source:'text',selector:'header .image'},

				headerBackgroundImageMime:{source:'attribute',selector:'header .background [src]',attribute:'data-mime'},
				headerBackgroundImageSrc:{source:'attribute',selector:'header .background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
				headerBackgroundImageSrcset:{source:'attribute',selector:'header .background [src]',attribute:'srcset'},
				headerBackgroundImageAlt:{source:'attribute',selector:'header .background [src]',attribute:'alt'},
				headerBackgroundImageCode:{source:'text',selector:'header .background'},

				imageMime:{source:'attribute',selector:'.image [src]',attribute:'data-mime'},
				imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
				imageSrcset:{source:'attribute',selector:'.image [src]',attribute:'srcset'},
				imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
				imageCode:{source:'text',selector:'.image'},

				backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
				backgroundImageSrcset:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'srcset'},
				backgroundImageCode:{source:'text',selector:'.wp-block-catpow-section>.background'},

				iconSrc:{source:'attribute',selector:'.icon [src]',attribute:'src',default:cp.theme_url+'/images/dummy_icon.svg'},
				iconAlt:{source:'attribute',selector:'.icon [src]',attribute:'alt'},
			},
			save({attributes,className}){
				const {
					id,navIcon,classes,prefix,title,read,
					headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
					headerBackgroundImageCode,
					imageSrc,imageSrcset,imageAlt,imageCode,
					backgroundImageSrc,backgroundImageCode,
					iconSrc,iconAlt
				}=attributes;

				var states=CP.wordsToFlags(classes);
				var level=CP.getNumberClass({attr:attributes},'level');

				const imageKeys={
					navIcon:{src:"icon"},
					image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt",srcset:"imageSrcset"},
					headerImage:{mime:"headerImageMime",src:"headerImageSrc",alt:"headerImageAlt",srcset:"headerImageSrcset"},
					headerBackgroundImage:{mime:"headerBackgroundImageMime",src:"headerBackgroundImageSrc",alt:"headerBackgroundImageAlt",srcset:"headerBackgroundImageSrcset"},
					backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset"}
				};

				return (
					<section id={id} className={classes} data-icon={navIcon}>
						{states.hasImage && 
							<div class="image">
								{(states.isTemplate && imageCode)?(
									imageCode
								):(
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										size='medium_large'
									/>
								)}
							</div>
						}
						<div class="contents">
							<header>
								<div class="title">
									{states.hasIcon && 
										<div class="icon">
											<img src={iconSrc} alt={iconAlt}/>
										</div>
									}
									{states.hasPrefix && 
										<div class="prefix"><RichText.Content value={prefix}/></div>
									}
									{states.hasHeaderImage &&
										<div class="image">
											{(states.isTemplate && headerImageCode)?(
												headerImageCode
											):(
												<ResponsiveImage
													attr={attributes}
													keys={imageKeys.headerImage}
												/>
											)}
										</div>
									}
									<h2>{title}</h2>
									{states.hasRead && <p><RichText.Content value={read}/></p>}
								</div>
								{states.hasHeaderBackgroundImage &&
									<div class="background">
										{(states.isTemplate && headerBackgroundImageCode)?(
											headerBackgroundImageCode
										):(
											<ResponsiveImage
												attr={attributes}
												keys={imageKeys.headerBackgroundImage}
											/>
										)}
									</div>
								}
							</header>
							<div class="text"><InnerBlocks.Content/></div>
						</div>
						{states.hasBackgroundImage && 
							<div class="background">
								{(states.isTemplate && backgroundImageCode)?(
									backgroundImageCode
								):(
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.backgroundImage}
									/>
								)}
							</div>
						}
					</section>
				);
			},
			migrate(attributes){
				attributes.classes+=' level2';
				return attributes;
			}
		}
	]
});