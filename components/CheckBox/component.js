Catpow.CheckBox = function (props) {
	var label = props.label,
	    selected = props.selected,
	    onChange = props.onChange;
	var useState = wp.element.useState;


	if (label) {
		return wp.element.createElement(
			'div',
			{ className: "CheckBox" + (selected ? ' selected' : ''), onClick: function onClick(e) {
					onChange(!selected);
				} },
			wp.element.createElement(
				'div',
				{ className: "CheckBoxIcon" + (selected ? ' selected' : '') },
				' '
			),
			label
		);
	}
	return wp.element.createElement(
		'div',
		{ className: "CheckBoxIcon" + (selected ? ' selected' : ''), onClick: function onClick(e) {
				onChange(!selected);
			} },
		' '
	);
};
