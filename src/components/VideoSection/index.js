import React from 'react'
import VideoModal from '../ModalVideo'
import AppConfig from '../../api/config';


const VideoSection = (props) => {
    return(
        <section className="wpo-video-section" style={{backgroundImage: `url( ${AppConfig.cta})`,backgroundPosition:'center bottom'}}>
            <h2 className="hidden">some</h2>
            <VideoModal/>
        </section>
    )
}

export default VideoSection;