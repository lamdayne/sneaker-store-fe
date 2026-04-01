import { useProductStore } from "@/store/productStore"


export const uploadToCloudinary = async (file) => {
    const productStore = useProductStore();
    const res = await productStore.getCloudinarySignature()

    const { signature, timestamp, api_key, cloud_name, folder } = res.data

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', api_key)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    formData.append('folder', folder)

    // 3. gọi cloudinary
    const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
    )

    const data = await uploadRes.json()
    return data
}