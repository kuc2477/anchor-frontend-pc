const electron = require('electron')
const menubar = require('menubar')

const ipcMain = electron.ipcMain
const ipcRenderer = electron.ipcRenderer
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const app = electron.app
const mb = menubar()


// run electron-debug if it's in dev environment
if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}


// =======
// Menubar
// =======

mb.on('after-create-window', () => {
  mb.showWindow()
})


// ====
// Main
// ====

// shutdown application when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1072, height: 600, resizable: false
  })

  // open browser and load index page
  mainWindow.loadURL(
    process.env.HOT ?
      `file://${__dirname}/app/app.dev.html` :
      `file://${__dirname}/app/app.html`
  )

  // remove reference to main window after close
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // open devtools if it's in dev environment
  if (process.env.NODE_ENV === 'development' || true) {
    mainWindow.openDevTools()
  }

  // set menu on window
  const template = []
  const menu = Menu.buildFromTemplate(template)
  mainWindow.setMenu(template.length ? menu : null)
})
