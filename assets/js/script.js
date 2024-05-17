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
    internalLink: document.getElementById('internalLink').value,
    externalLink: document.getElementById('externalLink').value,
  };

  const subtopicElements = document.querySelectorAll('.subtopic');
  subtopicElements.forEach(subtopicElement => {
    articleData.subtopics.push({
      title: subtopicElement.querySelector('.subtopicTitle').value,
      image: subtopicElement.querySelector('.subtopicImage').files[0].name,  
      content: subtopicElement.querySelector('.subtopicContent').value,
    });
  });

  // Generate Markdown (add your implementation here)
  const articleMarkdown = generateMarkdown(articleData);

  // Display Markdown in a new window (or use another method to save/download)
  const newWindow = window.open('', '_blank');
  newWindow.document.write(`<pre>${articleMarkdown}</pre>`);
  newWindow.document.close();
});


function generateMarkdown(articleData) {
  let markdown = `---
layout: article
title: ${articleData.mainTopicTitle}
date: ${new Date().toISOString().slice(0, 10)}
---

`;
// Add Main Topic Image to the Markdown
    markdown += `![Main Topic Image]({{site.baseurl}}/assets/images/${articleData.mainTopicImage})\n\n`;
// Add Main Topic Content to the Markdown
    markdown += `${articleData.mainTopicContent}\n\n`;

    if (articleData.internalLink) {
        markdown += `[Internal Link](${articleData.internalLink})\n\n`;
    }

    if (articleData.externalLink) {
        markdown += `[External Link](${articleData.externalLink})\n\n`;
    }

    // Add Visual Story to the Markdown (Optional)
    markdown += `visual_story:\n`;
    articleData.subtopics.forEach(subtopic => {
        markdown += `  - title: ${subtopic.title}\n`;
        markdown += `    image: {{site.baseurl}}/assets/images/${subtopic.image}\n`;
    });
    markdown += `\n`;

    articleData.subtopics.forEach(subtopic => {
        markdown += `## ${subtopic.title}\n\n`;
        markdown += `![Subtopic Image]({{site.baseurl}}/assets/images/${subtopic.image})\n\n`;
        markdown += `${subtopic.content}\n\n`;
    });

    return markdown;
}
