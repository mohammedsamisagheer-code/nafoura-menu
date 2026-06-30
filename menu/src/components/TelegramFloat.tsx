import { CONFIG } from "../config"

export default function TelegramFloat() {
  const tgLink = `https://t.me/${CONFIG.phone.replace(/^0+/, "")}`

  return (
    <a
      href={tgLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 left-7 w-[54px] h-[54px] bg-[#2aabee] rounded-full flex items-center justify-center text-2xl z-[800] shadow-lg hover:scale-110 transition-transform"
      title="تحدث معنا"
    >
      ✈
    </a>
  )
}
