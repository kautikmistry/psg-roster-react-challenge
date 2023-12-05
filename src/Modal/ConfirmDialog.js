import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const ConfirmDialog = ({ visible, handleClose, handleSuccess }) => {
    return (
        <Modal open={visible} className='rounded-l !bg-zinc-800' size='mini'>
            <Modal.Header className='!bg-zinc-800 !text-stone-50 text-lg font-semibold leading-7'>Are you sure? <i onClick={() => handleClose()}  className="fa-solid fa-close text-xl text-stone-300 float-right"></i> </Modal.Header>
            <Modal.Content className='!bg-zinc-800'>
                <p className="self-stretch text-stone-300 text-sm leading-6 mt-7">
                    This action cannot be undone.
                </p>
            </Modal.Content>
            <Modal.Actions className='!bg-zinc-800'>
                <Button className="!text-stone-300 !bg-transparent !text-sm !font-medium leading-5 !whitespace-nowrap justify-center items-stretch !border !border-[color:var(--borders-default,#494949)] grow px-5 py-3 !rounded-lg !border-solid" onClick={() => handleClose()}>
                    Cancel
                </Button>
                <Button cclassName="!text-stone-50 !text-sm !font-medium leading-5 !whitespace-nowrap justify-center items-stretch !bg-red-600 grow px-5 py-3 !rounded-lg" negative onClick={() => handleSuccess()}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmDialog