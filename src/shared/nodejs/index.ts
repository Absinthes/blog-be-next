import { existsSync } from 'fs';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

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
  data: any,
) {
  let dirPath = join(rootDir, dirName);
  if (!existsSync(dirPath)) {
    await mkDir(dirPath);
  }
  const path = join(dirPath, name);
  await writeFile(path, data);
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
