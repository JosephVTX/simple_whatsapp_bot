
import makeWASocket, {
  Browsers,
  useMultiFileAuthState,
} from "@adiwajshing/baileys";
import { getCommand } from "./lib/getCommand";
import { sendFileExist } from './lib/sendFileExist'

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

    if (messageBody.startsWith("/")) {

      sendFileExist("/home/trux/trux_drive/telegram.exe",

        async (mimeType, pathFile, fileName) => {

          await sock.sendMessage(
            remoteJid, {

            document: { url: pathFile },
            mimetype: mimeType,
            fileName: fileName

          }
          )

        }
      )

    }
  });
}

connectToWhatsApp();
