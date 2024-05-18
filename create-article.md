<form id="articleForm">
  <input type="text" id="mainTopicTitle" placeholder="Main Topic Title" required>
  <div class="image-upload">
    <label for="mainTopicImage">Main Topic Image:</label>
    <input type="file" id="mainTopicImage" accept="image/*" required>
  </div>
  <textarea id="mainTopicContent" placeholder="Main Topic Content" required></textarea>

  <div id="subtopics"></div>

  <button type="button" id="addSubtopic">Add Subtopic</button>

  <input type="url" id="internalLink" placeholder="Internal Link (Optional)">
  <input type="url" id="externalLink" placeholder="External Link (Optional)">

  <button type="submit">Publish Article</button>
</form>
