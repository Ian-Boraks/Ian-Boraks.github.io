<img src="https://raw.githubusercontent.com/RotorJackets/Goggle_Buzz/main/assets/gogglebuzz.png?raw=true" style="max-height: 200px">

# Goggle Buzz

Discord bot for use on the Rotor Jackets Discord server.

# What and why?

Goggle Buzz Discord bot was developed to help with the management and entertainment of the [Rotor Jackets Discord server](https://rotorjackets.tech/).

I was inspired to create this bot after seeing a similar bot on the official Velocidrone Discord server. Specifically, the bot's main purpose is to have a live feed of all Velocidrone tracks currently being flown by members of the server. This is done by using the Velocidrone API to the current track leaderboards and then whitelisting it to only be members of the server.

# How does it work?

The bot is written in Python and uses the [discord.py](https://discordpy.readthedocs.io/en/stable/) library to interact with the Discord API. The bot is hosted on a Raspberry Pi 4 and is run as a systemd service. The bot is currently running on the Rotor Jackets Discord server and [VT Drone Racing Team's server](https://gobblerconnect.vt.edu/organization/drt).

# Code Structure

The code uses discordpy's [cogs](https://discordpy.readthedocs.io/en/stable/ext/commands/cogs.html) to organize the code into different files. The main file is `main.py` which is the entry point for the bot. The `cogs` folder contains all the different cogs that are loaded into the bot.

## Cogs Overview

| Cog             | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `/fun/`         | Contains all the fun commands that the bot can do.                                                            |
| `/leaderboard/` | Contains all of the commands that implement a server wide message leaderboard to track the most active users. |
| `/util/`        | Contains all of the utility commands that the bot can do.                                                     |
| `/velocidrone/` | Contains all of the commands that interact with the Velocidrone API.                                          |

Each cog folder contains 3 items: `<name>.py`, `<name>_helper.py`, and `/json/`.

- `<name>.py`: This file contains all of the commands that are loaded into the bot. This file is loaded into the bot in `main.py`.

- `<name>_helper.py`: This file contains all of the helper functions that are used by the commands in `<name>.py`.

- `/json/`: This folder contains all of the json files that are used by the commands in `<name>.py` as well as the config files.

## Cog Details

### `/velocidrone/`

The main purpose of this cog is to interact with the Velocidrone API to get the current track leaderboards and then whitelist it to only be members of the server. The cog also has a few other commands that are used to get the current track, the current track leaderboard, and the current track leaderboard for a specific user.

The main part of the cog is the `track_update()` function and the background loop that calls it.

<details>
<summary><code>track_update()</code></summary>
<pre><code class="py language-python">
async def track_update() -> dict:
    """Updates the leaderboard for all tracks and returns a dictionary of the differences between the old and new leaderboards

    Returns:
        dict: A dictionary of the differences between the old and new leaderboards
    """

    track_diff = {}
    track_ids = generate_prioritized_track_list()
    new_low_priority_track_ids = []

    for track_id in track_ids:
        if track_id in new_low_priority_track_ids:
            print(f"Skipping track {track_id} because it was deprioritized")
            continue

        await asyncio.sleep(10)

        saved_leaderboard = get_track(track_id)
        current_leaderboard = get_leaderboard(None, get_JSON_url(track_id))

        if saved_leaderboard[1] != current_leaderboard[1]:
            save_track(current_leaderboard, track_id)
            track_diff[track_id] = {}

            add_track_to_high_priority(track_id)
        else:
            if str(track_id) in config["track_priority"]["high"].keys() and (
                time.time()
                - config["track_priority"]["high"][str(track_id)]["last_changed"]
                > config["track_deprioritize_time"]
            ):
                new_low_priority_track_ids.append(track_id)
                remove_track_from_high_priority(track_id)
            continue

        for i in current_leaderboard[1]:
            first_time = True
            for j in saved_leaderboard[1]:
                if i["playername"] == j["playername"]:
                    first_time = False
                    if float(i["lap_time"]) < float(j["lap_time"]):
                        track_diff[track_id][i["playername"]] = {
                            "lap_date": i["lap_date"],
                            "lap_time": i["lap_time"],
                            "lap_diff": float(i["lap_time"]) - float(j["lap_time"]),
                            "first_time": False,
                        }
            if first_time:
                track_diff[track_id][i["playername"]] = {
                    "lap_date": i["lap_date"],
                    "lap_time": i["lap_time"],
                    "first_time": True,
                }

    return track_diff

</code></pre>

</details>

<details>
<summary><code>background_leaderboard_update()</code></summary>
<pre><code class="py language-python">
@tasks.loop(
    seconds=config["track_update_interval"],
    count=None,
)
async def background_leaderboard_update(self):
    Velocidrone.background_leaderboard_update.change_interval(
        seconds=(velocidrone_helper.get_number_of_tracks() * 10) + 30
    )

    track_diff = await velocidrone_helper.track_update()

    if track_diff is not {}:
        for guild in self.bot.guilds:
            guild_id = guild.id
            if velocidrone_helper.get_guild_leaderboard_channel(guild_id) is None:
                print(f"Guild {guild_id} does not have a leaderboard channel set")
                continue

            for track_id in track_diff:
                if track_id not in velocidrone_helper.get_guild_track_list(
                    guild_id
                ):
                    continue

                message = """"""
                for pilot in track_diff[track_id].keys():
                    if pilot not in velocidrone_helper.get_guild_whitelist(
                        guild_id
                    ):
                        continue

                    pilot_info = track_diff[track_id][pilot]
                    message += (
                        f"""\n**{pilot}** has set a _{"first" if pilot_info["first_time"] else "new"}_ """
                        + f"""time of **{pilot_info["lap_time"]}**!"""
                    )

                track = velocidrone_helper.get_track(track_id)
                if message != """""":
                    await self.bot.get_channel(
                        velocidrone_helper.get_guild_leaderboard_channel(guild_id)
                    ).send(
                        embed=discord.Embed(
                            title=f"""**{track[0]["track_name"]}** has a new leaderboard!""",
                            description=message,
                            url=velocidrone_helper.get_leaderboard_url(track_id),
                            timestamp=datetime.datetime.now(),
                            color=discord.Color.gold(),
                        )
                    )

</code></pre>

</details>

These two functions are responsible for getting the current track leaderboards and then comparing them to the saved leaderboards. If there is a difference, then the new leaderboard is saved and a message is sent to the server's leaderboard channel. The `track_update()` function is called every 10 seconds by the background loop. The background loop is also responsible for changing the interval of the loop based on the number of tracks that are being tracked. This is done to ensure that the loop has enough time to finish before it is called again.

Example of a leaderboard message:

![leaderboard message](/projects/markdown/img/example-velocidrone-message.png)

---

### `/leaderboard/`

The main purpose of this cog is to implement a server wide message leaderboard to track the most active users. The cog also has a few other commands that are used to get the current leaderboard, the current leaderboard for a specific user, and the current leaderboard for a specific channel.

The main part of the cog is the `on_message()` listener function and the `adjust_xp()` function which is called when ever a message is sent.

<details>
<summary><code>on_message()</code></summary>
<pre><code class="py language-python">
@commands.Cog.listener()
    async def on_message(self, message):
        if message.guild == None or not leaderboard_helper.is_whitelisted(
            message.guild.id
        ):
            return

        if message.author.bot:
            return

        if (
            level := leaderboard_helper.adjust_xp(message.guild, message.author)
        ) is not None:
            await message.channel.send(
                f"{message.author.mention} has leveled up to level {level}"
            )

</code></pre>

</details>

<details>
<summary><code>adjust_xp()</code></summary>
<pre><code class="py language-python">
def adjust_xp(
    guild: discord.guild.Guild,
    member: discord.member.Member,
    xp: int = random.randint(
        config["random_xp_range"][0], config["random_xp_range"][1]
    ),
):
    global leaderboard

    member_ID = str(member.id)
    guild_ID = str(guild.id)
    level_up = False

    author_check(guild, member)
    if (
        time.time() - leaderboard[guild_ID][member_ID]["last_message"]
        > config["delay_XP_seconds"]
    ):
        leaderboard[guild_ID][member_ID]["xp"] += xp
        if (
            leaderboard[guild_ID][member_ID]["xp"]
            >= config["level_up_XP"] * leaderboard[guild_ID][member_ID]["level"]
        ):
            leaderboard[guild_ID][member_ID]["level"] += 1
            leaderboard[guild_ID][member_ID]["xp"] = 0
            level_up = True
        leaderboard[guild_ID][member_ID]["last_message"] = time.time()

    if level_up:
        return leaderboard[guild_ID][member_ID]["level"]
    else:
        return None

</code></pre>

</details>

These two functions are responsible for adjusting the XP of a user when ever they send a message. The `on_message()` function is called every time a message is sent in a server that the bot is in. The `adjust_xp()` function is called by the `on_message()` function and is responsible for adjusting the XP of the user. The XP is adjusted by a random number between the `random_xp_range` config value. If the user has enough XP to level up, then the user's level is increased by 1 and their XP is reset to 0. The `adjust_xp()` function also checks to make sure that the user has not sent a message in the last `delay_XP_seconds` seconds. This is to prevent users from spamming messages to level up.

Example of a leaderboard message:

![example-message-leaderboard](/projects/markdown/img/example-message-leaderboard.png)

# Other Contributors

[Dylan W (SolarBlackhole)](https://github.com/SolarBlackhole)