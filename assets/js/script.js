// ... (addSubtopicField, attachWordCountValidation, validateForm functions remain the same)

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
