const { app, BrowserWindow } = require('electron');

let win;
let imageFolder = __dirname + '/assets/images';

function createWindow() {
    win = new BrowserWindow({
        width:350,
        height:500,
        minWidth:350,
        minHeight:500,
        backgroundColor:'#555555'
    });

    win.setMenu(null);
    win.loadURL(`file://${__dirname}/dist/index.html`);
    win.on( 'closed', function() { win = null } );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', function () {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});