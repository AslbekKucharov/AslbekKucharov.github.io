'use strict';

let saveButton = document.querySelector('.save_btn');
let deleteAllnotesBtn = document.querySelector('.delete_all_button');
let textarea = document.querySelector('.textarea');
let sidebar = document.querySelector('.sidebar');
let noteTitle = document.querySelector('.note_title');
let searchInput = document.querySelector('.search');
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

deleteAllnotesBtn.onclick = () => {
    localStorage.clear();
    window.location.reload();
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
        renderPosts(getNewNoteTitle, getNewNotes, sidebar);
    }

    window.location.reload();

}

window.onload = function (){

    div.textContent = 'Loading your notes...';

    setTimeout(() => {
        if(localStorage.getItem('Note') != ( undefined || null ) && localStorage.getItem('Note_Title') != (undefined || null)){
            oldNotes = JSON.parse(localStorage.getItem('Note'));
            oldNoteTitles = JSON.parse(localStorage.getItem('Note_Title'));
            renderPosts(oldNoteTitles, oldNotes, sidebar);
            handleInput(searchInput.value, oldNoteTitles);
            div.remove();
        } else {
            div.textContent = 'No notes yet :(';
        }    
    }, 100);
    
}

const createTitle = title => {
    const noteTitle = document.createElement('h1');
    noteTitle.classList.add('note_title_block');
    noteTitle.textContent = title;
    return noteTitle;
}

const createText = text => {
    const noteText = document.createElement('p');
    noteText.innerText = text;
    return noteText;
}

const createBlogPost = (title, text) => {
    const titleElement = createTitle(title);
    const textElement = createText(text);
    const container = document.createElement('div');
    container.classList.add('note_block')
    container.appendChild(titleElement);
    container.appendChild(textElement);
    return container;
}


const renderPosts = (titles, posts, container) => {
	titles.forEach((title, index) => {
  
  	const post = createBlogPost(title, posts[index]);
    container.appendChild(post);
  
  })
}


/************  Search  ***********/

function handleInput(text, arr){
    if(text.length === 0){
        return arr;
    }
    return arr.filter( el => {
        return el.toLowerCase().indexOf(text.toLowerCase) > -1;
    })
}

