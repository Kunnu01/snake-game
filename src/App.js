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
  snakeDots: [
    [0,0],
    [2,0],
  ],
  gameOver: false,
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

    if (score > 6) {
      this.setState({level: 'Veteran'})
    } else if (score > 6) {
      this.setState({level: 'Expert'})
    } else if (score > 4) {
      this.setState({level: 'Amateur'})
    } else if (score > 2) {
      this.setState({level: 'Beginner'})
    }
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

  checkIfEat() {
    const { snakeDots, food } = this.state;
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
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
      speed: (speed>10 && score%2===0) ? speed-20 : speed,
      score: score+1,
    });
    this.checkLevel();
  }
  
  checkIfCollapsed() {
    const { snakeDots } = this.state;
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfOutOfBorders() {
    const { snakeDots, gameOver } = this.state;
    let head = snakeDots[snakeDots.length-1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      if (!gameOver) {
          this.setState({
          gameOver: true,
        })
      }
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
      <>
        <h1>Game Over</h1>
        <button onClick={() => this.onGameOver()}>
          New Game
        </button>
      </>
    )
  }
  
  render() {
    const { snakeDots, food, score, highScore, level, gameOver } = this.state;
    return (
      <>
        <h4>Score: {score}</h4>
        <h4>High Score: {highScore}</h4>
        <h4>Level: {level}</h4>
        {!gameOver
          ? (
            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
          )
          : this.renderGameOver()
        }
      </>
    );
  }
}

export default App;
