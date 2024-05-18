// Function to add a new subtopic field
function addSubtopicField() {
  // ... (same as in the previous response)
}

// Function to attach word count validation to a textarea
function attachWordCountValidation(textArea) {
  // ... (same as in the previous response)
}

// Initial subtopic field
addSubtopicField();

// Handle adding new subtopics
document.getElementById('addSubtopic').addEventListener('click', addSubtopicField);

// Form validation
function validateForm() {
  // ... (same as in the previous response)
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

    const articleMarkdown = generateMarkdown(articleData);

    // Store Markdown in sessionStorage for access on confirmation page
    sessionStorage.setItem('articleMarkdown', articleMarkdown);
    // Redirect to confirmation page
    window.location.href = '/article-published.html'; 
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

  // ... (addSubtopicField, attachWordCountValidation, validateForm functions remain the same)

async function generateImageWithIdeogram(prompt, subtopicIndex) {
    const imageContainer = document.getElementById(`subtopicImagePreview${subtopicIndex}`);

    try {
        // Display a loading indicator (optional)
        imageContainer.innerHTML = '<p>Generating image...</p>';

        const response = await fetch('/.netlify/functions/generate-image', {
            method: 'POST',
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        const imageUrl = data.imageUrl;

        const imagePreview = document.createElement('img');
        imagePreview.src = imageUrl;
        imagePreview.alt = `Generated image for subtopic ${subtopicIndex + 1}`;

        imageContainer.innerHTML = ''; // Clear loading indicator
        imageContainer.appendChild(imagePreview);
    } catch (error) {
        console.error('Error generating image with Ideogram:', error);
        imageContainer.innerHTML = '<p>Error generating image. Please try again.</p>';
    }
}

async function generateImageWithIdeogram(prompt, subtopicIndex) {
  const imageContainer = document.getElementById(`subtopicImagePreview${subtopicIndex}`);

  try {
    imageContainer.innerHTML = '<p>Generating image...</p>'; // Loading indicator

    const image_path = await builder(prompt, {
        output_dir: 'assets/images/', // Save images to your assets folder
    })

    const imagePreview = document.createElement('img');
    imagePreview.src = `/assets/images/${image_path}`; // Update path
    imagePreview.alt = `Generated image for subtopic ${subtopicIndex + 1}`;

    imageContainer.innerHTML = ''; 
    imageContainer.appendChild(imagePreview);
    updateMarkdown(); // Update Markdown after image generation
  } catch (error) {
    console.error('Error generating image with Ideogram:', error);
    imageContainer.innerHTML = '<p>Error generating image. Please try again.</p>';
  }
}
function updateMarkdown() {
  const articleData = {
    // ... (gather data as before, including image paths from the imagePreview elements)
  };
  const articleMarkdown = generateMarkdown(articleData);
  document.getElementById('markdown-content').textContent = articleMarkdown;
}

  
}
