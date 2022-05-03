import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import { IoCloseSharp ,IoSendSharp} from "react-icons/io5";
import {connect} from "react-redux"
import socket from "../socketconf";
class Chat extends Component {
    state={
chat:[],
message:""
    }

    realTimeMessage=()=>{
socket.on("new-meesage",(data)=>{
    console.log(data)
    let messages= this.state.chat
    messages.push(data)
    this.setState({
        chat:messages
    },()=>{
        document.querySelector("#chat-content").scrollTop = document.querySelector("#chat-content").scrollHeight
    })
})
    }
    addMessage=(e)=>{
this.setState({
    message:e.target.textContent
})
    }
    sendMessage=()=>{
        if(this.state.message.length>0){
        socket.emit("message",{room:this.props.roomId,message:this.state.message,name:this.props.username})
        this.setState({
            message:""
        })
        document.querySelector(".hold-message").innerHTML=""
        }

    }
    componentWillUnmount=()=>{
        socket.off("new-meesage")
    }
    componentDidMount=()=>{
        this.realTimeMessage()
        this.setState({
            message:`${this.props.username} just join`
        },()=>{
            this.sendMessage()
        })

    }
    render(){
        return (
            <div className={`char0-box-class ${this.props.open?"active":""}`}>
            <div id="chat-box">
             <div id="head-chat">
        <button onClick={()=>{this.props.openChat(!this.props.open)}} className="close-chat">
      <IoCloseSharp/>
       </button>
       <p>CHAT ROOM</p>
        </div>
       <div id="chat-content">  
       {this.state.chat?.map((item,index)=>{
           return(
            <div key={index} className="char-room-box">
           {/*<div className="icon"></div>*/}
           <div className="wraprtt">
               <div className="name-people"> {item.name}</div>
               <div className="conversationt"> 
               {item.message}
               </div>
           </div>
       </div>
           )
       })}
     
       </div> 
       <div className="type-message-box">
				<div className="watpr-contnr-mem">
					<div className="wrappe-mmeshe">
					<div contentEditable="true"   suppressContentEditableWarning={true} onKeyUp={this.addMessage} data-placeholder="Type a message..." className="hold-message noped"></div>
                    <div className="send-hold fnjjrjr"><button onClick={this.sendMessage} ><IoSendSharp/></button></div>
				</div>
				</div>
			</div>
            </div>
        
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
            connected:state.connected,
            username:state.username,
            roomId:state.roomId
        }
        }
    export default  connect(mapstateToProps,mapDispatchToProps) (withRouter(Chat))