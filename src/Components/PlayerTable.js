import React, { useContext, useEffect, useState } from 'react'
import { List, Popup, Table } from 'semantic-ui-react';
import { AppContext } from '../Context/AppContext';
import ConfirmDialog from '../Modal/ConfirmDialog';
import EditDialog from '../Modal/EditDialog';
import { escapeRegExp, filter } from "lodash"

const PlayerTable = ({ searchString }) => {
  const {players, setPlayers, playersActionIndex, setPlayersActionIndex} = useContext(AppContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [localPlayers, setLocalPlayers] = useState(false)

  useEffect(() => {
    if (searchString.length < 1) return setLocalPlayers(players)

    const re = new RegExp(escapeRegExp(searchString), 'i')
    const isMatch = (result) => re.test(result['Player Name'])

    setLocalPlayers(filter(players, isMatch))
  }, [searchString, players])


  const actionPanel = (index) => {
    return (
      <>
        <div className="card bg-neutral mb-13">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 text-xl"><h2 className="text-stone-50 text-xl font-semibold leading-7">Actions</h2></div>
            <div className="text-right" onClick={() => document.getElementById('fake-click').click()}><i className="fa-solid fa-close text-xl text-stone-300"></i></div>
          </div>

          <List>
            <List.Item
              onClick={() => { setPlayersActionIndex(index); document.getElementById('fake-click').click(); setIsEditModalOpen(true) }}
              className='mb-3.5'
              icon={<i className="fa-solid fa-pencil text-sm text-stone-300 icon"></i>}
              content={<div className="text-stone-300 text-base leading-5 self-stretch whitespace-nowrap">
                Edit Player
              </div>}
            />
            <List.Item
              onClick={() => { setPlayersActionIndex(index); document.getElementById('fake-click').click(); setIsConfirmModalOpen(true) }}
              className='mb-3.5'
              icon={<i className="fa-solid fa-trash-alt text-sm text-stone-300 icon"></i>}
              content={<div className="text-stone-300 text-base leading-5 self-stretch whitespace-nowrap">
                Delete Player
              </div>}
            />
          </List>
        </div>

      </>
    )
  }

  const handleSuccessDelete = () => {
    setIsConfirmModalOpen(false)
    const tempArr = [...players];
    tempArr.splice(playersActionIndex, 1);
    setPlayers(tempArr);
    setLocalPlayers(tempArr)
  }


  return (
    <div className="flex flex-col items-stretch">
      <div id='fake-click'></div>
      <Table className='!bg-transparent'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Player Name</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Jersey Number</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Starter</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Position</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Height</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Weight</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Nationality</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Appearances</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'>Minutes Played</Table.HeaderCell>
            <Table.HeaderCell className='!bg-transparent !text-stone-300 text-xs font-medium leading-5 self-stretch'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {localPlayers && localPlayers.map((info, i) => (<Table.Row>
            <Table.Cell key={i}>
              <div className="flex items-center">
                <img
                  loading="lazy"
                  srcSet={info['Flag Image']} className="aspect-square object-contain object-center w-[26px] overflow-hidden self-stretch shrink-0 max-w-full rounded-[50%]"
                  alt="Player Avatar"
                />
                <div className='ml-1 text-stone-300 text-sm font-medium'>
                  <strong>{info['Player Name']}</strong>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Jersey Number']}</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Starter']}</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Position']}</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{(info['Height'] / 100).toFixed(2)} m</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Weight']} kg</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Nationality']}</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Appearances']}</div></Table.Cell>
            <Table.Cell><div className="text-stone-300 text-sm font-medium leading-5 mt-2.5 self-start">{info['Minutes Played']}</div></Table.Cell>
            <Table.Cell>
              <Popup
                trigger={<i className="fa-solid fa-ellipsis text-stone-300"></i>}
                content={actionPanel(i)}
                on='click'
                hideOnScroll
                position="bottom right"
                className='!bg-zinc-800 w-72'
              />
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ConfirmDialog visible={isConfirmModalOpen} handleClose={() => setIsConfirmModalOpen(false)} handleSuccess={handleSuccessDelete} />
      <EditDialog visible={isEditModalOpen} handleClose={() => setIsEditModalOpen(false)} />
    </div>
  )
}

export default PlayerTable