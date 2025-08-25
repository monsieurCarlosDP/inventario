import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef, useState } from "react";
import Button from "../../atoms/Button/Button";

const UploadPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleClickOpenCamera = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (file: File) => {
    setFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return (
    <div>
      {file && (
        <img
          style={{
            width: "256px",
            height: "256px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={URL.createObjectURL(file)}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button onClick={handleClickOpenCamera}>
        <CameraAltIcon />
      </Button>
    </div>
  );
};

export default UploadPhoto;
