import mime from 'mime'
import fs from 'fs'

export const sendFileExist = (pathFile: string, callback: (mimeType: string, pathFile: string, fileName: string) => void) => {

    const mimeType_ = mime.getType(pathFile)
    const fileName_ = pathFile.split("/").pop()

    if (fs.existsSync(pathFile)) callback(mimeType_, pathFile, fileName_)
}