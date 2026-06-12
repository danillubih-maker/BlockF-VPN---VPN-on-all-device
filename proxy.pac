function FindProxyForURL(url, host) {
    if (
        shExpMatch(host, "*.discord.com") || 
        shExpMatch(host, "*.discordapp.com") || 
        shExpMatch(host, "*.discordapp.net") ||
        shExpMatch(host, "*.whatsapp.com") || 
        shExpMatch(host, "*.whatsapp.net") ||
        shExpMatch(host, "*.telegram.org") || 
        shExpMatch(host, "*.t.me") ||
        shExpMatch(host, "*.instagram.com") || 
        shExpMatch(host, "*.cdninstagram.com") ||
        shExpMatch(host, "*.youtube.com") || 
        shExpMatch(host, "*.googlevideo.com") ||
        shExpMatch(host, "*.ytimg.com") ||
        shExpMatch(host, "*.roblox.com") || 
        shExpMatch(host, "*.rbxcdn.com") ||
        shExpMatch(host, "*.facebook.com") || 
        shExpMatch(host, "*.fbcdn.net")
    ) {
        return "PROXY ://racielhernandez.com; DIRECT";
    }
    return "DIRECT";
}
