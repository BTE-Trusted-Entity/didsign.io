import Dropzone, { DropEvent, FileRejection } from "react-dropzone"
import "../Styles/App.css"
import React from "react"
import "../Styles/HashLabel.css"
import video from '../ImageAssets/animation.mp4'
import fast from '../ImageAssets/animation2.mp4'





interface Toggle {
    handleDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
    handleDragEnter: React.DragEventHandler<HTMLElement> | undefined
    handleDragLeave: React.DragEventHandler<HTMLElement> | undefined
    dragStatus: boolean

}
const onDrag = () => {
    const video = (document.getElementById('video') as HTMLVideoElement)
    video.playbackRate = 3.0
    video.loop = true
    video.setAttribute('src', fast)
}
const onLeave = () => {
    const videoFrame = (document.getElementById('video') as HTMLVideoElement)
    videoFrame.setAttribute('src', video)
}
function Files(props: Toggle) {

    return <div>
        <div className="mt-10 mx-auto w-2/3 h-72 relative">
            <video id="video" className=" border-dashed border-1 object-cover rounded-lg bg-emerald-700 border-sky-800 absolute h-full w-full " autoPlay loop muted>
                <source
                    src={video}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <Dropzone onDrop={props.handleDrop} onDragLeave={onLeave} onDragEnter={onDrag}>


                {({ getRootProps, getInputProps }) => (

                    <div {...getRootProps({ className: "h-full w-full relative" })}>
                        
                        <input {...getInputProps()} />


                        <span className=" font-semibold drop-shadow-lg shadow-black pointer-events-none absolute text-neutral-100 text-center w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 2xl:text-2xl text-xl 3xl:text-3xl lg:text-xl md:text-xl sm:text-sm phone:text-xs">Drag & drop your file to sign or verify</span>
                    
                    </div>

                )}

            </Dropzone>
        </div>
    </div>
}

export default Files
