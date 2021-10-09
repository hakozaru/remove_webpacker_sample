// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Img from '../images/webpack-png.png'
import ImgInline, { ReactComponent as ImgComponent } from '../images/webpack-svg.svg'

type Props = {
  name: string
}

const Hello = (props: Props) => (
  <>
    <div>Hello {props.name}!</div>
    <img src={Img} width='300px' />
    <img src={ImgInline} width='300px' />
    <ImgComponent width={300} />
  </>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
