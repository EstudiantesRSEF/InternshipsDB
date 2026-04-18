import { useRef, useState } from "react"
import {
  Box,
  Button,
  Input,
  Text,
} from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

const UploadBulk = ({
  uploadText = "Upload Bulk File",
  accept = ".xlsx,.xls,.csv",
  buttonVariant = "outline",
  buttonSize = "md",
  buttonColorScheme,
  onChange,
  inputProps = {},
  listProps = {},
  rootProps = {},
  ...buttonProps
}) => {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState("")

  const { onClick: onButtonClick, ...restButtonProps } = buttonProps

  const handleInputChange = e => {
    const selectedFile = e.target.files?.[0]
    setFileName(selectedFile?.name || "")
    if (onChange) onChange(e)
  }

  const handleButtonClick = e => {
    if (onButtonClick) onButtonClick(e)
    if (!e.defaultPrevented) {
      inputRef.current?.click()
    }
  }

  return (
    <Box {...rootProps}>
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        display="none"
        onChange={handleInputChange}
        {...inputProps}
      />
      <Button
        variant={buttonVariant}
        size={buttonSize}
        colorScheme={buttonColorScheme}
        onClick={handleButtonClick}
        {...restButtonProps}
      >
        <HiUpload /> {uploadText}
      </Button>
      {fileName && (
        <Text mt={2} fontSize="sm" color="gray.600" {...listProps}>
          {fileName}
        </Text>
      )}
    </Box>
  )
}

export default UploadBulk