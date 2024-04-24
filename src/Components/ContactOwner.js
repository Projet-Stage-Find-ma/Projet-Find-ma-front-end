import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ContacterOwner(props) {
  const [show, setShow] = useState(false);
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("")
  const [confirmation,setConfirmation]=useState("")

  const handleClose = () => {setShow(false)
  setConfirmation("")};
  const handleShow = () => setShow(true);
 async function handleSubmit(e)
  { 
   
    e.preventDefault();
    
    const ownerEmail=props.ownerEmail
    
    try {
      const response= await axios.post("http://localhost:3002/api/contacterOwner",{email:email,message:message,ownerEmail:ownerEmail}) 
    
        setConfirmation(response.data.message)
       
    
    }catch(error)
    {
       setConfirmation("un erreur lors d'envoi")
       console.error(error)
    }

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Contacter Propriétaire
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Contacter Propiétaire</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
        <Modal.Body>
   {confirmation && <p className='alert alert-success mb-3'>{confirmation}</p>}
  <div className="form-group row">
    <label  className="col-sm-2 col-form-label">Email:</label>
    <div className="col-sm-10">
      <input type="text" className="form-control mb-3" onChange={(e)=>{setEmail(e.target.value)}}/>
    </div>
  </div>
  <div className="form-group row">
    <label className="col-sm-2 col-form-label" >Message</label>
    <div className="col-sm-10">
      
      <textarea className="form-control" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
    </div>
  </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <button type="submit" className='btn btn-primary' >Envoyer</button> 
        </Modal.Footer>
        </form>
      </Modal>
      
    </>
  );
}

export default ContacterOwner;