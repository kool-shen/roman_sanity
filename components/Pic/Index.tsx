import React from 'react'

interface Props {
    index: number ;
    length: number  ;
  }

export default function Index(props: Props) {
  return (
    props.length > 0 &&
    <p>{props.index} / {props.length}</p>
  )
}
