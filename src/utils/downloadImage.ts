export async function createFile(url: string, fileName: string) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
      type: "image/jpeg",
    };
    const file =  new File([data], fileName, metadata);
    return file;
  }
  