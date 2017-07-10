'use strict';
const electron = require('electron');
const {appAl, globalShortcut} = require('electron');
const app = electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});
	win.maximize();

	win.webContents.openDevTools();


	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}


app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+0', () => {
    // Do stuff when Y and either Command/Control is pressed.
    console.log('herro');
    mainWindow.webContents.toggleDevTools();
  })
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
