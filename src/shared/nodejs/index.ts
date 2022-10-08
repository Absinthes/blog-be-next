import { existsSync } from 'fs';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Stream } from 'stream';
import tinify from 'tinify';

tinify.key = "YjMV8kCvw0JkLVhzCPVDrVdjF1slJ9RW"


/**
 * 创建目录
 * @param path
 */
export function mkDir(path) {
  return mkdir(path, {
    recursive: true,
  });
}

/**
 * 保存文件
 * @param rootDir 文件夹路径
 * @param dirName 文件夹名称
 * @param name 文件名称
 * @param data 文件数据
 * @returns {origin: 绝对路径, relative: 相对于文件夹路径}
 */
export async function saveFile(
  rootDir: string,
  dirName: string,
  name: string,
  data: Stream,
) {
  let dirPath = join(rootDir, dirName);
  if (!existsSync(dirPath)) {
    await mkDir(dirPath);
  }
  const path = join(dirPath, name);
  const bufferData = await streamToBuffer(data)
  await tinify.fromBuffer(bufferData).toFile(path)
  // await writeFile(path, data);
  return {
    origin: path,
    relative: join(dirName, name),
  };
}

/**
 * 删除文件
 * @param path 路径
 */
export async function deleteFile(path: string) {
  return unlink(path);
}

/**
 * stream转换为Buffer
 * @param stream 
 * @returns 
 */
export function streamToBuffer(stream: Stream): Promise<Buffer> {  
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  })
}