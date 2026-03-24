import { Octokit } from "@octokit/rest";

export const useOcto = (token: string) => {

    const OWNER = "Marcel";
    const REPO = "mhollink/sigma-times";
    const PATH = "public/guesses.json";
    const octokit = new Octokit({ auth: token });

    async function updateGuesses(newData: any) {
        // 1. Get current file info (to get SHA)
        const { data: file } = await octokit.repos.getContent({
            owner: OWNER,
            repo: REPO,
            path: PATH,
        });

        const sha = (file as any).sha; // SHA is required for updates

        // 2. Prepare content
        const content = Buffer.from(JSON.stringify(newData, null, 2)).toString(
            "base64"
        );

        // 3. Update file
        await octokit.repos.createOrUpdateFileContents({
            owner: OWNER,
            repo: REPO,
            path: PATH,
            message: "Update guesses.json",
            content,
            sha,
        });

        console.log("File updated successfully");
    }

    return {
        updateGuesses,
    }
}