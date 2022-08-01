import { Modal } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { modalState$ } from '../../redux/selectors'

export default function CreatePostModal() {
    const body = 'this is body model'
    debugger
    const {isShow} = useSelector(modalState$);

    return (
        <div>
            <Modal
                open={isShow}
            >
                {body}
            </Modal>
        </div>
    )
}
