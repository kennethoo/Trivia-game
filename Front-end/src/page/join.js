import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import Chat  from "../component/chat"
import question  from "../question"
import {connect} from "react-redux"
import { BsFillChatFill } from "react-icons/bs";
import CountDown  from "../component/coutDown"
import socket from "../socketconf";
import Leaderboard from "../component/leaderboard"
let time=null
let realTimeLeaderboardState={}
class Join extends Component {
    state={
        currentUser:0,
        message:true,
        game:false,
        start:false,
        leaderboard:false,
        awnser:"5",
        currentCount:0,
        correctAwnser:"5",
        liveCounter:11,
        check:false,
        currentQuestion:{},
        currentScore:0,
        begin:false,
        displayCount:false,
        leadB:[],
        chat:false
    }
realTime=()=>{
socket.on("beginTheGame",()=>{
this.setState({
    displayCount:true  
})
setTimeout(()=>{
    this.setState({
        game:true
    },()=>{
        document.querySelector("#containerr").scrollTop = document.querySelector("#containerr").scrollHeight
        this.setState({
            displayCount:false
        },()=>{
            this.startTheGame()
            this.setState({
 
            })
        })
    })

},4000)
})
socket.on("update-score",(data)=>{
if(realTimeLeaderboardState[data.name]){
    realTimeLeaderboardState[data.name]= Math.max(realTimeLeaderboardState[data.name],data.score)
}else{
    realTimeLeaderboardState[data.name]=data.score 
}
})
}

 buildCounter=(duration)=> {
        var timer = duration, minutes, seconds;
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
        return "00:00"
        }else{
            return minutes + ":" + seconds
        }
    }
    componentWillUnmount=()=>{
        socket.off("beginTheGame")
        socket.off("update-score")
        socket.emit("leave-room",this.props.roomId)
        this.props.loginAthification({connected:false,room:"",username:""})

    }
    componentDidMount=()=>{
        if(!this.props.connected){
            this.props.history.push("/")
        }else{
            this.setState({
                roomId:this.props.roomId ,
                currentQuestion:question[this.state.currentCount],
            })
            this.realTime()
        }
           
        }
    checkAwnser=()=>{
        this.setState({
            check:true,
            correctAwnser:this.state.currentQuestion.awnser
        })
        if(this.state.awnser!=="5"){
            if(this.state.awnser===this.state.correctAwnser){
                let curentScore= this.state.currentScore
                curentScore+=10
                this.setState({
                  currentScore:curentScore
                })
              } 
        }else{

        }
        socket.emit('new-score',{room:this.props.roomId,name:this.props.username,score:this.state.currentScore})
       
      setTimeout(()=>{
        this.setState({
            liveCounter:11
        },()=>{
  
            this.moveNext()
            if(this.state.currentCount+1!==question.length){
                this.callTheGame()
            }

        })
      },5000)
    }
showLeaderBoard=()=>{
let currentLeaderBoard=[]
for(let key in realTimeLeaderboardState){
    currentLeaderBoard.push({name:key,score:realTimeLeaderboardState[key]})   
}
currentLeaderBoard.sort((a,b)=>b.score-a.score)
this.setState({
    leadB:currentLeaderBoard
},()=>{
    this.displayLeaderboad()
})
}

