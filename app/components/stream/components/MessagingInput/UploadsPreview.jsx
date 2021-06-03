import { useContext } from "react"
import { ImagePreviewer, FilePreviewer } from "react-file-utils"
import { ChannelStateContext } from "stream-chat-react"

export const UploadsPreview = ({
  fileOrder,
  fileUploads,
  imageOrder,
  imageUploads,
  numberOfUploads,
  removeFile,
  removeImage,
  uploadFile,
  uploadImage,
  uploadNewFiles,
}) => {
  const { multipleUploads, maxNumberOfFiles } = useContext(ChannelStateContext)

  return (
    <>
      {imageOrder.length > 0 && (
        <ImagePreviewer
          imageUploads={imageOrder.map((id) => imageUploads[id])}
          handleRemove={removeImage}
          handleRetry={uploadImage}
          handleFiles={uploadNewFiles}
          multiple={multipleUploads}
          disabled={
            maxNumberOfFiles !== undefined && numberOfUploads >= maxNumberOfFiles
          }
        />
      )}
      {fileOrder.length > 0 && (
        <FilePreviewer
          uploads={fileOrder.map((id) => fileUploads[id])}
          handleRemove={removeFile}
          handleRetry={uploadFile}
          handleFiles={uploadNewFiles}
        />
      )}
    </>
  )
}
