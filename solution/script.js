// Game Data
const gameData = {
  chapters: {
      1: {
          title: "CHAPTER 1",
          clueDescription: "Picture of mars in space (close up) with a piece of the spaceship getting close to the planet in the frame",
          clueImage: "images/chapters/chapter1.jpg",
          audio: "audio/chapters/chapter1.mp3",
          fragments: {
              1: { description: "A shadow silhouette outside the Airlock", image: "images/fragments/ch1_frag1.jpg", isCorrect: true },
              2: { description: "Suit hung inside airlock with glitching security camera", image: "images/fragments/ch1_frag2.jpg", isCorrect: true },
              3: { description: "Space boot print on the mars sand/ground", image: "images/fragments/ch1_frag3.jpg", isCorrect: true },
              4: { description: "A woman's silhouette in a space station main corridor", image: "images/fragments/ch2_frag1.jpg", isCorrect: false },
              5: { description: "Vital signs pulsing up and down", image: "images/fragments/ch2_frag2.jpg", isCorrect: false },
              6: { description: "Mystery Woman and Captain Layne's Holding hands", image: "images/fragments/ch2_frag3.jpg", isCorrect: false },
              7: { description: "Heart Beat Pounding", image: "images/fragments/ch3_frag1.jpg", isCorrect: false },
              8: { description: "Romantic scene, two people in a field having a picnic", image: "images/fragments/ch3_frag2.jpg", isCorrect: false },
              9: { description: "Hand laying while blood splatter on the floor", image: "images/fragments/ch3_frag3.jpg", isCorrect: false }
          },
          correctOrder: [1, 2, 3],
          solved: false
      },
      2: {
          title: "CHAPTER 2",
          clueDescription: "Entrance to a creepy dark hallway, metal walls floor etc (space station entry way)",
          clueImage: "images/chapters/chapter2.jpg",
          audio: "audio/chapters/chapter2.mp3",
          fragments: {
              1: { description: "A woman's silhouette in a space station main corridor", image: "images/fragments/ch2_frag1.jpg", isCorrect: true },
              2: { description: "Vital signs pulsing up and down", image: "images/fragments/ch2_frag2.jpg", isCorrect: true },
              3: { description: "Mystery Woman and Captain Layne's Holding hands", image: "images/fragments/ch2_frag3.jpg", isCorrect: true },
              4: { description: "A shadow silhouette outside the Airlock", image: "images/fragments/ch1_frag1.jpg", isCorrect: false },
              5: { description: "Suit hung inside airlock with glitching security camera", image: "images/fragments/ch1_frag2.jpg", isCorrect: false },
              6: { description: "Space boot print on the mars sand/ground", image: "images/fragments/ch1_frag3.jpg", isCorrect: false },
              7: { description: "Heart Beat Pounding", image: "images/fragments/ch3_frag1.jpg", isCorrect: false },
              8: { description: "Romantic scene, two people in a field having a picnic", image: "images/fragments/ch3_frag2.jpg", isCorrect: false },
              9: { description: "Hand laying while blood splatter on the floor", image: "images/fragments/ch3_frag3.jpg", isCorrect: false }
          },
          correctOrder: [1, 2, 3],
          solved: false
      },
      3: {
          title: "CHAPTER 3",
          clueDescription: "Vitals are nonexistent. Pulse off. Flat Line.",
          clueImage: "images/chapters/chapter3.jpg",
          audio: "audio/chapters/chapter3.mp3",
          fragments: {
              1: { description: "Heart Beat Pounding", image: "images/fragments/ch3_frag1.jpg", isCorrect: true },
              2: { description: "Romantic scene, two people in a field having a picnic", image: "images/fragments/ch3_frag2.jpg", isCorrect: true },
              3: { description: "Hand laying while blood splatter on the floor", image: "images/fragments/ch3_frag3.jpg", isCorrect: true },
              4: { description: "A shadow silhouette outside the Airlock", image: "images/fragments/ch1_frag1.jpg", isCorrect: false },
              5: { description: "Suit hung inside airlock with glitching security camera", image: "images/fragments/ch1_frag2.jpg", isCorrect: false },
              6: { description: "Space boot print on the mars sand/ground", image: "images/fragments/ch1_frag3.jpg", isCorrect: false },
              7: { description: "A woman's silhouette in a space station main corridor", image: "images/fragments/ch2_frag1.jpg", isCorrect: false },
              8: { description: "Vital signs pulsing up and down", image: "images/fragments/ch2_frag2.jpg", isCorrect: false },
              9: { description: "Mystery Woman and Captain Layne's Holding hands", image: "images/fragments/ch2_frag3.jpg", isCorrect: false }
          },
          correctOrder: [1, 2, 3],
          solved: false
      }
  },
  finalCorrectOrder: [1, 2, 3],
  fullStoryAudio: "audio/full_story.mp3",
  allChaptersSolved: false
};

