interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden">
      <img src={props.bannerUrl} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
        <strong className="text-white block">{props.title}</strong>
        <span className="text-zinc-400 block">{props.adsCount || "0"} anúncio(s)</span>
      </div>
    </a>
  );
}
