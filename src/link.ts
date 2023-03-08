import { Dropbox, sharing } from "dropbox"
import fetch from "node-fetch";

type shareLinkResultType = sharing.FileLinkMetadataReference
                          | sharing.FolderLinkMetadataReference
                          | sharing.SharedLinkMetadataReference;

export const getLink = async (accessToken: string, path: string, isDebug: boolean): Promise<string> => {
  const dropbox = new Dropbox({accessToken, fetch: fetch});
  
  return dropbox.sharingCreateSharedLinkWithSettings({
    path: path,
    // settings: 
  })
  .then((response: shareLinkResultType) => {
    if (isDebug) console.log('link:', response.url);
    if (isDebug) console.log('full response:', response);
    return response.url;
  })
  .catch((error: any) => {
    if (isDebug) console.error(error);
    return error;
  });
}