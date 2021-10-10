import ReactDOM from "react-dom";
import React from "react";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";



const App = props => {

	const [ text, setText ] = useState('init text react');
	const [ bgOn, setBG ] = useState(false);
	const [ syncIsOn, setSync ] = useState(false);
	const bgStatus = useRef(false);
	const refTxt = useRef();

	const _toggleThisBG = () => {
		setBG( prev => {
			bgStatus.current = !bgStatus.current;
			return bgStatus.current;
		});
	}

	const _getTextFromReact = () => {
		return refTxt.current.value;
	}

	const _sendTextToReact = (v) => {
		setText(v)
	}

	//expose public funcs on mount
	useEffect( () => {

		//public funcs for JQ
		window.toggleReactBG = _toggleThisBG;
		window.getTextFromReact = _getTextFromReact;
		window.sendTextToReact = _sendTextToReact;

		return () => {
			//remove funcs on unmount
			delete window.toggleReactBG;
			delete window.getTextFromReact;
			delete window.sendTextToReact;
		}
	}, [setText, setBG])

	const onTextChanged = e => {
		const _t = e.target.value
		setText(_t);

		if (syncIsOn)
			window.sendTextToJQ( _t );
	}

	const onSendTextToJQ = e => {
		e && e.preventDefault();
		window.sendTextToJQ( text );
	}

	const onGetTextFromJQ = e => {
		e && e.preventDefault();
		const _t = window.getTextFromJQ();
		setText(_t);
	}

	const onToggleJQBG = e => {
		e && e.preventDefault();
		window.toggleJQBG();
	}

	const onToggleSync = e => {

		//temp hack to remove JQ sync (if enabled)
		const otherCheckBox = document.querySelector('#chkSyncJQ');
		if (otherCheckBox.checked)
			otherCheckBox.checked = false;

		setSync(!syncIsOn);
	}

	return (
		<div className={clsx(bgOn && "bg")}>
			<h3>Hello, I'm React</h3>
			<hr />
			<div className="inputs mb-1">
				<textarea ref={refTxt} value={text} onChange={onTextChanged} />
			</div>
			<div className="controls">
				<button onClick={onSendTextToJQ}>Send Text to JQ</button>
				<button onClick={onGetTextFromJQ}>Get Text from JQ</button>
				<div className="mb-1"></div>
				<button onClick={onToggleJQBG}>Toggle JQ Background</button>
			</div>
			<div className="mb-1"></div>
			<label>
				<input type="checkbox" checked={syncIsOn} onChange={onToggleSync} /> Sync Typing to JQ
			</label>
		</div>
	)
}


const el = document.querySelector('#reactCnt');
ReactDOM.render(<App />, el);