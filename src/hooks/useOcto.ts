import {Octokit} from "@octokit/rest";
import {useAuthorize} from "./useAuthorize.ts";

export const useOcto = () => {
    const {getToken, getUser} = useAuthorize()

    const owner = "mhollink";
    const repo = "sigma-times";
    const path = "public/arrival-times.json";

    const octokit = new Octokit({auth: getToken()});

    /**
     * The sha is required for updating the file
     * to make sure it's the correct version.
     */
    async function getFileSha() {
        const user = getUser()

        if (!user) {
            throw new Error("Not (correctly) logged in!");
        }
        const {data: file} = await octokit.repos.getContent({owner, repo, path});
        return file.sha;
    }

    async function updateGuesses(newData: any, sha: string) {
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            committer: {
                name: user.name,
                email: user.email
            },
            message: `${user.name} updated guesses.json`,
            content: btoa(JSON.stringify(newData)),
            sha,
        });
    }

    return {
        getFileSha,
        updateGuesses,
    }
}