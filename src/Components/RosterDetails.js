import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import { useLocation } from "react-router-dom";

const RosterDetails = () => {
    const { formationName, setFormationName } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const location = useLocation();
    // Get current path
    const path = location.pathname;
    return (
        <div className="items-stretch flex basis-[0%] flex-col pr-1.5">
            <div className="text-amber-500 text-sm font-medium leading-5 whitespace-nowrap">
                {path === "/formation-overview" ? "Formation Overview" : "Roster Details"}
            </div>
            <div className="items-stretch flex justify-between gap-3.5">
                <div className="text-stone-50 text-lg font-semibold leading-6">
                    {/* My Team */}
                    <input placeholder='My Team' value={formationName} disabled={path === "/formation-overview" ? true : false} className='!bg-transparent formation-name text-lg' onBlur={() => setIsEdit(false)} onFocus={() => setIsEdit(true)} onChange={(e) => setFormationName(e.target.value)} />
                </div>
                {(!formationName || isEdit) && path === "/" && <div className="text-stone-50 text-sm font-black leading-4 self-center whitespace-nowrap my-auto">
                    <i className="fa-solid fa-pen"></i>
                </div>}
            </div>
        </div>
    )
}

export default RosterDetails