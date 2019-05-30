import React from 'react';

const Mainpage = (props) => {

    const handleArcadeMode = () => {
        props.history.push('snake-game/play/arcade');
    }

    const handleClassicMode = () => {
        props.history.push('snake-game/play/classic');
    }
    
    return (
        <div className="game-area">
            <div style={{display: 'flex', flexDirection: 'column',color: 'white', position: 'relative', marginTop: '30%'}}>
                <h1 style={{ display: 'flex', justifyContent: 'space-around', color: '#53f6c7', fontSize: '3rem'}}>
                    Play Game
                </h1>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <button className="ModeButton" onClick={handleArcadeMode}>
                        Arcade
                    </button>
                    <button className="ModeButton" onClick={handleClassicMode}>
                        Classic
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Mainpage;