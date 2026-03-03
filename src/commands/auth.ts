import type { Command } from "commander";
import { refreshTokenViaBrowser, persistToken } from "../token-manager.js";
import { createClient, persistClient } from "../state.js";

export function registerAuthCommands(program: Command): void {
  program
    .command("login")
    .description("Open browser to log in and refresh session token")
    .option("--timeout <seconds>", "Login timeout in seconds", parseInt)
    .action(async (opts: { timeout?: number }) => {
      try {
        const timeoutSeconds = opts.timeout ?? 120;
        const token = await refreshTokenViaBrowser(timeoutSeconds);

        // Persist token to disk
        persistToken(token);

        // Update client state so subsequent commands use new token
        const client = createClient();
        client.updateSessionToken(token);
        persistClient(client);

        const masked =
          token.length > 16
            ? `${token.slice(0, 8)}...${token.slice(-8)}`
            : "****";

        console.log(JSON.stringify({ success: true, token: masked }));
      } catch (error) {
        console.log(JSON.stringify({ error: (error as Error).message }));
        process.exit(1);
      }
    });
}
