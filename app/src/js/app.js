(function(){

  var React = require('react')
    , ReactDOM = require('react-dom')
    , subtitler = require('subtitler')
    , languages = require('./js/languages')
    , preferencesLoader = require('./js/preferences-loader')

  var preferences = preferencesLoader.preferences

  var languagesInfo = languages.info
    , languagesOrder = languages.order
    , selectedLanguage = preferences['selectedLanguage']

  var LanguageSelector = React.createClass({
    getInitialState : function() {
      return { 'selectedLanguage' : selectedLanguage }
    },

    handleClick : function(languageCode, item) {
      preferences['selectedLanguage'] = languageCode
      preferencesLoader.save()
      this.setState({ 'selectedLanguage' : languageCode })
    },

    componentDidUpdate : function(){
      selectedLanguage = this.state.selectedLanguage
    },

    render : function() {
      var self = this
      var languageNodes = this.props.languages.map(function(lang, i){
        var name = languagesInfo[lang].name
          , code = languagesInfo[lang].code
        return (
          <li key={code}>
            <a onClick={self.handleClick.bind(self, lang)}>{name}</a>
          </li>
        )
      })

      return (
        <div>
          <a href="bootstrap-elements.html" data-target="#" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            {this.state.selectedLanguage}&nbsp;&nbsp;
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu languages-menu">
              {languageNodes}
          </ul>
        </div>
      )
    }
  })


  var File = React.createClass({

    getInitialState : function() {
      return { status : 'downloading' }
    },

    componentDidMount : function() {
      this.downloadSubtitle()
    },

    handleClick : function() {
      if (this.state.status !== 'error') return
      console.log('download subtitle')
      this.downloadSubtitle()
    },

    downloadSubtitle : function() {
      var filePath = this.props.path
        , token = null
        , self = this

        this.setState({ status : 'downloading'})

        subtitler.api.login()
        .then(function(_token){
          token = _token
          var languageCode = languagesInfo[selectedLanguage].code
          return subtitler.api.searchForFile(token, languageCode, filePath)
        })
        .then(function(results){
          if (!results || results.length === 0) throw 'No results'
          return subtitler.downloader.download(results, 1, filePath)
        })
        .then(function(){
          self.setState({ status : 'completed' })
          return subtitler.api.logout(token)
        })
        .catch(function(err){
          self.setState({ status : 'error' })
        })
    },

    render : function() {
      var self = this
        , path = this.props.path.split('/')
      path = path[path.length - 1]

      var iconClassName = 'mdi-action-cached mdi-material-orange spin'
      if (this.state.status === 'completed') {
        iconClassName = 'mdi-action-done mdi-material-teal'
      } else if (this.state.status === 'error') {
        iconClassName = 'mdi-action-highlight-remove mdi-material-red'
      }

      return (
        <tr onClick={self.handleClick}>
          <td>{path}</td>
          <td><i className={iconClassName}></i></td>
        </tr>
      )
    }
  })

  var FileList = React.createClass({

    getInitialState : function() {
      return { data : [], dragOver : false }
    },

    handleDragOver : function(event) {
      event.preventDefault()
      this.setState({ dragOver : true })
    },

    handleDragLeave : function(event) {
      event.preventDefault()
      this.setState({ dragOver : false })
    },

    handleDrop : function(event) {
      event.preventDefault()
      var files = event.nativeEvent.dataTransfer.files
        , newData = this.state.data

      for (var i = 0; i < files.length; i++) {
        newData.push(files[i])
      }

      this.setState({ data : newData, dragOver : false })
    },

    componentDidUpdate : function() {
      var objDiv = $('.table-scroll')[0]
      objDiv.scrollTop = objDiv.scrollHeight
    },

    render : function() {
      var dragClass = (this.state.dragOver) ? 'dragOver' : ''
      var className = 'table-scroll ' + dragClass
      var filesNodes = null;

      if (this.state.data.length > 0) {
        filesNodes = this.state.data.map(function(file, i){
          return (
            <File key={i} path={file.path}/>
          )
        })
      } else {
        filesNodes = (
          <tr className="empty text-muted">
            <td colSpan="2">
              <i className="mdi-file-file-download"></i>
              <br></br>
              Drop your files here
            </td>
          </tr>
        )
      }

      return (
        <div className={className}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          >
          <table className="table table-striped table-hover files">
            <thead>
              <tr><th>File</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filesNodes}
            </tbody>
          </table>
        </div>
      )
    }
  })

  ReactDOM.render(
    <FileList/>,
    document.getElementById('container')
  )

  ReactDOM.render(
    <LanguageSelector languages={languagesOrder}/>,
    document.getElementById('languageSelector')
  )

})()

function openLink(link) {
  require("shell").openExternal(link)
}
