# Website owner access

The website asks the Control Plane whether the signed-in Discord user is authorised. A user is an owner when either condition is true:

- they own the configured Discord server; or
- they hold the configured Kairu `Owner` Discord role.

Set these variables on the **Control Plane** Railway service:

```text
DISCORD_GUILD_ID=<your Discord server ID>
DISCORD_OWNER_ROLE_ID=<the Kairu Owner role ID>
DISCORD_BOT_TOKEN=<the bot token already used by the Control Plane>
```

The bot must remain in that Discord server. The user must sign out and back in after deployment.

The website continues using its existing `API_URL` and `WEBSITE_API_SECRET`; do not expose either value in a `VITE_` variable.
