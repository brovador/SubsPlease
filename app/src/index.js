const {app, BrowserWindow} = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 400,
    minWidth : 500,
    minHeight : 400,
    center: true,
    title: 'Subs, please',
    titleBarStyle: 'hidden',
    backgroundColor: '#EEE',
  })
  
  win.loadURL('file://' + __dirname + '/index.html');
  win.on('closed', function() {
    win = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
