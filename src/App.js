/* eslint-disable default-case */
import React, {Component} from 'react';
import { Snake, Food } from './Components';
import { getRandomCoordinates }  from './libs/utils';

const initialState = {
  level: 'Noob',
  direction: 'Right',
  speed: 200,
  score: 0,
  highScore: localStorage.highestScore || 0,
  food: getRandomCoordinates(),
  bonusFood: getRandomCoordinates(),
  snakeDots: [
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

  componentDidMount() {
    localStorage.removeItem('highestScore');
    this.interval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    const { score } = this.state;
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    this.checkHighScore();
    if (score%2 === 0) {
      clearInterval(this.interval);
      this.interval = setInterval(this.moveSnake, this.state.speed);
    }
  }

  onKeyDown = (e) => {
    e = e || window.event;
    const { direction } = this.state;

    switch (e.keyCode) {
      case 38:
        if (direction !== 'Down')
          this.setState({direction: 'Up'});
        break;
      case 40:
        if (direction !== 'Up')
          this.setState({direction: 'Down'});
        break;
      case 37:
        if (direction !== 'Right')
          this.setState({direction: 'Left'});
        break;
      case 39:
        if (direction !== 'Left')
          this.setState({direction: 'Right'});
        break;
    }
  }

  checkLevel = () => {
    const { score } = this.state;

    if (score === 6) {
      this.setState({level: 'Veteran'})
    } else if (score > 6) {
      this.setState({level: 'Expert'})
    } else if (score > 4) {
      this.setState({level: 'Amateur'})
    } else if (score > 2) {
      this.setState({level: 'Beginner'})
    }
  }

  shortenSnake() {
    const { snakeDots } = this.state;

  for (let i = 0; i <= 3; i++) {
      snakeDots.shift();
  }
  this.setState({snakeDots});
  }

  moveSnake = () => {
    const { snakeDots, direction } = this.state;
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch(direction) {
      case 'Right':
        head = [head[0]+2, head[1]];
        break;
      case 'Left':
        head = [head[0]-2, head[1]];
        break;
      case 'Down':
        head = [head[0], head[1]+2];
        break;
      case 'Up':
        head = [head[0], head[1]-2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    })
  }

  generateFood = () => {
    const { snakeDots } = this.state;
    const snake = [...snakeDots];
    let food = getRandomCoordinates();
    snake.forEach(dot => {
      if(food[0] === dot[0] && food[1] === dot[1]) {
        food = getRandomCoordinates();
      }
    });
    return food;
  }

  checkIfEat() {
    const { snakeDots, food, bonusFood, score } = this.state;
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === bonusFood[0] && head[1] === bonusFood[1]) {
      this.setState({
        bonusFood: this.generateFood(),
        score: score+3,
      });
      this.shortenSnake()
    }
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: this.generateFood(),
        bonusFood: this.generateFood(),
      });
      this.enlargeSnake();
    }
  }

  enlargeSnake() {
    const { snakeDots, score, speed } = this.state;
    let enlargedSnake = [...snakeDots];
    enlargedSnake.unshift([]);
    this.setState({
      snakeDots: [...enlargedSnake],
      speed: (speed>20 && score%2===0) ? speed-20 : speed,
      score: score+1,
    });
    this.checkLevel();
  }
  
  checkIfCollapsed() {
    const { snakeDots, gameOver } = this.state;
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        // this.onGameOver();
        if(!gameOver)
        this.setState({
          gameOver: true,
        })
      }
    })
  }

  checkIfOutOfBorders() {
    const { snakeDots, direction, classic, gameOver } = this.state;
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    // let head = snakeDots[snakeDots.length-1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      if (!classic) {
        if (!gameOver) {
          this.setState({
            gameOver: true,
          });
        }
        return;
      }

      if (direction === 'Right') {
        head = [head[0]-100, head[1]];
      } else if (direction === 'Left') {
        head = [head[0]+100, head[1]];
      } else if (direction === 'Down') {
        head = [head[0], head[1]-100];
      } else if (direction === 'Up') {
        head = [head[0], head[1]+100];
      }

      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots,
      })
    }
  }

  checkHighScore = () => {
    const { score, highScore } = this.state;
    if (score > highScore) {
      this.setState({
        highScore: score,
      });
    }
  }

  onGameOver() {
    const { highScore } = this.state;
    localStorage.setItem('highestScore', highScore);
    initialState.highScore = highScore;
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
              this.onGameOver()
              this.setState({classic: false})
            }}
          >
            Arcade
          </button>
          <button className="ModeButton" onClick={() => {
              this.onGameOver()
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
    const { snakeDots, food, bonusFood, score, highScore, level, gameOver } = this.state;
    
    return (
      <>
        <div className="game-area">
          {!gameOver
            ? (
              <>
                <Snake snakeDots={snakeDots} />
                <Food dot={food} color="red" />
                {(score%8===0 && score>1) ? <Food color="yellow" dot={bonusFood} /> : null}
              </>
            )
            : this.renderGameOver()
            }
        </div>
        <div style={{color: '#53f6c7', position: 'relative', margin: '2px auto', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
          <h3>Score: {score}</h3>
          <h3>High Score: {highScore}</h3>
          <h3>Level: {level}</h3>
        </div>
      </>
    );
  }
}

export default App;
