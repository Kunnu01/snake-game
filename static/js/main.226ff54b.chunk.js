(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(18)},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(3),c=a.n(r),s=(a(17),a(1)),i=a(4),l=a(5),h=a(9),u=a(6),v=a(10),k=a(7),d=a.n(k),m=function(e){var t=e.snakeDots;return o.a.createElement("div",null,t.map(function(e,t){var a={left:"".concat(e[0],"%"),top:"".concat(e[1],"%")};return o.a.createElement("div",{className:d.a.Snake_dot,key:t,style:a})}))},f=a(8),S=a.n(f),g=function(e){var t={left:"".concat(e.dot[0],"%"),top:"".concat(e.dot[1],"%")};return o.a.createElement("div",{className:S.a.Snake_food,style:t})},p=function(){return[2*Math.floor((98*Math.random()+1)/2),2*Math.floor((98*Math.random()+1)/2)]},O={level:"Noob",direction:"Right",speed:200,score:0,highScore:localStorage.highestScore||0,food:p(),snakeDots:[[0,0],[2,0]],gameOver:!1},w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(h.a)(this,Object(u.a)(t).call(this,e))).onKeyDown=function(e){e=e||window.event;var t=a.state.direction;switch(e.keyCode){case 38:"Down"!==t&&a.setState({direction:"Up"});break;case 40:"Up"!==t&&a.setState({direction:"Down"});break;case 37:"Right"!==t&&a.setState({direction:"Left"});break;case 39:"Left"!==t&&a.setState({direction:"Right"})}},a.checkLevel=function(){var e=a.state.score;e>6?a.setState({level:"Veteran"}):e>6?a.setState({level:"Expert"}):e>4?a.setState({level:"Amateur"}):e>2&&a.setState({level:"Beginner"})},a.moveSnake=function(){var e=a.state,t=e.snakeDots,n=e.direction,o=Object(s.a)(t),r=o[o.length-1];switch(n){case"Right":r=[r[0]+2,r[1]];break;case"Left":r=[r[0]-2,r[1]];break;case"Down":r=[r[0],r[1]+2];break;case"Up":r=[r[0],r[1]-2]}o.push(r),o.shift(),a.setState({snakeDots:o})},a.checkHighScore=function(){var e=a.state,t=e.score;t>e.highScore&&a.setState({highScore:t})},a.renderGameOver=function(){return a.state.gameOver?o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Game Over"),o.a.createElement("button",{onClick:function(){return a.onGameOver()}},"New Game")):null},a.state=O,a}return Object(v.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){localStorage.removeItem("highestScore"),this.interval=setInterval(this.moveSnake,this.state.speed),document.onkeydown=this.onKeyDown}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"componentDidUpdate",value:function(){var e=this.state.score;this.checkIfOutOfBorders(),this.checkIfCollapsed(),this.checkIfEat(),this.checkHighScore(),e%2===0&&(clearInterval(this.interval),this.interval=setInterval(this.moveSnake,this.state.speed))}},{key:"checkIfEat",value:function(){var e=this.state,t=e.snakeDots,a=e.food,n=t[t.length-1];n[0]===a[0]&&n[1]===a[1]&&(this.setState({food:p()}),this.enlargeSnake())}},{key:"enlargeSnake",value:function(){var e=this.state,t=e.snakeDots,a=e.score,n=e.speed,o=Object(s.a)(t);o.unshift([]),this.setState({snakeDots:Object(s.a)(o),speed:n>10&&a%2===0?n-20:n,score:a+1}),this.checkLevel()}},{key:"checkIfCollapsed",value:function(){var e=this,t=this.state.snakeDots,a=Object(s.a)(t),n=a[a.length-1];a.pop(),a.forEach(function(t){n[0]===t[0]&&n[1]===t[1]&&e.onGameOver()})}},{key:"checkIfOutOfBorders",value:function(){var e=this.state,t=e.snakeDots,a=e.gameOver,n=t[t.length-1];(n[0]>=100||n[1]>=100||n[0]<0||n[1]<0)&&(a||this.setState({gameOver:!0}))}},{key:"onGameOver",value:function(){var e=this.state.highScore;localStorage.setItem("highestScore",e),O.highScore=e,this.setState(O)}},{key:"render",value:function(){var e=this.state,t=e.snakeDots,a=e.food,n=e.score,r=e.highScore,c=e.level,s=e.gameOver;return o.a.createElement(o.a.Fragment,null,o.a.createElement("h4",null,"Score: ",n),o.a.createElement("h4",null,"High Score: ",r),o.a.createElement("h4",null,"Level: ",c),s?this.renderGameOver():o.a.createElement("div",{className:"game-area"},o.a.createElement(m,{snakeDots:t}),o.a.createElement(g,{dot:a})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t,a){e.exports={Snake_dot:"Snake_Snake_dot__30Fav"}},8:function(e,t,a){e.exports={Snake_food:"Food_Snake_food__2i1Lt"}}},[[11,1,2]]]);
//# sourceMappingURL=main.226ff54b.chunk.js.map