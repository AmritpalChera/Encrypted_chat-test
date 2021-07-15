import React, { useState } from 'react';
import Lottie from 'react-lottie';
import sqaureAnimations from '../../animations/squares.json'
import {useSelector} from 'react-redux'
import './process.scss'


const Process = () => {
    const [play, setPlay] = useState(false)

    const state = useSelector((state) => state.ProcessReducer);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: sqaureAnimations,
        rendererSettings: {
            perserveAspectRatio: "xMidYMid slice"
        }
    }
    return (
        <div className="process">
            {/* <h5>
                Secret Key: <span>{state.encrypt}</span>
            </h5> */}
            <div className="incomming">
                <h4>Incomming Data</h4>
                <p>{state.cypher}</p>
            </div>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                isStopped={play}
            />
            <div className="crypt">
                <h4>Decypted Data</h4>
                <p>{state.text}</p>
            </div>
            
        </div>
    )
}

export default Process
