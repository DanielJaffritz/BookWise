"use client"
import { toast } from "@/components/ui/toast";
import config from "@/lib/config"
import { Image as IKImage, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitProvider, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/next"
import Image from "next/image";
import { useRef, useState } from "react"

export default function ImageUpload({ onFileChange }: { onFileChange: (filePath: string) => void; }) {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const abortController = new AbortController();
  async function authenticator() {
    try {
      console.log("mamaguevo")
      const response = await fetch(`/api/auth/imagekit`)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`request failed with status ${response.status}: ${errorText}`)
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      const publicKey = config.env.imagekit.publicKey
      return { token, expire, signature, publicKey };
    } catch (error: any) {
      throw new Error("hijueputa")
    }
  }
  async function handleUpload() {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("PLease select a file to upload")
      return;
    }
    const file = fileInput.files[0];
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError)
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal

      })
      const man = uploadResponse.filePath!

      setFile({ filePath: man })
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("upload aborted:", error.reason);
      }
      if (error instanceof ImageKitInvalidRequestError) {
        console.error("upload aborted:", error.message);
      }
      if (error instanceof ImageKitUploadNetworkError) {
        console.error("upload aborted:", error.message);
      }
      if (error instanceof ImageKitServerError) {
        console.error("upload aborted:", error.message);
      } else {
        console.error("upload error:", error)
      }
      setFile({ filePath: "An error ocurred, Try Again" })
    }

  }
  const onSuccess = (res: any) => {
    handleUpload()
    onFileChange(res.filePath)
    if (file?.filePath === "Try Again") {
      toast.add({
        title: "image not uploaded",
        description: "An unexpected error ocurred, Try again"
      })
    } else {
      toast.add({
        title: `image upload succesfully`,
        description: `${res.filePath} uploaded`
      })
    }
  }

  return (
    <>
      <input className="hidden" type="file" ref={fileInputRef} onChange={onSuccess} />
      <button type="button" className="upload-btn" onClick={
        (e) => {
          e.preventDefault();
          if (fileInputRef.current) {
            fileInputRef.current?.click()
          }
        }
      }>
        <Image className="object-contain" src="/icons/upload.svg" alt="upload-icon" width={20} height={20} />
        <p className="text-base text-app-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && <IKImage urlEndpoint={config.env.imagekit.urlEndpoint} alt={file.filePath} src={file.filePath} width={500} height={300} />}
    </>

  )
}

