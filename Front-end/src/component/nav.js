// import logo from "../logo/logo.png"
// import { BiLockAlt,BiDollar } from "react-icons/bi";
// import { BsFillPeopleFill,BsInfoSquare,BsSun} from "react-icons/bs";
import React,{Component} from "react"
// import { AiFillHome,AiOutlineContacts } from "react-icons/ai";
// import { VscChromeClose } from "react-icons/vsc";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FaRegMoon ,FaMoon} from "react-icons/fa";
// import { RiTodoLine ,RiTeamLine} from "react-icons/ri";
// import { FiInstagram,FiTwitter,FiFacebook } from "react-icons/fi";
// import { IoIosNotifications } from "react-icons/io";

class Nav extends Component{
    state={
        
    }
    openNav=(data)=>{
        this.setState({
          nav:data
        })
        this.props.openNav(data)
      }

      switchToggle=()=>{
        this.setState({
          mode:!this.state.mode
        })
        localStorage.setItem('mode', !this.state.mode);
        this.props.switchToggle()
      }

      componentDidMount=()=>{
        const mode = localStorage.getItem('mode') === 'true';
      this.setState({mode:mode});
      }
render(){
    return(
        <div className="wrapeeriror">
<header id="head" className="move">
           <div className="titk">
                   CS Trivia
                </div>
	</header>
        </div>

    )
}
}

export default Nav