import React from 'react'
import ParticipentForm from './perticipete-form'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import PollForm from '../poll-form/index'

class MainContent extends React.Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Wlcome to my application</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur laborum eveniet, cum reprehenderit, quae numquam impedit necessitatibus mollitia repudiandae adipisci nihil aut eum architecto sunt est illo temporibus quidem rem!Aliquid iusto sequi exercitationem, quos eius perferendis non, quidem aliquam ullam nisi explicabo! Fugit non iure eius atque reprehenderit exercitationem cumque officiis ratione quasi molestiae, consequatur nesciunt esse sint quia.</p>
        </div>
      );
    } else {
      const { poll, getOpinion, updatePoll, deletePoll } = this.props
      return (
        <div>
          <h3>{poll.title}</h3>
          <p>{poll.description}</p>
          <br />
          <ParticipentForm
            poll={poll}
            getOpinion={getOpinion}
            toggleModal={this.toggleModal}
            deletePoll={deletePoll}
          />
          <Modal isOpen={this.state.openModal}
            toggle={this.toggleModal}
            unmountOnClose={true}>
            <ModalHeader toggle={this.toggleModal}>Update POll</ModalHeader>
            <ModalBody>
              <PollForm
                poll={poll}
                isUpdate={true}
                submit={updatePoll}
                buttonValue='Update Poll'
              />
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }


}

export default MainContent