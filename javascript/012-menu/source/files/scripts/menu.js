
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
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
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    function create_animation(node, from, fn, params) {
        if (!from)
            return noop;
        const to = node.getBoundingClientRect();
        if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
            return noop;
        const { delay = 0, duration = 300, easing = identity, 
        // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
        start: start_time = now() + delay, 
        // @ts-ignore todo:
        end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
        let running = true;
        let started = false;
        let name;
        function start() {
            if (css) {
                name = create_rule(node, 0, 1, duration, delay, easing, css);
            }
            if (!delay) {
                started = true;
            }
        }
        function stop() {
            if (css)
                delete_rule(node, name);
            running = false;
        }
        loop(now => {
            if (!started && now >= start_time) {
                started = true;
            }
            if (started && now >= end) {
                tick(1, 0);
                stop();
            }
            if (!running) {
                return false;
            }
            if (started) {
                const p = now - start_time;
                const t = 0 + 1 * easing(p / duration);
                tick(t, 1 - t);
            }
            return true;
        });
        start();
        tick(0, 1);
        return stop;
    }
    function fix_position(node) {
        const style = getComputedStyle(node);
        if (style.position !== 'absolute' && style.position !== 'fixed') {
            const { width, height } = style;
            const a = node.getBoundingClientRect();
            node.style.position = 'absolute';
            node.style.width = width;
            node.style.height = height;
            add_transform(node, a);
        }
    }
    function add_transform(node, a) {
        const b = node.getBoundingClientRect();
        if (a.left !== b.left || a.top !== b.top) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;
            node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
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
            set_current_component(null);
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

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function fix_and_outro_and_destroy_block(block, lookup) {
        block.f();
        outro_and_destroy_block(block, lookup);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
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
        }
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
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
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
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
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
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
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
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const columns = writable([]);
    const allColumn = ["icon", "textual", "label", "description", "rightIcon", "rightImage"];
    const columnsStore = {
        subscribe: columns.subscribe,
        allColumns: () => { columns.set([...allColumn]); },
        setColumns: (array) => { columns.set([...array]); },
    };

    const items = writable([]);
    const itemsStore = {
        subscribe: items.subscribe,
        clearMenu: () => items.set([]),
        push: (item) => {
            const newItem = Object.assign(Object.assign({}, item), { id: Math.random().toString() });
            items.update(i => {
                return [...i, newItem];
            });
        },
        unshift: (item) => {
            const newItem = Object.assign(Object.assign({}, item), { id: Math.random().toString() });
            items.update(i => {
                return [newItem, ...i];
            });
        },
        shift: () => {
            items.update(i => {
                const elements = [...i];
                elements.shift();
                return [...elements];
            });
        },
        pop: () => {
            items.update(i => {
                const elements = [...i];
                elements.pop();
                return [...elements];
            });
        },
        addItemAtIndex: (index, item) => {
            const newItem = Object.assign(Object.assign({}, item), { id: Math.random().toString() });
            items.update(i => {
                const elements = [...i];
                elements.splice(index, 0, newItem);
                return elements;
            });
        },
        updateItemById: (id, item) => {
            items.update(i => {
                const index = i.findIndex(el => el.id === id);
                const updateItem = Object.assign(Object.assign({}, i[index]), item);
                const updateItems = [...i];
                updateItems[index] = updateItem;
                return updateItems;
            });
        },
        updateItemByLabel: (label, item) => {
            items.update(i => {
                const index = i.findIndex(el => el.label === label);
                const updateItem = Object.assign(Object.assign({}, i[index]), item);
                const updateItems = [...i];
                updateItems[index] = updateItem;
                return updateItems;
            });
        },
        updateItemByIndex: (index, item) => {
            items.update(i => {
                const updateItem = Object.assign(Object.assign({}, i[index]), item);
                const updateItems = [...i];
                updateItems[index] = updateItem;
                return updateItems;
            });
        },
        removeItemById: (id) => {
            items.update(i => i.filter(el => el.id !== id));
        },
        removeItemByLabel: (label) => {
            items.update(i => i.filter(el => el.label !== label));
        },
        removeItemByIndex: (index) => {
            items.update(i => {
                const array = [...i];
                array.splice(index, 1);
                const updateItems = [...array];
                return updateItems;
            });
        },
        loadItemsFromArray: (arrayItems) => {
            const newItems = arrayItems.map(el => {
                return Object.assign({ id: Math.random().toString() }, el);
            });
            items.set(newItems);
        },
        //TO DO: DISABLE ITEM
    };

    const GoldMiner = {
        'color-primary': '#a3700a',
        'color-background': '#100408',
        'modal-background': '#000000bf',
    };

    const Bouron = {
        'color-primary': '#ED6E0F',
        'color-background': '#1F1B0F',
        'modal-background': '#F4ECE1bf'
    };

    const Oscar = {
        'color-primary': '#FF7BC4',
        'color-background': '#2A495D',
        'modal-background': '#F0D2CAbf',
    };

    const HerreraYellow = {
        'color-primary': '#FABA1C',
        'color-background': '#B4B5B9',
        'modal-background': '#B4B5B9bf',
    };
    const HerreraGreen = {
        'color-primary': '#375A3A',
        'color-background': '#B4B5B9',
        'modal-background': '#B4B5B9bf',
    };
    const HerreraBlue = {
        'color-primary': '#354CC0',
        'color-background': '#B4B5B9',
        'modal-background': '#B4B5B9bf',
    };
    const HerreraMagenta = {
        'color-primary': '#F84C58',
        'color-background': '#B4B5B9',
        'modal-background': '#B4B5B9bf',
    };

    const Dark = {
        'color-primary': '#C8C8C8',
        'color-background': '#282828',
        'modal-background': '#969696bf',
    };
    const Light = {
        'color-primary': '#282828',
        'color-background': '#C8C8C8',
        'modal-background': '#969696bf',
    };

    const themes = {
        "Gold Miner": GoldMiner,
        "Bouron": Bouron,
        "Oscar": Oscar,
        "Herrera Yellow": HerreraYellow,
        "Herrera Green": HerreraGreen,
        "Herrera Blue": HerreraBlue,
        "Herrera Magenta": HerreraMagenta,
        "Dark": Dark,
        "Light": Light
    };

    let stylesDefault = {
        'cssVarStyles': "",
        'color-primary': '#a3700a',
        'color-background': '#100408',
        'font-title': "Roboto, sans-serif",
        'font-items': "Roboto, sans-serif",
        'modal-background': '#000000bf',
        'menu-width': "auto",
        'menu-min-width': "128px",
        'menu-max-width': "80%",
        'menu-max-height': "80vh",
        'menu-border-radius': "4px",
        'menu-border-style': "solid",
        'menu-border-width': "1px",
        'item-height': "48px",
        'item-icon-size': "32px",
        'item-image-size': "48px",
    };
    const styles = writable(stylesDefault);
    const stylesStore = {
        subscribe: styles.subscribe,
        init: () => {
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        changeStyle: (style, value) => {
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle[style] = value;
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        changeFontTitle: (value) => {
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle['font-title'] = value;
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        changeFontItems: (value) => {
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle['font-items'] = value;
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        changeFontTitleAndItems: (title, items) => {
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle['font-title'] = title;
                newStyle['font-items'] = items;
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        themeStandard: (theme) => {
            const newTheme = Object.assign({}, themes[theme]);
            styles.update(s => {
                const newStyle = Object.assign(Object.assign({}, s), newTheme);
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        },
        loadTheme: (t, standard = "Light") => {
            console.log("loadTheme");
            console.log(t);
            const standardTheme = Object.assign({}, themes[standard]);
            styles.update(s => {
                const newStyle = Object.assign(Object.assign({}, s), standardTheme);
                return newStyle;
            });
            const newTheme = Object.assign({}, t);
            styles.update(s => {
                const newStyle = Object.assign(Object.assign({}, s), newTheme);
                return newStyle;
            });
            const cssVarStyles = getCssVarStyles();
            styles.update(s => {
                const newStyle = Object.assign({}, s);
                newStyle.cssVarStyles = cssVarStyles;
                return newStyle;
            });
        }
    };
    function getCssVarStyles() {
        const s = get_store_value(styles);
        const cssVarStyles = Object.entries(s)
            .map(([key, value]) => {
            return key !== "cssVarStyles" ? `--${key}:${value};` : "";
        }).join('');
        return cssVarStyles;
    }

    const titles = writable("Hello World!");
    const titlesStore = {
        subscribe: titles.subscribe,
        setTitle: (title) => titles.set(title),
        reset: () => titles.set("Menu"),
        clear: () => titles.set("")
    };

    const visibility = writable(false);
    const visibilityStore = {
        subscribe: visibility.subscribe,
        true: () => visibility.set(true),
        false: () => visibility.set(false)
    };

    function initializeMenuSvelte() {
        if (!!!globalThis.menuSvelte) {
            globalThis.menuSvelte = {};
        }
        globalThis.menuSvelte.columns = columnsStore;
        globalThis.menuSvelte.items = itemsStore;
        globalThis.menuSvelte.css = stylesStore;
        globalThis.menuSvelte.title = titlesStore;
        globalThis.menuSvelte.visible = visibilityStore;
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function flip(node, animation, params = {}) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const scaleX = animation.from.width / node.clientWidth;
        const scaleY = animation.from.height / node.clientHeight;
        const dx = (animation.from.left - animation.to.left) / scaleX;
        const dy = (animation.from.top - animation.to.top) / scaleY;
        const d = Math.sqrt(dx * dx + dy * dy);
        const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
        return {
            delay,
            duration: is_function(duration) ? duration(d) : duration,
            easing,
            css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
        };
    }

    /* src\Components\Modal.svelte generated by Svelte v3.38.2 */
    const file$4 = "src\\Components\\Modal.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let div_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "modal svelte-1yqu2p3");
    			add_location(div, file$4, 3, 0, 74);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Modal", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fade });
    	return [];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Components\Menu.svelte generated by Svelte v3.38.2 */
    const file$3 = "src\\Components\\Menu.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    const get_item_slot_changes = dirty => ({
    	prop: dirty & /*items*/ 1,
    	columns: dirty & /*columns*/ 2
    });

    const get_item_slot_context = ctx => ({
    	prop: /*item*/ ctx[8],
    	columns: /*columns*/ ctx[1]
    });

    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({ class: "header" });

    // (18:43) No header was provided
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("No header was provided");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(18:43) No header was provided",
    		ctx
    	});

    	return block;
    }

    // (20:12) {#each items as item (item.id)}
    function create_each_block(key_1, ctx) {
    	let span;
    	let t;
    	let rect;
    	let stop_animation = noop;
    	let current;
    	const item_slot_template = /*#slots*/ ctx[4].item;
    	const item_slot = create_slot(item_slot_template, ctx, /*$$scope*/ ctx[3], get_item_slot_context);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			span = element("span");
    			if (item_slot) item_slot.c();
    			t = space();
    			add_location(span, file$3, 20, 16, 726);
    			this.first = span;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (item_slot) {
    				item_slot.m(span, null);
    			}

    			append_dev(span, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (item_slot) {
    				if (item_slot.p && (!current || dirty & /*$$scope, items, columns*/ 11)) {
    					update_slot(item_slot, item_slot_template, ctx, /*$$scope*/ ctx[3], dirty, get_item_slot_changes, get_item_slot_context);
    				}
    			}
    		},
    		r: function measure() {
    			rect = span.getBoundingClientRect();
    		},
    		f: function fix() {
    			fix_position(span);
    			stop_animation();
    		},
    		a: function animate() {
    			stop_animation();
    			stop_animation = create_animation(span, rect, flip, {});
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (item_slot) item_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(20:12) {#each items as item (item.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let modal;
    	let t0;
    	let div2;
    	let div1;
    	let t1;
    	let div0;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let div1_transition;
    	let current;
    	let mounted;
    	let dispose;
    	modal = new Modal({ $$inline: true });
    	modal.$on("closeModal", /*closeModal_handler*/ ctx[6]);
    	const header_slot_template = /*#slots*/ ctx[4].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[3], get_header_slot_context);
    	const header_slot_or_fallback = header_slot || fallback_block(ctx);
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*item*/ ctx[8].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (header_slot_or_fallback) header_slot_or_fallback.c();
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "scrollbar svelte-leskwv");
    			add_location(div0, file$3, 18, 8, 640);
    			attr_dev(div1, "class", "menu svelte-leskwv");
    			add_location(div1, file$3, 16, 4, 455);
    			attr_dev(div2, "class", "flex-container svelte-leskwv");
    			add_location(div2, file$3, 15, 0, 368);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);

    			if (header_slot_or_fallback) {
    				header_slot_or_fallback.m(div1, null);
    			}

    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", stop_propagation(prevent_default(/*click_handler*/ ctx[5])), false, true, true),
    					listen_dev(div2, "click", stop_propagation(prevent_default(/*closeModal*/ ctx[2])), false, true, true)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (header_slot) {
    				if (header_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[3], dirty, get_header_slot_changes, get_header_slot_context);
    				}
    			}

    			if (dirty & /*$$scope, items, columns*/ 11) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, fix_and_outro_and_destroy_block, create_each_block, null, get_each_context);
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			transition_in(header_slot_or_fallback, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { y: 600, duration: 750 }, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			transition_out(header_slot_or_fallback, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { y: 600, duration: 750 }, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			if (header_slot_or_fallback) header_slot_or_fallback.d(detaching);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (detaching && div1_transition) div1_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Menu", slots, ['header','item']);
    	
    	let { items } = $$props;
    	let { columns } = $$props;
    	const dispatch = createEventDispatcher();

    	function closeModal() {
    		dispatch("closeModal");
    	}

    	const writable_props = ["items", "columns"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function closeModal_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("columns" in $$props) $$invalidate(1, columns = $$props.columns);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fly,
    		flip,
    		Modal,
    		items,
    		columns,
    		dispatch,
    		closeModal
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("columns" in $$props) $$invalidate(1, columns = $$props.columns);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, columns, closeModal, $$scope, slots, click_handler, closeModal_handler];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { items: 0, columns: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*items*/ ctx[0] === undefined && !("items" in props)) {
    			console.warn("<Menu> was created without expected prop 'items'");
    		}

    		if (/*columns*/ ctx[1] === undefined && !("columns" in props)) {
    			console.warn("<Menu> was created without expected prop 'columns'");
    		}
    	}

    	get items() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get columns() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set columns(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Components\Menu\Header.svelte generated by Svelte v3.38.2 */

    const file$2 = "src\\Components\\Menu\\Header.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(div, "class", "svelte-zighlj");
    			add_location(div, file$2, 3, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, []);
    	let { title = "Menu" } = $$props;
    	const writable_props = ["title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title });

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get title() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Components\Menu\Item.svelte generated by Svelte v3.38.2 */

    const file$1 = "src\\Components\\Menu\\Item.svelte";

    // (11:4) {#if columns.includes("icon")}
    function create_if_block_7(ctx) {
    	let div;
    	let if_block = /*icon*/ ctx[2] && /*icon*/ ctx[2] !== "" && create_if_block_8(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "icon svelte-1nbq88k");
    			add_location(div, file$1, 11, 8, 722);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[2] && /*icon*/ ctx[2] !== "") if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(11:4) {#if columns.includes(\\\"icon\\\")}",
    		ctx
    	});

    	return block;
    }

    // (13:12) {#if icon && icon !== ""}
    function create_if_block_8(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "icon image svelte-1nbq88k");
    			set_style(div, "mask", "url(" + /*icon*/ ctx[2] + ") no-repeat center / contain");
    			set_style(div, "-webkit-mask", "url(" + /*icon*/ ctx[2] + ") no-repeat center / contain");
    			add_location(div, file$1, 13, 16, 797);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(13:12) {#if icon && icon !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (23:4) {#if columns.includes("textual") || columns.includes("label") || columns.includes("description")}
    function create_if_block_4(ctx) {
    	let div;
    	let show_if_1 = /*columns*/ ctx[0].includes("label") && /*label*/ ctx[3] && /*label*/ ctx[3] !== "";
    	let t;
    	let show_if = /*columns*/ ctx[0].includes("description") && /*description*/ ctx[4] && /*description*/ ctx[4] !== "";
    	let if_block0 = show_if_1 && create_if_block_6(ctx);
    	let if_block1 = show_if && create_if_block_5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", "textual");
    			add_location(div, file$1, 23, 8, 1173);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns*/ 1) show_if_1 = /*columns*/ ctx[0].includes("label") && /*label*/ ctx[3] && /*label*/ ctx[3] !== "";

    			if (show_if_1) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					if_block0.m(div, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*columns*/ 1) show_if = /*columns*/ ctx[0].includes("description") && /*description*/ ctx[4] && /*description*/ ctx[4] !== "";

    			if (show_if) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(23:4) {#if columns.includes(\\\"textual\\\") || columns.includes(\\\"label\\\") || columns.includes(\\\"description\\\")}",
    		ctx
    	});

    	return block;
    }

    // (25:12) {#if columns.includes("label") && label && label !== ""}
    function create_if_block_6(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = `${/*label*/ ctx[3]}`;
    			attr_dev(div, "class", "label svelte-1nbq88k");
    			add_location(div, file$1, 25, 16, 1282);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(25:12) {#if columns.includes(\\\"label\\\") && label && label !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (28:12) {#if columns.includes("description") && description && description !== ""}
    function create_if_block_5(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = `${/*description*/ ctx[4]}`;
    			attr_dev(div, "class", "description svelte-1nbq88k");
    			add_location(div, file$1, 28, 16, 1439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(28:12) {#if columns.includes(\\\"description\\\") && description && description !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (34:4) {#if columns.includes("rightIcon")}
    function create_if_block_2(ctx) {
    	let div;
    	let if_block = /*rightIcon*/ ctx[7] && /*rightIcon*/ ctx[7] !== "" && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "icon svelte-1nbq88k");
    			add_location(div, file$1, 34, 8, 1582);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*rightIcon*/ ctx[7] && /*rightIcon*/ ctx[7] !== "") if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(34:4) {#if columns.includes(\\\"rightIcon\\\")}",
    		ctx
    	});

    	return block;
    }

    // (36:12) {#if rightIcon && rightIcon !== ""}
    function create_if_block_3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "icon image svelte-1nbq88k");
    			set_style(div, "mask", "url(" + /*rightIcon*/ ctx[7] + ") no-repeat center / contain");
    			set_style(div, "-webkit-mask", "url(" + /*rightIcon*/ ctx[7] + ") no-repeat center / contain");
    			add_location(div, file$1, 36, 16, 1667);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(36:12) {#if rightIcon && rightIcon !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (46:4) {#if columns.includes("rightImage")}
    function create_if_block$1(ctx) {
    	let div;
    	let if_block = /*rightImage*/ ctx[5] && /*rightImage*/ ctx[5] !== "" && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "rightImage");
    			add_location(div, file$1, 46, 8, 1992);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*rightImage*/ ctx[5] && /*rightImage*/ ctx[5] !== "") if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(46:4) {#if columns.includes(\\\"rightImage\\\")}",
    		ctx
    	});

    	return block;
    }

    // (48:12) {#if rightImage && rightImage !== ""}
    function create_if_block_1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "image svelte-1nbq88k");
    			if (img.src !== (img_src_value = /*rightImage*/ ctx[5])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*label*/ ctx[3]);
    			add_location(img, file$1, 48, 16, 2085);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(48:12) {#if rightImage && rightImage !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let show_if_3 = /*columns*/ ctx[0].includes("icon");
    	let t0;
    	let show_if_2 = /*columns*/ ctx[0].includes("textual") || /*columns*/ ctx[0].includes("label") || /*columns*/ ctx[0].includes("description");
    	let t1;
    	let show_if_1 = /*columns*/ ctx[0].includes("rightIcon");
    	let t2;
    	let show_if = /*columns*/ ctx[0].includes("rightImage");
    	let mounted;
    	let dispose;
    	let if_block0 = show_if_3 && create_if_block_7(ctx);
    	let if_block1 = show_if_2 && create_if_block_4(ctx);
    	let if_block2 = show_if_1 && create_if_block_2(ctx);
    	let if_block3 = show_if && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			attr_dev(div, "class", "row svelte-1nbq88k");
    			attr_dev(div, "onclick", /*onClick*/ ctx[6]);
    			attr_dev(div, "style", /*styleColumn*/ ctx[1]);
    			add_location(div, file$1, 8, 0, 575);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t1);
    			if (if_block2) if_block2.m(div, null);
    			append_dev(div, t2);
    			if (if_block3) if_block3.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", stop_propagation(prevent_default(/*click_handler*/ ctx[9])), false, true, true);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*columns*/ 1) show_if_3 = /*columns*/ ctx[0].includes("icon");

    			if (show_if_3) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*columns*/ 1) show_if_2 = /*columns*/ ctx[0].includes("textual") || /*columns*/ ctx[0].includes("label") || /*columns*/ ctx[0].includes("description");

    			if (show_if_2) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*columns*/ 1) show_if_1 = /*columns*/ ctx[0].includes("rightIcon");

    			if (show_if_1) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_2(ctx);
    					if_block2.c();
    					if_block2.m(div, t2);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*columns*/ 1) show_if = /*columns*/ ctx[0].includes("rightImage");

    			if (show_if) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block$1(ctx);
    					if_block3.c();
    					if_block3.m(div, null);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (dirty & /*styleColumn*/ 2) {
    				attr_dev(div, "style", /*styleColumn*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			dispose();
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
    	let styleColumn;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Item", slots, []);
    	
    	let { item } = $$props;
    	let { columns = ["icon", "textual", "label", "description", "rightIcon", "rightImage"] } = $$props;
    	const { icon, label, description, rightImage, onClick, rightIcon } = item;
    	const writable_props = ["item", "columns"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Item> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("item" in $$props) $$invalidate(8, item = $$props.item);
    		if ("columns" in $$props) $$invalidate(0, columns = $$props.columns);
    	};

    	$$self.$capture_state = () => ({
    		item,
    		columns,
    		icon,
    		label,
    		description,
    		rightImage,
    		onClick,
    		rightIcon,
    		styleColumn
    	});

    	$$self.$inject_state = $$props => {
    		if ("item" in $$props) $$invalidate(8, item = $$props.item);
    		if ("columns" in $$props) $$invalidate(0, columns = $$props.columns);
    		if ("styleColumn" in $$props) $$invalidate(1, styleColumn = $$props.styleColumn);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*columns*/ 1) {
    			$$invalidate(1, styleColumn = `
    grid-template-columns:  ${columns.includes("icon") ? "var(--item-icon-size)" : ""} ${columns.includes("textual") || columns.includes("label") || columns.includes("description")
			? "auto "
			: ""} ${columns.includes("rightIcon")
			? "var(--item-icon-size) "
			: ""} ${columns.includes("rightImage")
			? "var(--item-image-size) "
			: ""};`);
    		}
    	};

    	return [
    		columns,
    		styleColumn,
    		icon,
    		label,
    		description,
    		rightImage,
    		onClick,
    		rightIcon,
    		item,
    		click_handler
    	];
    }

    class Item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { item: 8, columns: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*item*/ ctx[8] === undefined && !("item" in props)) {
    			console.warn("<Item> was created without expected prop 'item'");
    		}
    	}

    	get item() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get columns() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set columns(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Menu.svelte generated by Svelte v3.38.2 */
    const file = "src\\Menu.svelte";

    // (18:1) {#if $visible}
    function create_if_block(ctx) {
    	let menu;
    	let current;

    	menu = new Menu({
    			props: {
    				items: /*$items*/ ctx[2],
    				columns: /*$columns*/ ctx[3],
    				$$slots: {
    					item: [
    						create_item_slot,
    						({ prop: item, columns }) => ({ 5: item, 6: columns }),
    						({ prop: item, columns }) => (item ? 32 : 0) | (columns ? 64 : 0)
    					],
    					header: [
    						create_header_slot,
    						({ prop: item, columns }) => ({ 5: item, 6: columns }),
    						({ prop: item, columns }) => (item ? 32 : 0) | (columns ? 64 : 0)
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menu.$on("closeModal", visibilityStore.false);

    	const block = {
    		c: function create() {
    			create_component(menu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menu_changes = {};
    			if (dirty & /*$items*/ 4) menu_changes.items = /*$items*/ ctx[2];
    			if (dirty & /*$columns*/ 8) menu_changes.columns = /*$columns*/ ctx[3];

    			if (dirty & /*$$scope, item, columns, $title*/ 240) {
    				menu_changes.$$scope = { dirty, ctx };
    			}

    			menu.$set(menu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(18:1) {#if $visible}",
    		ctx
    	});

    	return block;
    }

    // (20:3) 
    function create_header_slot(ctx) {
    	let header;
    	let current;

    	header = new Header({
    			props: { slot: "header", title: /*$title*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const header_changes = {};
    			if (dirty & /*$title*/ 16) header_changes.title = /*$title*/ ctx[4];
    			header.$set(header_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_header_slot.name,
    		type: "slot",
    		source: "(20:3) ",
    		ctx
    	});

    	return block;
    }

    // (21:3) 
    function create_item_slot(ctx) {
    	let item;
    	let current;

    	item = new Item({
    			props: {
    				slot: "item",
    				item: /*item*/ ctx[5],
    				columns: /*columns*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const item_changes = {};
    			if (dirty & /*item*/ 32) item_changes.item = /*item*/ ctx[5];
    			if (dirty & /*columns*/ 64) item_changes.columns = /*columns*/ ctx[6];
    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_item_slot.name,
    		type: "slot",
    		source: "(21:3) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	let if_block = /*$visible*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "id", "page");
    			attr_dev(div, "style", div_style_value = /*$css*/ ctx[0].cssVarStyles);
    			attr_dev(div, "class", "svelte-q2o01f");
    			add_location(div, file, 16, 0, 589);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$visible*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$visible*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*$css*/ 1 && div_style_value !== (div_style_value = /*$css*/ ctx[0].cssVarStyles)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
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
    	let $css;
    	let $visible;
    	let $items;
    	let $columns;
    	let $title;
    	validate_store(stylesStore, "css");
    	component_subscribe($$self, stylesStore, $$value => $$invalidate(0, $css = $$value));
    	validate_store(visibilityStore, "visible");
    	component_subscribe($$self, visibilityStore, $$value => $$invalidate(1, $visible = $$value));
    	validate_store(itemsStore, "items");
    	component_subscribe($$self, itemsStore, $$value => $$invalidate(2, $items = $$value));
    	validate_store(columnsStore, "columns");
    	component_subscribe($$self, columnsStore, $$value => $$invalidate(3, $columns = $$value));
    	validate_store(titlesStore, "title");
    	component_subscribe($$self, titlesStore, $$value => $$invalidate(4, $title = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Menu", slots, []);
    	initializeMenuSvelte();
    	stylesStore.init();
    	columnsStore.allColumns();
    	itemsStore.clearMenu();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		initializeMenuSvelte,
    		css: stylesStore,
    		items: itemsStore,
    		columns: columnsStore,
    		title: titlesStore,
    		visible: visibilityStore,
    		Menu,
    		Header,
    		Item,
    		$css,
    		$visible,
    		$items,
    		$columns,
    		$title
    	});

    	return [$css, $visible, $items, $columns, $title];
    }

    class Menu_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu_1",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const menu = new Menu_1({
        target: document.body,
    });

    return menu;

}());
//# sourceMappingURL=bundle.js.map
