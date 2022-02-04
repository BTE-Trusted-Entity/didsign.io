import JSZip from "jszip"


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace VerifyHelper {


    export const unzip = (file: File) => {

        const unzip = new JSZip()
        unzip.loadAsync(file).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                zip.files[filename].async('string').then(async function (fileData) {
                    console.log(filename)
                    console.log(fileData)
                    //console.log(JSON.parse(fileData).jwt) // These are your file contents      
                })
            })
        }).catch(err => console.log(err)

        )
        return ''

    }
}