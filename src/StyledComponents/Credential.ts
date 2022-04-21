import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  gap: 20px;
`
export const CredentialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`
export const CredentialSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  width: 80%;
  max-width: 400px;
  word-break: break-all;
`
export const CredentialTitle = styled.span`
  max-width: 100px;
  width: 20%;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`
