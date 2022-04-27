import styled from 'styled-components'

const ButtonAsLink = styled.button`
  background: black;
  color: #0077cc;
  border: ridged 1px black;
  border-radius: 10px;
  padding: 5;
  font: inherit;
  cursor: pointer;

  :hover,
  :active {
    color: #004499;
  }
`

export default ButtonAsLink
