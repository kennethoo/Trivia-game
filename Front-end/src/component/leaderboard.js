import React,{Component} from "react"
class Leaderboard extends Component {
    state={
leaderboard:[]
    }
    componentDidMount=()=>{
        this.setState({
            leaderboard:this.props.leadBoard
        })
    }
    render(){
        return (
            <div className="createe-userr">
                <div id="leaderboard"> 
       <div id="controle">
       <div id="leave-game">
       <i className="fas fa-chevron-left">

       </i></div><div id="text-leader">learderboard</div>
       </div>
       </div>
       <div className="table-display">

       <div className="wkrkrkr">
       <div className="boxf">Rank</div>
           <div className="boxf">Name</div>
           <div className="boxf">Score</div>
       </div>
           
           <div className="wraperr-detail">

           {this.state.leaderboard.map((data,index)=>{
               return(
                <div key={index} className="edetailrlr">
               <div className="boxf">#{index+1}</div>
           <div className="boxf">{data.name}</div>
           <div className="boxf">{data.score}</div>
               </div>
               )
           })} 
           </div>
       </div>
            </div>
        )
    }
}

export default Leaderboard