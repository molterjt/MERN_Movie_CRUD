import React, { Component } from 'react'
import api from '../api'
import addBtn from '../addBtn.png';
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
  className: 'container',
})``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 100%;
  border: 1px solid black;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: row;
  ${'' /* border: 1px solid black; */}
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid grey;
  padding: 2px;
  width: 25%;
  overflow: hidden;
  vertical-align: center;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
  border: 1px solid grey;
  font-weight: bold;
  overflow: hidden;
  color: white;
  border: 0.25px solid white;
  background-color: rgba(0,0,0,0.7);
  font-style: italic;
`

const Update = styled.div`
  font-size: 14px;
  color: #ef9b0f;
  cursor: pointer;
`

const Delete = styled.div`
  font-size: 14px;
  color: #ff0000;
  cursor: pointer;
`

export const UpdateMovie = ({id}) => {
  const updateMovie = event => {
      event.preventDefault()
      window.location.href = `/movies/update/${id}`
  }
  return <Update onClick={updateMovie}>Update</Update>
}

export const DeleteMovie = ({id, name}) => {
  const deleteMovie = event => {
    event.preventDefault()
    if ( window.confirm(
        `Do you want to delete the movie "${name}" permanently?`,
      ) ) {
        api.deleteMovieById(id)
        window.location.reload()
      }
    }
    return <Delete onClick={deleteMovie}>Delete</Delete>
}

export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      columns: [],
      isLoading: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    await api.getAllMovies().then(movies => {
      console.log('movies: ', movies)
      this.setState({
        movies: movies.data.data,
        isLoading: false,
      })
    })
  }

render() {
  const { movies, isLoading } = this.state
  return (
    <Wrapper>
      
      <Container>
        <Row>
          <Header>Movie</Header>
          <Header>Rating</Header>
          <Header>Time</Header>
          <Header>Actions</Header>
          {/* <Header style={{width: '12%'}}>Delete</Header>
          <Header style={{width: '12%'}}>Update</Header> */}
        </Row>
        {Object.values(movies).map((mv, i) => 
          <Row key={i}>
            <Cell title={mv.name}>{mv.name}</Cell>
            <Cell>{mv.rating}</Cell>
            <Cell>{mv.time}</Cell>
            <Cell title="Delete" style={{width: '12.5%'}}>
              <DeleteMovie id={mv._id} name={mv.name} />
            </Cell>
            <Cell title="Update" style={{width: '12.5%'}}>
              <UpdateMovie id={mv._id} />
            </Cell>
            </Row>
        )}
        </Container>
      </Wrapper>    
    );
  }
}

