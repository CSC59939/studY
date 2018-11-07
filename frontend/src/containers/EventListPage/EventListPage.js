import React, { Component } from 'react';
import { EventList } from '../../components';
import { fetchAllEvents, fetchEventByTopic } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';
import moment from 'moment';

class EventListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            topicid: '',
            listofevents: [],
            createEventModal: false,
        }
        this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
        this.handleCreateModalOpen = this.handleCreateModalOpen.bind(this);

    }
    static contextType = AuthContext;

    componentWillMount() {
        const id = this.props.match.params.subtopic;
        if (this.props.match.params) {
            fetchEventByTopic(id).then(response => {
                console.log(response)
                this.setState({ events: response.results })
                this.arangeEventsByDates(response.results);
            });
        }

    }

    componentDidMount() {
        document.body.style.background = 'rgb(245, 247, 249)';
    }

    componentWillUnmount() {
        document.body.style.background = 'white';
    }


    arangeEventsByDates(eventsArray) {
        //var date1 = new Date('2018-10-28T05:50:22.715000Z').getDate();
        //var date = new Date('2018-10-28T05:50:22.715000Z').getMonth();
        //var monthName = moment.months(monthNum - 1); get month name.
        let results = []
        if (eventsArray.length) {
            let date = new Date(eventsArray[0].time).getMonth();
            //console.log(date)
            let eventformat = {
                date: moment.months(date),
                events: []

            }
            eventsArray.map((eventObject, i) => {
                //console.log(eventObject);
                if (date === new Date(eventObject.time).getMonth()) {
                    eventformat.events.push(eventObject);
                }
                else {
                    const oldEventFormat = eventformat;
                    date = new Date(eventObject.time).getMonth();
                    eventformat = {
                        date: moment.months(date),
                        events: [eventObject]
                    }
                    results.push(oldEventFormat);
                }
            })
            results.push(eventformat)
        }
        this.setState({ listofevents: results });
    }

    handleCreateModalClose() {
        this.setState({ createEventModal: false })
    }

    handleCreateModalOpen() {
        this.setState({ createEventModal: true })
    }

    render() {
        const { listofevents, createEventModal } = this.state;
        return (
            <div>
                <EventList 
                listofevents={listofevents} 
                params={this.props.match.params} 
                createEventModal={createEventModal}
                handleClose={this.handleCreateModalClose}
                handleOpen={this.handleCreateModalOpen} />
            </div>
        )
    }

}

export default EventListPage;


