import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
  className: 'navbar-item',
})``

export const Links = () => {
  return(
    <React.Fragment>
      <Link to="/" className="navbar-brand">
        MERN App
      </Link>
   
        <List>
          <Item>
            <Link to="/movies/list" className="nav-link">
              List Movies
            </Link>
          </Item>
          <Item>
            {/* <Link to="/movies/create" className="nav-link">
              Create Movie
            </Link> */}
          </Item>
        </List>
    </React.Fragment>
  )
}