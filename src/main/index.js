const {app, BrowserWindow} = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const getLyrics = require('./get-lyrics');

ipcMain.on('getLyrics', (event, arg) => {
    const {title, artist} = JSON.parse(arg);
    getLyrics(`${title} ${artist}`).then(lyrics => {
        event.sender.send('lyrics', lyrics)
    }).catch(e => console.log(e))
})

if(process.env.ELECTRON_ENV === 'development'){
    app.commandLine.appendSwitch('remote-debugging-port', '9222');
}
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        icon: path.resolve(__dirname, '../../app.icns'),
        // show: false,
        // frame: false,
        // fullscreenable: false,
        // resizable: false,
        // transparent: true,

        webPreferences: {
            webSecurity: false,
            // nodeIntegration: false,
        }});

    if (process.env.ELECTRON_ENV === "development") {
        require('./webpack-server.js');
        mainWindow.loadURL(`http://localhost:8000`,);
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }
});
