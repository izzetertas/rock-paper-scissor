import Icon from './Icon'
//

describe('<Icon />', () => {
  const defaultProps = {
    name: 'hand'
  }

  test('renders without exploding', async () => {
    const wrapper = await shallow(<Icon {...defaultProps} />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })

  test('should catch error', async () => {
    const wrapper = await shallow(<Icon name='not-an-icon' />)
    expect(snapshot(wrapper)).toThrowErrorMatchingSnapshot()
  })
})
