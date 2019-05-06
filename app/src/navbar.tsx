import React from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'

export const Navbar = () => {
  const navigation = useNavigation()
  return (
    <NavbarWrapper>
      <NavbarItems>
        <NavbarItem onClick={() => navigation.navigate('/')}>Home</NavbarItem>
        <NavbarItem onClick={() => navigation.navigate('/products')}>Products</NavbarItem>
        <NavbarItem onClick={() => navigation.navigate('/about')}>About</NavbarItem>
      </NavbarItems>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.div`
  display: flex;
  flex: 1;
`
const NavbarItems = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const NavbarItem = styled.li`
  display: inline-block;
  width: 100px;
  height: 50px;
  cursor: pointer;
`
