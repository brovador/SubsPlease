'use strict';

(function () {

  var React = require('react'),
      ReactDOM = require('react-dom'),
      subtitler = require('subtitler'),
      languages = require('./js/languages'),
      preferencesLoader = require('./js/preferences-loader');

  var preferences = preferencesLoader.preferences;

  var languagesInfo = languages.info,
      languagesOrder = languages.order,
      selectedLanguage = preferences['selectedLanguage'];

  var LanguageSelector = React.createClass({
    displayName: 'LanguageSelector',

    getInitialState: function getInitialState() {
      return { 'selectedLanguage': selectedLanguage };
    },

    handleClick: function handleClick(languageCode, item) {
      preferences['selectedLanguage'] = languageCode;
      preferencesLoader.save();
      this.setState({ 'selectedLanguage': languageCode });
    },

    componentDidUpdate: function componentDidUpdate() {
      selectedLanguage = this.state.selectedLanguage;
    },

    render: function render() {
      var self = this;
      var languageNodes = this.props.languages.map(function (lang, i) {
        var name = languagesInfo[lang].name,
            code = languagesInfo[lang].code;
        return React.createElement(
          'li',
          { key: code },
          React.createElement(
            'a',
            { onClick: self.handleClick.bind(self, lang) },
            name
          )
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { href: 'bootstrap-elements.html', 'data-target': '#', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown' },
          this.state.selectedLanguage,
          '  ',
          React.createElement('span', { className: 'caret' })
        ),
        React.createElement(
          'ul',
          { className: 'dropdown-menu languages-menu' },
          languageNodes
        )
      );
    }
  });

  var File = React.createClass({
    displayName: 'File',

    getInitialState: function getInitialState() {
      return { status: 'downloading' };
    },

    componentDidMount: function componentDidMount() {
      this.downloadSubtitle();
    },

    handleClick: function handleClick() {
      if (this.state.status !== 'error') return;
      console.log('download subtitle');
      this.downloadSubtitle();
    },

    downloadSubtitle: function downloadSubtitle() {
      var filePath = this.props.path,
          token = null,
          self = this;

      this.setState({ status: 'downloading' });

      subtitler.api.login().then(function (_token) {
        token = _token;
        var languageCode = languagesInfo[selectedLanguage].code;
        return subtitler.api.searchForFile(token, languageCode, filePath);
      }).then(function (results) {
        if (!results || results.length === 0) throw 'No results';
        return subtitler.downloader.download(results, 1, filePath);
      }).then(function () {
        self.setState({ status: 'completed' });
        return subtitler.api.logout(token);
      })['catch'](function (err) {
        self.setState({ status: 'error' });
      });
    },

    render: function render() {
      var self = this,
          path = this.props.path.split('/');
      path = path[path.length - 1];

      var iconClassName = 'mdi-action-cached mdi-material-orange spin';
      if (this.state.status === 'completed') {
        iconClassName = 'mdi-action-done mdi-material-teal';
      } else if (this.state.status === 'error') {
        iconClassName = 'mdi-action-highlight-remove mdi-material-red';
      }

      return React.createElement(
        'tr',
        { onClick: self.handleClick },
        React.createElement(
          'td',
          null,
          path
        ),
        React.createElement(
          'td',
          null,
          React.createElement('i', { className: iconClassName })
        )
      );
    }
  });

  var FileList = React.createClass({
    displayName: 'FileList',

    getInitialState: function getInitialState() {
      return { data: [], dragOver: false };
    },

    handleDragOver: function handleDragOver(event) {
      event.preventDefault();
      this.setState({ dragOver: true });
    },

    handleDragLeave: function handleDragLeave(event) {
      event.preventDefault();
      this.setState({ dragOver: false });
    },

    handleDrop: function handleDrop(event) {
      event.preventDefault();
      var files = event.nativeEvent.dataTransfer.files,
          newData = this.state.data;

      for (var i = 0; i < files.length; i++) {
        newData.push(files[i]);
      }

      this.setState({ data: newData, dragOver: false });
    },

    componentDidUpdate: function componentDidUpdate() {
      var objDiv = $('.table-scroll')[0];
      objDiv.scrollTop = objDiv.scrollHeight;
    },

    render: function render() {
      var dragClass = this.state.dragOver ? 'dragOver' : '';
      var className = 'table-scroll ' + dragClass;
      var filesNodes = null;

      if (this.state.data.length > 0) {
        filesNodes = this.state.data.map(function (file, i) {
          return React.createElement(File, { key: i, path: file.path });
        });
      } else {
        filesNodes = React.createElement(
          'tr',
          { className: 'empty text-muted' },
          React.createElement(
            'td',
            { colSpan: '2' },
            React.createElement('i', { className: 'mdi-file-file-download' }),
            React.createElement('br', null),
            'Drop your files here'
          )
        );
      }

      return React.createElement(
        'div',
        { className: className,
          onDragOver: this.handleDragOver,
          onDragLeave: this.handleDragLeave,
          onDrop: this.handleDrop
        },
        React.createElement(
          'table',
          { className: 'table table-striped table-hover files' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                'File'
              ),
              React.createElement(
                'th',
                null,
                'Status'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            filesNodes
          )
        )
      );
    }
  });

  ReactDOM.render(React.createElement(FileList, null), document.getElementById('container'));

  ReactDOM.render(React.createElement(LanguageSelector, { languages: languagesOrder }), document.getElementById('languageSelector'));
})();

function openLink(link) {
  require("shell").openExternal(link);
}
