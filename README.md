# Subs, please

Simple GUI to download subtitles from [opensubtitles](http://www.opensubtitles.org/) using  [subtitler](https://github.com/divhide/node-subtitler) and [Electron](https://github.com/atom/electron).

Use drag and drop to add the video files, the subtitles will be searched based on their title and selected language. Subtitles will be placed on the same dir than the video with the same name and '.srt' extension.

![Screen1](http://brovador.github.io/SubsPlease/screenshot2.png)

## Binaries
* 1.0.1
  * [MacOSX](http://brovador.github.io/SubsPlease/builds/1.0.1/SubsPlease-mas-x64.zip)
* 1.0
  * Windows [32-bit](http://brovador.github.io/SubsPlease/builds/1.0.0/SubsPlease-win32-ia32.zip), [64-bit](http://brovador.github.io/SubsPlease/builds/1.0.0/SubsPlease-win32-x64.zip)

## Changelog

# 1.0.1
Updated with latest npm packages for electron, babel and subtitler

# 1.0
First release


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
