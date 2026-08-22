"use client"
import { toast } from "@/components/ui/toast";
import config from "@/lib/config"
import { cn } from "@/lib/utils";
import { Image as IKImage, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitProvider, ImageKitServerError, ImageKitUploadNetworkError, upload, Video } from "@imagekit/next"
import Image from "next/image";
import { useRef, useState } from "react"

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light'
  onFileChange: (filePath: string) => void;
}

export default function FileUpload({ type, accept, placeholder, folder, variant, onFileChange }: Props) {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const abortController = new AbortController();
  const styles = {
    button: variant === 'dark' ? 'bg-app-dark-300' : 'bg-app-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-app-light-100' : 'text-slate-500',
    text: variant === 'dark' ? "text-app-light-100" : "text-app-dark-400"
  }
  async function authenticator() {
    try {
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
      throw new Error("unexpected")
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
      onFileChange(man)
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
    if (file?.filePath === "Try Again") {
      toast.add({
        title: `${type} not uploaded`,
        description: "An unexpected error ocurred, Try again"
      })
    } else {
      toast.add({
        title: `${type} uploaded succesfully`,
        description: `${file?.filePath} uploaded`
      })
    }
  }

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.add({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
        })
        return false
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.add({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
        })
        return false
      }
    }
    return true
  }
  return (
    <>
      <input accept={accept} className="hidden" type="file" ref={fileInputRef} onChange={onSuccess} />
      <button type="button" className={cn('upload-btn', styles.button)} onClick={
        (e) => {
          e.preventDefault();
          if (fileInputRef.current) {
            fileInputRef.current?.click()
          }
        }
      }>
        <Image className="object-contain" src="/icons/upload.svg" alt="upload-icon" width={20} height={20} />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file && (
        (type === 'image' ? (
          <IKImage
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={file.filePath} src={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <Video
            urlEndpoint={config.env.imagekit.urlEndpoint}
            src={file.filePath}
            controls={true}
            className="h-96 w-ful rounded-xl"
          />
        ) : null)
      )}

    </>

  )
}

