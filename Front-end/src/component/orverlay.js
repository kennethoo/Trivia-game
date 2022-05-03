import React,{Component} from "react"
import {Link} from "react-router-dom"

class Overlay extends Component {
    state={

    }
    render(){
        return (
            <div id="host-lft-overlay">
            <div id="closse-overlay">
            <i class="fas fa-times">
 
            </i></div><div id="host-left">
            <p id="tt1">Game Over !!</p>
            <p id="tt2">The host left the game, You can Create a new game</p>
            <button id="back-game">Create a Game</button>
            </div>
            </div>

        )
    }
}
    export default Overlay