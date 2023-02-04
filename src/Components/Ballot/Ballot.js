import React from 'react';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import "./Ballot.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from 'react-modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Ballot = () => {
  const l=5
  let initialState = {};
  let subtitle;
  const [apiData, setApiData] = React.useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    fetch('/api/getBallotData', {
      mode: "no-cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setApiData(data.items)
      }).catch((err) => {
        console.log("error occured to fetch the data", err)
      })

  }, [])

  const handleClick = (e, value, category) => {
    console.log("clicked & value", value, category)
    initialState[category] = value
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    console.log("called")
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const onSubmit = (e) => {
    e.preventDefault()
    openModal();
    console.log("initial state", initialState)
    window.alert(`value is ${JSON.stringify(initialState)}`)
  }

  return (
    <div className='ballot' style={{ padding: "20px" }}>
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2>Hi! Welcome. You Have Succeessfully Submited the Ballot</h2>
        <Typography>Success</Typography>

        <Button color='error' variant='outlined' onClick={closeModal}>Close</Button>
      </Modal>
      {
        apiData?.map((item, index) => {
          return (
            <div key={index} value={item.id}>
              <p className='header2'>{item.id}</p>
              <form>
                <Grid container spacing={2}>

                  {item?.items?.map((val, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={val.id} value={val.id} id={val.id}>
                        <div class="card" onClick={(e) => { handleClick(e, val.id, item.id) }}>
                          <input type="radio" name="pricing" id="card1"/>
                            <label for="card1">
                            <Typography variant="h6">
                              {val.title}
                              <br />
                            </Typography>
                            <img src={val.photoUrL} alt="photo not found" width="90%" />
                            </label>
                        </div>
                      </Grid>
                    )
                  })}
                </Grid>
              </form>
            </div>
          )
        })
      }
      <br /><br />
      <Button onClick={(e) => { onSubmit(e) }} color='success' size='large' variant='contained'>Submit Ballot</Button>
  
    </div>
  )
}

export default Ballot;