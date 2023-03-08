import * as core from '@actions/core'
import { getLink } from './link'

const accessToken = core.getInput('DROPBOX_ACCESS_TOKEN')
const filePath: string = core.getInput('DROPBOX_FILE_PATH');
const isDebug: boolean = core.getBooleanInput('DEBUG')

const run = async (): Promise<void> => {
  try {
    if (isDebug) console.log(`Create Link for ${filePath}`);
    
    const link = await getLink(accessToken, filePath, isDebug);

    if (isDebug) console.log(link);
    core.setOutput('link', link);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run();