// DOM Elements
let currentChapter = 1;
let draggedFragment = null;
let draggedChapter = null;
let currentAudio = null;
let isPlaying = false;

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
  loadGameData();
  
  if (document.getElementById('chapterTitle')) {
      initChapterPage();
  } else if (document.getElementById('availableChapters')) {
      initFinalPage();
  } else {
      initMainMenu();
  }
});

// Main Menu Functions
function initMainMenu() {
  updateProgress();
  
  // Load chapter status
  for (let i = 1; i <= 3; i++) {
      const chapterElement = document.getElementById(`chapter${i}`);
      const statusElement = document.getElementById(`status${i}`);
      
      if (gameData.chapters[i].solved) {
          statusElement.textContent = "Solved";
          statusElement.classList.add("solved");
      }
      
      chapterElement.addEventListener('click', function() {
          currentChapter = i;
          window.location.href = "chapter.html?chapter=" + i;
      });
  }
  
  // Check if all chapters are solved
  const allSolved = Object.values(gameData.chapters).every(chapter => chapter.solved);
  if (allSolved) {
      document.getElementById('finalPuzzleContainer').classList.remove('hidden');
      document.getElementById('solveFinalPuzzle').addEventListener('click', function() {
          window.location.href = "final.html";
      });
  }
}

function updateProgress() {
  const solvedCount = Object.values(gameData.chapters).filter(chapter => chapter.solved).length;
  const progress = (solvedCount / 3) * 100;
  
  document.getElementById('progressBar').style.width = progress + "%";
  document.getElementById('progressText').textContent = Math.round(progress) + "% Complete";
}

