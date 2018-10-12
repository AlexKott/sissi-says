# sissi-says – a CMS for [sissi]

<img src='https://raw.githubusercontent.com/square-a/sissi/master/sissi.png'  width='160px' />

Hi, it’s me again. *sissi*, your ***si**mple **s**tatic **si**tes* generator.

If you want to turn your simple React app into a static site with a built-in CMS look no further! Or actually, do: [the sissi repo][sissi] is where you'll find all you need. See you there!

If you're a sissi fan and want to contribute – welcome! I'm glad you're here. I have to apologise, though. Please bear with me. I have but two parents and they are working hard on their sissi-to-do-lists. *Contribution guidelines* and *thorough documentation of all packages* are somewhere in there. Somewhere... For now, this will have to do:

## What sissi-says can do
*sissi-says* is the sissi CMS. This package contains both the frontend and the API.

### CMS Frontend
The *sissi-says* frontend is a [React](https://reactjs.org/) app, using [Redux](https://redux.js.org) for state management. It fetches the `structure.json` to set up the CMS – with pages, sections and fields – and the `content.json` to populate it. Users can then edit, save and publish their changes.

### API
The *sissi-says* API manages the `content.json` and `structure.json` for the CMS and handles user authorisation based on the `config.json`.

It triggers [sissi-moves] on startup and each time the `content.json` is requested to make sure the file is always valid according to the structure.

The API also provides an endpoint to build the static site with [sissi-snaps].

[sissi]:https://github.com/square-a/sissi
[sissi-moves]:https://github.com/square-a/sissi-moves
[sissi-snaps]:https://github.com/square-a/sissi-snaps
