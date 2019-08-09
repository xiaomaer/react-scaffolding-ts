import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapters
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
