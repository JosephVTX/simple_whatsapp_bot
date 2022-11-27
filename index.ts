import makeWASocket, {
  Browsers,
  useMultiFileAuthState,
} from "@adiwajshing/baileys";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_whatsapp");

  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    browser: Browsers.macOS("Desktop"),
  });

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "close") {
      saveCreds();
      connectToWhatsApp();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const messageBody = messages[0].message?.conversation;
    const remoteJid = messages[0].key.remoteJid;

    if (messageBody === "Hi")
      await sock.sendMessage(remoteJid, { text: "Hello Human" });
  });
}

connectToWhatsApp();
