import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'

const Room = () => {
    const socket =useSocket();

    const hendleUserJoined=useCallback(({email,id})=>{
        console.log(`Email ${email} joined room`);
    })

    useEffect(()=>{
        socket.on("user:Joind",hendleUserJoined);

        return (()=>{
            socket.off("user:Joind",hendleUserJoined);
        })
    },[socket,hendleUserJoined])
  return (
    <div>Room</div>
  )
}

export default Room