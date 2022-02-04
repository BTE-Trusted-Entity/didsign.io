import "../Styles/App.css"
import React, { useEffect, useState, useCallback, useRef } from "react"
import Files from "./ImportFiles"
import ZipButton from "./ZipButton"
import HashLabel from "./HashLabel"
import { SignHelper } from "../Utils/sign-helpers"
import { VerifyHelper } from "../Utils/verify-helper"
import { SignDoc } from "../Utils/types"
import FileList from "./FileList"
import Icon from "./Icon"
import CenterRightBubble from "./CenterRightBubble"


function SignerComponent() {
    const [hashes, setHashes] = useState<string[]>([])
    const [finalHash, setFinalHash] = useState<string>("")
    const [droppedFile, setDroppedFile] = useState<File[]>([])
    const initialRender: React.MutableRefObject<boolean> = useRef(true)
    const [isDrag, setIsDrag] = useState<boolean>(false)

    async function getHash() {
        setFinalHash(await SignHelper.createHashFromHashArray(hashes.sort()))
    }

    useEffect(() => {
        initialRender.current ? initialRender.current = false : getHash()
    }, [hashes])

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(async (file: File) => {
            setDroppedFile(droppedFile => [...droppedFile, file])
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = async function () {
                const newHash = await SignHelper.createHash(reader.result as ArrayBuffer)
                setHashes([...hashes, newHash])
                setIsDrag(false)
            }
        })
    }, [hashes, isDrag])
    const handleDrag = useCallback(() => {
        setIsDrag(true)
    }, [isDrag])
    const handleLeave = useCallback(() => {
        setIsDrag(false)
    }, [isDrag])
    const handleChange = async () => {
        if (droppedFile.length < 1) { return }
        //SignHelper.generateZipFile(droppedFile)
        SignHelper.openSporan(finalHash).then(response => {
            const sign: SignDoc = { jwt: response, fileHashes: hashes }
            SignHelper.generateZipFile(droppedFile, sign)
        }).catch(() => {
            console.log(`Sign Error`)
        })

    }
    return (
        <div className="bg-mid-body w-screen">
            <Files handleDrop={handleDrop} handleDragEnter={handleDrag} handleDragLeave={handleLeave} dragStatus={isDrag} />
            <FileList />

            <Icon />
            <CenterRightBubble/>
        </div>

    )
}
export default SignerComponent


