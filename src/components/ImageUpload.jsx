import { useState, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const ImageUpload = ({ url, setUrl, uuid }) => {
  const [image, setImage] = useState("");
  const imgRef = useRef(null);
  const { supabase, session } = useUserContext();
  const queryClient = useQueryClient();

  const handleUploadImg = async () => {
    const uploaded = imgRef.current.files[0];
    console.log(uploaded);

    const { data, error } = await supabase.storage
      .from("thumbnails")
      .upload(session.user.id + "/" + uuid, uploaded, {
        cacheControl: "3600",
        upsert: true,
      });

    console.log();

    if (error) {
      console.log(error);
      return;
    }

    setUrl(data.path);
    handlePreview(data.path);
  };

  const handlePreview = async (path) => {
    const { data, error } = await supabase.storage
      .from("thumbnails")
      .createSignedUrl("/" + path, 60);

    console.log(data, error);

    if (error) {
      console.log(error);
      return;
    }

    setImage(data.signedUrl);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="refImg">Inspiration Image</label>
      <img src={image} alt="" />
      <input
        ref={imgRef}
        type="file"
        name="refImage"
        onChange={handleUploadImg}
      />
    </div>
  );
};

export default ImageUpload;
