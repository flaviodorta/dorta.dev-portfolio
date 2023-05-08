export const SoundIcon = ({ isSoundOn }: { isSoundOn: boolean }) => {
  return (
    <div className="relative group container">
      {isSoundOn ? (
        <>
          <div className="transition-colors group-hover:bg-primary duration-[10ms] bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[150ms] bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[200ms] bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[250ms] bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[300ms] bar"></div>
        </>
      ) : (
        <>
          <div className="transition-colors group-hover:bg-primary duration-[100ms] stopped-bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[100ms] stopped-bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[200ms] stopped-bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[250ms] stopped-bar"></div>
          <div className="transition-colors group-hover:bg-primary duration-[300ms] stopped-bar"></div>
        </>
      )}
    </div>
  )
}
