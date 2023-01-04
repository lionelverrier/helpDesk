import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {getTicket, closeTicket} from '../../features/tickets/ticketSlice';
import { getNotes, createNote, reset as notesReset } from '../../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/backButton';
import Spinner from '../../components/spinner';
import NoteItem from '../../components/noteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function Ticket(){
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.ticket)

  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const {ticketId} = useParams()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId,])

  //Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  //Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }

  //Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if(isLoading || notesIsLoading){
    return <Spinner />
  }
  if(isError){
    return <h3>Something aint right</h3>
  }
  return <div className='ticket-page'>
    <header className="ticket-header">
      <BackButton url='/tickets' />
      <h2>
        Ticket ID: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
      </h2>
      <h3>
        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-us')}
      </h3>
      <h4>
        Product: {ticket.product}
      </h4>
      <hr />
      <div className="ticket-desc">
        <h3>Description of Issue</h3>
        <p>{ticket.description}</p>
      </div>
      <h2>Notes</h2>
    </header>

    {ticket.status !== 'closed' ?
    <button
      onClick={openModal}
      className='btn'>
      <FaPlus /> Add Note
    </button>
      : null }

      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name='noteText'
              id='noteText'
             className='form-control'
             placeholder='Note Text'
             value={noteText}
             onChange={(e) =>(setNoteText(e.target.value))}>

             </textarea>
          </div>
          <div className="form-group">
            <button className='btn' type='submit'> Submit </button>
          </div>
        </form>
      </Modal>

    {notes.map((notes) => (
      <NoteItem
      key={notes._id}
      note={notes} />
    ))}

    {ticket.status !== 'closed' ?
    <button
      onClick={onTicketClose}
      className="btn btn-block btn-danger"> Close Ticket
    </button>
      : null }
  </div>

};

export default Ticket;
