import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import POLLS from './components/data/polls';
import MainContent from './components/main-content';
import Sitebar from './components/sitebar';
import shortid from 'shortid'
class App extends React.Component {
  state = {
    polls : [],
    selectedPoll : {},
    searchTerm: ''
  };

  componentDidMount() {
    this.setState({ polls: POLLS });
  };

  addNewPoll = poll => {
    poll.id = shortid.generate()
    poll.created = new Date()
    poll.totalVote = 0
    poll.opinions = []
    this.setState({
      polls: this.state.polls.concat(poll)
    })
  }


  updatePoll = updatePoll => {
    const polls = [...this.state.polls]
    const poll = polls.find(p => p.id === this.updatePoll.id)
    poll.title = updatePoll.title
    poll.description = updatePoll.description
    poll.opinions = updatePoll.opinions
  };


  selectPoll = pollId => {
    const poll = this.state.polls.find(o => o.id === pollId);
    this.setState({ selectedPoll : poll });
  };

  deletePoll = pollId => {
    const polls = this.state.polls.filter(p => p.id !== pollId);
    this.setState({ polls, selectedPoll : {} });

  };


  handleSearch = searchTerm => {

  }
  getOpinion = response => {
    const { polls } = this.state
    const poll = polls.find(p => p.id === response.pollId)
    const option = poll.opinions.find(o => o.id === response.slectedOption)
    poll.totalVote++
    option.totalVote++

    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption

    }
    poll.opinions.push(opinion)
    this.setState({ polls });
  };


  render() {
    return (
      <div>
        <Container className='my-5'>
          <Row>
            <Col md={4}>
              <Sitebar
                polls={this.state.polls}
                searchTerm={this.state.searchTerm}
                handleSearch={this.handleSearch}
                selectPoll={this.selectPoll}
                addNewPoll={this.addNewPoll}
              />
            </Col>
            <Col md={8}>
              <MainContent
                poll={this.state.selectedPoll}
                getOpinion={this.getOpinion}
                updatePoll={this.updatePoll}
                deletePoll={this.deletePoll}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};


export default App;
