import { axiosCommon } from '../../hooks/useCommon'

// Image upload
export const imageUpload = async image => {
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axiosCommon.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data.data.display_url
}