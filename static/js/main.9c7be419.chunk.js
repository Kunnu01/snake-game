(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports={Snake_dot:"Snake_Snake_dot__30Fav"}},18:function(e,t,a){e.exports={Snake_food:"Food_Snake_food__2i1Lt",rotate:"Food_rotate__3lwpo",rotation:"Food_rotation__1J3y1"}},22:function(e,t,a){e.exports=a(36)},27:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(16),s=a.n(c),r=(a(27),a(5)),i=a(6),l=a(8),h=a(7),u=a(9),d=a(21),m=a(3),f=a(4),v=a(17),k=a.n(v),p=function(e){var t=e.snakeBlocks;return o.a.createElement("div",null,t.map(function(e,t){var a={left:"".concat(e[0],"%"),top:"".concat(e[1],"%")};return o.a.createElement("div",{className:k.a.Snake_dot,key:t,style:a})}))},S=a(18),g=a.n(S),y=function(e){var t={background:"".concat(e.color),left:"".concat(e.dot[0],"%"),top:"".concat(e.dot[1],"%")};return o.a.createElement("div",{className:g.a.Snake_food,style:t})},b=function(){return[2*Math.floor((98*Math.random()+1)/2),2*Math.floor((98*Math.random()+1)/2)]},E={level:"Noob",direction:"Right",speed:200,score:0,highScore:localStorage.highestScore||0,food:b(),bonusFood:[-2,-2],snakeBlocks:[[0,0],[2,0],[4,0],[6,0],[8,0],[10,0]],gameOver:!1,classic:!1},O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(h.a)(t).call(this,e))).onKeyDown=function(e){e=e||window.event;var t=a.state.direction;switch(e.keyCode){case 38:"Down"!==t&&a.setState({direction:"Up"});break;case 40:"Up"!==t&&a.setState({direction:"Down"});break;case 37:"Right"!==t&&a.setState({direction:"Left"});break;case 39:"Left"!==t&&a.setState({direction:"Right"})}},a.checkLevel=function(){var e=a.state.score;e>=20?a.setState({level:"Veteran"}):e>=15?a.setState({level:"Expert"}):e>=10?a.setState({level:"Amateur"}):e>=5&&a.setState({level:"Beginner"})},a.moveSnake=function(){var e=a.state,t=e.snakeBlocks,n=e.direction,o=Object(f.a)(t),c=o[o.length-1];switch(n){case"Right":c=[c[0]+2,c[1]];break;case"Left":c=[c[0]-2,c[1]];break;case"Down":c=[c[0],c[1]+2];break;case"Up":c=[c[0],c[1]-2]}o.push(c),o.shift(),a.setState({snakeBlocks:o})},a.generateFood=function(){var e=a.state.snakeBlocks,t=Object(f.a)(e),n=b();return t.forEach(function(e){n[0]===e[0]&&n[1]===e[1]&&(n=b())}),n},a.checkHighScore=function(){var e=a.state,t=e.score;t>e.highScore&&a.setState({highScore:t})},a.renderGameOver=function(){return a.state.gameOver?o.a.createElement("div",{style:{display:"flex",flexDirection:"column",color:"white",position:"relative",marginTop:"30%"}},o.a.createElement("h1",{style:{display:"flex",justifyContent:"space-around",color:"#53f6c7",fontSize:"3rem"}},"Game Over"),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},o.a.createElement("button",{className:"ModeButton",onClick:function(){a.onGameOver(),a.setState({classic:!1})}},"Arcade"),o.a.createElement("button",{className:"ModeButton",onClick:function(){a.onGameOver(),a.setState({classic:!0})}},"Classic"))):null},a.state=E,a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){"classic"===this.props.match.params.mode&&this.setState({classic:!0})}},{key:"componentDidMount",value:function(){localStorage.removeItem("highestScore"),this.interval=setInterval(this.moveSnake,this.state.speed),document.onkeydown=this.onKeyDown}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"componentDidUpdate",value:function(){var e=this.state.score;this.checkIfOutOfBorders(),this.checkIfCollapsed(),this.checkIfEat(),this.checkHighScore(),e%2===0&&(clearInterval(this.interval),this.interval=setInterval(this.moveSnake,this.state.speed))}},{key:"shortenSnake",value:function(){for(var e=this.state.snakeBlocks,t=0;t<=2;t++)e.shift();this.setState({snakeBlocks:e})}},{key:"checkIfEat",value:function(){var e=this.state,t=e.snakeBlocks,a=e.food,n=e.bonusFood,o=e.score,c=t[t.length-1];c[0]===n[0]&&c[1]===n[1]&&(this.setState({bonusFood:[-2,-2],score:o+3}),this.shortenSnake()),c[0]===a[0]&&c[1]===a[1]&&(this.setState({food:this.generateFood()}),this.enlargeSnake())}},{key:"enlargeSnake",value:function(){var e=this,t=this.state,a=t.snakeBlocks,n=t.score,o=t.speed,c=Object(f.a)(a);c.unshift([]),this.setState({snakeBlocks:Object(f.a)(c),speed:o>30&&n%2===0?o-10:o,score:n+1,bonusFood:n+1>2&&(n+1)%10===0?this.generateFood():[-2,-2]},function(){return e.checkLevel()})}},{key:"checkIfCollapsed",value:function(){var e=this,t=this.state,a=t.snakeBlocks,n=t.gameOver,o=Object(f.a)(a),c=o[o.length-1];o.pop(),o.forEach(function(t){c[0]===t[0]&&c[1]===t[1]&&(n||e.setState({gameOver:!0}))})}},{key:"checkIfOutOfBorders",value:function(){var e=this.state,t=e.snakeBlocks,a=e.direction,n=e.classic,o=e.gameOver,c=Object(f.a)(t),s=c[c.length-1];if(s[0]>=100||s[1]>=100||s[0]<0||s[1]<0){if(!n)return void(o||this.setState({gameOver:!0}));"Right"===a?s=[s[0]-100,s[1]]:"Left"===a?s=[s[0]+100,s[1]]:"Down"===a?s=[s[0],s[1]-100]:"Up"===a&&(s=[s[0],s[1]+100]),c.push(s),c.shift(),this.setState({snakeBlocks:c})}}},{key:"onGameOver",value:function(){var e=this.state.highScore;localStorage.setItem("highestScore",e),E.highScore=e,this.setState(E)}},{key:"render",value:function(){var e=this.state,t=e.snakeBlocks,a=e.food,n=e.bonusFood,c=e.score,s=e.highScore,r=e.level,i=e.gameOver;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"game-area"},i?this.renderGameOver():o.a.createElement(o.a.Fragment,null,o.a.createElement(p,{snakeBlocks:t}),o.a.createElement(y,{dot:a,color:"red"}),c%10===0&&c>2?o.a.createElement(y,{color:"yellow",dot:n}):null)),o.a.createElement("div",{style:{color:"#53f6c7",position:"relative",margin:"2px auto",width:"500px",display:"flex",justifyContent:"space-between"}},o.a.createElement("h3",null,"Score: ",c),o.a.createElement("h3",null,"High Score: ",s),o.a.createElement("h3",null,"Level: ",r)))}}]),t}(n.Component),w=function(e){return o.a.createElement("div",{className:"game-area"},o.a.createElement("div",{style:{display:"flex",flexDirection:"column",color:"white",position:"relative",marginTop:"30%"}},o.a.createElement("h1",{style:{display:"flex",justifyContent:"space-around",color:"#53f6c7",fontSize:"3rem"}},"Play Game"),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},o.a.createElement("button",{className:"ModeButton",onClick:function(){e.history.push("/play/arcade")}},"Arcade"),o.a.createElement("button",{className:"ModeButton",onClick:function(){e.history.push("/play/classic")}},"Classic"))))},B=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(d.a,null,o.a.createElement(m.c,null,o.a.createElement(m.a,{path:"/play/:mode",component:O}),o.a.createElement(m.a,{path:"/",component:w}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.9c7be419.chunk.js.map