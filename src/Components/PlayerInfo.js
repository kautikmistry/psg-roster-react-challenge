import React from 'react'

const PlayerInfo = ({ playerInfo }) => {

    const stats = (key) => {
        return (
            <div className="column text-stone-300 text-sm">
                <div className="text-amber-500 text-2xl font-semibold whitespace-nowrap">
                    {playerInfo[key]}
                </div>
                <div className="text-stone-300 text-xs whitespace-nowrap mt-3">
                    {key}
                </div>
            </div>
        )
    }

    return (
        <div className="h-full rounded bg-neutral-800 flex flex-col px-7 py-7 max-md:px-5">
            <header className="header relative flex justify-center w-full max-md:pr-5">
                <div className="text-stone-700 absolute top-0 left-1 text-9xl font-semibold leading-[100px] opacity-50 max-md:text-4xl max-md:leading-10">
                    {playerInfo['Jersey Number']}
                </div>
                <div className="absolute top-8 left-3">
                    <span className="text-amber-500 text-5xl font-semibold w-1/2 text-center">{playerInfo['Jersey Number']}</span>
                </div>
                <div className={`h-full w-full  text-white text-center grid bg-contain bg-no-repeat h-full`}
                    style={{ backgroundImage: "linear-gradient(0deg, rgb(38 38 38 / var(--tw-bg-opacity)) 0%, rgba(255,255,255,0) 100%), url(" + playerInfo['Player Image'] + "" , backgroundPosition: 'center', minHeight: 258 }}>
                    <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-0 w-full h-full"></div>
                    <div className="col-start-1 row-start-1 mx-auto my-auto absolute bottom-0">
                        <div className="relative text-white text-start text-3xl font-medium whitespace-nowrap mt-40 max-md:mt-10">
                            {playerInfo['Player Name']}
                        </div>
                        <div className="relative text-amber-500 text-start text-2xl font-semibold whitespace-nowrap">
                            {playerInfo['Position']}
                        </div>
                    </div>
                </div>
            </header>

            <div className="ui grid">
                <div className="three column row mt-7 max-md:justify-center">
                    <div className="four wide column text-stone-300 text-sm">Height</div>
                    <div className="four wide column text-stone-300 text-sm">Weight</div>
                    <div className="column text-stone-300 text-sm">Nationality</div>
                </div>
                <div className="three column row">
                    <div className="four wide column">
                        <div className="text-stone-50 text-base font-medium whitespace-nowrap">
                            {playerInfo['Height'] / 100}
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="text-stone-50 text-base font-medium self-stretch whitespace-nowrap">
                            {playerInfo['Weight']}
                        </div>
                    </div>
                    <div className="column">
                        <div className="self-stretch flex items-stretch justify-between gap-2.5">
                            <img
                                alt=''
                                srcSet={playerInfo['Flag Image']}
                                className="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                            />
                            <div className="text-stone-50 text-base font-medium grow whitespace-nowrap self-start">
                                {playerInfo['Weight']}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-zinc-700 shrink-0 h-px mt-6" />
            <div className="ui grid">
                <div className="two column row mt-7 max-md:justify-center">
                    {stats(playerInfo['Position'] === "Goalkeeper" ? "Clean Sheets" : String("Goals "))}
                    {stats(playerInfo['Position'] === "Goalkeeper" ? "Saves" : "Assists")}
                </div>
                <div className="two column row">
                    {stats('Appearances')}
                    {stats('Minutes Played')}
                </div>
            </div>
        </div>
    )
}

export default PlayerInfo