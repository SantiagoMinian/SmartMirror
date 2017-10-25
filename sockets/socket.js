module.exports = {
    send: function (data, callback) {
        const net = require("net")

        const HOST = "127.0.0.1"
        const PORT = 5000

        const socket = new net.Socket()

        socket.connect(PORT, HOST, function () {
            socket.write(data)
        })

        socket.on("data", (data) => {
            callback(data)
            socket.write("End")
            socket.destroy()
        })
    }
}