import request from '@/utils/request';

export function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file.file);
  formData.append('title', file.title);
  formData.append('description', file.content);

  return request({
    url: '/image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  });
}