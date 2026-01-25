/**
 * Credential Client
 *
 * Fetches Supabase credentials from the centralized assistant-mcp server.
 * Credentials are cached in memory for the duration of the process.
 */
// In-memory cache
let cachedCredentials = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
/**
 * Get configuration from environment variables
 */
function getConfig() {
    const account = process.env.SUPABASE_ACCOUNT;
    const authToken = process.env.MCP_AUTH_TOKEN;
    const serverUrl = process.env.ASSISTANT_MCP_URL;
    if (!account) {
        throw new Error('SUPABASE_ACCOUNT environment variable is required');
    }
    if (!authToken) {
        throw new Error('MCP_AUTH_TOKEN environment variable is required');
    }
    if (!serverUrl) {
        throw new Error('ASSISTANT_MCP_URL environment variable is required');
    }
    return { account, authToken, serverUrl };
}
/**
 * Fetch credentials from assistant-mcp server
 */
async function fetchCredentials() {
    const { account, authToken, serverUrl } = getConfig();
    const serviceName = `supabase_${account}`;
    const url = `${serverUrl}/api/credential/${serviceName}`;
    console.error(`[supabase-mcp] Fetching credentials for ${serviceName}...`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch credentials: ${response.status} ${response.statusText} - ${error}`);
    }
    const data = (await response.json());
    console.error(`[supabase-mcp] Credentials fetched successfully for ${serviceName}`);
    return {
        accessToken: data.credential,
        projectRefs: data.metadata.project_refs || [],
        defaultProject: data.metadata.default_project,
        fetchedAt: new Date(),
    };
}
/**
 * Get Supabase credentials (from cache or fetch fresh)
 */
export async function getSupabaseCredentials() {
    // Check cache
    if (cachedCredentials) {
        const age = Date.now() - cachedCredentials.fetchedAt.getTime();
        if (age < CACHE_TTL_MS) {
            return cachedCredentials;
        }
        console.error('[supabase-mcp] Credentials cache expired, refreshing...');
    }
    // Fetch fresh credentials
    cachedCredentials = await fetchCredentials();
    return cachedCredentials;
}
/**
 * Get just the access token
 */
export async function getAccessToken() {
    const credentials = await getSupabaseCredentials();
    return credentials.accessToken;
}
/**
 * Get project refs associated with this account
 */
export async function getProjectRefs() {
    const credentials = await getSupabaseCredentials();
    return credentials.projectRefs;
}
/**
 * Clear the credentials cache (force refresh on next call)
 */
export function clearCredentialsCache() {
    cachedCredentials = null;
    console.error('[supabase-mcp] Credentials cache cleared');
}
/**
 * Get the account name from environment
 */
export function getAccountName() {
    const { account } = getConfig();
    return account;
}
//# sourceMappingURL=credential-client.js.map