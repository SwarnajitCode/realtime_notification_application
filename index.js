const express = require('express');
const { sequelize } = require('./models');
const { WebSocketServer, WebSocket } = require('ws');
const url = require('url');
const router = require('./routers/router');
const { findFollowersId, addMessage } = require('./services/user.service');
const { getUserToken } = require('./services/user_token.service');
const { verify } = require('jsonwebtoken');

const app = express();
const port = 3000
app.use(express.json());
app.use('/', router);


const server = app.listen(port, async () => {
    console.log('server is running on port', port);
    await sequelize.sync()
    console.log('db connected');
})

const wss = new WebSocketServer({ server });
wss.on("connection", async (ws, req) => {

    const parameters = url.parse(req.url, true);
    const clientId = parameters.query.id;
    const token = parameters.query.token;
    // Validating token
    verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            ws.close(1008, 'Unauthorized');
            return;
        }
        const check = await getUserToken(decoded.userId, token);
        if (check == null) {
            ws.close(1008, 'Unauthorized');
            return;
        }
        ws.id = decoded.userId;
        ws.on('message', async (data, isBinary) => {
            const check = await getUserToken(decoded.userId, token);
            if (check == null) {
                ws.close(1008, 'Unauthorized');
                return;
            }
            const arr = await findFollowersId(ws.id)
            //storing the message concurrently
            addMessage(ws.id, data.toString());
            wss.clients.forEach(async (client, id) => {
                if (arr.includes(client.id) && client.readyState === WebSocket.OPEN) {
                    client.send(data, { binary: isBinary });
                }
            });
        })
    });
})