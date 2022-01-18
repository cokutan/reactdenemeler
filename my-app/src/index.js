import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square (props) {
	
    return (
      
<button 	className="square" 
				onClick={props.onClick}>
        {props.value}
      </button>
    );
 
}

class Board extends React.Component {
	
	
  renderSquare(i) {
    return (
<Square value={this.props.squares[i]}
				   onClick={()=> this.props.onClick(i)}/>);
  }

 createTable() {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(i*3+j));
      }
      //Create the parent and add the children
      table.push(<div className="board-row">{children}</div>)
    }
    return table
  }

  render() {
	
    return (
      

 
<div>
	{this.createTable()}

</div>
    );
  }


}



class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state= { history : [ {	squares: Array(9).fill(null),
									pointx: null,
									pointy: null}],
		xIsNext:true,
		stepNumber : 0,
		};
	}
	
	handleClick(i) {
	const history = this.state.history.slice(0, this.state.stepNumber+1);
	const current = history[this.state.stepNumber];
	const squares = current.squares.slice();
	if(calculateWinner(squares) || squares[i]) {return;}
	squares[i] = this.state.xIsNext?  "X" : "O";
	
	this.setState({	history: history.concat( [{squares : squares, pointx :  i%3 +1,
					pointy :  Math.floor(i/3) + 1}]), 
					xIsNext : !this.state.xIsNext,
					stepNumber : history.length,
					});
}

   jumpTo(step, desc) {
	this.setState({
		stepNumber : step,
		xIsNext : (step % 2 === 0),
	});
	
};

  render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	const active = { fontWeight : 'bold'};
	const inactive = {fontWeight : 'normal'};
	const moves = history.map((step, move)=> {
		const desc = move ? "Go to move #"+ move + " (" + step.pointx + "," +step.pointy + ")": "Go to game start";
		return (
			
<li key={move}>
	<a href='#' style = {this.state.stepNumber===move ? active: inactive}  onClick={()=>this.jumpTo(move,desc)}>{desc}</a>
</li>
		) ;
	});
	let status;
	if(winner) {
		status = "Winner is " + winner;
	} else {
        status= "Next player: " + (this.state.xIsNext ? "X" : "0");}

    return (
      
<div className="game">
	<div className="game-board">
		<Board squares={current.squares}
				  onClick={(i)=>this.handleClick(i)}/>
	</div>
	<div className="game-info">
		<div>{status}</div>
		<ol>{moves}</ol>
	</div>
</div>
    );
  }
}

// ========================================

ReactDOM.render(
  
<Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};