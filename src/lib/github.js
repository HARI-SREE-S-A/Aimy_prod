export async function commitToGitHub(filePath, content, commitMessage, isBinary = false) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    console.warn('GitHub CMS is disabled. Missing GITHUB_TOKEN, GITHUB_OWNER, or GITHUB_REPO.');
    return false;
  }

  // 1. Ensure filePath doesn't have leading slash
  const path = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // 2. Get file SHA if it exists (needed for updates)
    let sha = null;
    const getRes = await fetch(`${url}?ref=${branch}`, { headers });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    // 3. Prepare content (Base64)
    let base64Content = '';
    if (isBinary) {
      // content is a Buffer
      base64Content = content.toString('base64');
    } else {
      // content is a string
      base64Content = Buffer.from(content).toString('base64');
    }

    // 4. Commit file
    const body = {
      message: commitMessage,
      content: base64Content,
      branch: branch,
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      console.error('GitHub API Error:', errorData);
      throw new Error(`GitHub API failed: ${errorData.message}`);
    }

    return true;
  } catch (error) {
    console.error('commitToGitHub failed:', error);
    return false;
  }
}
