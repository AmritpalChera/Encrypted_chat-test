import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DoDecrypt, DoEncrypt } from '../../aes';
import process from '../../redux/action/index';
import "./chat.scss";
import axios from '../../axios'

let localKey = ""
const Chat = (props) => {
    const { username, roomname, socket } = props;
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([])
    const [key, setKey] = useState('')

    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt,msg,cipher))
    }

    // const getRoomKey = () => {
    //     axios.post('/api/getRoomKey', { roomName: roomname })
    //     .then(res => {
    //         console.log("Data>>", res.data)
    //         localKey = res.data.key
    //         setKey(res.data.key)
    //     })
    //     .catch(err => {
    //       console.log(err.response)
    //     })
    //   }
    
    // useEffect(() => {
    //     getRoomKey()
    //   }, [])
    
    const insertMessage = () =>{
        socket.on('message', (data) => {
            console.log("Key in socket: ", key)
            const ans = DoDecrypt(data.text, data.username, key);
            dispatchProcess(key, ans, data.text);
            // console.log(ans)
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            })
            setMessages([...temp])
        })
    }
    
    useEffect(() => {
        console.log("KEY>>", key)
        socket.on('message', (data) => {
            console.log("Key in socket: ", key)
            const ans = DoDecrypt(data.text, data.username, key);
            dispatchProcess(key, ans, data.text);
            // console.log(ans)
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            })
            setMessages([...temp])
        })
        
    }, [key]);

    const sendData = () => {
        // console.log(text)
        if (!text) return

        const ans = DoEncrypt(text, key)
        console.log('to send>>', ans)
        socket.emit('chat', ans)
        setText('');
    }


    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(scrollToBottom, [messages])

    // console.log('MESSAGES>>', messages)


    return (
        <div className='chat'>
            <div className="user-name">
                <h2>
                {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
                </h2>
            </div>
            <div className="chat-message">
                {messages.map((i, index) => {
                if (i.username === username) {
                    return (
                    <div className="message" key={index}>
                        <p>{i.text}</p>
                        <span>{i.username}</span>
                    </div>
                    );
                } else {
                    return (
                    <div className="message mess-right" key={index}>
                        <p>{i.text} </p>
                        <span>{i.username}</span>
                    </div>
                    );
                }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="send">
                <input
                placeholder="enter your message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    sendData();
                    }
                }}
                ></input>
                <button onClick={sendData}>Send</button>
            </div>
            
        </div>
    )
}

export default Chat

