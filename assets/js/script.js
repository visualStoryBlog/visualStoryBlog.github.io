// ... (addSubtopicField function)
    subtopicDiv.innerHTML = `
      <input type="text" class="subtopic-title" placeholder="Subtopic Title" required>
      <input type="text" class="subtopic-image-prompt" placeholder="Subtopic Image Prompt" required>
      <button type="button" class="generate-subtopic-image" data-index="<span class="math-inline">\{subtopicIndex\}"\>Generate Image</button\>
<div id\="subtopicImagePreview</span>{subtopicIndex}"></div> 
      <textarea class="subtopic-content" placeholder="Subtopic Content" required></textarea>
      <p class="word-count">Word count: 0</p>
      <button type="button" class="remove-subtopic">Remove</button>
    `;
  
    // ... rest of addSubtopicField function

// ... (attachWordCountValidation function)

// ... (validateForm function)

// Form submission and Markdown generation
document.getElementById('articleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const articleData = {
        mainTopicTitle: document.getElementById('mainTopicTitle').value,
        mainTopicImage: document.getElementById('mainTopicImagePreview').querySelector('img').src,
        mainTopicContent: document.getElementById('mainTopicContent').value,
        subtopics: [],
        internalLink: document.getElementById('internalLink').value,
        externalLink: document.getElementById('externalLink').value,
    };

    const subtopicElements = document.querySelectorAll('.subtopic');
    subtopicElements.forEach(subtopicElement => {
        articleData.subtopics.push({
            title: subtopicElement.querySelector('.subtopicTitle').value,
            image: subtopicElement.querySelector('.subtopic-image-preview img').src,
            content: subtopicElement.querySelector('.subtopicContent').value,
        });
    });

    const articleMarkdown = generateMarkdown(articleData);
    
    document.getElementById('markdown-content').textContent = articleMarkdown;

    // Enable copy button after Markdown is generated
    document.getElementById('copy-button').disabled = false;
});

//copy markdown function
  const copyButton = document.getElementById('copy-button');
  copyButton.addEventListener('click', () => {
    const markdownContent = document.getElementById('markdown-content').textContent;
    const textArea = document.createElement('textarea');
    textArea.value = markdownContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Markdown copied to clipboard!');
  });

// Function to generate markdown
function generateMarkdown(articleData) {
  let markdown = `---
layout: article
title: ${articleData.mainTopicTitle}
date: ${new Date().toISOString().slice(0, 10)}
---

`;
// Add Main Topic Image to the Markdown
    markdown += `![Main Topic Image](${articleData.mainTopicImage})\n\n`;
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
        markdown += `    image: ${subtopic.image}\n`;
    });
    markdown += `\n`;

    articleData.subtopics.forEach(subtopic => {
        markdown += `## ${subtopic.title}\n\n`;
        markdown += `![Subtopic Image](${subtopic.image})\n\n`;
        markdown += `${subtopic.content}\n\n`;
    });

    return markdown;
}


document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('generate-subtopic-image')) {
    const subtopicIndex = event.target.dataset.index;
    const promptInput = event.target.previousElementSibling;
    const prompt = promptInput.value.trim();
    if (prompt !== '') {
      await generateImageWithIdeogram(prompt, subtopicIndex);
    
