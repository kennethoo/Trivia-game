import React,{Component} from "react"
let timer=null

class CountDown extends Component {

    state={
        time:3
    }

    componentDidMount=()=>{
        setTimeout(()=>{
            timer=setInterval(()=>{
      this.setState({
    time:this.state.time-1
            },()=>{
                if(this.state.time===0){
         clearInterval(timer)
                }
            })
            },1000)
        },1000) 
    }

    render=()=>{
       
        return (
            <div className={`wraprtttt ${this.props.displayCount?"active":""}`}>
                <div className="boxx-ett">
                   {this.state.time}
                </div>
            </div>
        )
    }
}

export default CountDown