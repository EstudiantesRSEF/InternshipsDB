import {
	Button,
	FileUpload,
} from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

const UploadBulk = ({
  uploadText = "Upload Bulk File",
  accept = ".xlsx,.xls,.csv",
  buttonVariant = "outline",
  buttonSize = "sm",
  buttonColorScheme,
  rootProps = {},
  ...buttonProps
}) => {
  return (
    <FileUpload.Root accept={accept} {...rootProps}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          colorScheme={buttonColorScheme}
          {...buttonProps}
        >
          <HiUpload /> {uploadText}
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}

export default UploadBulk