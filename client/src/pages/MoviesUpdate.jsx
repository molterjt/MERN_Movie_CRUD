import React from 'react';
import api from '../api'

import styled from 'styled-components'

const Container = styled.div.attrs({
  className: 'container',
})``

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 50%;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

export class MoviesUpdate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      rating: '',
      time: '',
      currentMovie: {}
    }
  }

  componentDidMount = async () => {
    const {params} = this.props?.match;
    const movie = await api.getMovieById(params.id);
    console.log(movie);
    this.setState({
      name: movie.data.data.name,
      rating: movie.data.data.rating,
      time: movie.data.data.time,
      currentMovie: movie.data.data
    })
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({name})
  }

  handleChangeInputRating = async event => {
    const rating = event.target.validity.valid
        ? event.target.value
        : this.state.rating

    this.setState({ rating })
}

  handleChangeInputTime = async (event) => {
    const time = event.target.value;
    this.setState({time})
  }

  handleIncludeMovie = async () => {
    const {name, rating, time, currentMovie} = this.state;
    const arrayTime = time;
    const payload = {name, rating, time: arrayTime}

    await api.updateMovieById(currentMovie._id, payload).then( (res) => {
      // this.setState({
      //   name: '',
      //   rating: '',
      //   time: ''
      // }, () => );
      window.location.href = `/movies/list`
    })
  }

  render() {
    console.log('update props: ', this.props);
    const {name, rating, time} = this.state;
    return(
      <Container>

      
      <Wrapper>
        <Title>Update Movie</Title>
        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          onChange={this.handleChangeInputName}
        />
        <Label>Rating: </Label>
        <InputText
            type="number"
            step="0.1"
            lang="en-US"
            min="0"
            max="10"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={rating}
            onChange={this.handleChangeInputRating}
        />

        <Label>Time: </Label>
        <InputText
            type="text"
            value={time}
            onChange={this.handleChangeInputTime}
        />

        <Button onClick={this.handleIncludeMovie}>Update Movie</Button>
        <CancelButton href={'/movies/list'}>Cancel</CancelButton>
      </Wrapper>
      </Container>
    )
  }
}
