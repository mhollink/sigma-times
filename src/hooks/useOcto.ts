import {Octokit} from "@octokit/rest";
import {useAuthorize} from "./useAuthorize.ts";

export const useOcto = () => {
    const {getToken, getUser} = useAuthorize()

    const owner = "mhollink";
    const repo = "sigma-times";
    const path = "public/guesses.json";

    const octokit = new Octokit({auth: getToken()});

    async function updateGuesses(newData: any) {
        const user = getUser()

        if (!user) {
            throw new Error("Not (correctly) logged in!");
        }

        // 1. Get current file info (to get SHA)
        const {data: file} = await octokit.repos.getContent({owner, repo, path});

        const sha = (file as any).sha; // SHA is required for updates

        // 2. Prepare content
        const content = btoa(JSON.stringify(newData))

        // 3. Update file
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            committer: {
                name: user.name,
                email: user.email
            },
            message: `${user.name} updated guesses.json`,
            content,
            sha,
        });
    }

    return {
        updateGuesses,
    }
}