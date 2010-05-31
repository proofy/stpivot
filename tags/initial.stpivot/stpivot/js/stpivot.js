var req = null;
var myLayout;
var waiting = false;

_XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];

function getXmlhttpObject(){
	var _b0 = null;
	var _b1 = null;
	try {
		_b0 = new XMLHttpRequest();
	} catch(e){}
	if(!_b0){
		for(var i=0; i<3; i++){
			var _b3 = _XMLHTTP_PROGIDS[i];
			try {
				_b0 = new ActiveXObject(_b3);
			} catch(e) {
				_b1 = e;
			}
			if(_b0){
				_XMLHTTP_PROGIDS=[_b3];
				break;
			}
		}
	}
	if(!_b0){
		return alert("XMLHTTP not available. Error: "+_b1);
	}
	return _b0;
};

req = getXmlhttpObject();

$(function() {
	myLayout = $('body').layout({
			north__resizable: false,
			north__initClosed: !showToolbar,
			south__initClosed: true,
			west__initClosed: true
		});
		
	$('#options_tabs').tabs()
	$('#options_panel').draggable({
		appendTo: 'body',
		cursor: 'move',
		cursorAt: {top: 5}
	});
	
	$('#chart_dialog').draggable({
		appendTo: 'body',
		cursor: 'move',
		cursorAt: {top: 5}
	}).resizable({
		ghost:		false,
		handles:	'all',
		stop: function(event, ui) { resizeChart(ui) }
	});
	
	/********** FORMS ************/
	$("#navi_form").ajaxForm({
		beforeSubmit: submitNavigator
	});
	$("#toolbar_form").ajaxForm({
		beforeSubmit: submitToolbar
	});
	$("#grid_form").ajaxForm({
		beforeSubmit: submitGrid
	});
	/*
	$("#chart_form").ajaxForm({
		beforeSubmit: submitChart
	});
	*/
	$("#mdx_form").ajaxForm({
		beforeSubmit: submitMDX
	});
	$("#chartopts_form").ajaxForm({
		beforeSubmit: submitChartopts
	});
	$("#axisopts_form").ajaxForm({
		beforeSubmit: submitAxisopts
	});
	$("#sortopts_form").ajaxForm({
		beforeSubmit: submitSortopts
	});
	$("#printopts_form").ajaxForm({
		beforeSubmit: submitPrintopts
	});
	$("#drill_form").ajaxForm({
		beforeSubmit: submitDrill
	});
	
	$('#loading').hide();
})

function doPost(query){
	req.open("POST", pageName, false);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(query);
	return req.responseText;
}

function submitNavigator(){
	query=$("#navi_form input").fieldSerialize();
	drillNavigator(query,false,false);
	return false;
}

function drillNavigator(query,hideme,applyme){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		if(hideme==true){
			myLayout.close('west');
		}
		
		q = "pivotId="+pivotId+"&"+query+"&pivotPart=navi";
		document.getElementById('navi_container').innerHTML = doPost(q);
		
		if(applyme==true){
			drillGrid("");
			updateChart("");
			updateMDX("");
		}
		
		$("#navi_form").ajaxForm({
			beforeSubmit: submitNavigator
		});
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
}

function updateNavigator(){
	q = "pivotId="+pivotId+"&pivotPart=navi";
	document.getElementById('navi_container').innerHTML = doPost(q);
	
	$("#navi_form").ajaxForm({
		beforeSubmit: submitNavigator
	});
}

