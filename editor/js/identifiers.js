/**
 * Copyright 2020 Open Reaction Database Project Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.module('ord.identifiers');
goog.module.declareLegacyNamespace();
exports = {load, unload, add};

goog.require('ord.uploads');
goog.require('proto.ord.ReactionIdentifier');

function load(identifiers) {
  identifiers.forEach(identifier => loadIdentifier(identifier));
  if (!(identifiers.length)) {
    add();
  }
};

function loadIdentifier(identifier) {
  const node = add();
  const value = identifier.getValue();
  $('.reaction_identifier_value', node).text(value);
  ord.reaction.setSelector(node, identifier.getType());
  $('.reaction_identifier_details', node).text(identifier.getDetails());
};

function unload () {
  const identifiers = [];
  $('.reaction_identifier').each(function(index, node) {
    node = $(node);
    if (!node.attr('id')) {
      // Not a template.
      const identifier = unloadIdentifier(node);
      if (!ord.reaction.isEmptyMessage(identifier)) {
        identifiers.push(identifier);
      }
    }
  });
  return identifiers;
};

function unloadIdentifier (node) {
  const identifier = new proto.ord.ReactionIdentifier();

  const value = $('.reaction_identifier_value', node).text();
  if (!ord.reaction.isEmptyMessage(value)) {
    identifier.setValue(value);
  }

  const type = ord.reaction.getSelector(node);
  if (!ord.reaction.isEmptyMessage(type)) {
    identifier.setType(type);
  }
  const details = $('.reaction_identifier_details', node).text();
  if (!ord.reaction.isEmptyMessage(details)) {
    identifier.setDetails(details);
  }
  return identifier;
};

function add () {
  const node =
      ord.reaction.addSlowly('#reaction_identifier_template', '#identifiers');

  const uploadButton = $('.reaction_identifier_upload', node);
  uploadButton.change(function() {
    if ($(this).is(':checked')) {
      $('.uploader', node).show();
      $('.reaction_identifier_value', node).hide();
      $('.text_upload', node).hide();
    } else {
      $('.uploader', node).hide();
      $('.reaction_identifier_value', node).show();
    }
  });
  ord.uploads.initialize(node);
  return node;
};
