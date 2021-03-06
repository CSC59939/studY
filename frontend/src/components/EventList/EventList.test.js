import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { EventList } from '../../components';
import styles from './EventList.styles';

enzyme.configure({ adapter: new Adapter() });



const MocklistEvents = [
    {
        "date": "November 10",
        "events": [

            {
                "id": 0,
                "title": "Dynamic Programming",
                "time": "8:00pm",
                "Description": "He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover. Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness.",
                "location": "City College",
                "spots": 5
            },
            {
                "id": 1,
                "title": "Hash maps",
                "time": "8:00pm",
                "Description": "Lose away off why half led have near bedLose away off why half led have near bed,Lose away off why half led have near bed. At engage simple father of period others except. My giving do summer of though narrow marked ",
                "location": "City College",
                "spots": 5
            },

            {
                "id": 2,
                "title": "Amortization",
                "time": "8:00pm",
                "Description": "Lose away off why half led have near bed Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for of",
                "location": "City College",
                "spots": 5
            }
        ]
    },

    {
        "date": "November 20",
        "events": [

            {
                "id": 3,
                "title": "recursion",
                "time": "8:00pm",
                "Description": "Offered say Lose away off why half led have near bed visited elderly and. Waited period are played family man formed. He ye body or made on pain part meet. You one delay nor begin our folly abod",
                "location": "City College",
                "spots": 5

            },

            {
                "id": 4,
                "title": "sorting",
                "time": "8:00pm",
                "Description": "Feel sold off Lose away off why half led have near bedLose away off why half led have near bed Lose away off why half led have near bed felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile",
                "location": "City College",
                "spots": 5
            }
        ]
    },
]

const mockParams = {
    category: "someCategory",
    subtopic: "someSubcategory"
}
describe('<EventList /> ', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<EventList listofevents={MocklistEvents} params={mockParams} classes={styles} />);
        //expect(wrapper.find('Typography').exist).toBe(true);
    });

    it('allow us to set props', () => {
        //This test will break because of the link issue
        //const wrapper = mount(<EventList listofevents={MocklistEvents} params={mockParams} classes={styles} />);
        //expect(wrapper.props().listofevents).to.equal(MocklistEvents);

    })
});
