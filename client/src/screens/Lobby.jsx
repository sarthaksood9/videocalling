import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {


    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("");

    const socket =useSocket();

    const navigate =useNavigate();
    // console.log(socket);

    const hendleSubmit = useCallback((e) => {
        e.preventDefault();

        socket.emit("room:join",{email,roomId})

    }, [email,roomId,socket])

    const hendleJoinRoom=useCallback((data)=>{
        const {email,roomId}=data;
        navigate(`/room/${roomId}`)
    },[navigate])

    

    useEffect(()=>{
        socket.on("room:join",hendleJoinRoom);
        return(()=>{
            socket.off("room:join",hendleJoinRoom);
        })
    })





    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <form onSubmit={hendleSubmit} className='h-[70vh] w-[40vw] shadow-2xl flex gap-[1.5rem] items-center justify-center flex-col px-[3rem] rounded-2xl'>
                <h1>Join Room</h1>
                
                <div className='w-full flex flex-col justify-start items-start gap-2'>
                    <label className='px-2' htmlFor='email'>Email</label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full h-8 border-[1px] rounded-3xl px-3' type="text" placeholder='Email' id='email' />
                </div>
                <div className='w-full flex flex-col justify-start items-start gap-2'>
                    <label className='px-2' htmlFor='roomID'>Room Id</label>
                    <input value={roomId} onChange={(e) => { setRoomId(e.target.value) }} className='w-full h-8 border-[1px] rounded-3xl px-3' type="text" placeholder='Enter Room ID' id='roomId' />
                </div>

                <div className='w-full'>
                    <button className='w-full py-2 text-white border-[2px] rounded-3xl bg-sky-600'>Join</button>
                </div>
            </form>

        </div>
    )
}

export default Lobby