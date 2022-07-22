import socketIOClient from "socket.io-client";
import { URL_API } from "Context/types";
const ENDPOINT = URL_API;
const socket = socketIOClient(ENDPOINT);
export default socket;
