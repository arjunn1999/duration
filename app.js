const { app,BrowserWindow,ipcMain } = require("electron");
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
var mainWindow;
function createwindow(height,width) {
     mainWindow = new BrowserWindow({
        webPreferences:{
            contextIsolation:false,
            nodeIntegration:true
        }
    });
    mainWindow.loadFile(path.join(__dirname,'index.html'));
}

app.on('ready',() => {
    createwindow();
});
ipcMain.on('video:submit',(event,path)=>{
    ffmpeg.ffprobe(path,(err,metadata) => {
        mainWindow.webContents.send('video:duration',`The duration of the video is ${metadata.format.duration} s`);
    });
})

app.on("quit",()=>{
    app.quit();
    
})