async function flags(target) {
  let Flags = await target.user.fetchFlags();
  Flags = Flags.toArray();

  let FlagsArray = []

  const badgearray = [
    'DISCORD_EMPLOYEE',
    'PARTNERED_SERVER_OWNER',
    'HYPESQUAD_EVENTS',
    'BUG_HUNTER_LEVEL_1',
    'HOUSE_BRAVERY',
    'HOUSE_BRILLIANCE',
    'HOUSE_BALANCE',
    'EARLY_SUPPORTER',
    'TEAM_USER',
    'BUG_HUNTER_LEVEL_2',
    'VERIFIED_BOT',
    'EARLY_VERIFIED_BOT_DEVELOPER'
  ]

  const badgeemoji = [
    '<:DISCORD_EMPLOYEE:876931834225754152>',
    '<:PARTNERED_SERVER_OWNER:876930028225560626>',
    '<:HYPESQUAD_EVENTS:876932191446245377>',
    '<:BUG_HUNTER_LEVEL_1:876930771313647636>',
    '<:HOUSE_BRAVERY:876932445931462676>',
    '<:HOUSE_BRILLIANCE:876932706330611822>',
    '<:HOUSE_BALANCE:876932955182882817>',
    '<:EARLY_SUPPORTER:876931347799769129>',
    '<:TEAM_USER:876933196833488896>',
    '<:BUG_HUNTER_LEVEL_2:876931417249034250>',
    '<:VERIFIED_BOT:876931592604508220>',
    '<:EARLY_VERIFIED_BOT_DEVELOPER:876933471719792671>'
  ]

  for (let i = 0; i < 19; i++) {

    if (Flags.includes(badgearray[i])) {
      FlagsArray.push(badgeemoji[i]);
    }
  }
  
  if (!FlagsArray.join(" ")) return 'ㅤ'
  return FlagsArray.join(" ");
}

module.exports = flags
