CP.config.section = {
	devices: ['sp', 'tb'],
	imageKeys: {
		navIcon: { src: "navIcon" },
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
		headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset", sources: "headerBackgroundImageSources" },
		backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" }
	},
	imageSizes: {
		image: 'medium',
		headerImage: 'medium_large'
	}
};

registerBlockType('catpow/section', {
	title: '🐾 Section',
	description: '見出しと内容のまとまりを表すセクションのブロックです。',
	icon: 'id-alt',
	category: 'catpow',
	attributes: {
		id: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'id' },
		classes: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'class', default: 'wp-block-catpow-section article level3 center catch' },
		navIcon: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'data-icon' },

		SectionTag: { type: 'text', default: 'section' },
		HeadingTag: { type: 'text', default: 'h2' },

		prefix: { source: 'children', selector: 'header div.prefix' },
		title: { type: 'array', source: 'children', selector: 'header h2,header .heading', default: ['Title'] },
		lead: { type: 'array', source: 'children', selector: 'header p,header .lead' },

		headerImageMime: { source: 'attribute', selector: 'header .image [src]', attribute: 'data-mime' },
		headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		headerImageSrcset: { source: 'attribute', selector: 'header .image [src]', attribute: 'srcset' },
		headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
		headerImageCode: { source: 'text', selector: 'header .image' },

		headerBackgroundImageMime: { source: 'attribute', selector: 'header .background [src]', attribute: 'data-mime' },
		headerBackgroundImageSrc: { source: 'attribute', selector: 'header .background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		headerBackgroundImageSrcset: { source: 'attribute', selector: 'header .background [src]', attribute: 'srcset' },
		headerBackgroundImageAlt: { source: 'attribute', selector: 'header .background [src]', attribute: 'alt' },
		headerBackgroundImageCode: { source: 'text', selector: 'header .background' },
		headerBackgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.section.devices, 'header .background picture', 'dummy_bg.jpg'),

		imageMime: { source: 'attribute', selector: '.image [src]', attribute: 'data-mime' },
		imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		imageSrcset: { source: 'attribute', selector: '.image [src]', attribute: 'srcset' },
		imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
		imageCode: { source: 'text', selector: '.image' },

		backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		backgroundImageSrcset: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'srcset' },
		backgroundImageCode: { source: 'text', selector: '.wp-block-catpow-section>.background' },
		backgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.section.devices, '.wp-block-catpow-section>.background picture', 'dummy_bg.jpg'),

		patternImageCss: { source: 'text', selector: 'style.patternImageCss' },
		headerPatternImageCss: { source: 'text', selector: 'style.headerPatternImageCss' },
		frameImageCss: { source: 'text', selector: 'style.frameImageCss' },
		borderImageCss: { source: 'text', selector: 'style.borderImageCss' },

		iconSrc: { source: 'attribute', selector: '.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
		iconAlt: { source: 'attribute', selector: '.icon [src]', attribute: 'alt' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var SectionTag = attributes.SectionTag,
		    HeadingTag = attributes.HeadingTag,
		    id = attributes.id,
		    classes = attributes.classes,
		    prefix = attributes.prefix,
		    title = attributes.title,
		    lead = attributes.lead,
		    headerImageMime = attributes.headerImageMime,
		    headerImageSrc = attributes.headerImageSrc,
		    headerImageSrcset = attributes.headerImageSrcset,
		    headerImageAlt = attributes.headerImageAlt,
		    headerImageCode = attributes.headerImageCode,
		    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
		    imageMime = attributes.imageMime,
		    imageSrc = attributes.imageSrc,
		    imageSrcset = attributes.imageSrcset,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode,
		    backgroundImageSrc = attributes.backgroundImageSrc,
		    backgroundImageCode = attributes.backgroundImageCode,
		    headerPatternImageCss = attributes.headerPatternImageCss,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss,
		    iconSrc = attributes.iconSrc,
		    iconAlt = attributes.iconAlt;


		if (!id) {
			setAttributes({ id: 's' + new Date().getTime().toString(16) });
		}

		var states = CP.wordsToFlags(classes);
		var _CP$config$section = CP.config.section,
		    devices = _CP$config$section.devices,
		    imageKeys = _CP$config$section.imageKeys,
		    imageSizes = _CP$config$section.imageSizes;


		var selectiveClasses = [{ input: 'buttons', filter: 'sectionTag', key: 'SectionTag', label: 'セクションタグ', values: ['article', 'section', 'aside', 'div'] }, { input: 'buttons', filter: 'headingTag', key: 'HeadingTag', label: '見出しタグ', values: ['h2', 'h3', 'h4'], effect: function effect(val) {
				for (var key in states) {
					if (key.substr(0, 5) === 'level') {
						states[key] = false;
					}
				}
				if (/^h\d$/.test(val)) {
					states['level' + val[1]] = true;
				}
				setAttributes({ classes: CP.flagsToWords(states) });
			} }, {
			label: 'タイプ',
			filter: 'type',
			type: 'gridbuttons',
			values: ['scene', 'article', 'column'],
			sub: {
				scene: ['color', { label: 'プレフィクス', values: 'hasPrefix' }, { label: 'ヘッダ画像', values: 'hasHeaderImage', sub: [{ input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage }] }, { label: 'ヘッダ背景画像', values: 'hasHeaderBackgroundImage', sub: [{ input: 'picture', label: '背景画像', keys: imageKeys.headerBackgroundImage, devices: devices }, { label: '薄く', values: 'paleHeaderBG' }] }, { label: '抜き色文字', values: 'inverseText', sub: [{ label: 'ヘッダ背景色', values: 'hasHeaderBackgroundColor', sub: [{ label: 'パターン画像', values: 'hasHeaderPatternImage', sub: [{ input: 'pattern', css: 'headerPatternImageCss', sel: '#' + id + ' > .contents > .header' }] }] }] }, { label: 'リード', values: 'hasLead' }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'picture', label: '背景画像', keys: imageKeys.backgroundImage, devices: devices }, { label: '薄く', values: 'paleBG' }] }, { label: '背景色', values: 'hasBackgroundColor' }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: 'ヘッダ画像コード',
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: 'ヘッダ背景画像コード',
						key: 'headerBackgroundImageCode',
						cond: states.hasHeaderBackgroundImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				article: ['color', { type: 'buttons', label: 'レベル', values: { level2: '2', level3: '3', level4: '4' } }, { type: 'gridbuttons', label: '見出しタイプ', filter: 'heading_type', values: ['header', 'headline', 'catch'] }, { label: 'ヘッダ画像', values: 'hasHeaderImage', sub: [{
						input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage,
						cond: !states.isTemplate || !headerImageCode
					}] }, { label: 'リード', values: 'hasLead' }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'picture', keys: imageKeys.backgroundImage, devices: devices, cond: !states.isTemplate || !backgroundImageCode }, { label: '薄く', values: 'paleBG' }] }, { label: '背景色', values: 'hasBackgroundColor' }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, { label: 'パターン画像', values: 'hasPatternImage', sub: [{ input: 'pattern', css: 'patternImageCss', sel: '#' + id }] }, { label: 'フレーム画像', values: 'hasFrameImage', sub: [{ input: 'frame', css: 'frameImageCss', sel: '#' + id }] }, { label: 'ボーダー画像', values: 'hasBorderImage', sub: [{ input: 'border', css: 'borderImageCss', sel: '#' + id + ' > .contents' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: 'ヘッダ画像コード',
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				column: ['color', 'pattern', { label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon' }] }, { label: '画像', values: 'hasImage', sub: [{ input: 'image', keys: imageKeys.image }] }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'picture', keys: imageKeys.backgroundImage, devices: devices, cond: !states.isTemplate || !backgroundImageCode }, { label: '薄く', values: 'paleBG' }] }, { label: '線', values: { no_border: 'なし', thin_border: '細', bold_border: '太' } }, { label: '角丸', values: 'round' }, { label: '影', values: 'shadow', sub: [{ label: '内側', values: 'inset' }] }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, { label: 'ボーダー画像', values: 'hasBorderImage', sub: [{ input: 'border', css: 'borderImageCss', sel: '#' + id + ' > .contents' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: '画像コード',
						key: 'imageCode',
						cond: states.hasImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}]
			},
			bind: {
				scene: ['level2'],
				column: ['level3']
			}
		}];

		var level = CP.getNumberClass({ attr: attributes }, 'level');

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(AlignClassToolbar, { set: setAttributes, attr: attributes })
		), wp.element.createElement(
			SectionTag,
			{ id: id, className: classes },
			states.hasImage && wp.element.createElement(
				'div',
				{ 'class': 'image' },
				states.isTemplate && imageCode ? wp.element.createElement(DummyImage, { text: imageCode }) : wp.element.createElement(SelectResponsiveImage, {
					attr: attributes,
					set: setAttributes,
					keys: imageKeys.image,
					size: imageSizes.image
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(
					'header',
					{ 'class': 'header' },
					wp.element.createElement(
						'div',
						{ 'class': 'title' },
						states.hasIcon && wp.element.createElement(
							'div',
							{ 'class': 'icon' },
							wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							'div',
							{ 'class': 'prefix' },
							wp.element.createElement(RichText, { tagName: 'div', value: prefix, onChange: function onChange(prefix) {
									return setAttributes({ prefix: prefix });
								} })
						),
						states.hasHeaderImage && wp.element.createElement(
							'div',
							{ 'class': 'image' },
							states.isTemplate && headerImageCode ? wp.element.createElement(DummyImage, { text: headerImageCode }) : wp.element.createElement(SelectResponsiveImage, {
								set: setAttributes,
								attr: attributes,
								keys: imageKeys.headerImage,
								size: imageSizes.headerImage
							})
						),
						wp.element.createElement(
							HeadingTag,
							{ className: 'heading' },
							wp.element.createElement(RichText, { tagName: 'div', value: title, onChange: function onChange(title) {
									return setAttributes({ title: title });
								} })
						),
						states.hasLead && wp.element.createElement(
							'p',
							{ className: 'lead' },
							wp.element.createElement(RichText, { tagName: 'div', value: lead, onChange: function onChange(lead) {
									return setAttributes({ lead: lead });
								} })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						'div',
						{ 'class': 'background' },
						states.isTemplate && headerBackgroundImageCode ? wp.element.createElement(DummyImage, { text: headerBackgroundImageCode }) : wp.element.createElement(SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: imageKeys.headerBackgroundImage
						})
					)
				),
				wp.element.createElement(
					'div',
					{ 'class': 'text' },
					wp.element.createElement(InnerBlocks, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				states.isTemplate && backgroundImageCode ? wp.element.createElement(DummyImage, { text: backgroundImageCode }) : wp.element.createElement(SelectResponsiveImage, {
					set: setAttributes,
					attr: attributes,
					keys: imageKeys.backgroundImage
				})
			),
			states.hasPatternImage && wp.element.createElement(
				'style',
				null,
				patternImageCss
			),
			states.hasHeaderPatternImage && wp.element.createElement(
				'style',
				null,
				headerPatternImageCss
			),
			states.hasBorderImage && wp.element.createElement(
				'style',
				null,
				borderImageCss
			),
			states.hasFrameImage && wp.element.createElement(
				'style',
				null,
				frameImageCss
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.section || {}
			}),
			wp.element.createElement(
				PanelBody,
				{ title: 'ID', icon: 'admin-links', initialOpen: false },
				wp.element.createElement(TextControl, {
					label: 'ID',
					onChange: function onChange(id) {
						setAttributes({ id: id });
					},
					value: id
				})
			),
			wp.element.createElement(
				PanelBody,
				{ title: 'CLASS', icon: 'admin-generic', initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: '\u30AF\u30E9\u30B9',
					onChange: function onChange(classes) {
						return setAttributes({ classes: classes });
					},
					value: classes
				})
			)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;
		var SectionTag = attributes.SectionTag,
		    HeadingTag = attributes.HeadingTag,
		    id = attributes.id,
		    navIcon = attributes.navIcon,
		    classes = attributes.classes,
		    prefix = attributes.prefix,
		    title = attributes.title,
		    lead = attributes.lead,
		    headerImageSrc = attributes.headerImageSrc,
		    headerImageSrcset = attributes.headerImageSrcset,
		    headerImageAlt = attributes.headerImageAlt,
		    headerImageCode = attributes.headerImageCode,
		    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
		    imageSrc = attributes.imageSrc,
		    imageSrcset = attributes.imageSrcset,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode,
		    backgroundImageSrc = attributes.backgroundImageSrc,
		    backgroundImageCode = attributes.backgroundImageCode,
		    headerPatternImageCss = attributes.headerPatternImageCss,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss,
		    iconSrc = attributes.iconSrc,
		    iconAlt = attributes.iconAlt;


		var level = CP.getNumberClass({ attr: attributes }, 'level');

		var states = CP.wordsToFlags(classes);
		var _CP$config$section2 = CP.config.section,
		    devices = _CP$config$section2.devices,
		    imageKeys = _CP$config$section2.imageKeys,
		    imageSizes = _CP$config$section2.imageSizes;


		return wp.element.createElement(
			SectionTag,
			{ id: id, className: classes, 'data-icon': navIcon },
			states.hasImage && wp.element.createElement(
				'div',
				{ 'class': 'image' },
				states.isTemplate && imageCode ? imageCode : wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.image,
					size: 'medium_large'
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(
					'header',
					{ 'class': 'header' },
					wp.element.createElement(
						'div',
						{ 'class': 'title' },
						states.hasIcon && wp.element.createElement(
							'div',
							{ 'class': 'icon' },
							wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							'div',
							{ 'class': 'prefix' },
							wp.element.createElement(RichText.Content, { value: prefix })
						),
						states.hasHeaderImage && wp.element.createElement(
							'div',
							{ 'class': 'image' },
							states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerImage
							})
						),
						wp.element.createElement(
							HeadingTag,
							{ className: 'heading' },
							wp.element.createElement(RichText.Content, { value: title })
						),
						states.hasLead && wp.element.createElement(
							'p',
							{ className: 'lead' },
							wp.element.createElement(RichText.Content, { value: lead })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						'div',
						{ 'class': 'background' },
						states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.headerBackgroundImage,
							devices: devices
						})
					)
				),
				wp.element.createElement(
					'div',
					{ 'class': 'text' },
					wp.element.createElement(InnerBlocks.Content, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.backgroundImage,
					devices: devices
				})
			),
			states.hasPatternImage && wp.element.createElement(
				'style',
				{ className: 'patternImageCss' },
				patternImageCss
			),
			states.hasHeaderPatternImage && wp.element.createElement(
				'style',
				{ className: 'headerPatternImageCss' },
				headerPatternImageCss
			),
			states.hasBorderImage && wp.element.createElement(
				'style',
				{ className: 'borderImageCss' },
				borderImageCss
			),
			states.hasFrameImage && wp.element.createElement(
				'style',
				{ className: 'frameImageCss' },
				frameImageCss
			)
		);
	},

	deprecated: [{
		attributes: {
			id: { source: 'attribute', selector: 'section', attribute: 'id' },
			classes: { source: 'attribute', selector: 'section', attribute: 'class', default: 'wp-block-catpow-section article level3 center catch' },
			navIcon: { source: 'attribute', selector: 'section', attribute: 'data-icon' },

			prefix: { source: 'children', selector: 'header div.prefix' },
			title: { type: 'array', source: 'children', selector: 'header h2,header .heading', default: ['Title'] },
			read: { type: 'array', source: 'children', selector: 'header p' },

			headerImageMime: { source: 'attribute', selector: 'header .image [src]', attribute: 'data-mime' },
			headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
			headerImageSrcset: { source: 'attribute', selector: 'header .image [src]', attribute: 'srcset' },
			headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
			headerImageCode: { source: 'text', selector: 'header .image' },

			headerBackgroundImageMime: { source: 'attribute', selector: 'header .background [src]', attribute: 'data-mime' },
			headerBackgroundImageSrc: { source: 'attribute', selector: 'header .background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
			headerBackgroundImageSrcset: { source: 'attribute', selector: 'header .background [src]', attribute: 'srcset' },
			headerBackgroundImageAlt: { source: 'attribute', selector: 'header .background [src]', attribute: 'alt' },
			headerBackgroundImageCode: { source: 'text', selector: 'header .background' },

			imageMime: { source: 'attribute', selector: '.image [src]', attribute: 'data-mime' },
			imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
			imageSrcset: { source: 'attribute', selector: '.image [src]', attribute: 'srcset' },
			imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
			imageCode: { source: 'text', selector: '.image' },

			backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
			backgroundImageSrcset: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'srcset' },
			backgroundImageCode: { source: 'text', selector: '.wp-block-catpow-section>.background' },

			iconSrc: { source: 'attribute', selector: '.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
			iconAlt: { source: 'attribute', selector: '.icon [src]', attribute: 'alt' }
		},
		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
			var id = attributes.id,
			    navIcon = attributes.navIcon,
			    classes = attributes.classes,
			    prefix = attributes.prefix,
			    title = attributes.title,
			    read = attributes.read,
			    headerImageSrc = attributes.headerImageSrc,
			    headerImageSrcset = attributes.headerImageSrcset,
			    headerImageAlt = attributes.headerImageAlt,
			    headerImageCode = attributes.headerImageCode,
			    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
			    imageSrc = attributes.imageSrc,
			    imageSrcset = attributes.imageSrcset,
			    imageAlt = attributes.imageAlt,
			    imageCode = attributes.imageCode,
			    backgroundImageSrc = attributes.backgroundImageSrc,
			    backgroundImageCode = attributes.backgroundImageCode,
			    iconSrc = attributes.iconSrc,
			    iconAlt = attributes.iconAlt;


			var states = CP.wordsToFlags(classes);
			var level = CP.getNumberClass({ attr: attributes }, 'level');

			var imageKeys = {
				navIcon: { src: "icon" },
				image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
				headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
				headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset" },
				backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset" }
			};

			return wp.element.createElement(
				'section',
				{ id: id, className: classes, 'data-icon': navIcon },
				states.hasImage && wp.element.createElement(
					'div',
					{ 'class': 'image' },
					states.isTemplate && imageCode ? imageCode : wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						size: 'medium_large'
					})
				),
				wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					wp.element.createElement(
						'header',
						null,
						wp.element.createElement(
							'div',
							{ 'class': 'title' },
							states.hasIcon && wp.element.createElement(
								'div',
								{ 'class': 'icon' },
								wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
							),
							states.hasPrefix && wp.element.createElement(
								'div',
								{ 'class': 'prefix' },
								wp.element.createElement(RichText.Content, { value: prefix })
							),
							states.hasHeaderImage && wp.element.createElement(
								'div',
								{ 'class': 'image' },
								states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(ResponsiveImage, {
									attr: attributes,
									keys: imageKeys.headerImage
								})
							),
							wp.element.createElement(
								'h2',
								null,
								title
							),
							states.hasRead && wp.element.createElement(
								'p',
								null,
								wp.element.createElement(RichText.Content, { value: read })
							)
						),
						states.hasHeaderBackgroundImage && wp.element.createElement(
							'div',
							{ 'class': 'background' },
							states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerBackgroundImage
							})
						)
					),
					wp.element.createElement(
						'div',
						{ 'class': 'text' },
						wp.element.createElement(InnerBlocks.Content, null)
					)
				),
				states.hasBackgroundImage && wp.element.createElement(
					'div',
					{ 'class': 'background' },
					states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.backgroundImage
					})
				)
			);
		},
		migrate: function migrate(attributes) {
			attributes.classes += ' level2';
			return attributes;
		}
	}]
});
