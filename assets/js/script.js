// ... (addSubtopicField, attachWordCountValidation, validateForm functions remain the same) ...

// Form submission (Generate Markdown and redirect to new "published" page)
document.getElementById('articleForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Gather article data (same as before)
    // ...

    // Generate Markdown
    const articleMarkdown = generateMarkdown(articleData);

    // Create a filename based on the title and date
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const filename = `${date}-${articleData.mainTopicTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}.md`;

    // Store Markdown in sessionStorage 
    sessionStorage.setItem('articleMarkdown', articleMarkdown);
    sessionStorage.setItem('articleFilename', filename);

    // Redirect to the "published" page, using the filename as the path
    window.location.href = `/${filename}`;
});

