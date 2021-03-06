
import React, { Component } from 'react';

import { SubtopicPage } from '../../components';
import { fetchCategory } from '../../fetches';

class subtopicsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currSubtopics: [],
    }
  }

  componentDidMount() {
    const id = this.props.match.params.category;
    fetchCategory(id).then(response => {
      const filtered = response.topics;
      this.setState({ 
        currSubtopics: filtered,
        categoryName: response.name.toUpperCase(),
       })
    })
  }

  render() {
    return (
      <SubtopicPage 
      {...this.props} 
      subtopics={this.state.currSubtopics} 
      category={this.state.categoryName} />
    )
  }
}

export default subtopicsWrapper;