function submitToolbar(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		query=$("#toolbar_form input").fieldSerialize();
		
		q = "pivotId="+pivotId+"&"+query+"&pivotPart=toolbar";
		document.getElementById('toolbar_container').innerHTML =  doPost(q);;
		
		drillGrid("");
		updateChart("");
		updateMDX("");
		updateNavigator("");
		
		$("#toolbar_form").ajaxForm({
			beforeSubmit: submitToolbar
		});
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function updateToolbar(){
	q = "pivotId="+pivotId+"&pivotPart=toolbar";
	document.getElementById('toolbar_container').innerHTML = doPost(q);
	$("#toolbar_form").ajaxForm({
		beforeSubmit: submitToolbar
	});
}

function submitGrid(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		var query=$("#grid_form input").fieldSerialize();
		
		drillGrid(query);
		updateChart("");
		updateMDX("");
		updateDrill("");
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function drillGrid(query){
	var q = "pivotId="+pivotId+"&"+query+"&pivotPart=table";
	document.getElementById("grid_container").innerHTML = doPost(q);
	$("#grid_form").ajaxForm({
		beforeSubmit: submitGrid
	});
}

function updateChart(query){
	var q = "pivotId="+pivotId+"&"+query+"&pivotPart=chart";
	document.getElementById("chart_container").innerHTML = doPost(q);
}

function submitMDX(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		mdx_cp.setCode(mdx_cp.getCode().replace(/&nbsp;/g,' '));
		document.getElementById('mdxedit'+pivotId+'.9').value = mdx_cp.getCode();
		
		var query=$("#mdx_form input,#mdx_form textarea").fieldSerialize();
		
		updateMDX(query);
		drillGrid("");
		updateChart("");
		updateToolbar();
		updateNavigator("");
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function updateMDX(query){
	var q = "pivotId="+pivotId+"&"+query+"&pivotPart=mdx";
	document.getElementById("mdx_container").innerHTML = doPost(q);
	$("#mdx_form").ajaxForm({
		beforeSubmit: submitMDX
	});
	mdxEditorInit();
}

function mdxEditorInit(){
	mdx_cp.edit('mdxedit'+pivotId+'.9','mdx');
}

function submitDrill(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		var query=$("#drill_form input").fieldSerialize();
		
		updateDrill(query);
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function updateDrill(query){
	var q = "pivotId="+pivotId+"&"+query+"&pivotPart=drill";
	document.getElementById("drill_container").innerHTML = doPost(q);
	$("#drill_form").ajaxForm({
		beforeSubmit: submitDrill
	});
}

function submitChartopts(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#options_tabs').hide();
	
		var query=$("#chartopts_form select,#chartopts_form input").fieldSerialize();
		
		updateChart(query);
		
		chartType = document.getElementById("chartform"+pivotId+".4").selectedIndex+1;
		chartShowLegend = document.getElementById("chartform"+pivotId+".123").checked;
		chartShowSlicer = document.getElementById("chartform"+pivotId+".158").checked;
		
		updateChartOptions();
		
		//$('#chart_dialog').show();
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function changeChartOptions(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		chartType = parseInt(document.getElementById("combo_chart_type").value);
		if(chartType == 1 || chartType == 5 ){
			document.getElementById("check_3d").disabled = false;
		} else {
			document.getElementById("check_3d").disabled = true;
		}
		if( document.getElementById("radio_orientation_horizontal").checked ) {
			if(chartType == 1 || chartType == 5 ){
				chartType += 2;
			} else {
				chartType += 1;
			}
		}
		if( chartType < 8 ){
			if( document.getElementById("check_3d").checked ) {
				chartType += 1;
			}
		}
		chartShowLegend = document.getElementById("check_legend").checked;
		chartShowSlicer = document.getElementById("check_slicer").checked;
		
		var query = "chartType="+chartType+"&chartShowLegend="+chartShowLegend+"&chartShowSlicer="+chartShowSlicer;
		updateChart(query);
		
		//Update Chart properties form fields
		document.getElementById("chartform"+pivotId+".4").selectedIndex = chartType - 1;
		if(chartShowLegend){
			document.getElementById("chartform"+pivotId+".123").checked = "checked";
		} else {
			document.getElementById("chartform"+pivotId+".123").checked = "";
		}
		if(chartShowSlicer){
			document.getElementById("chartform"+pivotId+".158").checked = "checked";
		} else {
			document.getElementById("chartform"+pivotId+".158").checked = "";
		}
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function resizeChart(ui){
	if(!waiting){
		waiting = true;
		var chartWidth = parseInt(ui.size.width) - 10;
		var chartHeight = parseInt(ui.size.height) - 40;
		var query = "chartWidth="+chartWidth+"&chartHeight="+chartHeight;
		updateChart(query);
		waiting = false;
		document.getElementById("chartform"+pivotId+".197").value = chartHeight;
		document.getElementById("chartform"+pivotId+".198").value = chartWidth;
	} else {
		waitingAnswer();
	}
}

function updateChartOptions(){
	chartVertical = true;
	chart3d = false;
	if(chartType==2 || chartType==4 || chartType==6 || chartType==8){
		chartType -= 1;
		chart3d = true;
	}
	if(chartType==3 || chartType==7 || chartType==10 || chartType==12 || chartType==14 || chartType==16){
		chartType -= 1;
		chartVertical = false;
	}
	if(chartType==2 || chartType==6){
		chartType -= 1;
	}
	document.getElementById("combo_chart_type").value = chartType;
	if(chartVertical){
		document.getElementById("radio_orientation_vertical").checked = "checked";
		document.getElementById("radio_orientation_horizontal").checked = "";
	} else {
		document.getElementById("radio_orientation_horizontal").checked = "checked";
		document.getElementById("radio_orientation_vertical").checked = "";
	}
	if(chart3d){
		document.getElementById("check_3d").checked = "checked";
	} else {
		document.getElementById("check_3d").checked = "";
	}
	if(chartType == 1 || chartType == 5 ){
		document.getElementById("check_3d").disabled = false;
	} else {
		document.getElementById("check_3d").disabled = true;
	}
	if(chartShowSlicer){
		document.getElementById("check_slicer").checked = "checked";
	} else {
		document.getElementById("check_slicer").checked = "";
	}
	if(chartShowLegend){
		document.getElementById("check_legend").checked = "checked";
	} else {
		document.getElementById("check_legend").checked = "";
	}
}


function submitAxisopts(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#options_tabs').hide();
	
		var query=$("#axisopts_form select,#axisopts_form input").fieldSerialize();
		
		drillGrid(query);
		updateToolbar();
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function submitSortopts(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#options_tabs').hide();
	
		var query=$("#sortopts_form select,#sortopts_form input").fieldSerialize();
		
		drillGrid(query);
		updateToolbar();
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function submitPrintopts(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#options_tabs').hide();
	
		var query=$("#printopts_form select,#printopts_form input").fieldSerialize();
		
		drillGrid(query);
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function flushMondrianSchemaCache(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		var q = "pivotId="+pivotId+"&pivotPart=noanswer&clearCache=true";
		doPost(q);
		
		drillGrid("");
		updateChart("");
		updateDrill("");
		
		$('#loading').hide();
		waiting = false;
	} else {
		waitingAnswer();
	}
	return false;
}

function toggleGrid(){
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#grid_dialog').toggle();
		showGrid = document.getElementById("cb_show_grid").checked;
		
		var q = "pivotId="+pivotId+"&pivotPart=noanswer&showGrid="+showGrid;
		doPost(q);
		
		$('#loading').hide();
		waiting = false;
		
		if(!showChart && !showGrid){
			document.getElementById("cb_show_chart").checked = true;
			toggleChart();
		}
		
	} else {
		waitingAnswer();
	}
	return false;
}

function toggleChart(){
	showChart = document.getElementById("cb_show_chart").checked;
	if(!waiting){
		waiting = true;
		$('#loading').show();
		
		$('#chart_dialog').toggle();
		
		var q = "pivotId="+pivotId+"&pivotPart=noanswer&showChart="+showChart;
		doPost(q);
		
		updateChart("");
		
		$('#loading').hide();
		waiting = false;
		
		if(!showChart && !showGrid){
			document.getElementById("cb_show_grid").checked = true;
			toggleGrid();
		}
	} else {
		waitingAnswer();
		document.getElementById("cb_show_chart").checked = !showChart;
	}
	return false;
}

function waitingAnswer(){
	alert('Waiting for answer ...');
}
