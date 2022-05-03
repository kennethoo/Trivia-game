
import React,{Component} from "react"
import ConnectCom from "../component/connect"
import {withRouter }from "react-router-dom"
import { connect } from "react-redux"
class  Home extends Component {
constructor(props){
super(props)
this.state={
}
}
  render(){
  return (
    <div className={`homne-page `}>
<div id="containerrr">
<ConnectCom/>
	</div>
    </div>
  );
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
          users:state.user,
      }
      }
export default connect(mapstateToProps,mapDispatchToProps) (withRouter(Home))
