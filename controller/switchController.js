exports.switchOn = async (req, res) => {
    const client = req.app.get('mqtt-client')
    client.publish('room/switch', 'ON')
    return res.status(200).json({ switch: 'on' })
}
exports.switchOff = async (req, res) => {
    const client = req.app.get('mqtt-client')
    client.publish('room/switch', 'OFF')
    return res.status(200).json({ switch: 'off' })
}
