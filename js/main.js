'use strict';

let saveButton = document.querySelector('.save_btn');
let valueOfTextArea = document.querySelector('.textarea');
let noteArray = new Array;
let sidebar = document.querySelector('.sidebar');
let savedNote;
let noNotesMsg;

if(!valueOfTextArea.value){
    noNotesMsg = document.createElement('div');
    noNotesMsg.classList.add('no_note');
    sidebar.append(noNotesMsg);
    noNotesMsg.textContent = 'No notes yet';
}

saveButton.onclick = function saveNotes(){

    if(!valueOfTextArea.value){
        valueOfTextArea.style.border = '1px solid red';
        valueOfTextArea.onfocus = () => {
            valueOfTextArea.style.border = '1px solid #b4b4b4';
        }
        return false;
    }
    
    if(localStorage.getItem('Note') != undefined && localStorage.getItem('Note') != null) {
        let oldArray = JSON.parse(localStorage.getItem('Note'));
        oldArray.push(valueOfTextArea.value);
        localStorage.setItem('Note', JSON.stringify(oldArray));
        createNotes(oldArray);
    } else {
        const newArray = [];
        newArray.push(valueOfTextArea.value);
        localStorage.setItem('Note', JSON.stringify(newArray));
        createNotes(newArray);
    }
}

window.onload = function () {

	let prom = new Promise( (response, reject) => {
		noNotesMsg.textContent = "I'm loading your notes...";

		if(localStorage.getItem('Note') != undefined && localStorage.getItem('Note') != null) {
				response( localStorage.getItem('Note'));
		} else {
			setTimeout(() => noNotesMsg.textContent = 'No notes yet', 500);
		}
	})

	prom.then(response => JSON.parse(response))
		.then( data => createNotes(data))

}

function createNotes(argument) {
    noNotesMsg.remove();

    argument.forEach( el => {
        let div = document.createElement('div');
        div.classList.add('note_block');
        div.innerHTML = marked(el);
        sidebar.append(div);
    });
}