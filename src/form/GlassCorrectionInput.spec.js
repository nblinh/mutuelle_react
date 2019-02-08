import React from 'react';
import { mount } from 'enzyme';

import { GlassCorrectionInput } from './GlassCorrectionInput.js';

const baseEvent = {
    stopPropagation: () => {},
    preventDefault: () => {},
};

const oldGetBoundingClientRect = Element.prototype.getBoundingClientRect;

describe('<GlassCorrectionInput />', () => {
    const defaultProps = {
        classes: {
            extrema: 'extrema',
            gauge: 'gauge',
            step: 'step',
            valueCursor: 'valueCursor',
        },
        onChange: () => {},
    };

    beforeEach(() => {
        Element.prototype.getBoundingClientRect = () => ({
            left: 100,
            width: 400,
        });

        global.devicePixelRatio = 1;
    });

    it('should display intermediary steps', () => {
        const props = { ...defaultProps };
        const wrapper = mount(<GlassCorrectionInput {...props} />);

        expect(wrapper.find('.step')).toHaveLength(13);
    });

    it('should display slider extrema', () => {
        const props = { ...defaultProps };
        const wrapper = mount(<GlassCorrectionInput {...props} />);

        expect(wrapper.find('.extrema span').map(s => s.text())).toEqual([
            '-12',
            '+12',
        ]);
    });

    it('should call `onChange` prop when moving cursor', () => {
        const onChangeSpy = jest.fn();

        const props = {
            ...defaultProps,
            onChange: onChangeSpy,
            value: 1,
        };
        const wrapper = mount(<GlassCorrectionInput {...props} />);

        // should update if value changed
        const cursor = wrapper.find('.valueCursor');
        cursor.simulate('mousedown', { button: 0 }); // left clicking

        const mouseMoveEvent = document.createEvent('HTMLEvents');
        mouseMoveEvent.initEvent('mousemove', false, true);
        mouseMoveEvent.clientX = 200;
        document.dispatchEvent(mouseMoveEvent);

        expect(onChangeSpy).toHaveBeenCalledWith(-6);
    });

    const dragCursor = (wrapper, x) => {
        const leftMouseDownEvent = {
            ...baseEvent,
            button: 0,
        };

        const cursor = wrapper.find('.valueCursor');
        cursor.prop('onMouseDown')(leftMouseDownEvent); // left mouse button

        const mouseMoveEvent = document.createEvent('HTMLEvents');
        mouseMoveEvent.initEvent('mousemove', false, true);
        mouseMoveEvent.clientX = x;
        document.dispatchEvent(mouseMoveEvent);

        wrapper.update();
    };

    it('should move cursor to current position when dragging', () => {
        const props = { ...defaultProps };

        const wrapper = mount(<GlassCorrectionInput {...props} />);
        dragCursor(wrapper, 400);

        const cursor = wrapper.find('.valueCursor');
        expect(cursor.prop('style').left).toEqual('75%');
    });

    it('should limit cursor dragging to the slider width', () => {
        const test = (clientX, expectedLeft) => {
            const props = { ...defaultProps };
            const wrapper = mount(<GlassCorrectionInput {...props} />);
            dragCursor(wrapper, clientX);

            const cursor = wrapper.find('.valueCursor');
            expect(cursor.prop('style').left).toEqual(expectedLeft);
        };

        test(50, '0%');
        test(1900, '100%');
    });

    it('should handle zoom correctly when moving cursor', () => {
        const test = (devicePixelRatio, expectedLeft) => {
            global.devicePixelRatio = devicePixelRatio;

            const props = { ...defaultProps };
            const wrapper = mount(<GlassCorrectionInput {...props} />);
            dragCursor(wrapper, 300);

            const cursor = wrapper.find('.valueCursor');
            expect(cursor.prop('style').left).toEqual(expectedLeft);
        };

        test(1, '50%');
        test(1.5, '25%');
    });

    it('should set value according to cursor position when dragging', () => {
        const test = (position, expectedValue) => {
            const props = { ...defaultProps };
            const wrapper = mount(<GlassCorrectionInput {...props} />);
            dragCursor(wrapper, position);

            const cursor = wrapper.find('.valueCursor');
            expect(cursor.text()).toBe(expectedValue);
        };

        test(150, '-9');
        test(400, '+6');
    });

    afterEach(() => {
        Element.prototype.getBoundingClientRect = oldGetBoundingClientRect;
    });
});
