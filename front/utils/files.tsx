import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

export const printRecordingDirectoryContents = async (directory: string) => {
  try {
    const files = await FileSystem.readDirectoryAsync(directory);
    console.log("Files in recording dir:", files);
  } catch (error) {
    console.error("Error reading recording directory:", error);
  }
};

export async function ensureRecordingDirExists(directory: string) {
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  }
}


export function generateIdKey(): string {
  const array = new Uint8Array(4);
  Crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
