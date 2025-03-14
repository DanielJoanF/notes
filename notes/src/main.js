import './components/AppHeader.js';
import './components/LoadingIndicator.js';
import './components/NoteItem.js';

// API URL
const API_URL = 'https://notes-api.dicoding.dev/v2/notes';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {

  fetchNotes();
  
  setupEventListeners();
}

function setupEventListeners() {
  // Form submission
  document.getElementById('note-form').addEventListener('submit', handleFormSubmit);
  
  document.getElementById('notes').addEventListener('delete-note', handleDeleteNote);
}

// Fetch notes from API
async function fetchNotes() {
  const loading = document.querySelector('loading-indicator');
  loading.show();
  
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.data) {
      renderNotes(data.data);
    } else {
      throw new Error('Invalid data format from API');
    }
  } catch (error) {
    console.error('Error fetching notes:', error);
    showErrorMessage('Gagal memuat catatan,coba lagi.');
  } finally {
    loading.hide();
  }
}

// Render notes to the DOM
function renderNotes(notes) {
  const notesContainer = document.getElementById('notes');
  notesContainer.innerHTML = '';
  
  if (notes.length === 0) {
    notesContainer.innerHTML = '<p>No notes found. Create your first note!</p>';
    return;
  }
  
  notes.forEach(note => {
    const noteElement = document.createElement('note-item');
    noteElement.setAttribute('title', note.title);
    noteElement.setAttribute('body', note.body);
    noteElement.setAttribute('id', note.id);
    notesContainer.appendChild(noteElement);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  
  if (!title || !body) {
    showErrorMessage('Please fill in both title and content.');
    return;
  }
  
  const loading = document.querySelector('loading-indicator');
  loading.show();
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    document.getElementById('note-form').reset();
    fetchNotes();
  } catch (error) {
    console.error('Error adding note:', error);
    showErrorMessage('Failed to add note. Please try again.');
  } finally {
    loading.hide();
  }
}

async function handleDeleteNote(e) {
  const noteId = e.detail.id;
  if (!noteId) return;
  
  const loading = document.querySelector('loading-indicator');
  loading.show();
  
  try {
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    fetchNotes();
  } catch (error) {
    console.error('Error deleting note:', error);
    showErrorMessage('Failed to delete note. Please try again.');
  } finally {
    loading.hide();
  }
}

// Show error message
function showErrorMessage(message) {
  alert(message);
}