// Chapter Puzzle Functions
function initChapterPage() {
  // Get chapter from URL
  const urlParams = new URLSearchParams(window.location.search);
  currentChapter = parseInt(urlParams.get('chapter')) || 1;
  
  // Set chapter title and clue
  const chapter = gameData.chapters[currentChapter];
  document.getElementById('chapterTitle').textContent = chapter.title;
  document.getElementById('clueDescription').textContent = chapter.clueDescription;
  document.getElementById('clueImage').style.backgroundImage = `url('${chapter.clueImage}')`;
  
  // Set up back button
  document.getElementById('backButton').addEventListener('click', function() {
      if (currentAudio) {
          currentAudio.pause();
      }
      window.location.href = "index.html";
  });
  
  // Load ALL fragments (all 9) for this chapter
  const fragmentsContainer = document.getElementById('availableFragments');
  fragmentsContainer.innerHTML = '';
  
  // Shuffle fragments for more challenge
  const fragmentIds = Object.keys(chapter.fragments);
  shuffleArray(fragmentIds);

  fragmentIds.forEach(fragId => {
      const fragmentData = chapter.fragments[fragId];
      const fragmentElement = document.createElement('div');
      fragmentElement.className = 'fragment';
      fragmentElement.setAttribute('data-fragment-id', fragId);
      fragmentElement.setAttribute('draggable', 'true');
      
      // Highlight fragments that belong to this chapter
      if (fragmentData.isCorrect) {
          fragmentElement.classList.add('correct-fragment');
      }
      
      fragmentElement.innerHTML = `
          <div class="fragment-image" style="background-image: url('${fragmentData.image}')"></div>
          <div class="fragment-description">${fragmentData.description}</div>
      `;
      
      fragmentElement.addEventListener('dragstart', function(e) {
          draggedFragment = {
              id: fragId,
              data: fragmentData,
              element: fragmentElement
          };
          e.dataTransfer.setData('text/plain', fragId);
      });
      
      fragmentsContainer.appendChild(fragmentElement);
  });
  
  // Set up solution slots
  const solutionSlots = document.querySelectorAll('.solution-slot');
  solutionSlots.forEach(slot => {
      slot.addEventListener('dragover', function(e) {
          e.preventDefault();
          this.classList.add('highlight');
      });
      
      slot.addEventListener('dragleave', function() {
          this.classList.remove('highlight');
      });
      
      slot.addEventListener('drop', function(e) {
          e.preventDefault();
          this.classList.remove('highlight');
          
          if (draggedFragment) {
              // Remove from previous slot if it was there
              const existingFragment = document.querySelector(`.fragment-in-slot[data-fragment-id="${draggedFragment.id}"]`);
              if (existingFragment && existingFragment.parentElement !== this) {
                  existingFragment.parentElement.removeChild(existingFragment);
              }
              
              // Add to this slot
              this.innerHTML = '';
              const fragmentInSlot = document.createElement('div');
              fragmentInSlot.className = 'fragment-in-slot';
              fragmentInSlot.setAttribute('data-fragment-id', draggedFragment.id);
              fragmentInSlot.setAttribute('draggable', 'true');
              
              fragmentInSlot.innerHTML = `
                  <div class="fragment-image" style="background-image: url('${draggedFragment.data.image}')"></div>
                  <div class="fragment-description">${draggedFragment.data.description}</div>
              `;
              
              fragmentInSlot.addEventListener('dragstart', function(e) {
                  draggedFragment = {
                      id: this.getAttribute('data-fragment-id'),
                      data: chapter.fragments[this.getAttribute('data-fragment-id')],
                      element: this
                  };
                  e.dataTransfer.setData('text/plain', this.getAttribute('data-fragment-id'));
              });
              
              this.appendChild(fragmentInSlot);
          }
      });
  });
  
  // Set up check solution button
  document.getElementById('checkSolution').addEventListener('click', checkSolution);
  
  // Set up play chapter button
  document.getElementById('playChapter').addEventListener('click', function() {
      if (currentAudio) {
          currentAudio.pause();
      }
      currentAudio = new Audio(chapter.audio);
      setupAudioControls(currentAudio);
      currentAudio.play()
          .then(() => {
              isPlaying = true;
              document.getElementById('playPauseBtn').textContent = '⏸';
          })
          .catch(error => {
              console.error("Audio playback failed:", error);
              alert("Please interact with the page first to enable audio playback.");
          });
      chapter.solved = true;
      saveGameData();
  });
  
  // Set up reset button
  document.getElementById('resetPuzzle').addEventListener('click', function() {
      document.querySelectorAll('.solution-slot').forEach(slot => {
          slot.innerHTML = '';
      });
      document.getElementById('playChapter').disabled = true;
  });
}

function checkSolution() {
  const solutionSlots = document.querySelectorAll('.solution-slot');
  const userSolution = [];
  
  solutionSlots.forEach(slot => {
      const fragment = slot.querySelector('.fragment-in-slot');
      if (fragment) {
          userSolution.push(parseInt(fragment.getAttribute('data-fragment-id')));
      } else {
          userSolution.push(null);
      }
  });
  
  const chapter = gameData.chapters[currentChapter];
  const feedbackElement = document.getElementById('feedback');
  
  // Check if all slots are filled
  if (userSolution.includes(null)) {
      feedbackElement.textContent = "Please fill all slots before checking your solution.";
      feedbackElement.className = "feedback incorrect";
      feedbackElement.classList.remove('hidden');
      return;
  }
  
  // Check if all selected fragments are correct for this chapter
  let allCorrect = true;
  const wrongFragments = [];
  
  userSolution.forEach(fragId => {
      if (!chapter.fragments[fragId].isCorrect) {
          allCorrect = false;
          wrongFragments.push(chapter.fragments[fragId].description);
      }
  });
  
  if (!allCorrect) {
      feedbackElement.textContent = `These fragments don't belong to this chapter: ${wrongFragments.join(', ')}`;
      feedbackElement.className = "feedback incorrect";
      feedbackElement.classList.remove('hidden');
      return;
  }
  
  // Check if fragments are in correct order
  let isOrderCorrect = true;
  for (let i = 0; i < chapter.correctOrder.length; i++) {
      if (userSolution[i] !== chapter.correctOrder[i]) {
          isOrderCorrect = false;
          break;
      }
  }
  
  if (isOrderCorrect) {
      feedbackElement.textContent = "Correct! You've pieced together this chapter correctly.";
      feedbackElement.className = "feedback correct";
      document.getElementById('playChapter').disabled = false;
  } else {
      feedbackElement.textContent = "Correct fragments but wrong order. Try rearranging them.";
      feedbackElement.className = "feedback incorrect";
  }
  
  feedbackElement.classList.remove('hidden');
}

