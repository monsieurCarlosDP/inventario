import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Avatar, Stack } from "@mui/material";
import { useRef } from "react";
import Button from "../../atoms/Button/Button";

interface IUploadPhotoProps {
  onPhotoChange?: (photo: File | null) => void;
  photo?: File | null;
}

const UploadPhoto = ({ onPhotoChange, photo }: IUploadPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickOpenCamera = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (file: File) => {
    onPhotoChange?.(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return (
    <Stack>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {photo ? (
        <Avatar
          src={URL.createObjectURL(photo)}
          sizes=""
          onClick={handleClickOpenCamera}
        />
      ) : (
        <Button onClick={handleClickOpenCamera}>
          <CameraAltIcon />
        </Button>
      )}
    </Stack>
  );
};

export default UploadPhoto;
