// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFav: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFav} = this.state
    this.setState({
      isFav: !isFav,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFav} = this.state
    if (isFav) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFav} = this.state
    const filterClassName = isFav ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg1">
        <div className="bg2">
          <div className="bg3">
            <div className="min1">
              <h1 className="head">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title-element" className="title-label">
                  TITLE
                </label>
                <input
                  onChange={this.onChangeTitle}
                  type="text"
                  className=""
                  id="title-element"
                  placeholder="Title"
                  value={titleInput}
                />
                <br />
                <label htmlFor="date-element" className="title-label">
                  DATE
                </label>
                <input type="date" id="date-element" value={dateInput} />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="min2">
              <img
                className="image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-head-container">
            <h1 className="appointments">Appointments</h1>
            <button
              className={`starred ${filterClassName}`}
              type="button"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
