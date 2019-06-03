import React, {Component} from 'react';
import { Snake, Food } from '../../Components';
import { getRandomCoordinates }  from '../../libs/utils';
import { checkIfOutOfBorders, checkIfCollapsed, checkHighScore } from './Utils/GameRules';
import { checkIfEat } from './Utils/Food';
import { moveSnake, onKeyDown } from './Utils/Snake';

const initialState = {
  level: 'Noob',
  direction: 'Right',
  speed: 200,
  score: 0,
  arcadeHighestScore: localStorage.arcadeHighestScore || 0,
  classicHighestScore: localStorage.classicHighestScore || 0, 
  food: getRandomCoordinates(),
  bonusFood: [-2, -2],
  snakeBlocks: [
    [0,0],
    [2,0],
    [4,0],
    [6,0],
    [8,0],
    [10,0]
  ],
  gameOver: false,
  classic: false,
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
      const { mode } = this.props.match.params;
      if (mode === 'classic') {
          this.setState({
              classic: true,
          })
      }
  }

  componentDidMount() {
    this.interval = setInterval(() => moveSnake(this), this.state.speed);
    window.onkeydown = event => onKeyDown(event, this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    const { score } = this.state;
    checkIfOutOfBorders(this);
    checkIfCollapsed(this);
    checkIfEat(this);
    checkHighScore(this);
    if (score%2 === 0) {
      clearInterval(this.interval);
      this.interval = setInterval(() => moveSnake(this), this.state.speed);
    }
  }

  onGameOver() {
    const { classicHighestScore, arcadeHighestScore, classic } = this.state;
    if (classic) {
      localStorage.setItem('classicHighestScore', classicHighestScore);
      initialState.classicHighestScore = classicHighestScore;
    } else {
      localStorage.setItem('arcadeHighestScore', arcadeHighestScore);
      initialState.arcadeHighestScore = arcadeHighestScore;
    }
    this.setState(initialState);
  }

  renderGameOver = () => {
    if (!this.state.gameOver) {
      return null;
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column',color: 'white', position: 'relative', marginTop: '30%'}}>
        <h1 style={{ display: 'flex', justifyContent: 'space-around', color: '#53f6c7', fontSize: '3rem'}}>Game Over</h1>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <button className="ModeButton" onClick={() => {
              this.setState({classic: false});
              this.onGameOver();
            }}
          >
            Arcade
          </button>
          <button className="ModeButton" onClick={() => {
              this.onGameOver();
              this.setState({classic: true});
            }}
          >
            Classic
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { snakeBlocks, food, bonusFood, score, classicHighestScore, arcadeHighestScore, level, gameOver, classic } = this.state;
    
    return (
      <>
        <div className="game-area">
          {!gameOver
            ? (
              <>
                <Snake snakeBlocks={snakeBlocks} />
                <Food dot={food} color="red" />
                {(score%10===0 && score>2) ? <Food color="yellow" dot={bonusFood} /> : null}
              </>
            )
            : this.renderGameOver()
            }
        </div>
        <div style={{color: '#53f6c7', position: 'relative', margin: '2px auto', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
          <h3>Score: {score}</h3>
          <h3>High Score: {classic ? classicHighestScore : arcadeHighestScore}</h3>
          <h3>Level: {level}</h3>
        </div>
      </>
    );
  }
}

export default App;
