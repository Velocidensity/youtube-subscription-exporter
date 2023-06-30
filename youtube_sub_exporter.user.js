// ==UserScript==
// @name        YouTube Subscription Exporter
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/feed/channels
// @grant       none
// @version     1.1
// @author      Velocidensity
// @run-at      document-idle
// @description Exports a list of YouTube subscriptions to a csv file
// @homepageURL https://github.com/Velocidensity/youtube-subscription-exporter
// @downloadURL https://raw.githubusercontent.com/Velocidensity/youtube-subscription-exporter/main/youtube_sub_exporter.user.js
// ==/UserScript==

(function () {
  'use strict';

  const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const CSV_HEADER = 'Channel ID,Channel URL,Channel title\n';

  function addButton (text, func) {
    const button = document.createElement('button');
    button.classList.add(
      'yt-spec-button-shape-next', 'yt-spec-button-shape-next--tonal',
      'yt-spec-button-shape-next--mono', 'yt-spec-button-shape-next--size-m'
    );
    button.style.maxWidth = '160px';
    button.style.margin = '4px';
    button.innerText = text;
    button.addEventListener('click', func);
    document.getElementById('center').appendChild(button);
  }

  function scrollToBottom () {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }

  function download (data, name, type) {
    const a = document.createElement('a');
    const file = new Blob(data, { type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  }

  async function fetchChannelId (url) {
    const id = await fetch(url, { method: 'GET' })
      .then(resp => resp.text())
      .then(content => {
        const parser = new DOMParser();
        const page = parser.parseFromString(content, 'text/html');
        const identifier = page.querySelector('meta[itemprop="identifier"]');
        return identifier.content;
      });
    return id;
  }

  async function parseChannelLink (link) {
    const channelId = await fetchChannelId(link.href);
    return [channelId, link.href, link.children[0].children[0].innerText].join(',');
  }

  async function exportSubscriptions () {
    if (document.documentElement.scrollTop === 0) {
      return window.alert(
        'Please scroll down to the bottom of page and wait for all subscriptions to load.'
      );
    }

    window.alert('Starting fetching channel IDs. This may take a while.');

    const elements = Array.from(document.querySelectorAll('.channel-link#main-link'));
    const promises = elements.map(parseChannelLink);
    const channels = await Promise.all(promises);

    const csv = [BOM, CSV_HEADER, channels.join('\n')];
    download(csv, 'subscriptions.csv', 'text/csv');
    window.alert('A file with your subscriptions has been downloaded!');
  }

  addButton('Export subscriptions', exportSubscriptions);
  addButton('Scroll to bottom', scrollToBottom);
})();
