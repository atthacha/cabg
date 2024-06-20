import React from 'react';
import './CountdownTimer.css';

class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: '', // เปลี่ยนจาก seconds เป็น minutes
            countdown: 0,
            remainingTime: 0,
            intervalId: null,
            isRunning: false,
            countdownHistory: [],
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { isRunning, countdown, remainingTime, minutes } = this.state;

    //     if (isRunning !== prevState.isRunning) {
    //         if (isRunning) {
    //             const timer = setInterval(() => {
    //                 this.setState((prevState) => ({
    //                     countdown: prevState.countdown - 1,
    //                     remainingTime: prevState.remainingTime - 1,
    //                 }));
    //             }, 1000);
    //             this.setState({ intervalId: timer });
    //         } else {
    //             clearInterval(this.state.intervalId);
    //         }
    //     }

    //     if (countdown === 0 && countdown !== prevState.countdown) {
    //         let countdownMinutes = minutes;
    //         this.addToCountdownHistory(countdownMinutes);
    //         this.setState({ isRunning: false });
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        const { isRunning, countdown, minutes } = this.state;

        if (isRunning !== prevState.isRunning) {
            if (isRunning) {
                const timer = setInterval(() => {
                    this.setState((prevState) => ({
                        countdown: prevState.countdown - 1,
                        remainingTime: prevState.remainingTime - 1,
                    }));
                }, 1000);
                this.setState({ intervalId: timer });
            } else {
                clearInterval(this.state.intervalId);
            }
        }

        if (countdown === 0 && countdown !== prevState.countdown) {
            this.addToCountdownHistory(parseInt(minutes));
            this.setState({ isRunning: false });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    handleInputChange = (e) => {
        this.setState({ minutes: e.target.value }); // เปลี่ยนจาก seconds เป็น minutes
    };

    // startCountdown = () => {
    //     const countdownMinutes = parseInt(this.state.minutes, 10) || 0;
    //     const countdownSeconds = countdownMinutes * 60; // แปลงนาทีเป็นวินาที
    //     this.setState({ countdown: countdownSeconds, remainingTime: countdownSeconds, isRunning: true });
    // };
    startCountdown = () => {
        const countdownMinutes = parseInt(this.state.minutes, 10) || 0;
        const countdownSeconds = countdownMinutes * 60;
        this.setState({ countdown: countdownSeconds, remainingTime: countdownSeconds, isRunning: true });
      };

    stopCountdown = () => {
        this.setState({ isRunning: false });
    };

    resumeCountdown = () => {
        this.setState({ countdown: this.state.remainingTime, isRunning: true });
    };

    resetCountdown = () => {
        clearInterval(this.state.intervalId);
        this.setState({ minutes: '', countdown: 0, remainingTime: 0, isRunning: false, countdownHistory: [] });
    };

    // addToCountdownHistory = (countdownMinutes) => {
    //     const startTime = new Date(Date.now() - (countdownMinutes * 60 * 1000)).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    //     const endTime = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    //     this.setState((prevState) => ({
    //         countdownHistory: [
    //             ...prevState.countdownHistory,
    //             { id: prevState.countdownHistory.length + 1, startTime, endTime, totalTime: countdownMinutes },
    //         ],
    //     }));
    // };

    addToCountdownHistory = (countdownMinutes) => {
        const startTime = new Date(Date.now() - (countdownMinutes * 60 * 1000)).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        const endTime = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        this.setState((prevState) => ({
          countdownHistory: [
            ...prevState.countdownHistory,
            { id: prevState.countdownHistory.length + 1, startTime, endTime, totalTime: countdownMinutes },
          ],
        }));
      };

    formatTime = (timeInSeconds) => {
        if (timeInSeconds === 0) {
            return '00 hr 00 min 00 sec';
        }

        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const remainingSeconds = timeInSeconds % 60;
        return `  ${hours.toString().padStart(2, '0')} hr  ${minutes.toString().padStart(2, '0')} min  ${remainingSeconds.toString().padStart(2, '0')} sec`;
    };

    printCountdownHistory = () => {
        const { countdownHistory } = this.state;
        const historyRows = countdownHistory.map((history) => (
            `<tr>
        <td>${history.id}</td>
        <td>${history.startTime}</td>
        <td>${history.endTime}</td>
        <td>${history.totalTime}</td>
      </tr>`
        ));

        const historyTableContent = `
      <table>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เวลาที่เริ่ม</th>
            <th>เวลาที่จบ</th>
            <th>เวลาที่ใช้นับถอยหลัง (นาที)</th>
          </tr>
        </thead>
        <tbody>${historyRows.join('')}</tbody>
      </table>
    `;

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
      <html>
        <head>
          <title>ประวัติการนับถอยหลัง</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          ${historyTableContent}
          <script>
            window.print();
            window.close();
          </script>
        </body>
      </html>
    `);
    };

    // addOneMinute = () => {
    //     this.setState((prevState) => ({
    //         countdown: prevState.countdown + 60,
    //         remainingTime: prevState.remainingTime + 60
    //     }));
    // };

    addOneMinute = () => {
        this.setState((prevState) => ({
          countdown: prevState.countdown + 60,
          remainingTime: prevState.remainingTime + 60,
          minutes: String(parseInt(prevState.minutes) + 1)
        }));
      };
    render() {
        const { minutes, countdown, isRunning, remainingTime, countdownHistory } = this.state;
        const isLastTenSeconds = countdown <= 10 && countdown > 0;
        return (
            <div className="countdown-container">
                <input
                    type="number"
                    value={minutes}
                    onChange={this.handleInputChange}
                    placeholder="Enter minutes"
                    className="input-field"
                />
                <div className="button-container">
                    <button onClick={this.startCountdown} disabled={isRunning} className="button start-button">
                        Start
                    </button>
                    <button onClick={this.stopCountdown} disabled={!isRunning} className="button stop-button">
                        Stop
                    </button>
                    <button onClick={this.resumeCountdown} disabled={isRunning || remainingTime === 0} className="button resume-button">
                        Resume
                    </button>
                    <button
                        onClick={this.resetCountdown}
                        disabled={!countdownHistory.length && !isRunning && !minutes}
                        className="button reset-button"
                    >
                        Reset
                    </button>
                    <button onClick={this.printCountdownHistory} disabled={!countdownHistory.length} className="button print-button">
                        Print
                    </button>
                </div>

                {/* <div id="timer" className="countdown-display">{this.formatTime(countdown)}</div> */}
                <div className={`countdown-display ${isLastTenSeconds ? 'flashing' : ''}`}>
                    <div className="time-section">
                        <span className="time-value">{Math.floor(countdown / 3600).toString().padStart(2, '0')}</span>
                        <span className="time-label">Hours</span>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-section">
                        <span className="time-value">{Math.floor((countdown % 3600) / 60).toString().padStart(2, '0')}</span>
                        <span className="time-label">Minutes</span>
                    </div>
                    <div className="time-separator">:</div>
                    <div className="time-section">
                        <span className="time-value">{(countdown % 60).toString().padStart(2, '0')}</span>
                        <span className="time-label">Seconds</span>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={this.addOneMinute} disabled={!isRunning} className="button add-minute-button">
                        +1 Min
                    </button>
                </div>
                {countdownHistory.length > 0 && (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>เวลาที่เริ่ม</th>
                                <th>เวลาที่จบ</th>
                                <th>เวลาที่ใช้นับถอยหลัง (นาที)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countdownHistory.map((history) => (
                                <tr key={history.id}>
                                    <td>{history.id}</td>
                                    <td>{history.startTime}</td>
                                    <td>{history.endTime}</td>
                                    <td>{history.totalTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default CountdownTimer