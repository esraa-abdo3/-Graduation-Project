// ImageUploader.jsx
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";
import uploadimg from "../../assets/upload_11918679.png";

const ImageUploader = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // تمرير ملف الصورة الأصلي للمكوّن الأب
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" className="upload-icon" />
        ) : (
          <>
            <p>Drag your photo here or <span className="browse">Browse from device</span></p>
            <img src={uploadimg} alt="Upload Icon" className="upload-icon" />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
