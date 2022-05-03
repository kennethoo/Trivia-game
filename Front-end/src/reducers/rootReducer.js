const  initState={
username:"",
  connected:false,
  roomId:null,
  score:0,
}
const rootReducer =(state = initState,action)=>{
 
    if(action.type==="JOIN") {
        return{
            ...state, 
            connected:action.data.connected,
            roomId:action.data.room,
            username:action.data.username,
        }
    }
   
 return state
}

export default rootReducer
