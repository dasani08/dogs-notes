import React from 'react'

function Header(props: any) {
  return (
    <header>
      <nav>{props.children}</nav>
    </header>
  )
}

export default Header
