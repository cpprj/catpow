﻿Catpow.Popup=(props)=>{
	const {children,open,onClose,onClosed,closeButton=false,closeOnClickAway=true}=props;
	const {useState,useEffect}=wp.element;
	var [state,setPopupState]=useState('closed');
	
	useEffect(()=>setPopupState(open?'open':'close'),[open]);
	
	return (
		<div
			className={'Popup '+state}
			onAnimationEnd={()=>{
				if(state==='close'){
					setPopupState('closed');
					onClosed();
				}
			}}
		>
			<div class="PopupBG" onClick={()=>{if(closeOnClickAway){onClose()}}}></div>
			<div class="PopupBody">
				<div className="PopupContents">{children}</div>
				{closeButton && (
					<div className="PopupControl">
						<div className="close" onClick={onClose}></div>
					</div>
				)}
			</div>
		</div>
	);
}