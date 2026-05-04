import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
function getProjectRoot(projectPath) {
    return resolve(projectPath || process.cwd());
}
async function readLinkedProjectRef(projectPath) {
    const projectRoot = getProjectRoot(projectPath);
    const linkedProjectRefPath = join(projectRoot, 'supabase', '.temp', 'project-ref');
    try {
        const projectRef = await readFile(linkedProjectRefPath, 'utf-8');
        return projectRef.trim() || undefined;
    }
    catch (error) {
        if (error?.code === 'ENOENT') {
            return undefined;
        }
        throw error;
    }
}
export async function ensureProjectRefIsLinked(projectRef, projectPath, command) {
    if (!projectRef) {
        return;
    }
    const projectRoot = getProjectRoot(projectPath);
    const linkedProjectRef = await readLinkedProjectRef(projectPath);
    if (!linkedProjectRef) {
        throw new Error(`${command} does not accept --project-ref directly. Link ${projectRoot} to ${projectRef} first with the link_project tool, or omit project_ref when the project path is already linked.`);
    }
    if (linkedProjectRef !== projectRef) {
        throw new Error(`${command} does not accept --project-ref directly. ${projectRoot} is linked to ${linkedProjectRef}, but ${projectRef} was requested. Use a project_path linked to ${projectRef} or relink the project first.`);
    }
}
//# sourceMappingURL=project-link.js.map