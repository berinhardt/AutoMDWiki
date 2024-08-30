# AutoMDWiki

This is a simple node.js script to support MDWiki.

# Dependencies

* [MDWiki](https://dynalon.github.io/mdwiki/)
* [http-server](https://github.com/http-party/http-server)

# Installation

* clone the repo
* download [MDWiki](https://dynalon.github.io/mdwiki/#!download.md)
* (Optional) run `npm install`

# Usage

* create the md files in a structured directory where folders are categories and files wiki entries
* the folder name will be the title of the wiki
* run `npm run build <directory>` to copy index.md and generate navigation
* (Optional) run `npm wiki` to start web server ([options](https://github.com/http-party/http-server))




