import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.43.97:3000/";
const socket = socketIOClient(ENDPOINT);
export default socket; 