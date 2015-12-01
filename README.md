# Subs, please

Simple GUI to download subtitles from [opensubtitles](http://www.opensubtitles.org/) using  [subtitler](https://github.com/divhide/node-subtitler) and [Electron](https://github.com/atom/electron).

Use drag and drop to add the video files, the subtitles will be searched based on their title and selected language. Subtitles will be placed on the same dir than the video with the same name and '.srt' extension.

## Binaries
* 1.0.0
  * [MacOSX](http://brovador.github.io/SubsPlease/builds/1.0.0/SubsPlease-MacOSX-1.0.0.zip)
  * Windows [32-bit](http://brovador.github.io/SubsPlease/builds/1.0.0/SubsPlease-win32-ia32.zip) [64-bit] (http://brovador.github.io/SubsPlease/builds/1.0.0/SubsPlease-win32-x64.zip)

## Screens

![Screen1](http://brovador.github.io/SubsPlease/screenshot2.png)

## Build

```
npm install
bower install
grunt build
```

Use ```grunt watch``` for development

Then use [electron-packager](https://github.com/maxogden/electron-packager) and build for your platform.

## TODO Features list
* Automated build process
* Add more languages
* Icon
* Add link to build binaries

## License
MIT
