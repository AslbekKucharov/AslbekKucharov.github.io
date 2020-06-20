'use strict';

let saveButton = document.querySelector('.save_btn');
let textarea = document.querySelector('.textarea');
let sidebar = document.querySelector('.sidebar');
let noteTitle = document.querySelector('.note_title');
let div = document.createElement('div');
let newNoteTitle = [];
let getNewNoteTitle  = [];
let notesToLS = []; 
let noteFromLS = [];
let newNotes = [];
let getNewNotes = [];
let oldNotes = [];
let oldNoteTitles = [];
let titleContainer;
let noteContainer;

div.classList.add('no_note');
sidebar.append(div);

if(!localStorage.getItem('Note')){
    div.textContent = 'No notes yet :(';
}

saveButton.onclick = function (){

    if( noteTitle.value.trim() === '' ){
        noteTitle.style.border = '1px solid red';
        noteTitle.onfocus = () => {
            noteTitle.style.border = '1px solid #b4b4b4';
        }
        return false;
    }
    if(textarea.value.trim() === ''){              //Метод trim() удаляет пробелы с обеих концов строки
        textarea.style.border = '1px solid red';
        textarea.onfocus = () => {
            textarea.style.border = '1px solid #b4b4b4';
        }
        return false;
    }

    if(localStorage.getItem('Note') != (undefined || null) && localStorage.getItem('Note_Title') != (undefined || null)){
        oldNoteTitles.push(noteTitle.value);
        localStorage.setItem('Note_Title', JSON.stringify(oldNoteTitles));
        oldNotes.push(textarea.value);
        localStorage.setItem('Note', JSON.stringify(oldNotes));
        textarea.value = '';
        noteTitle.value = '';
    } else {
        newNoteTitle.push(noteTitle.value);
        localStorage.setItem('Note_Title', JSON.stringify(newNoteTitle));
        getNewNoteTitle = JSON.parse(localStorage.getItem('Note_Title'));
        newNotes.push(textarea.value);
        localStorage.setItem('Note', JSON.stringify(newNotes));
        getNewNotes = JSON.parse(localStorage.getItem('Note'));
        noteCreator(getNewNotes);
        titleCreator(getNewNoteTitle);
    }

    window.location.reload();

}

window.onload = function (){

    div.textContent = 'Loading your notes...';

    setTimeout(() => {
        if(localStorage.getItem('Note') != ( undefined || null ) && localStorage.getItem('Note_Title') != (undefined || null)){
            oldNotes = JSON.parse(localStorage.getItem('Note'));
            oldNoteTitles = JSON.parse(localStorage.getItem('Note_Title'));
            noteCreator(oldNotes);
            titleCreator(oldNoteTitles);
            div.remove();
        } else {
            div.textContent = 'No notes yet :(';
        }    
    }, 100);
    
}

function titleCreator(title){
    title.forEach( items => {
        titleContainer = document.createElement('h2');
        titleContainer.classList.add('note_title_block');
        noteContainer.prepend(titleContainer); 
        titleContainer.textContent = items;
    });
    noteTitle.value = '';
}

function noteCreator(argument){
    div.remove();
    
    argument.forEach( item => {
        noteContainer = document.createElement('div');
        noteContainer.classList.add('note_block');
        sidebar.append(noteContainer);
        noteContainer.innerHTML = marked(item);
    });
    textarea.value = '';
}