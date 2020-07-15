
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var data = [
    	{
    		route_name: "Tsawwassen to Swartz Bay",
    		average_sailing: "1 hour 35 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T14:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:00:00Z",
    				actual_departure: "2020-07-25T14:00:00Z",
    				eta: "2020-07-25T15:30:00Z"
    			},
    			"2020-07-25T16:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T16:00:00Z",
    				actual_departure: "2020-07-25T16:07:00Z",
    				eta: "2020-07-25T17:32:00Z"
    			},
    			"2020-07-25T17:01:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T17:01:00Z",
    				actual_departure: "2020-07-25T17:03:00Z",
    				eta: "2020-07-25T18:30:00Z"
    			},
    			"2020-07-25T18:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:00:00Z",
    				actual_departure: "2020-07-25T18:00:00Z",
    				eta: "2020-07-25T19:30:00Z"
    			},
    			"2020-07-25T20:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:00:00Z",
    				actual_departure: "2020-07-25T20:05:00Z",
    				eta: "2020-07-25T21:28:00Z"
    			},
    			"2020-07-25T21:00:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T21:00:00Z",
    				actual_departure: "2020-07-25T21:06:00Z",
    				eta: "2020-07-25T22:28:00Z"
    			},
    			"2020-07-25T22:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:00:00Z",
    				actual_departure: "2020-07-25T22:00:00Z",
    				eta: "2020-07-25T23:34:00Z"
    			},
    			"2020-07-26T00:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:00:00Z",
    				actual_departure: "2020-07-26T00:00:00Z",
    				eta: "2020-07-26T01:30:00Z"
    			},
    			"2020-07-26T01:00:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T01:00:00Z",
    				actual_departure: "2020-07-26T01:05:00Z",
    				eta: "2020-07-26T02:32:00Z"
    			},
    			"2020-07-26T02:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T02:00:00Z",
    				actual_departure: "2020-07-26T01:59:00Z",
    				eta: "2020-07-26T03:32:00Z"
    			},
    			"2020-07-26T04:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T04:00:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Tsawwassen to Southern Gulf Islands",
    		average_sailing: "Variable",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T15:55:00Z": {
    				vessel: "Salish Orca",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:55:00Z",
    				actual_departure: "2020-07-25T15:54:00Z",
    				eta: null
    			},
    			"2020-07-25T19:40:00Z": {
    				vessel: "Salish Orca",
    				sailing_status: "Earlier loading procedure is causing ongoing delay",
    				scheduled_departure: "2020-07-25T19:40:00Z",
    				actual_departure: "2020-07-25T19:55:00Z",
    				eta: null
    			},
    			"2020-07-26T05:25:00Z": {
    				vessel: "Salish Orca",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:25:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Tsawwassen to Duke Point",
    		average_sailing: "2 hours",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T12:15:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "We are waiting for a crew member to board",
    				scheduled_departure: "2020-07-25T12:15:00Z",
    				actual_departure: "2020-07-25T12:25:00Z",
    				eta: "2020-07-25T14:18:00Z"
    			},
    			"2020-07-25T14:45:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:45:00Z",
    				actual_departure: "2020-07-25T14:48:00Z",
    				eta: "2020-07-25T16:42:00Z"
    			},
    			"2020-07-25T17:15:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T17:15:00Z",
    				actual_departure: "2020-07-25T17:15:00Z",
    				eta: "2020-07-25T19:16:00Z"
    			},
    			"2020-07-25T19:45:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T19:45:00Z",
    				actual_departure: "2020-07-25T19:49:00Z",
    				eta: "2020-07-25T21:44:00Z"
    			},
    			"2020-07-25T22:15:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:15:00Z",
    				actual_departure: "2020-07-25T22:15:00Z",
    				eta: "2020-07-26T00:12:00Z"
    			},
    			"2020-07-26T00:45:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:45:00Z",
    				actual_departure: "2020-07-26T00:54:00Z",
    				eta: "2020-07-26T02:48:00Z"
    			},
    			"2020-07-26T03:16:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T03:16:00Z",
    				actual_departure: "2020-07-26T03:13:00Z",
    				eta: "2020-07-26T05:15:00Z"
    			},
    			"2020-07-26T05:46:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:46:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Swartz Bay to Fulford Harbour (Saltspring Is.)",
    		average_sailing: "35 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T14:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:00:00Z",
    				actual_departure: "2020-07-25T13:57:00Z",
    				eta: "2020-07-25T14:28:00Z"
    			},
    			"2020-07-25T15:30:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:30:00Z",
    				actual_departure: "2020-07-25T15:29:00Z",
    				eta: "2020-07-25T15:58:00Z"
    			},
    			"2020-07-25T17:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T17:00:00Z",
    				actual_departure: "2020-07-25T16:57:00Z",
    				eta: "2020-07-25T17:26:00Z"
    			},
    			"2020-07-25T18:30:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:30:00Z",
    				actual_departure: "2020-07-25T18:29:00Z",
    				eta: "2020-07-25T18:58:00Z"
    			},
    			"2020-07-25T20:10:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:10:00Z",
    				actual_departure: "2020-07-25T20:07:00Z",
    				eta: "2020-07-25T20:34:00Z"
    			},
    			"2020-07-25T22:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:00:00Z",
    				actual_departure: "2020-07-25T22:04:00Z",
    				eta: "2020-07-25T22:34:00Z"
    			},
    			"2020-07-26T00:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:00:00Z",
    				actual_departure: "2020-07-26T00:03:00Z",
    				eta: "2020-07-26T00:32:00Z"
    			},
    			"2020-07-26T02:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T02:00:00Z",
    				actual_departure: "2020-07-26T01:59:00Z",
    				eta: "2020-07-26T02:28:00Z"
    			},
    			"2020-07-26T04:00:00Z": {
    				vessel: "Skeena Queen",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T04:00:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Swartz Bay to Southern Gulf Islands",
    		average_sailing: "Variable",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T12:40:00Z": {
    				vessel: "Mayne Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T12:40:00Z",
    				actual_departure: "2020-07-25T12:37:00Z",
    				eta: null
    			},
    			"2020-07-25T12:50:00Z": {
    				vessel: "Queen of Cumberland",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T12:50:00Z",
    				actual_departure: "2020-07-25T12:48:00Z",
    				eta: null
    			},
    			"2020-07-25T15:15:00Z": {
    				vessel: "Mayne Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:15:00Z",
    				actual_departure: "2020-07-25T15:16:00Z",
    				eta: null
    			},
    			"2020-07-25T16:35:00Z": {
    				vessel: "Queen of Cumberland",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T16:35:00Z",
    				actual_departure: "2020-07-25T16:39:00Z",
    				eta: null
    			},
    			"2020-07-25T20:50:00Z": {
    				vessel: "Mayne Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:50:00Z",
    				actual_departure: "2020-07-25T20:49:00Z",
    				eta: "2020-07-25T21:28:00Z"
    			},
    			"2020-07-25T21:40:00Z": {
    				vessel: "Queen of Cumberland",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T21:40:00Z",
    				actual_departure: "2020-07-25T21:40:00Z",
    				eta: null
    			},
    			"2020-07-25T22:40:00Z": {
    				vessel: "Mayne Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:40:00Z",
    				actual_departure: "2020-07-25T22:38:00Z",
    				eta: null
    			},
    			"2020-07-26T01:45:00Z": {
    				vessel: "Queen of Cumberland",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T01:45:00Z",
    				actual_departure: "2020-07-26T01:43:00Z",
    				eta: "2020-07-26T03:40:00Z"
    			},
    			"2020-07-26T02:25:00Z": {
    				vessel: "Mayne Queen",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T02:25:00Z",
    				actual_departure: "2020-07-26T02:22:00Z",
    				eta: "2020-07-26T03:55:00Z"
    			}
    		}
    	},
    	{
    		route_name: "Swartz Bay to Tsawwassen",
    		average_sailing: "1 hour 35 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T14:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:00:00Z",
    				actual_departure: "2020-07-25T14:02:00Z",
    				eta: "2020-07-25T15:30:00Z"
    			},
    			"2020-07-25T15:01:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:01:00Z",
    				actual_departure: "2020-07-25T15:02:00Z",
    				eta: "2020-07-25T16:30:00Z"
    			},
    			"2020-07-25T16:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T16:00:00Z",
    				actual_departure: "2020-07-25T16:05:00Z",
    				eta: "2020-07-25T17:36:00Z"
    			},
    			"2020-07-25T18:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:00:00Z",
    				actual_departure: "2020-07-25T18:03:00Z",
    				eta: "2020-07-25T19:30:00Z"
    			},
    			"2020-07-25T19:00:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T19:00:00Z",
    				actual_departure: "2020-07-25T19:02:00Z",
    				eta: "2020-07-25T20:32:00Z"
    			},
    			"2020-07-25T20:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:00:00Z",
    				actual_departure: "2020-07-25T20:00:00Z",
    				eta: "2020-07-25T21:30:00Z"
    			},
    			"2020-07-25T22:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:00:00Z",
    				actual_departure: "2020-07-25T22:02:00Z",
    				eta: "2020-07-25T23:26:00Z"
    			},
    			"2020-07-25T23:00:00Z": {
    				vessel: "Coastal Celebration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T23:00:00Z",
    				actual_departure: "2020-07-25T23:02:00Z",
    				eta: "2020-07-26T00:28:00Z"
    			},
    			"2020-07-26T00:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:00:00Z",
    				actual_departure: "2020-07-26T00:01:00Z",
    				eta: "2020-07-26T01:30:00Z"
    			},
    			"2020-07-26T02:00:00Z": {
    				vessel: "Spirit of Vancouver Island",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T02:00:00Z",
    				actual_departure: "2020-07-26T02:01:00Z",
    				eta: "2020-07-26T03:30:00Z"
    			},
    			"2020-07-26T04:00:00Z": {
    				vessel: "Spirit of British Columbia",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T04:00:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Duke Point to Tsawwassen",
    		average_sailing: "2 hours",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T12:15:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T12:15:00Z",
    				actual_departure: "2020-07-25T12:15:00Z",
    				eta: "2020-07-25T14:16:00Z"
    			},
    			"2020-07-25T14:45:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:45:00Z",
    				actual_departure: "2020-07-25T14:46:00Z",
    				eta: "2020-07-25T16:46:00Z"
    			},
    			"2020-07-25T17:15:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T17:15:00Z",
    				actual_departure: "2020-07-25T17:19:00Z",
    				eta: "2020-07-25T19:16:00Z"
    			},
    			"2020-07-25T19:45:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T19:45:00Z",
    				actual_departure: "2020-07-25T19:47:00Z",
    				eta: "2020-07-25T21:42:00Z"
    			},
    			"2020-07-25T22:15:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:15:00Z",
    				actual_departure: "2020-07-25T22:19:00Z",
    				eta: "2020-07-26T00:22:00Z"
    			},
    			"2020-07-26T00:45:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:45:00Z",
    				actual_departure: "2020-07-26T00:43:00Z",
    				eta: "2020-07-26T02:42:00Z"
    			},
    			"2020-07-26T03:16:00Z": {
    				vessel: "Coastal Inspiration",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T03:16:00Z",
    				actual_departure: "2020-07-26T03:15:00Z",
    				eta: "2020-07-26T05:16:00Z"
    			},
    			"2020-07-26T05:46:00Z": {
    				vessel: "Queen of Alberni",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:46:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Departure Bay to Horseshoe Bay",
    		average_sailing: "1 hour 40 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T13:25:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T13:25:00Z",
    				actual_departure: "2020-07-25T13:25:00Z",
    				eta: "2020-07-25T15:10:00Z"
    			},
    			"2020-07-25T15:45:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:45:00Z",
    				actual_departure: "2020-07-25T15:53:00Z",
    				eta: "2020-07-25T17:34:00Z"
    			},
    			"2020-07-25T18:05:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:05:00Z",
    				actual_departure: "2020-07-25T18:14:00Z",
    				eta: "2020-07-25T19:50:00Z"
    			},
    			"2020-07-25T20:25:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:25:00Z",
    				actual_departure: "2020-07-25T20:30:00Z",
    				eta: "2020-07-25T22:12:00Z"
    			},
    			"2020-07-25T22:55:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:55:00Z",
    				actual_departure: "2020-07-25T22:55:00Z",
    				eta: "2020-07-26T00:34:00Z"
    			},
    			"2020-07-26T01:15:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T01:15:00Z",
    				actual_departure: "2020-07-26T01:16:00Z",
    				eta: "2020-07-26T03:02:00Z"
    			},
    			"2020-07-26T03:30:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T03:30:00Z",
    				actual_departure: "2020-07-26T03:30:00Z",
    				eta: "2020-07-26T05:10:00Z"
    			},
    			"2020-07-26T05:40:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:40:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Horseshoe Bay to Snug Cove (Bowen Is.)",
    		average_sailing: "20 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T12:50:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T12:50:00Z",
    				actual_departure: "2020-07-25T12:51:00Z",
    				eta: null
    			},
    			"2020-07-25T13:50:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T13:50:00Z",
    				actual_departure: "2020-07-25T13:49:00Z",
    				eta: "2020-07-25T14:10:00Z"
    			},
    			"2020-07-25T15:00:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:00:00Z",
    				actual_departure: "2020-07-25T14:58:00Z",
    				eta: "2020-07-25T15:18:00Z"
    			},
    			"2020-07-25T16:05:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T16:05:00Z",
    				actual_departure: "2020-07-25T16:07:00Z",
    				eta: "2020-07-25T16:24:00Z"
    			},
    			"2020-07-25T17:10:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T17:10:00Z",
    				actual_departure: "2020-07-25T17:17:00Z",
    				eta: "2020-07-25T17:34:00Z"
    			},
    			"2020-07-25T18:15:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "We are loading as many vehicles as possible",
    				scheduled_departure: "2020-07-25T18:15:00Z",
    				actual_departure: "2020-07-25T18:29:00Z",
    				eta: "2020-07-25T18:46:00Z"
    			},
    			"2020-07-25T19:45:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T19:45:00Z",
    				actual_departure: "2020-07-25T19:49:00Z",
    				eta: "2020-07-25T20:06:00Z"
    			},
    			"2020-07-25T20:55:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:55:00Z",
    				actual_departure: "2020-07-25T20:55:00Z",
    				eta: "2020-07-25T21:15:00Z"
    			},
    			"2020-07-25T22:20:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:20:00Z",
    				actual_departure: "2020-07-25T22:20:00Z",
    				eta: "2020-07-25T22:36:00Z"
    			},
    			"2020-07-25T23:40:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T23:40:00Z",
    				actual_departure: "2020-07-25T23:40:00Z",
    				eta: "2020-07-25T23:56:00Z"
    			},
    			"2020-07-26T00:45:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:45:00Z",
    				actual_departure: "2020-07-26T00:45:00Z",
    				eta: "2020-07-26T01:00:00Z"
    			},
    			"2020-07-26T01:50:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T01:50:00Z",
    				actual_departure: "2020-07-26T01:50:00Z",
    				eta: "2020-07-26T02:10:00Z"
    			},
    			"2020-07-26T04:20:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T04:20:00Z",
    				actual_departure: null,
    				eta: null
    			},
    			"2020-07-26T05:20:00Z": {
    				vessel: "Queen of Capilano",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:20:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Horseshoe Bay to Departure Bay",
    		average_sailing: "1 hour 40 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T13:25:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T13:25:00Z",
    				actual_departure: "2020-07-25T13:30:00Z",
    				eta: "2020-07-25T15:12:00Z"
    			},
    			"2020-07-25T15:45:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:45:00Z",
    				actual_departure: "2020-07-25T15:48:00Z",
    				eta: "2020-07-25T17:32:00Z"
    			},
    			"2020-07-25T18:05:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:05:00Z",
    				actual_departure: "2020-07-25T18:10:00Z",
    				eta: "2020-07-25T19:52:00Z"
    			},
    			"2020-07-25T20:25:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:25:00Z",
    				actual_departure: "2020-07-25T20:27:00Z",
    				eta: "2020-07-25T22:10:00Z"
    			},
    			"2020-07-25T22:55:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:55:00Z",
    				actual_departure: "2020-07-25T22:55:00Z",
    				eta: "2020-07-26T00:40:00Z"
    			},
    			"2020-07-26T01:15:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T01:15:00Z",
    				actual_departure: "2020-07-26T01:15:00Z",
    				eta: "2020-07-26T02:54:00Z"
    			},
    			"2020-07-26T03:30:00Z": {
    				vessel: "Queen of Oak Bay",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T03:30:00Z",
    				actual_departure: "2020-07-26T03:30:00Z",
    				eta: "2020-07-26T05:10:00Z"
    			},
    			"2020-07-26T05:40:00Z": {
    				vessel: "Queen of Cowichan",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:40:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Horseshoe Bay to Langdale",
    		average_sailing: "40 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T14:30:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T14:30:00Z",
    				actual_departure: "2020-07-25T14:33:00Z",
    				eta: "2020-07-25T15:12:00Z"
    			},
    			"2020-07-25T16:50:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T16:50:00Z",
    				actual_departure: "2020-07-25T16:51:00Z",
    				eta: "2020-07-25T17:30:00Z"
    			},
    			"2020-07-25T19:10:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T19:10:00Z",
    				actual_departure: "2020-07-25T19:14:00Z",
    				eta: "2020-07-25T19:52:00Z"
    			},
    			"2020-07-25T21:26:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T21:26:00Z",
    				actual_departure: "2020-07-25T21:27:00Z",
    				eta: "2020-07-25T22:04:00Z"
    			},
    			"2020-07-25T23:45:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T23:45:00Z",
    				actual_departure: "2020-07-25T23:47:00Z",
    				eta: "2020-07-26T00:26:00Z"
    			},
    			"2020-07-26T02:05:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T02:05:00Z",
    				actual_departure: "2020-07-26T02:06:00Z",
    				eta: "2020-07-26T02:46:00Z"
    			},
    			"2020-07-26T04:25:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T04:25:00Z",
    				actual_departure: null,
    				eta: null
    			},
    			"2020-07-26T06:30:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T06:30:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	},
    	{
    		route_name: "Langdale to Horseshoe Bay",
    		average_sailing: "40 minutes",
    		sailing_date: "2020-07-25",
    		sailings: {
    			"2020-07-25T13:20:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T13:20:00Z",
    				actual_departure: "2020-07-25T13:20:00Z",
    				eta: "2020-07-25T14:00:00Z"
    			},
    			"2020-07-25T15:40:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T15:40:00Z",
    				actual_departure: "2020-07-25T15:40:00Z",
    				eta: "2020-07-25T16:18:00Z"
    			},
    			"2020-07-25T18:00:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T18:00:00Z",
    				actual_departure: "2020-07-25T18:02:00Z",
    				eta: "2020-07-25T18:40:00Z"
    			},
    			"2020-07-25T20:15:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T20:15:00Z",
    				actual_departure: "2020-07-25T20:20:00Z",
    				eta: "2020-07-25T20:58:00Z"
    			},
    			"2020-07-25T22:35:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-25T22:35:00Z",
    				actual_departure: "2020-07-25T22:36:00Z",
    				eta: "2020-07-25T23:14:00Z"
    			},
    			"2020-07-26T00:55:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T00:55:00Z",
    				actual_departure: "2020-07-26T00:56:00Z",
    				eta: "2020-07-26T01:38:00Z"
    			},
    			"2020-07-26T03:15:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "On Time",
    				scheduled_departure: "2020-07-26T03:15:00Z",
    				actual_departure: "2020-07-26T03:15:00Z",
    				eta: "2020-07-26T03:55:00Z"
    			},
    			"2020-07-26T05:30:00Z": {
    				vessel: "Queen of Surrey",
    				sailing_status: "",
    				scheduled_departure: "2020-07-26T05:30:00Z",
    				actual_departure: null,
    				eta: null
    			}
    		}
    	}
    ];

    /* src/Route.svelte generated by Svelte v3.24.0 */

    const { Object: Object_1 } = globals;
    const file = "src/Route.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (15:0) {#each Object.values(sailings) as sailing}
    function create_each_block(ctx) {
    	let p0;
    	let t0_value = /*sailing*/ ctx[4].scheduled_departure + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*sailing*/ ctx[4].actual_departure + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*sailing*/ ctx[4].eta + "";
    	let t4;
    	let t5;
    	let p3;
    	let t6_value = /*sailing*/ ctx[4].sailing_status + "";
    	let t6;
    	let t7;
    	let p4;
    	let t8_value = /*sailing*/ ctx[4].vessel + "";
    	let t8;
    	let t9;
    	let pre;
    	let t10_value = JSON.stringify(/*sailing*/ ctx[4], null, 2) + "";
    	let t10;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = space();
    			p3 = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			p4 = element("p");
    			t8 = text(t8_value);
    			t9 = space();
    			pre = element("pre");
    			t10 = text(t10_value);
    			add_location(p0, file, 15, 2, 296);
    			add_location(p1, file, 16, 2, 335);
    			add_location(p2, file, 17, 2, 371);
    			add_location(p3, file, 18, 2, 394);
    			add_location(p4, file, 19, 2, 428);
    			add_location(pre, file, 20, 2, 454);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p4, anchor);
    			append_dev(p4, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, pre, anchor);
    			append_dev(pre, t10);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sailings*/ 4 && t0_value !== (t0_value = /*sailing*/ ctx[4].scheduled_departure + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*sailings*/ 4 && t2_value !== (t2_value = /*sailing*/ ctx[4].actual_departure + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*sailings*/ 4 && t4_value !== (t4_value = /*sailing*/ ctx[4].eta + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*sailings*/ 4 && t6_value !== (t6_value = /*sailing*/ ctx[4].sailing_status + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*sailings*/ 4 && t8_value !== (t8_value = /*sailing*/ ctx[4].vessel + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*sailings*/ 4 && t10_value !== (t10_value = JSON.stringify(/*sailing*/ ctx[4], null, 2) + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(pre);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(15:0) {#each Object.values(sailings) as sailing}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t0;
    	let h1;
    	let t1;
    	let t2;
    	let h2;
    	let t3;
    	let t4;
    	let t5;
    	let pre;
    	let t6;
    	let each_value = Object.values(/*sailings*/ ctx[2]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			h1 = element("h1");
    			t1 = text(/*route_name*/ ctx[0]);
    			t2 = space();
    			h2 = element("h2");
    			t3 = text(/*average_sailing*/ ctx[1]);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			pre = element("pre");
    			t6 = text(/*sailings*/ ctx[2]);
    			document.title = "Ferrytime";
    			add_location(h1, file, 11, 0, 201);
    			add_location(h2, file, 12, 0, 223);
    			add_location(pre, file, 23, 0, 509);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t3);
    			insert_dev(target, t4, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t5, anchor);
    			insert_dev(target, pre, anchor);
    			append_dev(pre, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*route_name*/ 1) set_data_dev(t1, /*route_name*/ ctx[0]);
    			if (dirty & /*average_sailing*/ 2) set_data_dev(t3, /*average_sailing*/ ctx[1]);

    			if (dirty & /*JSON, Object, sailings*/ 4) {
    				each_value = Object.values(/*sailings*/ ctx[2]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t5.parentNode, t5);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*sailings*/ 4) set_data_dev(t6, /*sailings*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t4);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(pre);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { route_name = "" } = $$props;
    	let { average_sailing = "" } = $$props;
    	let { sailing_date = "" } = $$props;
    	let { sailings = {} } = $$props;
    	const writable_props = ["route_name", "average_sailing", "sailing_date", "sailings"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Route> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Route", $$slots, []);

    	$$self.$set = $$props => {
    		if ("route_name" in $$props) $$invalidate(0, route_name = $$props.route_name);
    		if ("average_sailing" in $$props) $$invalidate(1, average_sailing = $$props.average_sailing);
    		if ("sailing_date" in $$props) $$invalidate(3, sailing_date = $$props.sailing_date);
    		if ("sailings" in $$props) $$invalidate(2, sailings = $$props.sailings);
    	};

    	$$self.$capture_state = () => ({
    		route_name,
    		average_sailing,
    		sailing_date,
    		sailings
    	});

    	$$self.$inject_state = $$props => {
    		if ("route_name" in $$props) $$invalidate(0, route_name = $$props.route_name);
    		if ("average_sailing" in $$props) $$invalidate(1, average_sailing = $$props.average_sailing);
    		if ("sailing_date" in $$props) $$invalidate(3, sailing_date = $$props.sailing_date);
    		if ("sailings" in $$props) $$invalidate(2, sailings = $$props.sailings);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [route_name, average_sailing, sailings, sailing_date];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			route_name: 0,
    			average_sailing: 1,
    			sailing_date: 3,
    			sailings: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get route_name() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set route_name(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get average_sailing() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set average_sailing(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sailing_date() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sailing_date(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sailings() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sailings(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.24.0 */
    const file$1 = "src/App.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (14:2) {#each data as route}
    function create_each_block$1(ctx) {
    	let li;
    	let t_value = /*route*/ ctx[1].route_name + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[2](/*route*/ ctx[1], ...args);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$1, 14, 4, 278);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(14:2) {#each data as route}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t0;
    	let ul;
    	let t1;
    	let route_1;
    	let current;
    	let each_value = data;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const route_1_spread_levels = [/*route*/ ctx[1]];
    	let route_1_props = {};

    	for (let i = 0; i < route_1_spread_levels.length; i += 1) {
    		route_1_props = assign(route_1_props, route_1_spread_levels[i]);
    	}

    	route_1 = new Route({ props: route_1_props, $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(route_1.$$.fragment);
    			document.title = "Ferrytime";
    			add_location(ul, file$1, 12, 0, 244);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			insert_dev(target, t1, anchor);
    			mount_component(route_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selected, data*/ 1) {
    				each_value = data;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const route_1_changes = (dirty & /*route*/ 2)
    			? get_spread_update(route_1_spread_levels, [get_spread_object(/*route*/ ctx[1])])
    			: {};

    			route_1.$set(route_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let selected = "";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const click_handler = (route, e) => $$invalidate(0, selected = route.route_name);
    	$$self.$capture_state = () => ({ data, Route, selected, route });

    	$$self.$inject_state = $$props => {
    		if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
    		if ("route" in $$props) $$invalidate(1, route = $$props.route);
    	};

    	let route;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selected*/ 1) {
    			 $$invalidate(1, route = data.filter(route => route.route_name === selected)[0]);
    		}
    	};

    	return [selected, route, click_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
