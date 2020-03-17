const {app, BrowserWindow, Menu, ipcMain } = require('electron');
/*
Para iniciar el programa, unicamente tirar el comando 'npm start'
Descargar las dependencias con 'npm install'
*/
const url = require('url');
const path = require('path');
app.allowRendererProcessReuse = true;
//Esto es simplemente para que vaya refrescando todo automaticamente
//cuando estamos en una etapa de desarrollo
//evitando utilizar asi el comando npm start
if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '/node_modules', '.bin', 'electron')
    });
}


let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/index.html'),
        protocol: 'file',
        slashes: true
        
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', function() {
        app.quit();
    })
})

const templateMenu = [
    {
        label: 'Exit',
        click() {
            app.quit();
        }
    }
];

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Mostar / Ocultar DevTools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
                accelerator: 'F12'
            },
            {
                role: 'reload'
            }
        ]
    })
}