
/**
 * @cypress/angular v0.0.0-development
 * (c) 2023 Cypress.io
 * Released under the MIT License
 */

import 'zone.js';
import 'zone.js/testing';
import { CommonModule } from '@angular/common';
import { Injectable, Component, EventEmitter, SimpleChange, ErrorHandler } from '@angular/core';
import { getTestBed, TestComponentRenderer, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const ROOT_SELECTOR = '[data-cy-root]';
/**
 * Gets the root element used to mount the component.
 * @returns {HTMLElement} The root element
 * @throws {Error} If the root element is not found
 */
const getContainerEl = () => {
    const el = document.querySelector(ROOT_SELECTOR);
    if (el) {
        return el;
    }
    throw Error(`No element found that matches selector ${ROOT_SELECTOR}. Please add a root element with data-cy-root attribute to your "component-index.html" file so that Cypress can attach your component to the DOM.`);
};
/**
 * Utility function to register CT side effects and run cleanup code during the "test:before:run" Cypress hook
 * @param optionalCallback Callback to be called before the next test runs
 */
function setupHooks(optionalCallback) {
    // We don't want CT side effects to run when e2e
    // testing so we early return.
    // System test to verify CT side effects do not pollute e2e: system-tests/test/e2e_with_mount_import_spec.ts
    if (Cypress.testingType !== 'component') {
        return;
    }
    // When running component specs, we cannot allow "cy.visit"
    // because it will wipe out our preparation work, and does not make much sense
    // thus we overwrite "cy.visit" to throw an error
    Cypress.Commands.overwrite('visit', () => {
        throw new Error('cy.visit from a component spec is not allowed');
    });
    Cypress.Commands.overwrite('session', () => {
        throw new Error('cy.session from a component spec is not allowed');
    });
    Cypress.Commands.overwrite('origin', () => {
        throw new Error('cy.origin from a component spec is not allowed');
    });
    // @ts-ignore
    Cypress.on('test:before:after:run:async', () => {
        optionalCallback === null || optionalCallback === void 0 ? void 0 : optionalCallback();
    });
}

/**
 * @hack fixes "Mocha has already been patched with Zone" error.
 */
// @ts-ignore
window.Mocha['__zone_patch__'] = false;
let activeFixture = null;
function cleanup() {
    // Not public, we need to call this to remove the last component from the DOM
    try {
        getTestBed().tearDownTestingModule();
    }
    catch (e) {
        const notSupportedError = new Error(`Failed to teardown component. The version of Angular you are using may not be officially supported.`);
        notSupportedError.docsUrl = 'https://on.cypress.io/component-framework-configuration';
        throw notSupportedError;
    }
    getTestBed().resetTestingModule();
    activeFixture = null;
}
// 'zone.js/testing' is not properly aliasing `it.skip` but it does provide `xit`/`xspecify`
// Written up under https://github.com/angular/angular/issues/46297 but is not seeing movement
// so we'll patch here pending a fix in that library
// @ts-ignore Ignore so that way we can bypass semantic error TS7017: Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
globalThis.it.skip = globalThis.xit;
let CypressAngularErrorHandler = class CypressAngularErrorHandler {
    handleError(error) {
        throw error;
    }
};
CypressAngularErrorHandler = __decorate([
    Injectable()
], CypressAngularErrorHandler);
/**
 * Bootstraps the TestModuleMetaData passed to the TestBed
 *
 * @param {Type<T>} component Angular component being mounted
 * @param {MountConfig} config TestBed configuration passed into the mount function
 * @returns {MountConfig} MountConfig
 */
function bootstrapModule(component, config) {
    var _a;
    const testModuleMetaData = __rest(config, ["componentProperties"]);
    if (!testModuleMetaData.declarations) {
        testModuleMetaData.declarations = [];
    }
    if (!testModuleMetaData.imports) {
        testModuleMetaData.imports = [];
    }
    if (!testModuleMetaData.providers) {
        testModuleMetaData.providers = [];
    }
    // Replace default error handler since it will swallow uncaught exceptions.
    // We want these to be uncaught so Cypress catches it and fails the test
    testModuleMetaData.providers.push({
        provide: ErrorHandler,
        useClass: CypressAngularErrorHandler,
    });
    // check if the component is a standalone component
    if ((_a = component.ɵcmp) === null || _a === void 0 ? void 0 : _a.standalone) {
        testModuleMetaData.imports.push(component);
    }
    else {
        testModuleMetaData.declarations.push(component);
    }
    if (!testModuleMetaData.imports.includes(CommonModule)) {
        testModuleMetaData.imports.push(CommonModule);
    }
    return testModuleMetaData;
}
let CypressTestComponentRenderer = class CypressTestComponentRenderer extends TestComponentRenderer {
    insertRootElement(rootElId) {
        this.removeAllRootElements();
        const rootElement = getContainerEl();
        rootElement.setAttribute('id', rootElId);
    }
    removeAllRootElements() {
        getContainerEl().innerHTML = '';
    }
};
CypressTestComponentRenderer = __decorate([
    Injectable()
], CypressTestComponentRenderer);
/**
 * Initializes the TestBed
 *
 * @param {Type<T> | string} component Angular component being mounted or its template
 * @param {MountConfig} config TestBed configuration passed into the mount function
 * @returns {Type<T>} componentFixture
 */
function initTestBed(component, config) {
    const componentFixture = createComponentFixture(component);
    getTestBed().configureTestingModule(Object.assign({}, bootstrapModule(componentFixture, config)));
    getTestBed().overrideProvider(TestComponentRenderer, { useValue: new CypressTestComponentRenderer() });
    return componentFixture;
}
let WrapperComponent = class WrapperComponent {
};
WrapperComponent = __decorate([
    Component({ selector: 'cy-wrapper-component', template: '' })
], WrapperComponent);
/**
 * Returns the Component if Type<T> or creates a WrapperComponent
 *
 * @param {Type<T> | string} component The component you want to create a fixture of
 * @returns {Type<T> | WrapperComponent}
 */
function createComponentFixture(component) {
    if (typeof component === 'string') {
        // getTestBed().overrideTemplate is available in v14+
        // The static TestBed.overrideTemplate is available across versions
        TestBed.overrideTemplate(WrapperComponent, component);
        return WrapperComponent;
    }
    return component;
}
/**
 * Creates the ComponentFixture
 *
 * @param {Type<T>} component Angular component being mounted
 * @param {MountConfig<T>} config MountConfig

 * @returns {ComponentFixture<T>} ComponentFixture
 */
function setupFixture(component, config) {
    const fixture = getTestBed().createComponent(component);
    setupComponent(config, fixture);
    fixture.whenStable().then(() => {
        var _a;
        fixture.autoDetectChanges((_a = config.autoDetectChanges) !== null && _a !== void 0 ? _a : true);
    });
    return fixture;
}
/**
 * Gets the componentInstance and Object.assigns any componentProperties() passed in the MountConfig
 *
 * @param {MountConfig} config TestBed configuration passed into the mount function
 * @param {ComponentFixture<T>} fixture Fixture for debugging and testing a component.
 * @returns {T} Component being mounted
 */
function setupComponent(config, fixture) {
    let component = fixture.componentInstance;
    if (config === null || config === void 0 ? void 0 : config.componentProperties) {
        component = Object.assign(component, config.componentProperties);
    }
    if (config.autoSpyOutputs) {
        Object.keys(component).forEach((key) => {
            const property = component[key];
            if (property instanceof EventEmitter) {
                component[key] = createOutputSpy(`${key}Spy`);
            }
        });
    }
    // Manually call ngOnChanges when mounting components using the class syntax.
    // This is necessary because we are assigning input values to the class directly
    // on mount and therefore the ngOnChanges() lifecycle is not triggered.
    if (component.ngOnChanges && config.componentProperties) {
        const { componentProperties } = config;
        const simpleChanges = Object.entries(componentProperties).reduce((acc, [key, value]) => {
            acc[key] = new SimpleChange(null, value, true);
            return acc;
        }, {});
        if (Object.keys(componentProperties).length > 0) {
            component.ngOnChanges(simpleChanges);
        }
    }
}
/**
 * Mounts an Angular component inside Cypress browser
 *
 * @param component Angular component being mounted or its template
 * @param config configuration used to configure the TestBed
 * @example
 * import { mount } from '@cypress/angular'
 * import { StepperComponent } from './stepper.component'
 * import { MyService } from 'services/my.service'
 * import { SharedModule } from 'shared/shared.module';
 * it('mounts', () => {
 *    mount(StepperComponent, {
 *      providers: [MyService],
 *      imports: [SharedModule]
 *    })
 *    cy.get('[data-cy=increment]').click()
 *    cy.get('[data-cy=counter]').should('have.text', '1')
 * })
 *
 * // or
 *
 * it('mounts with template', () => {
 *   mount('<app-stepper></app-stepper>', {
 *     declarations: [StepperComponent],
 *   })
 * })
 *
 * @see {@link https://on.cypress.io/mounting-angular} for more details.
 *
 * @returns A component and component fixture
 */
function mount(component, config = {}) {
    // Remove last mounted component if cy.mount is called more than once in a test
    if (activeFixture) {
        cleanup();
    }
    const componentFixture = initTestBed(component, config);
    activeFixture = setupFixture(componentFixture, config);
    const mountResponse = {
        fixture: activeFixture,
        component: activeFixture.componentInstance,
    };
    const logMessage = typeof component === 'string' ? 'Component' : componentFixture.name;
    Cypress.log({
        name: 'mount',
        message: logMessage,
        consoleProps: () => ({ result: mountResponse }),
    });
    return cy.wrap(mountResponse, { log: false });
}
/**
 * Creates a new Event Emitter and then spies on it's `emit` method
 *
 * @param {string} alias name you want to use for your cy.spy() alias
 * @returns EventEmitter<T>
 * @example
 * import { StepperComponent } from './stepper.component'
 * import { mount, createOutputSpy } from '@cypress/angular'
 *
 * it('Has spy', () => {
 *   mount(StepperComponent, { componentProperties: { change: createOutputSpy('changeSpy') } })
 *   cy.get('[data-cy=increment]').click()
 *   cy.get('@changeSpy').should('have.been.called')
 * })
 */
const createOutputSpy = (alias) => {
    const emitter = new EventEmitter();
    cy.spy(emitter, 'emit').as(alias);
    return emitter;
};
// Only needs to run once, we reset before each test
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
});
setupHooks(cleanup);

export { CypressTestComponentRenderer, createOutputSpy, mount };
