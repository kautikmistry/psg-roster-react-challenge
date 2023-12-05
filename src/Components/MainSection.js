import React, { useContext, useState, useRef } from 'react'
import { Icon } from 'semantic-ui-react'
import { AppContext } from '../Context/AppContext'
import ImporterModal from '../Modal/ImporterModal'
import PlayerTable from './PlayerTable'
import RosterDetails from './RosterDetails'

const MainSection = () => {
    const inputRef = useRef(null);
    const { players } = useContext(AppContext);
    const [isImporterModalOpen, setIsImporterModalOpen] = useState(false)
    const [searchString, setSearchString] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    return (
        <div className="self-center flex grow basis-[0%] flex-col  h-full">
            <div className="flex w-full items-stretch justify-between gap-12 pr-10 max-md:max-w-full max-md:flex-wrap max-md:pr-5 mt-11">
                <RosterDetails />
                <div className="items-stretch flex justify-between gap-2">
                    <div className="border border-[color:var(--borders-default,#494949)] flex justify-between gap-2.5 rounded-lg border-solid max-md:pr-5 player-search">
                        <div className="ui action left icon input">
                            <Icon name='search' className='text-neutral-400 text-sm font-black leading-4 mt-1' />
                            <input ref={inputRef} onChange={(e) => {
                                e.target.value ? setIsSearch(true) : setIsSearch(false)
                            }}
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        e.preventDefault()
                                        setSearchString(inputRef.current.value)
                                    }
                                    if (e.code === "Escape") {
                                        e.preventDefault()
                                        inputRef.current.value = "";
                                        setSearchString("")
                                    }
                                }}
                                type="text" placeholder="Find Player"></input>
                            {isSearch && !searchString && <div onClick={() => { setSearchString(inputRef.current.value) }} className="ui button !bg-transparent !text-amber-500">Search</div>}
                            {isSearch && searchString && <div onClick={() => { inputRef.current.value = ""; setSearchString("") }} className="ui button !bg-transparent !text-stone-300"><i class="fa-solid fa-xmark"></i></div>}
                        </div>
                    </div>
                    <div onClick={() => setIsImporterModalOpen(true)} className={`text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch grow px-5 py-3 rounded-lg ${!players.length == 0 ? 'text-neutral-500 bg-zinc-800 border border-[color:var(--borders-default,#494949)]' : 'text-stone-50 bg-amber-500'}`}>
                        {players.length === 0 ? 'Import Team' : 'Re-Import Team'}
                    </div>
                </div>
            </div>
            <div className="bg-zinc-800 flex flex-col items-stretch mt-6 pt-3.5 pb-12 px-5 rounded-lg max-md:max-w-full overflow-auto h-full mb-11 mr-11">
                {players.length > 0 ?
                    <PlayerTable searchString={searchString} /> :
                    <>
                        <div className="text-stone-300 text-sm leading-5 self-center whitespace-nowrap mt-56 max-md:mt-10">
                            You do not have any players on the roster
                        </div>
                        <div onClick={() => setIsImporterModalOpen(true)} className="text-amber-500 text-sm font-medium leading-5 self-center whitespace-nowrap mt-4 mb-52 max-md:mb-10">
                            Import Team
                        </div>
                    </>}
            </div>
            <ImporterModal visible={isImporterModalOpen} handleClose={() => setIsImporterModalOpen(false)} />
        </div>
    )
}

export default MainSection