// Final Puzzle Functions
function initFinalPage() {
  // Check if all chapters are actually solved
  const allSolved = Object.values(gameData.chapters).every(chapter => chapter.solved);
  if (!allSolved) {
      alert("You need to solve all chapters first!");
      window.location.href = "index.html";
      return;
  }
  
  // Set up back button
  document.getElementById('backButtonFinal').addEventListener('click', function() {
      if (currentAudio) {
          currentAudio.pause();
      }
      window.location.href = "index.html";
  });
  
  // Load chapters
  const chaptersContainer = document.getElementById('availableChapters');
  chaptersContainer.innerHTML = '';
  
  for (let i = 1; i <= 3; i++) {
      const chapter = gameData.chapters[i];
      const chapterElement = document.createElement('div');
      chapterElement.className = 'chapter-item';
      chapterElement.setAttribute('data-chapter-id', i);
      chapterElement.setAttribute('draggable', 'true');
      
      chapterElement.innerHTML = `
          <div class="chapter-image-small" style="background-image: url('${chapter.clueImage}')"></div>
          <div class="chapter-title">${chapter.title}</div>
      `;
      
      chapterElement.addEventListener('dragstart', function(e) {
          draggedChapter = {
              id: i,
              title: chapter.title,
              image: chapter.clueImage,
              element: chapterElement
          };
          e.dataTransfer.setData('text/plain', i);
      });
      
      chaptersContainer.appendChild(chapterElement);
  }
  
  // Set up final solution slots
  const finalSolutionSlots = document.querySelectorAll('.final-solution-slot');
  finalSolutionSlots.forEach(slot => {
      slot.addEventListener('dragover', function(e) {
          e.preventDefault();
          this.classList.add('highlight');
      });
      
      slot.addEventListener('dragleave', function() {
          this.classList.remove('highlight');
      });
      
      slot.addEventListener('drop', function(e) {
          e.preventDefault();
          this.classList.remove('highlight');
          
          if (draggedChapter) {
              // Remove from previous slot if it was there
              const existingChapter = document.querySelector(`.chapter-in-slot[data-chapter-id="${draggedChapter.id}"]`);
              if (existingChapter && existingChapter.parentElement !== this) {
                  existingChapter.parentElement.removeChild(existingChapter);
              }
              
              // Add to this slot
              this.innerHTML = '';
              const chapterInSlot = document.createElement('div');
              chapterInSlot.className = 'chapter-in-slot';
              chapterInSlot.setAttribute('data-chapter-id', draggedChapter.id);
              chapterInSlot.setAttribute('draggable', 'true');
              
              chapterInSlot.innerHTML = `
                  <div class="chapter-image-small" style="background-image: url('${draggedChapter.image}')"></div>
                  <div class="chapter-title">${draggedChapter.title}</div>
              `;
              
              chapterInSlot.addEventListener('dragstart', function(e) {
                  draggedChapter = {
                      id: parseInt(this.getAttribute('data-chapter-id')),
                      title: this.querySelector('.chapter-title').textContent,
                      image: gameData.chapters[this.getAttribute('data-chapter-id')].clueImage,
                      element: this
                  };
                  e.dataTransfer.setData('text/plain', this.getAttribute('data-chapter-id'));
              });
              
              this.appendChild(chapterInSlot);
          }
      });
  });
  
  // Set up check final solution button
  document.getElementById('checkFinalSolution').addEventListener('click', checkFinalSolution);
  
  // Set up play full story button
  document.getElementById('playFullStory').addEventListener('click', function() {
      if (currentAudio) {
          currentAudio.pause();
      }
      currentAudio = new Audio(gameData.fullStoryAudio);
      setupAudioControls(currentAudio);
      currentAudio.play()
          .then(() => {
              isPlaying = true;
              document.getElementById('playPauseBtn').textContent = '⏸';
          })
          .catch(error => {
              console.error("Audio playback failed:", error);
              alert("Please interact with the page first to enable audio playback.");
          });
      gameData.allChaptersSolved = true;
      saveGameData();
  });
  
  // Set up reset button
  document.getElementById('resetFinalPuzzle').addEventListener('click', function() {
      document.querySelectorAll('.final-solution-slot').forEach(slot => {
          slot.innerHTML = '';
      });
      document.getElementById('playFullStory').disabled = true;
  });
}

