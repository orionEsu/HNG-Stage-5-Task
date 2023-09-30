/* eslint-disable no-undef */
import './App.css';
import icon from '../public/icon.png';
import monitor from '../public/monitor.png';
import outlineMicrophone from '../public/outline-microphone.png';
import closeCircle from '../public/close-circle.png';
import videoCamera from '../public/video-camera.png';
import copy from '../public/copy.png';
import settings from '../public/settings.png';

function App() {
	return (
		<>
			<div className='header'>
				<div className='logo'>
					<img
						src={icon}
						alt='Logo'
					/>
					<h1>HelpMeOut</h1>
				</div>
				<div className='options'>
					<button>
						<img
							src={settings}
							alt='Settings Icon'
						/>
					</button>
					<button>
						<img
							src={closeCircle}
							alt='Close Icon'
						/>
					</button>
				</div>
			</div>
			<p className='description'>
				This extension helps you record and share help videos with ease.
			</p>

			<div className='btn'>
				<button className='btn-full'>
					<img
						src={monitor}
						alt='Monitor Icon'
					/>
					Full Screen
				</button>
				<button className='btn-current'>
					<img
						src={copy}
						alt='Copy Icon'
					/>
					Current Tab
				</button>
			</div>
			<div className='action'>
				<div className='action--description'>
					<img
						src={videoCamera}
						alt='Video Camera Icon'
					/>
					<h3>Camera</h3>
				</div>
				<label className='switch'>
					<input type='checkbox' />
					<span className='slider round'></span>
				</label>
			</div>
			<div className='action'>
				<div className='action--description'>
					<img
						src={outlineMicrophone}
						alt='Video Camera Icon'
					/>
					<h3>Audio</h3>
				</div>
				<label className='switch'>
					<input type='checkbox' />
					<span className='slider round'></span>
				</label>
			</div>

			<button
				className='btn--start'
				onClick={() => {
					chrome.tabs.query(
						{ active: true, currentWindow: true },
						function (tabs) {
							chrome.tabs.sendMessage(
								tabs[0].id,
								{ action: 'request_recording' },
								function (response) {
									if (!chrome.runtime.lastError) {
										console.log(response);
									} else {
										console.log(
											chrome.runtime.lastError,
											'error line 14'
										);
									}
								}
							);
						}
					);
				}}
			>
				Start Recording
			</button>

			<button
				className='btn--start'
				onClick={() => {
					chrome.tabs.query(
						{ active: true, currentWindow: true },
						function (tabs) {
							chrome.tabs.sendMessage(
								tabs[0].id,
								{ action: 'stop_recording' },
								function (response) {
									if (!chrome.runtime.lastError) {
										console.log(response);
									} else {
										console.log(
											chrome.runtime.lastError,
											'error line 126'
										);
									}
								}
							);
						}
					);
				}}
			>
				Stop Recording
			</button>
		</>
	);
}

export default App;
