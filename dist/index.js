'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.GliderComponent = void 0;
var react_1 = __importDefault(require('react'));
var auto_id_1 = require('@reach/auto-id');
// tslint:disable-next-line
require('glider-js');
exports.GliderComponent = react_1.default.forwardRef(function (props, ref) {
  var innerRef = react_1.default.useRef(null);
  var gliderRef = react_1.default.useRef();
  var isMountedRef = react_1.default.useRef(false);
  var autoId = auto_id_1.useId();
  var nextBtnId = 'glider-next-' + autoId;
  var prevBtnId = 'glider-prev-' + autoId;
  var dotsId = 'dots-' + autoId;
  var makeGliderOptions = function () {
    return __assign(__assign({}, props), {
      arrows:
        (props.hasArrows && {
          next:
            (props.arrows && props.arrows.next && props.arrows.next) ||
            '#' + nextBtnId,
          prev:
            (props.arrows && props.arrows.prev && props.arrows.prev) ||
            '#' + prevBtnId,
        }) ||
        undefined,
      dots: (props.hasDots && props.dots) || '#' + dotsId || undefined,
    });
  };
  // On mount initialize the glider and hook up events
  react_1.default.useLayoutEffect(function () {
    if (!innerRef.current) {
      return;
    }
    // @ts-ignore
    var glider = new Glider(innerRef.current, makeGliderOptions());
    gliderRef.current = glider;
    var addEventListener = function (event, fn) {
      if (typeof fn === 'function' && innerRef.current) {
        innerRef.current.addEventListener(event, fn);
      }
    };
    addEventListener('glider-slide-visible', props.onSlideVisible);
    addEventListener('glider-loaded', props.onLoad);
    addEventListener('glider-animated', props.onAnimated);
    addEventListener('glider-remove', props.onRemove);
    addEventListener('glider-refresh', props.onRefresh);
    addEventListener('glider-add', props.onAdd);
    addEventListener('glider-destroy', props.onDestroy);
    addEventListener('glider-slide-hidden', props.onSlideHidden);
    if (props.scrollToSlide) {
      glider.scrollItem(props.scrollToSlide - 1);
    } else if (props.scrollToPage) {
      glider.scrollItem(props.scrollToPage - 1, true);
    }
  }, []);
  react_1.default.useEffect(function () {
    isMountedRef.current = true;
    return function () {
      var removeEventListener = function (event, fn) {
        if (typeof fn === 'function' && innerRef.current) {
          innerRef.current.removeEventListener(event, fn);
        }
      };
      removeEventListener('glider-slide-visible', props.onSlideVisible);
      removeEventListener('glider-loaded', props.onLoad);
      removeEventListener('glider-animated', props.onAnimated);
      removeEventListener('glider-remove', props.onRemove);
      removeEventListener('glider-refresh', props.onRefresh);
      removeEventListener('glider-add', props.onAdd);
      removeEventListener('glider-destroy', props.onDestroy);
      removeEventListener('glider-slide-hidden', props.onSlideHidden);
      if (gliderRef.current) {
        gliderRef.current.destroy();
      }
    };
  }, []);
  // When the props update, update the glider
  react_1.default.useEffect(
    function () {
      if (!(gliderRef.current && isMountedRef.current)) {
        return;
      }
      gliderRef.current.setOption(makeGliderOptions(), true);
      gliderRef.current.refresh(true);
    },
    [props]
  );
  // Expose the glider instance to the user so they can call the methods too
  react_1.default.useImperativeHandle(ref, function () {
    return gliderRef.current;
  });
  var Element = props.containerElement || 'div';
  return react_1.default.createElement(
    Element,
    { className: 'glider-contain' },
    props.hasArrows &&
      !props.arrows &&
      react_1.default.createElement(
        'button',
        {
          type: 'button',
          className: 'glider-prev',
          'aria-label': 'Previous',
          id: prevBtnId,
        },
        props.iconLeft || '«'
      ),
    react_1.default.createElement(
      'div',
      { className: props.className, ref: innerRef },
      props.children
    ),
    props.hasDots &&
      !props.dots &&
      react_1.default.createElement('div', { id: dotsId }),
    props.hasArrows &&
      !props.arrows &&
      react_1.default.createElement(
        'button',
        {
          type: 'button',
          className: 'glider-next',
          'aria-label': 'Next',
          id: nextBtnId,
        },
        props.iconRight || '»'
      )
  );
});
//# sourceMappingURL=index.js.map
