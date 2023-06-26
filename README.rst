====
YouTube Subscription Exporter
====

Note
====
When possible, using `Google Takeout <https://takeout.google.com/>`_ is preferred to this script, as it also exports channel IDs. However, this option only seems to export data from the main/default channel, not any other ones on the account, effectively making it useless for my usecase.

For instructions on how to use Takeout for this, see the `Invidious Documentation page <https://docs.invidious.io/export-youtube-subscriptions/>`_ on this subject.

Installation
====
1. Download a user script manager, such as `Violentmonkey <https://violentmonkey.github.io/>`_ (recommended) or `Tampermonkey <https://www.tampermonkey.net/>`_.
2. Install the `YouTube Subscription Exporter <https://github.com/Velocidensity/youtube-subscription-exporter/blob/main/youtube_sub_exporter.user.js?raw=1>`_ script.

Usage
====
1. Open `YouTube's subscription page <https://www.youtube.com/feed/channels>`_. For the script to load, this URL must be opened directly, not navigated to from any other page.
2. Scroll down to the bottom to load all subscribed channels.
3. Click the "Export subscriptions" button and a CSV file should be downloaded.
4. Open CSV in a spreadsheet or text editor and verify the data.

Preview
====
.. image:: https://github.com/Velocidensity/youtube-subscription-exporter/blob/main/preview.png
  :alt: Image showing the scripts's interface
