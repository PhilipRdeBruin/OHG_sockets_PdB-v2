
var dragitem;
var dropitem;
var ouderfrom;
var ouderto;


/*		Drag & Drop functies		*/

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	dragitem = ev.target;
	ouderfrom = document.getElementById(dragitem.id).parentElement.id;
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	dropitem = ev.target;
	clndrag = dragitem.cloneNode(true);
    
    // alert ("clndrag.id = " + clndrag.id);

	dragid = dragitem.id;
	dropid = dropitem.id;

    alert ("dragid, dropid, ouderfrom = " + dragid + ", " + dropid + ", " + ouderfrom);

	$("#" + dropid).empty();
	document.getElementById(dropid).appendChild(clndrag);
}
