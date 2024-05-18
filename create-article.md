---
layout: page
title: Create a New Article
permalink: /create-article/
---

<form id="articleForm">
  <input type="text" id="mainTopicTitle" placeholder="Main Topic Title" required>
  <input type="text" id="mainTopicImagePrompt" placeholder="Main Topic Image Prompt" required>
  <button type="button" id="generateMainImage">Generate Main Image</button>
  <div id="mainTopicImagePreview"></div>
  <textarea id="mainTopicContent" placeholder="Main Topic Content" required></textarea>

  <div id="subtopics"></div>

  <button type="button" id="addSubtopic">Add Subtopic</button>

  <input type="url" id="internalLink" placeholder="Internal Link (Optional)">
  <input type="url" id="externalLink" placeholder="External Link (Optional)">

  <button type="submit">Publish Article</button>
</form>

<div id="markdown-container">
  <pre id="markdown-content"></pre>
  <button id="copy-button">Copy Markdown</button>
</div>

<script>
  // ... (JavaScript code for form handling, validation, and subtopic fields)
</script>


