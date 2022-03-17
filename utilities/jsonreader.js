const fs = require('fs')
const path = 'data.json'

function readdata() {
    const data = fs.readFileSync(path)
    return JSON.parse(data)
}

function writedata(data) {
    data = JSON.stringify(data)
    fs.writeFileSync(path, data)
}

module.exports = {readdata, writedata}