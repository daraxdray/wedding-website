import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import AppConfig from '../../api/config';


const VideoModal = () => {
  
  const [isOpen, setOpen] = useState(false)
  const [videoId, setVideoId] = useState('');

  const openModal = ()=>{
    handleVideoClick(AppConfig.videoUrl);
  }
  const handleVideoClick = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      setVideoId(match[2]);
      setOpen(true);
    }
  };


  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />

      <div className="video-btn">
        <ul>
          <li>
            <button className="wrap" onClick={() => openModal()}><i className="fi flaticon-play" aria-hidden="true"></i></button>
          </li>
        </ul>
      </div>

    </React.Fragment>
  )
}

export default VideoModal;