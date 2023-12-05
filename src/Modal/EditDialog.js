import React, { useContext, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { Formik, Field, Form } from 'formik';
import { AppContext } from '../Context/AppContext';
import { isEqual } from "lodash"

const EditDialog = ({ visible, handleClose, handleSuccess }) => {
    const {players, setPlayers, playersActionIndex, setPlayersActionIndex} = useContext(AppContext);
    const [isFromUpdated, setIsFromUpdated] = useState(false)

    const handleOnChange = (event) => {
        if (isEqual(event.target.value, players[playersActionIndex][event.target['name']].toString())) {
            setIsFromUpdated(false)
        } else {
            setIsFromUpdated(true)
        }
    };

    const handleUpdatePlayer = (values) => {
        // setPlayers([...players, ...values])
        const updatedAreas = [...players];
        updatedAreas[playersActionIndex]['Player Name'] = values['Player Name'];
        updatedAreas[playersActionIndex]['Jersey Number'] = values['Jersey Number'];
        updatedAreas[playersActionIndex]['Weight'] = values['Weight'];
        updatedAreas[playersActionIndex]['Height'] = values['Height'];
        updatedAreas[playersActionIndex]['Nationality'] = values['Nationality'];
        updatedAreas[playersActionIndex]['Position'] = values['Position'];
        updatedAreas[playersActionIndex]['Starter'] = values['Starter'];
        setPlayers(updatedAreas);
        handleClose()
    }

    return (
        <Modal open={visible} className='rounded-l !bg-zinc-800' size='tiny'>
            <Formik
                initialValues={players[playersActionIndex]}
                onSubmit={async (values) => {
                    handleUpdatePlayer(values);
                }}
            >
                <Form onChange={handleOnChange}>
                    <div className="items-end shadow-lg bg-zinc-800 flex flex-col px-6 rounded-lg max-md:px-5">
                        <header className="justify-between items-stretch self-stretch flex gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
                            <h2 className="text-stone-50 text-lg font-semibold leading-7">Edit Player</h2>
                            <i onClick={() => handleClose()} className="fa-solid fa-close text-xl text-stone-300 float-right"></i>
                        </header>
                        <div className="items-stretch self-stretch flex justify-between gap-4 mt-6 max-md:max-w-full max-md:flex-wrap">
                            <div className="items-stretch flex grow basis-[30%] flex-col">
                                <label htmlFor="player-name" className="text-white text-sm font-medium leading-5 whitespace-nowrap">Player Name</label>
                                <Field id="playerName" className="!bg-transparent !text-stone-300 text-sm font-medium leading-5 whitespace-nowrap border border-[color:var(--borders-default,#494949)] mt-2 px-4 py-3 rounded-lg border-solid items-start" name="Player Name" placeholder="Player Name" />
                            </div>
                            <div className="items-stretch flex grow basis-[0%] flex-col">
                                <label htmlFor="jersey-number" className="text-white text-sm font-medium leading-5 whitespace-nowrap">Jersey Number</label>
                                <Field type="number" id="jersey-number" className="!bg-transparent !text-stone-300 text-sm font-medium leading-5 whitespace-nowrap border border-[color:var(--borders-default,#494949)] mt-2 px-4 py-3 rounded-lg border-solid items-start" name="Jersey Number" placeholder="Jersey Number" />
                            </div>
                        </div>
                        <div className="items-stretch self-stretch flex justify-between gap-4 mt-4 max-md:max-w-full max-md:flex-wrap">
                            <div className="items-stretch flex grow basis-[0%] flex-col">
                                <label htmlFor="height" className="text-white text-sm font-medium leading-5 whitespace-nowrap">Height</label>
                                <Field id="height" type="number" className="!bg-transparent !text-stone-300 text-sm font-medium leading-5 whitespace-nowrap border border-[color:var(--borders-default,#494949)] mt-2 px-4 py-3 rounded-lg border-solid items-start" name="Height" placeholder="Height" />
                            </div>
                            <div className="items-stretch flex grow basis-[0%] flex-col">
                                <label htmlFor="weight" className="text-white text-sm font-medium leading-5 whitespace-nowrap">Weight</label>
                                <Field id="weight" type="number" className="!bg-transparent !text-stone-300 text-sm font-medium leading-5 whitespace-nowrap border border-[color:var(--borders-default,#494949)] mt-2 px-4 py-3 rounded-lg border-solid items-start" name="Weight" placeholder="Weight" />
                            </div>
                        </div>
                        <label htmlFor="nationality" className="text-white text-sm font-medium leading-5 self-stretch whitespace-nowrap mt-4 max-md:max-w-full">Nationality</label>
                        <Field className=" !bg-transparent !text-stone-300 justify-between items-stretch self-stretch border border-[color:var(--borders-default,#494949)] flex gap-5 mt-2 px-3 py-3 rounded-lg border-solid max-md:max-w-full max-md:flex-wrap" as="select" name="Nationality">
                            <option value="Costa Rican">Costa Rican</option>
                            <option value="Morocco">Morocco</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Brazilian">Brazilian</option>
                            <option value="Italian">Italian</option>
                            <option value="Argentinian">Argentinian</option>
                        </Field>
                        <label htmlFor="position" className="text-white text-sm font-medium leading-5 self-stretch whitespace-nowrap mt-4 max-md:max-w-full">Position</label>
                        <Field className="!bg-transparent !text-stone-300 justify-between items-stretch self-stretch border border-[color:var(--borders-default,#494949)] flex gap-5 mt-2 px-3 py-3 rounded-lg border-solid max-md:max-w-full max-md:flex-wrap" as="select" name="Position">
                            <option value="Goalkeeper">Goalkeeper</option>
                            <option value="Defender">Defender</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Forward">Forward</option>
                        </Field>
                        {/* </div> */}
                        <div className="text-white text-sm font-medium leading-5 whitespace-nowrap mt-4 self-start">Starter</div>
                        <div className="items-stretch flex w-[116px] max-w-full gap-4 mt-4 self-start">
                            <div role="group" aria-labelledby="my-radio-group">
                                <label className='items-center justify-between !bg-transparent !text-stone-300'>
                                    <Field className="mr-2" type="radio" name="Starter" value="No" />
                                    No
                                </label>
                                <label className='items-center justify-between ml-2 !text-stone-300'>
                                    <Field className="mr-2" type="radio" name="Starter" value="Yes" />
                                    Yes
                                </label>
                            </div>
                        </div>
                        <button className={`text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch w-[114px] max-w-full my-6 px-5 py-3 rounded-lg self-end ${!isFromUpdated ? 'text-neutral-500 bg-zinc-800' : 'text-stone-50 bg-amber-500'}`}>Edit Player</button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default EditDialog