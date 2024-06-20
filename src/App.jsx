import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountdownTimer from './Countdown'

function App() {
  const [time, setTime] = useState(0);
  const [toggleRun, setToggleRun] = useState(true)
  const [toggleRound, setToggleRound] = useState(true)
  let timer = null;
  useEffect(() => {

  }, []);
  const startCountdown = () => {
    setTime(900);
    console.log("start --->", time);
    timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }
  const stopTime = () => {
    console.log("time stop -->", time);
    clearInterval(timer);
  }
  return (
    <>
      {/* 
      <section className='grid grid-cols-1 gap-1 md:grid-cols-3'>
        <div className='col-span-2 px-4 py-4 '>
          <div className='grid bg-yellow-200'>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max bg-blue-200">
              <div className="flex flex-col">
                <span className="countdown font-mono text-9xl	">
                  <span style={{ "--value": '00' }}></span>
                </span>
                <span className=" font-mono text-5xl	">
                  hours
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-9xl	">
                  <span style={{ "--value": `${Math.floor(time / 60)}`.padStart(2, 0) }}></span>
                </span>
                <span className=" font-mono text-5xl	">
                  min
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-9xl	">
                  <span style={{ "--value": `${time % 60}`.padStart(2, 0) }}></span>
                </span>
                <span className=" font-mono text-5xl	">
                  sec
                </span>
              </div>
            </div>
            <div className='grid gap-4 grid-cols-2 bg-yellow-200 py-4'>
              <div className='bg-blue-200'>
                {!toggleRun && <button onClick={() => setToggleRound(!toggleRound)} type="button" className="btn-primary px-10 py-4">รอบ</button>}
                {toggleRun && <button onClick={() => setToggleRound(!toggleRound)} type="button" className="btn-light px-10 py-4">รีเซ็ต</button>}
              </div>
              <div className='bg-pink-200'>
                {toggleRun && <button onClick={() => { setToggleRun(!toggleRun); startCountdown() }} type="button" className="btn-success px-10 py-4">เริ่ม</button>}
                {!toggleRun && <button onClick={() => { setToggleRun(!toggleRun); stopTime() }} type="button" className="btn-danger px-10 py-4">หยุด</button>}
              </div>
            </div>
          </div>
          <div className='grid gap-8 grid-cols-2 '>

          </div>
        </div>
        <div className='px-4 py-4'>
          <div className=''>
            <div className="overflow-x-auto">
              <table className="table table-zebra">

                <thead>
                  <tr>
                    <th></th>
                    <th><p className="text-lg ">เวลาเริ่ม</p></th>
                    <th><p className="text-lg ">เวลาหยุด</p></th>
                    <th><p className="text-lg ">ระยะเวลา</p></th>
                  </tr>
                </thead>
                <tbody className="text-2xl">
                  <tr>
                    <th>1</th>
                    <td>23:00</td>
                    <td>23:15</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>23:35</td>
                    <td>23:55</td>
                    <td>15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section> */}
      <CountdownTimer />
    </>
  )
}

export default App
