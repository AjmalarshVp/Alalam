import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  home: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZlOTQ5MTA4OTlkNTRlYzA5MGQ3YjJiOTQxYzJiYzg2EgsSBxCgzYGTshYYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzUyODIyNDI1OTg3NDI2Mzg4NA',
  gallery: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhlNzRhMzYzM2E5OTRkODQ5MzQ2YTg4MWZhNWE0MWM3EgsSBxCgzYGTshYYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzUyODIyNDI1OTg3NDI2Mzg4NA',
  services: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQzZWQ0OTVjNWE3ZTRjYzJiNmFhMmE4ZmNkYWE5NWYzEgsSBxCgzYGTshYYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzUyODIyNDI1OTg3NDI2Mzg4NA',
  contact: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg0MDFkYTc0YjllOTQxNjc5NDE2ZGRmOTc2YjFjZDEzEgsSBxCgzYGTshYYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzUyODIyNDI1OTg3NDI2Mzg4NA'
};

const outputDir = './raw_designs';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(urls).forEach(([name, url]) => {
  const filePath = path.join(outputDir, `${name}.html`);
  const file = fs.createWriteStream(filePath);
  
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}.html successfully`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${name}.html:`, err.message);
  });
});