displayLeaderboad=()=>{
    this.setState({
        leaderboard:true,
    },()=>{
        document.querySelector("#containerr").scrollTop = document.querySelector("#containerr").scrollHeight
    })

}
    moveNext=()=>{
        if(this.state.currentCount+1!==question.length){
            this.setState({
                awnser:"5",
                correctAwnser:"5",
                check:false,
                currentCount:this.state.currentCount+1,
                currentQuestion:question[this.state.currentCount+1]
            })
        }else{
          this.showLeaderBoard()
        }
        
    }
    handleClick=(e)=>{
  this.setState({
    awnser:e.target.id,
    correctAwnser:this.state.currentQuestion.awnser
  })
    }

    callTheGame=()=>{
        time=setInterval(()=>{
            if(this.state.liveCounter===1){
                clearInterval(time)
                this.setState({
                    liveCounter:0
                },()=>{
                    this.checkAwnser()
                })
            }else{
                this.setState({
                    liveCounter:this.state.liveCounter-1
                })
            }
        },1000)
    }

    openChat=(data)=>{
        this.setState({
            chat:data
        })
    }
  startTheGame=()=>{
this.callTheGame()
  }
    render(){
        return (
            <div className="createe-user">
                 <div id="containerr"> 
                 <CountDown displayCount={this.state.displayCount}/>
                  <div id="createe"> 
                  <div id="back-page">
                  <i className="fas fa-chevron-left">
                  </i></div> 
                    </div>
                  {this.state.message? <div id="message">
                    <header id="header">
                     {/* <p id="numer-client">{this.state.currentUser}</p>*/}
                     <p id="user-game-name">CS Trivia</p>
                    </header>
                    <div id="code">
                    <p id="message-game">Wait for the host to start the game</p>
                    <div id="box-room">
                    <p id="h3">Room Id</p><p id="room-id">{this.state.roomId}</p>
                    </div>
                    </div><div id="ready-box"><p id="text-redy">3</p></div>
                    <div id="overlay"></div>
                    <div id="people-connected">
                    <div className="closes"><p className="fas fa-times"></p></div>
                    <div id="test-descrb-people">Player </div>
                    <div id="title-name-conected"></div>
                    <div id="list"><div className="list-people">
                    <i id="ico" className="far fa-user-circle"></i>
                    <div id="name-connected"> 
                    <p id="name-user-conec">{this.props.username}</p> 
                    <p id="host"></p>
                    </div> 
                    </div></div>
                    </div>
                    </div>:""}
                    {this.state.game?<div id="game">
                    <header id="head">
                    <p id="online-user">{this.props.username}</p>
                    <div id="point">
                    <p id="coin">{this.state.currentScore}</p>
                    </div>
                   
                    </header>
                    <div id="online-game"> 
                    <div id="timeur">
                    <p id="time">{this.buildCounter(this.state.liveCounter)}</p>
                    </div> 
                    <div id="question">
         <div id="imgpp"></div>
        <p id="curentquest">{this.state.currentQuestion.question}</p>
       </div>
       <ul>      
       <div id="wraper">
       <div id="one" className="awnser">   
       <li onClick={this.handleClick} id="1" className={`awnsers ${this.state.awnser==="1"?"selected":"" }   ${this.state.check?this.state.correctAwnser==="1"?"correct":"":""} ${this.state.check?this.state.awnser==="1" && this.state.awnser!==this.state.correctAwnser?"incorect":"":""}`   }>{this.state.currentQuestion.choiceOne}</li>
       </div>
       <div id="two" className="awnser">
       <li onClick={this.handleClick} id="2" className={`awnsers ${this.state.awnser==="2"?"selected":"" }   ${this.state.check?this.state.correctAwnser==="2"?"correct":"" :""} ${this.state.check?this.state.awnser==="2" && this.state.awnser!==this.state.correctAwnser?"incorect":"":""}`   }>{this.state.currentQuestion.choiceTwo}</li>
       </div>
       <div id="three" className="awnser">
       <li onClick={this.handleClick} id="3"  className={`awnsers ${this.state.awnser==="3"?"selected":"" }   ${this.state.check?this.state.correctAwnser==="3"?"correct":"":"" }  ${this.state.check?this.state.awnser==="3" && this.state.awnser!==this.state.correctAwnser?"incorect":"":""} `   }>{this.state.currentQuestion.choiceThree}</li>
       </div>
       <div id="four" className="awnser">
       <li onClick={this.handleClick} id="4" className={`awnsers ${this.state.awnser==="4"?"selected":"" }   ${this.state.check?this.state.correctAwnser==="4"?"correct":"":"" }     ${this.state.check?this.state.awnser==="4" && this.state.awnser!==this.state.correctAwnser?"incorect":"":""}`    }>{this.state.currentQuestion.choicefour}</li>
       </div>
       </div>
       </ul>
       <div id="questionleft">
       <p id="current-bar">{this.state.currentCount+1}/{question.length}</p><div style={{width: `${(this.state.currentCount+1)*100/question.length}%`}} id="bar">  
       </div>
       </div>
       </div>
       </div>:""}
      {this.state.leaderboard? <Leaderboard leadBoard={this.state.leadB}/>:""}
      <div className="ktnlet">
                   <button onClick={()=>{this.openChat(!this.props.open)}} className="close-chat"> <BsFillChatFill/></button>
                   </div>
		</div>
        <Chat openChat={this.openChat} open={this.state.chat}/>
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
            roomId:state.roomId,
            username:state.username
        }
        }
        
export default connect(mapstateToProps,mapDispatchToProps) (withRouter(Join))