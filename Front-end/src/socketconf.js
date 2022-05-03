import {io} from "socket.io-client";
let network="https://triviarel.herokuapp.com/"
const socket = io(network,{transports: ['websocket'], upgrade: false ,autoConnect: false})
export default socket;