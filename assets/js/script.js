// Function to add a new subtopic field
function addSubtopicField() {
  const subtopicsContainer = document.getElementById('subtopics');
  const subtopicDiv = document.createElement('div');
  subtopicDiv.classList.add('subtopic');
  subtopicDiv.innerHTML = `
    <input type="text" class="subtopic-title" placeholder="Subtopic Title" required>
    <input type="file" class="subtopic-image" accept="image/*" required>
    <textarea class="subtopic-content" placeholder="Subtopic Content" required></textarea>
    <p class="word-count">Word count: 0</p>
    <button type="button" class="remove-subtopic">Remove</button>
  `;
  subtopicsContainer.appendChild(subtopicDiv);

  // Event listener for word count
  const textArea = subtopicDiv.querySelector('.subtopic-content');
  const wordCountElement = subtopicDiv.querySelector('.word-count');
  textArea.addEventListener('input', () => {
    const count = textArea.value.trim().split(/\s+/).length;
    wordCountElement.textContent = `Word count: ${count}`;
    wordCountElement.classList.toggle('below-minimum', count < 300);
    validateForm();
  });

  // Event listener for removing subtopic
  subtopicDiv.querySelector('.remove-subtopic').addEventListener('click', () => {
    subtopicsContainer.removeChild(subtopicDiv);
    validateForm();
  });
}

// Initial subtopic field
addSubtopicField();

// Handle adding new subtopics
document.getElementById('addSubtopic').addEventListener('click', addSubtopicField);

// Form validation
function validateForm() {
  const subtopicContents = document.querySelectorAll('.subtopic-content');
  const isValid = Array.from(subtopicContents).every(
    textArea => textArea.value.trim().split(/\s+/).length >= 300
  );

  document.querySelector('#articleForm button[type="submit"]').disabled = !isValid;
}

// Form submission (Generate and display Markdown)
document.getElementById('articleForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const articleData = {
    mainTopicTitle: document.getElementById('mainTopicTitle').value,
    mainTopicImage: document.getElementById('mainTopicImage').files[0].name, // Get filename
    mainTopicContent: document.getElementById('mainTopicContent').value,
    subtopics: [],
    internalLink: document
