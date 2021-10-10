$(function(){

	const $jqText = $("#txtJQ");
	const $jqCnt = $("#jqCnt");
	const $chkSyncJQ = $("#chkSyncJQ");
	let _isSyncOn = false;
	
	$("body")
		.on("input", "#txtJQ", function(e) {
			if (!_isSyncOn)
				return;
			
			window.sendTextToReact( $jqText.val() );
		})
		.on("click", ".btnSendToReact", function(e){
			e && e.preventDefault();
			window.sendTextToReact( $jqText.val() );
		})
		.on("click", ".btnGetFromReact", function(e){
			e && e.preventDefault();
			const _t = window.getTextFromReact();
			$jqText.val( _t );
		})
		.on("click", ".toggleReactBG", function(e){
			e && e.preventDefault();
			window.toggleReactBG();
		});
		
	$chkSyncJQ.on("change", function(){
		_isSyncOn = !_isSyncOn;
		console.log(_isSyncOn);
	});


	const sendTextToJQ = (v) => {
		$jqText.val(v);
	}

	const getTextFromJQ = () => {
		return $jqText.val();
	}

	const toggleJQBG = () => {
		$jqCnt.toggleClass("bg");
	}

	window.sendTextToJQ = sendTextToJQ;
	window.getTextFromJQ = getTextFromJQ;
	window.toggleJQBG = toggleJQBG;

})