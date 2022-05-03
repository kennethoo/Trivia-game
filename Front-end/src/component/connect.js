import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import socket from "../socketconf";
class ConnectCom extends Component{
    state={
        click:false,
username:"",
usernameOneState:false,
usernameTwo:"",
usernameTwoState:false,
roomId:"",
roomIdState:false,
messageRoom:""
    }

    createARoom=()=>{
        if(this.state.username.length>2){
            this.setState({
                usernameOneState:false 
            })
            this.beginConnection()
        }else{
            this.setState({
                usernameOneState:true 
            })
        }
    }
    beginConnection=()=>{
        let username=this.state.username
        socket.auth = {username};
        socket.connect()
        this.reatimeConetion()
        socket.emit("create-game",this.state.username)
    }
joinGame=()=>{
if(this.state.username.length>2){
    this.setState({
        usernameTwoState:false 
    })
}else{
    this.setState({
        usernameTwoState:true 
    }) 
}

if(this.state.roomId.length>0){
    this.setState({
        roomIdState:false ,
        messageRoom:""
    })
}else{
    this.setState({
        roomIdState:true ,
        messageRoom:"Room is empty"
    })
}

if(this.state.username.length>2&& this.state.roomId.length>0){
    this.joinRoom()
}
}
joinRoom=()=>{
    if(this.state.click===false){
        let username=this.state.username
        socket.auth = {username};
        socket.connect()
        this.reatimeConetion()
        this.setState({
            click:true
        })
    }
    socket.emit("join-game",this.state.roomId)
}


    reatimeConetion=()=>{
        socket.on("connected-succed-join",((room)=>{
            this.props.loginAthification({ connected:true,room:room,username:this.state.username})
            this.props.history.push("/joingame")
        }))
        socket.on("connected-succed",((room)=>{
            this.props.loginAthification({connected:true,room:room,username:this.state.username})
            this.props.history.push("/creategame")
        }))
        socket.on("join-connect-error",()=>{
            this.setState({
                roomIdState:true,
                messageRoom:"Room does not exist"
            })
        })
    }
    handleChange=(e)=>{
if(e.target.name==="usernameOne"){
this.setState({
    username:e.target.value.trim()
})
}
if(e.target.name==="roomId"){
    this.setState({
        roomId:e.target.value.trim()
    })
    }
    }
 
    componentDidMount=()=>{
        socket.off("connected-succed")
    }
    render(){
        return(
            <div className="box-prsent-game">
                <div className="titk">
                 CS Trivia
                </div>
                <div className="create-game">
                <div className="edit-box-profile">
			   <label htmlFor="username">Username</label>
	<input  onChange={this.handleChange}  className="username-profile"  type="text" name="usernameOne" placeholder="John Doe"  />
			  </div>
              {this.state.usernameOneState?<div  className="message-password">Username minimum length is 3</div>:""}
             
                   <button className="butttin-action" onClick={this.createARoom}>Create</button>
                </div>
                <div className="hold--tr">
                    <div className="bar"></div>
                    <p>Or</p>
                    <div className="bar"></div>
                </div>
                <div className="join-a-party">
                <div className="edit-box-profile">
			   <label htmlFor="username">Username</label>
	<input  onChange={this.handleChange}  className="username-profile"  type="text" name="usernameOne" placeholder="John Doe"  />
			  </div>
              {this.state.usernameTwoState?<div  className="message-password">Username minimum length is 3</div>:""}
                <div className="edit-box-profile">
			   <label htmlFor="username">Join a party</label>
	<input  onChange={this.handleChange}  className="username-profile"  type="text" name="roomId" placeholder="#code.."  />
			  </div>
              {this.state.roomIdState?<div  className="message-password">{this.state.messageRoom}</div>:""}
                </div>
                <button onClick={this.joinGame} className="butttin-action" >JOin</button>
            </div>
        )
    }
}   

const mapDispatchToProps=(dispatch)=>{
    return{
      loginAthification:(data)=>{
        dispatch({ type:"JOIN", data:data})
      },
      
    }
      }
      const mapstateToProps=(state)=>{
        return{
            connected:state.connected
        }
        }
        
export default connect(mapstateToProps,mapDispatchToProps) (withRouter(ConnectCom))