function checkFinalSolution() {
  const finalSolutionSlots = document.querySelectorAll('.final-solution-slot');
  const userSolution = [];
  
  finalSolutionSlots.forEach(slot => {
      const chapter = slot.querySelector('.chapter-in-slot');
      if (chapter) {
          userSolution.push(parseInt(chapter.getAttribute('data-chapter-id')));
      } else {
          userSolution.push(null);
      }
  });
  
  const correctSolution = gameData.finalCorrectOrder;
  const feedbackElement = document.getElementById('finalFeedback');
  
  // Check if all slots are filled
  if (userSolution.includes(null)) {
      feedbackElement.textContent = "Please fill all slots before checking your solution.";
      feedbackElement.className = "feedback incorrect";
      feedbackElement.classList.remove('hidden');
      return;
  }
  
  // Check if solution is correct
  let isCorrect = true;
  for (let i = 0; i < correctSolution.length; i++) {
      if (userSolution[i] !== correctSolution[i]) {
          isCorrect = false;
          break;
      }
  }
  
  if (isCorrect) {
      feedbackElement.textContent = "Correct! You've pieced together the full story.";
      feedbackElement.className = "feedback correct";
      document.getElementById('playFullStory').disabled = false;
  } else {
      feedbackElement.textContent = "Not quite right. Try rearranging the chapters.";
      feedbackElement.className = "feedback incorrect";
  }
  
  feedbackElement.classList.remove('hidden');
}

// Audio Controls Functions
function setupAudioControls(audioElement) {
  const audioControls = document.getElementById('audioControls');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const volumeControl = document.getElementById('volumeControl');
  const currentTime = document.getElementById('currentTime');
  const totalTime = document.getElementById('totalTime');

  audioControls.classList.remove('hidden');
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Update time display
  audioElement.addEventListener('loadedmetadata', () => {
      totalTime.textContent = formatTime(audioElement.duration);
  });

  audioElement.addEventListener('timeupdate', () => {
      currentTime.textContent = formatTime(audioElement.currentTime);
  });

  // Play/Pause button
  playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
          audioElement.pause();
          playPauseBtn.textContent = '⏵';
      } else {
          audioElement.play();
          playPauseBtn.textContent = '⏸';
      }
      isPlaying = !isPlaying;
  });

  // Stop button
  stopBtn.addEventListener('click', () => {
      audioElement.pause();
      audioElement.currentTime = 0;
      playPauseBtn.textContent = '⏵';
      isPlaying = false;
  });

  // Volume control
  volumeControl.addEventListener('input', () => {
      audioElement.volume = volumeControl.value;
  });

  // When audio ends
  audioElement.addEventListener('ended', () => {
      playPauseBtn.textContent = '⏵';
      isPlaying = false;
  });
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Save/Load Game Data
function saveGameData() {
  localStorage.setItem('lostInRedGameData', JSON.stringify(gameData));
}

function loadGameData() {
  const savedData = localStorage.getItem('lostInRedGameData');
  if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Merge saved data with default game data
      for (const chapterNum in parsedData.chapters) {
          if (gameData.chapters[chapterNum]) {
              gameData.chapters[chapterNum].solved = parsedData.chapters[chapterNum].solved;
          }
      }
      
      if (parsedData.allChaptersSolved) {
          gameData.allChaptersSolved = parsedData.allChaptersSolved;
      }
  }
}