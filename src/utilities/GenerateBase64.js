export default function GenerateBase64(base64, filename) {
  let modifiedFileName =
    filename === null || filename === undefined ? 'hello.jpg' : filename;
  const format = modifiedFileName.split('.');
  let modifiedBase64 = base64;
  if (base64 !== null && base64 !== undefined) {
    modifiedBase64 = base64.replace('\u0000', '');
    modifiedBase64 = modifiedBase64.replace(/(\n|\r)/gm, '');
  }
  const documentFormat = format[format.length - 1];
  const contentType = documentFormat === 'pdf' ? 'application' : 'image';
  const base64String = `data:${contentType}/${documentFormat};base64,${modifiedBase64}`;

  return {documentFormat, base64String};
}
