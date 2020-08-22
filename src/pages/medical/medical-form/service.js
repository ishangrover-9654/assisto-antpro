import request from 'umi-request';

export async function submitMedicalForm(params) {
  console.log('params.imag', params.imageFiles);
  let formData = new FormData();
  const files = params.imageFiles;
  debugger;
  files.map((file, index) => {
    formData.append('files', file.originFileObj);
  });
  delete params['imageFiles'];
  //const blob = new Blob([JSON.stringify(params)], { type: 'application/json' });

  formData.append(
    'medicalRecord',
    new Blob([JSON.stringify(params)], {
      type: 'application/json',
    }),
  );
  //formData.append('medicalRecord', JSON.stringify(params));

  //debugger;
  //console.log('formData', formData);
  //console.log('imageFiles', formData.get('imageFiles'));

  //console.log('formData', formData.has('imageFiles'));

  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }
  return request('/api/medical/records', {
    method: 'POST',
    data: formData,
  });
}
