import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import RosterDetails from "./RosterDetails";
import { filter, groupBy } from "lodash"
import Field from "../resources/field.png"
import playerGroup from "../resources/player-group.png"
import playerGroupOR from "../resources/player-group-or.png"
import PlayerInfo from "./PlayerInfo";

function FormationOverview() {
    const { players } = useContext(AppContext);
    const [occurences, setOccurences] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState([])
    const [formationResult, seformationResult] = useState('')
    let formationPosition = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
    let count = 0

    useEffect(() => {
        if (players && players.length > 0) {
            let filteredArray = filter(players, { 'Starter': 'Yes' });
            setOccurences(filteredArray)
            let groupByformationResult = groupBy(filteredArray, 'Position');
            seformationResult(groupByformationResult)
            setSelectedPlayer(groupByformationResult['Goalkeeper'][0])
        }
    }, [players])

    const ErrorMessage = ({ errorTitle, errorDescription }) => {
        return (
            <div className="relative top-[40%] left-[40%] items-center shadow-lg bg-zinc-800 flex w-[389px] max-w-full flex-col mr-11 mt-3 mb-10 p-6 rounded-lg max-md:mr-2.5 max-md:my-10 max-md:px-5">
                <div className="justify-center items-center flex w-[209px] max-w-full gap-2">
                    <div className="text-amber-500 text-lg font-black leading-6 whitespace-nowrap my-auto">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div className="text-stone-50 text-lg font-semibold self-stretch whitespace-nowrap">
                        {errorTitle}
                    </div>
                </div>
                <div className="text-stone-300 text-center text-base leading-6 self-stretch mt-2">
                    {errorDescription}
                </div>
            </div>
        )
    }

    const setDynamicClass = (index) => {
        switch (index) {
            case 0:
                return "justify-start"
            case 1:
                return "pl-10 justify-center"
            case 2:
                return "justify-end"
            default :
             return ""
        }
    }

    return (
        <div className="self-center flex grow basis-[0%] flex-col  h-full">
            <div className="flex w-full items-stretch justify-between gap-12 pr-10 max-md:max-w-full max-md:flex-wrap max-md:pr-5 mt-11">
                <RosterDetails />
            </div>
            <div className="bg-zinc-800 flex flex-col items-stretch mt-6 pt-3.5 pb-12 px-5 rounded-lg max-md:max-w-full overflow-auto h-full mb-11 mr-11">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 h-full">
                    <div className="flex flex-col items-stretch w-[72%] max-md:w-full max-md:ml-0">
                        <div className="overflow-hidden relative h-full justify-center px-5 py-12 items-end max-md:max-w-full max-md:mt-10">
                            <img src={Field} loading="eager" className="absolute h-full w-full object-fill object-center inset-0" />
                            {occurences && occurences.length == 0 &&
                                <ErrorMessage errorTitle={'No player data found'} errorDescription={'Please importer your roster first'} />
                            }
                            {occurences && occurences.length > 0 && occurences.length < 11 &&
                                <ErrorMessage errorTitle={'Not enough starters'} errorDescription={'Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation'} />
                            }
                            {occurences && occurences.length > 11 &&
                                <ErrorMessage errorTitle={'There are too many starters'} errorDescription={'Your team has too many starters for one or more of the positions in the 4-3-3 formation.'} />
                            }

                            {occurences && occurences.length === 11 && <div className="relative grid grid-cols-5 h-full">
                                <div className="text-white flex items-center">
                                    <div className="flex grow basis-[0%] flex-col items-center" onClick={(e) => setSelectedPlayer(formationResult['Goalkeeper'][0])}>
                                        <div style={{ backgroundImage: `url(${playerGroupOR})`, backgroundSize: 'contain', width: '32px', height: '32px' }} className="text-stone-50 text-center text-base font-semibold whitespace-nowrap stroke-[2px] aspect-square justify-center items-stretch py-1.5 rounded-[50%]" >
                                            {formationResult['Goalkeeper'][0]['Jersey Number']}
                                        </div>
                                        <div style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.20)' }} className="text-stone-50 text-center text-base font-medium self-stretch whitespace-nowrap mt-1">
                                            {formationResult['Goalkeeper'][0]['Player Name']}
                                        </div>
                                    </div>
                                </div>
                                {[4, 3, 3].map((formation, index) => (
                                    <div key={index} className="text-white flex items-center flex-col flex-col-reverse">
                                        {[...Array(formation)].map((arr, j) => (
                                            <div key={j} className={`flex grow basis-[0%] flex-col items-center ${index === 2 ? setDynamicClass(j) : "justify-center"}`} id={count} onClick={(e) => setSelectedPlayer(formationResult[formationPosition[index + 1]][j])}>
                                                <div style={{ backgroundImage: `url(${playerGroup})`, backgroundSize: 'contain', width: '32px', height: '32px' }} className="text-stone-50 text-center text-base font-semibold whitespace-nowrap stroke-[2px] aspect-square justify-center items-stretch py-1.5 rounded-[50%]" >
                                                    {formationResult[formationPosition[index + 1]][j]['Jersey Number']}
                                                </div>
                                                <div style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.20)' }} className="text-stone-50 text-center text-base font-medium self-stretch whitespace-nowrap mt-1">
                                                    {formationResult[formationPosition[index + 1]][j]['Player Name']}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <div className="text-white"></div>
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch w-[25%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="rounded bg-neutral-800 flex flex-col w-full mx-auto max-md:mt-10 h-full">
                            {occurences && occurences.length === 11 && <PlayerInfo playerInfo={selectedPlayer} />}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FormationOverview;