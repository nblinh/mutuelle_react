import { normalizeParams } from './request';

describe('request normalizeParams', () => {
    it('should return params', () => {
        expect(
            normalizeParams({
                a: '1',
                b: '2',
            }),
        ).toEqual({
            a: '1',
            b: '2',
        });
    });

    it('should replace true value by oui', () => {
        expect(
            normalizeParams({
                a: true,
                b: '2',
            }),
        ).toEqual({
            a: 'oui',
            b: '2',
        });
    });

    it('should replace false value by non', () => {
        expect(
            normalizeParams({
                a: false,
                b: '2',
            }),
        ).toEqual({
            a: 'non',
            b: '2',
        });
    });
});
