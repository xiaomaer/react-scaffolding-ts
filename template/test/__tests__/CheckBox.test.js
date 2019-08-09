import React from 'react';
import Checkbox from '../../src/components/CheckBox/index';

// 测试组件的渲染
test('render checkbox', () => {
    const wrapper = shallow(
        <Checkbox id="xiao" name="xxx" value="xxx">
            label
        </Checkbox>
    );
    expect(wrapper).toMatchSnapshot();
});

// 测试组件props
test('render a checked props', () => {
    const wrapper = shallow(
        <Checkbox className="xm" id="xiao" name="xxx" value="xxx">
            label
        </Checkbox>
    );
    expect(wrapper.prop('className')).toEqual('xm');
});

// 测试组件事件处理
test('test onchange event', () => {
    const wrapper = shallow(<Checkbox value="xxx">label</Checkbox>);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').simulate('change', {
        target: {
            checked: true
        }
    });
    expect(wrapper).toMatchSnapshot();
});
