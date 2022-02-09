import React, { useCallback, useState } from 'react'
import { VerifyHelper } from '../Utils/verify-helper'
import Files from './ImportFiles'

function VerifyerComponent() {
    const [hashes, setHashes] = useState<string[]>([])
    const [finalHash, setFinalHash] = useState<string>("")
    const [droppedFile, setDroppedFile] = useState<File[]>([])
    const [isDrag, setIsDrag] = useState<boolean>(false)

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(async (file: File) => {
            if (file.type == "application/zip") {
                VerifyHelper.unzip(file)
            }
            setDroppedFile(droppedFile => [...droppedFile, file])

            setIsDrag(false)

        })
    }, [isDrag])
    const handleDrag = useCallback(() => {
        setIsDrag(true)
    }, [isDrag])
    const handleLeave = useCallback(() => {
        setIsDrag(false)

    }, [isDrag])

    return (
        <div>
        </div>
    )
}
export default VerifyerComponent

