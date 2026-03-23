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
  onChange,
  inputProps = {},
  listProps = {},
  rootProps = {},
  ...buttonProps
}) => {
  return (
    <FileUpload.Root accept={accept} {...rootProps}>
      <FileUpload.HiddenInput onChange={onChange} {...inputProps} />
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
      <FileUpload.List {...listProps} />
    </FileUpload.Root>
  )
}

export default UploadBulk