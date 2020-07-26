import React from 'react';
import styled from 'styled-components';
import {Logo} from './Logo';
import {Links} from './Links';
import addBtn from '../addBtn.png'
import { Link } from 'react-router-dom'



const Container = styled.div.attrs({
  className: 'container',
})``

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
  margin-bottom: 20px;
`

export const NavBar = () => {
  return(
    <Container>
      <Nav>
        <Logo/>
        <Links/>
        <Link to="/movies/create" className="nav-link">
          <img
            title="Add Movie" 
            src={addBtn}
            width="30px"
            height="30px"
          />
        </Link>
      </Nav>
    </Container>
  )
}