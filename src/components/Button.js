import styled from 'styled-components'

const Button = styled.button`
  background-color: #0077cc;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 18px;
  margin-top: 5px;
  padding: 10px;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #005fa3;
  }
`

export default Button
