import React from 'react';
import InputPredict from '../src/input-predict';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('InputPredict component should render 2 input fields', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  expect(predict.find('input')).toHaveLength(2);
});

test('2nd input field should be disabled', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  expect(predict.find('input').at(1).prop("disabled")).toBe("disabled");
});

test('Prediction should be initially empty', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  expect(predict.find('input').at(1).props().value).toBe("");
});

test('Prediction changes when value changes', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'f' } });
  expect(predict.find('input').at(1).props().value).toBe("foo");
});

test('Suggestions should be empty if input doesn\'t match any suggestion', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'z' } });
  expect(predict.state('suggestions')).toEqual(['']);
});

test('Tab key completes prediction', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'f' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 9, preventDefault: () => { } });
  expect(predict.find('input').at(0).props().value).toBe("foo");
});

test('Enter key completes prediction', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'f' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 13, preventDefault: () => { } });
  expect(predict.find('input').at(0).props().value).toBe("foo");
});

test('Down key gets next suggestion', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'b' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 40 });
  expect(predict.find('input').at(1).props().value).toBe("baz");
});

test('Up key gets next suggestion', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'b' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 40 });
  predict.find('input').at(0).simulate('keydown', { keyCode: 38 });
  expect(predict.find('input').at(1).props().value).toBe("bar");
});

test('Setting suggestion prop should change suggestion', () => {
  const predict = shallow(<InputPredict dictionary={['foo', 'bar', 'baz']} />);
  predict.setProps({ suggestion: "bazinga" });
  expect(predict.find('input').at(1).props().value).toBe("bazinga");
  const predictInitial = shallow(<InputPredict suggestion="bazinga" dictionary={['foo', 'bar', 'baz']} />);
  expect(predictInitial.find('input').at(1).props().value).toBe("bazinga");
});

test('Ensure that onValueChange prop is called properly when a value is changed', () => {
  const mockOnLeaveChange = jest.fn();
  const predict = shallow(<InputPredict onValueChange={mockOnLeaveChange} dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'f' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 13, preventDefault: () => { } });
  predict.find('input').at(0).simulate('change', { target: { value: 'bar' } });
  predict.setProps({ suggestion: "bazinga" });
  predict.find('input').at(0).simulate('change', { target: { value: 'bazinga' } });
  expect(mockOnLeaveChange.mock.calls).toEqual([
    ['f', false],
    ['foo', true],
    ['bar', true],
    ['bazinga', true]
  ]);
});

test('Ensure that passed props are passed properly to and from underlying <input />', () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const predict = shallow(<InputPredict onChange={mockOnChange} onKeyDown={mockOnKeyDown} placeholder="PH" dictionary={['foo', 'bar', 'baz']} />);
  predict.find('input').at(0).simulate('change', { target: { value: 'f' } });
  predict.find('input').at(0).simulate('keydown', { keyCode: 13, preventDefault: () => { } });
  expect(mockOnChange.mock.calls.length).toBe(1);
  expect(mockOnKeyDown.mock.calls.length).toBe(1);
  expect(predict.find('input').at(0).prop("placeholder")).toBe("PH");
});