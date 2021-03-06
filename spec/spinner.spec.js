/*global ko, $, jasmine, describe, it, beforeEach, afterEach, spyOn, expect,
getMajorMinorVersion, testWidgetOptions*/
/*jslint maxlen:256*/
(function () {
    'use strict';

    if (getMajorMinorVersion($.ui.version) === '1.8') {
        // spinner was introduced in 1.9
        return;
    }

    describe('The spinner binding', function () {
        it('should handle each option of the widget', function () {
            testWidgetOptions('spinner', {
                culture: [null, 'fr'],
                disabled: [false, true],
                icons: [{ down: 'ui-icon-triangle-1-s', up: 'ui-icon-triangle-1-n' }, { down: 'custom-down-icon', up: 'custom-up-icon'}],
                incremental: [true, false],
                max: [null, 50],
                min: [null, 10],
                numberFormat: [null, 'n'],
                page: [10, 5],
                step: [1, 2]
            });
        });

        it('should handle each event of the widget', function () {
            var $element, vm;

            $element = $('<div data-bind="spinner: { create: createEventHandler }"></div>').appendTo('body');
            vm = { createEventHandler: jasmine.createSpy() };

            ko.applyBindings(vm);

            expect(vm.createEventHandler).toHaveBeenCalled();

            ko.removeNode($element[0]);
        });

        it('should write the widget\'s value to the viewmodel\'s bound property when it changes.', function () {
            var $element, vm;

            $element = $('<div data-bind="spinner: { value: value }"></div>').appendTo('body');
            vm = { value: ko.observable(1) };
            ko.applyBindings(vm);

            expect(vm.value.peek()).toEqual(1);
            $element.spinner('value', 55);
            expect(vm.value.peek()).toEqual(55);

            ko.removeNode($element[0]);
        });
    });
}());