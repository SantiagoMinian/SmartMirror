const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const socket = require("./sockets/socket.js")
const shortcuts = require("electron-localshortcut")

let win

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, backgroundColor: "#000000", frame: false })

    shortcuts.register(win, "Return", () => {
        socket.send("Lorem Ipsum", (data) => {
            console.log("DATA: " + data)
        })
    })

    win.setFullScreen(true)

    win.loadURL(url.format({
        pathname: path.join(__dirname, "public/html/index.html"),
        protocol: "file:",
        slashes: true
    }))

    win.webContents.openDevTools()

    win.on("closed", () => {
        win = null
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    app.quit()
})

app.on("activate", () => {
    if (win === null) {
        createWindow()
    }
})
