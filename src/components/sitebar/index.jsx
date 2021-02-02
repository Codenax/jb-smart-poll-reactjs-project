import React from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody ,ModalFooter} from 'reactstrap'
import PollList from './poll-list'
import PollForm from '../poll-form/index'


class Sitebar extends React.Component {

    state = {
        openModal: false,
    }
    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    };

    render() {
        return (
            <div style={{ background: '#efefef', padding: '10px' }}>

                <div className='d-flex mb-5'>
                    <Input type='search' placeholder='Search' value={this.props.searchTerm} onChange={e => this.props.handleSearch(e.target.value)} />

                    <Button
                        color='success'
                        className='ml-2'
                        onClick={this.toggleModal}
                    >
                        New
                    </Button>
                </div>
                <h3>
                    List of poll
                </h3><hr></hr>
                <PollList
                    polls={this.props.polls}
                    selectPoll={this.props.selectPoll}
                />
                <Modal
                    isOpen={this.state.openModal}
                    toggle={this.toggleModal}

                    unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal} onClick={this.toggleModal} >
                        Create A New Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                         submit={this.props.addNewPoll}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
};

export default Sitebar;