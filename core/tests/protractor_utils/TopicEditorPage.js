// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Page object for the topics editor page, for use
 * in Protractor tests.
 */

var dragAndDropScript = require('html-dnd').code;
var action = require('../protractor_utils/action.js');
var general = require('../protractor_utils/general.js');
var waitFor = require('./waitFor.js');
var workflow = require('../protractor_utils/workflow.js');

var TopicEditorPage = function() {
  var EDITOR_URL_PREFIX = '/topic_editor/';
  var createStoryButton = element(
    by.css('.protractor-test-create-story-button'));
  var newStoryTitleField = element(
    by.css('.protractor-test-new-story-title-field'));
  var newStoryUrlFragmentField = element(
    by.css('.protractor-test-new-story-url-fragment-field'));
  var confirmStoryCreationButton = element(
    by.css('.protractor-test-confirm-story-creation-button'));
  var storyListItems = element.all(
    by.css('.protractor-test-story-list-item'));
  var storyListTable = element(by.css('.protractor-test-story-list-table'));

  var topicNameField = element(
    by.css('.protractor-test-topic-name-field'));
  var topicNameHeading = element(
    by.css('.protractor-test-topic-name-heading'));
  var topicDescriptionField = element(
    by.css('.protractor-test-topic-description-field'));
  var topicDescriptionHeading = element(
    by.css('.protractor-test-topic-description-heading'));
  var saveTopicButton = element(
    by.css('.protractor-test-save-topic-button'));
  var publishTopicButton = element(
    by.css('.protractor-test-publish-topic-button'));
  var commitMessageField = element(
    by.css('.protractor-test-commit-message-input'));
  var closeSaveModalButton = element(
    by.css('.protractor-test-close-save-modal-button'));
  var addSubtopicButton = element(
    by.css('.protractor-test-add-subtopic-button'));
  var newSubtopicTitleField = element(
    by.css('.protractor-test-new-subtopic-title-field'));
  var newSubtopicUrlFragmentField = element(
    by.css('.protractor-test-new-subtopic-url-fragment-field'));
  var confirmSubtopicCreationButton = element(by.css(
    '.protractor-test-confirm-subtopic-creation-button'));
  var subtopics = element.all(by.css('.protractor-test-subtopic'));
  var subtopicColumns = element.all(
    by.css('.protractor-test-subtopic-column'));
  var subtopicEditOptions = element.all(by.css(
    '.protractor-test-show-subtopic-options'));
  var deleteSubtopicButton = element(
    by.css('.protractor-test-delete-subtopic-button'));
  var reassignSkillButton = element(
    by.css('.protractor-test-reassign-skill-button'));
  var uncategorizedSkills = element.all(
    by.css('.protractor-test-uncategorized-skill-card'));
  var uncategorizedSkillItems = element.all(
    by.css('.protractor-test-skill-item'));
  var uncategorizedSkillsContainer = element(
    by.css('.protractor-test-uncategorized-skills-container'));
  var subtopicTitleField = element(
    by.css('.protractor-test-subtopic-title-field'));
  var questionsTabButton = element(
    by.css('.protractor-test-questions-tab-button'));
  var createQuestionButton = element(
    by.css('.protractor-test-create-question-button'));
  var saveQuestionButton = element(
    by.css('.protractor-test-save-question-button'));
  var questionItems = element.all(
    by.css('.protractor-test-question-list-item'));
  var selectSkillDropdown = element(
    by.css('.protractor-test-select-skill-dropdown'));
  var subtopicThumbnailImageElement = element(
    by.css('.subtopic-thumbnail .protractor-test-custom-photo'));
  var subtopicThumbnailButton = element(
    by.css('.subtopic-thumbnail .protractor-test-photo-button'));
  var topicThumbnailImageElement = element(
    by.css('.thumbnail-editor .protractor-test-custom-photo'));
  var topicThumbnailButton = element(
    by.css('.thumbnail-editor .protractor-test-photo-button'));
  var thumbnailContainer = element(
    by.css('.protractor-test-thumbnail-container'));
  var newStoryDescriptionField = element(
    by.css('.protractor-test-new-story-description-field'));
  var storyThumbnailButton = element(
    by.css('.thumbnail-editor .protractor-test-photo-button'));
  var topicMetaTagContentField = element(
    by.css('.protractor-test-topic-meta-tag-content-field'));
  var topicMetaTagContentLabel = element(
    by.css('.protractor-test-topic-meta-tag-content-label'));
  var topicPageTitleFragmentField = element(
    by.css('.protractor-test-topic-page-title-fragment-field'));
  var topicPageTitleFragmentLabel = element(
    by.css('.protractor-test-topic-page-title-fragment-label'));
  var easyRubricDifficulty = element(
    by.css('.protractor-test-skill-difficulty-easy'));
  var storyTitleClassname = '.protractor-test-story-title';

  var dragAndDrop = async function(fromElement, toElement) {
    await browser.executeScript(dragAndDropScript, fromElement, toElement);
  };

  var skillSelector = function(skillDescription) {
    return element(by.css('option[label="' + skillDescription + '"]'));
  };

  var saveRearrangedSkillsButton = element(
    by.css('.protractor-save-rearrange-skills'));
  var practiceTabCheckbox = element(
    by.css('.protractor-test-toggle-practice-tab'));

  this.togglePracticeTab = async function() {
    await action.click('Practice tab checkbox', practiceTabCheckbox);
  };

  this.get = async function(topicId) {
    await browser.get(EDITOR_URL_PREFIX + topicId);
    await waitFor.pageToFullyLoad();
  };

  this.getTopicThumbnailSource = async function() {
    return await workflow.getImageSource(topicThumbnailImageElement);
  };

  this.getSubtopicThumbnailSource = async function() {
    return await workflow.getImageSource(subtopicThumbnailImageElement);
  };

  this.submitTopicThumbnail = async function(imgPath, resetExistingImage) {
    return await workflow.submitImage(
      topicThumbnailButton, thumbnailContainer, imgPath,
      resetExistingImage);
  };

  this.submitSubtopicThumbnail = async function(imgPath, resetExistingImage) {
    return await workflow.submitImage(
      subtopicThumbnailButton, thumbnailContainer, imgPath, resetExistingImage);
  };

  this.publishTopic = async function() {
    await publishTopicButton.click();
    await waitFor.invisibilityOf(
      publishTopicButton, 'Topic is taking too long to publish.');
  };

  this.expectNumberOfQuestionsForSkillWithDescriptionToBe = async function(
      count, skillDescription) {
    await action.select(
      'Select skill dropdown', selectSkillDropdown, skillDescription);
    await action.click(
      'Skill description button', skillSelector(skillDescription));
    await waitFor.visibilityOf(
      questionItems.first(), 'Question takes too long to appear');
    expect(await questionItems.count()).toEqual(count);
  };

  this.saveQuestion = async function() {
    await general.scrollToTop();
    await action.click('Save question button', saveQuestionButton);
    await waitFor.invisibilityOf(
      saveQuestionButton, 'Question modal takes too long to disappear');
  };

  this.createQuestionForSkillWithName = async function(skillDescription) {
    await action.select(
      'Select skill dropdown', selectSkillDropdown, skillDescription);
    await action.click(
      'Skill description button', skillSelector(skillDescription));
    await action.click('Create question button', createQuestionButton);
    await action.click('Easy difficulty for skill', easyRubricDifficulty);
  };

  this.moveToQuestionsTab = async function() {
    await action.click('Questions tab button', questionsTabButton);
  };

  this.expectSubtopicPageContentsToMatch = async function(contents) {
    var subtopicContentText = element(
      by.css('.protractor-test-subtopic-html-content'));
    await waitFor.visibilityOf(
      subtopicContentText,
      'Subtopic content text element taking too long to appear');
    var text = await subtopicContentText.getText();
    expect(text).toMatch(contents);
  };

  this.expectTitleOfSubtopicWithIndexToMatch = async function(title, index) {
    await waitFor.visibilityOf(
      subtopics, 'Subtopics element taking too long to appear');
    expect(await subtopics.get(index).getText()).toEqual(title);
  };

  this.changeSubtopicTitle = async function(title) {
    await action.clear('Subtopic title field', subtopicTitleField);
    await action.sendKeys('Subtopic title field', subtopicTitleField, title);
  };

  this.changeSubtopicPageContents = async function(content) {
    await general.scrollToTop();
    var subtopicPageContentButton = element(by.css(
      '.protractor-test-edit-html-content'));
    await action.click(
      'Subtopic page content button', subtopicPageContentButton);
    var pageEditor = element(by.css(
      '.protractor-test-edit-subtopic-page-contents'));
    await waitFor.visibilityOf(
      pageEditor, 'Subtopic html editor takes too long to appear');
    var pageEditorInput = pageEditor.element(by.css('.oppia-rte'));
    await action.click('Page editor input', pageEditorInput);
    await action.clear('Page editor input', pageEditorInput);
    await action.sendKeys('Page editor input', pageEditorInput, content);
    var saveSubtopicPageContentButton = element(by.css(
      '.protractor-test-save-subtopic-content-button'));
    await action.click(
      'Save subtopic page content button', saveSubtopicPageContentButton);
  };

  this.expectNumberOfUncategorizedSkillsToBe = async function(count) {
    await waitFor.visibilityOf(
      uncategorizedSkillItems,
      'Uncategorized skill items element taking too long to appear');
    expect(await uncategorizedSkillItems.count()).toEqual(count);
  };

  this.deleteSubtopicWithIndex = async function(index) {
    var subtopicEditOptionBox = subtopicEditOptions.get(index);
    await action.click('Sub topic edit option box', subtopicEditOptionBox);
    await action.click('Delete subtopic button', deleteSubtopicButton);
  };

  this.expectNumberOfSubtopicsToBe = async function(count) {
    await waitFor.visibilityOf(
      subtopics, 'Subtopics element taking too long to appear');
    expect(await subtopics.count()).toEqual(count);
  };

  this.addSubtopic = async function(title, urlFragment, imgPath, htmlContent) {
    await action.click('Add subtopic button', addSubtopicButton);
    await action.sendKeys(
      'New subtopic title field', newSubtopicTitleField, title);

    await action.sendKeys(
      'Create new url fragment', newSubtopicUrlFragmentField, urlFragment);
    await workflow.submitImage(
      topicThumbnailButton, thumbnailContainer, imgPath, false);
    var subtopicPageContentButton = element(by.css(
      '.protractor-test-show-schema-editor'));
    await action.click(
      'Subtopic page content button', subtopicPageContentButton);
    var pageEditor = element(by.css(
      '.protractor-test-create-subtopic-page-content'));
    await waitFor.visibilityOf(
      pageEditor, 'Subtopic html editor takes too long to appear');
    var pageEditorInput = pageEditor.element(by.css('.oppia-rte'));
    await action.click('Page editor input', pageEditorInput);
    await action.sendKeys(
      'Page editor input', pageEditorInput, htmlContent);

    await action.click(
      'Confirm subtopic creation button', confirmSubtopicCreationButton);
    await waitFor.invisibilityOf(
      element(by.css('.protractor-test-new-subtopic-editor')),
      'Create subtopic modal taking too long to disappear.');
  };

  this.addConceptCardToSubtopicExplanation = async function(skillName) {
    var pageEditorInput = element(by.css('.protractor-test-edit-html-content'));
    await action.click('RTE input', pageEditorInput);
    var conceptCardButton = element(
      by.css('.protractor-test-ck-editor')).element(
      by.cssContainingText('.cke_button', 'Insert Concept Card Link'));
    await action.click('Concept card button', conceptCardButton);
    var skillForConceptCard = element(
      by.cssContainingText(
        '.protractor-test-rte-skill-selector-item', skillName));
    await action.click('Skill for concept card', skillForConceptCard);
    var closeRTEButton = element(
      by.css('.protractor-test-close-rich-text-component-editor'));
    await action.click('Close RTE button', closeRTEButton);
  };

  this.saveSubtopicExplanation = async function() {
    var saveSubtopicExplanationButton = element(by.css(
      '.protractor-test-save-subtopic-content-button'));
    await waitFor.elementToBeClickable(
      saveSubtopicExplanationButton,
      'Save Subtopic Explanation button taking too long to be clickable');
    await action.click(
      'Save subtopic explanation', saveSubtopicExplanationButton);
  };

  this.dragSkillToSubtopic = async function(skillDescription, subtopicIndex) {
    await waitFor.visibilityOf(
      uncategorizedSkills.first(),
      'Uncategorized skills taking too long to appear.');
    const target = subtopicColumns.get(subtopicIndex);
    var uncategorizedSkillIndex = -1;
    for (var i = 0; i < await uncategorizedSkills.count(); i++) {
      if (skillDescription === await uncategorizedSkills.get(i).getText()) {
        uncategorizedSkillIndex = i;
        break;
      }
    }
    await waitFor.visibilityOf(
      uncategorizedSkillIndex,
      'Uncategorized skill index element taking too long to appear');
    expect(uncategorizedSkillIndex).not.toEqual(-1);
    var toMove = await uncategorizedSkills.get(uncategorizedSkillIndex);
    await dragAndDrop(toMove, target);
  };

  this.saveRearrangedSkills = async function() {
    await action.click(
      'Save rearranged skills modal', saveRearrangedSkillsButton);
  };

  this.navigateToReassignModal = async function() {
    await action.click('Reassign skill button', reassignSkillButton);
  };

  this.expectSubtopicWithIndexToHaveSkills = async function(
      subtopicIndex, skillNames) {
    const assignedSkillDescriptions = (
      subtopicColumns.get(subtopicIndex).all(
        by.css('.protractor-test-subtopic-skill-description')));
    const assignedSkillsLength = await assignedSkillDescriptions.count();

    await waitFor.visibilityOf(
      skillNames, 'Skill names element taking too long to appear');
    expect(skillNames.length).toEqual(assignedSkillsLength);

    for (var i = 0; i < assignedSkillsLength; i++) {
      const skillDescription = await assignedSkillDescriptions.get(i).getText();
      await waitFor.visibilityOf(
        skillDescription,
        'Skill description element taking too long to appear');
      expect(skillDescription).toEqual(skillNames[i]);
    }
  };

  this.dragSkillFromSubtopicToSubtopic = async function(
      fromSubtopicIndex, toSubtopicIndex, skillDescription) {
    const assignedSkillToMove = await this.getTargetMoveSkill(
      fromSubtopicIndex, skillDescription);
    const toSubtopicColumn = subtopicColumns.get(toSubtopicIndex);
    await dragAndDrop(assignedSkillToMove, toSubtopicColumn);
  };

  this.expectUncategorizedSkillsToBe = async function(skillDescriptions) {
    await waitFor.visibilityOf(
      uncategorizedSkills.first(),
      'Uncategorized skills taking too long to appear.');

    for (var i = 0; i < await uncategorizedSkills.count(); i++) {
      expect(skillDescriptions[i]).toEqual(
        await uncategorizedSkills.get(i).getText());
    }
  };

  this.getTargetMoveSkill = async function(
      subtopicIndex, skillDescription) {
    const fromSubtopicColumn = subtopicColumns.get(subtopicIndex);
    const assignedSkills = fromSubtopicColumn.all(
      by.css('.protractor-test-subtopic-skill-description'));
    const assignedSkillsLength = await assignedSkills.count();
    var toMoveSkillIndex = -1;
    for (var i = 0; i < assignedSkillsLength; i++) {
      if (skillDescription === await assignedSkills.get(i).getText()) {
        toMoveSkillIndex = i;
        break;
      }
    }
    await waitFor.visibilityOf(
      toMoveSkillIndex,
      'To move skill index element taking too long to appear');
    expect(toMoveSkillIndex).not.toEqual(-1);

    return assignedSkills.get(toMoveSkillIndex);
  };

  this.dragSkillFromSubtopicToUncategorized = async function(
      subtopicIndex, skillDescription) {
    const assignedSkillToMove = await this.getTargetMoveSkill(
      subtopicIndex, skillDescription);
    await dragAndDrop(assignedSkillToMove, uncategorizedSkillsContainer);
  };

  this.navigateToTopicEditorTab = async function() {
    var topicEditorTab = element(by.css('.protractor-test-edit-topic-tab'));
    await action.click('Topic editor tab', topicEditorTab);
  };

  this.navigateToSubtopicWithIndex = async function(subtopicIndex) {
    var subtopic = await subtopics.get(subtopicIndex);
    await action.click('Subtopic', subtopic);
    await waitFor.pageToFullyLoad();
  };

  this.expectNumberOfStoriesToBe = async function(count) {
    if (count) {
      await waitFor.visibilityOf(
        storyListTable, 'Story list table takes too long to appear.');
    }
    expect(await storyListItems.count()).toEqual(count);
  };

  this.expectStoryTitleToBe = async function(title, index) {
    await waitFor.visibilityOf(
      storyListTable, 'Story list table takes too long to appear.');
    expect(
      await storyListItems.get(index).all(
        by.css('.protractor-test-story-title')).first().getText()
    ).toEqual(title);
  };

  this.expectStoryPublicationStatusToBe = async function(status, index) {
    await waitFor.visibilityOf(
      storyListTable, 'Story list table takes too long to appear.');
    expect(
      await storyListItems.get(index).all(
        by.css('.protractor-test-story-publication-status')).first().getText()
    ).toEqual(status);
  };

  this.navigateToStoryWithIndex = async function(index) {
    await waitFor.visibilityOf(
      storyListTable, 'Story list table takes too long to appear.');
    var storyItem = await storyListItems.get(index);
    await action.click('Story item', storyItem);
    await waitFor.pageToFullyLoad();
    await waitFor.invisibilityOf(
      storyListTable, 'Story list table too long to disappear.');
  };

  this.navigateToStoryWithTitle = async function(storyName) {
    await waitFor.visibilityOf(
      storyListTable, 'Story list table takes too long to appear.');
    var storyItem = element(
      by.cssContainingText(storyTitleClassname, storyName));
    await action.click('Story Item', storyItem);
    await waitFor.pageToFullyLoad();
    await waitFor.invisibilityOf(
      storyListTable, 'Story list table too long to disappear.');
  };

  this.createStory = async function(
      storyTitle, storyUrlFragment, storyDescription, imgPath) {
    await general.scrollToTop();
    await action.click('Create story button', createStoryButton);

    await action.sendKeys(
      'Create new story title', newStoryTitleField, storyTitle);
    await action.sendKeys(
      'Create new story description', newStoryDescriptionField,
      storyDescription);
    await action.sendKeys(
      'Create new story url fragment', newStoryUrlFragmentField,
      storyUrlFragment);

    await workflow.submitImage(
      storyThumbnailButton, thumbnailContainer, imgPath, false);

    await action.click(
      'Confirm story creation button', confirmStoryCreationButton);
    await waitFor.pageToFullyLoad();
  };

  this.updatePageTitleFragment = async function(newPageTitleFragment) {
    await action.sendKeys(
      'Update Page Title Fragment',
      topicPageTitleFragmentField, newPageTitleFragment);
    await action.click(
      'Page Title Fragment label', topicPageTitleFragmentLabel);
  };

  this.updateMetaTagContent = async function(newMetaTagContent) {
    await action.sendKeys(
      'Update Meta Tag Content', topicMetaTagContentField, newMetaTagContent);
    await action.click('Meta Tag Content label', topicMetaTagContentLabel);
  };

  this.changeTopicName = async function(newName) {
    await action.clear('Topic name field', topicNameField);
    await action.sendKeys('Topic name field', topicNameField, newName);
    await action.click('Topic name heading', topicNameHeading);
  };

  this.expectTopicNameToBe = async function(name) {
    await waitFor.visibilityOf(
      topicNameField, 'Topic name field element taking too long to appear');
    expect(await topicNameField.getAttribute('value')).toEqual(name);
  };

  this.changeTopicDescription = async function(newDescription) {
    await general.scrollToTop();
    await action.clear(
      'Topic description field', topicDescriptionField);
    await action.sendKeys(
      'Topic description field', topicDescriptionField, newDescription);
    await action.click(
      'Topic description heading', topicDescriptionHeading);
  };

  this.expectTopicDescriptionToBe = async function(description) {
    await waitFor.visibilityOf(
      topicDescriptionField,
      'Topic description field element taking too long to appear');
    expect(await topicDescriptionField.getAttribute('value')).toEqual(
      description);
  };

  this.saveTopic = async function(commitMessage) {
    await action.click('Save topic button', saveTopicButton);
    await action.sendKeys(
      'Commit message field', commitMessageField, commitMessage);

    await action.click('Close save modal button', closeSaveModalButton);
    await waitFor.visibilityOfSuccessToast(
      'Success toast for saving topic takes too long to appear.');
  };
};

exports.TopicEditorPage = TopicEditorPage;
