import { handleSetError, handleCloseNotification } from './reducers';

describe('Layout Reducers', () => {
    describe('handleSetError', () => {
        it('should append given error to notifications with "error" type', () => {
            const test = (
                initialNotifications,
                error,
                expectedNotifications,
            ) => {
                const { notifications } = handleSetError(
                    { notifications: initialNotifications },
                    { payload: error },
                );

                expect(notifications).toEqual(expectedNotifications);
            };

            test([], { message: 'Boom!' }, [
                {
                    message: 'Boom!',
                    type: 'error',
                },
            ]);

            test(
                [{ message: 'Success!', type: 'info' }],
                { message: 'Boom!' },
                [
                    { message: 'Success!', type: 'info' },
                    { message: 'Boom!', type: 'error' },
                ],
            );

            test([], { message: 'Boom!', type: 'info' }, [
                {
                    message: 'Boom!',
                    type: 'error',
                },
            ]);
        });
    });

    describe('handleCloseNotification', () => {
        it('should remove first notification', () => {
            const test = (initialNotifications, afterNotifications) => {
                const { notifications } = handleCloseNotification({
                    notifications: initialNotifications,
                });

                expect(notifications).toEqual(afterNotifications);
            };

            test([], []);
            test([{ message: 'Success!', type: 'info' }], []);
            test(
                [
                    { message: 'Success!', type: 'info' },
                    { message: 'Error', type: 'error' },
                ],
                [{ message: 'Error', type: 'error' }],
            );
        });
    });
});
