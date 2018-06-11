/**
 * @name joint-extend.js
 * @version v2.1.2
 * @depend joint.2.1.2.js
 */
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {

        // For AMD.

        define(['backbone', 'lodash', 'jquery'], function(Backbone, _, $) {

            Backbone.$ = $;

            return factory(root, Backbone, _, $);
        });

    } else if (typeof exports !== 'undefined') {

        // For Node.js or CommonJS.

        var Backbone = require('backbone');
        var _ = require('lodash');
        var $ = Backbone.$ = require('jquery');

        module.exports = factory(root, Backbone, _, $);

    } else {

        // As a browser global.

        var Backbone = root.Backbone;
        var _ = root._;
        var $ = Backbone.$ = root.jQuery || root.$;

        root.joint = factory(root, Backbone, _, $);
        root.g = root.joint.g;
        root.V = root.Vectorizer = root.joint.V;
    }

}(this, function(root, Backbone, _, $) {

    !function() {
        "use strict";
        "undefined" == typeof window || "SVGPathSeg"in window || (window.SVGPathSeg = function(a, b, c) {
              this.pathSegType = a,
                this.pathSegTypeAsLetter = b,
                this._owningPathSegList = c
          }
            ,
            window.SVGPathSeg.prototype.classname = "SVGPathSeg",
            window.SVGPathSeg.PATHSEG_UNKNOWN = 0,
            window.SVGPathSeg.PATHSEG_CLOSEPATH = 1,
            window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2,
            window.SVGPathSeg.PATHSEG_MOVETO_REL = 3,
            window.SVGPathSeg.PATHSEG_LINETO_ABS = 4,
            window.SVGPathSeg.PATHSEG_LINETO_REL = 5,
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6,
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7,
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8,
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9,
            window.SVGPathSeg.PATHSEG_ARC_ABS = 10,
            window.SVGPathSeg.PATHSEG_ARC_REL = 11,
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12,
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13,
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14,
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15,
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16,
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17,
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18,
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19,
            window.SVGPathSeg.prototype._segmentChanged = function() {
                this._owningPathSegList && this._owningPathSegList.segmentChanged(this)
            }
            ,
            window.SVGPathSegClosePath = function(a) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", a)
            }
            ,
            window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegClosePath.prototype.toString = function() {
                return "[object SVGPathSegClosePath]"
            }
            ,
            window.SVGPathSegClosePath.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter
            }
            ,
            window.SVGPathSegClosePath.prototype.clone = function() {
                return new window.SVGPathSegClosePath((void 0))
            }
            ,
            window.SVGPathSegMovetoAbs = function(a, b, c) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", a),
                  this._x = b,
                  this._y = c
            }
            ,
            window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegMovetoAbs.prototype.toString = function() {
                return "[object SVGPathSegMovetoAbs]"
            }
            ,
            window.SVGPathSegMovetoAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegMovetoAbs.prototype.clone = function() {
                return new window.SVGPathSegMovetoAbs((void 0),this._x,this._y)
            }
            ,
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegMovetoRel = function(a, b, c) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", a),
                  this._x = b,
                  this._y = c
            }
            ,
            window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegMovetoRel.prototype.toString = function() {
                return "[object SVGPathSegMovetoRel]"
            }
            ,
            window.SVGPathSegMovetoRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegMovetoRel.prototype.clone = function() {
                return new window.SVGPathSegMovetoRel((void 0),this._x,this._y)
            }
            ,
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegLinetoAbs = function(a, b, c) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", a),
                  this._x = b,
                  this._y = c
            }
            ,
            window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegLinetoAbs.prototype.toString = function() {
                return "[object SVGPathSegLinetoAbs]"
            }
            ,
            window.SVGPathSegLinetoAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegLinetoAbs.prototype.clone = function() {
                return new window.SVGPathSegLinetoAbs((void 0),this._x,this._y)
            }
            ,
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegLinetoRel = function(a, b, c) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", a),
                  this._x = b,
                  this._y = c
            }
            ,
            window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegLinetoRel.prototype.toString = function() {
                return "[object SVGPathSegLinetoRel]"
            }
            ,
            window.SVGPathSegLinetoRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegLinetoRel.prototype.clone = function() {
                return new window.SVGPathSegLinetoRel((void 0),this._x,this._y)
            }
            ,
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegCurvetoCubicAbs = function(a, b, c, d, e, f, g) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", a),
                  this._x = b,
                  this._y = c,
                  this._x1 = d,
                  this._y1 = e,
                  this._x2 = f,
                  this._y2 = g
            }
            ,
            window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegCurvetoCubicAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicAbs]"
            }
            ,
            window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegCurvetoCubicAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicAbs((void 0),this._x,this._y,this._x1,this._y1,this._x2,this._y2)
            }
            ,
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(a) {
                    this._x1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(a) {
                    this._y1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(a) {
                    this._x2 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(a) {
                    this._y2 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegCurvetoCubicRel = function(a, b, c, d, e, f, g) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", a),
                  this._x = b,
                  this._y = c,
                  this._x1 = d,
                  this._y1 = e,
                  this._x2 = f,
                  this._y2 = g
            }
            ,
            window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegCurvetoCubicRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicRel]"
            }
            ,
            window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegCurvetoCubicRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicRel((void 0),this._x,this._y,this._x1,this._y1,this._x2,this._y2)
            }
            ,
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(a) {
                    this._x1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(a) {
                    this._y1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(a) {
                    this._x2 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(a) {
                    this._y2 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegCurvetoQuadraticAbs = function(a, b, c, d, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", a),
                  this._x = b,
                  this._y = c,
                  this._x1 = d,
                  this._y1 = e
            }
            ,
            window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticAbs]"
            }
            ,
            window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticAbs((void 0),this._x,this._y,this._x1,this._y1)
            }
            ,
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(a) {
                    this._x1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(a) {
                    this._y1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegCurvetoQuadraticRel = function(a, b, c, d, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", a),
                  this._x = b,
                  this._y = c,
                  this._x1 = d,
                  this._y1 = e
            }
            ,
            window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticRel]"
            }
            ,
            window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticRel((void 0),this._x,this._y,this._x1,this._y1)
            }
            ,
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this._x = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this._y = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(a) {
                    this._x1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(a) {
                    this._y1 = a,
                      this._segmentChanged()
                },
                enumerable: !0
            }),
            window.SVGPathSegArcAbs = function(a, b, c, d, e, f, g, h) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", a),
                  this._x = b,
                  this._y = c,
                  this._r1 = d,
                  this._r2 = e,
                  this._angle = f,
                  this._largeArcFlag = g,
                  this._sweepFlag = h
            }
            ,
            window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype),
            window.SVGPathSegArcAbs.prototype.toString = function() {
                return "[object SVGPathSegArcAbs]"
            }
            ,
            window.SVGPathSegArcAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
            }
            ,
            window.SVGPathSegArcAbs.prototype.clone = function() {
                return new window.SVGPathSegArcAbs((void 0),this._x,this._y,this._r1,this._r2,this._angle,this._largeArcFlag,this._sweepFlag)
            }
          ,
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
              get: function() {
                  return this._r1
              },
              set: function(a) {
                  this._r1 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
              get: function() {
                  return this._r2
              },
              set: function(a) {
                  this._r2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
              get: function() {
                  return this._angle
              },
              set: function(a) {
                  this._angle = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
              get: function() {
                  return this._largeArcFlag
              },
              set: function(a) {
                  this._largeArcFlag = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
              get: function() {
                  return this._sweepFlag
              },
              set: function(a) {
                  this._sweepFlag = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegArcRel = function(a, b, c, d, e, f, g, h) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", a),
                this._x = b,
                this._y = c,
                this._r1 = d,
                this._r2 = e,
                this._angle = f,
                this._largeArcFlag = g,
                this._sweepFlag = h
          }
          ,
          window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegArcRel.prototype.toString = function() {
              return "[object SVGPathSegArcRel]"
          }
          ,
          window.SVGPathSegArcRel.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
          }
          ,
          window.SVGPathSegArcRel.prototype.clone = function() {
              return new window.SVGPathSegArcRel((void 0),this._x,this._y,this._r1,this._r2,this._angle,this._largeArcFlag,this._sweepFlag)
          }
          ,
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
              get: function() {
                  return this._r1
              },
              set: function(a) {
                  this._r1 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
              get: function() {
                  return this._r2
              },
              set: function(a) {
                  this._r2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
              get: function() {
                  return this._angle
              },
              set: function(a) {
                  this._angle = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
              get: function() {
                  return this._largeArcFlag
              },
              set: function(a) {
                  this._largeArcFlag = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
              get: function() {
                  return this._sweepFlag
              },
              set: function(a) {
                  this._sweepFlag = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegLinetoHorizontalAbs = function(a, b) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", a),
                this._x = b
          }
          ,
          window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() {
              return "[object SVGPathSegLinetoHorizontalAbs]"
          }
          ,
          window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x
          }
          ,
          window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() {
              return new window.SVGPathSegLinetoHorizontalAbs((void 0),this._x)
          }
          ,
          Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegLinetoHorizontalRel = function(a, b) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", a),
                this._x = b
          }
          ,
          window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegLinetoHorizontalRel.prototype.toString = function() {
              return "[object SVGPathSegLinetoHorizontalRel]"
          }
          ,
          window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x
          }
          ,
          window.SVGPathSegLinetoHorizontalRel.prototype.clone = function() {
              return new window.SVGPathSegLinetoHorizontalRel((void 0),this._x)
          }
          ,
          Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegLinetoVerticalAbs = function(a, b) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", a),
                this._y = b
          }
          ,
          window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegLinetoVerticalAbs.prototype.toString = function() {
              return "[object SVGPathSegLinetoVerticalAbs]"
          }
          ,
          window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._y
          }
          ,
          window.SVGPathSegLinetoVerticalAbs.prototype.clone = function() {
              return new window.SVGPathSegLinetoVerticalAbs((void 0),this._y)
          }
          ,
          Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegLinetoVerticalRel = function(a, b) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", a),
                this._y = b
          }
          ,
          window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegLinetoVerticalRel.prototype.toString = function() {
              return "[object SVGPathSegLinetoVerticalRel]"
          }
          ,
          window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._y
          }
          ,
          window.SVGPathSegLinetoVerticalRel.prototype.clone = function() {
              return new window.SVGPathSegLinetoVerticalRel((void 0),this._y)
          }
          ,
          Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegCurvetoCubicSmoothAbs = function(a, b, c, d, e) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", a),
                this._x = b,
                this._y = c,
                this._x2 = d,
                this._y2 = e
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() {
              return "[object SVGPathSegCurvetoCubicSmoothAbs]"
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() {
              return new window.SVGPathSegCurvetoCubicSmoothAbs((void 0),this._x,this._y,this._x2,this._y2)
          }
          ,
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
              get: function() {
                  return this._x2
              },
              set: function(a) {
                  this._x2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
              get: function() {
                  return this._y2
              },
              set: function(a) {
                  this._y2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegCurvetoCubicSmoothRel = function(a, b, c, d, e) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", a),
                this._x = b,
                this._y = c,
                this._x2 = d,
                this._y2 = e
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() {
              return "[object SVGPathSegCurvetoCubicSmoothRel]"
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
          }
          ,
          window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() {
              return new window.SVGPathSegCurvetoCubicSmoothRel((void 0),this._x,this._y,this._x2,this._y2)
          }
          ,
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
              get: function() {
                  return this._x2
              },
              set: function(a) {
                  this._x2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
              get: function() {
                  return this._y2
              },
              set: function(a) {
                  this._y2 = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegCurvetoQuadraticSmoothAbs = function(a, b, c) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", a),
                this._x = b,
                this._y = c
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() {
              return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() {
              return new window.SVGPathSegCurvetoQuadraticSmoothAbs((void 0),this._x,this._y)
          }
          ,
          Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathSegCurvetoQuadraticSmoothRel = function(a, b, c) {
              window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", a),
                this._x = b,
                this._y = c
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype),
          window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() {
              return "[object SVGPathSegCurvetoQuadraticSmoothRel]"
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
          }
          ,
          window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() {
              return new window.SVGPathSegCurvetoQuadraticSmoothRel((void 0),this._x,this._y)
          }
          ,
          Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
              get: function() {
                  return this._x
              },
              set: function(a) {
                  this._x = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
              get: function() {
                  return this._y
              },
              set: function(a) {
                  this._y = a,
                    this._segmentChanged()
              },
              enumerable: !0
          }),
          window.SVGPathElement.prototype.createSVGPathSegClosePath = function() {
              return new window.SVGPathSegClosePath((void 0))
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(a, b) {
              return new window.SVGPathSegMovetoAbs((void 0),a,b)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(a, b) {
              return new window.SVGPathSegMovetoRel((void 0),a,b)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(a, b) {
              return new window.SVGPathSegLinetoAbs((void 0),a,b)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(a, b) {
              return new window.SVGPathSegLinetoRel((void 0),a,b)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(a, b, c, d, e, f) {
              return new window.SVGPathSegCurvetoCubicAbs((void 0),a,b,c,d,e,f)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(a, b, c, d, e, f) {
              return new window.SVGPathSegCurvetoCubicRel((void 0),a,b,c,d,e,f)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(a, b, c, d) {
              return new window.SVGPathSegCurvetoQuadraticAbs((void 0),a,b,c,d)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(a, b, c, d) {
              return new window.SVGPathSegCurvetoQuadraticRel((void 0),a,b,c,d)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegArcAbs = function(a, b, c, d, e, f, g) {
              return new window.SVGPathSegArcAbs((void 0),a,b,c,d,e,f,g)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegArcRel = function(a, b, c, d, e, f, g) {
              return new window.SVGPathSegArcRel((void 0),a,b,c,d,e,f,g)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(a) {
              return new window.SVGPathSegLinetoHorizontalAbs((void 0),a)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(a) {
              return new window.SVGPathSegLinetoHorizontalRel((void 0),a)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(a) {
              return new window.SVGPathSegLinetoVerticalAbs((void 0),a)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(a) {
              return new window.SVGPathSegLinetoVerticalRel((void 0),a)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(a, b, c, d) {
              return new window.SVGPathSegCurvetoCubicSmoothAbs((void 0),a,b,c,d)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(a, b, c, d) {
              return new window.SVGPathSegCurvetoCubicSmoothRel((void 0),a,b,c,d)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(a, b) {
              return new window.SVGPathSegCurvetoQuadraticSmoothAbs((void 0),a,b)
          }
          ,
          window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(a, b) {
              return new window.SVGPathSegCurvetoQuadraticSmoothRel((void 0),a,b)
          }
        ),
        "undefined" == typeof window || "SVGPathSegList"in window || (window.SVGPathSegList = function(a) {
              this._pathElement = a,
                this._list = this._parsePath(this._pathElement.getAttribute("d")),
                this._mutationObserverConfig = {
                    attributes: !0,
                    attributeFilter: ["d"]
                },
                this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this)),
                this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
          }
            ,
            window.SVGPathSegList.prototype.classname = "SVGPathSegList",
            Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
                get: function() {
                    return this._checkPathSynchronizedToList(),
                      this._list.length
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
                get: function() {
                    return this._pathSegList || (this._pathSegList = new window.SVGPathSegList(this)),
                      this._pathSegList
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: !0
            }),
            Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: !0
            }),
            window.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
                this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())
            }
            ,
            window.SVGPathSegList.prototype._updateListFromPathMutations = function(a) {
                if (this._pathElement) {
                    var b = !1;
                    a.forEach(function(a) {
                        "d" == a.attributeName && (b = !0)
                    }),
                    b && (this._list = this._parsePath(this._pathElement.getAttribute("d")))
                }
            }
            ,
            window.SVGPathSegList.prototype._writeListToPath = function() {
                this._pathElementMutationObserver.disconnect(),
                  this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list)),
                  this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
            }
            ,
            window.SVGPathSegList.prototype.segmentChanged = function(a) {
                this._writeListToPath()
            }
            ,
            window.SVGPathSegList.prototype.clear = function() {
                this._checkPathSynchronizedToList(),
                  this._list.forEach(function(a) {
                      a._owningPathSegList = null
                  }),
                  this._list = [],
                  this._writeListToPath()
            }
            ,
            window.SVGPathSegList.prototype.initialize = function(a) {
                return this._checkPathSynchronizedToList(),
                  this._list = [a],
                  a._owningPathSegList = this,
                  this._writeListToPath(),
                  a
            }
            ,
            window.SVGPathSegList.prototype._checkValidIndex = function(a) {
                if (isNaN(a) || a < 0 || a >= this.numberOfItems)
                    throw "INDEX_SIZE_ERR"
            }
            ,
            window.SVGPathSegList.prototype.getItem = function(a) {
                return this._checkPathSynchronizedToList(),
                  this._checkValidIndex(a),
                  this._list[a]
            }
            ,
            window.SVGPathSegList.prototype.insertItemBefore = function(a, b) {
                return this._checkPathSynchronizedToList(),
                b > this.numberOfItems && (b = this.numberOfItems),
                a._owningPathSegList && (a = a.clone()),
                  this._list.splice(b, 0, a),
                  a._owningPathSegList = this,
                  this._writeListToPath(),
                  a
            }
            ,
            window.SVGPathSegList.prototype.replaceItem = function(a, b) {
                return this._checkPathSynchronizedToList(),
                a._owningPathSegList && (a = a.clone()),
                  this._checkValidIndex(b),
                  this._list[b] = a,
                  a._owningPathSegList = this,
                  this._writeListToPath(),
                  a
            }
            ,
            window.SVGPathSegList.prototype.removeItem = function(a) {
                this._checkPathSynchronizedToList(),
                  this._checkValidIndex(a);
                var b = this._list[a];
                return this._list.splice(a, 1),
                  this._writeListToPath(),
                  b
            }
            ,
            window.SVGPathSegList.prototype.appendItem = function(a) {
                return this._checkPathSynchronizedToList(),
                a._owningPathSegList && (a = a.clone()),
                  this._list.push(a),
                  a._owningPathSegList = this,
                  this._writeListToPath(),
                  a
            }
            ,
            window.SVGPathSegList._pathSegArrayAsString = function(a) {
                var b = ""
                  , c = !0;
                return a.forEach(function(a) {
                    c ? (c = !1,
                      b += a._asPathString()) : b += " " + a._asPathString()
                }),
                  b
            }
            ,
            window.SVGPathSegList.prototype._parsePath = function(a) {
                if (!a || 0 == a.length)
                    return [];
                var b = this
                  , c = function() {
                    this.pathSegList = []
                };
                c.prototype.appendSegment = function(a) {
                    this.pathSegList.push(a)
                }
                ;
                var d = function(a) {
                    this._string = a,
                      this._currentIndex = 0,
                      this._endIndex = this._string.length,
                      this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN,
                      this._skipOptionalSpaces()
                };
                d.prototype._isCurrentSpace = function() {
                    var a = this._string[this._currentIndex];
                    return a <= " " && (" " == a || "\n" == a || "\t" == a || "\r" == a || "\f" == a)
                }
                  ,
                  d.prototype._skipOptionalSpaces = function() {
                      for (; this._currentIndex < this._endIndex && this._isCurrentSpace(); )
                          this._currentIndex++;
                      return this._currentIndex < this._endIndex
                  }
                  ,
                  d.prototype._skipOptionalSpacesOrDelimiter = function() {
                      return !(this._currentIndex < this._endIndex && !this._isCurrentSpace() && "," != this._string.charAt(this._currentIndex)) && (this._skipOptionalSpaces() && this._currentIndex < this._endIndex && "," == this._string.charAt(this._currentIndex) && (this._currentIndex++,
                          this._skipOptionalSpaces()),
                        this._currentIndex < this._endIndex)
                  }
                  ,
                  d.prototype.hasMoreData = function() {
                      return this._currentIndex < this._endIndex
                  }
                  ,
                  d.prototype.peekSegmentType = function() {
                      var a = this._string[this._currentIndex];
                      return this._pathSegTypeFromChar(a)
                  }
                  ,
                  d.prototype._pathSegTypeFromChar = function(a) {
                      switch (a) {
                          case "Z":
                          case "z":
                              return window.SVGPathSeg.PATHSEG_CLOSEPATH;
                          case "M":
                              return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
                          case "m":
                              return window.SVGPathSeg.PATHSEG_MOVETO_REL;
                          case "L":
                              return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                          case "l":
                              return window.SVGPathSeg.PATHSEG_LINETO_REL;
                          case "C":
                              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                          case "c":
                              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                          case "Q":
                              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                          case "q":
                              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                          case "A":
                              return window.SVGPathSeg.PATHSEG_ARC_ABS;
                          case "a":
                              return window.SVGPathSeg.PATHSEG_ARC_REL;
                          case "H":
                              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                          case "h":
                              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                          case "V":
                              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                          case "v":
                              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                          case "S":
                              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                          case "s":
                              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                          case "T":
                              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                          case "t":
                              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                          default:
                              return window.SVGPathSeg.PATHSEG_UNKNOWN
                      }
                  }
                  ,
                  d.prototype._nextCommandHelper = function(a, b) {
                      return ("+" == a || "-" == a || "." == a || a >= "0" && a <= "9") && b != window.SVGPathSeg.PATHSEG_CLOSEPATH ? b == window.SVGPathSeg.PATHSEG_MOVETO_ABS ? window.SVGPathSeg.PATHSEG_LINETO_ABS : b == window.SVGPathSeg.PATHSEG_MOVETO_REL ? window.SVGPathSeg.PATHSEG_LINETO_REL : b : window.SVGPathSeg.PATHSEG_UNKNOWN
                  }
                  ,
                  d.prototype.initialCommandIsMoveTo = function() {
                      if (!this.hasMoreData())
                          return !0;
                      var a = this.peekSegmentType();
                      return a == window.SVGPathSeg.PATHSEG_MOVETO_ABS || a == window.SVGPathSeg.PATHSEG_MOVETO_REL
                  }
                  ,
                  d.prototype._parseNumber = function() {
                      var a = 0
                        , b = 0
                        , c = 1
                        , d = 0
                        , e = 1
                        , f = 1
                        , g = this._currentIndex;
                      if (this._skipOptionalSpaces(),
                          this._currentIndex < this._endIndex && "+" == this._string.charAt(this._currentIndex) ? this._currentIndex++ : this._currentIndex < this._endIndex && "-" == this._string.charAt(this._currentIndex) && (this._currentIndex++,
                            e = -1),
                          !(this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && "." != this._string.charAt(this._currentIndex))) {
                          for (var h = this._currentIndex; this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9"; )
                              this._currentIndex++;
                          if (this._currentIndex != h)
                              for (var i = this._currentIndex - 1, j = 1; i >= h; )
                                  b += j * (this._string.charAt(i--) - "0"),
                                    j *= 10;
                          if (this._currentIndex < this._endIndex && "." == this._string.charAt(this._currentIndex)) {
                              if (this._currentIndex++,
                                this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                                  return;
                              for (; this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9"; )
                                  c *= 10,
                                    d += (this._string.charAt(this._currentIndex) - "0") / c,
                                    this._currentIndex += 1
                          }
                          if (this._currentIndex != g && this._currentIndex + 1 < this._endIndex && ("e" == this._string.charAt(this._currentIndex) || "E" == this._string.charAt(this._currentIndex)) && "x" != this._string.charAt(this._currentIndex + 1) && "m" != this._string.charAt(this._currentIndex + 1)) {
                              if (this._currentIndex++,
                                  "+" == this._string.charAt(this._currentIndex) ? this._currentIndex++ : "-" == this._string.charAt(this._currentIndex) && (this._currentIndex++,
                                    f = -1),
                                this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                                  return;
                              for (; this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9"; )
                                  a *= 10,
                                    a += this._string.charAt(this._currentIndex) - "0",
                                    this._currentIndex++
                          }
                          var k = b + d;
                          if (k *= e,
                            a && (k *= Math.pow(10, f * a)),
                            g != this._currentIndex)
                              return this._skipOptionalSpacesOrDelimiter(),
                                k
                      }
                  }
                  ,
                  d.prototype._parseArcFlag = function() {
                      if (!(this._currentIndex >= this._endIndex)) {
                          var a = !1
                            , b = this._string.charAt(this._currentIndex++);
                          if ("0" == b)
                              a = !1;
                          else {
                              if ("1" != b)
                                  return;
                              a = !0
                          }
                          return this._skipOptionalSpacesOrDelimiter(),
                            a
                      }
                  }
                  ,
                  d.prototype.parseSegment = function() {
                      var a = this._string[this._currentIndex]
                        , c = this._pathSegTypeFromChar(a);
                      if (c == window.SVGPathSeg.PATHSEG_UNKNOWN) {
                          if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
                              return null;
                          if (c = this._nextCommandHelper(a, this._previousCommand),
                            c == window.SVGPathSeg.PATHSEG_UNKNOWN)
                              return null
                      } else
                          this._currentIndex++;
                      switch (this._previousCommand = c,
                        c) {
                          case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                              return new window.SVGPathSegMovetoRel(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                              return new window.SVGPathSegMovetoAbs(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_REL:
                              return new window.SVGPathSegLinetoRel(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                              return new window.SVGPathSegLinetoAbs(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                              return new window.SVGPathSegLinetoHorizontalRel(b,this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                              return new window.SVGPathSegLinetoHorizontalAbs(b,this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                              return new window.SVGPathSegLinetoVerticalRel(b,this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                              return new window.SVGPathSegLinetoVerticalAbs(b,this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                              return this._skipOptionalSpaces(),
                                new window.SVGPathSegClosePath(b);
                          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  x2: this._parseNumber(),
                                  y2: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoCubicRel(b,d.x,d.y,d.x1,d.y1,d.x2,d.y2);
                          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  x2: this._parseNumber(),
                                  y2: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoCubicAbs(b,d.x,d.y,d.x1,d.y1,d.x2,d.y2);
                          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                              var d = {
                                  x2: this._parseNumber(),
                                  y2: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoCubicSmoothRel(b,d.x,d.y,d.x2,d.y2);
                          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                              var d = {
                                  x2: this._parseNumber(),
                                  y2: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoCubicSmoothAbs(b,d.x,d.y,d.x2,d.y2);
                          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoQuadraticRel(b,d.x,d.y,d.x1,d.y1);
                          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegCurvetoQuadraticAbs(b,d.x,d.y,d.x1,d.y1);
                          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                              return new window.SVGPathSegCurvetoQuadraticSmoothRel(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                              return new window.SVGPathSegCurvetoQuadraticSmoothAbs(b,this._parseNumber(),this._parseNumber());
                          case window.SVGPathSeg.PATHSEG_ARC_REL:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  arcAngle: this._parseNumber(),
                                  arcLarge: this._parseArcFlag(),
                                  arcSweep: this._parseArcFlag(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegArcRel(b,d.x,d.y,d.x1,d.y1,d.arcAngle,d.arcLarge,d.arcSweep);
                          case window.SVGPathSeg.PATHSEG_ARC_ABS:
                              var d = {
                                  x1: this._parseNumber(),
                                  y1: this._parseNumber(),
                                  arcAngle: this._parseNumber(),
                                  arcLarge: this._parseArcFlag(),
                                  arcSweep: this._parseArcFlag(),
                                  x: this._parseNumber(),
                                  y: this._parseNumber()
                              };
                              return new window.SVGPathSegArcAbs(b,d.x,d.y,d.x1,d.y1,d.arcAngle,d.arcLarge,d.arcSweep);
                          default:
                              throw "Unknown path seg type."
                      }
                  }
                ;
                var e = new c
                  , f = new d(a);
                if (!f.initialCommandIsMoveTo())
                    return [];
                for (; f.hasMoreData(); ) {
                    var g = f.parseSegment();
                    if (!g)
                        return [];
                    e.appendSegment(g)
                }
                return e.pathSegList
            }
        )
    }();
    joint.shapes.chart = {},
      joint.shapes.chart.Plot = joint.shapes.basic.Generic.extend({
          markup: ['<clipPath class="clip"><rect/></clipPath>', '<g class="rotatable">', '<g class="scalable"></g>', '<g class="background"><rect/><text/></g>', '<g class="axis">', '<g class="y-axis"><path/><g class="ticks"></g></g>', '<g class="x-axis"><path/><g class="ticks"></g></g>', '<g class="markings"></g>', "</g>", '<g class="data"><g class="series"></g></g>', '<g class="foreground">', '<rect/><text class="caption"/><text class="subcaption"/>', '<g class="legend"><g class="legend-items"></g></g>', '<line class="guideline x-guideline" /><line class="guideline y-guideline" />', "</g>", "</g>"].join(""),
          tickMarkup: '<g class="tick"><line/><text/></g>',
          pointMarkup: '<g class="point"><circle/><text/></g>',
          barMarkup: '<path class="bar"/>',
          markingMarkup: '<g class="marking"><rect/><text/></g>',
          serieMarkup: '<g><clipPath class="serie-clip"><rect/></clipPath><path/><g class="bars"></g><g class="points"></g></g>',
          legendItemMarkup: '<g class="legend-item"><circle/><text/></g>',
          defaults: joint.util.deepSupplement({
              type: "chart.Plot",
              attrs: {
                  ".data path": {
                      fill: "none",
                      stroke: "black"
                  },
                  ".data .bars rect": {
                      fill: "none",
                      stroke: "black"
                  },
                  ".background rect": {
                      fill: "white",
                      stroke: "#e5e5e5",
                      opacity: 1
                  },
                  ".background text": {
                      fill: "black",
                      text: "No data available.",
                      ref: ".",
                      "ref-x": .5,
                      "ref-y": .5,
                      "text-anchor": "middle",
                      "y-alignment": "middle",
                      display: "none"
                  },
                  ".foreground > rect": {
                      fill: "white",
                      stroke: "#e5e5e5",
                      opacity: 0,
                      "pointer-events": "none"
                  },
                  ".foreground .caption": {
                      fill: "black",
                      text: "",
                      ref: ".foreground > rect",
                      "ref-x": .5,
                      "ref-y": 10,
                      "text-anchor": "middle",
                      "y-alignment": "middle",
                      "font-size": 14
                  },
                  ".foreground .subcaption": {
                      fill: "black",
                      text: "",
                      ref: ".foreground > rect",
                      "ref-x": .5,
                      "ref-y": 23,
                      "text-anchor": "middle",
                      "y-alignment": "middle",
                      "font-size": 10
                  },
                  ".point": {
                      display: "inline-block"
                  },
                  ".point circle": {
                      r: 2,
                      stroke: "black",
                      fill: "black",
                      opacity: .3
                  },
                  ".point text": {
                      fill: "black",
                      "font-size": 8,
                      "text-anchor": "middle",
                      display: "none"
                  },
                  ".axis path": {
                      fill: "none",
                      stroke: "black"
                  },
                  ".axis .tick": {
                      fill: "none",
                      stroke: "black"
                  },
                  ".y-axis .tick line": {
                      fill: "none",
                      stroke: "black",
                      x2: 2,
                      y2: 0,
                      opacity: 1
                  },
                  ".x-axis .tick line": {
                      fill: "none",
                      stroke: "black",
                      x2: 0,
                      y2: -3,
                      opacity: 1
                  },
                  ".y-axis .tick text": {
                      fill: "black",
                      stroke: "none",
                      "font-size": 10,
                      "text-anchor": "end"
                  },
                  ".x-axis .tick text": {
                      fill: "black",
                      stroke: "none",
                      "font-size": 10,
                      "text-anchor": "middle"
                  },
                  ".y-axis .tick text > tspan": {
                      dy: "-.5em",
                      x: -5
                  },
                  ".x-axis .tick text > tspan": {
                      dy: ".5em",
                      x: 0
                  },
                  ".axis .markings": {
                      fill: "black",
                      stroke: "none",
                      "fill-opacity": 1
                  },
                  ".axis .markings text": {
                      fill: "black",
                      "text-anchor": "end",
                      "font-size": 10,
                      dy: -5,
                      dx: -5
                  },
                  ".guideline": {
                      "pointer-events": "none",
                      display: "none"
                  },
                  ".x-guideline": {
                      stroke: "black",
                      visibility: "hidden"
                  },
                  ".y-guideline": {
                      stroke: "black",
                      visibility: "hidden"
                  },
                  ".legend": {
                      "ref-x": 10,
                      "ref-y": 10
                  },
                  ".legend-item text": {
                      fill: "black",
                      transform: "translate(14, 0)",
                      "font-size": 11
                  },
                  ".legend-item circle": {
                      r: 5,
                      transform: "translate(5,5)"
                  },
                  ".legend-item": {
                      cursor: "pointer"
                  },
                  ".legend-item.disabled circle": {
                      fill: "gray"
                  },
                  ".legend-item.disabled text": {
                      opacity: .5
                  }
              }
          }, joint.shapes.basic.Generic.prototype.defaults),
          legendPosition: function(a, b) {
              b = b || {},
                this.trigger("batch:start"),
                [".legend/ref-x", ".legend/ref-y", ".legend/ref-dx", ".legend/ref-dy", ".legend/x-alignment", ".legend/y-alignment"].forEach(function(a) {
                    this.removeAttr(a, {
                        silent: !0
                    })
                }, this);
              var c = b.padding || 10
                , d = {
                  n: {
                      ".legend": {
                          "ref-x": .5,
                          "x-alignment": -.5,
                          "ref-y": c
                      }
                  },
                  ne: {
                      ".legend": {
                          "ref-dx": -c,
                          "x-alignment": -.999,
                          "ref-y": c
                      }
                  },
                  e: {
                      ".legend": {
                          "ref-dx": -c,
                          "x-alignment": -.999,
                          "ref-y": .5,
                          "y-alignment": -.5
                      }
                  },
                  se: {
                      ".legend": {
                          "ref-dx": -c,
                          "ref-dy": -c,
                          "x-alignment": -.999,
                          "y-alignment": -.999
                      }
                  },
                  s: {
                      ".legend": {
                          "ref-x": .5,
                          "ref-dy": -c,
                          "x-alignment": -.5,
                          "y-alignment": -.999
                      }
                  },
                  sw: {
                      ".legend": {
                          "ref-x": c,
                          "ref-dy": -c,
                          "y-alignment": -.999
                      }
                  },
                  w: {
                      ".legend": {
                          "ref-x": c,
                          "ref-y": .5,
                          "y-alignment": -.5
                      }
                  },
                  nw: {
                      ".legend": {
                          "ref-x": c,
                          "ref-y": c
                      }
                  },
                  nnw: {
                      ".legend": {
                          "ref-x": c,
                          "ref-y": -c,
                          "y-alignment": -.999
                      }
                  },
                  nn: {
                      ".legend": {
                          "ref-x": .5,
                          "ref-y": -c,
                          "x-alignment": -.5,
                          "y-alignment": -.999
                      }
                  },
                  nne: {
                      ".legend": {
                          "ref-dx": -c,
                          "ref-y": -c,
                          "x-alignment": -.999,
                          "y-alignment": -.999
                      }
                  },
                  nnee: {
                      ".legend": {
                          "ref-dx": c,
                          "ref-y": -c,
                          "y-alignment": -.999
                      }
                  },
                  nee: {
                      ".legend": {
                          "ref-y": c,
                          "ref-dx": c
                      }
                  },
                  ee: {
                      ".legend": {
                          "ref-dx": c,
                          "ref-y": .5,
                          "y-alignment": -.5
                      }
                  },
                  see: {
                      ".legend": {
                          "ref-dx": c,
                          "ref-dy": -c,
                          "y-alignment": -.999
                      }
                  },
                  ssee: {
                      ".legend": {
                          "ref-dx": c,
                          "ref-dy": c
                      }
                  },
                  sse: {
                      ".legend": {
                          "ref-dx": -c,
                          "ref-dy": c,
                          "x-alignment": -.999
                      }
                  },
                  ss: {
                      ".legend": {
                          "ref-x": .5,
                          "ref-dy": c,
                          "x-alignment": -.5
                      }
                  },
                  ssw: {
                      ".legend": {
                          "ref-x": c,
                          "ref-dy": c
                      }
                  },
                  ssww: {
                      ".legend": {
                          "ref-x": -c,
                          "ref-dy": c,
                          "x-alignment": -.999
                      }
                  },
                  sww: {
                      ".legend": {
                          "ref-x": -c,
                          "ref-dy": -c,
                          "x-alignment": -.999,
                          "y-alignment": -.999
                      }
                  },
                  ww: {
                      ".legend": {
                          "ref-x": -c,
                          "ref-y": .5,
                          "x-alignment": -.999,
                          "y-alignment": -.5
                      }
                  },
                  nww: {
                      ".legend": {
                          "ref-x": -c,
                          "ref-y": c,
                          "x-alignment": -.999
                      }
                  },
                  nnww: {
                      ".legend": {
                          "ref-x": -c,
                          "ref-y": -c,
                          "x-alignment": -.999,
                          "y-alignment": -.999
                      }
                  }
              };
              d[a] && this.attr(d[a]),
                this.trigger("batch:stop")
          },
          addPoint: function(a, b, c) {
              c = c || {};
              var d = this.get("series")
                , e = joint.util.toArray(d).findIndex(function(a) {
                  return a.name === b
              });
              if (e === -1)
                  throw new Error("Serie " + b + " was not found.");
              var f = joint.util.cloneDeep(d[e]);
              f.data.push(a),
              Number.isFinite(c.maxLen) && f.data.length > c.maxLen && f.data.shift(),
                d = d.slice(),
                d[e] = f,
                this.set("series", d, c)
          },
          lastPoint: function(a) {
              var b = joint.util.toArray(this.get("series")).find(function(b) {
                  return b && b.name === a
              }).data;
              return b[b.length - 1]
          },
          firstPoint: function(a) {
              return joint.util.toArray(this.get("series")).find(function(b) {
                  return b && b.name === a
              }).data[0]
          }
      }),
      joint.shapes.chart.PlotView = joint.dia.ElementView.extend({
          events: {
              mousemove: "onMouseMove",
              mouseout: "onMouseOut"
          },
          initialize: function() {
              joint.dia.ElementView.prototype.initialize.apply(this, arguments),
                this.listenTo(this.model, "change:series change:interpolate change:padding change:canvas change:markings change:axis", function() {
                    this.update()
                }),
                this.on("cell:pointerdown", this.onPointerDown, this),
                this._disabledSeries = []
          },
          renderMarkup: function() {
              joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments),
                this.elDataClipPath = this.$(".clip")[0],
                this.elDataClipPathRect = this.elDataClipPath.firstChild,
                this.elBackgroundRect = this.$(".background rect")[0],
                this.elBackgroundText = this.$(".background text")[0],
                this.elForeground = this.$(".foreground")[0],
                this.elForegroundRect = this.$(".foreground rect")[0],
                this.elDataSeries = this.$(".data .series")[0],
                this.elYAxisPath = this.$(".y-axis path")[0],
                this.elYAxisTicks = this.$(".y-axis .ticks")[0],
                this.elXAxisPath = this.$(".x-axis path")[0],
                this.elXAxisTicks = this.$(".x-axis .ticks")[0],
                this.elMarkings = this.$(".axis .markings")[0],
                this.elXGuideline = this.$(".x-guideline")[0],
                this.elYGuideline = this.$(".y-guideline")[0],
                this.elLegend = this.$(".legend")[0],
                this.elLegendItems = this.$(".legend-items")[0],
                this.elTick = V(this.model.tickMarkup),
                this.elMarking = V(this.model.markingMarkup),
                this.elLegendItem = V(this.model.legendItemMarkup),
                this.elPoint = V(this.model.pointMarkup),
                this.elBar = V(this.model.barMarkup),
                this.elSerie = V(this.model.serieMarkup),
                this.elDataClipPath.id = "clip_" + this.cid,
                V(this.$(".data")[0]).attr("clip-path", "url(#" + this.elDataClipPath.id + ")"),
                V(this.elMarkings).attr("clip-path", "url(#" + this.elDataClipPath.id + ")")
          },
          update: function() {
              var a = this.filterSeries();
              this.calculateStats(a);
              var b = this.model.get("size")
                , c = b.width
                , d = b.height;
              this.canvas = joint.util.assign({
                  x: 0,
                  y: 0,
                  width: c,
                  height: d
              }, this.model.get("canvas"));
              var e, f = {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
              }, h = this.model.get("padding");
              e = joint.util.isObject(h) ? joint.util.assign({}, f, h) : void 0 !== h ? {
                  top: h,
                  right: 2 * h,
                  bottom: 2 * h,
                  left: h
              } : f,
                this.canvas = g.rect(this.canvas).moveAndExpand(g.rect(e.left, e.top, -e.right, -e.bottom));
              var i = {
                  x: 0,
                  y: 0,
                  width: c,
                  height: d
              };
              V(this.elDataClipPathRect).attr(i),
                V(this.elBackgroundRect).attr(i),
                V(this.elForegroundRect).attr(i),
                this.updateAxis(),
                this.updateMarkings(),
                this.isEmpty() ? $(this.elBackgroundText).show() : $(this.elBackgroundText).hide(),
                this.updateSeries(a),
                this.updateLegend(),
                joint.dia.ElementView.prototype.update.apply(this, arguments)
          },
          calculateStats: function(a) {
              a = a || this.model.get("series");
              var b = []
                , c = []
                , d = {}
                , e = {}
                , f = {};
              joint.util.toArray(a).forEach(function(a, g) {
                  var h = f[a.name || g] || (f[a.name || g] = {});
                  h.decreasingX = !0,
                    h.decreasingY = !0,
                    h.nonDecreasingX = !0,
                    h.nonDecreasingY = !0;
                  var i;
                  joint.util.forIn(a.data, function(f) {
                      h.minX = void 0 === h.minX ? f.x : Math.min(h.minX, f.x),
                        h.maxX = void 0 === h.maxX ? f.x : Math.max(h.maxX, f.x),
                        h.minY = void 0 === h.minY ? f.y : Math.min(h.minY, f.y),
                        h.maxY = void 0 === h.maxY ? f.y : Math.max(h.maxY, f.y),
                      i && (h.decreasingX = h.decreasingX && f.x < i.x,
                        h.decreasingY = h.decreasingY && f.y < i.y,
                        h.nonDecreasingX = h.nonDecreasingX && f.x >= i.x,
                        h.nonDecreasingY = h.nonDecreasingY && f.y >= i.y),
                      b.includes(f.x) || b.push(f.x),
                      c.includes(f.y) || c.push(f.y),
                        (d[f.x] || (d[f.x] = [])).push({
                            serie: a,
                            x: f.x,
                            y: f.y
                        }),
                        (e[f.y] || (e[f.y] = [])).push({
                            serie: a,
                            x: f.x,
                            y: f.y
                        }),
                        i = f
                  })
              });
              var g = this.model.get("axis") || {}
                , h = g["x-axis"] || {}
                , i = g["y-axis"] || {};
              this.stats = {
                  minX: void 0 === h.min ? b.reduce(function(a, b) {
                      return b < a ? b : a
                  }, 1 / 0) : h.min,
                  maxX: void 0 === h.max ? b.reduce(function(a, b) {
                      return b > a ? b : a
                  }, -(1 / 0)) : h.max,
                  minY: void 0 === i.min ? c.reduce(function(a, b) {
                      return b < a ? b : a
                  }, 1 / 0) : i.min,
                  maxY: void 0 === i.max ? c.reduce(function(a, b) {
                      return b > a ? b : a
                  }, -(1 / 0)) : i.max,
                  bySerie: f,
                  xValues: b,
                  yValues: c,
                  xMap: d,
                  yMap: e
              }
          },
          isEmpty: function() {
              return !this.stats.xValues.length
          },
          updateSeries: function(a) {
              if (a = a || this.model.get("series"),
                  this.elDataSeries.textContent = "",
                  !this.isEmpty()) {
                  var b = [this.stats.minX, this.stats.maxX]
                    , c = [this.stats.minY, this.stats.maxY]
                    , d = [this.canvas.x, this.canvas.x + this.canvas.width]
                    , e = [this.canvas.y + this.canvas.height, this.canvas.y]
                    , f = this.model.get("attrs");
                  joint.util.toArray(a).forEach(function(a, h) {
                      var i = a.data
                        , j = []
                        , k = this.elSerie.clone().attr("class", a.name || "serie-" + h);
                      V(this.elDataSeries).append(k),
                        joint.util.forIn(i, function(h) {
                            var i = g.scale.linear(b, d, h.x)
                              , k = g.scale.linear(c, e, h.y);
                            j.push({
                                x: i,
                                y: k
                            }),
                            f[".point"] && "none" !== f[".point"].display && this.renderPoint(h, a),
                            a.bars && this.renderBar(h, a)
                        }
                          .bind(this));
                      var l = k.findOne(".serie-clip")
                        , m = this.model.get("size")
                        , n = this.stats.bySerie[a.name || h]
                        , o = g.scale.linear(b, d, n.minX)
                        , p = g.scale.linear(b, d, n.maxX)
                        , q = l.findOne("rect");
                      if (q.attr(g.rect(o, 0, p - o, m.height)),
                          !a.bars) {
                          var r = k.findOne("path");
                          r.attr({
                              d: this.seriePathData(j, a, h),
                              "clip-path": "url(#" + l.node.id + ")"
                          })
                      }
                  }, this)
              }
          },
          seriePathClipData: function(a, b) {
              var c = 10
                , d = this.model.get("size")
                , e = a[0]
                , f = ["M", e.x, e.y, "V", d.height + c];
              return f.join(" ")
          },
          renderBar: function(a, b) {
              var c = [this.stats.minX, this.stats.maxX]
                , d = [this.stats.minY, this.stats.maxY]
                , e = [this.canvas.x, this.canvas.x + this.canvas.width]
                , f = [this.canvas.y + this.canvas.height, this.canvas.y]
                , h = g.scale.linear(c, e, a.x)
                , i = g.scale.linear(d, f, a.y)
                , j = b.bars.barWidth || .8
                , k = j > 1 ? j : this.canvas.width / (this.stats.maxX - this.stats.minX) * j
                , l = g.scale.linear(d, f, 0) - i
                , m = a["top-rx"] || b.bars["top-rx"]
                , n = a["top-ry"] || b.bars["top-ry"]
                , o = a["bottom-rx"] || b.bars["bottom-rx"]
                , p = a["bottom-ry"] || b.bars["bottom-ry"]
                , q = {
                  left: h,
                  middle: h - k / 2,
                  right: h - k
              }[b.bars.align || "middle"]
                , r = this.elBar.clone();
              r.attr({
                  "data-serie": b.name,
                  "data-x": a.x,
                  "data-y": a.y,
                  d: V.rectToPath({
                      x: q,
                      y: i,
                      width: k,
                      height: l,
                      "top-rx": m,
                      "top-ry": n,
                      "bottom-rx": o,
                      "bottom-ry": p
                  })
              });
              var s = b.name || "serie-" + this.model.get("series").indexOf(b);
              return V(this.elDataSeries).findOne("." + s + " .bars").append(r),
                r.node
          },
          renderPoint: function(a, b) {
              var c = [this.stats.minX, this.stats.maxX]
                , d = [this.stats.minY, this.stats.maxY]
                , e = [this.canvas.x, this.canvas.x + this.canvas.width]
                , f = [this.canvas.y + this.canvas.height, this.canvas.y]
                , h = g.scale.linear(c, e, a.x)
                , i = g.scale.linear(d, f, a.y)
                , j = this.elPoint.clone();
              j.attr({
                  "data-serie": b.name,
                  "data-x": a.x,
                  "data-y": a.y
              }),
                j.findOne("circle").attr({
                    cx: h,
                    cy: i
                }),
                j.findOne("text").attr({
                    x: h,
                    dy: i
                }).text(this.pointLabel(a, b));
              var k = b.name || "serie-" + this.model.get("series").indexOf(b);
              return V(this.elDataSeries).findOne("." + k + " .points").append(j),
                j.node
          },
          seriePathData: function(a, b, c) {
              var d, e, f, h = void 0 === b.interpolate ? this.model.get("interpolate") : b.interpolate, i = a.length;
              switch (h) {
                  case "bezier":
                      d = new g.Path(g.Curve.throughPoints(a)).serialize();
                      break;
                  case "step":
                      for (f = a[0],
                             d = ["M", f.x, f.y],
                             e = 1; e < i; e++)
                          d.push("H", (f.x + a[e].x) / 2, "V", a[e].y),
                            f = a[e];
                      break;
                  case "stepBefore":
                      for (d = ["M", a[0].x, a[0].y],
                             e = 1; e < i; e++)
                          d.push("V", a[e].y, "H", a[e].x);
                      break;
                  case "stepAfter":
                      for (d = ["M", a[0].x, a[0].y],
                             e = 1; e < i; e++)
                          d.push("H", a[e].x, "V", a[e].y);
                      break;
                  default:
                      for (d = ["M"],
                             e = 0; e < i; e++)
                          d.push(a[e].x, a[e].y)
              }
              return d = this.fixPathForFill(d, a, b, c),
                d.join(" ")
          },
          fixPathForFill: function(a, b, c, d) {
              if (0 === b.length)
                  return a;
              var e = this.stats.bySerie[c.name || d];
              if (!e.nonDecreasingX)
                  return a;
              var f = 10
                , g = this.model.get("size")
                , h = b[0]
                , i = b[b.length - 1]
                , j = ["M", i.x, g.height + f, "H", h.x - f, "V", h.y];
              return a[0] = "L",
                j.concat(a)
          },
          updateAxis: function() {
              var a = this.model.get("size")
                , b = a.width
                , c = a.height
                , d = this.model.get("axis")
                , e = this.canvas.height / c;
              if (V(this.elYAxisPath).attr("d", ["M", 0, 0, "L", 0, c].join(" ")),
                  V(this.elXAxisPath).attr("d", ["M", 0, c, "L", b, c].join(" ")),
                  this.elXAxisTicks.textContent = "",
                  this.elYAxisTicks.textContent = "",
                  !this.isEmpty()) {
                  for (var f = [this.stats.minX, this.stats.maxX], h = [this.stats.minY, this.stats.maxY], i = [this.canvas.x, this.canvas.x + this.canvas.width], j = [0, this.canvas.height], k = h[1] - h[0], l = d && d["y-axis"] || {}, m = d && d["x-axis"] || {}, n = k > 0 ? l.ticks - 1 || 10 : 0, o = k / n / e, p = h[0], q = 0; q < n + 1; q++) {
                      var r = g.scale.linear(h, j, p)
                        , s = this.elTick.clone();
                      s.translate(0, r),
                        V(this.elYAxisTicks).append(s);
                      var t = h[1] - (p - h[0]);
                      t += g.scale.linear(j, h, this.canvas.y) - h[0],
                        s.findOne("text").text(this.tickLabel(t, l)),
                        p += o
                  }
                  this.stats.xValues.forEach(function(a, d) {
                      if (d % (m.tickStep || 1) === 0) {
                          var e = g.scale.linear(f, i, a);
                          if (!(e > b)) {
                              var h = this.elTick.clone();
                              h.translate(e, c),
                                V(this.elXAxisTicks).append(h),
                                h.findOne("text").text(this.tickLabel(a, m))
                          }
                      }
                  }, this)
              }
          },
          tickLabel: function(a, b) {
              if (joint.util.isFunction(b.tickFormat))
                  return b.tickFormat(a);
              var c = b.tickFormat || ".1f"
                , d = joint.util.format.number(c, a);
              return d + (joint.util.isFunction(b.tickSuffix) ? b.tickSuffix(a) : b.tickSuffix || "")
          },
          pointLabel: function(a, b) {
              if (joint.util.isFunction(b.pointFormat))
                  return b.pointFormat(a);
              var c = b.pointFormat || ".1f"
                , d = joint.util.format.number(c, a.y);
              return d + (b.pointSuffix || "")
          },
          updateMarkings: function() {
              function a(a, b) {
                  return void 0 === a ? b : a
              }
              this.elMarkings.textContent = "";
              var b = this.model.get("markings");
              if (b && 0 !== b.length) {
                  var c = this.model.get("size")
                    , d = c.width
                    , e = c.height
                    , f = [this.stats.minX, this.stats.maxX]
                    , h = [this.stats.minY, this.stats.maxY]
                    , i = [this.canvas.x, this.canvas.x + this.canvas.width]
                    , j = [this.canvas.y, this.canvas.y + this.canvas.height];
                  joint.util.toArray(b).forEach(function(b, c) {
                      var k = b.start || b.end
                        , l = b.end || b.start
                        , m = Math.min(a(k.x, this.stats.minX), a(l.x, this.stats.minX))
                        , n = Math.max(a(k.x, this.stats.maxX), a(l.x, this.stats.maxX))
                        , o = Math.min(a(k.y, this.stats.minY), a(l.y, this.stats.minY))
                        , p = Math.max(a(k.y, this.stats.maxY), a(l.y, this.stats.maxY))
                        , q = void 0 === k.x || void 0 === l.x
                        , r = void 0 === k.y || void 0 === l.y;
                      q && (i = [0, d]),
                      r && (j = [0, e]);
                      var s = g.scale.linear(f, i, m)
                        , t = g.scale.linear(f, i, n)
                        , u = g.scale.linear(h, j, o)
                        , v = g.scale.linear(h, j, p)
                        , w = s
                        , x = j[1] - v + j[0]
                        , y = t - s
                        , z = v - u;
                      y = Math.max(y, 1),
                        z = Math.max(z, 1);
                      var A = this.elMarking.clone();
                      A.findOne("rect").attr({
                          x: w,
                          y: x,
                          width: y,
                          height: z
                      }),
                        A.findOne("text").text(b.label || "").attr({
                            x: w + y,
                            y: x
                        });
                      var B = A.attr("class") + " " + (b.name || "marking-" + c);
                      A.attr(joint.util.assign({
                          "class": B
                      }, b.attrs)),
                        V(this.elMarkings).append(A)
                  }, this)
              }
          },
          updateLegend: function() {
              var a = this.model.get("series");
              this.elLegendItems.textContent = "",
                joint.util.toArray(a).forEach(function(a, b) {
                    if ((!joint.util.isFunction(a.showLegend) || a.showLegend(a, this.stats.bySerie[a.name || b])) && a.showLegend !== !1) {
                        var c = this.elLegendItem.clone();
                        this._disabledSeries.includes(a.name) && c.addClass("disabled"),
                          c.attr("data-serie", a.name),
                          c.findOne("circle").attr({
                              fill: this.getSerieColor(a.name)
                          }),
                          c.findOne("text").text(a.label || a.name),
                          c.translate(0, b * (a.legendLabelLineHeight || 16)),
                          V(this.elLegendItems).append(c)
                    }
                }, this)
          },
          getSerieColor: function(a) {
              var b = this.model.get("attrs")
                , c = Object.keys(b).find(function(b) {
                  return b.includes(a)
              });
              return c ? b[c].stroke || b[c].fill : "black"
          },
          hideSerie: function(a) {
              this._disabledSeries.includes(a) || this._disabledSeries.push(a);
              var b = this.filterSeries();
              this.update(b)
          },
          showSerie: function(a) {
              this._disabledSeries = joint.util.without(this._disabledSeries, a);
              var b = this.filterSeries();
              this.update(b)
          },
          filterSeries: function(a) {
              return a = a || this.model.get("series"),
                a = joint.util.toArray(a).filter(function(a) {
                    return !this._disabledSeries.includes(a.name)
                }, this)
          },
          onPointerDown: function(a, b, c) {
              var d = $(a.target).closest(".legend-item")[0];
              d && (V(d).toggleClass("disabled"),
                V(d).hasClass("disabled") ? this.hideSerie(V(d).attr("data-serie")) : this.showSerie(V(d).attr("data-serie")))
          },
          onMouseMove: function(a) {
              this.showGuidelines(a.clientX, a.clientY, a)
          },
          onMouseOut: function(a) {
              this.hideGuidelines(),
                this.trigger("mouseout", a)
          },
          showGuidelines: function(a, b, c) {
              var d = this.model.get("angle")
                , e = this.model.getBBox()
                , f = g.point(V(this.paper.viewport).toLocalPoint(a, b)).rotate(e.center(), d);
              if (g.rect(e).containsPoint(f)) {
                  var h = this.model.get("size")
                    , i = f.x - e.x
                    , j = f.y - e.y;
                  V(this.elXGuideline).attr({
                      x1: i,
                      y1: 0,
                      x2: i,
                      y2: h.height,
                      visibility: "visible"
                  }),
                    V(this.elYGuideline).attr({
                        x1: 0,
                        y1: j,
                        x2: h.width,
                        y2: j,
                        visibility: "visible"
                    });
                  var k = g.scale.linear([this.canvas.x, this.canvas.x + this.canvas.width], [this.stats.minX, this.stats.maxX], i)
                    , l = g.scale.linear([this.canvas.y, this.canvas.y + this.canvas.height], [this.stats.minY, this.stats.maxY], j)
                    , m = {
                      x: k,
                      y: this.stats.minY + this.stats.maxY - l
                  }
                    , n = {
                      x: a,
                      y: b
                  }
                    , o = this.closestPoints(k);
                  this.trigger("mouseover", m, n, o, c)
              }
          },
          closestPoints: function(a) {
              var b = joint.util.sortedIndex(this.stats.xValues, a)
                , c = this.stats.xValues[b]
                , d = this.stats.xValues[b - 1]
                , e = void 0 === d ? c : Math.abs(a - c) < Math.abs(a - d) ? c : d;
              return this.stats.xMap[e]
          },
          hideGuidelines: function() {
              V(this.elXGuideline).attr("visibility", "hidden"),
                V(this.elYGuideline).attr("visibility", "hidden")
          }
      }),
      joint.shapes.chart.Pie = joint.shapes.basic.Generic.extend({
          markup: ['<g class="rotatable">', '<g class="scalable"></g>', '<g class="background"><rect/><text/></g>', '<g class="data"></g>', '<g class="foreground">', '<rect/><text class="caption"/><text class="subcaption"/>', '<g class="legend"><g class="legend-items"></g></g>', "</g>", "</g>"].join(""),
          sliceMarkup: '<g class="slice"/>',
          sliceFillMarkup: '<path class="slice-fill"/>',
          sliceBorderMarkup: '<path class="slice-border"/>',
          sliceInnerLabelMarkup: '<text class="slice-inner-label"/>',
          legendSerieMarkup: '<g class="legend-serie"><text/></g>',
          legendSliceMarkup: '<g class="legend-slice"><circle/><text/></g>',
          defaults: joint.util.deepSupplement({
              type: "chart.Pie",
              size: {
                  width: 200,
                  height: 200
              },
              pieHole: 0,
              serieDefaults: {
                  startAngle: 0,
                  degree: 360,
                  label: null,
                  showLegend: !0,
                  labelLineHeight: 6
              },
              sliceDefaults: {
                  innerLabel: "{percentage:.0f}%",
                  innerLabelMargin: 6,
                  legendLabel: "{label}: {value}",
                  legendLabelLineHeight: 6,
                  legendLabelMargin: 14,
                  offset: 0,
                  onClickEffect: {
                      type: "offset",
                      offset: 20
                  },
                  onHoverEffect: null
              },
              series: [],
              attrs: {
                  ".background > rect": {
                      opacity: 0
                  },
                  ".background > text": {
                      fill: "black",
                      text: "No data available.",
                      ref: ".background > rect",
                      "ref-x": .5,
                      "ref-y": .5,
                      "text-anchor": "middle",
                      "y-alignment": "middle",
                      display: "none"
                  },
                  ".foreground > rect": {
                      fill: "white",
                      stroke: "#e5e5e5",
                      opacity: 0,
                      "pointer-events": "none"
                  },
                  ".foreground .caption": {
                      fill: "black",
                      text: "",
                      ref: ".foreground > rect",
                      "ref-x": 2,
                      "ref-y": 6,
                      "text-anchor": "start",
                      "y-alignment": "middle",
                      "font-size": 14
                  },
                  ".foreground .subcaption": {
                      fill: "black",
                      text: "",
                      ref: ".foreground > rect",
                      "ref-x": 2,
                      "ref-y": 18,
                      "text-anchor": "start",
                      "y-alignment": "middle",
                      "font-size": 10
                  },
                  ".data": {
                      ref: ".background",
                      "ref-x": .5,
                      "ref-y": .5
                  },
                  ".slice": {
                      cursor: "pointer"
                  },
                  ".slice > .slice-fill": {
                      stroke: "#ffffff",
                      "stroke-width": 1,
                      "fill-opacity": 1
                  },
                  ".slice.hover > .slice-fill": {
                      "fill-opacity": .8
                  },
                  ".slice > .slice-border": {
                      "stroke-width": 6,
                      "stroke-opacity": .4,
                      "fill-opacity": 1,
                      fill: "none",
                      display: "none"
                  },
                  ".slice.hover > .slice-border": {
                      display: "block"
                  },
                  ".slice > .slice-inner-label": {
                      "text-anchor": "middle",
                      "font-size": "12",
                      stroke: "none",
                      "stroke-width": "0",
                      fill: "#ffffff"
                  },
                  ".slice > .slice-inner-label > tspan": {
                      dy: "-.5em"
                  },
                  ".legend": {
                      "ref-dx": 20,
                      "ref-y": 5
                  },
                  ".legend-serie text": {
                      fill: "grey",
                      transform: "translate(2, 0)",
                      "font-size": 13
                  },
                  ".legend-slice": {
                      cursor: "pointer"
                  },
                  ".legend-slice text": {
                      "font-weight": "normal",
                      fill: "black",
                      "font-size": 11
                  },
                  ".legend-slice.hover text": {
                      "font-weight": "bold"
                  },
                  ".legend-slice circle": {
                      r: 5,
                      transform: "translate(5,5)"
                  }
              }
          }, joint.shapes.basic.Generic.prototype.defaults),
          addSlice: function(a, b, c) {
              c = c || {},
                b = b || 0;
              var d = this.get("series");
              void 0 === d[b] && (d[b] = {
                  data: []
              });
              var e = joint.util.cloneDeep(d[b]);
              e.data.push(a),
                d = d.slice(),
                d[b] = e,
                c = e.data.length > 1 ? joint.util.assign(c, {
                    changedSerieIndex: b
                }) : c,
                this.set("series", d, c)
          },
          editSlice: function(a, b, c, d) {
              d = d || {},
                c = c || 0;
              var e = this.get("series");
              if (void 0 === e[c] || void 0 === e[c].data[b])
                  throw new Error("Slice " + b + " on serie " + c + " was not found.");
              var f = joint.util.cloneDeep(e[c]);
              f.data[b] = joint.util.assign(f.data[b], a),
                e = e.slice(),
                e[c] = f,
                this.set("series", e, joint.util.assign(d, {
                    changedSerieIndex: c
                }))
          }
      }),
      joint.shapes.chart.PieView = joint.dia.ElementView.extend({
          events: {
              "mouseover .slice": "onMouseOverSlice",
              "mouseout .slice": "onMouseOverSlice",
              "mousemove .slice": "onMouseMoveSlice",
              "mouseover .legend-slice": "onEventLegendItem",
              "mouseout .legend-slice": "onEventLegendItem"
          },
          initialize: function() {
              joint.dia.ElementView.prototype.initialize.apply(this, arguments),
                this.listenTo(this.model, "change:series change:serieDefaults change:sliceDefaults change:pieHole", function(a, b, c) {
                    this.update(null, null, null, c.changedSerieIndex)
                }),
                this.on("cell:pointerclick", this.onClickSlice, this),
                this.on("cell:pointerclick", this.onEventLegendItem, this)
          },
          renderMarkup: function() {
              joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments),
                this.elBackgroundRect = this.$(".background rect")[0],
                this.elBackgroundText = this.$(".background text")[0],
                this.elForegroundRect = this.$(".foreground rect")[0],
                this.elLegendItems = this.$(".legend-items")[0],
                this.elPie = this.$(".data")[0],
                this.elSlice = V(this.model.sliceMarkup),
                this.elSliceFill = V(this.model.sliceFillMarkup),
                this.elSliceBorder = V(this.model.sliceBorderMarkup),
                this.elSliceInnerLabel = V(this.model.sliceInnerLabelMarkup),
                this.elLegendSerie = V(this.model.legendSerieMarkup),
                this.elLegendSlice = V(this.model.legendSliceMarkup)
          },
          update: function(a, b, c, d) {
              var e = this.calculateSeries(d);
              d in e ? $(this.elPie).find(".serie-" + d).remove() : $(this.elPie).empty();
              var f = this.model.get("size");
              V(this.elBackgroundRect).attr(f),
                V(this.elForegroundRect).attr(f),
                e.length ? $(this.elBackgroundText).hide() : $(this.elBackgroundText).show(),
                joint.util.toArray(e).forEach(function(a, b) {
                    void 0 !== d && d !== b || joint.util.forIn(a.data, this.updateSlice.bind(this))
                }, this),
                this.updateLegend(),
                joint.dia.ElementView.prototype.update.apply(this, arguments)
          },
          calculateSeries: function(a) {
              var b = joint.util.cloneDeep(this.model.get("series"))
                , c = this.model.get("serieDefaults")
                , d = this.model.get("sliceDefaults")
                , e = this.model.get("size")
                , f = Math.min(e.width, e.height) / 2
                , h = this.model.get("pieHole");
              h = h > 1 ? h : f * h;
              var i = f
                , j = (f - h) / b.length;
              return this._series = b.map(function(b, e) {
                  if (void 0 !== a && a !== e)
                      return b;
                  b = joint.util.defaults(b, c);
                  var f = b.startAngle
                    , h = b.data.reduce(function(a, b) {
                      return a + b.value
                  }, 0)
                    , k = b.degree / h || 0
                    , l = 100 / h;
                  return b.data = b.data.map(function(a, b) {
                      a = joint.util.defaults(a, joint.util.omit(d, "offset", "onClickEffect", "onHoverEffect")),
                        a.outerRadius = i,
                        a.innerRadius = i - j,
                      e || (a = joint.util.defaults(a, joint.util.pick(d, "offset", "onClickEffect", "onHoverEffect")),
                        a.isOuter = !0,
                        a.offset = a.offset > 1 ? a.offset : a.offset * a.outerRadius,
                        a.onClickEffect.offset = a.onClickEffect.offset > 1 ? a.onClickEffect.offset : a.onClickEffect.offset * a.outerRadius),
                        a.serieIndex = e,
                        a.sliceIndex = b,
                        a.innerLabelMargin = a.innerLabelMargin < -1 || a.innerLabelMargin > 1 ? a.innerLabelMargin : a.innerLabelMargin * a.outerRadius,
                        a.percentage = a.value * l;
                      var c = a.value * k;
                      return a.degree = {
                          angle: c,
                          start: f,
                          end: c + f
                      },
                        a.rad = {
                            angle: g.toRad(a.degree.angle, !0),
                            start: g.toRad(a.degree.start, !0),
                            end: g.toRad(a.degree.end, !0)
                        },
                        a.middleangle = (a.rad.start + a.rad.end) / 2,
                        f = a.degree.end,
                        a
                  }),
                    i -= j,
                    b
              }),
                this._series
          },
          updateLegend: function() {
              var a = this._series;
              this.elLegendItems.textContent = "";
              var b = 0
                , c = parseInt(this.model.attr(".legend-serie text/font-size"), 10)
                , d = parseInt(this.model.attr(".legend-slice text/font-size"), 10);
              joint.util.toArray(a).forEach(function(a, e) {
                  if (a.showLegend) {
                      if (a.label) {
                          var f = this.elLegendSerie.clone();
                          a.name && f.addClass(a.name),
                            f.attr({
                                "data-serie": e
                            }),
                            f.findOne("text").text(a.label),
                            f.translate(0, b),
                            V(this.elLegendItems).append(f),
                            b += c + a.labelLineHeight
                      }
                      joint.util.forIn(a.data, function(a, c) {
                          var f = this.elLegendSlice.clone()
                            , g = this.getSliceFillColor(c, e);
                          a.name && f.addClass(a.name),
                            f.attr({
                                "data-serie": e,
                                "data-slice": c
                            }),
                            f.findOne("text").text(joint.util.format.string(a.legendLabel, a)),
                            f.findOne("text").translate(a.legendLabelMargin),
                            f.translate(0, b),
                            b += d + a.legendLabelLineHeight,
                            joint.util.isObject(g) ? this.applyGradient(f.findOne("circle"), "fill", g) : f.findOne("circle").attr({
                                fill: g
                            }),
                            V(this.elLegendItems).append(f)
                      }
                        .bind(this))
                  }
              }, this)
          },
          applyGradient: function(a, b, c) {
              var d = joint.util.isString(a) ? this.findBySelector(a) : $(a).toArray()
                , e = this.paper.defineGradient(c);
              d.forEach(function(a) {
                  V(a).attr(b, "url(#" + e + ")")
              })
          },
          updateSlice: function(a) {
              var b = this.elSlice.clone();
              V(this.elPie).append(b);
              var c = this.elSliceFill.clone()
                , d = this.getSliceFillColor(a.sliceIndex, a.serieIndex);
              c.attr({
                  fill: d,
                  d: V.createSlicePathData(a.innerRadius, a.outerRadius, a.rad.start, a.rad.end)
              }),
                b.append(c),
              joint.util.isObject(d) && this.applyGradient("#" + c.attr("id"), "fill", d);
              var e = this.elSliceBorder.clone()
                , f = parseInt(this.model.attr(".slice > .slice-border/stroke-width"), 10)
                , h = g.point.fromPolar(a.outerRadius + f / 2, -a.rad.start, g.point(0, 0))
                , i = g.point.fromPolar(a.outerRadius + f / 2, -a.rad.end, g.point(0, 0));
              e.attr({
                  stroke: d,
                  d: this.drawArc(h, i, a.outerRadius + f / 2, a.rad.start, a.rad.end)
              }),
                b.append(e),
              joint.util.isObject(d) && this.applyGradient("#" + e.attr("id"), "stroke", d);
              var j = this.elSliceInnerLabel.clone();
              j.text(joint.util.format.string(a.innerLabel, a)),
                b.append(j);
              var k = j.bbox()
                , l = a.outerRadius - k.width / 2 - a.innerLabelMargin;
              j.translate(l * Math.cos(-a.middleangle), -l * Math.sin(-a.middleangle)),
                b.attr({
                    "data-serie": a.serieIndex,
                    "data-slice": a.sliceIndex,
                    "data-value": a.value
                });
              var m = this._series[a.serieIndex].name;
              return m && b.addClass(m),
              a.name && b.addClass(a.name),
                b.addClass("serie-" + a.serieIndex + " slice-" + a.sliceIndex),
              a.isOuter && (b.addClass("outer"),
              a.offset && (b.addClass("clicked"),
                this.effectOnSlice(b, a, {
                    type: "offset",
                    offset: a.offset
                }))),
                b
          },
          getSliceFillColor: function(a, b) {
              b = b || 0;
              var c = this.model.get("attrs")
                , d = Object.keys(c).find(function(c) {
                  return c.indexOf(".serie-" + b + ".slice-" + a + " > .slice-fill") > -1
              });
              return d ? c[d].fill : this._series[b].data[a].fill
          },
          onMouseMoveSlice: function(a) {
              var b = V(a.currentTarget)
                , c = b.attr("data-serie")
                , d = b.attr("data-slice")
                , e = this._series[c].data[d];
              this.trigger(a.type, e, a)
          },
          mouseOverSlice: function(a, b) {
              b = b || 0;
              var c = V(this.$('.slice[data-serie="' + b + '"][data-slice="' + a + '"]')[0])
                , d = this._series[b].data[a];
              c.toggleClass("hover"),
              d.isOuter && !joint.util.isEmpty(d.onHoverEffect) && this.effectOnSlice(c, d, d.onHoverEffect, !c.hasClass("hover"));
              var e = V(this.$('.legend-slice[data-serie="' + b + '"][data-slice="' + a + '"]')[0]);
              e && e.toggleClass("hover");
              var f = Object.keys(this.model.get("attrs")).filter(function(a) {
                  return a.indexOf(".slice") > -1 || a.indexOf(".legend-slice") > -1
              });
              joint.dia.ElementView.prototype.update.call(this, this.model, joint.util.pick(this.model.get("attrs"), f))
          },
          onMouseOverSlice: function(a) {
              var b = V(a.currentTarget)
                , c = b.attr("data-serie")
                , d = b.attr("data-slice");
              this.mouseOverSlice(d, c);
              var e = this._series[c].data[d];
              this.trigger(a.type, e, a)
          },
          clickSlice: function(a, b) {
              b = b || 0;
              var c = V(this.$('.slice[data-serie="' + b + '"][data-slice="' + a + '"]')[0])
                , d = this._series[b].data[a];
              d.isOuter && (c.hasClass("clicked") ? (c.removeClass("clicked"),
                this.model.get("series")[b].data[a].offset = 0,
                this.effectOnSlice(c, d, d.onClickEffect, !0)) : (c.addClass("clicked"),
                this.model.get("series")[b].data[a].offset = d.onClickEffect.offset,
                this.effectOnSlice(c, d, d.onClickEffect)))
          },
          onClickSlice: function(a) {
              var b = V($(a.target).closest(".slice.outer")[0]);
              if (b) {
                  var c = b.attr("data-serie")
                    , d = b.attr("data-slice");
                  this.clickSlice(d, c);
                  var e = this._series[c].data[d];
                  this.trigger(a.type, e, a)
              }
          },
          onEventLegendItem: function(a) {
              var b = V($(a.target).closest(".legend-slice")[0]);
              if (b) {
                  var c = b.attr("data-serie")
                    , d = b.attr("data-slice");
                  switch (a.type) {
                      case "click":
                          this.clickSlice(d, c);
                          break;
                      case "mouseover":
                      case "mouseout":
                          this.mouseOverSlice(d, c)
                  }
              }
          },
          effectOnSlice: function(a, b, c, d) {
              switch (d = d || !1,
                c.type) {
                  case "enlarge":
                      d ? a.scale(1) : a.scale(c.scale || 1.05);
                      break;
                  case "offset":
                      d ? a.translate(0, 0, {
                          absolute: !0
                      }) : a.translate(c.offset * Math.cos(-b.middleangle), -c.offset * Math.sin(-b.middleangle))
              }
          },
          svgArcMax: 2 * Math.PI - 1e-6,
          drawArc: function(a, b, c, d, e) {
              var f = 0
                , g = 1
                , h = e - d;
              return h > Math.PI && (f = 1,
              h >= this.svgArcMax && (f = 0,
                g = 0)),
              "M" + a.x + "," + a.y + " A" + c + "," + c + " 0 " + f + "," + g + " " + b.x + "," + b.y
          }
      }),
      joint.shapes.chart.Knob = joint.shapes.chart.Pie.extend({
          defaults: joint.util.deepSupplement({
              type: "chart.Knob",
              sliceDefaults: {
                  legendLabel: "{value:.0f}",
                  outer: {
                      offsetOnClick: 0
                  }
              },
              pieHole: .7,
              value: 0,
              attrs: {
                  ".legend": {
                      "ref-x": .5,
                      "ref-y": .5,
                      "ref-dx": null,
                      "x-alignment": -.5,
                      "y-alignment": -.5
                  },
                  ".legend-slice text": {
                      "font-size": 30
                  },
                  ".legend-slice circle": {
                      display: "none"
                  },
                  ".slice-inner-label": {
                      display: "none"
                  },
                  ".slice-fill": {
                      stroke: "none"
                  }
              }
          }, joint.shapes.chart.Pie.prototype.defaults),
          initialize: function() {
              this.set("series", this.getKnobSeries(), {
                  silent: !0
              }),
                joint.shapes.chart.Pie.prototype.initialize.apply(this, arguments),
                this.on("change:value change:min change:max change:fill", this.updateKnob, this)
          },
          getKnobSeries: function() {
              var a = Array.isArray(this.get("value")) ? this.get("value") : [this.get("value")]
                , b = Array.isArray(this.get("fill")) ? this.get("fill") : [this.get("fill")]
                , c = Array.isArray(this.get("min")) ? this.get("min") : [this.get("min")]
                , d = Array.isArray(this.get("max")) ? this.get("max") : [this.get("max")]
                , e = a.map(function(a, e) {
                  var f = void 0 === c[e] ? c[0] : c[e]
                    , h = void 0 === d[e] ? d[0] : d[e]
                    , i = void 0 === b[e] ? b[0] : b[e];
                  return {
                      degree: g.scale.linear([f, h], [0, 360], a),
                      data: [{
                          value: a,
                          fill: i
                      }],
                      showLegend: !(e > 0)
                  }
              });
              return e
          },
          updateKnob: function() {
              this.set("series", this.getKnobSeries())
          }
      }),
      joint.shapes.chart.KnobView = joint.shapes.chart.PieView,
      joint.shapes.chart.Matrix = joint.shapes.basic.Generic.extend({
          markup: ['<g class="rotatable">', '<g class="scalable">', '<g class="background"><rect/></g>', '<g class="cells"/>', '<g class="foreground"/>', "</g>", '<g class="labels">', '<g class="rows"/>', '<g class="columns"/>', "</g>", "</g>"].join(""),
          cellMarkup: '<rect class="cell"/>',
          labelMarkup: '<text class="label"/>',
          gridLineMarkup: '<path class="grid-line"/>',
          defaults: joint.util.deepSupplement({
              type: "chart.Matrix",
              attrs: {
                  ".background rect": {
                      fill: "#eeeeee"
                  },
                  ".grid-line": {
                      stroke: "white",
                      "stroke-width": 2
                  },
                  ".label": {
                      fill: "black",
                      "alignment-baseline": "middle"
                  },
                  ".labels .rows .label": {
                      "text-anchor": "end"
                  },
                  ".labels .columns .label": {
                      "text-anchor": "start"
                  }
              }
          }, joint.shapes.basic.Generic.prototype.defaults)
      }),
      joint.shapes.chart.MatrixView = joint.dia.ElementView.extend({
          initialize: function() {
              joint.dia.ElementView.prototype.initialize.apply(this, arguments),
                this.listenTo(this.model, "change:size", function() {
                    this.renderLabels(),
                      this.update()
                }),
                this.listenTo(this.model, "change:cells", function() {
                    this.renderMarkup(),
                      this.update()
                })
          },
          renderMarkup: function() {
              joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments),
                this.elCells = this.$(".cells")[0],
                this.elRowLabels = this.$(".labels .rows")[0],
                this.elColumnLabels = this.$(".labels .columns")[0],
                this.elForeground = this.$(".foreground")[0],
                this.elCell = V(this.model.cellMarkup),
                this.elGridLine = V(this.model.gridLineMarkup);
              var a = this.model.get("cells") || []
                , b = this.model.get("size");
              this.elBackgroundRect = this.$(".background rect")[0],
                V(this.elBackgroundRect).attr(b);
              var c = b.height / a.length
                , d = b.width / a.length
                , e = document.createDocumentFragment();
              this.elCells.textContent = "",
                this.elForeground.textContent = "";
              for (var f, g, h, i, j, k = document.createDocumentFragment(), l = 0; l < a.length; l++)
                  for (h = this.elGridLine.clone(),
                         h.addClass("horizontal"),
                         h.attr("d", "M 0 " + l * c + " " + b.width + " " + l * c),
                         k.appendChild(h.node),
                         f = a[l],
                         g = 0; g < f.length; g++)
                      0 === l && (h = this.elGridLine.clone(),
                        h.addClass("vertical"),
                        h.attr("d", "M " + g * d + " 0 " + g * d + " " + b.height),
                        k.appendChild(h.node)),
                        i = f[g],
                      i && (j = this.elCell.clone(),
                        j.attr(joint.util.assign({
                            x: g * d,
                            y: l * c,
                            width: d,
                            height: c
                        }, i)),
                        e.appendChild(j.node));
              this.elForeground.appendChild(k),
                this.elCells.appendChild(e),
                this.renderLabels()
          },
          renderLabels: function() {
              this.elLabel = V(this.model.labelMarkup);
              var a, b, c = this.model.get("cells") || [], d = this.model.get("labels") || {}, e = d.rows || [], f = d.columns || [], g = this.model.get("size"), h = g.height / c.length, i = g.width / c.length;
              this.elRowLabels.textContent = "",
                this.elColumnLabels.textContent = "";
              for (var j = document.createDocumentFragment(), k = 0; k < e.length; k++)
                  a = d.rows[k],
                    b = this.elLabel.clone(),
                    b.text(a.text),
                    b.attr(joint.util.assign({
                        x: -(d.padding || 5),
                        y: k * h + h / 2,
                        "text-anchor": "end",
                        "dominant-baseline": "central",
                        "font-size": h,
                        "data-row": k
                    }, joint.util.omit(a, "text"))),
                    j.appendChild(b.node);
              this.elRowLabels.appendChild(j);
              for (var l, m, n = document.createDocumentFragment(), o = 0; o < f.length; o++)
                  a = d.columns[o],
                    b = this.elLabel.clone(),
                    l = o * i + i / 2,
                    m = -(d.padding || 5),
                    b.attr("x", l),
                    b.text(a.text),
                    b.attr(joint.util.assign({
                        y: m,
                        "text-anchor": "start",
                        "dominant-baseline": "central",
                        "font-size": i,
                        "data-column": o
                    }, joint.util.omit(a, "text"))),
                    b.rotate(-90, l, m),
                    n.appendChild(b.node);
              this.elColumnLabels.appendChild(n)
          }
      });
    joint.shapes.bpmn = {},
      joint.shapes.bpmn.icons = {
          none: "",
          message: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00NzkuOTk4LDY0SDMyQzE0LjMyOSw2NCwwLDc4LjMxMiwwLDk2djMyMGMwLDE3LjY4OCwxNC4zMjksMzIsMzIsMzJoNDQ3Ljk5OEM0OTcuNjcxLDQ0OCw1MTIsNDMzLjY4OCw1MTIsNDE2Vjk2ICBDNTEyLDc4LjMxMiw0OTcuNjcxLDY0LDQ3OS45OTgsNjR6IE00MTYsMTI4TDI1NiwyNTZMOTYsMTI4SDQxNnogTTQ0OCwzODRINjRWMTYwbDE5MiwxNjBsMTkyLTE2MFYzODR6Ii8+PC9zdmc+",
          plus: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyLjUsMTRIMTR2OC41YzAsMC4yNzYtMC4yMjQsMC41LTAuNSwwLjVoLTRDOS4yMjQsMjMsOSwyMi43NzYsOSwyMi41VjE0SDAuNSAgQzAuMjI0LDE0LDAsMTMuNzc2LDAsMTMuNXYtNEMwLDkuMjI0LDAuMjI0LDksMC41LDlIOVYwLjVDOSwwLjIyNCw5LjIyNCwwLDkuNSwwaDRDMTMuNzc2LDAsMTQsMC4yMjQsMTQsMC41VjloOC41ICBDMjIuNzc2LDksMjMsOS4yMjQsMjMsOS41djRDMjMsMTMuNzc2LDIyLjc3NiwxNCwyMi41LDE0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+",
          cross: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yMi4yNDUsNC4wMTVjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjEzOWwtNi4yNzYsNi4yN2MtMC4zMTMsMC4zMTItMC4zMTMsMC44MjYsMCwxLjE0bDYuMjczLDYuMjcyICBjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjE0bC0yLjI4NSwyLjI3N2MtMC4zMTQsMC4zMTItMC44MjgsMC4zMTItMS4xNDIsMGwtNi4yNzEtNi4yNzFjLTAuMzEzLTAuMzEzLTAuODI4LTAuMzEzLTEuMTQxLDAgIGwtNi4yNzYsNi4yNjdjLTAuMzEzLDAuMzEzLTAuODI4LDAuMzEzLTEuMTQxLDBsLTIuMjgyLTIuMjhjLTAuMzEzLTAuMzEzLTAuMzEzLTAuODI2LDAtMS4xNGw2LjI3OC02LjI2OSAgYzAuMzEzLTAuMzEyLDAuMzEzLTAuODI2LDAtMS4xNEwxLjcwOSw1LjE0N2MtMC4zMTQtMC4zMTMtMC4zMTQtMC44MjcsMC0xLjE0bDIuMjg0LTIuMjc4QzQuMzA4LDEuNDE3LDQuODIxLDEuNDE3LDUuMTM1LDEuNzMgIEwxMS40MDUsOGMwLjMxNCwwLjMxNCwwLjgyOCwwLjMxNCwxLjE0MSwwLjAwMWw2LjI3Ni02LjI2N2MwLjMxMi0wLjMxMiwwLjgyNi0wLjMxMiwxLjE0MSwwTDIyLjI0NSw0LjAxNXoiLz48L3N2Zz4=",
          user: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyLDIwLjk5OGgtMWMwLDAtMSwwLTEtMVYxNy41YzAtMC4yNzctMC4yMjQtMC41LTAuNS0wLjVTMTksMTcuMjIzLDE5LDE3LjUgIGwtMC4wMDgsNC4yOTVjMCwwLjYwOS0yLjAxLDIuMjA1LTYuNDkyLDIuMjA1cy02LjQ5Mi0xLjU5Ni02LjQ5Mi0yLjIwNUw2LDE3LjVDNiwxNy4yMjMsNS43NzYsMTcsNS41LDE3UzUsMTcuMjIzLDUsMTcuNXYyLjQ5OCAgYzAsMS0xLDEtMSwxSDNjMCwwLTEsMC0xLTFWMTUuNzVjMC0yLjkyMiwyLjg5Mi01LjQwMSw2LjkzLTYuMzQxYzAsMCwxLjIzNCwxLjEwNywzLjU3LDEuMTA3czMuNTctMS4xMDcsMy41Ny0xLjEwNyAgYzQuMDM4LDAuOTQsNi45MywzLjQxOSw2LjkzLDYuMzQxdjQuMjQ4QzIzLDIwLjk5OCwyMiwyMC45OTgsMjIsMjAuOTk4eiBNMTIuNDc3LDljLTIuNDg1LDAtNC41LTIuMDE1LTQuNS00LjVTOS45OTEsMCwxMi40NzcsMCAgczQuNSwyLjAxNSw0LjUsNC41UzE0Ljk2Miw5LDEyLjQ3Nyw5eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+",
          circle: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gULEBE3DEP64QAAAwlJREFUaN7dmktrU0EUx38ZmmBbfEIL2hSjkYKC1EW6EDFudC+404/gE6WKSvGxERQfIH4AX1T9EOKrCrYurVrbgsZWoaBVixDbpC6ci+Fyz9ybZG478cBs7syc+Z+5c86c+c8ksCPrgW1ADtgEbARafG1+AW+AYWAIGADGWUTZAJwHxoD5GssocA7ILiTwLcADoFQHcH8pAfeB7jiBtwO3gLJF4P5S1mO02wa/C5iMEbi/TAI7bYE/Y3m5VLOs+sLAJULqrgKHIxhZBp4DT4FX2jkLGoinq1M7fg7YDmwFVATd14CjFboiy5UIs/QBOAmka/izaeCU1hE2zuVqlZ8IUfgVOAA0WViiTcBBrdM0Zm9UhTuAOYOiRzXOeJh0Ak8M484B+TAlK4BPBiU3gWSMoTqpw6g0fgFYblJww9D5dojT25IEcMeA47rUsdsQLp9FmPmURSNSOqpJS2lzUKd+ocN3IBNx5mz+oXXADwHTXX/jjMFxjy1iwtgrYJoF1lY27BMafozZaaMspYKA7XRlw7f1xt4Y5biA7bXXIGv4TW0OGNCmsQRhzCidlwTJADDlgAFTwAuhLq+AHqHyMe6IhKVHAV1C5ZBDBkhYupThPPreIQNGJTJBGXKLLw4Z8NmQu/Fb8PCkQwakBIxFRWPLvAJmhMpWh4AuFb7PKGBaqFzjkAGrhe/TSjNrQZJ1yAAJy5gCRoTKnEMGSFhGFDBoOBu7IhKWQe8wLRFLHQ6A7zCcFNNK59vvAjoqYK8DBuwTCLBhTUD8Hweahj9S2jjU297VqzrU26BVmi2yEjXRKg1PbHnpqYla7AeWxAi+GbhHHdSit2mYyN2XQQ5kQTJ6Y6qL3PUkCr2+H7v0+jcs0eueRLngGNeKa9mxY73g8JzpEtHusorAQ/7e+e7WUWIl//jSVTrK7QEu6KgW9d7tYr3B44iBWPJfkZZ8pZ4r2VngkC0HywMTLNwN5YSBcKtZWoGzernEBbyox2iJc6Np2KcGfnHisYet1CDouc2yCjbhp07MrD+3+QNxi4JkAscRswAAAABJRU5ErkJggg==",
          service: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB1RJREFUeNrMWltMVFcUHZAIRSAkSFACITRAVbQ/DVhHiRZC2y9jotFgqgmxKqShKdFCggZbEpP2h1Q/oLUg8GH0xy/LKwpDEEFsjKCM8kYkgAhTpggDMzCc7kX2mGF677w80J5khbnnntc+Zz/W2ReNxvsSQLhPWCBYGPhdTdjg7aBCCI/gVSfu+CHBfPz48ba7d+82AocOHfqT6mYIEV6Oua4CfE6YHxsbeyS49Pf3P6C6RYJ2vQTwVTtKHx+fXYRzhM0qTbYR/g4JCQmyVYSFhQXTHyMhUWXMzTzmTo3MorATHxH0eEXAriYrtCmNiop6tby8bLCdgNVqfR0ZGTlC735RaJ/EY+HhGSFhTVSIyg7CIO3mRHNzs44WOYydJuQQ/AjxhJ9hsFqt9qlwKElJSRB8nvAjIYYN+hucDMbCmMHBwZP03E/YLlUAKh8TnoSHh49NT0+vLG5paWk0JyfnPu9cJ8EUGho6cfTo0fbBwcFWRwH6+vpaYcy0yCk26Hb0zc7ObsFYaIOxaY5xqn9M2ClTgGw8wqM4LuzevXu6xMTEnitXrjTOz8/3Chfl7du3Ly5fvtyUkJDQrzRedXV1I2/KWZkCwCDrsMMWi+WV46Sk42+EhwV24VhnNpuHaY43NFct5pRtA7tw9BkZGQ/peVHIL+bDhw8/YrtKXJM4QOVrVNfV1TXKXr2d6mTK8EI+tk4KPrszNjY2mIJTiK+vb5iK+zX29vbqW1paLNRe7N271590PpF+hyq1hzpt3bpVTE5ODlDfFIU5FdfiTRxAkDKVlpY2QI2VVNvOHUIVXjJmUEcC6Rz7keGLffv2CdoMK5/AogzupCZA8aZNmwxkbEMKi18sKSmxqcF1QjohmgF6UYl3LPw7GxoYGBAbN24U+fn5puLi4qWqqqoBGdwJxZ+J2ZeEXF6U9dixYw+VdLi1tbWJF3/aycBn0aa9vb3J1q++vl4EBARAfYRM7oTSwpFzjjAeExMznJ6e/mRkZORfAoA20Mn8Re3KFAaD9zpH2MzP13GK1GcafSl+iIiICGEymd6Nh4BG7SbVNgNj8Zg7nQmwdPLkybahoaG22dnZbntu41i6u7sh7CzhM1fciZCKTUEf9M3KyhLJycnYBCGTO6FYmpqa3HKX5eXlDWysUW5wp0K0LSoqasvLyxP+/v7ixIkTQjZ3WhFAR8UbAdzgTmY/Pz9rfHy8KCgoEKOjo0I2d1pxzxhAr9e3GI3GZ87ogp0KpbriTrdv3+6ghS9XVlYaFxYWxFpxJ5QaltxMeAOOf+DAgQ4VI55mIy53hzuRx7GuNXfSsM5FwJURzhBK3HSjZ/8P3MmrQIYgxUJUcvDKx/OtW7c61ps7ObtSziHiqlEJ0AU+VqgfPI8lOjraajAYVNUGKgg7Kisra4RDwG9bnFAqZMTjcBBI3ziLA0ovQPL0cXFxg6STU84W1NPT8+DSpUtt8DY3btwwqqm2p9zJ1q+wsBAqC7uL9EQA3H+Fu+41NzdXkPELMmQhizvZeSc9bQ5OucAtATiKLsAPK+0KXCKIWW1trSBSJjIzM8EwxYULF4RM7mRf0tLSnrCX/JXwLW9CLPO4VVfKcHAj4kMvldwZ6ojzr5CywMBAsWXLFrFnz54VmjAxMSE84U4KQqziTvYFapqSktIJnkbtXjNvW+DU5ioB8vDIOrlq7Xfu3GmgINNHl47lixcvIiO3QszsuY273ElFgFXcSSVGTBFfew7eBv4GHucoAHz6Y+I1r23UgFRmED6e1QD8XZBOW7zlTk4EgE28rKioaHBnbNgnPJ+vw8UGrO8rcoVzdJ2MqKmp0ZEbC7l58yaSWacJn0LqoKCgcc1/XOg0nHqhBDt6XI+TsXvnNXdycQJpUCHouzOagTkxN9/mrKqZAE7QgloEOtR7zZ1cCFABRqpkxNgIMuKnmIsvQGaOJ9UepzLelzupjJnlzI2mpqZ28KKvcspHy2vY4I0AMrhTDOMLQhXeXbt2zftAJikd7yl3AmZAxXFK3lIJH08lUUo++aBSo+ki7vQBGaHTRBjdwJ7TghGENFqtNoAuPTvUEmFkDxN0Z7ZSkBymvlqltUj5DOQpd/Kk4HbG6pct5fuYp9xJQlk8depUK1/8P5EqgDvcydPV4g6gVMcutNmWd5IlgEvuhA8ixJl63LjU64uKinS4g+AW5niauE+wKn0vUwB3uNMcvM+RI0faQcKU0ioHDx60pVWMtmQWvj9jLFtaBXNwWmWXbBvYThiAO8TO8UIMHHAQaOIIPyEQ7d+/v9NRgN27d3exfv/AhG4D9zVgLIzJ7heJrW3SjdgVd7Jr8zsybfZUATyKU4tXVXKt9Txml2pqUdbXdDXuZPf+OySPkX+1CQBixtzmjEqfQL6tJaqtxU/ix3I9n4JaeUEInZmZGSHasVIxNTU1wx9TulTGNNGf35zN67eOFL6X4Hv+/Hkr3aN14PNEPYL5atgvjde4+1HBy3/PaXb49xwwzD/eZyP/EWAAQ3AUnjpOYHIAAAAASUVORK5CYII="
      },
      joint.shapes.bpmn.IconInterface = {
          initialize: function() {
              this._parent = (this._parent || this).constructor.__super__,
                this._parent.initialize.apply(this, arguments),
                this.listenTo(this, "change:icon", this._onIconChange),
                this._onIconChange(this, this.get("icon") || "none")
          },
          _onIconChange: function(a, b) {
              var c = joint.shapes.bpmn.icons;
              if (!joint.util.has(c, b))
                  throw "BPMN: Unknown icon: " + b;
              a.attr("image/xlink:href", c[b])
          }
      },
      joint.shapes.bpmn.SubProcessInterface = {
          initialize: function() {
              this._parent = (this._parent || this).constructor.__super__,
                this._parent.initialize.apply(this, arguments),
                this.listenTo(this, "change:subProcess", this._onSubProcessChange),
                this._onSubProcessChange(this, this.get("subProcess") || null)
          },
          _onSubProcessChange: function(a, b) {
              a.attr({
                  ".sub-process": {
                      visibility: b ? "visible" : "hidden",
                      "data-sub-process": b || ""
                  }
              })
          }
      },
      joint.shapes.bpmn.ActivityView = joint.shapes.basic.TextBlockView,
      joint.shapes.bpmn.Activity = joint.shapes.basic.TextBlock.extend({
          markup: ['<g class="rotatable">', '<g class="scalable"><rect class="body outer"/><rect class="body inner"/></g>', joint.env.test("svgforeignobject") ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>' : '<text class="content"/>', '<path class="sub-process"/><image class="icon"/></g>'].join(""),
          defaults: joint.util.deepSupplement({
              size: {
                  width: 100,
                  height: 100
              },
              type: "bpmn.Activity",
              attrs: {
                  rect: {
                      rx: 8,
                      ry: 8,
                      width: 100,
                      height: 100
                  },
                  ".body": {
                      fill: "#ffffff",
                      stroke: "#000000"
                  },
                  ".inner": {
                      transform: "scale(0.9,0.9) translate(5,5)"
                  },
                  path: {
                      d: "M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15",
                      ref: ".inner",
                      "ref-x": .5,
                      "ref-dy": -30,
                      "x-alignment": "middle",
                      stroke: "#000000",
                      fill: "transparent"
                  },
                  image: {
                      ref: ".inner",
                      "ref-x": 5,
                      width: 20,
                      height: 20
                  }
              },
              activityType: "task",
              subProcess: null
          }, joint.shapes.basic.TextBlock.prototype.defaults),
          initialize: function() {
              joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments),
                this.listenTo(this, "change:activityType", this.onActivityTypeChange),
                this.listenTo(this, "change:subProcess", this.onSubProcessChange),
                this.onSubProcessChange(this, this.get("subProcess")),
                this.onActivityTypeChange(this, this.get("activityType"))
          },
          onActivityTypeChange: function(a, b) {
              switch (b) {
                  case "task":
                      a.attr({
                          ".inner": {
                              visibility: "hidden"
                          },
                          ".outer": {
                              "stroke-width": 1,
                              "stroke-dasharray": "none"
                          },
                          path: {
                              ref: ".outer"
                          },
                          image: {
                              ref: ".outer"
                          }
                      });
                      break;
                  case "transaction":
                      a.attr({
                          ".inner": {
                              visibility: "visible"
                          },
                          ".outer": {
                              "stroke-width": 1,
                              "stroke-dasharray": "none"
                          },
                          path: {
                              ref: ".inner"
                          },
                          image: {
                              ref: ".inner"
                          }
                      });
                      break;
                  case "event-sub-process":
                      a.attr({
                          ".inner": {
                              visibility: "hidden"
                          },
                          ".outer": {
                              "stroke-width": 1,
                              "stroke-dasharray": "1,2"
                          },
                          path: {
                              ref: ".outer"
                          },
                          image: {
                              ref: ".outer"
                          }
                      });
                      break;
                  case "call-activity":
                      a.attr({
                          ".inner": {
                              visibility: "hidden"
                          },
                          ".outer": {
                              "stroke-width": 5,
                              "stroke-dasharray": "none"
                          },
                          path: {
                              ref: ".outer"
                          },
                          image: {
                              ref: ".outer"
                          }
                      });
                      break;
                  default:
                      throw "BPMN: Unknown Activity Type: " + b
              }
          },
          onSubProcessChange: function(a, b) {
              b ? a.attr({
                  ".fobj div": {
                      style: {
                          verticalAlign: "baseline",
                          paddingTop: 10
                      }
                  },
                  image: {
                      "ref-dy": -25,
                      "ref-y": ""
                  },
                  text: {
                      "ref-y": 25
                  }
              }) : a.attr({
                  ".fobj div": {
                      style: {
                          verticalAlign: "middle",
                          paddingTop: 0
                      }
                  },
                  image: {
                      "ref-dy": "",
                      "ref-y": 5
                  },
                  text: {
                      "ref-y": .5
                  }
              })
          }
      }).extend(joint.shapes.bpmn.IconInterface).extend(joint.shapes.bpmn.SubProcessInterface),
      joint.shapes.bpmn.AnnotationView = joint.shapes.basic.TextBlockView,
      joint.shapes.bpmn.Annotation = joint.shapes.basic.TextBlock.extend({
          markup: ['<g class="rotatable">', '<g class="scalable"><rect class="body"/></g>', joint.env.test("svgforeignobject") ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>' : '<text class="content"/>', '<path class="stroke"/></g>'].join(""),
          defaults: joint.util.deepSupplement({
              size: {
                  width: 100,
                  height: 100
              },
              type: "bpmn.Annotation",
              attrs: {
                  rect: {
                      width: 100,
                      height: 100
                  },
                  ".body": {
                      "fill-opacity": .1,
                      fill: "#ffffff",
                      stroke: "none"
                  },
                  ".fobj div": {
                      style: {
                          textAlign: "left",
                          paddingLeft: 10
                      }
                  },
                  ".stroke": {
                      stroke: "#000000",
                      fill: "none",
                      "stroke-width": 3
                  }
              },
              wingLength: 20
          }, joint.shapes.basic.TextBlock.prototype.defaults),
          initialize: function() {
              joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments),
                this.listenTo(this, "change:size", this.onSizeChange),
                this.onSizeChange(this, this.get("size"))
          },
          onSizeChange: function(a, b) {
              a.attr(".stroke", {
                  d: a.getStrokePathData(b.width, b.height, a.get("wingLength"))
              })
          },
          getStrokePathData: function(a, b, c) {
              return c = Math.min(c, a),
                ["M", c, "0 L 0 0 0", b, c, b].join(" ")
          }
      }),
      joint.shapes.bpmn.Gateway = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><polygon class="body"/><image/></g></g><text class="label"/>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Gateway",
              size: {
                  width: 80,
                  height: 80
              },
              attrs: {
                  ".body": {
                      points: "40,0 80,40 40,80 0,40",
                      fill: "#ffffff",
                      stroke: "#000000"
                  },
                  ".label": {
                      text: "",
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": 20,
                      "y-alignment": "middle",
                      "x-alignment": "middle",
                      "font-size": 14,
                      "font-family": "Arial, helvetica, sans-serif",
                      fill: "#000000"
                  },
                  image: {
                      width: 40,
                      height: 40,
                      "xlink:href": "",
                      transform: "translate(20,20)"
                  }
              }
          }, joint.dia.Element.prototype.defaults)
      }).extend(joint.shapes.bpmn.IconInterface),
      joint.shapes.bpmn.Event = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><circle class="body outer"/><circle class="body inner"/><image/></g><text class="label"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Event",
              size: {
                  width: 60,
                  height: 60
              },
              attrs: {
                  ".body": {
                      fill: "#ffffff",
                      stroke: "#000000"
                  },
                  ".outer": {
                      "stroke-width": 1,
                      r: 30,
                      transform: "translate(30,30)"
                  },
                  ".inner": {
                      "stroke-width": 1,
                      r: 26,
                      transform: "translate(30,30)"
                  },
                  image: {
                      width: 40,
                      height: 40,
                      "xlink:href": "",
                      transform: "translate(10,10)"
                  },
                  ".label": {
                      text: "",
                      fill: "#000000",
                      "font-family": "Arial",
                      "font-size": 14,
                      ref: ".outer",
                      "ref-x": .5,
                      "ref-dy": 20,
                      "x-alignment": "middle",
                      "y-alignment": "middle"
                  }
              },
              eventType: "start"
          }, joint.dia.Element.prototype.defaults),
          initialize: function() {
              joint.dia.Element.prototype.initialize.apply(this, arguments),
                this.listenTo(this, "change:eventType", this.onEventTypeChange),
                this.onEventTypeChange(this, this.get("eventType"))
          },
          onEventTypeChange: function(a, b) {
              switch (b) {
                  case "start":
                      a.attr({
                          ".inner": {
                              visibility: "hidden"
                          },
                          ".outer": {
                              "stroke-width": 1
                          }
                      });
                      break;
                  case "end":
                      a.attr({
                          ".inner": {
                              visibility: "hidden"
                          },
                          ".outer": {
                              "stroke-width": 5
                          }
                      });
                      break;
                  case "intermediate":
                      a.attr({
                          ".inner": {
                              visibility: "visible"
                          },
                          ".outer": {
                              "stroke-width": 1
                          }
                      });
                      break;
                  default:
                      throw "BPMN: Unknown Event Type: " + b
              }
          }
      }).extend(joint.shapes.bpmn.IconInterface),
      joint.shapes.bpmn.Pool = joint.dia.Element.extend({
          markup: ['<g class="rotatable">', '<g class="scalable"><rect class="body"/></g>', '<svg overflow="hidden" class="blackbox-wrap"><text class="blackbox-label"/></svg>', '<rect class="header"/><text class="label"/>', '<g class="lanes"/>', "</g>"].join(""),
          laneMarkup: '<g class="lane"><rect class="lane-body"/><rect class="lane-header"/><text class="lane-label"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Pool",
              size: {
                  width: 600,
                  height: 300
              },
              attrs: {
                  ".body": {
                      fill: "#ffffff",
                      stroke: "#000000",
                      width: 500,
                      height: 200,
                      "pointer-events": "stroke"
                  },
                  ".header": {
                      fill: "#ffffff",
                      stroke: "#000000",
                      width: 20,
                      ref: ".body",
                      "ref-height": 1,
                      "pointer-events": "visiblePainted"
                  },
                  ".label": {
                      fill: "#000000",
                      transform: "rotate(-90)",
                      ref: ".header",
                      "ref-x": 10,
                      "ref-y": .5,
                      "font-family": "Arial",
                      "font-size": 14,
                      "x-alignment": "middle",
                      "text-anchor": "middle"
                  },
                  ".lane-body": {
                      fill: "#ffffff",
                      stroke: "#000000",
                      "pointer-events": "stroke"
                  },
                  ".lane-header": {
                      fill: "#ffffff",
                      stroke: "#000000",
                      "pointer-events": "visiblePainted"
                  },
                  ".lane-label": {
                      fill: "#000000",
                      transform: "rotate(-90)",
                      "text-anchor": "middle",
                      "font-family": "Arial",
                      "font-size": 13
                  },
                  ".blackbox-wrap": {
                      ref: ".body",
                      "ref-width": 1,
                      "ref-height": 1
                  },
                  ".blackbox-label": {
                      text: "Black Box",
                      "text-anchor": "middle",
                      transform: "translate(0,-7)"
                  },
                  ".blackbox-label > tspan": {
                      dx: "50%",
                      dy: "50%"
                  }
              }
          }, joint.dia.Element.prototype.defaults)
      }),
      joint.shapes.bpmn.PoolView = joint.dia.ElementView.extend({
          options: {
              headerWidth: 20
          },
          initialize: function() {
              this.listenTo(this.model, "change:lanes", function(a, b) {
                  this.renderLanes(b)
              }),
                joint.dia.ElementView.prototype.initialize.apply(this, arguments)
          },
          update: function() {
              return void 0 === this.lanesAttrs ? this.renderLanes(this.model.get("lanes")) : joint.dia.ElementView.prototype.update.call(this, this.model, joint.util.merge({}, this.model.get("attrs"), this.lanesAttrs || {}))
          },
          renderMarkup: function() {
              joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments),
                this.$lanes = this.$(".lanes"),
                this.laneMarkup = V(this.model.laneMarkup)
          },
          renderLanes: function(a) {
              a = a || {},
                this.index = 0;
              var b = void 0 === a.headerWidth ? this.options.headerWidth : a.headerWidth;
              this.lanesAttrs = {
                  ".header": {
                      width: b
                  },
                  ".label": {
                      text: a.label || ""
                  }
              },
                this.$lanes.empty(),
              a.sublanes && this.renderSublanes(a.sublanes, b, 0, 1, "lanes"),
                this.update(this.model, joint.util.merge({}, this.model.get("attrs"), this.lanesAttrs))
          },
          calculateRatios: function(a, b) {
              for (var c = 0, d = [], e = [], f = 0, g = a.length; f < g; f++) {
                  var h = a[f]
                    , i = h.ratio;
                  Number.isFinite(i) ? (c += i / 10,
                    e[f] = i / 10 / b) : d.push(f)
              }
              for (var j = Math.max(1 - c, 0) * b / d.length, k = 0, l = d.length; k < l; k++)
                  e[d[k]] = j;
              return e
          },
          renderSublanes: function(a, b, c, d, e) {
              var f = this.options.headerWidth
                , g = e + "/sublanes/"
                , h = this.calculateRatios(a, d);
              joint.util.toArray(a).reduce(function(a, d, e) {
                  var i = "lane" + this.index
                    , j = "." + i + " .lane-body"
                    , k = "." + i + " .lane-header"
                    , l = "." + i + " .lane-label";
                  d.name && (i += " " + d.name);
                  var m = g + e
                    , n = this.laneMarkup.clone().addClass(i).attr({
                      "data-lane-path": m,
                      "data-lane-index": this.index
                  });
                  this.$lanes.append(n.node);
                  var o = h[e]
                    , p = void 0 === d.headerWidth ? f : d.headerWidth
                    , q = c + a;
                  return this.lanesAttrs[j] = {
                      ref: ".body",
                      "ref-height": o,
                      "ref-width": -b,
                      "ref-x": b,
                      "ref-y": q
                  },
                    this.lanesAttrs[k] = {
                        width: p,
                        ref: ".body",
                        "ref-height": o,
                        "ref-x": b,
                        "ref-y": q
                    },
                    this.lanesAttrs[l] = {
                        text: d.label,
                        ref: k,
                        "ref-x": 10,
                        "ref-y": .5,
                        "x-alignment": "middle"
                    },
                    this.index++,
                  d.sublanes && this.renderSublanes(d.sublanes, b + p, q, o, m),
                  a + o
              }
                .bind(this), 0)
          }
      }),
      joint.shapes.bpmn.Group = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><rect class="label-rect"/><g class="label-group"><svg overflow="hidden" class="label-wrap"><text class="label"/></svg></g></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Group",
              size: {
                  width: 200,
                  height: 200
              },
              attrs: {
                  ".body": {
                      width: 200,
                      height: 200,
                      stroke: "#000000",
                      "stroke-dasharray": "6,6",
                      "stroke-width": 2,
                      fill: "transparent",
                      rx: 15,
                      ry: 15,
                      "pointer-events": "stroke"
                  },
                  ".label-rect": {
                      ref: ".body",
                      "ref-width": .6,
                      "ref-x": .4,
                      "ref-y": -30,
                      height: 25,
                      fill: "#ffffff",
                      stroke: "#000000"
                  },
                  ".label-group": {
                      ref: ".label-rect",
                      "ref-x": 0,
                      "ref-y": 0
                  },
                  ".label-wrap": {
                      ref: ".label-rect",
                      "ref-width": 1,
                      "ref-height": 1
                  },
                  ".label": {
                      text: "",
                      x: "50%",
                      y: "1.3em",
                      "text-anchor": "middle",
                      "font-family": "Arial",
                      "font-size": 14,
                      fill: "#000000"
                  }
              }
          }, joint.dia.Element.prototype.defaults)
      }),
      joint.shapes.bpmn.DataObject = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><polygon class="body"/></g><text class="label"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.DataObject",
              size: {
                  width: 60,
                  height: 80
              },
              attrs: {
                  ".body": {
                      points: "20,0 60,0 60,80 0,80 0,20 20,0 20,20 0,20",
                      stroke: "#000000",
                      fill: "#ffffff"
                  },
                  ".label": {
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": 5,
                      text: "",
                      "text-anchor": "middle"
                  }
              }
          }, joint.dia.Element.prototype.defaults)
      }),
      joint.shapes.bpmn.Conversation = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><polygon class="body"/></g><text class="label"/><path class="sub-process"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Conversation",
              size: {
                  width: 100,
                  height: 100
              },
              attrs: {
                  ".body": {
                      points: "25,0 75,0 100,50 75,100 25,100 0,50",
                      stroke: "#000000",
                      fill: "#ffffff"
                  },
                  ".label": {
                      text: "",
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": 5,
                      "text-anchor": "middle"
                  },
                  path: {
                      d: "M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15",
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": -30,
                      "x-alignment": "middle",
                      fill: "#ffffff",
                      stroke: "#000000",
                      "fill-opacity": 0
                  }
              },
              conversationType: "conversation"
          }, joint.dia.Element.prototype.defaults),
          initialize: function() {
              joint.dia.Element.prototype.initialize.apply(this, arguments),
                this.listenTo(this, "change:conversationType", this.onConversationTypeChange),
                this.onConversationTypeChange(this, this.get("conversationType"))
          },
          onConversationTypeChange: function(a, b) {
              switch (b) {
                  case "conversation":
                      a.attr("polygon/stroke-width", 1);
                      break;
                  case "call-conversation":
                      a.attr("polygon/stroke-width", 4);
                      break;
                  default:
                      throw "BPMN: Unknown Conversation Type: " + b
              }
          }
      }).extend(joint.shapes.bpmn.SubProcessInterface),
      joint.shapes.bpmn.Choreography = joint.shapes.basic.TextBlock.extend({
          markup: ['<g class="rotatable">', '<g class="scalable"><rect class="body"/></g>', joint.env.test("svgforeignobject") ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>' : '<text class="content"/>', '<text class="label"/><path class="sub-process"/><g class="participants"/>', "</g>"].join(""),
          participantMarkup: '<g class="participant"><rect class="participant-rect"/><text class="participant-label"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Choreography",
              size: {
                  width: 60,
                  height: 80
              },
              attrs: {
                  rect: {},
                  ".body": {
                      width: 60,
                      height: 80,
                      stroke: "#000000",
                      fill: "#ffffff"
                  },
                  ".label": {
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": 5,
                      text: "",
                      "text-anchor": "middle"
                  },
                  ".participant-rect": {
                      stroke: "#000000",
                      fill: "#aaaaaa",
                      ref: ".body",
                      "ref-width": 1
                  },
                  ".participant-label": {
                      "text-anchor": "middle",
                      ref: ".participant_0 .participant-rect",
                      "ref-x": .5,
                      "ref-y": .5,
                      "y-alignment": "middle"
                  },
                  ".sub-process": {
                      d: "M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15",
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": -30,
                      "x-alignment": "middle",
                      fill: "transparent",
                      stroke: "#000000"
                  }
              },
              participants: [],
              initiatingParticipant: 0
          }, joint.shapes.basic.TextBlock.prototype.defaults)
      }).extend(joint.shapes.bpmn.SubProcessInterface),
      joint.shapes.bpmn.ChoreographyView = joint.shapes.basic.TextBlockView.extend({
          options: {
              participantHeight: 20
          },
          initialize: function() {
              this.listenTo(this.model, "change:participants", function(a, b) {
                  this.renderParticipants(b)
              }),
                this.listenTo(this.model, "change:initiatingParticipant", this.layoutAndUpdate),
                joint.shapes.basic.TextBlockView.prototype.initialize.apply(this, arguments),
              joint.env.test("svgforeignobject") || this.stopListening(this.model, "change:content").listenTo(this.model, "change:content", function(a) {
                  this.updateContent(a, this.participantsAttrs)
              })
          },
          update: function() {
              return void 0 === this.participantsAttrs ? this.renderParticipants(this.model.get("participants")) : (this.layoutAndUpdate(),
                this)
          },
          render: function() {
              this.participantsAttrs = void 0,
                joint.dia.ElementView.prototype.render.apply(this, arguments)
          },
          renderMarkup: function() {
              joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments),
                this.$participants = this.$(".participants"),
                this.participantMarkup = V(this.model.participantMarkup)
          },
          renderParticipants: function(a) {
              this.$participants.empty(),
                this.participantsAttrs = {},
                joint.util.toArray(a).forEach(function(a, b) {
                    var c = "participant_" + b
                      , d = "." + c;
                    this.participantsAttrs[d + " .participant-rect"] = {
                        height: this.options.participantHeight
                    },
                      this.participantsAttrs[d + " .participant-label"] = {
                          text: a
                      },
                      this.$participants.append(this.participantMarkup.clone().addClass(c).node)
                }, this),
                this.layoutAndUpdate()
          },
          layoutAndUpdate: function() {
              var a = this.model.get("participants") || []
                , b = a.length
                , c = this.options.participantHeight
                , d = this.model.get("size").height
                , e = Math.max(0, d - c * b)
                , f = 0
                , g = this.model.get("initiatingParticipant")
                , h = Math.max(joint.util.isNumber(g) ? Math.abs(g) : a.indexOf(g), 0)
                , i = Math.min(h, b - 2);
              joint.util.toArray(a).forEach(function(a, b) {
                  var d = ".participant_" + b;
                  this.participantsAttrs[d] = {
                      transform: "translate(0," + f + ")"
                  },
                    this.participantsAttrs[d + " .participant-rect"].fill = h == b ? this.model.attr(".body/fill") : this.model.attr(".participant-rect/fill"),
                    this.participantsAttrs[d + " .participant-rect"].stroke = h == b ? this.model.attr(".body/stroke") : this.model.attr(".participant-rect/stroke"),
                    f += c + (i == b ? e : 0)
              }, this);
              var j = b < 2 ? 0 : i - b + 1;
              this.participantsAttrs[".sub-process"] = {
                  "ref-dy": Math.max(-d, j * c - 30)
              };
              var k = b < 2 ? 0 : i + 1;
              this.participantsAttrs[".fobj div"] = {
                  style: {
                      height: e,
                      paddingTop: c * k
                  }
              },
                this.participantsAttrs[".content"] = {
                    "ref-y": c * k + e / 2
                };
              var l = joint.util.merge({}, this.model.get("attrs"), this.participantsAttrs || {});
              joint.util.unsetByPath(l, "div/html"),
                joint.shapes.basic.TextBlockView.prototype.update.call(this, this.model, l)
          }
      }),
      joint.shapes.bpmn.Message = joint.dia.Element.extend({
          markup: '<g class="rotatable"><g class="scalable"><polygon class="body"/></g><text class="label"/></g>',
          defaults: joint.util.deepSupplement({
              type: "bpmn.Message",
              size: {
                  width: 60,
                  height: 40
              },
              attrs: {
                  ".body": {
                      points: "0,0 60,0 60,40 0,40 0,0 60,0 30,20 0,0",
                      stroke: "#000000",
                      fill: "#ffffff"
                  },
                  ".label": {
                      ref: ".body",
                      "ref-x": .5,
                      "ref-dy": 5,
                      text: "",
                      "text-anchor": "middle"
                  }
              }
          }, joint.dia.Element.prototype.defaults)
      }),
      joint.shapes.bpmn.Flow = joint.dia.Link.extend({
          defaults: {
              type: "bpmn.Flow",
              attrs: {
                  ".marker-source": {
                      d: "M 0 0"
                  },
                  ".marker-target": {
                      d: "M 10 0 L 0 5 L 10 10 z",
                      fill: "#000000"
                  },
                  ".connection": {
                      "stroke-dasharray": " ",
                      "stroke-width": 1
                  },
                  ".connection-wrap": {
                      style: "",
                      onMouseOver: "",
                      onMouseOut: ""
                  }
              },
              flowType: "normal"
          },
          initialize: function() {
              joint.dia.Link.prototype.initialize.apply(this, arguments),
                this.listenTo(this, "change:flowType", this.onFlowTypeChange),
                this.onFlowTypeChange(this, this.get("flowType"))
          },
          onFlowTypeChange: function(a, b) {
              var c;
              switch (b) {
                  case "default":
                      c = {
                          ".marker-source": {
                              d: "M 0 5 L 20 5 M 20 0 L 10 10",
                              fill: "none"
                          }
                      };
                      break;
                  case "conditional":
                      c = {
                          ".marker-source": {
                              d: "M 20 8 L 10 0 L 0 8 L 10 16 z",
                              fill: "#FFF"
                          }
                      };
                      break;
                  case "normal":
                      c = {};
                      break;
                  case "message":
                      c = {
                          ".marker-target": {
                              fill: "#FFF"
                          },
                          ".connection": {
                              "stroke-dasharray": "4,4"
                          }
                      };
                      break;
                  case "association":
                      c = {
                          ".marker-target": {
                              d: "M 0 0"
                          },
                          ".connection": {
                              "stroke-dasharray": "4,4"
                          }
                      };
                      break;
                  case "conversation":
                      c = {
                          ".marker-target": {
                              d: "M 0 0"
                          },
                          ".connection": {
                              "stroke-width": "7px"
                          },
                          ".connection-wrap": {
                              style: "stroke: #fff; stroke-width: 5px; opacity: 1;",
                              onMouseOver: "var s=this.style;s.stroke='#000';s.strokeWidth=15;s.opacity=.4",
                              onMouseOut: "var s=this.style;s.stroke='#fff';s.strokeWidth=5;s.opacity=1"
                          }
                      };
                      break;
                  default:
                      throw "BPMN: Unknown Flow Type: " + b
              }
              a.attr(joint.util.merge({}, this.defaults.attrs, c))
          }
      });



    joint.dia.CommandManager = Backbone.Model.extend({
        defaults: {
            cmdBeforeAdd: null,
            cmdNameRegex: /^(?:add|remove|change:\w+)$/,
            applyOptionsList: ["propertyPath"],
            revertOptionsList: ["propertyPath"]
        },
        PREFIX_LENGTH: 7,
        initialize: function(a) {
            joint.util.bindAll(this, "initBatchCommand", "storeBatchCommand"),
              this.graph = a.graph,
              this.reset(),
              this.listen()
        },
        listen: function() {
            this.listenTo(this.graph, "all", this.addCommand, this),
              this.listenTo(this.graph, "batch:start", this.initBatchCommand, this),
              this.listenTo(this.graph, "batch:stop", this.storeBatchCommand, this)
        },
        createCommand: function(a) {
            var b = {
                action: void 0,
                data: {
                    id: void 0,
                    type: void 0,
                    previous: {},
                    next: {}
                },
                batch: a && a.batch
            };
            return b
        },
        push: function(a) {
            this.redoStack = [],
              a.batch ? (this.lastCmdIndex = Math.max(this.lastCmdIndex, 0),
                this.trigger("batch", a)) : (this.undoStack.push(a),
                this.trigger("add", a))
        },
        addCommand: function(a, b, c, d) {
            if ((!d || !d.dry) && this.get("cmdNameRegex").test(a) && ("function" != typeof this.get("cmdBeforeAdd") || this.get("cmdBeforeAdd").apply(this, arguments))) {
                var e = void 0
                  , f = b instanceof joint.dia.Graph;
                if (this.batchCommand) {
                    e = this.batchCommand[Math.max(this.lastCmdIndex, 0)];
                    var g = f && !e.graphChange || e.data.id !== b.id
                      , h = e.action !== a;
                    if (this.lastCmdIndex >= 0 && (g || h)) {
                        var i = this.batchCommand.findIndex(function(c, d) {
                            return (f && c.graphChange || c.data.id === b.id) && c.action === a
                        });
                        i < 0 || "add" === a || "remove" === a ? e = this.createCommand({
                            batch: !0
                        }) : (e = this.batchCommand[i],
                          this.batchCommand.splice(i, 1)),
                          this.lastCmdIndex = this.batchCommand.push(e) - 1
                    }
                } else
                    e = this.createCommand({
                        batch: !1
                    });
                if ("add" === a || "remove" === a)
                    return e.action = a,
                      e.data.id = b.id,
                      e.data.type = b.attributes.type,
                      e.data.attributes = joint.util.merge({}, b.toJSON()),
                      e.options = d || {},
                      void this.push(e);
                var j = a.substr(this.PREFIX_LENGTH);
                e.batch && e.action || (e.action = a,
                  e.data.previous[j] = joint.util.clone(b.previous(j)),
                  e.options = d || {},
                  f ? e.graphChange = !0 : (e.data.id = b.id,
                    e.data.type = b.attributes.type)),
                  e.data.next[j] = joint.util.clone(b.get(j)),
                  this.push(e)
            }
        },
        initBatchCommand: function() {
            this.batchCommand ? this.batchLevel++ : (this.batchCommand = [this.createCommand({
                batch: !0
            })],
              this.lastCmdIndex = -1,
              this.batchLevel = 0)
        },
        storeBatchCommand: function() {
            if (this.batchCommand && this.batchLevel <= 0) {
                var a = this.filterBatchCommand(this.batchCommand);
                a.length > 0 && (this.redoStack = [],
                  this.undoStack.push(a),
                  this.trigger("add", a)),
                  this.batchCommand = null,
                  this.lastCmdIndex = null,
                  this.batchLevel = null
            } else
                this.batchCommand && this.batchLevel > 0 && this.batchLevel--
        },
        filterBatchCommand: function(a) {
            for (var b = a.slice(), c = []; b.length > 0; ) {
                var d = b.shift()
                  , e = d.data.id;
                if (null != d.action && (null != e || d.graphChange)) {
                    if ("add" === d.action) {
                        var f = b.findIndex(function(a) {
                            return "remove" === a.action && a.data && a.data.id === e
                        });
                        if (f >= 0) {
                            b = b.filter(function(a, b) {
                                return b > f || a.data.id !== e
                            });
                            continue
                        }
                    } else if ("remove" === d.action) {
                        var g = b.findIndex(function(a) {
                            return "add" === a.action && a.data && a.data.id == e
                        });
                        if (g >= 0) {
                            b.splice(g, 1);
                            continue
                        }
                    } else if (0 === d.action.indexOf("change") && joint.util.isEqual(d.data.previous, d.data.next))
                        continue;
                    c.push(d)
                }
            }
            return c
        },
        revertCommand: function(a, b) {
            this.stopListening();
            var c;
            c = Array.isArray(a) ? this.constructor.sortBatchCommands(a) : [a];
            for (var d = this.graph, e = c.length - 1; e >= 0; e--) {
                var f = c[e]
                  , g = f.graphChange ? d : d.getCell(f.data.id)
                  , h = joint.util.assign({
                    commandManager: this.id || this.cid
                }, b, joint.util.pick(f.options, this.get("revertOptionsList")));
                switch (f.action) {
                    case "add":
                        g.remove(h);
                        break;
                    case "remove":
                        d.addCell(f.data.attributes, h);
                        break;
                    default:
                        var i = f.action.substr(this.PREFIX_LENGTH);
                        g.set(i, f.data.previous[i], h)
                }
            }
            this.listen()
        },
        applyCommand: function(a, b) {
            this.stopListening();
            var c;
            c = Array.isArray(a) ? this.constructor.sortBatchCommands(a) : [a];
            for (var d = this.graph, e = 0; e < c.length; e++) {
                var f = c[e]
                  , g = f.graphChange ? d : d.getCell(f.data.id)
                  , h = joint.util.assign({
                    commandManager: this.id || this.cid
                }, b, joint.util.pick(f.options, this.get("applyOptionsList")));
                switch (f.action) {
                    case "add":
                        d.addCell(f.data.attributes, h);
                        break;
                    case "remove":
                        g.remove(h);
                        break;
                    default:
                        var i = f.action.substr(this.PREFIX_LENGTH);
                        g.set(i, f.data.next[i], h)
                }
            }
            this.listen()
        },
        undo: function(a) {
            var b = this.undoStack.pop();
            b && (this.revertCommand(b, a),
              this.redoStack.push(b))
        },
        redo: function(a) {
            var b = this.redoStack.pop();
            b && (this.applyCommand(b, a),
              this.undoStack.push(b))
        },
        cancel: function(a) {
            this.hasUndo() && (this.revertCommand(this.undoStack.pop(), a),
              this.redoStack = [])
        },
        reset: function() {
            this.undoStack = [],
              this.redoStack = []
        },
        hasUndo: function() {
            return this.undoStack.length > 0
        },
        hasRedo: function() {
            return this.redoStack.length > 0
        }
    }, {
        sortBatchCommands: function(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c]
                  , e = null;
                if ("add" === d.action)
                    for (var f = d.data.id, g = 0; g < c; g++)
                        if (a[g].data.id === f) {
                            e = g - 1;
                            break
                        }
                null !== e ? b.splice(e, 0, d) : b.push(d)
            }
            return b
        }
    });




    joint.dia.Validator = Backbone.Model.extend({
        initialize: function(a) {
            this._map = {},
              this._commandManager = a.commandManager,
              this.listenTo(this._commandManager, "add", this._onCommand)
        },
        defaults: {
            cancelInvalid: !0
        },
        _onCommand: function(a) {
            return Array.isArray(a) ? a.find(function(a) {
                return !this._validateCommand(a)
            }, this) : this._validateCommand(a)
        },
        _validateCommand: function(a) {
            if (a.options && a.options.validation === !1)
                return !0;
            var b;
            return joint.util.toArray(this._map[a.action]).forEach(function(c) {
                function d(f) {
                    var g = c[e++];
                    try {
                        if (!g)
                            return void (b = f);
                        g(f, a, d)
                    } catch (f) {
                        d(f)
                    }
                }
                var e = 0;
                d(b)
            }),
            !b || (this.get("cancelInvalid") && this._commandManager.cancel(),
              this.trigger("invalid", b),
              !1)
        },
        validate: function(a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return b.forEach(function(b) {
                if (!joint.util.isFunction(b))
                    throw new Error(a + " requires callback functions.")
            }),
              a.split(" ").forEach(function(a) {
                  (this._map[a] = this._map[a] || []).push(b)
              }, this),
              this
        }
    });
    joint.dia.Graph.prototype.constructTree = function(a, b, c, d) {
        d = d || [];
        var e = joint.util.isFunction(b.children) ? b.children(a) : a[b.children || "children"];
        return c || (c = b.makeElement(a),
          d.push(c)),
          joint.util.toArray(e).forEach(function(a) {
              var e = b.makeElement(a)
                , f = b.makeLink(c, e);
              d.push(e, f),
                this.constructTree(a, b, e, d)
          }, this),
          d
    }
      ,
      joint.dia.Graph.prototype.shortestPath = function(a, b, c) {
          c = c || {};
          var d = {};
          this.getLinks().forEach(function(a) {
              var b = a.get("source").id
                , e = a.get("target").id;
              d[b] || (d[b] = []),
              d[e] || (d[e] = []),
                d[b].push(e),
              c.directed || d[e].push(b)
          });
          var e = joint.alg.Dijkstra(d, a.id || a, c.weight)
            , f = []
            , g = b.id || b;
          for (e[g] && f.push(g); g = e[g]; )
              f.unshift(g);
          return f
      }
    ;
    joint.ui.PaperScroller = joint.mvc.View.extend({
        className: "paper-scroller",
        options: {
            paper: void 0,
            padding: function() {
                var a = this.getClientSize()
                  , b = Math.max(this.options.minVisiblePaperSize, 1) || 1
                  , c = {};
                return c.left = c.right = Math.max(a.width - b, 0),
                  c.top = c.bottom = Math.max(a.height - b, 0),
                  c
            },
            minVisiblePaperSize: 50,
            autoResizePaper: !1,
            baseWidth: void 0,
            baseHeight: void 0,
            contentOptions: void 0,
            cursor: "default"
        },
        _padding: {
            left: 0,
            top: 0
        },
        init: function() {
            joint.util.bindAll(this, "startPanning", "stopPanning", "pan", "onBackgroundEvent");
            var a = this.options.paper
              , b = a.scale();
            this._sx = b.sx,
              this._sy = b.sy,
            void 0 === this.options.baseWidth && (this.options.baseWidth = a.options.width),
            void 0 === this.options.baseHeight && (this.options.baseHeight = a.options.height),
              this.$background = $("<div/>").addClass("paper-scroller-background").css({
                  width: a.options.width,
                  height: a.options.height
              }).append(a.el).appendTo(this.el),
              this.listenTo(a, "scale", this.onScale).listenTo(a, "resize", this.onResize).listenTo(a, "beforeprint beforeexport", this.storeScrollPosition).listenTo(a, "afterprint afterexport", this.restoreScrollPosition),
            this.options.autoResizePaper && (this.listenTo(a.model, "change add remove reset", this.adjustPaper),
            a.options.async && this.listenTo(a, "render:done", this.adjustPaper)),
              this.delegateBackgroundEvents(),
              this.setCursor(this.options.cursor)
        },
        lock: function() {
            return this.$el.css("overflow", "hidden"),
              this
        },
        unlock: function() {
            return this.$el.css("overflow", "scroll"),
              this
        },
        setCursor: function(a) {
            switch (a) {
                case "grab":
                    this.$el.css("cursor", "");
                    break;
                default:
                    this.$el.css("cursor", a)
            }
            return this.$el.attr("data-cursor", a),
              this.options.cursor = a,
              this
        },
        delegateBackgroundEvents: function(a) {
            function b(b, c) {
                var d = a[c];
                return c.indexOf(" ") === -1 && (b[c] = joint.util.isFunction(d) ? d : this.options.paper[d]),
                  b
            }
            function c(a) {
                this.delegate(a, {
                    guarded: !1
                }, this.onBackgroundEvent)
            }
            a || (a = joint.util.result(this.options.paper, "events"));
            var d = this.paperEvents = Object.keys(a || {}).reduce(b.bind(this), {});
            return Object.keys(d).forEach(c, this),
              this
        },
        onBackgroundEvent: function(a) {
            if (this.$background.is(a.target)) {
                var b = this.paperEvents[a.type];
                joint.util.isFunction(b) && b.apply(this.options.paper, arguments)
            }
        },
        onResize: function() {
            this._center && this.center(this._center.x, this._center.y)
        },
        onScale: function(a, b, c, d) {
            this.adjustScale(a, b),
              this._sx = a,
              this._sy = b,
            (c || d) && this.center(c, d)
        },
        storeScrollPosition: function() {
            this._scrollLeftBeforePrint = this.el.scrollLeft,
              this._scrollTopBeforePrint = this.el.scrollTop
        },
        restoreScrollPosition: function() {
            this.el.scrollLeft = this._scrollLeftBeforePrint,
              this.el.scrollTop = this._scrollTopBeforePrint,
              this._scrollLeftBeforePrint = null,
              this._scrollTopBeforePrint = null
        },
        beforePaperManipulation: function() {
            (joint.env.test("msie") || joint.env.test("msedge")) && this.$el.css("visibility", "hidden")
        },
        afterPaperManipulation: function() {
            (joint.env.test("msie") || joint.env.test("msedge")) && this.$el.css("visibility", "visible")
        },
        clientToLocalPoint: function(a, b) {
            var c = this.options.paper.matrix();
            return a += this.el.scrollLeft - this._padding.left - c.e,
              a /= c.a,
              b += this.el.scrollTop - this._padding.top - c.f,
              b /= c.d,
              new g.Point(a,b)
        },
        localToBackgroundPoint: function(a, b) {
            var c = new g.Point(a,b)
              , d = this.options.paper.matrix()
              , e = this._padding;
            return V.transformPoint(c, d).offset(e.left, e.top)
        },
        adjustPaper: function() {
            var a = this.getClientSize();
            this._center = this.clientToLocalPoint(a.width / 2, a.height / 2);
            var b = joint.util.assign({
                gridWidth: this.options.baseWidth,
                gridHeight: this.options.baseHeight,
                allowNewOrigin: "negative"
            }, this.options.contentOptions);
            return this.options.paper.fitToContent(this.transformContentOptions(b)),
              this
        },
        adjustScale: function(a, b) {
            var c = this.options.paper.options
              , d = a / this._sx
              , e = b / this._sy;
            this.options.paper.setOrigin(c.origin.x * d, c.origin.y * e),
              this.options.paper.setDimensions(c.width * d, c.height * e)
        },
        transformContentOptions: function(a) {
            var b = this._sx
              , c = this._sy;
            return a.gridWidth && (a.gridWidth *= b),
            a.gridHeight && (a.gridHeight *= c),
            a.minWidth && (a.minWidth *= b),
            a.minHeight && (a.minHeight *= c),
              joint.util.isObject(a.padding) ? a.padding = {
                  left: (a.padding.left || 0) * b,
                  right: (a.padding.right || 0) * b,
                  top: (a.padding.top || 0) * c,
                  bottom: (a.padding.bottom || 0) * c
              } : joint.util.isNumber(a.padding) && (a.padding = a.padding * b),
              a
        },
        center: function(a, b, c) {
            var d, e = this.options.paper.matrix(), f = -e.e, g = -e.f, h = f + this.options.paper.options.width, i = g + this.options.paper.options.height, j = joint.util.isNumber(a), k = joint.util.isNumber(b);
            if (j || k) {
                d = c;
                var l = this.getVisibleArea().center();
                j ? a *= e.a : a = l.x,
                  k ? b *= e.d : b = l.y
            } else
                d = a,
                  a = (f + h) / 2,
                  b = (g + i) / 2;
            var m = this.getClientSize()
              , n = this.getPadding()
              , o = m.width / 2
              , p = m.height / 2
              , q = o - n.left - a + f
              , r = o - n.right + a - h
              , s = p - n.top - b + g
              , t = p - n.bottom + b - i;
            return this.addPadding(Math.max(q, 0), Math.max(r, 0), Math.max(s, 0), Math.max(t, 0)),
              this.scroll(a, b, d),
              this
        },
        centerContent: function(a) {
            return this.positionContent("center", a)
        },
        centerElement: function(a, b) {
            return this.checkElement(a, "centerElement"),
              this.positionElement(a, "center", b)
        },
        positionContent: function(a, b) {
            var c = this.options.paper.getContentArea();
            return this.positionRect(c, a, b)
        },
        positionElement: function(a, b, c) {
            this.checkElement(a, "positionElement");
            var d = a.getBBox();
            return this.positionRect(d, b, c)
        },
        positionRect: function(a, b, c) {
            var d;
            switch (b) {
                case "center":
                    return d = a.center(),
                      this.positionPoint(d, "50%", "50%", c);
                case "top":
                    return d = a.topMiddle(),
                      this.positionPoint(d, "50%", 0, c);
                case "top-right":
                    return d = a.topRight(),
                      this.positionPoint(d, "100%", 0, c);
                case "right":
                    return d = a.rightMiddle(),
                      this.positionPoint(d, "100%", "50%", c);
                case "bottom-right":
                    return d = a.bottomRight(),
                      this.positionPoint(d, "100%", "100%", c);
                case "bottom":
                    return d = a.bottomMiddle(),
                      this.positionPoint(d, "50%", "100%", c);
                case "bottom-left":
                    return d = a.bottomLeft(),
                      this.positionPoint(d, 0, "100%", c);
                case "left":
                    return d = a.leftMiddle(),
                      this.positionPoint(d, 0, "50%", c);
                case "top-left":
                    return d = a.topLeft(),
                      this.positionPoint(d, 0, 0, c);
                default:
                    throw new Error("Provided positionName ('" + b + "') was not recognized.")
            }
        },
        positionPoint: function(a, b, c, d) {
            d = d || {};
            var e = joint.util.normalizeSides(d.padding)
              , f = new g.Rect(this.getClientSize())
              , h = f.clone().moveAndExpand({
                x: e.left,
                y: e.top,
                width: -e.right - e.left,
                height: -e.top - e.bottom
            })
              , i = joint.util.isPercentage(b);
            b = parseFloat(b),
            i && (b = b / 100 * Math.max(0, h.width)),
            b < 0 && (b = h.width + b);
            var j = joint.util.isPercentage(c);
            c = parseFloat(c),
            j && (c = c / 100 * Math.max(0, h.height)),
            c < 0 && (c = h.height + c);
            var k = h.origin().offset(b, c)
              , l = f.center()
              , m = l.difference(k)
              , n = this.zoom()
              , o = m.scale(1 / n, 1 / n)
              , p = a.clone().offset(o);
            return this.center(p.x, p.y, d)
        },
        scroll: function(a, b, c) {
            var d = this.options.paper.matrix()
              , e = this.getClientSize()
              , f = {};
            if (joint.util.isNumber(a)) {
                var g = e.width / 2;
                f.scrollLeft = a - g + d.e + (this._padding.left || 0)
            }
            if (joint.util.isNumber(b)) {
                var h = e.height / 2;
                f.scrollTop = b - h + d.f + (this._padding.top || 0)
            }
            c && c.animation ? this.$el.animate(f, c.animation) : this.$el.prop(f)
        },
        scrollToContent: function(a) {
            var b = this.options.paper.getContentArea().center()
              , c = this._sx
              , d = this._sy;
            return b.x *= c,
              b.y *= d,
              this.scroll(b.x, b.y, a)
        },
        scrollToElement: function(a, b) {
            this.checkElement(a, "scrollToElement");
            var c = a.getBBox().center()
              , d = this._sx
              , e = this._sy;
            return c.x *= d,
              c.y *= e,
              this.scroll(c.x, c.y, b)
        },
        addPadding: function(a, b, c, d) {
            var e = this.getPadding()
              , f = this._padding = {
                left: Math.round(e.left + (a || 0)),
                top: Math.round(e.top + (c || 0)),
                bottom: Math.round(e.bottom + (d || 0)),
                right: Math.round(e.right + (b || 0))
            };
            return this.$background.css({
                width: f.left + this.options.paper.options.width + f.right,
                height: f.top + this.options.paper.options.height + f.bottom
            }),
              this.options.paper.$el.css({
                  left: f.left,
                  top: f.top
              }),
              this
        },
        zoom: function(a, b) {
            if (void 0 === a)
                return this._sx;
            b = b || {};
            var c, d, e = this.getClientSize(), f = this.clientToLocalPoint(e.width / 2, e.height / 2), g = a, h = a;
            if (b.absolute || (g += this._sx,
                h += this._sy),
              b.grid && (g = Math.round(g / b.grid) * b.grid,
                h = Math.round(h / b.grid) * b.grid),
              b.max && (g = Math.min(b.max, g),
                h = Math.min(b.max, h)),
              b.min && (g = Math.max(b.min, g),
                h = Math.max(b.min, h)),
              void 0 === b.ox || void 0 === b.oy)
                c = f.x,
                  d = f.y;
            else {
                var i = g / this._sx
                  , j = h / this._sy;
                c = b.ox - (b.ox - f.x) / i,
                  d = b.oy - (b.oy - f.y) / j
            }
            return this.beforePaperManipulation(),
              this.options.paper.scale(g, h),
              this.center(c, d),
              this.afterPaperManipulation(),
              this
        },
        zoomToFit: function(a) {
            a = a || {};
            var b = this.options.paper
              , c = joint.util.assign({}, b.options.origin);
            return a.fittingBBox = a.fittingBBox || joint.util.assign({}, new g.Point(c), {
                  width: this.$el.width(),
                  height: this.$el.height()
              }),
              this.beforePaperManipulation(),
              b.scaleContentToFit(a),
              b.setOrigin(c.x, c.y),
              this.adjustPaper().centerContent(),
              this.afterPaperManipulation(),
              this
        },
        transitionClassName: "transition-in-progress",
        transitionEventName: "transitionend.paper-scroller-transition",
        transitionToPoint: function(a, b, c) {
            joint.util.isObject(a) && (c = b,
              b = a.y,
              a = a.x),
            c || (c = {});
            var d, e, f = this._sx, h = Math.max(c.scale || f, 1e-6), i = this.getClientSize(), j = new g.Point(a,b), k = this.clientToLocalPoint(i.width / 2, i.height / 2);
            if (f === h) {
                var l = k.difference(j).scale(f, f).round();
                d = "translate(" + l.x + "px," + l.y + "px)"
            } else {
                var m = h / (f - h) * j.distance(k)
                  , n = k.clone().move(j, m)
                  , o = this.localToBackgroundPoint(n).round();
                d = "scale(" + h / f + ")",
                  e = o.x + "px " + o.y + "px"
            }
            return this.$el.addClass(this.transitionClassName),
              this.$background.off(this.transitionEventName).on(this.transitionEventName, function(a) {
                  var b = this.paperScroller;
                  b.syncTransition(this.scale, {
                      x: this.x,
                      y: this.y
                  });
                  var c = this.onTransitionEnd;
                  joint.util.isFunction(c) && c.call(b, a)
              }
                .bind({
                    paperScroller: this,
                    scale: h,
                    x: a,
                    y: b,
                    onTransitionEnd: c.onTransitionEnd
                })).css({
                  transition: "transform",
                  transitionDuration: c.duration || "1s",
                  transitionDelay: c.delay,
                  transitionTimingFunction: c.timingFunction,
                  transformOrigin: e,
                  transform: d
              }),
              this
        },
        syncTransition: function(a, b) {
            return this.beforePaperManipulation(),
              this.options.paper.scale(a),
              this.removeTransition().center(b.x, b.y),
              this.afterPaperManipulation(),
              this
        },
        removeTransition: function() {
            return this.$el.removeClass(this.transitionClassName),
              this.$background.off(this.transitionEventName).css({
                  transition: "",
                  transitionDuration: "",
                  transitionDelay: "",
                  transitionTimingFunction: "",
                  transform: "",
                  transformOrigin: ""
              }),
              this
        },
        transitionToRect: function(a, b) {
            a = new g.Rect(a),
            b || (b = {});
            var c = b.maxScale || 1 / 0
              , d = b.minScale || Number.MIN_VALUE
              , e = b.scaleGrid || null
              , f = b.visibility || 1
              , h = b.center ? new g.Point(b.center) : a.center()
              , i = this.getClientSize()
              , j = i.width * f
              , k = i.height * f
              , l = new g.Rect({
                x: h.x - j / 2,
                y: h.y - k / 2,
                width: j,
                height: k
            })
              , m = l.maxRectUniformScaleToFit(a, h);
            return m = Math.min(m, c),
            e && (m = Math.floor(m / e) * e),
              m = Math.max(d, m),
              this.transitionToPoint(h, joint.util.defaults({
                  scale: m
              }, b))
        },
        startPanning: function(a) {
            a = joint.util.normalizeEvent(a),
              this._clientX = a.clientX,
              this._clientY = a.clientY,
              this.$el.addClass("is-panning"),
              this.trigger("pan:start", a),
              $(document.body).on({
                  "mousemove.panning touchmove.panning": this.pan,
                  "mouseup.panning touchend.panning": this.stopPanning
              }),
              $(window).on("mouseup.panning", this.stopPanning)
        },
        pan: function(a) {
            a = joint.util.normalizeEvent(a);
            var b = a.clientX - this._clientX
              , c = a.clientY - this._clientY;
            this.el.scrollTop -= c,
              this.el.scrollLeft -= b,
              this._clientX = a.clientX,
              this._clientY = a.clientY
        },
        stopPanning: function(a) {
            $(document.body).off(".panning"),
              $(window).off(".panning"),
              this.$el.removeClass("is-panning"),
              this.trigger("pan:stop", a)
        },
        getClientSize: function() {
            return {
                width: this.el.clientWidth,
                height: this.el.clientHeight
            }
        },
        getPadding: function() {
            var a = this.options.padding;
            return joint.util.isFunction(a) && (a = a.call(this)),
              joint.util.normalizeSides(a)
        },
        getVisibleArea: function() {
            var a = this.options.paper.matrix()
              , b = this.getClientSize()
              , c = {
                x: this.el.scrollLeft || 0,
                y: this.el.scrollTop || 0,
                width: b.width,
                height: b.height
            }
              , d = V.transformRect(c, a.inverse());
            return d.x -= (this._padding.left || 0) / this._sx,
              d.y -= (this._padding.top || 0) / this._sy,
              new g.Rect(d)
        },
        isElementVisible: function(a, b) {
            this.checkElement(a, "isElementVisible"),
              b = b || {};
            var c = b.strict ? "containsRect" : "intersect";
            return !!this.getVisibleArea()[c](a.getBBox())
        },
        isPointVisible: function(a) {
            return this.getVisibleArea().containsPoint(a)
        },
        checkElement: function(a, b) {
            if (!(a && a instanceof joint.dia.Element))
                throw new TypeError("ui.PaperScroller." + b + "() accepts instance of joint.dia.Element only")
        },
        onRemove: function() {
            this.stopPanning()
        }
    }),
      joint.env.addTest("msie", function() {
          var a = window.navigator.userAgent;
          return a.indexOf("MSIE") !== -1 || a.indexOf("Trident") !== -1
      }),
      joint.env.addTest("msedge", function() {
          return /Edge\/\d+/.test(window.navigator.userAgent)
      });
    joint.ui.Selection = joint.mvc.View.extend({
        options: {
            paper: void 0,
            graph: void 0,
            boxContent: function(a) {
                return joint.util.template("<%= length %> elements selected.")({
                    length: this.model.length
                })
            },
            handles: [{
                name: "remove",
                position: "nw",
                events: {
                    pointerdown: "removeElements"
                }
            }, {
                name: "rotate",
                position: "sw",
                events: {
                    pointerdown: "startRotating",
                    pointermove: "doRotate",
                    pointerup: "stopBatch"
                }
            }, {
                name: "resize",
                position: "se",
                events: {
                    pointerdown: "startResizing",
                    pointermove: "doResize",
                    pointerup: "stopBatch"
                }
            }],
            useModelGeometry: !1,
            strictSelection: !1,
            rotateAngleGrid: 15,
            allowTranslate: !0
        },
        className: "selection",
        events: {
            "mousedown .selection-box": "onSelectionBoxPointerDown",
            "touchstart .selection-box": "onSelectionBoxPointerDown",
            "mousedown .handle": "onHandlePointerDown",
            "touchstart .handle": "onHandlePointerDown"
        },
        init: function() {
            this.options.model && (this.options.collection = this.options.model);
            var a = this.collection = this.options.collection || this.collection || new Backbone.Collection;
            if (a.comparator || (a.comparator = this.constructor.depthComparator,
                a.sort()),
                this.model = a,
                !this.options.paper)
                throw new Error("Selection: paper required");
            joint.util.defaults(this.options, {
                graph: this.options.paper.model
            }),
              joint.util.bindAll(this, "startSelecting", "stopSelecting", "adjustSelection", "pointerup"),
              $(document.body).on("mousemove.selection touchmove.selection", this.adjustSelection),
              $(document).on("mouseup.selection touchend.selection", this.pointerup);
            var b = this.options.paper
              , c = this.options.graph;
            this.listenTo(c, "reset", this.cancelSelection),
              this.listenTo(b, "scale translate", this.updateSelectionBoxes),
              this.listenTo(c, "remove change", function(a, b) {
                  b.selection !== this.cid && this.updateSelectionBoxes()
              }),
              this.listenTo(a, "remove", this.onRemoveElement),
              this.listenTo(a, "reset", this.onResetElements),
              this.listenTo(a, "add", this.onAddElement),
              b.$el.append(this.$el),
              this._boxCount = 0,
              this.$selectionWrapper = this.createSelectionWrapper(),
              this.handles = [],
              joint.util.toArray(this.options.handles).forEach(this.addHandle, this)
        },
        cancelSelection: function() {
            this.model.reset([], {
                ui: !0
            })
        },
        addHandle: function(a) {
            this.handles.push(a);
            var b = $("<div/>", {
                "class": "handle " + (a.position || "") + " " + (a.name || ""),
                "data-action": a.name
            });
            return a.icon && b.css("background-image", "url(" + a.icon + ")"),
              b.html(a.content || ""),
              joint.util.setAttributesBySelector(b, a.attrs),
              this.$selectionWrapper.append(b),
              joint.util.forIn(a.events, function(b, c) {
                  joint.util.isString(b) ? this.on("action:" + a.name + ":" + c, this[b], this) : this.on("action:" + a.name + ":" + c, b)
              }
                .bind(this)),
              this
        },
        stopSelecting: function(a) {
            var b, c = this.options.paper;
            switch (this._action) {
                case "selecting":
                    var d = this.$el.offset()
                      , e = this.$el.width()
                      , f = this.$el.height();
                    b = c.pageToLocalPoint(d.left, d.top);
                    var h = c.scale();
                    e /= h.sx,
                      f /= h.sy;
                    var i = g.rect(b.x, b.y, e, f)
                      , j = this.getElementsInSelectedArea(i)
                      , k = this.options.filter;
                    Array.isArray(k) ? j = j.filter(function(a) {
                        return !k.includes(a.model) && !k.includes(a.model.get("type"))
                    }) : joint.util.isFunction(k) && (j = j.filter(function(a) {
                        return !k(a.model)
                    }));
                    var l = j.map(function(a) {
                        return a.model
                    });
                    this.model.reset(l, {
                        ui: !0
                    });
                    break;
                case "translating":
                    this.options.graph.stopBatch("selection-translate"),
                      b = c.snapToGrid({
                          x: a.clientX,
                          y: a.clientY
                      }),
                      this.notify("selection-box:pointerup", a, b.x, b.y);
                    break;
                default:
                    this._action || this.cancelSelection()
            }
            this._action = null
        },
        removeHandle: function(a) {
            var b = joint.util.toArray(this.handles).findIndex(function(b) {
                return b.name === a
            })
              , c = this.handles[b];
            return c && (joint.util.forIn(c.events, function(b, c) {
                this.off("action:" + a + ":" + c)
            }
              .bind(this)),
              this.$(".handle." + a).remove(),
              this.handles.splice(b, 1)),
              this
        },
        startSelecting: function(a) {
            a = joint.util.normalizeEvent(a),
              this.cancelSelection();
            var b, c, d = this.options.paper.el;
            if (null != a.offsetX && null != a.offsetY && $.contains(d, a.target))
                b = a.offsetX,
                  c = a.offsetY;
            else {
                var e = $(d).offset()
                  , f = d.scrollLeft
                  , g = d.scrollTop;
                b = a.clientX - e.left + window.pageXOffset + f,
                  c = a.clientY - e.top + window.pageYOffset + g
            }
            this.$el.css({
                width: 1,
                height: 1,
                left: b,
                top: c
            }),
              this.showLasso(),
              this._action = "selecting",
              this._clientX = a.clientX,
              this._clientY = a.clientY,
              this._offsetX = b,
              this._offsetY = c
        },
        changeHandle: function(a, b) {
            var c = joint.util.toArray(this.handles).find(function(b) {
                return b && b.name === a
            });
            return c && (this.removeHandle(a),
              this.addHandle(joint.util.merge({
                  name: a
              }, c, b))),
              this
        },
        onSelectionBoxPointerDown: function(a) {
            a.stopPropagation(),
              a = joint.util.normalizeEvent(a),
            this.options.allowTranslate && this.startTranslatingSelection(a),
              this._activeElementView = this.getCellView(a.target);
            var b = this.options.paper.snapToGrid({
                x: a.clientX,
                y: a.clientY
            });
            this.notify("selection-box:pointerdown", a, b.x, b.y)
        },
        startTranslatingSelection: function(a) {
            this._action = "translating",
              this.options.graph.startBatch("selection-translate");
            var b = this.options.paper.snapToGrid({
                x: a.clientX,
                y: a.clientY
            });
            this._snappedClientX = b.x,
              this._snappedClientY = b.y
        },
        adjustSelection: function(a) {
            a = joint.util.normalizeEvent(a);
            var b, c;
            switch (this._action) {
                case "selecting":
                    b = a.clientX - this._clientX,
                      c = a.clientY - this._clientY;
                    var d = parseInt(this.$el.css("left"), 10)
                      , e = parseInt(this.$el.css("top"), 10);
                    this.$el.css({
                        left: b < 0 ? this._offsetX + b : d,
                        top: c < 0 ? this._offsetY + c : e,
                        width: Math.abs(b),
                        height: Math.abs(c)
                    });
                    break;
                case "translating":
                    var f = this.options.paper.snapToGrid({
                        x: a.clientX,
                        y: a.clientY
                    })
                      , g = f.x
                      , h = f.y;
                    b = g - this._snappedClientX,
                      c = h - this._snappedClientY;
                    var i = this.options.paper.getRestrictedArea();
                    if (i) {
                        var j = this.model.toArray()
                          , k = this.options.graph.getCellsBBox(j)
                          , l = i.x - k.x
                          , m = i.y - k.y
                          , n = i.x + i.width - (k.x + k.width)
                          , o = i.y + i.height - (k.y + k.height);
                        b < l && (b = l),
                        c < m && (c = m),
                        b > n && (b = n),
                        c > o && (c = o)
                    }
                    if (b || c) {
                        if (this.translateSelectedElements(b, c),
                            this.boxesUpdated)
                            this.model.length > 1 && this.updateSelectionBoxes();
                        else {
                            var p = this.options.paper.scale();
                            this.$el.children(".selection-box").add(this.$selectionWrapper).css({
                                left: "+=" + b * p.sx,
                                top: "+=" + c * p.sy
                            })
                        }
                        this._snappedClientX = g,
                          this._snappedClientY = h
                    }
                    this.notify("selection-box:pointermove", a, g, h);
                    break;
                default:
                    this._action && this.pointermove(a)
            }
            this.boxesUpdated = !1
        },
        translateSelectedElements: function(a, b) {
            var c = {};
            this.model.each(function(d) {
                if (!c[d.id]) {
                    var e = {
                        selection: this.cid
                    };
                    d.translate(a, b, e),
                      d.getEmbeddedCells({
                          deep: !0
                      }).forEach(function(a) {
                          c[a.id] = !0
                      });
                    var f = this.options.graph.getConnectedLinks(d);
                    f.forEach(function(d) {
                        c[d.id] || (d.translate(a, b, e),
                          c[d.id] = !0)
                    })
                }
            }
              .bind(this))
        },
        notify: function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            this.trigger.apply(this, [a, this._activeElementView].concat(c))
        },
        getElementsInSelectedArea: function(a) {
            var b = this.options.paper
              , c = {
                strict: this.options.strictSelection
            };
            if (this.options.useModelGeometry) {
                var d = b.model.findModelsInArea(a, c);
                return d.map(b.findViewByModel, b).filter(function(a) {
                    return !!a
                })
            }
            return b.findViewsInArea(a, c)
        },
        pointerup: function(a) {
            this._action && (this.triggerAction(this._action, "pointerup", a),
              this.stopSelecting(a),
              this._activeElementView = null,
              this._action = null)
        },
        destroySelectionBox: function(a) {
            this.$('[data-model="' + a.get("id") + '"]').remove(),
            0 === this.$el.children(".selection-box").length && this.hide(),
              this._boxCount = Math.max(0, this._boxCount - 1)
        },
        hide: function() {
            this.$el.removeClass("lasso selected")
        },
        showSelected: function() {
            this.$el.addClass("selected")
        },
        showLasso: function() {
            this.$el.addClass("lasso")
        },
        destroyAllSelectionBoxes: function() {
            this.hide(),
              this.$el.children(".selection-box").remove(),
              this._boxCount = 0
        },
        createSelectionBox: function(a) {
            var b = a.findView(this.options.paper);
            if (b) {
                var c = b.getBBox({
                    useModelGeometry: this.options.useModelGeometry
                });
                $("<div/>").addClass("selection-box").attr("data-model", a.get("id")).css({
                    left: c.x,
                    top: c.y,
                    width: c.width,
                    height: c.height
                }).appendTo(this.el),
                  this.showSelected(),
                  this._boxCount++
            }
        },
        createSelectionWrapper: function() {
            var a = $("<div/>", {
                "class": "selection-wrapper"
            })
              , b = $("<div/>", {
                "class": "box"
            });
            return a.append(b),
              a.attr("data-selection-length", this.model.length),
              this.$el.prepend(a),
              a
        },
        updateSelectionWrapper: function() {
            var a = {
                x: 1 / 0,
                y: 1 / 0
            }
              , b = {
                x: 0,
                y: 0
            };
            if (this.model.each(function(c) {
                  var d = this.options.paper.findViewByModel(c);
                  if (d) {
                      var e = d.getBBox({
                          useModelGeometry: this.options.useModelGeometry
                      });
                      a.x = Math.min(a.x, e.x),
                        a.y = Math.min(a.y, e.y),
                        b.x = Math.max(b.x, e.x + e.width),
                        b.y = Math.max(b.y, e.y + e.height)
                  }
              }
                .bind(this)),
                this.$selectionWrapper.css({
                    left: a.x,
                    top: a.y,
                    width: b.x - a.x,
                    height: b.y - a.y
                }).attr("data-selection-length", this.model.length),
                joint.util.isFunction(this.options.boxContent)) {
                var c = this.$(".box")
                  , d = this.options.boxContent.call(this, c[0]);
                d && c.html(d)
            }
        },
        updateSelectionBoxes: function() {
            if (this._boxCount) {
                this.hide();
                for (var a = this.$el.children(".selection-box"), b = 0, c = a.length; b < c; b++) {
                    var d = a[b]
                      , e = $(d).remove().attr("data-model")
                      , f = this.model.get(e);
                    f && this.createSelectionBox(f)
                }
                this.updateSelectionWrapper(),
                  this.boxesUpdated = !0
            }
        },
        onRemove: function() {
            $(document.body).off(".selection", this.adjustSelection),
              $(document).off(".selection", this.pointerup)
        },
        onHandlePointerDown: function(a) {
            this._action = $(a.target).closest(".handle").attr("data-action"),
            this._action && (a.preventDefault(),
              a.stopPropagation(),
              a = joint.util.normalizeEvent(a),
              this._clientX = a.clientX,
              this._clientY = a.clientY,
              this._startClientX = this._clientX,
              this._startClientY = this._clientY,
              this.triggerAction(this._action, "pointerdown", a))
        },
        getCellView: function(a) {
            var b = this.model.get(a.getAttribute("data-model"));
            return b && b.findView(this.options.paper)
        },
        pointermove: function(a) {
            if (this._action) {
                var b = this.options.paper.snapToGrid({
                    x: a.clientX,
                    y: a.clientY
                })
                  , c = this.options.paper.snapToGrid({
                    x: this._clientX,
                    y: this._clientY
                })
                  , d = b.x - c.x
                  , e = b.y - c.y;
                this.triggerAction(this._action, "pointermove", a, d, e, a.clientX - this._startClientX, a.clientY - this._startClientY),
                  this._clientX = a.clientX,
                  this._clientY = a.clientY
            }
        },
        triggerAction: function(a, b, c) {
            var d = Array.prototype.slice.call(arguments, 2);
            d.unshift("action:" + a + ":" + b),
              this.trigger.apply(this, d)
        },
        onRemoveElement: function(a) {
            this.destroySelectionBox(a),
              this.updateSelectionWrapper()
        },
        onResetElements: function(a) {
            this.destroyAllSelectionBoxes(),
              a.each(this.createSelectionBox.bind(this)),
              this.updateSelectionWrapper()
        },
        onAddElement: function(a) {
            this.createSelectionBox(a),
              this.updateSelectionWrapper()
        },
        removeElements: function(a) {
            var b = this.collection.toArray();
            this.cancelSelection(),
              this.options.graph.removeCells(b, {
                  selection: this.cid
              })
        },
        startRotating: function(a) {
            this.options.graph.trigger("batch:start");
            var b = this.options.graph.getBBox(this.model.models).center()
              , c = this.options.paper.snapToGrid({
                x: a.clientX,
                y: a.clientY
            })
              , d = this.model.toArray().reduce(function(a, b) {
                return a[b.id] = g.normalizeAngle(b.get("angle") || 0),
                  a
            }, {});
            this._rotation = {
                center: b,
                clientAngle: g.point(c).theta(b),
                initialAngles: d
            }
        },
        startResizing: function(a) {
            var b = this.options.paper
              , c = this.options.graph
              , d = b.options.gridSize
              , e = this.model.toArray()
              , f = c.getBBox(e)
              , g = joint.util.invoke(e, "getBBox")
              , h = g.reduce(function(a, b) {
                return b.width < a ? b.width : a
            }, 1 / 0)
              , i = g.reduce(function(a, b) {
                return b.height < a ? b.height : a
            }, 1 / 0);
            this._resize = {
                cells: c.getSubgraph(e),
                bbox: f,
                minWidth: d * f.width / h,
                minHeight: d * f.height / i
            },
              c.trigger("batch:start")
        },
        doResize: function(a, b, c) {
            var d = this._resize
              , e = d.bbox
              , f = e.width
              , g = e.height
              , h = Math.max(f + b, d.minWidth)
              , i = Math.max(g + c, d.minHeight);
            (Math.abs(f - h) > .001 || Math.abs(g - i) > .001) && (this.options.graph.resizeCells(h, i, d.cells, {
                selection: this.cid
            }),
              e.width = h,
              e.height = i,
              this.updateSelectionBoxes())
        },
        doRotate: function(a) {
            var b = this._rotation
              , c = this.options.rotateAngleGrid
              , d = this.options.paper.snapToGrid({
                x: a.clientX,
                y: a.clientY
            })
              , e = b.clientAngle - g.point(d).theta(b.center);
            Math.abs(e) > .001 && (this.model.each(function(a) {
                var d = g.snapToGrid(b.initialAngles[a.id] + e, c);
                a.rotate(d, !0, b.center, {
                    selection: this.cid
                })
            }, this),
              this.updateSelectionBoxes())
        },
        stopBatch: function() {
            this.options.graph.trigger("batch:stop")
        },
        getAction: function() {
            return this._action
        }
    }, {
        depthComparator: function(a) {
            return a.getAncestors().length
        }
    }),
      joint.ui.SelectionView = joint.ui.Selection;
    joint.ui.Clipboard = Backbone.Collection.extend({
        LOCAL_STORAGE_KEY: "joint.ui.Clipboard.cells",
        defaults: {
            useLocalStorage: !0
        },
        copyElements: function(a, b, c) {
            this.options = joint.util.assign({}, this.defaults, c),
              c = this.options;
            var d = a.toArray()
              , e = joint.util.sortBy(b.cloneSubgraph(d, c), function(a) {
                return a.isLink() ? 2 : 1
            });
            return this.reset(e),
            c.useLocalStorage && window.localStorage && localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.toJSON())),
              d
        },
        cutElements: function(a, b, c) {
            var d = this.copyElements(a, b, c);
            return b.trigger("batch:start", {
                batchName: "cut"
            }),
              joint.util.invoke(d, "remove"),
              b.trigger("batch:stop", {
                  batchName: "cut"
              }),
              d
        },
        pasteCells: function(a, b) {
            if (b = joint.util.defaults(b || {}, this.options),
              b.useLocalStorage && this.isEmpty() && window.localStorage) {
                var c = {
                    cells: JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY))
                }
                  , d = (new joint.dia.Graph).fromJSON(c, {
                    sort: !1
                });
                this.reset(d.getCells())
            }
            var e = this.map(function(a) {
                return this.modifyCell(a, b)
            }
              .bind(this));
            return a.trigger("batch:start", {
                batchName: "paste"
            }),
              a.addCells(e),
              a.trigger("batch:stop", {
                  batchName: "paste"
              }),
              this.copyElements(this, a),
              e
        },
        clear: function() {
            this.options = {},
              this.reset([]),
            window.localStorage && localStorage.removeItem(this.LOCAL_STORAGE_KEY)
        },
        modifyCell: function(a, b) {
            return a.unset("z"),
            a.isLink() && b.link && a.set(b.link),
            b.translate && a.translate(b.translate.dx || 20, b.translate.dy || 20),
              a.collection = null,
              a
        }
    });

  /**
   * @name joint.ui.Halo
   * @desc 元素操作方法定义
   * @path /libs/plugin/halo.js
   */
    // !function(a) {
    //     "use strict";
    //     var b = function() {
    //         this.options = {
    //             handles: [{
    //                 name: "remove",
    //                 position: "nw",
    //                 events: {
    //                     pointerdown: "removeElement"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "direction",
    //                 position: "se",
    //                 events: {
    //                     pointerdown: "directionSwap"
    //                 },
    //                 icon: null
    //             }],
    //             bbox: function(a) {
    //                 var b = .5 * a.getConnectionLength();
    //                 return a.getPointAtLength(b)
    //             },
    //             typeCssName: "type-link",
    //             tinyThreshold: -1,
    //             smallThreshold: -1,
    //             boxContent: !1
    //         }
    //     };
    //     b.prototype.directionSwap = function() {
    //         var a = this.options.cellView.model;
    //         a.set({
    //             source: a.get("target"),
    //             target: a.get("source")
    //         }, {
    //             halo: this.cid
    //         })
    //     }
    //     ;
    //     var c = function() {
    //         this.options = {
    //             handles: [{
    //                 name: "remove",
    //                 position: "nw",
    //                 events: {
    //                     pointerdown: "removeElement"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "resize",
    //                 position: "se",
    //                 events: {
    //                     pointerdown: "startResizing",
    //                     pointermove: "doResize",
    //                     pointerup: "stopBatch"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "clone",
    //                 position: "n",
    //                 events: {
    //                     pointerdown: "startCloning",
    //                     pointermove: "doClone",
    //                     pointerup: "stopCloning"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "link",
    //                 position: "e",
    //                 events: {
    //                     pointerdown: "startLinking",
    //                     pointermove: "doLink",
    //                     pointerup: "stopLinking"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "fork",
    //                 position: "ne",
    //                 events: {
    //                     pointerdown: "startForking",
    //                     pointermove: "doFork",
    //                     pointerup: "stopForking"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "unlink",
    //                 position: "w",
    //                 events: {
    //                     pointerdown: "unlinkElement"
    //                 },
    //                 icon: null
    //             }, {
    //                 name: "rotate",
    //                 position: "sw",
    //                 events: {
    //                     pointerdown: "startRotating",
    //                     pointermove: "doRotate",
    //                     pointerup: "stopBatch"
    //                 },
    //                 icon: null
    //             }],
    //             bbox: function(a, b) {
    //                 return a.getBBox({
    //                     useModelGeometry: b.options.useModelGeometry
    //                 })
    //             },
    //             typeCssName: "type-element",
    //             tinyThreshold: 40,
    //             smallThreshold: 80,
    //             boxContent: function(b, c) {
    //                 var d = a.util.template("x: <%= x %>, y: <%= y %>, width: <%= width %>, height: <%= height %>, angle: <%= angle %>")
    //                   , e = b.model
    //                   , f = e.getBBox();
    //                 return d({
    //                     x: Math.floor(f.x),
    //                     y: Math.floor(f.y),
    //                     width: Math.floor(f.width),
    //                     height: Math.floor(f.height),
    //                     angle: Math.floor(e.get("angle") || 0)
    //                 })
    //             },
    //             magnet: function(a) {
    //                 return a.el
    //             },
    //             loopLinkPreferredSide: "top",
    //             loopLinkWidth: 40,
    //             rotateAngleGrid: 15,
    //             linkAttributes: {},
    //             smoothLinks: void 0
    //         }
    //     };
    //     c.prototype.startLinking = function(a, b, c) {
    //         this.startBatch();
    //         var d = this.options
    //           , e = d.paper
    //           , f = d.graph
    //           , g = this.createLinkConnectedToSource();
    //         g.set({
    //             target: {
    //                 x: b,
    //                 y: c
    //             }
    //         }).addTo(f, {
    //             validation: !1,
    //             halo: this.cid,
    //             async: !1
    //         });
    //         var h = this._linkView = g.findView(e);
    //         h.startArrowheadMove("target", {
    //             whenNotAllowed: "remove"
    //         })
    //     }
    //       ,
    //       c.prototype.startForking = function(b, c, d) {
    //           var e = this.options
    //             , f = e.paper
    //             , g = e.graph;
    //           this.startBatch();
    //           var h = e.clone(e.cellView.model, {
    //               fork: !0
    //           });
    //           if (!(h instanceof a.dia.Cell))
    //               throw new Error('ui.Halo: option "clone" has to return a cell.');
    //           this.centerElementAtCursor(h, c, d),
    //             h.addTo(g, {
    //                 halo: this.cid,
    //                 async: !1
    //             });
    //           var i = this.createLinkConnectedToSource()
    //             , j = this._cloneView = h.findView(f)
    //             , k = this.getElementMagnet(j, "target")
    //             , l = this.getLinkEnd(j, k);
    //           i.set("target", l).addTo(g, {
    //               halo: this.cid,
    //               async: !1
    //           }),
    //             j.pointerdown(b, c, d)
    //       }
    //       ,
    //       c.prototype.getElementMagnet = function(b, c) {
    //           var d = this.options.magnet;
    //           if (a.util.isFunction(d)) {
    //               var e = d.call(this, b, c);
    //               if (e instanceof SVGElement)
    //                   return e
    //           }
    //           throw new Error("ui.Halo: magnet() has to return an SVGElement.")
    //       }
    //       ,
    //       c.prototype.getLinkEnd = function(a, b) {
    //           var c = {
    //               id: a.model.id
    //           };
    //           if (b !== a.el) {
    //               var d = b.getAttribute("port");
    //               d ? c.port = d : c.selector = a.getSelector(b)
    //           }
    //           return c
    //       }
    //       ,
    //       c.prototype.createLinkConnectedToSource = function() {
    //           var b = this.options
    //             , c = b.paper
    //             , d = b.cellView
    //             , e = this.getElementMagnet(d, "source")
    //             , f = this.getLinkEnd(d, e)
    //             , g = c.getDefaultLink(d, e).set("source", f);
    //           return g.attr(b.linkAttributes),
    //           a.util.isBoolean(b.smoothLinks) && g.set("smooth", b.smoothLinks),
    //             g
    //       }
    //       ,
    //       c.prototype.startResizing = function(a) {
    //           this.startBatch(),
    //             this._flip = [1, 0, 0, 1, 1, 0, 0, 1][Math.floor(g.normalizeAngle(this.options.cellView.model.get("angle")) / 45)]
    //       }
    //       ,
    //       c.prototype.startRotating = function(a, b, c) {
    //           this.startBatch();
    //           var d = this.options.cellView.model.getBBox().center()
    //             , e = g.normalizeAngle(this.options.cellView.model.get("angle"));
    //           this._center = d,
    //             this._rotationStartAngle = e || 0,
    //             this._clientStartAngle = g.point(b, c).theta(d)
    //       }
    //       ,
    //       c.prototype.doResize = function(a, b, c, d, e) {
    //           var f = this.options.cellView.model.get("size")
    //             , g = Math.max(f.width + (this._flip ? d : e), 1)
    //             , h = Math.max(f.height + (this._flip ? e : d), 1);
    //           this.options.cellView.model.resize(g, h, {
    //               absolute: !0
    //           })
    //       }
    //       ,
    //       c.prototype.doRotate = function(a, b, c) {
    //           var d = this._clientStartAngle - g.point(b, c).theta(this._center)
    //             , e = g.snapToGrid(this._rotationStartAngle + d, this.options.rotateAngleGrid);
    //           this.options.cellView.model.rotate(e, !0)
    //       }
    //       ,
    //       c.prototype.doClone = function(a, b, c) {
    //           var d = this._cloneView;
    //           d && d.pointermove(a, b, c)
    //       }
    //       ,
    //       c.prototype.startCloning = function(b, c, d) {
    //           var e = this.options;
    //           this.startBatch();
    //           var f = e.clone(e.cellView.model, {
    //               clone: !0
    //           });
    //           if (!(f instanceof a.dia.Cell))
    //               throw new Error('ui.Halo: option "clone" has to return a cell.');
    //           this.centerElementAtCursor(f, c, d),
    //             f.addTo(e.graph, {
    //                 halo: this.cid,
    //                 async: !1
    //             }),
    //             this._cloneView = f.findView(e.paper),
    //             this._cloneView.pointerdown(b, c, d)
    //       }
    //       ,
    //       c.prototype.centerElementAtCursor = function(a, b, c) {
    //           var d = a.getBBox().center()
    //             , e = b - d.x
    //             , f = c - d.y;
    //           a.translate(e, f)
    //       }
    //       ,
    //       c.prototype.doFork = function(a, b, c) {
    //           var d = this._cloneView;
    //           d && d.pointermove(a, b, c)
    //       }
    //       ,
    //       c.prototype.doLink = function(a, b, c) {
    //           this._linkView && this._linkView.pointermove(a, b, c)
    //       }
    //       ,
    //       c.prototype.stopLinking = function(a) {
    //           this._linkView && (this._linkView.pointerup(a),
    //           this._linkView.model.hasLoop() && this.makeLoopLink(this._linkView.model),
    //             this.stopBatch(),
    //             this.triggerAction("link", "add", this._linkView.model),
    //             this._linkView = null)
    //       }
    //       ,
    //       c.prototype.stopForking = function(a, b, c) {
    //           var d = this._cloneView;
    //           d && d.pointerup(a, b, c),
    //             this.stopBatch()
    //       }
    //       ,
    //       c.prototype.stopCloning = function(a, b, c) {
    //           var d = this._cloneView;
    //           d && d.pointerup(a, b, c),
    //             this.stopBatch()
    //       }
    //       ,
    //       c.prototype.unlinkElement = function(a) {
    //           this.startBatch(),
    //             this.options.graph.removeLinks(this.options.cellView.model),
    //             this.stopBatch()
    //       }
    //       ,
    //       c.prototype.makeLoopLink = function(b) {
    //           var c, d, e = this.options.loopLinkWidth, f = this.options.paper.options, h = g.rect({
    //               x: 0,
    //               y: 0,
    //               width: f.width,
    //               height: f.height
    //           }), i = V(this.options.cellView.el).bbox(!1, this.options.paper.viewport), j = a.util.uniq([this.options.loopLinkPreferredSide, "top", "bottom", "left", "right"]), k = j.find(function(a) {
    //               var b, f = 0, j = 0;
    //               switch (a) {
    //                   case "top":
    //                       b = g.point(i.x + i.width / 2, i.y - e),
    //                         f = e / 2;
    //                       break;
    //                   case "bottom":
    //                       b = g.point(i.x + i.width / 2, i.y + i.height + e),
    //                         f = e / 2;
    //                       break;
    //                   case "left":
    //                       b = g.point(i.x - e, i.y + i.height / 2),
    //                         j = e / 2;
    //                       break;
    //                   case "right":
    //                       b = g.point(i.x + i.width + e, i.y + i.height / 2),
    //                         j = e / 2
    //               }
    //               return c = g.point(b).offset(-f, -j),
    //                 d = g.point(b).offset(f, j),
    //               h.containsPoint(c) && h.containsPoint(d)
    //           }, this);
    //           k && b.set("vertices", [c, d])
    //       }
    //       ,
    //       a.ui.Halo = a.mvc.View.extend({
    //           PIE_INNER_RADIUS: 20,
    //           PIE_OUTER_RADIUS: 50,
    //           className: "halo",
    //           events: {
    //               "mousedown .handle": "onHandlePointerDown",
    //               "touchstart .handle": "onHandlePointerDown",
    //               "mousedown .pie-toggle": "onPieTogglePointerDown",
    //               "touchstart .pie-toggle": "onPieTogglePointerDown"
    //           },
    //           documentEvents: {
    //               mousemove: "pointermove",
    //               touchmove: "pointermove",
    //               mouseup: "pointerup",
    //               touchend: "pointerup"
    //           },
    //           options: {
    //               clearAll: !0,
    //               clearOnBlankPointerdown: !0,
    //               useModelGeometry: !1,
    //               clone: function(a, b) {
    //                   return a.clone().unset("z")
    //               },
    //               type: "surrounding",
    //               pieSliceAngle: 45,
    //               pieStartAngleOffset: 0,
    //               pieIconSize: 14,
    //               pieToggles: [{
    //                   name: "default",
    //                   position: "e"
    //               }]
    //           },
    //           init: function() {
    //               var d = this.options
    //                 , e = d.cellView
    //                 , f = e.model
    //                 , g = f.isLink() ? new b : new c;
    //               a.util.assign(this, a.util.omit(g, "options"));
    //               var h = e.paper
    //                 , i = h.model;
    //               a.util.defaults(d, g.options, {
    //                   paper: h,
    //                   graph: i
    //               }),
    //                 a.util.bindAll(this, "render", "update"),
    //               d.clearAll && this.constructor.clear(h),
    //                 this.listenTo(i, "reset", this.remove),
    //                 this.listenTo(f, "remove", this.remove),
    //                 this.listenTo(h, "halo:create", this.remove),
    //               d.clearOnBlankPointerdown && this.listenTo(h, "blank:pointerdown", this.remove),
    //                 this.listenTo(i, "all", this.update),
    //                 this.listenTo(h, "scale translate", this.update),
    //                 this.handles = [],
    //                 a.util.toArray(d.handles).forEach(this.addHandle, this)
    //           },
    //           render: function() {
    //               var b = this.options;
    //               switch (this.$el.empty(),
    //                 this.$handles = $("<div/>").addClass("handles").appendTo(this.el),
    //                 this.$box = $("<label/>").addClass("box").appendTo(this.el),
    //                 this.$pieToggles = {},
    //                 this.$el.addClass(b.type),
    //                 this.$el.addClass(this.cellTypeCssClass()),
    //                 this.$el.attr("data-type", b.cellView.model.get("type")),
    //                 this.$handles.append(a.util.toArray(this.handles).map(this.renderHandle, this)),
    //                 b.type) {
    //                   case "toolbar":
    //                   case "surrounding":
    //                       this.hasHandle("fork") && this.toggleFork();
    //                       break;
    //                   case "pie":
    //                       a.util.toArray(this.options.pieToggles).forEach(function(b) {
    //                           var c = $("<div/>");
    //                           c.addClass("pie-toggle " + (b.position || "e")),
    //                             c.attr("data-name", b.name),
    //                             a.util.setAttributesBySelector(c, b.attrs),
    //                             c.appendTo(this.el),
    //                             this.$pieToggles[b.name] = c
    //                       }, this);
    //                       break;
    //                   default:
    //                       throw new Error("ui.Halo: unknown type")
    //               }
    //               return this.update(),
    //                 this.$el.addClass("animate").appendTo(b.paper.el),
    //                 this.setPieIcons(),
    //                 this
    //           },
    //           setPieIcons: function() {
    //               "pie" === this.options.type && this.$el.find(".handle").each(function(a, b) {
    //                   var c, d = $(b), e = d.attr("data-action"), f = this.getHandle(e);
    //                   if (!f || !f.icon) {
    //                       var g = window.getComputedStyle(b, ":before").getPropertyValue("content");
    //                       g && "none" !== g && (c = d.find(".slice-text-icon"),
    //                       c.length > 0 && V(c[0]).text(g.replace(/['"]/g, "")));
    //                       var h = d.css("background-image");
    //                       if (h) {
    //                           var i = h.match(/url\(['"]?([^'"]+)['"]?\)/);
    //                           if (i) {
    //                               var j = i[1];
    //                               c = d.find(".slice-img-icon"),
    //                               c.length > 0 && V(c[0]).attr("xlink:href", j)
    //                           }
    //                       }
    //                   }
    //               }
    //                 .bind(this))
    //           },
    //           update: function() {
    //               if (this.isRendered()) {
    //                   this.updateBoxContent();
    //                   var a = this.getBBox();
    //                   this.$el.toggleClass("tiny", a.width < this.options.tinyThreshold && a.height < this.options.tinyThreshold),
    //                     this.$el.toggleClass("small", !this.$el.hasClass("tiny") && a.width < this.options.smallThreshold && a.height < this.options.smallThreshold),
    //                     this.$el.css({
    //                         width: a.width,
    //                         height: a.height,
    //                         left: a.x,
    //                         top: a.y
    //                     }),
    //                   this.hasHandle("unlink") && this.toggleUnlink()
    //               }
    //           },
    //           getBBox: function() {
    //               var b = this.options.cellView
    //                 , c = this.options.bbox
    //                 , d = a.util.isFunction(c) ? c(b, this) : c;
    //               return d = a.util.defaults({}, d, {
    //                   x: 0,
    //                   y: 0,
    //                   width: 1,
    //                   height: 1
    //               }),
    //                 g.rect(d)
    //           },
    //           cellTypeCssClass: function() {
    //               return this.options.typeCssName
    //           },
    //           updateBoxContent: function() {
    //               var b = this.options.boxContent
    //                 , c = this.options.cellView;
    //               if (a.util.isFunction(b)) {
    //                   var d = b.call(this, c, this.$box[0]);
    //                   d && this.$box.html(d)
    //               } else
    //                   b ? this.$box.html(b) : this.$box.remove()
    //           },
    //           extendHandles: function(b) {
    //               a.util.forIn(b, function(b) {
    //                   var c = this.getHandle(b.name);
    //                   c && a.util.assign(c, b)
    //               }
    //                 .bind(this))
    //           },
    //           addHandles: function(b) {
    //               return a.util.toArray(b).forEach(this.addHandle, this),
    //                 this
    //           },
    //           addHandle: function(b) {
    //               var c = this.getHandle(b.name);
    //               return c || (this.handles.push(b),
    //                 a.util.forIn(b.events, function(c, d) {
    //                     a.util.isString(c) ? this.on("action:" + b.name + ":" + d, this[c], this) : this.on("action:" + b.name + ":" + d, c)
    //                 }
    //                   .bind(this)),
    //               this.$handles && this.renderHandle(b).appendTo(this.$handles)),
    //                 this
    //           },
    //           renderHandle: function(b) {
    //               var c = this.getHandleIdx(b.name)
    //                 , d = $("<div/>").addClass("handle").addClass(b.name).attr("data-action", b.name).prop("draggable", !1);
    //               switch (this.options.type) {
    //                   case "toolbar":
    //                   case "surrounding":
    //                       d.addClass(b.position),
    //                       b.content && d.html(b.content);
    //                       break;
    //                   case "pie":
    //                       var e = this.PIE_OUTER_RADIUS
    //                         , f = this.PIE_INNER_RADIUS
    //                         , h = (e + f) / 2
    //                         , i = g.point(e, e)
    //                         , j = g.toRad(this.options.pieSliceAngle)
    //                         , k = c * j + g.toRad(this.options.pieStartAngleOffset)
    //                         , l = k + j
    //                         , m = V.createSlicePathData(f, e, k, l)
    //                         , n = V("svg").addClass("slice-svg")
    //                         , o = V("path").attr("d", m).translate(e, e).addClass("slice")
    //                         , p = g.point.fromPolar(h, -k - j / 2, i)
    //                         , q = this.options.pieIconSize
    //                         , r = V("image").attr(p).addClass("slice-img-icon");
    //                       p.y = p.y + q - 2;
    //                       var s = V("text", {
    //                           "font-size": q
    //                       }).attr(p).addClass("slice-text-icon");
    //                       r.attr({
    //                           width: q,
    //                           height: q
    //                       }),
    //                         r.translate(-q / 2, -q / 2),
    //                         s.translate(-q / 2, -q / 2),
    //                         n.append([o, r, s]),
    //                         d.append(n.node)
    //               }
    //               return b.icon && this.setHandleIcon(d, b.icon),
    //                 a.util.setAttributesBySelector(d, b.attrs),
    //                 d
    //           },
    //           setHandleIcon: function(a, b) {
    //               switch (this.options.type) {
    //                   case "pie":
    //                       var c = a.find(".slice-img-icon");
    //                       V(c[0]).attr("xlink:href", b);
    //                       break;
    //                   case "toolbar":
    //                   case "surrounding":
    //                       a.css("background-image", "url(" + b + ")")
    //               }
    //           },
    //           removeHandles: function() {
    //               for (; this.handles.length; )
    //                   this.removeHandle(this.handles[0].name);
    //               return this
    //           },
    //           removeHandle: function(b) {
    //               var c = this.getHandleIdx(b)
    //                 , d = this.handles[c];
    //               return d && (a.util.forIn(d.events, function(a, c) {
    //                   this.off("action:" + b + ":" + c)
    //               }
    //                 .bind(this)),
    //                 this.$(".handle." + b).remove(),
    //                 this.handles.splice(c, 1)),
    //                 this
    //           },
    //           changeHandle: function(b, c) {
    //               var d = this.getHandle(b);
    //               return d && (this.removeHandle(b),
    //                 this.addHandle(a.util.merge({
    //                     name: b
    //                 }, d, c))),
    //                 this
    //           },
    //           hasHandle: function(a) {
    //               return this.getHandleIdx(a) !== -1
    //           },
    //           getHandleIdx: function(b) {
    //               return a.util.toArray(this.handles).findIndex(function(a) {
    //                   return a.name === b
    //               })
    //           },
    //           getHandle: function(b) {
    //               return a.util.toArray(this.handles).find(function(a) {
    //                   return a.name === b
    //               })
    //           },
    //           toggleHandle: function(a, b) {
    //               var c = this.getHandle(a);
    //               if (c) {
    //                   var d = this.$(".handle." + a);
    //                   void 0 === b && (b = !d.hasClass("selected")),
    //                     d.toggleClass("selected", b);
    //                   var e = b ? c.iconSelected : c.icon;
    //                   e && this.setHandleIcon(d, e)
    //               }
    //               return this
    //           },
    //           selectHandle: function(a) {
    //               return this.toggleHandle(a, !0)
    //           },
    //           deselectHandle: function(a) {
    //               return this.toggleHandle(a, !1)
    //           },
    //           deselectAllHandles: function() {
    //               return a.util.toArray(this.handles).forEach(function(a) {
    //                   this.deselectHandle(a.name)
    //               }, this),
    //                 this
    //           },
    //           onHandlePointerDown: function(b) {
    //               if (this._action = $(b.target).closest(".handle").attr("data-action"),
    //                   this._action) {
    //                   b.preventDefault(),
    //                     b.stopPropagation(),
    //                     b = a.util.normalizeEvent(b);
    //                   var c = this.options.paper.snapToGrid({
    //                       x: b.clientX,
    //                       y: b.clientY
    //                   });
    //                   this._localX = c.x,
    //                     this._localY = c.y,
    //                     this._evt = b,
    //                     this.triggerAction(this._action, "pointerdown", b, c.x, c.y),
    //                     this.delegateDocumentEvents(null, b.data)
    //               }
    //           },
    //           onPieTogglePointerDown: function(a) {
    //               a.stopPropagation();
    //               var b = $(a.target).closest(".pie-toggle")
    //                 , c = b.attr("data-name");
    //               this.isOpen(c) ? this.toggleState(c) : this.isOpen() ? (this.toggleState(),
    //                 this.toggleState(c)) : this.toggleState(c)
    //           },
    //           triggerAction: function(a, b, c) {
    //               var d = Array.prototype.slice.call(arguments, 2);
    //               d.unshift("action:" + a + ":" + b),
    //                 this.trigger.apply(this, d)
    //           },
    //           stopBatch: function() {
    //               this.options.graph.stopBatch("halo", {
    //                   halo: this.cid
    //               })
    //           },
    //           startBatch: function() {
    //               this.options.graph.startBatch("halo", {
    //                   halo: this.cid
    //               })
    //           },
    //           pointermove: function(b) {
    //               if (this._action) {
    //                   b.preventDefault(),
    //                     b.stopPropagation(),
    //                     b = a.util.normalizeEvent(b);
    //                   var c = this.options.paper.snapToGrid({
    //                       x: b.clientX,
    //                       y: b.clientY
    //                   })
    //                     , d = c.x - this._localX
    //                     , e = c.y - this._localY;
    //                   this._localX = c.x,
    //                     this._localY = c.y,
    //                     this._evt = b,
    //                     this.triggerAction(this._action, "pointermove", b, c.x, c.y, d, e)
    //               }
    //           },
    //           pointerup: function(a) {
    //               var b = this._action;
    //               if (b) {
    //                   this._action = null,
    //                     this._evt = null;
    //                   var c = this.options.paper.snapToGrid({
    //                       x: a.clientX,
    //                       y: a.clientY
    //                   });
    //                   this.triggerAction(b, "pointerup", a, c.x, c.y),
    //                     this.undelegateDocumentEvents()
    //               }
    //           },
    //           onRemove: function() {
    //               this._action && this._evt && this.pointerup(this._evt),
    //               this.options.graph.hasActiveBatch("halo") && this.stopBatch()
    //           },
    //           onSetTheme: function() {
    //               this.setPieIcons()
    //           },
    //           removeElement: function() {
    //               this.options.cellView.model.remove()
    //           },
    //           toggleUnlink: function() {
    //               var a = this.options.graph.getConnectedLinks(this.options.cellView.model).length > 0;
    //               this.$handles.children(".unlink").toggleClass("hidden", !a)
    //           },
    //           toggleFork: function() {
    //               var a = this.options.cellView.model.clone()
    //                 , b = this.options.paper.createViewForModel(a)
    //                 , c = this.options.paper.options.validateConnection(this.options.cellView, null, b, null, "target");
    //               this.$handles.children(".fork").toggleClass("hidden", !c),
    //                 b.remove(),
    //                 a = null
    //           },
    //           toggleState: function(b) {
    //               if (this.isRendered()) {
    //                   var c = this.$el;
    //                   if (a.util.forIn(this.$pieToggles, function(a) {
    //                         a.removeClass("open")
    //                     }),
    //                       this.isOpen())
    //                       this.trigger("state:close", b),
    //                         c.removeClass("open");
    //                   else {
    //                       if (this.trigger("state:open", b),
    //                           b) {
    //                           var d = a.util.toArray(this.options.pieToggles).find(function(a) {
    //                               return a.name === b
    //                           });
    //                           d && c.attr({
    //                               "data-pie-toggle-position": d.position,
    //                               "data-pie-toggle-name": d.name
    //                           }),
    //                             this.$pieToggles[b].addClass("open")
    //                       }
    //                       c.addClass("open")
    //                   }
    //               }
    //           },
    //           isOpen: function(a) {
    //               return !!this.isRendered() && (a ? this.$pieToggles[a].hasClass("open") : this.$el.hasClass("open"))
    //           },
    //           isRendered: function() {
    //               return void 0 !== this.$box
    //           }
    //       }, {
    //           clear: function(a) {
    //               a.trigger("halo:create")
    //           }
    //       })
    // // }(joint);


  /**
   * @name joint.ui.Toolbar
   * @desc 顶部工具栏 & 主题切换
   * @path /libs/plugin/toolbar.js
   */



  /**
   * @name joint.ui.Stencil
   * @desc 构建左侧元素菜单视图
   * @path /libs/plugin/stencil.js
   */



  /**
   * @name joint.ui.Inspector
   * @desc 右侧 元素编辑器
   * @path /libs/plugin/inspector.js
   */




    joint.ui.FreeTransform = joint.mvc.View.extend({
        className: "free-transform",
        events: {
            "mousedown .resize": "startResizing",
            "mousedown .rotate": "startRotating",
            "touchstart .resize": "startResizing",
            "touchstart .rotate": "startRotating"
        },
        DIRECTIONS: ["nw", "n", "ne", "e", "se", "s", "sw", "w"],
        POSITIONS: ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"],
        options: {
            cellView: void 0,
            rotateAngleGrid: 15,
            preserveAspectRatio: !1,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 1 / 0,
            maxHeight: 1 / 0,
            allowOrthogonalResize: !0,
            allowRotation: !0,
            clearAll: !0,
            clearOnBlankPointerdown: !0
        },
        init: function() {
            var a = this.options;
            a.cellView && joint.util.defaults(a, {
                cell: a.cellView.model,
                paper: a.cellView.paper,
                graph: a.cellView.paper.model
            }),
              joint.util.bindAll(this, "update", "remove", "pointerup", "pointermove");
            var b = a.paper
              , c = a.graph;
            a.clearAll && this.constructor.clear(b),
              $(document.body).on("mousemove touchmove", this.pointermove),
              $(document).on("mouseup touchend", this.pointerup),
              this.listenTo(c, "all", this.update),
              this.listenTo(b, "scale translate", this.update),
              this.listenTo(c, "reset", this.remove),
              this.listenTo(a.cell, "remove", this.remove),
            a.clearOnBlankPointerdown && this.listenTo(b, "blank:pointerdown", this.remove),
              b.$el.append(this.el),
              this.constructor.registerInstanceToPaper(this, b)
        },
        renderHandles: function() {
            var a = $("<div/>").prop("draggable", !1)
              , b = a.clone().addClass("rotate")
              , c = this.POSITIONS.map(function(b) {
                return a.clone().addClass("resize").attr("data-position", b)
            });
            this.$el.empty().append(c, b)
        },
        render: function() {
            this.renderHandles(),
              this.$el.attr("data-type", this.options.cell.get("type")),
              this.$el.toggleClass("no-orthogonal-resize", this.options.preserveAspectRatio || !this.options.allowOrthogonalResize),
              this.$el.toggleClass("no-rotation", !this.options.allowRotation),
              this.update()
        },
        update: function() {
            var a = this.options.paper.matrix()
              , b = this.options.cell.getBBox();
            b.x *= a.a,
              b.x += a.e,
              b.y *= a.d,
              b.y += a.f,
              b.width *= a.a,
              b.height *= a.d;
            var c = g.normalizeAngle(this.options.cell.get("angle") || 0)
              , d = "rotate(" + c + "deg)";
            this.$el.css({
                width: b.width + 4,
                height: b.height + 4,
                left: b.x - 3,
                top: b.y - 3,
                transform: d,
                "-webkit-transform": d,
                "-ms-transform": d
            });
            var e = Math.floor(c * (this.DIRECTIONS.length / 360));
            if (e != this._previousDirectionsShift) {
                var f = this.DIRECTIONS.slice(e).concat(this.DIRECTIONS.slice(0, e));
                this.$(".resize").removeClass(this.DIRECTIONS.join(" ")).each(function(a, b) {
                    $(b).addClass(f[a])
                }),
                  this._previousDirectionsShift = e
            }
        },
        calculateTrueDirection: function(a) {
            var b = this.options.cell
              , c = g.normalizeAngle(b.get("angle"))
              , d = this.POSITIONS.indexOf(a);
            return d += Math.floor(c * (this.POSITIONS.length / 360)),
              d %= this.POSITIONS.length,
              this.POSITIONS[d]
        },
        startResizing: function(a) {
            a.stopPropagation(),
              this.options.graph.startBatch("free-transform", {
                  freeTransform: this.cid
              });
            var b = $(a.target).data("position")
              , c = this.calculateTrueDirection(b)
              , d = 0
              , e = 0;
            b.split("-").forEach(function(a) {
                d = {
                      left: -1,
                      right: 1
                  }[a] || d,
                  e = {
                        top: -1,
                        bottom: 1
                    }[a] || e
            });
            var f = this.toValidResizeDirection(b)
              , h = {
                "top-right": "bottomLeft",
                "top-left": "corner",
                "bottom-left": "topRight",
                "bottom-right": "origin"
            }[f];
            this._initial = {
                angle: g.normalizeAngle(this.options.cell.get("angle") || 0),
                resizeX: d,
                resizeY: e,
                selector: h,
                direction: f,
                relativeDirection: b,
                trueDirection: c
            },
              this._action = "resize",
              this.startOp(a.target)
        },
        toValidResizeDirection: function(a) {
            return {
                  top: "top-left",
                  bottom: "bottom-right",
                  left: "bottom-left",
                  right: "top-right"
              }[a] || a
        },
        startRotating: function(a) {
            a.stopPropagation(),
              this.options.graph.startBatch("free-transform", {
                  freeTransform: this.cid
              });
            var b = this.options.cell.getBBox().center()
              , c = this.options.paper.snapToGrid({
                x: a.clientX,
                y: a.clientY
            });
            this._initial = {
                centerRotation: b,
                modelAngle: g.normalizeAngle(this.options.cell.get("angle") || 0),
                startAngle: g.point(c).theta(b)
            },
              this._action = "rotate",
              this.startOp(a.target)
        },
        pointermove: function(a) {
            if (this._action) {
                a = joint.util.normalizeEvent(a);
                var b = this.options
                  , c = b.paper.snapToGrid({
                    x: a.clientX,
                    y: a.clientY
                })
                  , d = b.paper.options.gridSize
                  , e = b.cell
                  , f = this._initial;
                switch (this._action) {
                    case "resize":
                        var h = e.getBBox()
                          , i = g.point(c).rotate(h.center(), f.angle)
                          , j = i.difference(h[f.selector]())
                          , k = f.resizeX ? j.x * f.resizeX : h.width
                          , l = f.resizeY ? j.y * f.resizeY : h.height;
                        if (k = g.snapToGrid(k, d),
                            l = g.snapToGrid(l, d),
                            k = Math.max(k, b.minWidth || d),
                            l = Math.max(l, b.minHeight || d),
                            k = Math.min(k, b.maxWidth),
                            l = Math.min(l, b.maxHeight),
                            b.preserveAspectRatio) {
                            var m = h.width * l / h.height
                              , n = h.height * k / h.width;
                            m > k ? l = n : k = m
                        }
                        h.width == k && h.height == l || e.resize(k, l, {
                            freeTransform: this.cid,
                            direction: f.direction,
                            relativeDirection: f.relativeDirection,
                            trueDirection: f.trueDirection,
                            ui: !0,
                            minWidth: b.minWidth,
                            minHeight: b.minHeight,
                            maxWidth: b.maxWidth,
                            maxHeight: b.maxHeight,
                            preserveAspectRatio: b.preserveAspectRatio
                        });
                        break;
                    case "rotate":
                        var o = f.startAngle - g.point(c).theta(f.centerRotation);
                        e.rotate(g.snapToGrid(f.modelAngle + o, b.rotateAngleGrid), !0)
                }
            }
        },
        pointerup: function(a) {
            this._action && (this.stopOp(),
              this.options.graph.stopBatch("free-transform", {
                  freeTransform: this.cid
              }),
              this._action = null,
              this._initial = null)
        },
        onRemove: function() {
            $(document.body).off("mousemove touchmove", this.pointermove),
              $(document).off("mouseup touchend", this.pointerup),
              joint.ui.FreeTransform.unregisterInstanceFromPaper(this, this.options.paper)
        },
        startOp: function(a) {
            a && ($(a).addClass("in-operation"),
              this._elementOp = a),
              this.$el.addClass("in-operation")
        },
        stopOp: function() {
            this._elementOp && ($(this._elementOp).removeClass("in-operation"),
              this._elementOp = null),
              this.$el.removeClass("in-operation")
        }
    }, {
        instancesByPaper: {},
        clear: function(a) {
            a.trigger("freetransform:create"),
              this.removeInstancesForPaper(a)
        },
        removeInstancesForPaper: function(a) {
            joint.util.invoke(this.getInstancesForPaper(a), "remove")
        },
        getInstancesForPaper: function(a) {
            return this.instancesByPaper[a.cid] || {}
        },
        registerInstanceToPaper: function(a, b) {
            this.instancesByPaper[b.cid] || (this.instancesByPaper[b.cid] = {}),
              this.instancesByPaper[b.cid][a.cid] = a
        },
        unregisterInstanceFromPaper: function(a, b) {
            this.instancesByPaper[b.cid] && (this.instancesByPaper[b.cid][a.cid] = null)
        }
    });
    joint.ui.Tooltip = joint.mvc.View.extend({
        className: "tooltip",
        options: {
            left: void 0,
            right: void 0,
            top: void 0,
            bottom: void 0,
            position: void 0,
            positionSelector: void 0,
            direction: "auto",
            minResizedWidth: 100,
            padding: 0,
            rootTarget: null,
            target: null,
            trigger: "hover",
            viewport: {
                selector: null,
                padding: 0
            },
            dataAttributePrefix: "tooltip",
            template: '<div class="tooltip-arrow"/><div class="tooltip-arrow-mask"/><div class="tooltip-content"/>'
        },
        init: function() {
            this.eventNamespace = ("." + this.className + this.cid).replace(/ /g, "_"),
              this.settings = {};
            var a = this.options.trigger.split(" ");
            joint.util.bindAll(this, "render", "hide", "show", "toggle", "isVisible", "position"),
              this.options.rootTarget ? (this.$rootTarget = $(this.options.rootTarget),
                a.forEach(function(a) {
                    switch (a) {
                        case "click":
                            this.$rootTarget.on("click" + this.eventNamespace, this.options.target, this.toggle);
                            break;
                        case "hover":
                            this.$rootTarget.on("mouseover" + this.eventNamespace, this.options.target, this.render);
                            break;
                        case "focus":
                            this.$rootTarget.on("focusin" + this.eventNamespace, this.options.target, this.render)
                    }
                }, this)) : (this.$target = $(this.options.target),
                a.forEach(function(a) {
                    switch (a) {
                        case "click":
                            this.$target.on("click" + this.eventNamespace, this.toggle);
                            break;
                        case "hover":
                            this.$target.on("mouseover" + this.eventNamespace, this.render);
                            break;
                        case "focus":
                            this.$target.on("focusin" + this.eventNamespace, this.render)
                    }
                }, this)),
              this.$el.append(this.options.template)
        },
        onRemove: function() {
            this.options.rootTarget ? this.$rootTarget.off(this.eventNamespace) : this.$target.off(this.eventNamespace)
        },
        hide: function() {
            var a = this.settings;
            a && (this.unbindHideActions(a.currentTarget),
              this.$el.removeClass(a.className),
              this.$el.remove())
        },
        show: function(a) {
            this.render(a || {
                  target: this.options.target
              })
        },
        toggle: function(a) {
            this.isVisible() ? this.hide() : this.show(a)
        },
        isVisible: function() {
            return document.body.contains(this.el)
        },
        render: function(a) {
            var b = void 0 !== a.x && void 0 !== a.y ? a : null
              , c = $(a.target).closest(this.options.target)[0]
              , d = this.settings = this.getTooltipSettings(c);
            d.currentTarget = c,
              this.bindHideActions(c);
            var e;
            e = b ? {
                x: b.x,
                y: b.y,
                width: 1,
                height: 1
            } : joint.util.getElementBBox(c),
              this.$(".tooltip-content").html(d.content),
              this.$el.hide(),
              this.$el.removeClass("left right top bottom"),
              this.$el.addClass(d.className),
              $(document.body).append(this.$el);
            var f = this.$("img");
            f.length ? f.on("load", function() {
                this.position(e),
                  this.$el.addClass("rendered")
            }
              .bind(this)) : (this.position(e),
              this.$el.addClass("rendered"))
        },
        getTooltipSettings: function(a) {
            var b = this.loadDefinitionFromElementData(a);
            return this.evaluateOptions(a, b)
        },
        unbindHideActions: function(a) {
            var b = this.eventNamespace + ".remove";
            $(a).off(b),
              clearInterval(this.interval)
        },
        bindHideOnRemoveTarget: function(a) {
            clearInterval(this.interval),
              this.interval = setInterval(function() {
                  $.contains(document, a) || (clearInterval(this.interval),
                    this.hide())
              }
                .bind(this), 500)
        },
        bindHideActions: function(a) {
            var b = this.settings
              , c = $(a)
              , d = this.eventNamespace + ".remove";
            this.bindHideOnRemoveTarget(a),
              this.options.trigger.split(" ").forEach(function(a) {
                  var e = {
                      hover: ["mouseout", "mousedown"],
                      focus: ["focusout"]
                  }
                    , f = e[a] || [];
                  b.hideTrigger && (f = b.hideTrigger.split(" ") || []),
                    f.forEach(function(a) {
                        c.on(a + d, this.hide)
                    }, this)
              }, this)
        },
        evaluateOptions: function(a, b) {
            b = b || {};
            var c = joint.util.assign({}, b, this.options);
            return joint.util.forIn(c, function(d, e) {
                var f = joint.util.isFunction(d) ? d(a) : d;
                c[e] = void 0 === f || null === f ? b[e] : f
            }),
              this.normalizePosition(c),
              c
        },
        loadDefinitionFromElementData: function(a) {
            if (!a)
                return {};
            var b = function(a) {
                return "left" === a || "bottom" === a || "top" === a || "right" === a
            }
              , c = this.getAllAttrs(a, "data-" + this.options.dataAttributePrefix)
              , d = {};
            return joint.util.forIn(c, function(a, c) {
                "" === c && (c = "content"),
                b(c) || (d[c] = a)
            }),
              d
        },
        getAllAttrs: function(a, b) {
            for (var c = b || "", d = a.attributes, e = {}, f = 0, g = d.length; f < g; f++) {
                var h = d[f];
                if (h && h.name.startsWith(c)) {
                    var i = joint.util.camelCase(h.name.slice(c.length));
                    e[i] = h.value
                }
            }
            return e
        },
        normalizePosition: function(a) {
            var b = a.left || a.right || a.top || a.bottom;
            !a.position && b && (a.left && (a.position = "left"),
            a.right && (a.position = "right"),
            a.top && (a.position = "top"),
            a.bottom && (a.position = "bottom")),
            !a.positionSelector && b && (a.positionSelector = b)
        },
        position: function(a) {
            var b = this.settings;
            this.$el.show(),
              this.$el.css("width", "auto");
            var c = this.getViewportViewBBox()
              , d = this.getTooltipBBox(a, c)
              , e = {};
            "left" === b.position || "right" === b.position ? e.top = a.y + a.height / 2 - d.y : "top" === b.position || "bottom" === b.position ? e.left = a.x + a.width / 2 - d.x : e.top = a.y + a.height / 2 - d.y,
              this.$el.css({
                  left: d.x,
                  top: d.y,
                  width: d.width || "auto"
              });
            var f = this.$(".tooltip-arrow, .tooltip-arrow-mask");
            f.removeAttr("style"),
              f.css(e),
            b.direction && "off" !== b.direction && this.$el.addClass("auto" === b.direction ? b.position || "left" : b.direction)
        },
        getViewportViewBBox: function() {
            var a = this.settings
              , b = a.viewport.selector ? $(a.currentTarget).closest(a.viewport.selector) : "html"
              , c = joint.util.getElementBBox(b)
              , d = $(window);
            a.viewport.selector || (c.width = d.width() + d.scrollLeft(),
              c.height = d.height() + d.scrollTop());
            var e = a.viewport.padding || 0;
            return c.x += e,
              c.y += e,
              c.width -= 2 * e,
              c.height -= 2 * e,
              c
        },
        getPosition: function(a, b, c, d) {
            var e = this.settings
              , f = e.position || "left"
              , g = e.padding
              , h = Math.min(e.minResizedWidth, c.width + g)
              , i = {
                left: function(f) {
                    var i = {
                        x: a.x + a.width + g,
                        y: b.y + b.height / 2 - c.height / 2
                    };
                    if (f) {
                        var j = d.x + d.width - i.x;
                        if (j > h && j < c.width + g && (i.width = j),
                          j < h)
                            return e.position = "right",
                              this.right(!1)
                    }
                    return i
                },
                right: function(f) {
                    var i = {
                        x: a.x - c.width - g,
                        y: b.y + b.height / 2 - c.height / 2
                    };
                    if (f) {
                        var j = a.x - g - d.x;
                        if (j > h && j < c.width + g && (i.width = j,
                            i.x = d.x),
                          j < h)
                            return e.position = "left",
                              this.left(!1)
                    }
                    return i
                },
                top: function(f) {
                    var h = {
                        x: b.x + b.width / 2 - c.width / 2,
                        y: a.y + a.height + g
                    };
                    if (f) {
                        var i = d.y + d.height - (a.y + a.height + g);
                        if (i < c.height)
                            return e.position = "bottom",
                              this.bottom(!1)
                    }
                    return h
                },
                bottom: function(f) {
                    var h = {
                        x: b.x + b.width / 2 - c.width / 2,
                        y: a.y - c.height - g
                    };
                    if (f) {
                        var i = a.y - g - d.y;
                        if (i < c.height)
                            return e.position = "top",
                              this.top(!1)
                    }
                    return h
                }
            };
            return i[f](h > 0)
        },
        getTooltipBBox: function(a, b) {
            var c, d, e = this.measureTooltipElement();
            c = $(this.settings.positionSelector),
              d = c[0] ? joint.util.getElementBBox(c[0]) : a;
            var f = this.getPosition(d, a, e, b);
            f.y < b.y ? f.y = b.y : f.y + e.height > b.y + b.height && (f.y = b.y + b.height - e.height);
            var g = f.width || e.width;
            return f.x < b.x ? f.x = b.x : f.x + g > b.x + b.width && (f.x = b.x + b.width - g),
              f
        },
        measureTooltipElement: function() {
            var a = this.$el.clone().appendTo($("body")).css({
                left: -1e3,
                top: -500
            })
              , b = {
                width: a.outerWidth(),
                height: a.outerHeight()
            };
            return a.remove(),
              b
        }
    });
    joint.ui.Snaplines = joint.mvc.View.extend({
        options: {
            paper: void 0,
            distance: 10
        },
        className: "snaplines",
        init: function() {
            joint.util.bindAll(this, "hide"),
              this.$horizontal = $("<div>").addClass("snapline horizontal").appendTo(this.el),
              this.$vertical = $("<div>").addClass("snapline vertical").appendTo(this.el),
              this.$el.hide().appendTo(this.options.paper.el),
              this.startListening()
        },
        startListening: function() {
            this.stopListening(),
              this.listenTo(this.options.paper, "cell:pointerdown", this.captureCursorOffset),
              this.listenTo(this.options.paper, "cell:pointermove", this.snapWhileMoving),
              this.listenTo(this.options.paper.model, "batch:stop", this.onBatchStop),
              $(document).on("mouseup touchend", this.hide),
              this.filterTypes = {},
              this.filterCells = {},
              this.filterFunction = void 0,
              Array.isArray(this.options.filter) ? this.options.filter.forEach(function(a) {
                  joint.util.isString(a) ? this.filterTypes[a] = !0 : this.filterCells[a.id] = !0
              }, this) : joint.util.isFunction(this.options.filter) && (this.filterFunction = this.options.filter)
        },
        onBatchStop: function(a) {
            a = a || {},
            "resize" === a.batchName && this.snapWhileResizing(a.cell, a)
        },
        captureCursorOffset: function(a, b, c, d) {
            if (this.canElementMove(a)) {
                var e = a.model.get("position");
                this._cursorOffset = {
                    x: c - e.x,
                    y: d - e.y
                }
            }
        },
        snapWhileResizing: function(a, b) {
            if (b.ui && !b.snapped && b.direction && b.trueDirection) {
                var c = this.options.paper.findViewByModel(a);
                if (c && c.model.isElement()) {
                    var d = a.getBBox()
                      , e = d.bbox(a.get("angle"))
                      , f = e.origin()
                      , h = e.corner()
                      , i = g.normalizeAngle(a.get("angle"))
                      , j = this.options.distance
                      , k = null
                      , l = null
                      , m = {
                        vertical: 0,
                        horizontal: 0
                    }
                      , n = b.direction
                      , o = b.trueDirection
                      , p = b.relativeDirection;
                    if (o.indexOf("right") !== -1 ? m.vertical = h.x : m.vertical = f.x,
                        o.indexOf("bottom") !== -1 ? m.horizontal = h.y : m.horizontal = f.y,
                        this.options.paper.model.getElements().find(function(b) {
                            if (b.id === a.id || b.isEmbeddedIn(a) || this.filterTypes[b.get("type")] || this.filterCells[b.id] || this.filterFunction && this.filterFunction(b))
                                return !1;
                            var c = b.getBBox().bbox(b.get("angle"))
                              , d = c.origin()
                              , e = c.corner()
                              , f = {
                                vertical: [d.x, e.x],
                                horizontal: [d.y, e.y]
                            };
                            return joint.util.forIn(f, function(a, b) {
                                a = a.map(function(a) {
                                    return {
                                        position: a,
                                        distance: Math.abs(a - m[b])
                                    }
                                }),
                                  a = a.filter(function(a) {
                                      return a.distance < j
                                  }),
                                  a = joint.util.sortBy(a, function(a) {
                                      return a.distance
                                  }),
                                  f[b] = a
                            }),
                            null === k && f.vertical.length > 0 && (k = f.vertical[0].position),
                            null === l && f.horizontal.length > 0 && (l = f.horizontal[0].position),
                            joint.util.isNumber(k) && joint.util.isNumber(l)
                        }, this),
                        this.hide(),
                      joint.util.isNumber(k) || joint.util.isNumber(l)) {
                        var q = 0;
                        joint.util.isNumber(k) && (q = o.indexOf("right") !== -1 ? k - e.corner().x : e.origin().x - k);
                        var r = 0;
                        joint.util.isNumber(l) && (r = o.indexOf("bottom") !== -1 ? l - e.corner().y : e.origin().y - l);
                        var s = 0
                          , t = 0
                          , u = !(i % 90);
                        if (u)
                            90 === i || 270 === i ? (s = r,
                              t = q) : (s = q,
                              t = r);
                        else {
                            var v;
                            v = i >= 0 && i < 90 ? 1 : i >= 90 && i < 180 ? 4 : i >= 180 && i < 270 ? 3 : 2,
                            l && k && (r > q ? (r = 0,
                              l = null) : (q = 0,
                              k = null));
                            var w = g.toRad(i % 90);
                            q && (s = 3 === v ? q / Math.cos(w) : q / Math.sin(w)),
                            r && (t = 3 === v ? r / Math.cos(w) : r / Math.sin(w));
                            var x = 1 === v || 3 === v;
                            switch (p) {
                                case "top":
                                case "bottom":
                                    t = r ? r / (x ? Math.cos(w) : Math.sin(w)) : q / (x ? Math.sin(w) : Math.cos(w));
                                    break;
                                case "left":
                                case "right":
                                    s = q ? q / (x ? Math.cos(w) : Math.sin(w)) : r / (x ? Math.sin(w) : Math.cos(w))
                            }
                        }
                        switch (p) {
                            case "top":
                            case "bottom":
                                s = 0;
                                break;
                            case "left":
                            case "right":
                                t = 0
                        }
                        var y = this.options.paper.options.gridSize
                          , z = Math.max(d.width + s, y)
                          , A = Math.max(d.height + t, y);
                        b.minWidth && b.minWidth > y && (z = Math.max(z, b.minWidth)),
                        b.minHeight && b.minHeight > y && (A = Math.max(A, b.minHeight)),
                        b.maxWidth && (z = Math.min(z, b.maxWidth)),
                        b.maxHeight && (A = Math.min(A, b.maxHeight)),
                        b.preserveAspectRatio && (s > t ? A = z * (d.height / d.width) : z = A * (d.width / d.height)),
                        z === d.width && A === d.height || a.resize(z, A, {
                            snaplines: this.cid,
                            restrictedArea: this.options.paper.getRestrictedArea(c),
                            direction: n,
                            relativeDirection: p,
                            trueDirection: o,
                            snapped: !0
                        });
                        var B = a.getBBox().bbox(i)
                          , C = 1;
                        k && Math.abs(B.x - k) > C && Math.abs(B.width + B.x - k) > C && (k = null),
                        l && Math.abs(B.y - l) > C && Math.abs(B.height + B.y - l) > C && (l = null),
                          this.show({
                              vertical: k,
                              horizontal: l
                          })
                    }
                }
            }
        },
        canElementMove: function(a) {
            return a && a.model.isElement() && a.can("elementMove")
        },
        snapWhileMoving: function(a, b, c, d) {
            if (this.canElementMove(a)) {
                var e = a.model
                  , f = e.get("position")
                  , h = e.get("size")
                  , i = g.rect(joint.util.assign({
                    x: c - this._cursorOffset.x,
                    y: d - this._cursorOffset.y
                }, h))
                  , j = i.center()
                  , k = i.bbox(e.get("angle"))
                  , l = k.origin()
                  , m = k.corner()
                  , n = this.options.distance
                  , o = null
                  , p = null
                  , q = 0
                  , r = 0;
                if (this.options.paper.model.getElements().find(function(a) {
                      if (a === e || a.isEmbeddedIn(e) || this.filterTypes[a.get("type")] || this.filterCells[a.id] || this.filterFunction && this.filterFunction(a))
                          return !1;
                      var b = a.getBBox().bbox(a.get("angle"))
                        , c = b.center()
                        , d = b.origin()
                        , f = b.corner();
                      return null === o && (Math.abs(c.x - j.x) < n ? (o = c.x,
                        q = .5) : Math.abs(d.x - l.x) < n ? o = d.x : Math.abs(d.x - m.x) < n ? (o = d.x,
                        q = 1) : Math.abs(f.x - m.x) < n ? (o = f.x,
                        q = 1) : Math.abs(f.x - l.x) < n && (o = f.x)),
                      null === p && (Math.abs(c.y - j.y) < n ? (p = c.y,
                        r = .5) : Math.abs(d.y - l.y) < n ? p = d.y : Math.abs(d.y - m.y) < n ? (p = d.y,
                        r = 1) : Math.abs(f.y - m.y) < n ? (p = f.y,
                        r = 1) : Math.abs(f.y - l.y) < n && (p = f.y)),
                      joint.util.isNumber(o) && joint.util.isNumber(p)
                  }, this),
                    this.hide(),
                  joint.util.isNumber(o) || joint.util.isNumber(p)) {
                    joint.util.isNumber(o) && (k.x = o - q * k.width),
                    joint.util.isNumber(p) && (k.y = p - r * k.height);
                    var s = k.center()
                      , t = s.x - i.width / 2
                      , u = s.y - i.height / 2;
                    e.translate(t - f.x, u - f.y, {
                        restrictedArea: this.options.paper.getRestrictedArea(a),
                        snapped: !0
                    }),
                      this.show({
                          vertical: o,
                          horizontal: p
                      })
                }
            }
        },
        show: function(a) {
            a = a || {};
            var b = this.options.paper.matrix();
            a.horizontal ? this.$horizontal.css("top", a.horizontal * b.d + b.f).show() : this.$horizontal.hide(),
              a.vertical ? this.$vertical.css("left", a.vertical * b.a + b.e).show() : this.$vertical.hide(),
              this.$el.show()
        },
        hide: function() {
            this.$el.hide()
        },
        onRemove: function() {
            $(document).off("mouseup", this.hide)
        }
    });
    joint.ui.TextEditor = joint.mvc.View.extend({
        options: {
            text: void 0,
            newlineCharacterBBoxWidth: 10,
            placeholder: void 0,
            focus: !0,
            debug: !1,
            useNativeSelection: !0,
            annotateUrls: !1,
            urlAnnotation: {
                attrs: {
                    "class": "url-annotation",
                    fill: "lightblue",
                    "text-decoration": "underline"
                }
            },
            textareaAttributes: {
                autocorrect: "off",
                autocomplete: "off",
                autocapitalize: "off",
                spellcheck: "false",
                tabindex: "0"
            }
        },
        className: "text-editor",
        events: {
            "keyup textarea": "onKeyup",
            "input textarea": "onInput",
            "copy textarea": "onCopy",
            "cut textarea": "onCut",
            "paste textarea": "onPaste",
            "mousedown .char-selection-box": "onMousedown",
            "dblclick .char-selection-box": "onDoubleClick",
            "click .char-selection-box": "onTripleClick"
        },
        selection: {
            start: null,
            end: null
        },
        selecting: !1,
        init: function() {
            joint.util.bindAll(this, "onMousedown", "onMousemove", "onMouseup", "onDoubleClick", "onTripleClick", "onKeydown", "onAfterPaste", "onAfterKeydown"),
              this.setTextElement(this.options.text),
              $(document.body).on("mousemove", this.onMousemove),
              $(document.body).on("mouseup", this.onMouseup),
              $(document.body).on("keydown", this.onKeydown),
              this.options.cellView ? this.$viewport = $(this.options.cellView.paper.viewport) : this.$viewport = $(this.options.text),
            this.options.annotations && this.setAnnotations(this.options.annotations)
        },
        setTextElement: function(a) {
            this.$elText && this.unbindTextElement(),
              this.options.text = a,
              this.$elText = $(a),
              this.$elText.on("mousedown", this.onMousedown),
              this.$elText.on("dblclick", this.onDoubleClick),
              this.$elText.on("click", this.onTripleClick)
        },
        render: function(a) {
            this.$caret = $("<div>", {
                "class": "caret"
            }),
              this.$selection = $("<div>"),
              this.$selectionBox = $("<div>", {
                  "class": "char-selection-box"
              }),
              this.$el.append(this.$caret, this.$selection),
              this.$textareaContainer = $("<div>", {
                  "class": "textarea-container"
              }),
              this.$textarea = $("<textarea>", this.options.textareaAttributes),
              this.textarea = this.$textarea[0],
              this._textContent = this.textarea.value = this.getTextContent(),
              this._textareaValueBeforeInput = this.textarea.value,
              this.$textareaContainer.append(this.textarea),
            this.options.focus && this.$el.append(this.$textareaContainer),
              $(a || document.body).append(this.$el);
            var b = V(this.options.text).bbox();
            return this.$textareaContainer.css({
                left: b.x,
                top: b.y
            }),
              this.focus(),
              V(this.options.text).attr("cursor", "text"),
              this.selectAll(),
              this
        },
        annotateURLBeforeCaret: function(a) {
            var b = this.getURLBoundary(Math.max(a - 1, 0));
            return !!b && (this.annotateURL(this.getAnnotations() || [], b[0], b[1]),
                !0)
        },
        hasSelection: function() {
            return joint.util.isNumber(this.selection.start) && joint.util.isNumber(this.selection.end) && this.selection.start !== this.selection.end
        },
        textContentHasChanged: function() {
            return this._textContent !== this.textarea.value
        },
        restoreTextAreaSelectionDirection: function() {
            this._selectionDirection && (this.textarea.selectionDirection = this._selectionDirection)
        },
        storeSelectionDirection: function() {
            this._selectionDirection = this.textarea.selectionDirection
        },
        onKeydown: function(a) {
            this.options.debug && console.log("onKeydown(): ", a.keyCode),
            this.hasSelection() && (this.deselect(),
              this.restoreTextAreaSelectionDirection()),
              setTimeout(this.onAfterKeydown, 0),
              this._copied = !1,
              this._selectionStartBeforeInput = this.textarea.selectionStart,
              this._selectionEndBeforeInput = this.textarea.selectionEnd
        },
        onAfterKeydown: function() {
            this.$textarea.is(":focus") && (this.storeSelectionDirection(),
              this.textarea.selectionStart === this.textarea.selectionEnd ? this.setCaret(this.textarea.selectionStart) : this.select(this.textarea.selectionStart, this.textarea.selectionEnd))
        },
        onKeyup: function(a) {
            this.textContentHasChanged() && this.onInput(a)
        },
        onCopy: function(a) {
            this._copied || this.copyToClipboard()
        },
        onCut: function(a) {
            this._copied || this.copyToClipboard()
        },
        copyToClipboard: function() {
            var a = document.queryCommandSupported && document.queryCommandSupported("copy");
            a && (this._copied = !0,
              document.execCommand("copy"))
        },
        onInput: function(a) {
            if (this.textContentHasChanged()) {
                var b = this.textarea.value.length - this._textareaValueBeforeInput.length
                  , c = {
                    start: this._selectionStartBeforeInput,
                    end: this._selectionEndBeforeInput
                }
                  , d = {
                    start: this.textarea.selectionStart,
                    end: this.textarea.selectionEnd
                };
                this.options.debug && console.log("onInput()", a, "selectionBeforeInput", c, "selectionAfterInput", d, "diffLength", b);
                var e = this.inferTextOperationType(c, d, b)
                  , f = !1
                  , g = this.getAnnotations();
                if (this.options.annotateUrls && "insert" === e) {
                    var h = this.textarea.value.substr(c.start, b);
                    this.options.debug && console.log("onInput()", "inserted text", h),
                    /\s/.test(h) && (f = this.annotateURLBeforeCaret(c.start),
                    f && (g = this.shiftAnnotations(g, d.end, b)))
                }
                if (g && (f || (g = this.annotate(g, c, d, b)),
                  this.options.debug && console.log("onInput()", "modified annotations", g),
                  this._currentAnnotationAttributes && "insert" === e)) {
                    var i = {
                        start: c.start,
                        end: d.end,
                        attrs: this._currentAnnotationAttributes
                    };
                    g.push(i),
                      this._currentAnnotationAttributes = void 0,
                    this.options.debug && console.log("onInput()", "insert annotation", i, "final annotations", g)
                }
                this._annotations = g,
                  this.trigger("text:change", this.textarea.value, this._textareaValueBeforeInput, g, c, d),
                  this._selectionBeforeInput = d,
                  this._textareaValueBeforeInput = this.textarea.value,
                  this._textContent = this.textarea.value
            }
        },
        onPaste: function(a) {
            this.options.debug && console.log("onPaste()"),
              this._textareaValueBeforeInput = this.textarea.value,
              setTimeout(this.onAfterPaste, 0)
        },
        onAfterPaste: function() {
            this.setCaret(this.textarea.selectionStart)
        },
        onMousedown: function(a) {
            if (3 !== a.originalEvent.detail) {
                this.options.debug && console.log("onMousedown()");
                var b = this.getCharNumFromEvent(a);
                this.startSelecting(),
                  this.select(b),
                  a.preventDefault(),
                  a.stopPropagation()
            }
        },
        onMousemove: function(a) {
            if (this.selectionInProgress()) {
                this.options.debug && console.log("onMousemove()");
                var b = this.getCharNumFromEvent(a);
                this.storeSelectionDirection(),
                  this.select(null, b),
                  a.preventDefault(),
                  a.stopPropagation()
            }
        },
        onMouseup: function(a) {
            this.selectionInProgress() && (this.options.debug && console.log("onMouseup()"),
              this.stopSelecting(),
              this.trigger("select:changed", this.selection.start, this.selection.end))
        },
        onDoubleClick: function(a) {
            this.options.debug && console.log("onDoubleClick()");
            var b = this.getCharNumFromEvent(a)
              , c = this.getWordBoundary(b);
            this.select(c[0], c[1]),
              a.preventDefault(),
              a.stopPropagation()
        },
        onTripleClick: function(a) {
            3 === a.originalEvent.detail && (this.options.debug && console.log("onTripleClick()"),
              this.hideCaret(),
              this.selectAll(),
              a.preventDefault(),
              a.stopPropagation())
        },
        findAnnotationsUnderCursor: function(a, b) {
            return V.findAnnotationsAtIndex(a, b)
        },
        findAnnotationsInSelection: function(a, b, c) {
            return V.findAnnotationsBetweenIndexes(a, b, c)
        },
        inferTextOperationType: function(a, b, c) {
            return a.start === a.end && b.start === b.end && c > 0 ? "insert" : a.start === a.end && b.start === b.end && c <= 0 ? "delete-single" : a.start !== a.end && b.start === b.end && b.start === a.start ? "delete" : a.start !== a.end && b.start !== a.start ? "delete-insert" : void 0
        },
        annotate: function(a, b, c, d) {
            var e = []
              , f = this.inferTextOperationType(b, c, d);
            return joint.util.toArray(a).forEach(function(a) {
                var g, h;
                switch (f) {
                    case "insert":
                        a.start < b.start && b.start <= a.end ? a.end += d : a.start >= b.start && (a.start += d,
                          a.end += d);
                        break;
                    case "delete-single":
                        a.start < b.start && b.start <= a.end && b.start !== c.start ? a.end += d : a.start <= b.start && b.start < a.end && b.start === c.start ? a.end += d : a.start >= b.start && (a.start += d,
                          a.end += d);
                        break;
                    case "delete":
                        a.start <= b.start && b.start <= a.end ? b.end <= a.end ? a.end += d : a.end += c.start - a.end : a.start >= b.start && a.start < b.end ? (g = a.end - a.start,
                          h = b.end - a.start,
                          a.start = b.start,
                          a.end = a.start + g - h) : a.start >= b.end && (a.start += d,
                          a.end += d);
                        break;
                    case "delete-insert":
                        if (a.start <= b.start && b.start <= a.end)
                            b.start < a.end && (b.end > a.end ? a.end = c.end : a.end = c.end + (a.end - b.end));
                        else if (a.start >= b.start && a.start <= b.end) {
                            var i = c.start - b.start;
                            h = b.end - a.start,
                              g = a.end - a.start,
                              a.start = b.start + i,
                              a.end = a.start + g - h
                        } else
                            a.start >= b.start && a.end <= b.end ? a.start = a.end = 0 : a.start >= b.end && (a.start += d,
                              a.end += d);
                        break;
                    default:
                        this.options.debug && console.log("ui.TextEditor: Unknown text operation.")
                }
                a.end > a.start && e.push(a)
            }, this),
              e
        },
        shiftAnnotations: function(a, b, c) {
            return V.shiftAnnotations(a, b, c)
        },
        setCurrentAnnotation: function(a) {
            this._currentAnnotationAttributes = a
        },
        setAnnotations: function(a) {
            this._annotations = a
        },
        getAnnotations: function() {
            return this._annotations
        },
        getCombinedAnnotationAttrsAtIndex: function(a, b) {
            var c = {};
            return joint.util.toArray(b).forEach(function(b) {
                void 0 === b.start && void 0 === b.end ? V.mergeAttrs(c, b.attrs) : a >= b.start && a < b.end && V.mergeAttrs(c, b.attrs)
            }),
              c
        },
        getSelectionAttrs: function(a, b) {
            var c = a.start
              , d = a.end;
            if (c === d && 0 === c)
                return this.getCombinedAnnotationAttrsAtIndex(c, b);
            if (c === d)
                return this.getCombinedAnnotationAttrsAtIndex(c - 1, b);
            for (var e, f = c; f < d; f++) {
                var g = this.getCombinedAnnotationAttrsAtIndex(f, b);
                if (e && !joint.util.isEqual(e, g)) {
                    e = joint.util.flattenObject(V.mergeAttrs({}, e)),
                      g = joint.util.flattenObject(V.mergeAttrs({}, g));
                    var h = {};
                    joint.util.forIn(g, function(a, b) {
                        e[b] === g[b] && joint.util.setByPath(h, b, a)
                    }),
                      e = h
                } else
                    e = g
            }
            return e
        },
        getTextContent: function() {
            var a = this.options.text
              , b = V(a).find(".v-line");
            return 0 === b.length ? a.textContent : b.reduce(function(a, b, c, d) {
                var e = b.node.textContent;
                return b.hasClass("v-empty-line") && (e = ""),
                  c === d.length - 1 ? a + e : a + e + "\n"
            }, "")
        },
        startSelecting: function() {
            this.selecting = !0
        },
        stopSelecting: function() {
            this.selecting = !1
        },
        selectionInProgress: function() {
            return this.selecting === !0
        },
        selectAll: function() {
            return this.select(0, this.getNumberOfChars())
        },
        select: function(a, b) {
            return this.options.debug && console.log("select(", a, b, ")"),
            void 0 === b && (b = a),
            joint.util.isNumber(a) && (this.selection.start = a),
            joint.util.isNumber(b) && (this.selection.end = b),
            joint.util.isNumber(this.selection.end) || (this.selection.end = this.selection.start),
            joint.util.isNumber(this.selection.start) && joint.util.isNumber(this.selection.end) && (this.selection.start === this.selection.end ? (this.clearSelection(),
              this.focus(),
              this.setCaret(this.selection.start)) : (this.hideCaret(),
              this.renderSelection(this.selection.start, this.selection.end)),
              this.trigger("select:change", this.selection.start, this.selection.end)),
              this
        },
        setTextAreaSelection: function(a, b) {
            var c = {
                start: a,
                end: b
            };
            c = this.normalizeSelectionRange(c),
              this.textarea.focus(),
              this.textarea.selectionStart = c.start,
              this.textarea.selectionEnd = c.end
        },
        renderSelection: function(a, b) {
            this.options.debug && console.log("renderSelection()");
            var c = {
                start: a,
                end: b
            };
            if (c = this.normalizeSelectionRange(c),
                this.clearSelection(),
                this.options.useNativeSelection) {
                this.$viewport && (this._viewportUserSelectBefore = this.$viewport.css("user-select"),
                  this.$viewport.css({
                      "-webkit-user-select": "all",
                      "-moz-user-select": "all",
                      "user-select": "all"
                  }));
                var d = c.end - c.start;
                this.selectTextInElement(this.options.text, c.start, d)
            } else
                this.renderSelectionBoxes(c.start, c.end)
        },
        normalizeSelectionStartAndLength: function(a, b, c) {
            var d = a.substr(0, b)
              , e = a.substr(b, c)
              , f = this.countLineBreaks(d)
              , g = this.countLineBreaks(e);
            b -= f,
              c -= g;
            var h = this.countEmptyLines(d)
              , i = this.countEmptyLines(e);
            return b += h,
              c += h,
              c -= h,
              c += i,
            {
                start: b,
                length: c
            }
        },
        selectTextInElement: function(a, b, c) {
            if (joint.util.isFunction(a.selectSubString) && this.selectTextInElementUsingSelectSubString(a, b, c),
                !this.actualSelectionMatchesExpectedSelection(b, c))
                try {
                    this.selectTextInElementUsingRanges(a, b, c)
                } catch (d) {
                    this.options.debug && console.log(d),
                    joint.util.isFunction(a.selectSubString) && this.selectTextInElementUsingSelectSubString(a, b, c)
                }
        },
        selectTextInElementUsingSelectSubString: function(a, b, c) {
            var d = this.normalizeSelectionStartAndLength(this.getTextContent(), b, c);
            try {
                a.selectSubString(d.start, d.length)
            } catch (e) {
                this.options.debug && console.log(e)
            }
        },
        selectTextInElementUsingRanges: function(a, b, c) {
            var d = window.getSelection();
            d.removeAllRanges();
            var e = this.normalizeSelectionStartAndLength(this.getTextContent(), b, c);
            b = 0 + e.start,
              c = 0 + e.length;
            for (var f, g, h, i, j, k, l = this.getTextNodesFromDomElement(a), m = 0, n = b + c; c > 0 && l.length > 0; )
                f = l.shift(),
                  h = m,
                  i = m + f.length,
                (h >= b && h < n || i > b && i <= n || b >= h && b < i || n > h && n <= i) && (j = Math.max(b - h, 0),
                  k = Math.min(j + Math.min(c, f.length), i),
                  g = document.createRange(),
                  g.setStart(f, j),
                  g.setEnd(f, k),
                  d.addRange(g),
                  c -= k - j),
                  m += f.length
        },
        actualSelectionMatchesExpectedSelection: function(a, b) {
            var c = window.getSelection()
              , d = c.toString()
              , e = this.getExpectedSelectedContent(a, b);
            return d = d.replace(/\s/g, " "),
            e === d
        },
        getExpectedSelectedContent: function(a, b) {
            var c = this.getTextContent()
              , d = c.substr(a, b);
            return d = d.replace(/(\n\r|\r|\n){2,}/g, "-"),
              d = d.replace(/\n\r|\r|\n/g, ""),
              d = d.replace(/\s/g, " ")
        },
        getTextNodesFromDomElement: function(a) {
            for (var b = [], c = 0, d = a.childNodes.length; c < d; c++) {
                var e = a.childNodes[c];
                void 0 !== e.tagName ? b = b.concat(this.getTextNodesFromDomElement(e)) : b.push(e)
            }
            return b
        },
        renderSelectionBoxes: function(a, b) {
            this.options.debug && console.log("renderSelectionBoxes()"),
              this.$selection.empty();
            for (var c, d, e, f = this.getFontSize(), g = this.getTextTransforms(), h = g.rotation, i = a; i < b; i++) {
                var j = this.$selectionBox.clone();
                try {
                    e = this.getCharBBox(i)
                } catch (k) {
                    this.trigger("select:out-of-range", a, b);
                    break
                }
                d && 0 === h && Math.round(e.y) === Math.round(d.y) && Math.round(e.height) === Math.round(d.height) && Math.round(e.x) === Math.round(d.x + d.width) ? c.css({
                    width: "+=" + e.width
                }) : (j.css({
                    left: e.x,
                    top: e.y - e.height,
                    width: e.width,
                    height: e.height,
                    "-webkit-transform": "rotate(" + h + "deg)",
                    "-webkit-transform-origin": "0% 100%",
                    "-moz-transform": "rotate(" + h + "deg)",
                    "-moz-transform-origin": "0% 100%"
                }),
                  this.$selection.append(j),
                  c = j),
                  d = e
            }
            e && this.$textareaContainer.css({
                left: e.x,
                top: e.y - f * g.scaleY
            })
        },
        clearSelection: function() {
            return this.options.debug && console.log("clearSelection()"),
              this.$selection.empty(),
            this.options.text.selectSubString && (this.$viewport && this._viewportUserSelectBefore && this.$viewport.css({
                "-webkit-user-select": this._viewportUserSelectBefore,
                "-moz-user-select": this._viewportUserSelectBefore,
                "user-select": this._viewportUserSelectBefore
            }),
              window.getSelection().removeAllRanges()),
              this
        },
        deselect: function() {
            return this.options.debug && console.log("deselect()"),
              this.stopSelecting(),
              this.clearSelection(),
              this.setTextAreaSelection(this.selection.start, this.selection.end),
              this
        },
        getSelectionStart: function() {
            return this.selection.start
        },
        getSelectionEnd: function() {
            return this.selection.end
        },
        getSelectionRange: function() {
            return this.normalizeSelectionRange(this.selection)
        },
        normalizeSelectionRange: function(a) {
            return a = joint.util.clone(a),
            a.start > a.end && (a.end = [a.start, a.start = a.end][0]),
              a
        },
        getSelectionLength: function() {
            var a = this.getSelectionRange();
            return a.end - a.start
        },
        getSelection: function() {
            var a = this.getSelectionRange();
            return this.getTextContent().slice(a.start, a.end)
        },
        getWordBoundary: function(a) {
            for (var b = this.textarea.value, c = /\W/, d = a; d; ) {
                if (c.test(b[d])) {
                    d += 1;
                    break
                }
                d -= 1
            }
            for (var e = this.getNumberOfChars(), f = a; f <= e && !c.test(b[f]); )
                f += 1;
            return d < f ? [d, f] : [f, d]
        },
        getURLBoundary: function(a) {
            for (var b = this.textarea.value, c = /\s/, d = /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/, e = a; e; ) {
                if (c.test(b[e])) {
                    e += 1;
                    break
                }
                e -= 1
            }
            for (var f = this.getNumberOfChars(), g = a; g <= f && !c.test(b[g]); )
                g += 1;
            if (d.test(b.substring(e, g)))
                return [e, g]
        },
        annotateURL: function(a, b, c) {
            var d = this.textarea.value.substring(b, c)
              , e = joint.util.assign({
                url: d
            }, this.options.urlAnnotation);
            return e.start = b,
              e.end = c,
            joint.util.isEqual(e, a[a.length - 1]) || a.push(e),
              a
        },
        getCharBBox: function(a) {
            if (this.isLineEnding(a)) {
                var b = this.getCharBBox(a - 1);
                return b.x = b.x2,
                  b.y = b.y2,
                  b.width = this.options.newlineCharacterBBoxWidth || 10,
                  b
            }
            var c = this.realToSvgCharNum(a)
              , d = this.options.text
              , e = d.getStartPositionOfChar(c)
              , f = d.getEndPositionOfChar(c)
              , g = d.getExtentOfChar(c);
            e = this.localToScreenCoordinates(e),
              f = this.localToScreenCoordinates(f);
            var h = this.getTextTransforms()
              , i = e.x
              , j = e.y
              , k = g.width * h.scaleX
              , l = g.height * h.scaleY;
            return {
                x: i,
                y: j,
                width: k,
                height: l,
                x2: f.x,
                y2: f.y
            }
        },
        realToSvgCharNum: function(a) {
            for (var b = 0, c = 0; c <= a; c++)
                this.isLineEnding(c) && (b += 1);
            return a - b
        },
        selectionStartToSvgCharNum: function(a) {
            return a - this.nonEmptyLinesBefore(a)
        },
        isLineEnding: function(a) {
            var b = this.textarea.value;
            return "\n" === b[a] && a > 0 && "\n" !== b[a - 1]
        },
        svgToRealCharNum: function(a) {
            for (var b = 0, c = 0; c <= a + b; c++)
                this.isLineEnding(c) && (b += 1);
            return a + b
        },
        localToScreenCoordinates: function(a) {
            return $(this.options.text).show(),
              V.transformPoint(a, this.options.text.getCTM())
        },
        getNumberOfChars: function() {
            return this.getTextContent().length
        },
        getCharNumFromEvent: function(a) {
            var b = this.options.text
              , c = a.clientX
              , d = a.clientY
              , e = V(b).toLocalPoint(c, d)
              , f = b.getCharNumAtPosition(e);
            if (f < 0)
                return this.getNumberOfChars();
            var g = this.localToScreenCoordinates(e)
              , h = this.getCharBBox(this.svgToRealCharNum(f));
            return Math.abs(h.x - g.x) < Math.abs(h.x + h.width - g.x) ? this.svgToRealCharNum(f) : this.svgToRealCharNum(f) + 1
        },
        lineNumber: function(a) {
            var b = this.textarea.value.substr(0, a);
            return this.countLineBreaks(b)
        },
        emptyLinesBefore: function(a) {
            for (var b = this.textarea.value.split(/\n\r|\r|\n/g), c = this.lineNumber(a), d = 0, e = c - 1; e >= 0; e--)
                b[e] || (d += 1);
            return d
        },
        countLineBreaks: function(a) {
            return (a.match(/\n\r|\r|\n/g) || []).length
        },
        countEmptyLines: function(a) {
            return (a.match(/(\n\r|\r|\n){2,}/g) || []).length
        },
        nonEmptyLinesBefore: function(a) {
            return this.lineNumber(a) - this.emptyLinesBefore(a)
        },
        isEmptyLine: function(a) {
            var b = this.textarea.value.split(/\n\r|\r|\n/g);
            return !b[a]
        },
        isEmptyLineUnderSelection: function(a) {
            var b = this.lineNumber(a);
            return this.isEmptyLine(b)
        },
        getTextTransforms: function() {
            var a = this.options.text.getCTM();
            return V.decomposeMatrix(a)
        },
        getFontSize: function() {
            return parseInt(V(this.options.text).attr("font-size"), 10)
        },
        getTextAnchor: function() {
            return V(this.options.text).attr("text-anchor") || ""
        },
        setCaret: function(a, b) {
            joint.util.isObject(a) && (b = a,
              a = void 0),
              b = b || {};
            var c = this.options.text
              , d = this.getNumberOfChars()
              , e = this.selection.start
              , f = this.textarea.value;
            "undefined" != typeof a && (a = Math.min(Math.max(a, 0), d),
              e = this.selection.start = this.selection.end = a),
            b.silent || this.trigger("caret:change", e),
              this.setTextAreaSelection(e, e),
            this.options.debug && console.log("setCaret(", a, b, ")", "selectionStart", e, "isLineEnding", this.isLineEnding(e), "isEmptyLineUnderSelection", this.isEmptyLineUnderSelection(e), "svgCharNum", this.selectionStartToSvgCharNum(e), "nonEmptyLinesBefore", this.nonEmptyLinesBefore(e));
            var g;
            try {
                var h;
                this.isEmptyLineUnderSelection(e) || !this.isLineEnding(e) && f.length !== e ? (h = this.selectionStartToSvgCharNum(e),
                  g = c.getStartPositionOfChar(h)) : (h = this.selectionStartToSvgCharNum(e) - 1,
                  g = c.getEndPositionOfChar(h))
            } catch (i) {
                this.trigger("caret:out-of-range", e),
                  g = {
                      x: 0,
                      y: 0
                  }
            }
            var j = this.localToScreenCoordinates(g)
              , k = this.getTextTransforms()
              , l = k.rotation
              , m = this.getFontSize() * k.scaleY;
            return this.options.placeholder && this.$caret.toggleClass("placeholder", 0 === d),
              this.$caret.css({
                  left: j.x,
                  top: j.y + (d ? -m : 0),
                  height: m,
                  "line-height": m + "px",
                  "font-size": m + "px",
                  "-webkit-transform": "rotate(" + l + "deg)",
                  "-webkit-transform-origin": "0% 100%",
                  "-moz-transform": "rotate(" + l + "deg)",
                  "-moz-transform-origin": "0% 100%"
              }).attr({
                  "text-anchor": this.getTextAnchor()
              }).show(),
              this.$textareaContainer.css({
                  left: j.x,
                  top: j.y + (d ? -m : 0)
              }),
              this.focus(),
              this
        },
        focus: function() {
            return this.options.debug && console.log("focus()"),
              this.showCaret(),
              this
        },
        blur: function() {
            return this.options.debug && console.log("blur()"),
              this.hideCaret(),
              this
        },
        showCaret: function() {
            return this.options.debug && console.log("showCaret()"),
              this.$caret.show(),
              this
        },
        hideCaret: function() {
            return this.options.debug && console.log("hideCaret()"),
              this.$caret.hide(),
              this
        },
        unbindTextElement: function() {
            this.$elText.off("mousedown", this.onMousedown),
              this.$elText.off("dblclick", this.onDoubleClick),
              this.$elText.off("click", this.onTripleClick)
        },
        onRemove: function() {
            this.deselect(),
              this.unbindTextElement(),
              $(document.body).off("mousemove", this.onMousemove),
              $(document.body).off("mouseup", this.onMouseup),
              $(document.body).off("keydown", this.onKeydown),
              V(this.options.text).attr("cursor", "")
        }
    }, joint.util.assign({
        getTextElement: function(a) {
            var b = a.tagName.toUpperCase();
            if ("TEXT" === b || "TSPAN" === b || "TEXTPATH" === b)
                return "TEXT" === b ? a : this.getTextElement(a.parentNode)
        },
        edit: function(a, b) {
            b = b || {};
            var c = b.update !== !1;
            this.options = joint.util.assign({}, b, {
                update: c
            });
            var d = this.getTextElement(a);
            if (!d)
                return void (this.options.debug && console.log("ui.TextEditor: cannot find a text element."));
            this.close(),
              this.ed = new joint.ui.TextEditor(joint.util.assign({
                  text: d
              }, b)),
              this.ed.on("all", this.trigger, this);
            var e;
            if (b.cellView) {
                if (e = b.cellView.paper.el,
                    this.cellViewUnderEdit = b.cellView,
                    this.cellViewUnderEditInteractiveOption = this.cellViewUnderEdit.options.interactive,
                    this.cellViewUnderEdit.options.interactive = !1,
                  b.annotationsProperty && !this.ed.getAnnotations()) {
                    var f = this.cellViewUnderEdit.model.prop(b.annotationsProperty);
                    f && this.ed.setAnnotations(this.deepCloneAnnotations(f))
                }
            } else {
                var g = V(d).svg();
                e = g.parentNode
            }
            return c && this.ed.on("text:change", function(a, c, e) {
                if (b.cellView) {
                    var f = null;
                    if (b.textProperty && (b.cellView.model.isLink() && "labels" === b.textProperty.substr(0, "labels".length) && (f = V($(V(d).node).closest(".label")[0]).index()),
                        b.cellView.model.prop(b.textProperty, a, {
                            textEditor: this.ed.cid
                        })),
                      b.annotationsProperty && b.cellView.model.prop(b.annotationsProperty, this.deepCloneAnnotations(e), {
                          rewrite: !0,
                          textEditor: this.ed.cid
                      }),
                      null !== f) {
                        var g = V(b.cellView.el).find(".label");
                        d = g[f].findOne("text"),
                          this.ed.setTextElement(d.node)
                    }
                } else
                    V(d).text(a, e)
            }, this),
              this.ed.render(e),
              this
        },
        close: function() {
            if (this.ed) {
                if (this.ed.options.annotateUrls) {
                    var a = this.ed.getSelectionStart()
                      , b = this.findAnnotationsUnderCursor()
                      , c = b.find(function(a) {
                        return !!a.url && a
                    });
                    if (!c) {
                        var d = this.ed.annotateURLBeforeCaret(a);
                        d && this.applyAnnotations(this.getAnnotations())
                    }
                }
                this.ed.remove(),
                this.cellViewUnderEdit && (this.cellViewUnderEdit.options.interactive = this.cellViewUnderEditInteractiveOption),
                  this.ed = this.cellViewUnderEdit = this.cellViewUnderEditInteractiveOption = void 0
            }
        },
        applyAnnotations: function(a) {
            var b = this.options;
            if (this.ed && b.update) {
                b.cellView && b.annotationsProperty ? (b.cellView.model.prop(b.annotationsProperty, this.deepCloneAnnotations(a), {
                    rewrite: !0
                }),
                  this.ed.setAnnotations(a)) : V(this.ed.options.text).text(this.ed.getTextContent(), a);
                var c = this.getSelectionRange()
                  , d = this.getSelectionLength();
                d > 0 ? this.ed.select(c.start, c.end) : this.ed.setCaret()
            }
        },
        deepCloneAnnotations: function(a) {
            try {
                return JSON.parse(JSON.stringify(a))
            } catch (b) {
                return
            }
        },
        proxy: function(a, b) {
            if (this.ed)
                return this.ed[a].apply(this.ed, b)
        },
        setCurrentAnnotation: function(a) {
            return this.proxy("setCurrentAnnotation", arguments)
        },
        getAnnotations: function() {
            return this.proxy("getAnnotations", arguments)
        },
        setCaret: function() {
            return this.proxy("setCaret", arguments)
        },
        deselect: function() {
            return this.proxy("deselect", arguments)
        },
        selectAll: function() {
            return this.proxy("selectAll", arguments)
        },
        select: function() {
            return this.proxy("select", arguments)
        },
        getNumberOfChars: function() {
            return this.proxy("getNumberOfChars", arguments)
        },
        getCharNumFromEvent: function() {
            return this.proxy("getCharNumFromEvent", arguments)
        },
        getWordBoundary: function() {
            return this.proxy("getWordBoundary", arguments)
        },
        findAnnotationsUnderCursor: function() {
            return this.proxy("findAnnotationsUnderCursor", [this.ed.getAnnotations(), this.ed.getSelectionStart()])
        },
        findAnnotationsInSelection: function() {
            if (this.ed) {
                var a = this.ed.getSelectionRange();
                return this.proxy("findAnnotationsInSelection", [this.ed.getAnnotations(), a.start, a.end])
            }
        },
        getSelectionAttrs: function(a) {
            if (this.ed) {
                var b = this.ed.getSelectionRange();
                return this.proxy("getSelectionAttrs", [b, a])
            }
        },
        getSelectionLength: function() {
            return this.proxy("getSelectionLength", arguments)
        },
        getSelectionRange: function() {
            return this.proxy("getSelectionRange", arguments)
        }
    }, Backbone.Events));
    joint.ui.Dialog = joint.mvc.View.extend({
        className: "dialog",
        events: {
            "click .bg": "action",
            "click .btn-close": "action",
            "click .controls button": "action",
            "mousedown .titlebar": "onDragStart",
            "touchstart .titlebar": "onDragStart"
        },
        options: {
            draggable: !1,
            closeButtonContent: "&times;",
            closeButton: !0,
            inlined: !1,
            modal: !0
        },
        init: function() {
            joint.util.bindAll(this, "onDrag", "onDragEnd"),
              this.buttons = this.options.buttons
        },
        render: function() {
            var a = $("<div/>", {
                "class": "bg",
                "data-action": "close"
            })
              , b = $("<div/>", {
                "class": "fg"
            })
              , c = $("<div/>", {
                "class": "titlebar"
            })
              , d = $("<div/>", {
                "class": "body"
            })
              , e = $("<button/>", {
                "class": "btn-close",
                "data-action": "close",
                html: this.options.closeButtonContent
            })
              , f = $("<div/>", {
                "class": "controls"
            });
            if (this.$el.toggleClass("draggable", !!this.options.draggable),
              this.options.type && this.$el.attr("data-type", this.options.type),
              this.options.inlined && this.$el.addClass("inlined"),
              this.options.modal && this.$el.addClass("modal"),
              this.options.width && b.width(this.options.width),
                this.options.title ? c.append(this.options.title) : c.addClass("empty"),
              this.options.content && d.append(this.options.content),
                this.buttons) {
                var g = []
                  , h = []
                  , i = [];
                this.buttons.forEach(function(a) {
                    var b = $("<button/>", {
                        "class": "control-button",
                        html: a.content,
                        "data-action": a.action
                    });
                    a.position ? "left" === a.position ? (b.addClass(a.position),
                      i.push(b)) : "center" === a.position ? (b.addClass(a.position),
                      h.push(b)) : (b.addClass(a.position),
                      g.push(b)) : g.push(b)
                }),
                  g.reverse().forEach(function(a) {
                      f.append(a)
                  }),
                  i.forEach(function(a) {
                      f.append(a)
                  }),
                  h.forEach(function(a) {
                      f.append(a)
                  })
            }
            return b.append(c, d, f),
            this.options.closeButton && b.append(e),
              this.$el.empty().append(a, b),
              this
        },
        open: function(a) {
            return this.delegateEvents(),
              this.on("action:close", this.close, this),
              $(document.body).on({
                  "mousemove.dialog touchmove.dialog": this.onDrag,
                  "mouseup.dialog touchend.dialog": this.onDragEnd
              }),
              $(a || document.body).append(this.render().el),
              this.$el.addClass("rendered"),
              this
        },
        close: function() {
            return this.remove(),
              this
        },
        onRemove: function() {
            $(document.body).off(".dialog", this.onDrag).off(".dialog", this.onDragStart)
        },
        action: function(a) {
            var b = $(a.target).closest("[data-action]")
              , c = b.attr("data-action");
            c && this.trigger("action:" + c)
        },
        onDragStart: function(a) {
            this.options.draggable && (a = joint.util.normalizeEvent(a),
              this._dx = a.clientX,
              this._dy = a.clientY,
              this._dragging = !0)
        },
        onDrag: function(a) {
            if (this._dragging) {
                a = joint.util.normalizeEvent(a);
                var b = this.$(".fg")
                  , c = b.offset();
                b.css({
                    top: c.top + (a.clientY - this._dy),
                    left: c.left + (a.clientX - this._dx),
                    margin: 0
                }),
                  this._dx = a.clientX,
                  this._dy = a.clientY
            }
        },
        onDragEnd: function() {
            this._dragging = !1
        }
    });
    joint.ui.FlashMessage = joint.ui.Dialog.extend({
        className: joint.ui.Dialog.prototype.className + " flash-message",
        options: joint.util.merge({}, joint.ui.Dialog.prototype.options, {
            closeButton: !0,
            modal: !1,
            cascade: !0,
            closeAnimation: {
                delay: 2e3,
                duration: 200,
                easing: "swing",
                properties: {
                    opacity: 0
                }
            },
            openAnimation: {
                duration: 200,
                easing: "swing",
                properties: {
                    opacity: 1
                }
            }
        }),
        init: function() {
            joint.util.bindAll(this, "startCloseAnimation"),
              joint.ui.Dialog.prototype.init.apply(this, arguments),
              this.on("close:animation:complete", this.close, this)
        },
        open: function() {
            joint.ui.Dialog.prototype.open.apply(this, arguments);
            var a = this.$(".fg");
            return this._foregroundHeight = a.height(),
              this.addToCascade(),
              a.css("height", 0),
              this.startOpenAnimation(),
            this.options.closeAnimation && this.options.closeAnimation.delay && setTimeout(this.startCloseAnimation, this.options.closeAnimation.delay),
              this
        },
        close: function() {
            return joint.ui.Dialog.prototype.close.apply(this, arguments),
              this.removeFromCascade(),
              this
        },
        addToCascade: function() {
            if (this.options.cascade) {
                var a = this.constructor.top;
                this.$(".fg").css("top", a),
                  this.constructor.top += this._foregroundHeight + this.constructor.padding
            }
            this.constructor.opened.push(this)
        },
        removeFromCascade: function() {
            if (this.options.cascade) {
                for (var a = this.constructor.opened, b = !1, c = 0; c < a.length; c++) {
                    var d = a[c];
                    if (d.options.cascade && b) {
                        var e = parseInt(d.$(".fg").css("top"), 10);
                        d.$(".fg").css("top", e - this._foregroundHeight - this.constructor.padding)
                    }
                    d === this && (b = !0)
                }
                b && (this.constructor.top -= this._foregroundHeight + this.constructor.padding)
            }
            this.constructor.opened = joint.util.without(this.constructor.opened, this)
        },
        startCloseAnimation: function() {
            this.$(".fg").animate(this.options.closeAnimation.properties, joint.util.assign({
                complete: function() {
                    this.trigger("close:animation:complete")
                }
                  .bind(this)
            }, this.options.closeAnimation))
        },
        startOpenAnimation: function() {
            var a = this.$(".fg");
            a.animate(joint.util.assign({}, this.options.openAnimation.properties, {
                height: this._foregroundHeight
            }), joint.util.assign({
                complete: function() {
                    this.trigger("open:animation:complete")
                }
                  .bind(this)
            }, this.options.openAnimation))
        }
    }, {
        top: 20,
        padding: 15,
        opened: [],
        open: function(a, b, c) {
            return c = c || {},
              new joint.ui.FlashMessage(joint.util.assign({
                  title: b,
                  type: "info",
                  content: a
              }, c)).open(c.target)
        },
        close: function() {
            joint.util.invoke(this.opened, "close")
        }
    });
    !function(a, b, c) {
        "use strict";
        var d = function() {
            a.util.bindAll(this, "handleKey"),
              this.parser = new e,
              this.enable()
        };
        a.util.assign(d.prototype, b.Events),
          d.prototype.on = function(a, c, d) {
              return b.Events.on.call(this, this.normalizeEvent(a), c, d),
                this
          }
          ,
          d.prototype.off = function(a, c, d) {
              var e = a ? this.normalizeEvent(a) : null;
              return b.Events.off.call(this, e, c, d),
                this
          }
          ,
          d.prototype.normalizeEvent = function(a) {
              if ("object" == typeof a) {
                  for (var b = Object.keys(a), c = {}, d = 0, e = b.length; d < e; d++) {
                      var f = b[d];
                      c[this.normalizeEvent(f)] = a[f]
                  }
                  return c
              }
              return this.normalizeShortcut(a)
          }
          ,
          d.prototype.normalizeShortcut = function(a) {
              if ("all" === a.toLowerCase())
                  return a;
              for (var b = this.parser.toEventObjectList(a), c = [], d = 0; d < b.length; d++)
                  c.push(this.hash(b[d]));
              return c.join(" ")
          }
          ,
          d.prototype.enable = function() {
              window.addEventListener ? (document.addEventListener("keydown", this.handleKey, !1),
                document.addEventListener("keypress", this.handleKey, !1),
                document.addEventListener("keyup", this.handleKey, !1)) : window.attachEvent && (document.attachEvent("keydown", this.handleKey, !1),
                document.attachEvent("keypress", this.handleKey, !1),
                document.attachEvent("keyup", this.handleKey, !1))
          }
          ,
          d.prototype.disable = function() {
              window.removeEventListener ? (document.removeEventListener("keydown", this.handleKey, !1),
                document.removeEventListener("keypress", this.handleKey, !1),
                document.removeEventListener("keyup", this.handleKey, !1)) : window.detachEvent && (document.detachEvent("keydown", this.handleKey, !1),
                document.detachEvent("keypress", this.handleKey, !1),
                document.detachEvent("keyup", this.handleKey, !1))
          }
          ,
          d.prototype.isActive = function(a, b) {
              return this.isModifierActive(a, b)
          }
          ,
          d.prototype.isModifierActive = function(a, b) {
              for (var c = this.parser.toEventObjectList(a), d = 0; d < c.length; d++)
                  if (c[d].modifiersCompare(b))
                      return !0;
              return !1
          }
          ,
          d.prototype.hash = function(a) {
              var b = function(a) {
                  return a ? 1 : 0
              }
                , c = [a.type, ":", a.which, b(a.shiftKey), b(a.ctrlKey), b(a.altKey), b(a.metaKey)];
              return c.join("")
          }
          ,
          d.prototype.handleKey = function(a) {
              if (!this.isUnsupportedElement(a)) {
                  var c = l.fromNative(a);
                  b.Events.trigger.call(this, this.hash(c), a)
              }
          }
          ,
          d.prototype.isUnsupportedElement = function(a) {
              var b = a.target || a.srcElement;
              if (b) {
                  var c = b.tagName.toUpperCase();
                  return "INPUT" === c || "SELECT" === c || "TEXTAREA" === c || b.isContentEditable
              }
              return !1
          }
        ;
        var e = function() {};
        e.prototype = {
            constructor: e,
            parseEventString: function(a) {
                a = a || "";
                var b, c, d = a.split("+"), f = new l(0);
                for (c = 0; c < d.length; c++) {
                    b = d[c];
                    var g = this.getModifierPropertyName(b);
                    g && (f[g] = !0),
                    1 !== d.length && void 0 !== g || (f.which = e.getCode(b))
                }
                return f
            },
            toEventObjectList: function(a) {
                var b = a.replace(/\s*\+\s*/gi, "+").split(" ");
                return b.map(this.composeEventObject, this)
            },
            composeEventObject: function(a) {
                var b = a.split(":")
                  , c = j.KEYDOWN
                  , d = b[0];
                if (b.length > 1 && (d = b[1],
                    c = b[0]),
                  k.indexOf(c) === -1)
                    throw a + ": invalid shortcut definition";
                var e = this.parseEventString(d);
                return c === j.KEYUP && g[e.which] && (e[g[e.which]] = !1),
                  e.setType(c)
            },
            getModifierPropertyName: function(a) {
                var b = f[a];
                return g[b]
            }
        },
          e.getCode = function(a) {
              return i[a] || a.toUpperCase().charCodeAt(0)
          }
        ;
        var f = {
            "⇧": 16,
            shift: 16,
            "⌥": 18,
            alt: 18,
            option: 18,
            "⌃": 17,
            ctrl: 17,
            control: 17,
            "⌘": 91,
            command: 91,
            meta: 91
        }
          , g = {
            16: "shiftKey",
            18: "altKey",
            17: "ctrlKey",
            91: "metaKey"
        }
          , h = {
            226: "\\",
            57392: "ctrl",
            63289: "num",
            59: ";",
            61: "=",
            173: "-"
        }
          , i = {
            backspace: 8,
            tab: 9,
            shift: 16,
            ctrl: 17,
            alt: 18,
            meta: 91,
            clear: 12,
            enter: 13,
            "return": 13,
            esc: 27,
            escape: 27,
            capslock: 20,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            del: 46,
            "delete": 46,
            home: 36,
            end: 35,
            insert: 45,
            ins: 45,
            pageup: 33,
            pagedown: 34,
            plus: 187,
            minus: 189,
            "-": 189,
            ",": 188,
            ".": 190,
            "/": 191,
            "`": 192,
            "=": 187,
            ";": 186,
            "'": 222,
            "[": 219,
            "]": 221,
            "\\": 220,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        }
          , j = {
            KEYPRESS: "keypress",
            KEYDOWN: "keydown",
            KEYUP: "keyup"
        }
          , k = [j.KEYPRESS, j.KEYDOWN, j.KEYUP]
          , l = function(a, b, c, d, e, f) {
            this.which = a,
              this.shiftKey = b || !1,
              this.ctrlKey = c || !1,
              this.altKey = d || !1,
              this.metaKey = e || !1,
              this.type = f || j.KEYDOWN
        };
        l.fromNative = function(a) {
            var b = a.which;
            a.type === j.KEYPRESS && (b = String.fromCharCode(a.which).toUpperCase().charCodeAt(0)),
            h[b] && (b = e.getCode(h[b]));
            var c = new l(b,a.shiftKey,a.ctrlKey,a.altKey,a.metaKey,a.type);
            return a.type === j.KEYUP && g[b] && (c[g[b]] = !1),
              c
        }
          ,
          l.prototype.modifiersCompare = function(a) {
              return !(this.shiftKey && this.shiftKey !== a.shiftKey || this.ctrlKey && this.ctrlKey !== a.ctrlKey || this.altKey && this.altKey !== a.altKey || this.metaKey && this.metaKey !== a.metaKey)
          }
          ,
          l.prototype.setType = function(a) {
              return this.type = a,
                this
          }
          ,
          a.ui.Keyboard = d
    }(joint, Backbone, _);
  /**
   * @name joint.ui.Lightbox
   * @desc
   * @path /libs/plugin/lightbox.js
   */

    joint.ui.ContextToolbar = joint.mvc.View.extend({
        className: "context-toolbar",
        eventNamespace: "context-toolbar",
        events: {
            "click .tool": "onToolPointerdown"
        },
        options: {
            padding: 20,
            autoClose: !0
        },
        init: function() {
            joint.util.bindAll(this, "onDocumentMousedown")
        },
        render: function() {
            return this.constructor.opened && this.constructor.close(),
              this.bind(),
            this.options.type && this.$el.attr("data-type", this.options.type),
              $(this.getRoot()).append(this.$el),
              this.renderContent(),
              this.position(),
              this.constructor.opened = this,
              this
        },
        renderContent: function() {
            var a = $("<div/>", {
                "class": "tools"
            });
            this.options.tools && joint.util.toArray(this.options.tools).forEach(function(b) {
                var c;
                c = b.icon ? $("<img/>", {
                    src: b.icon
                }) : b.content;
                var d = $("<button/>", {
                    "class": "tool",
                    html: c,
                    "data-action": b.action
                });
                b.attrs && d.attr(b.attrs),
                  a.append(d)
            }),
              this.$el.append(a)
        },
        getRoot: function() {
            return this.options.root || document.documentElement
        },
        position: function() {
            var a = joint.util.getElementBBox(this.options.target)
              , b = joint.util.getElementBBox(this.getRoot())
              , c = this.$el.outerWidth()
              , d = a.x + a.width / 2 - c / 2
              , e = a.y + a.height + this.options.padding;
            d -= b.x,
              e -= b.y,
              this.$el.css({
                  left: d,
                  top: e
              })
        },
        onRemove: function() {
            this.unbind(),
              this.constructor.opened = void 0
        },
        bind: function() {
            $(document).on("mousedown." + this.eventNamespace, this.onDocumentMousedown)
        },
        unbind: function() {
            return $(document).off("mousedown." + this.eventNamespace, this.onDocumentMousedown),
              this
        },
        onToolPointerdown: function(a) {
            var b = $(a.target).closest("[data-action]")
              , c = b.attr("data-action");
            c && this.trigger("action:" + c, a)
        },
        onDocumentMousedown: function(a) {
            if (this.options.autoClose) {
                var b = this.options.target;
                this.el.contains(a.target) || b.contains(a.target) || b === a.target || (this.constructor.close(),
                  this.remove())
            }
        }
    }, {
        opened: void 0,
        close: function() {
            this.opened && (this.opened.remove(),
              this.opened = void 0)
        },
        update: function() {
            this.opened && this.opened.position()
        }
    });
    joint.ui.Popup = joint.ui.ContextToolbar.extend({
        className: "popup",
        eventNamespace: "popup",
        events: {},
        renderContent: function() {
            var a = joint.util.isFunction(this.options.content) ? this.options.content(this.el) : this.options.content;
            a && this.$el.html(a)
        }
    });
    joint.ui.SelectBox = joint.mvc.View.extend({
        className: "select-box",
        events: {
            "click .select-box-selection": "onToggle"
        },
        options: {
            options: [],
            width: void 0,
            openPolicy: "auto",
            target: null,
            keyboardNavigation: !0,
            selected: void 0,
            selectBoxOptionsClass: void 0,
            disabled: !1
        },
        init: function() {
            this.options.target = this.options.target || document.body,
              joint.util.bindAll(this, "onOutsideClick", "onOptionSelect"),
              $(document).on("click.selectBox", this.onOutsideClick),
              this.$el.data("view", this),
              void 0 === this.options.selected ? this.selection = joint.util.toArray(this.options.options).find(function(a) {
                    return a.selected === !0
                }) || this.options.options[0] : this.selection = this.options.options[this.options.selected]
        },
        render: function() {
            return this.$el.empty(),
              this.$selection = null,
              this.renderSelection(this.selection),
            this.options.width && this.$el.css("width", this.options.width),
            this.options.disabled && this.disable(),
              this.$el.append(this.$options),
              this
        },
        renderOptions: function() {
            this.removeOptions();
            var a = this.options
              , b = {
                selectBoxView: this,
                parentClassName: joint.util.result(this, "className") || null,
                extraClassName: joint.util.result(a, "selectBoxOptionsClass") || null,
                options: a.options
            };
            a.width && (b.width = a.width),
            a.theme && (b.theme = a.theme);
            var c = this.optionsView = new this.constructor.OptionsView(b);
            c.render(),
              this.listenTo(c, "option:select", this.onOptionSelect),
              this.listenTo(c, "option:hover", this.onOptionHover),
              this.listenTo(c, "options:mouseout", this.onOptionsMouseOut),
              this.$options = c.$el,
              this.$optionsArrow = c.$arrow,
              this.$target = $(a.target)
        },
        onOptionHover: function(a, b) {
            this.trigger("option:hover", a, b)
        },
        onOptionsMouseOut: function(a) {
            this.trigger("options:mouseout", a)
        },
        onOptionSelect: function(a, b) {
            this.select(a, b)
        },
        removeOptions: function() {
            this.optionsView && (this.stopListening(this.optionsView),
              this.optionsView.remove(),
              this.optionsView = null)
        },
        renderSelection: function(a) {
            if (this.$selection || (this.$selection = $("<div/>", {
                  "class": "select-box-selection"
              }),
                this.$el.append(this.$selection)),
                this.$selection.empty(),
                a) {
                var b = this.constructor.OptionsView.prototype.renderOptionContent.call(void 0, a);
                this.$selection.append(b)
            } else if (this.options.placeholder) {
                var c = $("<div/>", {
                    "class": "select-box-placeholder",
                    html: this.options.placeholder
                });
                this.$selection.append(c)
            }
        },
        onToggle: function(a) {
            this.toggle()
        },
        onOutsideClick: function(a) {
            !this.el.contains(a.target) && this.$el.hasClass("opened") && this.close()
        },
        getSelection: function() {
            return this.selection
        },
        getSelectionValue: function(a) {
            return a = a || this.selection,
            a && (void 0 === a.value ? a.content : a.value)
        },
        getSelectionIndex: function() {
            return joint.util.toArray(this.options.options).findIndex(function(a) {
                return a === this.selection
            })
        },
        select: function(a, b) {
            this.selection = this.options.options[a],
              this.renderSelection(this.selection),
              this.trigger("option:select", this.selection, a, b),
              this.close()
        },
        selectByValue: function(a, b) {
            for (var c = this.options.options || [], d = 0; d < c.length; d++) {
                var e = c[d];
                if (void 0 === e.value && e.content === a)
                    return this.select(d, b);
                if (void 0 !== e.value && joint.util.isEqual(e.value, a))
                    return this.select(d, b)
            }
        },
        isOpen: function() {
            return this.$el.hasClass("opened")
        },
        toggle: function() {
            this.isOpen() ? this.close() : this.open()
        },
        position: function() {
            var a = this.$(".select-box-selection")
              , b = a.outerHeight()
              , c = a.offset()
              , d = c.left
              , e = c.top
              , f = this.$options.outerHeight()
              , g = {
                left: 0,
                top: 0
            };
            this.options.target !== document.body ? (g = this.$target.offset(),
              g.width = this.$target.outerWidth(),
              g.height = this.$target.outerHeight(),
              g.left -= this.$target.scrollLeft(),
              g.top -= this.$target.scrollTop()) : (g.width = $(window).width(),
              g.height = $(window).height());
            var h = d
              , i = "auto"
              , j = this.options.openPolicy;
            switch ("selected" !== j || this.selection || (j = "auto"),
              j) {
                case "above":
                    i = e - f;
                    break;
                case "coverAbove":
                    i = e - f + b;
                    break;
                case "below":
                    i = e + b;
                    break;
                case "coverBelow":
                    i = e;
                    break;
                case "selected":
                    var k = this.$options.find(".selected").position();
                    i = e - k.top;
                    break;
                default:
                    var l = e - this.$target.scrollTop() + f > g.top + g.height;
                    i = l ? e - f + b : e
            }
            h -= g.left,
              i -= g.top,
              this.$options.css({
                  left: h,
                  top: i
              })
        },
        open: function() {
            this.isDisabled() || (this.renderOptions(),
              this.$options.appendTo(this.options.target),
              this.$options.addClass("rendered"),
              this.position(),
              this.$el.addClass("opened"),
              this.respectWindowBoundaries(),
              this.alignOptionsArrow())
        },
        respectWindowBoundaries: function() {
            var a = this.calculateElOverflow(this.$options)
              , b = {
                left: 0,
                top: 0
            };
            this.$options.outerWidth() <= this.$target.innerWidth() && (a.left && a.right || (a.left ? b.left = a.left : a.right && (b.left = -a.right))),
            this.$options.outerHeight() <= this.$target.innerHeight() && (a.top && a.bottom || (a.top ? b.top = a.top : a.bottom && (b.top = -a.bottom))),
              this.$options.css({
                  left: "+=" + b.left,
                  top: "+=" + b.top
              })
        },
        alignOptionsArrow: function() {
            var a = this.$el[0].getBoundingClientRect()
              , b = this.$options[0].getBoundingClientRect()
              , c = a.left + a.width / 2;
            c -= b.left,
              c -= this.$optionsArrow.outerWidth() / 2,
              this.$optionsArrow.css({
                  left: c
              })
        },
        close: function() {
            this.removeOptions(),
              this.$el.removeClass("opened"),
              this.trigger("close")
        },
        onRemove: function() {
            this.removeOptions(),
              $(document).off(".selectBox", this.onOutsideClick)
        },
        isDisabled: function() {
            return this.$el.hasClass("disabled")
        },
        enable: function() {
            this.$el.removeClass("disabled")
        },
        disable: function() {
            this.close(),
              this.$el.addClass("disabled")
        },
        onSetTheme: function(a, b) {
            this.$options && (a && this.$options.removeClass(this.themeClassNamePrefix + a),
              this.$options.addClass(this.themeClassNamePrefix + b))
        },
        calculateElOverflow: function(a, b) {
            b || (b = window),
            a instanceof $ && (a = a[0]),
            b instanceof $ && (b = b[0]);
            var c, d = {}, e = a.getBoundingClientRect();
            if (b === window) {
                var f = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                  , g = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                c = {
                    width: f,
                    height: g,
                    left: 0,
                    top: 0,
                    right: f,
                    bottom: g
                }
            } else
                c = b.getBoundingClientRect();
            return ["left", "top"].forEach(function(a) {
                d[a] = Math.min(0, e[a] - c[a])
            }),
              ["right", "bottom"].forEach(function(a) {
                  d[a] = Math.min(0, c[a] - e[a])
              }),
              joint.util.forIn(d, function(a, b) {
                  d[b] = Math.abs(Math.round(a))
              }),
              d
        }
    }, {
        OptionsView: joint.mvc.View.extend({
            events: {
                "mouseover .select-box-option": "onOptionHover",
                "click .select-box-option": "onOptionClick"
            },
            className: function() {
                var a = ["select-box-options"]
                  , b = this.options.parentClassName;
                return b && a.push(b),
                  a.join(" ")
            },
            init: function() {
                joint.util.bindAll(this, "onMouseout", "onKeydown"),
                  $(document).on({
                      "keydown.selectBoxOptions": this.onKeydown,
                      "mouseleave.selectBoxOptions mouseout.selectBoxOptions": this.onMouseout
                  })
            },
            render: function() {
                var a = this.options.extraClassName;
                return a && this.$el.addClass(a),
                this.options.width && this.$el.css("width", this.options.width),
                  joint.util.toArray(this.options.options).forEach(function(a, b) {
                      var c = this.renderOption(a, b);
                      this.options.selectBoxView.selection === a && c.addClass("selected hover"),
                        this.$el.append(c)
                  }, this),
                  this.$arrow = $("<div/>").addClass("select-box-options-arrow").appendTo(this.$el),
                  this
            },
            renderOption: function(a, b) {
                var c = this.renderOptionContent(a);
                return c.addClass("select-box-option"),
                  c.data("index", b),
                  c
            },
            renderOptionContent: function(a) {
                var b = $("<div/>", {
                    "class": "select-box-option-content",
                    html: a.content
                });
                return a.icon && b.prepend($("<img/>", {
                    "class": "select-box-option-icon",
                    src: a.icon
                })),
                  b
            },
            select: function(a, b) {
                this.trigger("option:select", a, b)
            },
            hover: function(a) {
                var b = this.options.options[a];
                this.markOptionHover(a),
                  this.trigger("option:hover", b, a)
            },
            onOptionClick: function(a) {
                var b = this.getOptionIndex(a.target);
                this.select(b, {
                    ui: !0
                })
            },
            onOptionHover: function(a) {
                var b = this.getOptionIndex(a.target);
                this.hover(b)
            },
            onMouseout: function(a) {
                this.trigger("options:mouseout", a)
            },
            onKeydown: function(a) {
                var b = this.options.selectBoxView;
                if (b.options.keyboardNavigation && b.isOpen()) {
                    var c;
                    switch (a.which) {
                        case 39:
                        case 40:
                            c = 1;
                            break;
                        case 38:
                        case 37:
                            c = -1;
                            break;
                        case 13:
                            var d = this.getOptionHoverIndex();
                            return void (d >= 0 && this.select(d));
                        case 27:
                            return b.close();
                        default:
                            return
                    }
                    a.preventDefault();
                    var e = this.getOptionHoverIndex()
                      , f = e + c
                      , g = this.options.options;
                    f < 0 && (f = g.length - 1),
                    f >= g.length && (f = 0),
                      this.hover(f)
                }
            },
            onRemove: function() {
                $(document).off(".selectBoxOptions")
            },
            markOptionHover: function(a) {
                this.$el.find(".hover").removeClass("hover"),
                  $(this.$el.find(".select-box-option")[a]).addClass("hover")
            },
            getOptionHoverIndex: function() {
                return this.$el.find(".select-box-option.hover").index()
            },
            getOptionIndex: function(a) {
                return $(a).closest(".select-box-option").data("index")
            }
        })
    });
    joint.ui.ColorPalette = joint.ui.SelectBox.extend({
        className: "select-box color-palette",
        position: function() {
            var a = this.$(".select-box-selection")
              , b = a.outerHeight()
              , c = a.offset()
              , d = c.left
              , e = c.top + b;
            if (this.options.target !== document.body) {
                this.$target = this.$target || $(this.options.target);
                var f = this.$target.offset();
                d -= f.left - this.$target.scrollLeft(),
                  e -= f.top - this.$target.scrollTop()
            }
            this.$options.css({
                left: d,
                top: e
            })
        }
    }, {
        OptionsView: joint.ui.SelectBox.OptionsView.extend({
            renderOptionContent: function(a) {
                var b = $("<div/>", {
                    "class": "select-box-option-content"
                });
                return b.css("background-color", a.content),
                a.icon && b.prepend($("<img/>", {
                    "class": "select-box-option-icon",
                    src: a.icon
                })),
                  b
            }
        })
    });
    joint.ui.SelectButtonGroup = joint.mvc.View.extend({
        className: "select-button-group",
        events: {
            "click .select-button-group-button": "onSelect",
            "mouseover .select-button-group-button": "onOptionHover",
            mouseleave: "onMouseOut",
            "mousedown .select-button-group-button": "pointerdown",
            "touchstart .select-button-group-button": "pointerdown",
            "mouseup .select-button-group-button": "pointerup",
            "touchend .select-button-group-button": "pointerup"
        },
        options: {
            buttonWidth: void 0,
            buttonHeight: void 0,
            options: [],
            disabled: !1,
            multi: !1,
            selected: void 0
        },
        init: function() {
            joint.util.bindAll(this, "onSelect", "pointerup"),
              this.$el.data("view", this);
            var a = this.options.multi
              , b = this.options.options
              , c = this.options.selected;
            if (void 0 === c) {
                var d = joint.util.toArray(b).filter(function(a) {
                    return a && a.selected === !0
                });
                this.selection = a ? d : d[0]
            } else
                a ? this.selection = Array.isArray(c) ? b.filter(function(a, b) {
                    return c.includes(b)
                }) : [b[c]] : this.selection = b[c]
        },
        render: function() {
            return this.renderOptions(this.selection),
            this.options.width && this.$el.css("width", this.options.width),
            this.options.disabled && this.disable(),
              this.$el.append(this.$options),
              this
        },
        renderOptions: function() {
            this.removeOptions();
            var a = this.options.multi;
            joint.util.toArray(this.options.options).forEach(function(b, c) {
                var d = a ? this.selection.includes(b) : this.selection === b
                  , e = this.renderOption(b, c, d);
                this.$el.append(e),
                d && e.addClass("selected")
            }, this)
        },
        removeOptions: function() {
            this.$el.empty()
        },
        renderOption: function(a, b, c) {
            var d = this.renderOptionContent(a, c);
            d.data("index", b);
            var e = a.buttonWidth || this.options.buttonWidth;
            e && d.css("width", e);
            var f = a.buttonHeight || this.options.buttonHeight;
            return f && d.css("height", f),
              d
        },
        renderOptionContent: function(a, b) {
            var c = $("<div/>", {
                "class": "select-button-group-button",
                html: a.content
            });
            if (a.icon || b && a.iconSelected) {
                var d = $("<img/>", {
                    "class": "select-button-group-button-icon",
                    src: b && a.iconSelected ? a.iconSelected : a.icon
                })
                  , e = a.iconWidth || this.options.iconWidth;
                e && d.css("width", e);
                var f = a.iconHeight || this.options.iconHeight;
                f && d.css("height", f),
                  c.prepend(d)
            }
            return joint.util.setAttributesBySelector(c, a.attrs),
              c
        },
        getOptionIndex: function(a) {
            return $(a).closest(".select-button-group-button").data("index")
        },
        onSelect: function(a) {
            if (!this.isDisabled()) {
                var b = this.getOptionIndex(a.target);
                this.select(b, {
                    ui: !0
                })
            }
        },
        onOptionHover: function(a) {
            if (!this.isDisabled()) {
                var b = this.getOptionIndex(a.target);
                this.trigger("option:hover", this.options.options[b], b)
            }
        },
        onMouseOut: function(a) {
            this.isDisabled() || this.trigger("mouseout", a)
        },
        getSelection: function() {
            return this.selection
        },
        getSelectionValue: function(a) {
            if (a = a || this.selection)
                return this.options.multi ? joint.util.toArray(a).map(function(a) {
                    return void 0 === a.value ? a.content : a.value
                }) : void 0 === a.value ? a.content : a.value
        },
        select: function(a, b) {
            var c = this.options.options[a]
              , d = $(this.$(".select-button-group-button")[a])
              , e = this.options.multi;
            if (e) {
                d.toggleClass("selected");
                var f = d.hasClass("selected");
                f ? this.selection.indexOf(c) === -1 && this.selection.push(c) : this.selection = joint.util.without(this.selection, c),
                c.iconSelected && d.find(".select-button-group-button-icon").attr("src", f ? c.iconSelected : c.icon)
            } else {
                this.selection = c;
                var g = this.$(".selected")
                  , h = this.options.options[g.index()];
                g.removeClass("selected"),
                  d.addClass("selected"),
                h && h.iconSelected && g.find(".select-button-group-button-icon").attr("src", h.icon),
                this.selection.iconSelected && d.find(".select-button-group-button-icon").attr("src", this.selection.iconSelected)
            }
            this.trigger("option:select", this.selection, a, b)
        },
        selectByValue: function(a, b) {
            Array.isArray(a) || (a = [a]);
            for (var c = this.options.options || [], d = 0; d < c.length; d++) {
                var e = c[d];
                if (void 0 === e.value && a.includes(e.content))
                    this.select(d, b);
                else if (void 0 !== e.value) {
                    var f = a.find(function(a) {
                        return joint.util.isEqual(a, e.value)
                    });
                    f && this.select(d, b)
                }
            }
        },
        deselect: function() {
            this.$(".selected").removeClass("selected"),
              this.options.multi ? this.selection = [] : this.selection = void 0
        },
        isDisabled: function() {
            return this.$el.hasClass("disabled")
        },
        enable: function() {
            this.$el.removeClass("disabled")
        },
        disable: function() {
            this.$el.addClass("disabled")
        },
        pointerdown: function(a) {
            var b = this.getOptionIndex(a.target)
              , c = $(this.$(".select-button-group-button")[b]);
            c.addClass("is-in-action"),
              $(document).on("mouseup.select-button-group touchend.select-button-group", this.pointerup)
        },
        pointerup: function() {
            this.$(".is-in-action").removeClass("is-in-action"),
              $(document).off("mouseup.select-button-group touchend.select-button-group")
        }
    });

  /**
   * @name joint.ui.Navigator
   * @desc 缩略图导航
   * @path /libs/plugin/navigator.js
   */



  joint.ui.TreeLayoutView = joint.mvc.View.extend({
        MINIMAL_PREVIEW_SIZE: 10,
        className: "tree-layout",
        options: {
            previewAttrs: {
                parent: {
                    rx: 2,
                    ry: 2
                }
            },
            useModelGeometry: !1,
            clone: function(a) {
                return a.clone()
            },
            canInteract: function() {
                return !0
            }
        },
        init: function() {
            joint.util.bindAll(this, "onPointermove", "onPointerup"),
              this.toggleDefaultInteraction(!1),
              this.startListening(),
              this.render(),
              this.onSetTheme(null, this.theme)
        },
        startListening: function() {
            var a = this.options.paper;
            this.listenTo(a, "element:pointerdown", this.canInteract(this.onPointerdown))
        },
        toggleDefaultInteraction: function(a) {
            this.options.paper.setInteractivity(a)
        },
        render: function() {
            var a = this.options.paper;
            return this.$activeBox = $("<div>").addClass("tree-layout-box active hidden").appendTo(this.el),
              this.draggingPaper = new joint.dia.Paper({
                  model: new joint.dia.Graph,
                  interactive: !1,
                  width: "100%",
                  height: "100%"
              }),
              this.$translateBox = $("<div>").addClass("tree-layout-box translate hidden").append(this.draggingPaper.render().el).appendTo(this.el),
              this.$mask = $("<div>").addClass("tree-layout-mask"),
              this.svgViewport = V(a.viewport),
              this.svgPreviewChild = V("circle").attr(this.options.previewAttrs.child || {}).addClass("tree-layout-preview child"),
              this.svgPreviewConnection = V("path").attr(this.options.previewAttrs.link || {}).addClass("tree-layout-preview link"),
              this.svgPreviewParent = V("rect").attr(this.options.previewAttrs.parent || {}).addClass("tree-layout-preview parent"),
              this.svgPreview = V("g").addClass("tree-layout-preview-group").append([this.svgPreviewConnection, this.svgPreviewParent, this.svgPreviewChild]),
              this.$el.appendTo(a.el),
              this
        },
        onSetTheme: function(a, b) {
            var c = [this.svgPreview, this.$mask];
            c.forEach(function(c) {
                c && (a && c.removeClass(this.themeClassNamePrefix + a),
                  c.addClass(this.themeClassNamePrefix + b))
            }, this)
        },
        onRemove: function() {
            this.svgPreview.remove()
        },
        toggleDropping: function(a) {
            this.$mask.toggleClass("dropping-not-allowed", !a),
              this.$translateBox.toggleClass("no-drop", !a)
        },
        canDrop: function() {
            return this.isActive() && !this.$translateBox.hasClass("no-drop")
        },
        isActive: function() {
            return !this.$translateBox.hasClass("hidden")
        },
        _startDrag: function(a, b, c) {
            var d = this.options.paper;
            this.$mask.appendTo(d.el),
              this.toggleDropping(!1),
              this.ctm = d.matrix();
            var e = a[0]
              , f = e.findView(d)
              , g = f.getBBox({
                useModelGeometry: this.options.useModelGeometry
            });
            this.updateBox(this.$translateBox, joint.util.defaults({
                x: b,
                y: c
            }, g)),
              this.updateBox(this.$activeBox, g),
              this.$activeBox.removeClass("hidden"),
              this.$translateBox.removeClass("hidden"),
              this.prepareDraggingPaper(e)
        },
        updateBox: function(a, b) {
            a.css({
                width: b.width,
                height: b.height,
                left: b.x,
                top: b.y
            })
        },
        positionTranslateBox: function(a) {
            var b = V.transformPoint(a, this.ctm);
            this.$translateBox.css({
                left: b.x,
                top: b.y
            })
        },
        prepareDraggingPaper: function(a) {
            var b = this.options.clone(a).position(0, 0);
            this.draggingPaper.scale(this.ctm.a, this.ctm.d),
              this.draggingPaper.model.resetCells([b])
        },
        _doDrag: function(a, b, c) {
            var d, e, f = this.model, g = {
                x: b,
                y: c
            };
            if (this.candidate && (this.candidate = null,
                this.hidePreview()),
                this.positionTranslateBox(g),
                d = f.getMinimalRootAreaByPoint(g),
              d && (e = d.findMinimalAreaByPoint(g, {
                  expandBy: Math.min(f.get("siblingGap"), f.get("gap")) / 2
              })),
                e) {
                var h = this.findDirection(e, g)
                  , i = e.getLayoutSiblings(h)
                  , j = i.getSiblingRankByPoint(g)
                  , k = joint.util.toArray(a).every(function(a) {
                    return this.isConnectionValid(a, i, j)
                }, this);
                k ? (this.candidate = {
                    id: e.root.id,
                    direction: h,
                    siblingRank: j + .5
                },
                  this.updatePreview(i, j),
                  this.showPreview(),
                  this.toggleDropping(!0)) : this.toggleDropping(!1)
            } else
                this.toggleDropping(!0)
        },
        _finishDrag: function(a, b, c) {
            this.$mask.remove().removeClass("dropping-not-allowed"),
              this.candidate ? (a.forEach(function(a) {
                  this.reconnectElement(a, this.candidate)
              }, this),
                this.candidate = null,
                this.model.layout({
                    ui: !0
                })) : this.canDrop() && (a.forEach(function(a) {
                  this.translateElement(a, b, c)
              }, this),
                this.model.layout({
                    ui: !0
                })),
              this.$activeBox.addClass("hidden"),
              this.$translateBox.addClass("hidden"),
              this.hidePreview()
        },
        reconnectElement: function(a, b) {
            var c = {
                direction: b.direction,
                siblingRank: b.siblingRank,
                ui: !0
            }
              , d = this.model.reconnectElement(a, b.id, c);
            if (!d) {
                var e = this.options.paper
                  , f = e.getDefaultLink(a.findView(e));
                f.set({
                    source: {
                        id: b.id
                    },
                    target: {
                        id: a.id
                    }
                }),
                  f.addTo(e.model, c),
                  this.model.changeSiblingRank(a, b.siblingRank, c),
                  this.model.changeDirection(a, b.direction, c);
                var g = this.model.getAttribute(a, "direction");
                this.model.updateDirections(a, [g, b.direction], c)
            }
        },
        translateElement: function(a, b, c) {
            var d = this.model.graph.getConnectedLinks(a, {
                inbound: !0
            });
            joint.util.invoke(d, "remove");
            var e = a.get("size");
            a.set("position", {
                x: b - e.width / 2,
                y: c - e.height / 2
            }, {
                ui: !0
            })
        },
        updatePreview: function(a, b) {
            var c = a.parentArea.root
              , d = Math.max(this.model.get("siblingGap") / 2, this.MINIMAL_PREVIEW_SIZE)
              , e = {
                width: d,
                height: d
            }
              , f = a.getNeighborPointFromRank(b)
              , g = a.getConnectionPoints(f, {
                ignoreSiblings: !0
            })
              , h = a.getParentConnectionPoint()
              , i = a.getChildConnectionPoint(f, e);
            this.updateParentPreview(c.get("position"), c.get("size")),
              this.updateChildPreview(f, e),
              this.updateConnectionPreview(h, i, g)
        },
        showPreview: function() {
            this.svgViewport.append(this.svgPreview)
        },
        hidePreview: function() {
            this.svgPreview.remove()
        },
        updateParentPreview: function(a, b) {
            this.svgPreviewParent.attr({
                x: a.x,
                y: a.y,
                width: b.width,
                height: b.height
            })
        },
        updateChildPreview: function(a, b) {
            this.svgPreviewChild.attr({
                cx: a.x,
                cy: a.y,
                r: b.width / 2
            })
        },
        updateConnectionPreview: function(a, b, c) {
            this.svgPreviewConnection.attr({
                d: joint.connectors.rounded(a, b, c, {})
            })
        },
        findDirection: function(a, b) {
            var c, d = a.root.get("layout") || a.getType();
            switch (d) {
                case "BL-BR":
                case "TL-TR":
                case "L-R":
                    return c = d.split("-"),
                      b.x > a.rootCX ? c[1] : c[0];
                case "BL-TL":
                case "BR-TR":
                case "B-T":
                    return c = d.split("-"),
                      b.y > a.rootCY ? c[0] : c[1];
                case "L":
                case "R":
                case "T":
                case "B":
                case "TR":
                case "TL":
                case "BR":
                case "BL":
                    return d;
                default:
                    return a.direction
            }
        },
        isConnectionValid: function(a, b, c) {
            if (a.id == b.parentArea.root.id)
                return !1;
            if (this.model.graph.isSuccessor(a, b.parentArea.root))
                return !1;
            var d = this.model.getLayoutArea(a);
            if (d.parentArea && d.parentArea == b.parentArea && d.direction == b.direction) {
                var e = d.siblingRank - c;
                if (0 === e || 1 === e)
                    return !1
            }
            return !0
        },
        canInteract: function(a) {
            return function(b) {
                this.options.canInteract(b) && a.apply(this, arguments)
            }
              .bind(this)
        },
        startDragging: function(a) {
            var b = Array.isArray(a) ? a : [a];
            joint.util.isEmpty(b) || (this._registerPointerEvents(),
              this._moveCounter = 0,
              this._draggedElements = b)
        },
        onPointerdown: function(a) {
            this.startDragging(a.model)
        },
        onPointermove: function(a) {
            var b = this.options.paper
              , c = b.clientToLocalPoint({
                x: a.clientX,
                y: a.clientY
            });
            this._moveCounter === b.options.clickThreshold ? this._startDrag(this._draggedElements, c.x, c.y) : this._moveCounter > b.options.clickThreshold && this._doDrag(this._draggedElements, c.x, c.y),
              this._moveCounter++
        },
        onPointerup: function(a) {
            var b = this.options.paper;
            if (this._moveCounter >= b.options.clickThreshold) {
                var c = b.clientToLocalPoint({
                    x: a.clientX,
                    y: a.clientY
                });
                this._finishDrag(this._draggedElements, c.x, c.y)
            }
            this._draggedElements = null,
              this._unregisterPointerEvents()
        },
        _registerPointerEvents: function() {
            var a = this.getEventNamespace();
            $(document).on("mousemove" + a + " touchmove" + a, this.onPointermove).on("mouseup" + a + " touchend" + a, this.onPointerup)
        },
        _unregisterPointerEvents: function() {
            $(document).off(this.getEventNamespace())
        }
    });


  joint.ui.PathDrawer = joint.mvc.View.extend({
        tagName: "g",
        svgElement: !0,
        className: "path-drawer",
        events: {
            "mousedown .start-point": "onStartPointPointerDown",
            mousedown: "onPointerDown",
            "touchstart .start-point": "onStartPointPointerDown",
            touchstart: "onPointerDown",
            dblclick: "onDoubleClick",
            contextmenu: "onContextMenu"
        },
        options: {
            pathAttributes: {
                "class": null,
                fill: "#ffffff",
                stroke: "#000000",
                "stroke-width": 1,
                "pointer-events": "none"
            },
            startPointMarkup: '<circle r="5"/>'
        },
        init: function() {
            var a = this.svgTarget = V(this.options.target);
            this.$document = $(a.node.ownerDocument),
              this.action = "awaiting-input",
              this.render()
        },
        bindDocumentEvents: function() {
            var a = this.getEventNamespace();
            this.$document.on("mousemove" + a + " touchmove" + a, _.bind(this.onPointerMove, this)),
              this.$document.on("mouseup" + a + " touchend" + a, _.bind(this.onPointerUp, this))
        },
        unbindDocumentEvents: function() {
            this.$document.off(this.getEventNamespace())
        },
        onRemove: function() {
            var a = this.pathNode;
            a && V(a).remove(),
              this.clear()
        },
        clear: function() {
            var a = this.pathNode;
            a && a.pathSegList.numberOfItems <= 1 && V(a).remove(),
              this.svgStart.remove(),
              this.svgControl.remove(),
              this.pathNode = null,
              this.unbindDocumentEvents(),
              this.action = "awaiting-input",
              this.trigger("clear")
        },
        render: function() {
            var a = this.options;
            return this.svgPathTemplate = V("path").attr(a.pathAttributes),
              this.svgStart = V(a.startPointMarkup).addClass("start-point"),
              this.svgControl = V("path").addClass("control-path"),
              this.vel.append(V("rect", {
                  x: 0,
                  y: 0,
                  width: "100%",
                  height: "100%",
                  fill: "transparent",
                  stroke: "none"
              })),
              this.svgTarget.append(this.el),
              this
        },
        createPath: function(a, b) {
            var c = this.svgPathTemplate.clone()
              , d = this.pathNode = c.node
              , e = this.svgStart.translate(a, b, {
                absolute: !0
            });
            this.trigger("path:create", d),
              this.addMoveSegment(a, b),
              this.vel.before(c),
              this.vel.append(e)
        },
        closePath: function() {
            var a = this.pathNode
              , b = a.pathSegList.getItem(0)
              , c = a.pathSegList.getItem(a.pathSegList.numberOfItems - 1);
            c.pathSegType == SVGPathSeg.PATHSEG_LINETO_ABS ? a.pathSegList.replaceItem(a.createSVGPathSegClosePath(), a.pathSegList.numberOfItems - 1) : (c.x = b.x,
              c.y = b.y,
              a.pathSegList.appendItem(a.createSVGPathSegClosePath())),
              this.finishPath("path:close")
        },
        finishPath: function(a) {
            var b = this.pathNode;
            b && this.numberOfVisibleSegments() > 0 ? (this.trigger("path:finish", b),
              this.trigger(a, b)) : this.trigger("path:abort", b),
              this.clear()
        },
        numberOfVisibleSegments: function() {
            var a = this.pathNode
              , b = a.pathSegList.numberOfItems;
            return b -= 1,
            a.pathSegList.getItem(a.pathSegList.numberOfItems - 1).pathSegType == SVGPathSeg.PATHSEG_CLOSEPATH && (b -= 1),
              b
        },
        addMoveSegment: function(a, b) {
            var c = this.pathNode
              , d = c.createSVGPathSegMovetoAbs(a, b);
            c.pathSegList.appendItem(d),
              this.trigger("path:segment:add", c),
              this.trigger("path:move-segment:add", c)
        },
        addLineSegment: function(a, b) {
            var c = this.pathNode
              , d = c.createSVGPathSegLinetoAbs(a, b);
            c.pathSegList.appendItem(d),
              this.trigger("path:segment:add", c),
              this.trigger("path:line-segment:add", c)
        },
        addCurveSegment: function(a, b, c, d, e, f) {
            var g = this.pathNode
              , h = g.createSVGPathSegCurvetoCubicAbs(a, b, c, d, e || a, f || b);
            g.pathSegList.appendItem(h),
              this.trigger("path:segment:add", g),
              this.trigger("path:curve-segment:add", g)
        },
        adjustLastSegment: function(a, b, c, d, e, f) {
            var g = this.pathNode
              , h = g.pathSegList.getItem(g.pathSegList.numberOfItems - 1);
            null !== a && (h.x = a),
            null !== b && (h.y = b),
            null !== c && (h.x1 = c),
            null !== d && (h.y1 = d),
            null !== e && (h.x2 = e),
            null !== f && (h.y2 = f),
              this.trigger("path:edit", g),
              this.trigger("path:last-segment:adjust", g)
        },
        removeLastSegment: function() {
            var a = this.pathNode;
            a.pathSegList.removeItem(a.pathSegList.numberOfItems - 1),
              this.trigger("path:edit", a),
              this.trigger("path:last-segment:remove", a)
        },
        findControlPoint: function(a, b) {
            var c = this.pathNode
              , d = c.pathSegList.getItem(c.pathSegList.numberOfItems - 1);
            return g.point(a, b).reflection(d)
        },
        replaceLastSegmentWithCurve: function() {
            var a = this.pathNode
              , b = a.pathSegList.getItem(a.pathSegList.numberOfItems - 1)
              , c = a.pathSegList.getItem(a.pathSegList.numberOfItems - 2)
              , d = a.createSVGPathSegCurvetoCubicAbs(b.x, b.y, c.x, c.y, b.x, b.y);
            a.pathSegList.replaceItem(d, a.pathSegList.numberOfItems - 1),
              this.trigger("path:edit", a),
              this.trigger("path:last-segment:replace-with-curve", a)
        },
        adjustControlPath: function(a, b, c, d) {
            var e = this.pathNode
              , f = this.svgControl.node;
            f.pathSegList.initialize(f.createSVGPathSegMovetoAbs(a, b)),
              f.pathSegList.appendItem(f.createSVGPathSegLinetoAbs(c, d)),
              this.vel.append(f),
              this.trigger("path:interact", e),
              this.trigger("path:control:adjust", e)
        },
        removeControlPath: function() {
            var a = this.pathNode
              , b = this.svgControl.node;
            b.pathSegList.clear(),
              this.vel.append(b),
              this.trigger("path:interact", a),
              this.trigger("path:control:remove", a)
        },
        onPointerDown: function(a) {
            var b = joint.util.normalizeEvent(a);
            if (b.stopPropagation(),
              !(b.which > 1) && !(b.originalEvent.detail > 1) && this.el.parentNode) {
                var c = this.vel.toLocalPoint(b.clientX, b.clientY);
                switch (this.action) {
                    case "awaiting-input":
                        this.createPath(c.x, c.y),
                          this.action = "path-created",
                          this.bindDocumentEvents();
                        break;
                    case "adjusting-line-end":
                        this.action = "awaiting-line-end";
                        break;
                    case "adjusting-curve-end":
                        this.action = "awaiting-curve-control-2"
                }
                this._timeStamp = b.timeStamp
            }
        },
        MOVEMENT_DETECTION_THRESHOLD: 150,
        onPointerMove: function(a) {
            var b = joint.util.normalizeEvent(a);
            if (b.stopPropagation(),
              "awaiting-input" != this.action) {
                var c, d, e = this.vel.toLocalPoint(b.clientX, b.clientY), f = this._timeStamp;
                if (f)
                    if (f && b.timeStamp - f < this.MOVEMENT_DETECTION_THRESHOLD)
                        switch (this.action) {
                            case "path-created":
                                c = this.svgStart.translate(),
                                  this.adjustControlPath(c.tx, c.ty, e.x, e.y);
                                break;
                            case "awaiting-line-end":
                            case "adjusting-curve-control-1":
                                this.adjustLastSegment(e.x, e.y);
                                break;
                            case "awaiting-curve-control-2":
                                this.adjustLastSegment(e.x, e.y, null, null, e.x, e.y)
                        }
                    else
                        switch (this.action) {
                            case "path-created":
                                this.action = "adjusting-curve-control-1";
                                break;
                            case "awaiting-line-end":
                                this.replaceLastSegmentWithCurve(),
                                  this.action = "adjusting-curve-control-2";
                                break;
                            case "awaiting-curve-control-2":
                                this.action = "adjusting-curve-control-2";
                                break;
                            case "adjusting-curve-control-1":
                                c = this.svgStart.translate(),
                                  this.adjustControlPath(c.tx, c.ty, e.x, e.y);
                                break;
                            case "adjusting-curve-control-2":
                                d = this.findControlPoint(e.x, e.y),
                                  this.adjustLastSegment(null, null, null, null, d.x, d.y),
                                  this.adjustControlPath(d.x, d.y, e.x, e.y)
                        }
                else
                    switch (this.action) {
                        case "adjusting-line-end":
                            this.adjustLastSegment(e.x, e.y);
                            break;
                        case "adjusting-curve-end":
                            this.adjustLastSegment(e.x, e.y, null, null, e.x, e.y)
                    }
            }
        },
        onPointerUp: function(a) {
            this._timeStamp = null;
            var b = joint.util.normalizeEvent(a);
            if (b.stopPropagation(),
                !(b.which > 1 || b.originalEvent.detail > 1)) {
                var c = this.vel.toLocalPoint(b.clientX, b.clientY);
                switch (this.action) {
                    case "path-created":
                    case "awaiting-line-end":
                        this.addLineSegment(c.x, c.y),
                          this.action = "adjusting-line-end";
                        break;
                    case "awaiting-curve-control-2":
                        this.removeControlPath(),
                          this.addLineSegment(c.x, c.y),
                          this.action = "adjusting-line-end";
                        break;
                    case "adjusting-curve-control-1":
                    case "adjusting-curve-control-2":
                        this.addCurveSegment(c.x, c.y, c.x, c.y),
                          this.action = "adjusting-curve-end"
                }
            }
        },
        onStartPointPointerDown: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
            b.which > 1 || b.originalEvent.detail > 1 || this.closePath()
        },
        onDoubleClick: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.preventDefault(),
              b.stopPropagation(),
            b.which > 1 || this.pathNode && this.numberOfVisibleSegments() > 0 && (this.removeLastSegment(),
              this.finishPath("path:stop"))
        },
        onContextMenu: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.preventDefault(),
              b.stopPropagation(),
            b.originalEvent.detail > 1 || this.pathNode && this.numberOfVisibleSegments() > 0 && (this.removeLastSegment(),
              this.finishPath("path:stop"))
        }
    });


  joint.ui.PathEditor = joint.mvc.View.extend({
        tagName: "g",
        svgElement: !0,
        className: "path-editor",
        events: {
            "mousedown .anchor-point": "onAnchorPointPointerDown",
            "mousedown .control-point": "onControlPointPointerDown",
            "mousedown .segment-path": "onSegmentPathPointerDown",
            "touchstart .anchor-point": "onAnchorPointPointerDown",
            "touchstart .control-point": "onControlPointPointerDown",
            "touchstart .segment-path": "onSegmentPathPointerDown",
            "dblclick .anchor-point": "onAnchorPointDoubleClick",
            "dblclick .control-point": "onControlPointDoubleClick",
            "dblclick .segment-path": "onSegmentPathDoubleClick"
        },
        options: {
            anchorPointMarkup: '<circle r="2.5"/>',
            controlPointMarkup: '<circle r="2.5"/>'
        },
        init: function() {
            var a = this.pathNode = V(this.options.pathElement).normalizePath().node;
            this.segList = a.pathSegList,
              this.svgRoot = V(a.ownerSVGElement),
              this.$document = $(a.ownerDocument),
              this.render()
        },
        bindDocumentEvents: function() {
            var a = this.getEventNamespace();
            this.$document.on("mousemove" + a + " touchmove" + a, _.bind(this.onPointerMove, this)),
              this.$document.on("mouseup" + a + " touchend" + a, _.bind(this.onPointerUp, this))
        },
        unbindDocumentEvents: function() {
            this.$document.off(this.getEventNamespace())
        },
        onRemove: function() {
            this.unbindDocumentEvents(),
              this.clear()
        },
        clear: function() {
            var a = this.vel;
            a.empty(),
              this.directionPaths = [],
              this.segmentPaths = [],
              this.controlPoints = [],
              this.anchorPoints = [],
              this._subPathIndices = [0],
              this.trigger("clear", this.pathNode)
        },
        _transformPoint: function(a, b, c) {
            return V.transformPoint(g.Point(a, b), c)
        },
        render: function() {
            this.clear();
            var a, b, c, d = this.vel, e = this.pathNode.getCTM(), f = V(this.options.anchorPointMarkup).addClass("anchor-point"), g = V(this.options.controlPointMarkup).addClass("control-point"), h = V('<path class="direction-path"/>'), i = V('<path class="segment-path"/>'), j = this.segList, k = this.anchorPoints, l = this.controlPoints, m = this.directionPaths, n = this.segmentPaths, o = this._subPathIndices;
            for (a = 0,
                   b = 0,
                   c = 0; a < j.numberOfItems; a++) {
                var p = j.getItem(a)
                  , q = this._transformPoint(p.x, p.y, e)
                  , r = q.x
                  , s = q.y;
                if (p.pathSegType != SVGPathSeg.PATHSEG_CLOSEPATH && (k[a] = f.clone().attr({
                      index: a,
                      cx: r,
                      cy: s
                  })),
                  p.pathSegType != SVGPathSeg.PATHSEG_MOVETO_ABS) {
                    var t = i.clone().attr("index", a).node;
                    switch (t.pathSegList.initialize(t.createSVGPathSegMovetoAbs(b, c)),
                      p.pathSegType) {
                        case SVGPathSeg.PATHSEG_CLOSEPATH:
                            var u = j.getItem(o[0])
                              , v = this._transformPoint(u.x, u.y, e);
                            r = v.x,
                              s = v.y,
                              t.pathSegList.appendItem(t.createSVGPathSegLinetoAbs(r, s)),
                              o.unshift(a + 1);
                            break;
                        case SVGPathSeg.PATHSEG_LINETO_ABS:
                            t.pathSegList.appendItem(t.createSVGPathSegLinetoAbs(r, s));
                            break;
                        case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                            var w = this._transformPoint(p.x1, p.y1, e)
                              , x = g.clone().attr({
                                index: a,
                                "attribute-index": 1,
                                cx: w.x,
                                cy: w.y
                            })
                              , y = this._transformPoint(p.x2, p.y2, e)
                              , z = g.clone().attr({
                                index: a,
                                "attribute-index": 2,
                                cx: y.x,
                                cy: y.y
                            });
                            l[a] = [x, z],
                              t.pathSegList.appendItem(t.createSVGPathSegCurvetoCubicAbs(r, s, w.x, w.y, y.x, y.y)),
                              m[a] = [h.clone().attr("d", ["M", b, c, "L", w.x, w.y].join(" ")), h.clone().attr("d", ["M", r, s, "L", y.x, y.y].join(" "))]
                    }
                    n[a] = t
                }
                b = r,
                  c = s
            }
            d.append(_.filter(n)).append(_.flatten(_.filter(m))).append(_.filter(k)).append(_.flatten(_.filter(l))),
              this.svgRoot.append(d)
        },
        startMoving: function(a) {
            var b = joint.util.normalizeEvent(a)
              , c = this.$point = $(b.target);
            this.prevClientX = b.clientX,
              this.prevClientY = b.clientY;
            var d = parseInt(this.$point.attr("index"), 10);
            if (c.hasClass("anchor-point"))
                this.trigger("path:interact"),
                  this.trigger("path:anchor-point:select", d);
            else if (c.hasClass("control-point")) {
                var e = this.$point.attr("attribute-index");
                this.trigger("path:interact"),
                  this.trigger("path:control-point:select", d, e)
            } else
                this.trigger("path:interact"),
                  this.trigger("path:segment:select", d);
            b.stopPropagation(),
              b.preventDefault(),
              this.pathEditedEventType = null
        },
        move: function(a) {
            var b = this.$point;
            if (b) {
                var c = joint.util.normalizeEvent(a)
                  , d = c.clientX - this.prevClientX
                  , e = c.clientY - this.prevClientY
                  , f = parseInt(b.attr("index"), 10);
                if (b.hasClass("anchor-point"))
                    this.adjustAnchorPoint(f, d, e);
                else if (b.hasClass("control-point")) {
                    var g = b.attr("attribute-index");
                    this.adjustControlPoint(f, g, d, e)
                } else
                    this.adjustAnchorPoint(f - 1, d, e),
                      this.adjustAnchorPoint(f, d, e);
                this.prevClientX = c.clientX,
                  this.prevClientY = c.clientY
            }
        },
        adjustControlPoint: function(a, b, c, d) {
            var e = this.pathNode.getCTM()
              , f = this.segList
              , h = f.getItem(a)
              , i = this.controlPoints
              , j = e.inverse();
            j.e = 0,
              j.f = 0;
            var k = this._transformPoint(c, d, j)
              , l = "x" + b
              , m = "y" + b;
            h[l] += k.x,
              h[m] += k.y;
            var n = this._transformPoint(h[l], h[m], e)
              , o = i[a][b - 1].attr({
                cx: n.x,
                cy: n.y
            });
            if (o.hasClass("locked")) {
                var p = this.getBoundIndex(a, b)
                  , q = 1 == b ? 2 : 1
                  , r = f.getItem(p)
                  , s = "x" + q
                  , t = "y" + q
                  , u = g.point(1 == b ? r.x : h.x, 1 == b ? r.y : h.y)
                  , v = g.point(h[l], h[m])
                  , w = u.distance(g.Point(r[s], r[t]))
                  , x = u.move(v, w);
                r[s] = x.x,
                  r[t] = x.y;
                var y = this._transformPoint(r[s], r[t], e);
                i[p][q - 1].attr({
                    cx: y.x,
                    cy: y.y
                }),
                  this.updateDirectionPaths(p),
                  this.updateSegmentPath(p)
            }
            this.updateDirectionPaths(a),
              this.updateSegmentPath(a),
              this.pathEditedEventType = "path:control-point:adjust"
        },
        adjustAnchorPoint: function(a, b, c) {
            var d = this.pathNode.getCTM()
              , e = this.segList
              , f = e.getItem(a)
              , g = this._subPathIndices;
            f.pathSegType == SVGPathSeg.PATHSEG_CLOSEPATH && (a = _.find(g, function(b) {
                return b < a
            }),
              f = e.getItem(a));
            var h = this.anchorPoints
              , i = this.controlPoints
              , j = h.length - 1;
            if ((0 === a || a === j) && i[1] && i[j]) {
                var k = i[1][0]
                  , l = i[j][1];
                k && k.hasClass("locked") && k.removeClass("locked"),
                l && l.hasClass("locked") && l.removeClass("locked")
            }
            var m = d.inverse();
            m.e = 0,
              m.f = 0;
            var n = this._transformPoint(b, c, m);
            f.x += n.x,
              f.y += n.y;
            var o = this._transformPoint(f.x, f.y, d);
            if (h[a].attr({
                  cx: o.x,
                  cy: o.y
              }),
              f.pathSegType == SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS) {
                f.x2 += n.x,
                  f.y2 += n.y;
                var p = this._transformPoint(f.x2, f.y2, d);
                i[a][1].attr({
                    cx: p.x,
                    cy: p.y
                })
            }
            var q = a + 1 < e.numberOfItems ? e.getItem(a + 1) : 0;
            if (q) {
                if (q.pathSegType == SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS) {
                    q.x1 += n.x,
                      q.y1 += n.y;
                    var r = this._transformPoint(q.x1, q.y1, d);
                    i[a + 1][0].attr({
                        cx: r.x,
                        cy: r.y
                    }),
                      this.updateDirectionPaths(a + 1)
                }
                this.updateSegmentPath(a + 1)
            }
            this.updateDirectionPaths(a),
              this.updateSegmentPath(a),
              this.pathEditedEventType = "path:anchor-point:adjust"
        },
        updateDirectionPaths: function(a) {
            var b = this.pathNode.getCTM()
              , c = this.segList
              , d = c.getItem(a)
              , e = this._transformPoint(d.x, d.y, b)
              , f = a > 0 ? c.getItem(a - 1) : null
              , g = f ? this._transformPoint(f.x, f.y, b) : null;
            _.each(this.directionPaths[a], function(a, c) {
                c++;
                var h = this._transformPoint(d["x" + c], d["y" + c], b);
                a.attr("d", ["M", c > 1 || !f ? e.x : g.x, c > 1 || !f ? e.y : g.y, h.x, h.y].join(" "))
            }, this)
        },
        updateSegmentPath: function(a) {
            var b = this.segList
              , c = this._subPathIndices;
            if (c.includes(a)) {
                var d = _.find(c.slice().reverse(), function(b) {
                      return b > a
                  }) || b.numberOfItems;
                if (d--,
                  b.getItem(d).pathSegType != SVGPathSeg.PATHSEG_CLOSEPATH)
                    return;
                a = d
            }
            var e = this.segmentPaths[a];
            if (e) {
                var f = this.pathNode.getCTM()
                  , g = b.getItem(a - 1)
                  , h = this._transformPoint(g.x, g.y, f)
                  , i = e.createSVGPathSegMovetoAbs(h.x, h.y);
                e.pathSegList.initialize(i);
                var j = b.getItem(a)
                  , k = this._transformPoint(j.x, j.y, f);
                switch (j.pathSegType) {
                    case SVGPathSeg.PATHSEG_CLOSEPATH:
                        var l = b.getItem(_.find(c, function(b) {
                            return b < a
                        }))
                          , m = this._transformPoint(l.x, l.y, f);
                        i = e.createSVGPathSegLinetoAbs(m.x, m.y);
                        break;
                    case SVGPathSeg.PATHSEG_LINETO_ABS:
                        i = e.createSVGPathSegLinetoAbs(k.x, k.y);
                        break;
                    case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                        var n = this._transformPoint(j.x1, j.y1, f)
                          , o = this._transformPoint(j.x2, j.y2, f);
                        i = e.createSVGPathSegCurvetoCubicAbs(k.x, k.y, n.x, n.y, o.x, o.y)
                }
                e.pathSegList.appendItem(i)
            }
        },
        stopMoving: function() {
            if (this.$point = null,
                this.pathEditedEventType) {
                var a = this.pathNode;
                this.trigger("path:edit", a),
                  this.trigger(this.pathEditedEventType, a)
            }
            this.pathEditedEventType = null
        },
        createAnchorPoint: function(a) {
            var b = joint.util.normalizeEvent(a)
              , c = V(b.target).attr("index")
              , d = this.pathNode
              , e = this.segList
              , f = V(d).toLocalPoint(b.pageX, b.pageY)
              , h = e.getItem(c);
            switch (h.pathSegType) {
                case SVGPathSeg.PATHSEG_CLOSEPATH:
                case SVGPathSeg.PATHSEG_LINETO_ABS:
                    e.insertItemBefore(d.createSVGPathSegLinetoAbs(f.x, f.y), c);
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    var i = e.getItem(c - 1)
                      , j = g.point(i.x, i.y)
                      , k = g.point(h.x1, h.y1)
                      , l = g.point(h.x2, h.y2)
                      , m = g.point(h.x, h.y)
                      , n = g.bezier.getInversionSolver(j, k, l, m)(f);
                    if (n < 0)
                        return;
                    var o = g.bezier.getCurveDivider(j, k, l, m)(n);
                    e.insertItemBefore(d.createSVGPathSegCurvetoCubicAbs(o[0].p3.x, o[0].p3.y, o[0].p1.x, o[0].p1.y, o[0].p2.x, o[0].p2.y), c),
                      h.x1 = o[1].p1.x,
                      h.y1 = o[1].p1.y,
                      h.x2 = o[1].p2.x,
                      h.y2 = o[1].p2.y
            }
            this.render(),
              this.trigger("path:edit", d),
              this.trigger("path:anchor-point:create", d)
        },
        removeAnchorPoint: function(a) {
            var b, c, d = joint.util.normalizeEvent(a), e = parseInt($(d.target).attr("index"), 10), f = this.pathNode, g = this.segList, h = g.getItem(e);
            switch (h.pathSegType) {
                case SVGPathSeg.PATHSEG_MOVETO_ABS:
                    b = g.getItem(e + 1),
                      c = f.createSVGPathSegMovetoAbs(b.x, b.y),
                      g.replaceItem(c, e + 1),
                      g.removeItem(e);
                    break;
                case SVGPathSeg.PATHSEG_LINETO_ABS:
                    g.removeItem(e);
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    e + 1 <= g.numberOfItems - 1 && (b = g.getItem(e + 1),
                    b.pathSegType == SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS && (b.x1 = h.x1,
                      b.y1 = h.y1)),
                      g.removeItem(e)
            }
            this.render(),
              this.trigger("path:edit", f),
              this.trigger("path:anchor-point:remove", f);
            var i = g.numberOfItems;
            g.getItem(g.numberOfItems - 1).pathSegType == SVGPathSeg.PATHSEG_CLOSEPATH && (i -= 1),
            i < 2 && this.trigger("path:invalid", f)
        },
        lockControlPoint: function(a) {
            var b = joint.util.normalizeEvent(a)
              , c = $(b.target)
              , d = this.pathNode
              , e = parseInt(c.attr("index"))
              , f = c.attr("attribute-index")
              , g = this.getBoundIndex(e, f)
              , h = 1 == f ? 2 : 1
              , i = this.controlPoints[g];
            if (i) {
                var j = c.hasClass("locked");
                c.toggleClass("locked"),
                  i[h - 1].toggleClass("locked"),
                  this.trigger("path:interact"),
                  j ? this.trigger("path:control-point:unlock", e, f) : this.trigger("path:control-point:lock", e, f),
                  this.adjustControlPoint(e, f, 0, 0),
                  this.trigger("path:edit", d),
                  this.trigger(this.pathEditedEventType, d),
                  this.pathEditedEventType = null
            }
        },
        getBoundIndex: function(a, b) {
            var c, d, e, f, g, h, i = this.segList, j = this.anchorPoints, k = j.length - 1;
            return 1 == b ? (c = a - 1,
            0 === c && (d = i.numberOfItems - 1,
              e = i.getItem(d).pathSegType,
              f = e == SVGPathSeg.PATHSEG_CLOSEPATH,
              g = j[0].attr("cx") === j[k].attr("cx"),
              h = j[0].attr("cy") === j[k].attr("cy"),
            f && g && h && (c = k))) : (c = a + 1,
            c === k + 1 && (d = i.numberOfItems - 1,
              e = i.getItem(d).pathSegType,
              f = e == SVGPathSeg.PATHSEG_CLOSEPATH,
              g = j[0].attr("cx") === j[k].attr("cx"),
              h = j[0].attr("cy") === j[k].attr("cy"),
            f && g && h && (c = 1))),
              c
        },
        getControlPointLockedStates: function() {
            for (var a = this.controlPoints, b = [], c = 0; c < a.length; c++)
                if (a[c]) {
                    b[c] = [];
                    for (var d = 0; d <= 1; d++)
                        if (a[c][d]) {
                            var e = d + 1;
                            a[c][d].hasClass("locked") ? b[c][e] = !0 : b[c][e] = !1
                        }
                }
            return b
        },
        setControlPointLockedStates: function(a) {
            for (var b = this.controlPoints, c = 0; c < b.length; c++)
                if (a[c] && b[c])
                    for (var d = 1; d <= 2; d++)
                        a[c][d] && b[c][d - 1] && (a[c][d] === !0 ? b[c][d - 1].addClass("locked") : b[c][d - 1].removeClass("locked"))
        },
        convertSegmentPath: function(a) {
            var b, c, d = joint.util.normalizeEvent(a), e = V(d.target).attr("index"), f = this.pathNode, g = this.segList, h = g.getItem(e);
            switch (h.pathSegType) {
                case SVGPathSeg.PATHSEG_CLOSEPATH:
                    b = g.getItem(e - 1),
                      c = g.getItem(0),
                      g.insertItemBefore(f.createSVGPathSegCurvetoCubicAbs(c.x, c.y, b.x, b.y, c.x, c.y), e);
                    break;
                case SVGPathSeg.PATHSEG_LINETO_ABS:
                    b = g.getItem(e - 1),
                      g.replaceItem(f.createSVGPathSegCurvetoCubicAbs(h.x, h.y, b.x, b.y, h.x, h.y), e);
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    g.replaceItem(f.createSVGPathSegLinetoAbs(h.x, h.y), e)
            }
            this.render(),
              this.trigger("path:edit", f),
              this.trigger("path:segment:convert", f)
        },
        addClosePathSegment: function(a) {
            var b = joint.util.normalizeEvent(a)
              , c = parseInt($(b.target).attr("index"), 10)
              , d = this.segList;
            if (0 === c || c === d.numberOfItems - 1) {
                var e = d.getItem(d.numberOfItems - 1);
                if (e.pathSegType != SVGPathSeg.PATHSEG_CLOSEPATH) {
                    var f = this.pathNode;
                    d.appendItem(f.createSVGPathSegClosePath()),
                      this.render(),
                      this.trigger("path:edit", f),
                      this.trigger("path:closepath-segment:add", f)
                }
            }
        },
        removeClosePathSegment: function(a) {
            var b = joint.util.normalizeEvent(a)
              , c = V(b.target).attr("index")
              , d = this.segList
              , e = d.getItem(c);
            if (e.pathSegType == SVGPathSeg.PATHSEG_CLOSEPATH) {
                var f = this.pathNode;
                d.removeItem(c),
                  this.render(),
                  this.trigger("path:edit", f),
                  this.trigger("path:closepath-segment:remove", f)
            }
        },
        onAnchorPointPointerDown: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
            1 === b.which && (b.originalEvent.detail > 1 || (this.startMoving(b),
              this.bindDocumentEvents()))
        },
        onControlPointPointerDown: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
            1 === b.which && (b.originalEvent.detail > 1 || (this.startMoving(b),
              this.bindDocumentEvents()))
        },
        onSegmentPathPointerDown: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
            1 === b.which && (b.originalEvent.detail > 1 || (this.startMoving(b),
              this.bindDocumentEvents()))
        },
        onPointerMove: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
              this.move(b)
        },
        onPointerUp: function(a) {
            this.unbindDocumentEvents();
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
              this.stopMoving()
        },
        onAnchorPointDoubleClick: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
              b.preventDefault(),
            1 === b.which && this.removeAnchorPoint(b)
        },
        onControlPointDoubleClick: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
              b.preventDefault(),
            1 === b.which && this.lockControlPoint(b)
        },
        onSegmentPathDoubleClick: function(a) {
            var b = joint.util.normalizeEvent(a);
            b.stopPropagation(),
              b.preventDefault(),
            1 === b.which && this.createAnchorPoint(b)
        }
    });


  joint.layout.ForceDirected = Backbone.Model.extend({
        defaults: {
            linkDistance: 10,
            linkStrength: 1,
            charge: 10
        },
        initialize: function(a) {
            this.elements = this.get("graph").getElements(),
              this.links = this.get("graph").getLinks(),
              this.cells = this.get("graph").get("cells"),
              this.width = this.get("width"),
              this.height = this.get("height"),
              this.gravityCenter = this.get("gravityCenter"),
              this.t = 1,
              this.energy = 1 / 0,
              this.progress = 0
        },
        start: function() {
            var a = this.get("width")
              , b = this.get("height");
            this.elements.forEach(function(c) {
                c.set("position", {
                    x: Math.random() * a,
                    y: Math.random() * b
                }),
                  c.charge = c.get("charge") || this.get("charge"),
                  c.weight = c.get("weight") || 1;
                var d = c.get("position");
                c.x = d.x,
                  c.y = d.y,
                  c.px = c.x,
                  c.py = c.y,
                  c.fx = 0,
                  c.fy = 0
            }, this),
              this.links.forEach(function(a) {
                  a.strength = a.get("strength") || this.get("linkStrength"),
                    a.distance = a.get("distance") || this.get("linkDistance"),
                    a.source = this.cells.get(a.get("source").id),
                    a.target = this.cells.get(a.get("target").id)
              }, this)
        },
        step: function() {
            if (.99 * this.t < .005)
                return this.notifyEnd();
            var a = this.width
              , b = this.height
              , c = .1
              , d = this.gravityCenter
              , e = this.energy;
            this.energy = 0;
            var f, g, h, i, j, k, l, m, n, o, p, q = 0, r = 0, s = 0, t = 0, u = this.elements.length, v = this.links.length;
            for (f = 0; f < u - 1; f++)
                for (h = this.elements[f],
                       q += h.x,
                       r += h.y,
                       g = f + 1; g < u; g++)
                    i = this.elements[g],
                      j = i.x - h.x,
                      k = i.y - h.y,
                      l = j * j + k * k,
                      m = Math.sqrt(l),
                      n = this.t * h.charge / l,
                      o = n * j,
                      p = n * k,
                      h.fx -= o,
                      h.fy -= p,
                      i.fx += o,
                      i.fy += p,
                      this.energy += o * o + p * p;
            q += this.elements[u - 1].x,
              r += this.elements[u - 1].y;
            var w, x, y;
            for (f = 0; f < v; f++)
                w = this.links[f],
                  h = w.source,
                  i = w.target,
                  j = i.x - h.x,
                  k = i.y - h.y,
                  l = j * j + k * k,
                  m = Math.sqrt(l),
                  x = this.t * w.strength * (m - w.distance) / m,
                  o = x * j,
                  p = x * k,
                  y = h.weight / (h.weight + i.weight),
                  h.x += o * (1 - y),
                  h.y += p * (1 - y),
                  i.x -= o * y,
                  i.y -= p * y,
                  this.energy += o * o + p * p;
            var z, A;
            for (f = 0; f < u; f++) {
                z = this.elements[f],
                  A = {
                      x: z.x,
                      y: z.y
                  },
                d && (A.x += (d.x - A.x) * this.t * c,
                  A.y += (d.y - A.y) * this.t * c),
                  A.x += z.fx,
                  A.y += z.fy,
                  A.x = Math.max(0, Math.min(a, A.x)),
                  A.y = Math.max(0, Math.min(b, A.y));
                var B = .9;
                A.x += (z.px - A.x) * B,
                  A.y += (z.py - A.y) * B,
                  z.px = A.x,
                  z.py = A.y,
                  z.fx = z.fy = 0,
                  z.x = A.x,
                  z.y = A.y,
                  s += z.x,
                  t += z.y,
                  this.notify(z, f, A)
            }
            this.t = this.cool(this.t, this.energy, e);
            var C = q - s
              , D = r - t
              , E = Math.sqrt(C * C + D * D);
            E < 1 && this.notifyEnd()
        },
        cool: function(a, b, c) {
            return b < c ? (this.progress += 1,
              this.progress >= 5 ? (this.progress = 0,
              a / .99) : a) : (this.progress = 0,
            .99 * a)
        },
        notify: function(a, b, c) {
            a.set("position", c)
        },
        notifyEnd: function() {
            this.trigger("end")
        }
    });

    joint.layout = joint.layout || {},
      joint.layout.GridLayout = {
          layout: function(a, b) {
              var c;
              c = a instanceof joint.dia.Graph ? a : (new joint.dia.Graph).resetCells(a, {
                  dry: !0,
                  sort: !1
              }),
                a = null,
                b = b || {};
              var d = c.getElements()
                , e = b.columns || 1
                , f = Math.ceil(d.length / e)
                , g = b.dx || 0
                , h = b.dy || 0
                , i = void 0 === b.centre || b.centre !== !1
                , j = !!b.resizeToFit
                , k = b.marginX || 0
                , l = b.marginY || 0
                , m = []
                , n = b.columnWidth;
              if ("compact" === n)
                  for (var o = 0; o < e; o++) {
                      var p = this._elementsAtColumn(d, o, e);
                      m.push(this._maxDim(p, "width") + g)
                  }
              else {
                  n && !joint.util.isString(n) || (n = this._maxDim(d, "width") + g);
                  for (var q = 0; q < e; q++)
                      m.push(n)
              }
              var r = this._accumulate(m, k)
                , s = []
                , t = b.rowHeight;
              if ("compact" === t)
                  for (var u = 0; u < f; u++) {
                      var v = this._elementsAtRow(d, u, e);
                      s.push(this._maxDim(v, "height") + h)
                  }
              else {
                  t && !joint.util.isString(t) || (t = this._maxDim(d, "height") + h);
                  for (var w = 0; w < f; w++)
                      s.push(t)
              }
              var x = this._accumulate(s, l);
              c.startBatch("layout"),
                d.forEach(function(a, c) {
                    var d = c % e
                      , f = Math.floor(c / e)
                      , k = m[d]
                      , l = s[f]
                      , n = 0
                      , o = 0
                      , p = a.get("size");
                    if (j) {
                        var q = k - 2 * g
                          , t = l - 2 * h
                          , u = p.height * (p.width ? q / p.width : 1)
                          , v = p.width * (p.height ? t / p.height : 1);
                        u > l ? q = v : t = u,
                          p = {
                              width: q,
                              height: t
                          },
                          a.set("size", p, b)
                    }
                    i && (n = (k - p.width) / 2,
                      o = (l - p.height) / 2),
                      a.position(r[d] + g + n, x[f] + h + o, b)
                }),
                c.stopBatch("layout")
          },
          _maxDim: function(a, b) {
              return a.reduce(function(a, c) {
                  return Math.max(c.get("size")[b], a)
              }, 0)
          },
          _elementsAtRow: function(a, b, c) {
              for (var d = [], e = c * b, f = e + c; e < f; e++)
                  d.push(a[e]);
              return d
          },
          _elementsAtColumn: function(a, b, c) {
              for (var d = [], e = b, f = a.length; e < f; e += c)
                  d.push(a[e]);
              return d
          },
          _accumulate: function(a, b) {
              return a.reduce(function(a, b, c) {
                  return a.push(a[c] + b),
                    a
              }, [b || 0])
          }
      };


  !function(a, b, c, d) {
        function e(b, c, d) {
            d = a.util.defaults(d || {}, {
                siblingGap: 0
            }),
              this.width = 0,
              this.height = 0,
              this.layoutAreas = this.sortLayoutAreas(b),
              this.parentArea = c,
              this.siblingGap = d.siblingGap,
            this.exists() && this.computeSize(d)
        }
        function f(b, c) {
            this.root = b;
            var d = a.util.assign({}, c, this.getRootAttributes(b, c.attributeNames))
              , e = c.gap || 0;
            a.util.defaults(d, {
                parentGap: e,
                siblingGap: e,
                firstChildGap: e
            }),
              this.siblingRank = d.siblingRank,
              this.rootOffset = d.rootOffset,
              this.rootMargin = d.rootMargin,
              this.siblingGap = d.siblingGap,
              this.gap = this.parentGap = d.parentGap,
              this.nextSiblingGap = d.nextSiblingGap,
              this.prevSiblingGap = d.prevSiblingGap,
              this.firstChildGap = d.firstChildGap,
              this.dx = 0,
              this.dy = 0,
              this.width = 0,
              this.height = 0
        }
        a.util.assign(e.prototype, {
            sortLayoutAreas: function(b) {
                var c = a.util.sortBy(b, "siblingRank");
                return c.forEach(function(a, b) {
                    a.siblingRank = b
                }),
                  c
            },
            move: function(a, b) {
                for (var c = 0, d = this.layoutAreas.length; c < d; c++)
                    this.layoutAreas[c].dx += a,
                      this.layoutAreas[c].dy += b
            },
            exists: function() {
                return this.layoutAreas.length > 0
            },
            sumGaps: function(a) {
                var b = Math.max(this.layoutAreas.length - 1, 0);
                return b * a
            },
            getSiblingRankByPoint: function(a) {
                if (!this.exists())
                    return -1;
                var b = this.findAreaByPoint(a);
                return b ? b.siblingRank - 1 : this.layoutAreas.length - 1
            },
            getFirstChildConnectionPoints: function() {
                return []
            },
            getConnectionPoints: function(a, b) {
                if (!this.exists())
                    return this.getFirstChildConnectionPoints(a);
                var c = {
                    dx: a.x - this.parentArea.rootCX,
                    dy: a.y - this.parentArea.rootCY
                };
                return this.layoutAreas[0].getRootVertices(c, b)
            },
            getParentConnectionPoint: function() {
                var a = this.parentArea
                  , b = this.proxyLayoutArea("getConnectionPoint", a.rootSize)
                  , c = d.point(a.rootCX, a.rootCY);
                return c.offset(b.x, b.y)
            },
            getChildConnectionPoint: function(a, b) {
                var c = this.proxyLayoutArea("getConnectionPoint", b);
                return d.point(a).difference(c)
            },
            proxyLayoutArea: function(a) {
                var b = Array.prototype.slice.call(arguments, 1);
                return f.fromDirection(this.direction).prototype[a].apply(this.parentArea, b)
            }
        }),
          e.extend = b.Model.extend;
        var g = e.extend({
            getTopDY: function() {
                return -this.height / 2
            },
            findAreaByPoint: function(a) {
                return this.layoutAreas.find(function(b) {
                    return b.rootCY > a.y
                })
            },
            computeSize: function(a) {
                this.height = this.sumGaps(a.siblingGap);
                var b = this.layoutAreas;
                this.height += b.reduce(function(a, b) {
                    return a + b.height + b.prevSiblingGap + b.nextSiblingGap
                }, 0),
                  b.reduce(function(b, c) {
                      return this.width = Math.max(this.width, c.getExtendedWidth()),
                        c.dy += b + c.getCY(),
                      b + c.prevSiblingGap + c.height + c.nextSiblingGap + a.siblingGap
                  }
                    .bind(this), this.getTopDY())
            },
            getYTowardsParent: function() {
                return this.parentArea.rootCY
            },
            getXTowardsParent: function() {
                var a = this.parentArea;
                return a.rootCX + this.LRSign * (a.rootSize.width / 2 + a.gap)
            },
            getNeighborPointFromRank: function(a) {
                var b, c = this.siblingGap;
                if (this.exists()) {
                    var d = this.layoutAreas[a]
                      , e = this.layoutAreas[a + 1];
                    b = d ? e ? (d.y + d.height + e.y) / 2 : d.y + d.height + c / 2 : e.y - c / 2
                } else
                    b = this.getYTowardsParent();
                return {
                    x: this.getXTowardsParent(),
                    y: b
                }
            }
        })
          , h = g.extend({
            direction: "L",
            LRSign: -1
        })
          , i = g.extend({
            direction: "R",
            LRSign: 1
        })
          , j = {
            getXTowardsParent: function() {
                var a = this.parentArea;
                return a.rootCX + this.LRSign * a.gap
            },
            getYTowardsParent: function() {
                var a = this.parentArea
                  , b = a.getLRHeight(a.siblings) / 2;
                return b += Math.min(a.firstChildGap, this.siblingGap / 2),
                a.rootCY + this.TBSign * b
            },
            getFirstChildConnectionPoints: function(a) {
                return [d.point(this.parentArea.rootCX, a.y)]
            },
            getChildConnectionPoint: function(a, b) {
                return d.point(a).offset(-this.LRSign * b.width / 2, 0)
            },
            getParentConnectionPoint: function() {
                var a = this.parentArea
                  , b = d.point(a.rootCX, a.rootCY);
                return b.offset(0, this.TBSign * a.rootSize.height / 2)
            }
        }
          , k = {
            getTopDY: function() {
                return 0
            }
        }
          , l = {
            getTopDY: function() {
                return -this.height
            }
        }
          , m = g.extend({
            direction: "BR",
            LRSign: 1,
            TBSign: 1
        });
        a.util.assign(m.prototype, j, k);
        var n = g.extend({
            direction: "BL",
            LRSign: -1,
            TBSign: 1
        });
        a.util.assign(n.prototype, j, k);
        var o = g.extend({
            direction: "TR",
            LRSign: 1,
            TBSign: -1
        });
        a.util.assign(o.prototype, j, l);
        var p = g.extend({
            direction: "TL",
            LRSign: -1,
            TBSign: -1
        });
        a.util.assign(p.prototype, j, l);
        var q = e.extend({
            getLeftDX: function() {
                return -this.width / 2
            },
            findAreaByPoint: function(a) {
                return this.layoutAreas.find(function(b) {
                    return b.rootCX > a.x
                })
            },
            computeSize: function(a) {
                this.width = this.sumGaps(a.siblingGap);
                var b = this.layoutAreas;
                this.width += b.reduce(function(a, b) {
                    return a + b.width + b.prevSiblingGap + b.nextSiblingGap
                }, 0),
                  b.reduce(function(b, c) {
                      return this.height = Math.max(this.height, c.getExtendedHeight()),
                        c.dx += b + c.getCX(),
                      b + c.prevSiblingGap + c.width + c.nextSiblingGap + a.siblingGap
                  }
                    .bind(this), this.getLeftDX())
            },
            getNeighborPointFromRank: function(a) {
                var b;
                if (this.exists()) {
                    var c = this.layoutAreas[a]
                      , d = this.layoutAreas[a + 1];
                    b = c ? d ? (c.x + c.width + d.x) / 2 : c.x + c.width + this.siblingGap / 2 : d.x - this.siblingGap / 2
                } else
                    b = this.parentArea.rootCX;
                return {
                    x: b,
                    y: this.getYTowardsParent()
                }
            }
        })
          , r = q.extend({
            direction: "T",
            getYTowardsParent: function() {
                var a = this.parentArea;
                return a.rootCY - a.getLRHeight() / 2 - a.gap
            }
        })
          , s = q.extend({
            direction: "B",
            getYTowardsParent: function() {
                var a = this.parentArea;
                return a.rootCY + a.getLRHeight() / 2 + a.gap
            }
        });
        a.util.assign(f, {
            create: function(a, b, c) {
                var d = f.fromDirection(a, c);
                return new d(b,c)
            },
            fromDirection: function(a, b) {
                var c;
                switch (a) {
                    case "L":
                        c = u;
                        break;
                    case "T":
                        c = v;
                        break;
                    case "R":
                        c = t;
                        break;
                    case "B":
                        c = w;
                        break;
                    case "BR":
                        c = x;
                        break;
                    case "BL":
                        c = y;
                        break;
                    case "TR":
                        c = z;
                        break;
                    case "TL":
                        c = A;
                        break;
                    default:
                        c = f
                }
                return c
            }
        }),
          a.util.assign(f.prototype, {
              direction: null,
              compute: function(a) {
                  this.childAreas = a,
                    this.computeRelativePosition(this.root, a)
              },
              getHeight: function(a, b) {
                  return this.getTHeight(a) + this.getBHeight(a) + this.getLRHeight()
              },
              getWidth: function(a, b) {
                  var c = Math.max(a.T.width, a.B.width) / 2
                    , d = Math.max(this.getLWidth(a, b) + b.width / 2, c)
                    , e = Math.max(this.getRWidth(a, b) + b.width / 2, c);
                  return d + e
              },
              getLRHeight: function() {
                  return Math.max(this.rootSize.height, this.siblings.L.height, this.siblings.R.height)
              },
              getTHeight: function(a) {
                  return a.T.height + this.getTXHeight(a)
              },
              getBHeight: function(a) {
                  return a.B.height + this.getBXHeight(a)
              },
              getXLRWidth: function(a, b) {
                  return this.getLWidth(a, b) + b.width + this.getRWidth(a, b)
              },
              getXRWidth: function(a, b) {
                  var c = Math.max(a.BR.width, a.TR.width);
                  return c > 0 && (c -= b.width / 2),
                    c
              },
              getTXHeight: function(a) {
                  var b = Math.max(a.TR.height, a.TL.height);
                  return b > 0 && (b += this.firstChildGap),
                    b
              },
              getBXHeight: function(a) {
                  var b = Math.max(a.BR.height, a.BL.height);
                  return b > 0 && (b += this.firstChildGap),
                    b
              },
              getXLWidth: function(a, b) {
                  var c = Math.max(a.BL.width, a.TL.width);
                  return c > 0 && (c -= b.width / 2),
                    c
              },
              getRWidth: function(a, b) {
                  return Math.max(a.R.width, this.getXRWidth(a, b))
              },
              getLWidth: function(a, b) {
                  return Math.max(a.L.width, this.getXLWidth(a, b))
              },
              getTBOverlap: function(a, b) {
                  var c = Math.max(a.T.width, a.B.width);
                  return c > 0 && (c -= b.width,
                    c /= 2),
                    c
              },
              getRootDX: function(a, b) {
                  var c = this.getTBOverlap(a, b)
                    , d = Math.max(this.getLWidth(a, b), c);
                  return d -= Math.max(this.getRWidth(a, b), c),
                  d / 2
              },
              getMinimalGap: function(a) {
                  return Math.min(a.siblingGap, this.firstChildGap, this.parentGap)
              },
              getBBox: function(a) {
                  var b = d.rect(this)
                    , c = a && a.expandBy;
                  return c && b.moveAndExpand({
                      x: -c,
                      y: -c,
                      width: 2 * c,
                      height: 2 * c
                  }),
                    b
              },
              containsPoint: function(a, b) {
                  return this.getBBox(b).containsPoint(a)
              },
              getLayoutSiblings: function(a) {
                  return this.siblings[a]
              },
              getExtendedWidth: function() {
                  return this.width + this.gap + this.rootOffset
              },
              getExtendedHeight: function() {
                  return this.height + this.gap + this.rootOffset
              },
              findMinimalAreaByPoint: function(a, b) {
                  if (!this.containsPoint(a, b))
                      return null;
                  var c;
                  return this.childAreas.some(function(d) {
                      return c = d.findMinimalAreaByPoint(a, b),
                        !!c
                  }),
                  c || this
              },
              getType: function() {
                  return Object.keys(this.siblings).reduce(function(a, b) {
                      var c = this.siblings[b];
                      return c.exists() ? a.concat(b) : a
                  }
                    .bind(this), []).sort().join("-")
              },
              getRootAttributes: function(b, c) {
                  var d = {
                      rootOffset: b.get(c.offset || "offset") || 0,
                      rootMargin: b.get(c.margin || "margin") || 0,
                      prevSiblingGap: b.get(c.prevSiblingGap || "prevSiblingGap") || 0,
                      nextSiblingGap: b.get(c.nextSiblingGap || "nextSiblingGap") || 0
                  }
                    , e = b.get(c.siblingRank || "siblingRank");
                  a.util.isNumber(e) && (d.siblingRank = e);
                  var f = b.get(c.firstChildGap || "firstChildGap");
                  return a.util.isNumber(f) && (d.firstChildGap = f),
                    d
              },
              getRootSize: function(a, b) {
                  var c = a.size();
                  return c[this.marginDimension] += b,
                    c
              },
              createSiblings: function(b, c) {
                  var d = a.util.groupBy(b, "direction");
                  return {
                      L: new h(d.L,this,c),
                      T: new r(d.T,this,c),
                      R: new i(d.R,this,c),
                      B: new s(d.B,this,c),
                      BR: new m(d.BR,this,c),
                      BL: new n(d.BL,this,c),
                      TR: new o(d.TR,this,c),
                      TL: new p(d.TL,this,c)
                  }
              },
              computeSize: function(a, b) {
                  return {
                      width: this.getWidth(a, b),
                      height: this.getHeight(a, b)
                  }
              },
              computeOrigin: function() {
                  var a = this.siblings
                    , b = this.rootSize
                    , c = Math.max(this.getLWidth(a, b) + b.width / 2, this.getXLWidth(a, b) + b.width / 2, a.T.width / 2, a.B.width / 2);
                  return {
                      x: this.rootCX - c,
                      y: this.rootCY - this.getTHeight(a) - this.getLRHeight() / 2
                  }
              },
              moveSiblings: function(a, b) {
                  if (this.hasHorizontalSiblings(a)) {
                      var c = b.width / 2;
                      a.L.move(-c, 0),
                        a.R.move(c, 0)
                  }
                  if (this.hasVerticalSiblings(a)) {
                      var d = this.getLRHeight() / 2;
                      a.T.move(0, -d),
                        a.B.move(0, d),
                        a.BR.move(0, d),
                        a.BL.move(0, d),
                        a.B.move(0, this.getBXHeight(a)),
                        a.TR.move(0, -d),
                        a.TL.move(0, -d),
                        a.T.move(0, -this.getTXHeight(a))
                  }
              },
              moveRootToConnectionPoint: function(a) {
                  var b = this.getConnectionPoint(a);
                  this.dx += b.x,
                    this.dy += b.y
              },
              computeRelativePosition: function(b, c) {
                  var d = this.siblings = this.createSiblings(c, {
                      siblingGap: this.siblingGap
                  })
                    , e = this.rootSize = this.getRootSize(b, this.rootMargin);
                  a.util.assign(this, this.computeSize(d, e)),
                    this.moveSiblings(d, e),
                    this.moveRootToConnectionPoint(e),
                    this.moveRootBehindSiblings(d, e),
                    this.moveRootFromParent()
              },
              computeAbsolutePosition: function() {
                  if (this.parentArea)
                      this.rootCX = this.parentArea.rootCX + this.dx,
                        this.rootCY = this.parentArea.rootCY + this.dy,
                        this.level = this.parentArea.level + 1;
                  else {
                      var b = this.root.getBBox().center();
                      this.rootCX = b.x,
                        this.rootCY = b.y,
                        this.level = 0
                  }
                  a.util.assign(this, this.computeOrigin())
              },
              hasVerticalSiblings: function(a) {
                  return a.T.exists() || a.B.exists() || a.BR.exists() || a.BL.exists() || a.TR.exists() || a.TL.exists()
              },
              hasHorizontalSiblings: function(a) {
                  return a.L.exists() || a.R.exists()
              },
              isSourceArea: function() {
                  return !this.parentArea
              },
              isSinkArea: function() {
                  return 0 === this.childAreas.length
              },
              getRootPosition: function() {
                  var a = this.root.get("size");
                  return {
                      x: this.rootCX - a.width / 2,
                      y: this.rootCY - a.height / 2
                  }
              },
              getRootVertices: function(b, c) {
                  if (c = c || {},
                      b = b || this,
                    0 === b[this.deltaCoordinate] || !this.parentArea)
                      return [];
                  var d, e = this.parentArea.getInnerSize();
                  if (!c.ignoreSiblings && this.hasSiblingsBetweenParent()) {
                      var f = this.siblings[this.oppositeDirection];
                      d = this.getRelativeVerticesAvoidingSiblings(e, b, f)
                  } else
                      d = this.getRelativeVertices(e, b);
                  return a.util.invoke(d, "offset", this.parentArea.rootCX, this.parentArea.rootCY)
              },
              getInnerSize: function() {
                  return {
                      width: this.rootSize.width,
                      height: this.getLRHeight()
                  }
              },
              getConnectionPoint: function() {
                  return null
              },
              getRelativeVertices: function() {
                  return null
              },
              moveRootFromParent: function() {},
              moveRootBehindSiblings: function() {},
              hasSiblingsBetweenParent: function() {
                  return !this.isSourceArea() && this.siblings[this.oppositeDirection].exists()
              },
              getCY: function() {
                  return this.height / 2 + this.prevSiblingGap
              },
              getCX: function() {
                  return this.width / 2 + this.prevSiblingGap
              }
          }),
          f.extend = b.Model.extend;
        var t = f.extend({
            direction: "R",
            oppositeDirection: "L",
            deltaCoordinate: "dx",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(a.width / 2, 0)
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx += Math.max(this.getLWidth(a, b), this.getTBOverlap(a, b)),
                  this.dy += (this.getTHeight(a) - this.getBHeight(a)) / 2
            },
            moveRootFromParent: function() {
                this.dx += this.parentGap + this.rootOffset
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = this.parentGap / 2;
                return [c.clone().offset(d, 0), c.clone().offset(d, b.dy)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var d = this.getConnectionPoint(a)
                  , e = c.siblingGap / 2
                  , f = this.dx > 0 ? -1 : 1
                  , g = b.dy + f * (c.height + e) / 2
                  , h = b.dy + f * this.rootSize.height / 4
                  , i = this.gap / 2
                  , j = 1.5 * i + Math.max(this.getLWidth(this.siblings, this.rootSize), this.getTBOverlap(this.siblings, this.rootSize));
                return [d.clone().offset(i, 0), d.clone().offset(i, g), d.clone().offset(j, g), d.clone().offset(j, h)]
            }
        })
          , u = f.extend({
            direction: "L",
            oppositeDirection: "R",
            deltaCoordinate: "dx",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(-a.width / 2, 0)
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx -= Math.max(this.getRWidth(a, b), this.getTBOverlap(a, b)),
                  this.dy += (this.getTHeight(a) - this.getBHeight(a)) / 2
            },
            moveRootFromParent: function() {
                this.dx -= this.parentGap + this.rootOffset
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = -this.parentGap / 2;
                return [c.clone().offset(d, 0), c.clone().offset(d, b.dy)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var d = this.getConnectionPoint(a)
                  , e = this.dx > 0 ? -1 : 1
                  , f = b.dy + e * (c.height + c.siblingGap / 2) / 2
                  , g = b.dy + e * this.rootSize.height / 4
                  , h = this.gap / 2
                  , i = 1.5 * h + Math.max(this.getRWidth(this.siblings, this.rootSize), this.getTBOverlap(this.siblings, this.rootSize));
                return [d.clone().offset(-h, 0), d.clone().offset(-h, f), d.clone().offset(-i, f), d.clone().offset(-i, g)]
            }
        })
          , v = f.extend({
            direction: "T",
            oppositeDirection: "B",
            deltaCoordinate: "dy",
            marginDimension: "width",
            getConnectionPoint: function(a) {
                return d.point(0, -a.height / 2)
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx += this.getRootDX(a, b),
                this.hasHorizontalSiblings(a) && (this.dy -= (this.getLRHeight() - b.height) / 2),
                  this.dy -= this.getBHeight(a)
            },
            moveRootFromParent: function() {
                this.dy -= this.parentGap + this.rootOffset
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = -this.getTXHeight(this.parentArea.siblings) - this.parentGap / 2;
                return [c.clone().offset(0, d), c.clone().offset(b.dx, d)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = this.siblings
                  , e = d.B
                  , f = this.getTXHeight(this.parentArea.siblings) + this.parentGap / 2
                  , g = f + e.height;
                g += this.getBXHeight(this.siblings) + this.parentGap / 4;
                var h = this.dy < 0 ? -1 : 1
                  , i = d[h > 0 ? "BR" : "BL"].width
                  , j = b.dx;
                j += h * (Math.max(i, e.width / 2) + e.siblingGap / 4);
                var k = b.dx + h * this.rootSize.width / 4;
                return [c.clone().offset(0, -f), c.clone().offset(j, -f), c.clone().offset(j, -g), c.clone().offset(k, -g)]
            }
        })
          , w = f.extend({
            direction: "B",
            oppositeDirection: "T",
            deltaCoordinate: "dy",
            marginDimension: "width",
            getConnectionPoint: function(a) {
                return d.point(0, a.height / 2)
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx += this.getRootDX(a, b),
                  this.dy += this.getTHeight(a),
                this.hasHorizontalSiblings(a) && (this.dy += (this.getLRHeight() - b.height) / 2)
            },
            moveRootFromParent: function() {
                this.dy += this.parentGap + this.rootOffset
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = this.getBXHeight(this.parentArea.siblings) + this.parentGap / 2;
                return [c.clone().offset(0, d), c.clone().offset(b.dx, d)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b) {
                var c = this.getConnectionPoint(a)
                  , d = this.siblings
                  , e = d.T
                  , f = this.getBXHeight(this.parentArea.siblings) + this.parentGap / 2
                  , g = f + e.height;
                g += this.getTXHeight(d) + this.parentGap / 4;
                var h = this.dy < 0 ? -1 : 1
                  , i = d[h > 0 ? "TR" : "TL"].width
                  , j = b.dx;
                j += h * (Math.max(i, e.width / 2) + e.siblingGap / 4);
                var k = b.dx + h * this.rootSize.width / 4;
                return [c.clone().offset(0, f), c.clone().offset(j, f), c.clone().offset(j, g), c.clone().offset(k, g)]
            }
        })
          , x = f.extend({
            direction: "BR",
            oppositeDirection: "L",
            deltaCoordinate: "dy",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(0, a.height / 2)
            },
            getCY: function() {
                return this.prevSiblingGap
            },
            moveRootBehindSiblings: function(a, b) {
                var c = Math.max(a.T.width, a.B.width);
                this.dx += Math.max(this.getLWidth(a, b), (c - b.width) / 2),
                  this.dy += this.getTHeight(a),
                this.hasHorizontalSiblings(a) && (this.dy += (this.getLRHeight() - b.height) / 2)
            },
            moveRootFromParent: function() {
                var a = this.parentArea;
                a && (this.dy += a.firstChildGap),
                  this.dx += this.rootSize.width / 2 + this.rootOffset + this.parentGap
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a);
                return [c.clone().offset(0, b.dy - a.height / 2)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var e = b.dx - this.rootSize.width / 4
                  , f = b.dy;
                return f += Math.max(c.height, this.rootSize.height) / 2,
                  f += this.getMinimalGap(c) / 2,
                  [d.point(0, f), d.point(e, f)]
            }
        })
          , y = f.extend({
            direction: "BL",
            oppositeDirection: "R",
            deltaCoordinate: "dy",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(0, a.height / 2)
            },
            getCY: function() {
                return this.prevSiblingGap
            },
            moveRootBehindSiblings: function(a, b) {
                var c = Math.max(a.T.width, a.B.width);
                this.dx -= Math.max(this.getRWidth(a, b), (c - b.width) / 2),
                  this.dy += this.getTHeight(a),
                this.hasHorizontalSiblings(a) && (this.dy += (this.getLRHeight() - b.height) / 2)
            },
            moveRootFromParent: function() {
                var a = this.parentArea;
                a && (this.dy += a.firstChildGap),
                  this.dx -= this.rootSize.width / 2 + this.rootOffset + this.parentGap
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a);
                return [c.clone().offset(0, b.dy - a.height / 2)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var e = b.dx + this.rootSize.width / 4
                  , f = b.dy;
                return f += Math.max(c.height, this.rootSize.height) / 2,
                  f += this.getMinimalGap(c) / 2,
                  [d.point(0, f), d.point(e, f)]
            }
        })
          , z = f.extend({
            direction: "TR",
            oppositeDirection: "L",
            deltaCoordinate: "dy",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(0, a.height / 2)
            },
            getCY: function() {
                return this.height - this.rootSize.height + this.prevSiblingGap
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx += Math.max(this.getLWidth(a, b), this.getTBOverlap(a, b)),
                  this.dy -= this.getBHeight(a),
                this.hasHorizontalSiblings(a) && (this.dy -= (this.getLRHeight() - b.height) / 2)
            },
            moveRootFromParent: function() {
                var a = this.parentArea;
                a && (this.dy -= a.firstChildGap),
                  this.dx += this.rootSize.width / 2 + this.rootOffset + this.parentGap
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a);
                return [c.clone().offset(0, b.dy - a.height / 2)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var e = b.dx - this.rootSize.width / 4
                  , f = b.dy;
                return f -= Math.max(c.height, this.rootSize.height) / 2,
                  f -= this.getMinimalGap(c) / 2,
                  [d.point(0, f), d.point(e, f)]
            }
        })
          , A = f.extend({
            direction: "TL",
            oppositeDirection: "R",
            deltaCoordinate: "dy",
            marginDimension: "height",
            getConnectionPoint: function(a) {
                return d.point(0, a.height / 2)
            },
            getCY: function() {
                return this.height - this.rootSize.height + this.prevSiblingGap
            },
            moveRootBehindSiblings: function(a, b) {
                this.dx -= Math.max(this.getRWidth(a, b), this.getTBOverlap(a, b)),
                  this.dy -= this.getBHeight(a),
                this.hasHorizontalSiblings(a) && (this.dy -= (this.getLRHeight() - b.height) / 2)
            },
            moveRootFromParent: function() {
                var a = this.parentArea;
                a && (this.dy -= a.firstChildGap),
                  this.dx -= this.rootSize.width / 2 + this.rootOffset + this.parentGap
            },
            getRelativeVertices: function(a, b) {
                var c = this.getConnectionPoint(a);
                return [c.clone().offset(0, b.dy - a.height / 2)]
            },
            getRelativeVerticesAvoidingSiblings: function(a, b, c) {
                var e = b.dx + this.rootSize.width / 4
                  , f = b.dy;
                return f -= Math.max(c.height, this.rootSize.height) / 2,
                  f -= this.getMinimalGap(c) / 2,
                  [d.point(0, f), d.point(e, f)]
            }
        })
          , B = {
            rotate: function(a) {
                var b = "LRBT"
                  , c = b.indexOf(a[0]) - b.indexOf(a[1]);
                return function(a) {
                    var d = b.indexOf(a);
                    return d >= 0 ? b[(4 + d - c) % 4] : a
                }
            },
            flip: function(a) {
                var b = a[0]
                  , c = a[1];
                return function(a) {
                    return a === b ? c : a === c ? b : a
                }
            },
            straighten: function(a) {
                return function() {
                    return a[1]
                }
            }
        }
          , C = b.Model.extend({
            defaults: {
                graph: void 0,
                gap: 20,
                parentGap: 20,
                siblingGap: 20,
                firstChildGap: 20,
                direction: "R",
                directionRule: B.straighten,
                updatePosition: function(a, b, c) {
                    a.set("position", b, c)
                },
                updateVertices: function(a, b, c) {
                    a.set("vertices", b, c)
                },
                updateAttributes: null,
                filter: null,
                attributeNames: {}
            },
            initialize: function() {
                this._cacheOptions(this.attributes),
                  this.layoutAreas = {}
            },
            layout: function(a) {
                this.layoutAreas = {};
                for (var b = this.getGraphSources(a), c = 0, d = b.length; c < d; c++)
                    this.layoutTree(b[c], a);
                return this.trigger("layout:done", a),
                  this
            },
            layoutTree: function(a, b) {
                b = b || {},
                  b.treeLayout = !0;
                var c = this._computeLayoutAreas(a, null, b);
                return this._computeAbsolutePositions(c),
                  this._updateCells(c, b),
                  this
            },
            getLayoutArea: function(a) {
                return this.layoutAreas[a.id || a] || null
            },
            getRootLayoutAreas: function() {
                return this.getGraphSources().map(this.getLayoutArea, this)
            },
            getGraphSources: function(a) {
                var b = this.graph.getSources();
                return this.filter && b.length > 0 && (b = this.filter(b, null, a) || b),
                  b
            },
            getMinimalRootAreaByPoint: function(b) {
                var c = this.getRootLayoutAreas().filter(function(a) {
                    return a.containsPoint(b)
                });
                return a.util.isEmpty(c) ? null : c.reduce(function(a, b) {
                    return b.width * b.height < a.min && (a.min = b.width * b.height,
                      a.item = b),
                      a
                }, {
                    min: 1 / 0,
                    item: void 0
                }).item
            },
            _computeLayoutAreas: function(a, b, c) {
                var d = b ? b.direction : this.get("direction")
                  , e = a.get(this.getAttributeName("direction")) || d
                  , g = f.create(e, a, this.attributes);
                g.parentArea = b,
                  g.link = this.graph.getConnectedLinks(a, {
                      inbound: !0
                  })[0];
                var h = this._getChildren(a, c);
                this.layoutAreas[a.id] = g;
                for (var i = [], j = 0, k = h.length; j < k; j++)
                    i.push(this._computeLayoutAreas(h[j], g, c));
                return g.compute(i),
                  g
            },
            _cacheOptions: function(b) {
                var c = ["updateAttributes", "updateVertices", "updatePosition", "filter"];
                c.forEach(function(c) {
                    this[c] = a.util.isFunction(b[c]) ? b[c] : null
                }, this),
                  this.graph = b.graph
            },
            _getChildren: function(a, b) {
                if (this.layoutAreas[a.id])
                    return [];
                var c = this.graph.getNeighbors(a, {
                    outbound: !0
                });
                return this.filter && c.length > 0 && (c = this.filter(c, a, b) || c),
                  c
            },
            _computeAbsolutePositions: function(a) {
                a.computeAbsolutePosition(a);
                for (var b = 0, c = a.childAreas.length; b < c; b++)
                    this._computeAbsolutePositions(a.childAreas[b])
            },
            _updateCells: function(a, b) {
                var c = a.root
                  , d = a.link || null;
                d && (this.updatePosition && this.updatePosition(c, a.getRootPosition(), b),
                this.updateVertices && this.updateVertices(d, a.getRootVertices(), b)),
                  this.changeSiblingRank(c, a.siblingRank, b),
                this.updateAttributes && this.updateAttributes(a, c, d, b);
                for (var e = 0, f = a.childAreas.length; e < f; e++)
                    this._updateCells(a.childAreas[e], b)
            },
            updateDirections: function(a, b, c) {
                c = c || {};
                var d = this.getAttributeName("direction")
                  , e = this.get("directionRule")(b);
                this.graph.search(a, function(a, b) {
                    if (0 !== b) {
                        var f = e(a.get(d));
                        this.changeDirection(a, f, c)
                    }
                }
                  .bind(this), {
                    outbound: !0
                })
            },
            reconnectElement: function(a, b, c) {
                c = c || {};
                var d = this.getLayoutArea(a)
                  , e = d.link;
                if (e) {
                    e.set("source", {
                        id: b.id || b
                    }, c);
                    var f = d.direction
                      , g = c.direction || f
                      , h = c.siblingRank || void 0;
                    return this.changeSiblingRank(a, h, c),
                      this.changeDirection(a, g, c),
                    f !== g && this.updateDirections(a, [f, c.direction], c),
                      !0
                }
                return !1
            },
            changeSiblingRank: function(a, b, c) {
                a.set(this.getAttributeName("siblingRank"), b, c)
            },
            changeDirection: function(a, b, c) {
                a.set(this.getAttributeName("direction"), b, c)
            },
            getAttributeName: function(a) {
                return this.get("attributeNames")[a] || a
            },
            getAttribute: function(a, b) {
                return a.get(this.getAttributeName(b))
            },
            prepare: function() {
                return this
            }
        }, {
            directionRules: B
        });
        a.layout.TreeLayout = C
    }(joint, Backbone, _, g);


  joint.format.gexf = {},
    joint.format.gexf.toCellsArray = function(a, b, c) {
        var d = new DOMParser
          , e = d.parseFromString(a, "text/xml");
        if ("parsererror" == e.documentElement.nodeName)
            throw new Error("Error while parsing GEXF file.");
        var f = Array.from(e.documentElement.querySelectorAll("node"))
          , g = Array.from(e.documentElement.querySelectorAll("edge"))
          , h = [];
        return f.forEach(function(a) {
            var c = parseFloat(a.querySelector("size").getAttribute("value"))
              , d = b({
                id: a.getAttribute("id"),
                width: c,
                height: c,
                label: a.getAttribute("label")
            });
            h.push(d)
        }),
          g.forEach(function(a) {
              var b = c({
                  source: a.getAttribute("source"),
                  target: a.getAttribute("target")
              });
              h.unshift(b)
          }),
          h
    };


  !function(a, b, c, d) {
        function e(a) {
            var b = c.Deferred()
              , e = a.attr("xlink:href") || a.attr("href");
            return d.imageToDataUri(e, function(c, d) {
                !c && d && a.attr("xlink:href", d),
                  b.resolve()
            }),
              b.promise()
        }
        function f(a) {
            return (new XMLSerializer).serializeToString(a).replace(/&nbsp;/g, " ")
        }
        function g(a, c) {
            var d = a.ownerDocument
              , e = d.implementation.createDocument(null, "xml", null);
            b(a).prepend(b("style", {
                type: "text/css"
            }, [e.createCDATASection(c)]))
        }
        function h(b, d) {
            for (var e = Array.from(b.querySelectorAll("*")), f = Array.from(d.querySelectorAll("*")), g = b.ownerDocument, h = g.styleSheets.length, i = [], j = h - 1; j >= 0; j--)
                i[j] = g.styleSheets[j],
                  g.styleSheets[j].disabled = !0;
            var k = {};
            e.forEach(function(b, c) {
                var d = window.getComputedStyle(b, null)
                  , e = {};
                a.util.forIn(d, function(a) {
                    e[a] = d.getPropertyValue(a)
                }),
                  k[c] = e
            }),
            h != g.styleSheets.length && i.forEach(function(a, b) {
                g.styleSheets[b] = a
            });
            for (var l = 0; l < h; l++)
                g.styleSheets[l].disabled = !1;
            var m = {};
            e.forEach(function(b, c) {
                var d = window.getComputedStyle(b, null)
                  , e = k[c]
                  , f = {};
                a.util.forIn(d, function(a) {
                    isNaN(a) && d.getPropertyValue(a) !== e[a] && (f[a] = d.getPropertyValue(a))
                }),
                  m[c] = f
            }),
              f.forEach(function(a, b) {
                  c(a).css(m[b])
              })
        }
        a.dia.Paper.prototype.toSVG = function(a, i) {
            i = i || {},
              this.trigger("beforeexport", i);
            var j = b(this.svg).clone()
              , k = j.findOne("." + d.addClassNamePrefix("viewport"))
              , l = i.area || this.paperToLocalRect(this.getContentBBox())
              , m = i.preserveDimensions;
            m && j.attr({
                width: m.width || l.width,
                height: m.height || l.height
            }),
              j.removeAttr("style").attr("viewBox", [l.x, l.y, l.width, l.height].join(" ")),
              k.removeAttr("transform"),
            i.useComputedStyles !== !1 && h(this.svg, j.node);
            var n = i.stylesheet;
            if (d.isString(n) && g(j.node, n),
                this.trigger("afterexport", i),
                i.convertImagesToDataUris) {
                var o = j.find("image")
                  , p = o.map(e);
                c.when.apply(c, p).then(function() {
                    a(f(j.node))
                })
            } else
                a(f(j.node))
        }
          ,
          a.dia.Paper.prototype.openAsSVG = function(a) {
              var b = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
                , c = d.uniqueId("svg_output");
              this.toSVG(function(a) {
                  var d = window.open("", c, b)
                    , e = "data:image/svg+xml," + encodeURIComponent(a);
                  d.document.write('<img src="' + e + '" style="max-height:100%" />')
              }, d.assign({
                  convertImagesToDataUris: !0
              }, a))
          }
    }(joint, V, $, joint.util);


  !function(a) {
      function b(a) {
          for (var b = a.data, c = a.width * a.height * 4, d = 0; d < c; d += 4) {
              var e = b[d + 3] / 255;
              b[d] *= e,
                b[d + 1] *= e,
                b[d + 2] *= e
          }
      }
      function c(a) {
          for (var b = a.data, c = a.width * a.height * 4, d = 0; d < c; d += 4) {
              var e = b[d + 3];
              0 != e && (e = 255 / e,
                b[d] *= e,
                b[d + 1] *= e,
                b[d + 2] *= e)
          }
      }
      function d(a, b, c, d) {
          var g = document.getElementById(a)
            , h = g.naturalWidth
            , i = g.naturalHeight
            , j = document.getElementById(b);
          j.style.width = h + "px",
            j.style.height = i + "px",
            j.width = h,
            j.height = i;
          var k = j.getContext("2d");
          k.clearRect(0, 0, h, i),
            k.drawImage(g, 0, 0),
          isNaN(c) || c < 1 || (d ? e(b, 0, 0, h, i, c) : f(b, 0, 0, h, i, c))
      }
      function e(a, d, e, f, j, k) {
          if (!(isNaN(k) || k < 1)) {
              k |= 0;
              var l, m = document.getElementById(a), n = m.getContext("2d");
              try {
                  try {
                      l = n.getImageData(d, e, f, j)
                  } catch (o) {
                      try {
                          netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),
                            l = n.getImageData(d, e, f, j)
                      } catch (o) {
                          throw alert("Cannot access local image"),
                            new Error("unable to access local image data: " + o)
                      }
                  }
              } catch (o) {
                  throw alert("Cannot access image"),
                    new Error("unable to access image data: " + o)
              }
              b(l);
              var p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = l.data, O = k + k + 1, P = f - 1, Q = j - 1, R = k + 1, S = R * (R + 1) / 2, T = new g, U = T;
              for (r = 1; r < O; r++)
                  if (U = U.next = new g,
                    r == R)
                      var V = U;
              U.next = T;
              var W = null
                , X = null;
              v = u = 0;
              var Y = h[k]
                , Z = i[k];
              for (q = 0; q < j; q++) {
                  for (E = F = G = H = w = x = y = z = 0,
                         A = R * (I = N[u]),
                         B = R * (J = N[u + 1]),
                         C = R * (K = N[u + 2]),
                         D = R * (L = N[u + 3]),
                         w += S * I,
                         x += S * J,
                         y += S * K,
                         z += S * L,
                         U = T,
                         r = 0; r < R; r++)
                      U.r = I,
                        U.g = J,
                        U.b = K,
                        U.a = L,
                        U = U.next;
                  for (r = 1; r < R; r++)
                      s = u + ((P < r ? P : r) << 2),
                        w += (U.r = I = N[s]) * (M = R - r),
                        x += (U.g = J = N[s + 1]) * M,
                        y += (U.b = K = N[s + 2]) * M,
                        z += (U.a = L = N[s + 3]) * M,
                        E += I,
                        F += J,
                        G += K,
                        H += L,
                        U = U.next;
                  for (W = T,
                         X = V,
                         p = 0; p < f; p++)
                      N[u] = w * Y >> Z,
                        N[u + 1] = x * Y >> Z,
                        N[u + 2] = y * Y >> Z,
                        N[u + 3] = z * Y >> Z,
                        w -= A,
                        x -= B,
                        y -= C,
                        z -= D,
                        A -= W.r,
                        B -= W.g,
                        C -= W.b,
                        D -= W.a,
                        s = v + ((s = p + k + 1) < P ? s : P) << 2,
                        E += W.r = N[s],
                        F += W.g = N[s + 1],
                        G += W.b = N[s + 2],
                        H += W.a = N[s + 3],
                        w += E,
                        x += F,
                        y += G,
                        z += H,
                        W = W.next,
                        A += I = X.r,
                        B += J = X.g,
                        C += K = X.b,
                        D += L = X.a,
                        E -= I,
                        F -= J,
                        G -= K,
                        H -= L,
                        X = X.next,
                        u += 4;
                  v += f
              }
              for (p = 0; p < f; p++) {
                  for (F = G = H = E = x = y = z = w = 0,
                         u = p << 2,
                         A = R * (I = N[u]),
                         B = R * (J = N[u + 1]),
                         C = R * (K = N[u + 2]),
                         D = R * (L = N[u + 3]),
                         w += S * I,
                         x += S * J,
                         y += S * K,
                         z += S * L,
                         U = T,
                         r = 0; r < R; r++)
                      U.r = I,
                        U.g = J,
                        U.b = K,
                        U.a = L,
                        U = U.next;
                  for (t = f,
                         r = 1; r <= k; r++)
                      u = t + p << 2,
                        w += (U.r = I = N[u]) * (M = R - r),
                        x += (U.g = J = N[u + 1]) * M,
                        y += (U.b = K = N[u + 2]) * M,
                        z += (U.a = L = N[u + 3]) * M,
                        E += I,
                        F += J,
                        G += K,
                        H += L,
                        U = U.next,
                      r < Q && (t += f);
                  for (u = p,
                         W = T,
                         X = V,
                         q = 0; q < j; q++)
                      s = u << 2,
                        N[s] = w * Y >> Z,
                        N[s + 1] = x * Y >> Z,
                        N[s + 2] = y * Y >> Z,
                        N[s + 3] = z * Y >> Z,
                        w -= A,
                        x -= B,
                        y -= C,
                        z -= D,
                        A -= W.r,
                        B -= W.g,
                        C -= W.b,
                        D -= W.a,
                        s = p + ((s = q + R) < Q ? s : Q) * f << 2,
                        w += E += W.r = N[s],
                        x += F += W.g = N[s + 1],
                        y += G += W.b = N[s + 2],
                        z += H += W.a = N[s + 3],
                        W = W.next,
                        A += I = X.r,
                        B += J = X.g,
                        C += K = X.b,
                        D += L = X.a,
                        E -= I,
                        F -= J,
                        G -= K,
                        H -= L,
                        X = X.next,
                        u += f
              }
              c(l),
                n.putImageData(l, d, e)
          }
      }
      function f(a, b, c, d, e, f) {
          if (!(isNaN(f) || f < 1)) {
              f |= 0;
              var j, k = document.getElementById(a), l = k.getContext("2d");
              try {
                  try {
                      j = l.getImageData(b, c, d, e)
                  } catch (m) {
                      try {
                          netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),
                            j = l.getImageData(b, c, d, e)
                      } catch (m) {
                          throw alert("Cannot access local image"),
                            new Error("unable to access local image data: " + m)
                      }
                  }
              } catch (m) {
                  throw alert("Cannot access image"),
                    new Error("unable to access image data: " + m)
              }
              var n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H = j.data, I = f + f + 1, J = d - 1, K = e - 1, L = f + 1, M = L * (L + 1) / 2, N = new g, O = N;
              for (p = 1; p < I; p++)
                  if (O = O.next = new g,
                    p == L)
                      var P = O;
              O.next = N;
              var Q = null
                , R = null;
              t = s = 0;
              var S = h[f]
                , T = i[f];
              for (o = 0; o < e; o++) {
                  for (A = B = C = u = v = w = 0,
                         x = L * (D = H[s]),
                         y = L * (E = H[s + 1]),
                         z = L * (F = H[s + 2]),
                         u += M * D,
                         v += M * E,
                         w += M * F,
                         O = N,
                         p = 0; p < L; p++)
                      O.r = D,
                        O.g = E,
                        O.b = F,
                        O = O.next;
                  for (p = 1; p < L; p++)
                      q = s + ((J < p ? J : p) << 2),
                        u += (O.r = D = H[q]) * (G = L - p),
                        v += (O.g = E = H[q + 1]) * G,
                        w += (O.b = F = H[q + 2]) * G,
                        A += D,
                        B += E,
                        C += F,
                        O = O.next;
                  for (Q = N,
                         R = P,
                         n = 0; n < d; n++)
                      H[s] = u * S >> T,
                        H[s + 1] = v * S >> T,
                        H[s + 2] = w * S >> T,
                        u -= x,
                        v -= y,
                        w -= z,
                        x -= Q.r,
                        y -= Q.g,
                        z -= Q.b,
                        q = t + ((q = n + f + 1) < J ? q : J) << 2,
                        A += Q.r = H[q],
                        B += Q.g = H[q + 1],
                        C += Q.b = H[q + 2],
                        u += A,
                        v += B,
                        w += C,
                        Q = Q.next,
                        x += D = R.r,
                        y += E = R.g,
                        z += F = R.b,
                        A -= D,
                        B -= E,
                        C -= F,
                        R = R.next,
                        s += 4;
                  t += d
              }
              for (n = 0; n < d; n++) {
                  for (B = C = A = v = w = u = 0,
                         s = n << 2,
                         x = L * (D = H[s]),
                         y = L * (E = H[s + 1]),
                         z = L * (F = H[s + 2]),
                         u += M * D,
                         v += M * E,
                         w += M * F,
                         O = N,
                         p = 0; p < L; p++)
                      O.r = D,
                        O.g = E,
                        O.b = F,
                        O = O.next;
                  for (r = d,
                         p = 1; p <= f; p++)
                      s = r + n << 2,
                        u += (O.r = D = H[s]) * (G = L - p),
                        v += (O.g = E = H[s + 1]) * G,
                        w += (O.b = F = H[s + 2]) * G,
                        A += D,
                        B += E,
                        C += F,
                        O = O.next,
                      p < K && (r += d);
                  for (s = n,
                         Q = N,
                         R = P,
                         o = 0; o < e; o++)
                      q = s << 2,
                        H[q] = u * S >> T,
                        H[q + 1] = v * S >> T,
                        H[q + 2] = w * S >> T,
                        u -= x,
                        v -= y,
                        w -= z,
                        x -= Q.r,
                        y -= Q.g,
                        z -= Q.b,
                        q = n + ((q = o + L) < K ? q : K) * d << 2,
                        u += A += Q.r = H[q],
                        v += B += Q.g = H[q + 1],
                        w += C += Q.b = H[q + 2],
                        Q = Q.next,
                        x += D = R.r,
                        y += E = R.g,
                        z += F = R.b,
                        A -= D,
                        B -= E,
                        C -= F,
                        R = R.next,
                        s += d
              }
              l.putImageData(j, b, c)
          }
      }
      function g() {
          this.r = 0,
            this.g = 0,
            this.b = 0,
            this.a = 0,
            this.next = null
      }
      var h = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]
        , i = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
        , j = {
          image: d,
          canvasRGBA: e,
          canvasRGB: f
      };
      "undefined" != typeof define && define.amd ? define(function() {
          return j
      }) : "undefined" != typeof module && module.exports && (module.exports = j),
        a.stackBlur = j
  }("undefined" != typeof window ? window : this),
    function(a) {
        function b(a) {
            this.ok = !1,
            "#" == a.charAt(0) && (a = a.substr(1, 6)),
              a = a.replace(/ /g, ""),
              a = a.toLowerCase();
            var c = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "00ffff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000000",
                blanchedalmond: "ffebcd",
                blue: "0000ff",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "00ffff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dodgerblue: "1e90ff",
                feldspar: "d19275",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "ff00ff",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgrey: "d3d3d3",
                lightgreen: "90ee90",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslateblue: "8470ff",
                lightslategray: "778899",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "00ff00",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "ff00ff",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370d8",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "d87093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                red: "ff0000",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                violetred: "d02090",
                wheat: "f5deb3",
                white: "ffffff",
                whitesmoke: "f5f5f5",
                yellow: "ffff00",
                yellowgreen: "9acd32"
            };
            for (var d in c)
                a == d && (a = c[d]);
            for (var e = [{
                re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
                process: function(a) {
                    return [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])]
                }
            }, {
                re: /^(\w{2})(\w{2})(\w{2})$/,
                example: ["#00ff00", "336699"],
                process: function(a) {
                    return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                }
            }, {
                re: /^(\w{1})(\w{1})(\w{1})$/,
                example: ["#fb0", "f0f"],
                process: function(a) {
                    return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                }
            }], f = 0; f < e.length; f++) {
                var g = e[f].re
                  , h = e[f].process
                  , i = g.exec(a);
                i && (channels = h(i),
                  this.r = channels[0],
                  this.g = channels[1],
                  this.b = channels[2],
                  this.ok = !0)
            }
            this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r,
              this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g,
              this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b,
              this.toRGB = function() {
                  return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
              }
              ,
              this.toHex = function() {
                  var a = this.r.toString(16)
                    , b = this.g.toString(16)
                    , c = this.b.toString(16);
                  return 1 == a.length && (a = "0" + a),
                  1 == b.length && (b = "0" + b),
                  1 == c.length && (c = "0" + c),
                  "#" + a + b + c
              }
              ,
              this.getHelpXML = function() {
                  for (var a = new Array, d = 0; d < e.length; d++)
                      for (var f = e[d].example, g = 0; g < f.length; g++)
                          a[a.length] = f[g];
                  for (var h in c)
                      a[a.length] = h;
                  var i = document.createElement("ul");
                  i.setAttribute("id", "rgbcolor-examples");
                  for (var d = 0; d < a.length; d++)
                      try {
                          var j = document.createElement("li")
                            , k = new b(a[d])
                            , l = document.createElement("div");
                          l.style.cssText = "margin: 3px; border: 1px solid black; background:" + k.toHex() + "; color:" + k.toHex(),
                            l.appendChild(document.createTextNode("test"));
                          var m = document.createTextNode(" " + a[d] + " -> " + k.toRGB() + " -> " + k.toHex());
                          j.appendChild(l),
                            j.appendChild(m),
                            i.appendChild(j)
                      } catch (n) {}
                  return i
              }
        }
        "undefined" != typeof define && define.amd ? define(function() {
            return b
        }) : "undefined" != typeof module && module.exports && (module.exports = b),
          a.RGBColor = b
    }("undefined" != typeof window ? window : this),
    function(a, b) {
        "use strict";
        "undefined" != typeof define && define.amd ? define("canvgModule", ["rgbcolor", "stackblur"], b) : "undefined" != typeof module && module.exports && (module.exports = b(require("rgbcolor"), require("stackblur"))),
          a.canvg = b(a.RGBColor, a.stackBlur)
    }("undefined" != typeof window ? window : this, function(a, b) {
        function c(a) {
            var b = [0, 0, 0]
              , c = function(c, d) {
                var e = a.match(c);
                null != e && (b[d] += e.length,
                  a = a.replace(c, " "))
            };
            return a = a.replace(/:not\(([^\)]*)\)/g, "     $1 "),
              a = a.replace(/{[\s\S]*/gm, " "),
              c(g, 1),
              c(h, 0),
              c(j, 1),
              c(k, 2),
              c(l, 1),
              c(m, 1),
              a = a.replace(/[\*\s\+>~]/g, " "),
              a = a.replace(/[#\.]/g, " "),
              c(n, 2),
              b.join("")
        }
        function d(d) {
            var f = {
                opts: d
            };
            f.FRAMERATE = 30,
              f.MAX_VIRTUAL_PIXELS = 3e4,
              f.log = function(a) {}
              ,
            1 == f.opts.log && "undefined" != typeof console && (f.log = function(a) {
                  console.log(a)
              }
            ),
              f.init = function(a) {
                  var b = 0;
                  f.UniqueId = function() {
                      return b++,
                      "canvg" + b
                  }
                    ,
                    f.Definitions = {},
                    f.Styles = {},
                    f.StylesSpecificity = {},
                    f.Animations = [],
                    f.Images = [],
                    f.ctx = a,
                    f.ViewPort = new function() {
                        this.viewPorts = [],
                          this.Clear = function() {
                              this.viewPorts = []
                          }
                          ,
                          this.SetCurrent = function(a, b) {
                              this.viewPorts.push({
                                  width: a,
                                  height: b
                              })
                          }
                          ,
                          this.RemoveCurrent = function() {
                              this.viewPorts.pop()
                          }
                          ,
                          this.Current = function() {
                              return this.viewPorts[this.viewPorts.length - 1]
                          }
                          ,
                          this.width = function() {
                              return this.Current().width
                          }
                          ,
                          this.height = function() {
                              return this.Current().height
                          }
                          ,
                          this.ComputeSize = function(a) {
                              return null != a && "number" == typeof a ? a : "x" == a ? this.width() : "y" == a ? this.height() : Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2)
                          }
                    }
              }
              ,
              f.init(),
              f.ImagesLoaded = function() {
                  for (var a = 0; a < f.Images.length; a++)
                      if (!f.Images[a].loaded)
                          return !1;
                  return !0
              }
              ,
              f.trim = function(a) {
                  return a.replace(/^\s+|\s+$/g, "")
              }
              ,
              f.compressSpaces = function(a) {
                  return a.replace(/[\s\r\t\n]+/gm, " ")
              }
              ,
              f.ajax = function(a) {
                  var b;
                  return b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                    b ? (b.open("GET", a, !1),
                      b.send(null),
                      b.responseText) : null
              }
              ,
              f.parseXml = function(a) {
                  if ("undefined" != typeof Windows && "undefined" != typeof Windows.Data && "undefined" != typeof Windows.Data.Xml) {
                      var b = new Windows.Data.Xml.Dom.XmlDocument
                        , c = new Windows.Data.Xml.Dom.XmlLoadSettings;
                      return c.prohibitDtd = !1,
                        b.loadXml(a, c),
                        b
                  }
                  if (!window.DOMParser) {
                      a = a.replace(/<!DOCTYPE svg[^>]*>/, "");
                      var b = new ActiveXObject("Microsoft.XMLDOM");
                      return b.async = "false",
                        b.loadXML(a),
                        b
                  }
                  try {
                      var d = new DOMParser;
                      return d.parseFromString(a, "image/svg+xml")
                  } catch (e) {
                      return d = new DOMParser,
                        d.parseFromString(a, "text/xml")
                  }
              }
              ,
              f.Property = function(a, b) {
                  this.name = a,
                    this.value = b
              }
              ,
              f.Property.prototype.getValue = function() {
                  return this.value
              }
              ,
              f.Property.prototype.hasValue = function() {
                  return null != this.value && "" !== this.value
              }
              ,
              f.Property.prototype.numValue = function() {
                  if (!this.hasValue())
                      return 0;
                  var a = parseFloat(this.value);
                  return (this.value + "").match(/%$/) && (a /= 100),
                    a
              }
              ,
              f.Property.prototype.valueOrDefault = function(a) {
                  return this.hasValue() ? this.value : a
              }
              ,
              f.Property.prototype.numValueOrDefault = function(a) {
                  return this.hasValue() ? this.numValue() : a
              }
              ,
              f.Property.prototype.addOpacity = function(b) {
                  var c = this.value;
                  if (null != b.value && "" != b.value && "string" == typeof this.value) {
                      var d = new a(this.value);
                      d.ok && (c = "rgba(" + d.r + ", " + d.g + ", " + d.b + ", " + b.numValue() + ")")
                  }
                  return new f.Property(this.name,c)
              }
              ,
              f.Property.prototype.getDefinition = function() {
                  var a = this.value.match(/#([^\)'"]+)/);
                  return a && (a = a[1]),
                  a || (a = this.value),
                    f.Definitions[a]
              }
              ,
              f.Property.prototype.isUrlDefinition = function() {
                  return 0 == this.value.indexOf("url(")
              }
              ,
              f.Property.prototype.getFillStyleDefinition = function(a, b) {
                  var c = this.getDefinition();
                  if (null != c && c.createGradient)
                      return c.createGradient(f.ctx, a, b);
                  if (null != c && c.createPattern) {
                      if (c.getHrefAttribute().hasValue()) {
                          var d = c.attribute("patternTransform");
                          c = c.getHrefAttribute().getDefinition(),
                          d.hasValue() && (c.attribute("patternTransform", !0).value = d.value)
                      }
                      return c.createPattern(f.ctx, a)
                  }
                  return null
              }
              ,
              f.Property.prototype.getDPI = function(a) {
                  return 96
              }
              ,
              f.Property.prototype.getEM = function(a) {
                  var b = 12
                    , c = new f.Property("fontSize",f.Font.Parse(f.ctx.font).fontSize);
                  return c.hasValue() && (b = c.toPixels(a)),
                    b
              }
              ,
              f.Property.prototype.getUnits = function() {
                  var a = this.value + "";
                  return a.replace(/[0-9\.\-]/g, "")
              }
              ,
              f.Property.prototype.toPixels = function(a, b) {
                  if (!this.hasValue())
                      return 0;
                  var c = this.value + "";
                  if (c.match(/em$/))
                      return this.numValue() * this.getEM(a);
                  if (c.match(/ex$/))
                      return this.numValue() * this.getEM(a) / 2;
                  if (c.match(/px$/))
                      return this.numValue();
                  if (c.match(/pt$/))
                      return this.numValue() * this.getDPI(a) * (1 / 72);
                  if (c.match(/pc$/))
                      return 15 * this.numValue();
                  if (c.match(/cm$/))
                      return this.numValue() * this.getDPI(a) / 2.54;
                  if (c.match(/mm$/))
                      return this.numValue() * this.getDPI(a) / 25.4;
                  if (c.match(/in$/))
                      return this.numValue() * this.getDPI(a);
                  if (c.match(/%$/))
                      return this.numValue() * f.ViewPort.ComputeSize(a);
                  var d = this.numValue();
                  return b && d < 1 ? d * f.ViewPort.ComputeSize(a) : d
              }
              ,
              f.Property.prototype.toMilliseconds = function() {
                  if (!this.hasValue())
                      return 0;
                  var a = this.value + "";
                  return a.match(/s$/) ? 1e3 * this.numValue() : a.match(/ms$/) ? this.numValue() : this.numValue()
              }
              ,
              f.Property.prototype.toRadians = function() {
                  if (!this.hasValue())
                      return 0;
                  var a = this.value + "";
                  return a.match(/deg$/) ? this.numValue() * (Math.PI / 180) : a.match(/grad$/) ? this.numValue() * (Math.PI / 200) : a.match(/rad$/) ? this.numValue() : this.numValue() * (Math.PI / 180)
              }
            ;
            var g = {
                baseline: "alphabetic",
                "before-edge": "top",
                "text-before-edge": "top",
                middle: "middle",
                central: "middle",
                "after-edge": "bottom",
                "text-after-edge": "bottom",
                ideographic: "ideographic",
                alphabetic: "alphabetic",
                hanging: "hanging",
                mathematical: "alphabetic"
            };
            return f.Property.prototype.toTextBaseline = function() {
                return this.hasValue() ? g[this.value] : null
            }
              ,
              f.Font = new function() {
                  this.Styles = "normal|italic|oblique|inherit",
                    this.Variants = "normal|small-caps|inherit",
                    this.Weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit",
                    this.CreateFont = function(a, b, c, d, e, g) {
                        var h = null != g ? this.Parse(g) : this.CreateFont("", "", "", "", "", f.ctx.font);
                        return {
                            fontFamily: e || h.fontFamily,
                            fontSize: d || h.fontSize,
                            fontStyle: a || h.fontStyle,
                            fontWeight: c || h.fontWeight,
                            fontVariant: b || h.fontVariant,
                            toString: function() {
                                return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(" ")
                            }
                        }
                    }
                  ;
                  var a = this;
                  this.Parse = function(b) {
                      for (var c = {}, d = f.trim(f.compressSpaces(b || "")).split(" "), e = {
                          fontSize: !1,
                          fontStyle: !1,
                          fontWeight: !1,
                          fontVariant: !1
                      }, g = "", h = 0; h < d.length; h++)
                          e.fontStyle || a.Styles.indexOf(d[h]) == -1 ? e.fontVariant || a.Variants.indexOf(d[h]) == -1 ? e.fontWeight || a.Weights.indexOf(d[h]) == -1 ? e.fontSize ? "inherit" != d[h] && (g += d[h]) : ("inherit" != d[h] && (c.fontSize = d[h].split("/")[0]),
                            e.fontStyle = e.fontVariant = e.fontWeight = e.fontSize = !0) : ("inherit" != d[h] && (c.fontWeight = d[h]),
                            e.fontStyle = e.fontVariant = e.fontWeight = !0) : ("inherit" != d[h] && (c.fontVariant = d[h]),
                            e.fontStyle = e.fontVariant = !0) : ("inherit" != d[h] && (c.fontStyle = d[h]),
                            e.fontStyle = !0);
                      return "" != g && (c.fontFamily = g),
                        c
                  }
              }
              ,
              f.ToNumberArray = function(a) {
                  for (var b = f.trim(f.compressSpaces((a || "").replace(/,/g, " "))).split(" "), c = 0; c < b.length; c++)
                      b[c] = parseFloat(b[c]);
                  return b
              }
              ,
              f.Point = function(a, b) {
                  this.x = a,
                    this.y = b
              }
              ,
              f.Point.prototype.angleTo = function(a) {
                  return Math.atan2(a.y - this.y, a.x - this.x)
              }
              ,
              f.Point.prototype.applyTransform = function(a) {
                  var b = this.x * a[0] + this.y * a[2] + a[4]
                    , c = this.x * a[1] + this.y * a[3] + a[5];
                  this.x = b,
                    this.y = c
              }
              ,
              f.CreatePoint = function(a) {
                  var b = f.ToNumberArray(a);
                  return new f.Point(b[0],b[1])
              }
              ,
              f.CreatePath = function(a) {
                  for (var b = f.ToNumberArray(a), c = [], d = 0; d < b.length; d += 2)
                      c.push(new f.Point(b[d],b[d + 1]));
                  return c
              }
              ,
              f.BoundingBox = function(a, b, c, d) {
                  this.x1 = Number.NaN,
                    this.y1 = Number.NaN,
                    this.x2 = Number.NaN,
                    this.y2 = Number.NaN,
                    this.x = function() {
                        return this.x1
                    }
                    ,
                    this.y = function() {
                        return this.y1
                    }
                    ,
                    this.width = function() {
                        return this.x2 - this.x1
                    }
                    ,
                    this.height = function() {
                        return this.y2 - this.y1
                    }
                    ,
                    this.addPoint = function(a, b) {
                        null != a && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = a,
                          this.x2 = a),
                        a < this.x1 && (this.x1 = a),
                        a > this.x2 && (this.x2 = a)),
                        null != b && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = b,
                          this.y2 = b),
                        b < this.y1 && (this.y1 = b),
                        b > this.y2 && (this.y2 = b))
                    }
                    ,
                    this.addX = function(a) {
                        this.addPoint(a, null)
                    }
                    ,
                    this.addY = function(a) {
                        this.addPoint(null, a)
                    }
                    ,
                    this.addBoundingBox = function(a) {
                        this.addPoint(a.x1, a.y1),
                          this.addPoint(a.x2, a.y2)
                    }
                    ,
                    this.addQuadraticCurve = function(a, b, c, d, e, f) {
                        var g = a + 2 / 3 * (c - a)
                          , h = b + 2 / 3 * (d - b)
                          , i = g + 1 / 3 * (e - a)
                          , j = h + 1 / 3 * (f - b);
                        this.addBezierCurve(a, b, g, i, h, j, e, f)
                    }
                    ,
                    this.addBezierCurve = function(a, b, c, d, e, f, g, h) {
                        var j = [a, b]
                          , k = [c, d]
                          , l = [e, f]
                          , m = [g, h];
                        for (this.addPoint(j[0], j[1]),
                               this.addPoint(m[0], m[1]),
                               i = 0; i <= 1; i++) {
                            var n = function(a) {
                                return Math.pow(1 - a, 3) * j[i] + 3 * Math.pow(1 - a, 2) * a * k[i] + 3 * (1 - a) * Math.pow(a, 2) * l[i] + Math.pow(a, 3) * m[i]
                            }
                              , o = 6 * j[i] - 12 * k[i] + 6 * l[i]
                              , p = -3 * j[i] + 9 * k[i] - 9 * l[i] + 3 * m[i]
                              , q = 3 * k[i] - 3 * j[i];
                            if (0 != p) {
                                var r = Math.pow(o, 2) - 4 * q * p;
                                if (!(r < 0)) {
                                    var s = (-o + Math.sqrt(r)) / (2 * p);
                                    0 < s && s < 1 && (0 == i && this.addX(n(s)),
                                    1 == i && this.addY(n(s)));
                                    var t = (-o - Math.sqrt(r)) / (2 * p);
                                    0 < t && t < 1 && (0 == i && this.addX(n(t)),
                                    1 == i && this.addY(n(t)))
                                }
                            } else {
                                if (0 == o)
                                    continue;
                                var u = -q / o;
                                0 < u && u < 1 && (0 == i && this.addX(n(u)),
                                1 == i && this.addY(n(u)))
                            }
                        }
                    }
                    ,
                    this.isPointInBox = function(a, b) {
                        return this.x1 <= a && a <= this.x2 && this.y1 <= b && b <= this.y2
                    }
                    ,
                    this.addPoint(a, b),
                    this.addPoint(c, d)
              }
              ,
              f.Transform = function(a) {
                  var b = this;
                  this.Type = {},
                    this.Type.translate = function(a) {
                        this.p = f.CreatePoint(a),
                          this.apply = function(a) {
                              a.translate(this.p.x || 0, this.p.y || 0)
                          }
                          ,
                          this.unapply = function(a) {
                              a.translate(-1 * this.p.x || 0, -1 * this.p.y || 0)
                          }
                          ,
                          this.applyToPoint = function(a) {
                              a.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0])
                          }
                    }
                    ,
                    this.Type.rotate = function(a) {
                        var b = f.ToNumberArray(a);
                        this.angle = new f.Property("angle",b[0]),
                          this.cx = b[1] || 0,
                          this.cy = b[2] || 0,
                          this.apply = function(a) {
                              a.translate(this.cx, this.cy),
                                a.rotate(this.angle.toRadians()),
                                a.translate(-this.cx, -this.cy)
                          }
                          ,
                          this.unapply = function(a) {
                              a.translate(this.cx, this.cy),
                                a.rotate(-1 * this.angle.toRadians()),
                                a.translate(-this.cx, -this.cy)
                          }
                          ,
                          this.applyToPoint = function(a) {
                              var b = this.angle.toRadians();
                              a.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0]),
                                a.applyTransform([Math.cos(b), Math.sin(b), -Math.sin(b), Math.cos(b), 0, 0]),
                                a.applyTransform([1, 0, 0, 1, -this.p.x || 0, -this.p.y || 0])
                          }
                    }
                    ,
                    this.Type.scale = function(a) {
                        this.p = f.CreatePoint(a),
                          this.apply = function(a) {
                              a.scale(this.p.x || 1, this.p.y || this.p.x || 1)
                          }
                          ,
                          this.unapply = function(a) {
                              a.scale(1 / this.p.x || 1, 1 / this.p.y || this.p.x || 1)
                          }
                          ,
                          this.applyToPoint = function(a) {
                              a.applyTransform([this.p.x || 0, 0, 0, this.p.y || 0, 0, 0])
                          }
                    }
                    ,
                    this.Type.matrix = function(a) {
                        this.m = f.ToNumberArray(a),
                          this.apply = function(a) {
                              a.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5])
                          }
                          ,
                          this.unapply = function(a) {
                              var b = this.m[0]
                                , c = this.m[2]
                                , d = this.m[4]
                                , e = this.m[1]
                                , f = this.m[3]
                                , g = this.m[5]
                                , h = 0
                                , i = 0
                                , j = 1
                                , k = 1 / (b * (f * j - g * i) - c * (e * j - g * h) + d * (e * i - f * h));
                              a.transform(k * (f * j - g * i), k * (g * h - e * j), k * (d * i - c * j), k * (b * j - d * h), k * (c * g - d * f), k * (d * e - b * g))
                          }
                          ,
                          this.applyToPoint = function(a) {
                              a.applyTransform(this.m)
                          }
                    }
                    ,
                    this.Type.SkewBase = function(a) {
                        this.base = b.Type.matrix,
                          this.base(a),
                          this.angle = new f.Property("angle",a)
                    }
                    ,
                    this.Type.SkewBase.prototype = new this.Type.matrix,
                    this.Type.skewX = function(a) {
                        this.base = b.Type.SkewBase,
                          this.base(a),
                          this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0]
                    }
                    ,
                    this.Type.skewX.prototype = new this.Type.SkewBase,
                    this.Type.skewY = function(a) {
                        this.base = b.Type.SkewBase,
                          this.base(a),
                          this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0]
                    }
                    ,
                    this.Type.skewY.prototype = new this.Type.SkewBase,
                    this.transforms = [],
                    this.apply = function(a) {
                        for (var b = 0; b < this.transforms.length; b++)
                            this.transforms[b].apply(a)
                    }
                    ,
                    this.unapply = function(a) {
                        for (var b = this.transforms.length - 1; b >= 0; b--)
                            this.transforms[b].unapply(a)
                    }
                    ,
                    this.applyToPoint = function(a) {
                        for (var b = 0; b < this.transforms.length; b++)
                            this.transforms[b].applyToPoint(a)
                    }
                  ;
                  for (var c = f.trim(f.compressSpaces(a)).replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/), d = 0; d < c.length; d++) {
                      var e = f.trim(c[d].split("(")[0])
                        , g = c[d].split("(")[1].replace(")", "")
                        , h = this.Type[e];
                      if ("undefined" != typeof h) {
                          var i = new h(g);
                          i.type = e,
                            this.transforms.push(i)
                      }
                  }
              }
              ,
              f.AspectRatio = function(a, b, c, d, e, g, h, i, j, k) {
                  b = f.compressSpaces(b),
                    b = b.replace(/^defer\s/, "");
                  var l = b.split(" ")[0] || "xMidYMid"
                    , m = b.split(" ")[1] || "meet"
                    , n = c / d
                    , o = e / g
                    , p = Math.min(n, o)
                    , q = Math.max(n, o);
                  "meet" == m && (d *= p,
                    g *= p),
                  "slice" == m && (d *= q,
                    g *= q),
                    j = new f.Property("refX",j),
                    k = new f.Property("refY",k),
                    j.hasValue() && k.hasValue() ? a.translate(-p * j.toPixels("x"), -p * k.toPixels("y")) : (l.match(/^xMid/) && ("meet" == m && p == o || "slice" == m && q == o) && a.translate(c / 2 - d / 2, 0),
                    l.match(/YMid$/) && ("meet" == m && p == n || "slice" == m && q == n) && a.translate(0, e / 2 - g / 2),
                    l.match(/^xMax/) && ("meet" == m && p == o || "slice" == m && q == o) && a.translate(c - d, 0),
                    l.match(/YMax$/) && ("meet" == m && p == n || "slice" == m && q == n) && a.translate(0, e - g)),
                    "none" == l ? a.scale(n, o) : "meet" == m ? a.scale(p, p) : "slice" == m && a.scale(q, q),
                    a.translate(null == h ? 0 : -h, null == i ? 0 : -i)
              }
              ,
              f.Element = {},
              f.EmptyProperty = new f.Property("EMPTY",""),
              f.Element.ElementBase = function(a) {
                  this.attributes = {},
                    this.styles = {},
                    this.stylesSpecificity = {},
                    this.children = [],
                    this.attribute = function(a, b) {
                        var c = this.attributes[a];
                        return null != c ? c : (1 == b && (c = new f.Property(a,""),
                          this.attributes[a] = c),
                        c || f.EmptyProperty)
                    }
                    ,
                    this.getHrefAttribute = function() {
                        for (var a in this.attributes)
                            if ("href" == a || a.match(/:href$/))
                                return this.attributes[a];
                        return f.EmptyProperty
                    }
                    ,
                    this.style = function(a, b, c) {
                        var d = this.styles[a];
                        if (null != d)
                            return d;
                        var e = this.attribute(a);
                        if (null != e && e.hasValue())
                            return this.styles[a] = e,
                              e;
                        if (1 != c) {
                            var g = this.parent;
                            if (null != g) {
                                var h = g.style(a);
                                if (null != h && h.hasValue())
                                    return h
                            }
                        }
                        return 1 == b && (d = new f.Property(a,""),
                          this.styles[a] = d),
                        d || f.EmptyProperty
                    }
                    ,
                    this.render = function(a) {
                        if ("none" != this.style("display").value && "hidden" != this.style("visibility").value) {
                            if (a.save(),
                                this.style("mask").hasValue()) {
                                var b = this.style("mask").getDefinition();
                                null != b && b.apply(a, this)
                            } else if (this.style("filter").hasValue()) {
                                var c = this.style("filter").getDefinition();
                                null != c && c.apply(a, this)
                            } else
                                this.setContext(a),
                                  this.renderChildren(a),
                                  this.clearContext(a);
                            a.restore()
                        }
                    }
                    ,
                    this.setContext = function(a) {}
                    ,
                    this.clearContext = function(a) {}
                    ,
                    this.renderChildren = function(a) {
                        for (var b = 0; b < this.children.length; b++)
                            this.children[b].render(a)
                    }
                    ,
                    this.addChild = function(a, b) {
                        var c = a;
                        b && (c = f.CreateElement(a)),
                          c.parent = this,
                        "title" != c.type && this.children.push(c)
                    }
                    ,
                    this.addStylesFromStyleDefinition = function() {
                        for (var b in f.Styles)
                            if ("@" != b[0] && e(a, b)) {
                                var c = f.Styles[b]
                                  , d = f.StylesSpecificity[b];
                                if (null != c)
                                    for (var g in c) {
                                        var h = this.stylesSpecificity[g];
                                        "undefined" == typeof h && (h = "000"),
                                        d > h && (this.styles[g] = c[g],
                                          this.stylesSpecificity[g] = d)
                                    }
                            }
                    }
                  ;
                  var b = new RegExp("^[A-Z-]+$")
                    , c = function(a) {
                      return b.test(a) ? a.toLowerCase() : a
                  };
                  if (null != a && 1 == a.nodeType) {
                      for (var d = 0; d < a.attributes.length; d++) {
                          var g = a.attributes[d]
                            , h = c(g.nodeName);
                          this.attributes[h] = new f.Property(h,g.value)
                      }
                      if (this.addStylesFromStyleDefinition(),
                          this.attribute("style").hasValue())
                          for (var i = this.attribute("style").value.split(";"), d = 0; d < i.length; d++)
                              if ("" != f.trim(i[d])) {
                                  var j = i[d].split(":")
                                    , k = f.trim(j[0])
                                    , l = f.trim(j[1]);
                                  this.styles[k] = new f.Property(k,l)
                              }
                      this.attribute("id").hasValue() && null == f.Definitions[this.attribute("id").value] && (f.Definitions[this.attribute("id").value] = this);
                      for (var d = 0; d < a.childNodes.length; d++) {
                          var m = a.childNodes[d];
                          if (1 == m.nodeType && this.addChild(m, !0),
                            this.captureTextNodes && (3 == m.nodeType || 4 == m.nodeType)) {
                              var n = m.value || m.text || m.textContent || "";
                              "" != f.compressSpaces(n) && this.addChild(new f.Element.tspan(m), !1)
                          }
                      }
                  }
              }
              ,
              f.Element.RenderedElementBase = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.setContext = function(a) {
                        if (this.style("fill").isUrlDefinition()) {
                            var b = this.style("fill").getFillStyleDefinition(this, this.style("fill-opacity"));
                            null != b && (a.fillStyle = b)
                        } else if (this.style("fill").hasValue()) {
                            var c = this.style("fill");
                            "currentColor" == c.value && (c.value = this.style("color").value),
                            "inherit" != c.value && (a.fillStyle = "none" == c.value ? "rgba(0,0,0,0)" : c.value)
                        }
                        if (this.style("fill-opacity").hasValue()) {
                            var c = new f.Property("fill",a.fillStyle);
                            c = c.addOpacity(this.style("fill-opacity")),
                              a.fillStyle = c.value
                        }
                        if (this.style("stroke").isUrlDefinition()) {
                            var b = this.style("stroke").getFillStyleDefinition(this, this.style("stroke-opacity"));
                            null != b && (a.strokeStyle = b)
                        } else if (this.style("stroke").hasValue()) {
                            var d = this.style("stroke");
                            "currentColor" == d.value && (d.value = this.style("color").value),
                            "inherit" != d.value && (a.strokeStyle = "none" == d.value ? "rgba(0,0,0,0)" : d.value)
                        }
                        if (this.style("stroke-opacity").hasValue()) {
                            var d = new f.Property("stroke",a.strokeStyle);
                            d = d.addOpacity(this.style("stroke-opacity")),
                              a.strokeStyle = d.value
                        }
                        if (this.style("stroke-width").hasValue()) {
                            var e = this.style("stroke-width").toPixels();
                            a.lineWidth = 0 == e ? .001 : e
                        }
                        if (this.style("stroke-linecap").hasValue() && (a.lineCap = this.style("stroke-linecap").value),
                          this.style("stroke-linejoin").hasValue() && (a.lineJoin = this.style("stroke-linejoin").value),
                          this.style("stroke-miterlimit").hasValue() && (a.miterLimit = this.style("stroke-miterlimit").value),
                          this.style("stroke-dasharray").hasValue() && "none" != this.style("stroke-dasharray").value) {
                            var g = f.ToNumberArray(this.style("stroke-dasharray").value);
                            "undefined" != typeof a.setLineDash ? a.setLineDash(g) : "undefined" != typeof a.webkitLineDash ? a.webkitLineDash = g : "undefined" == typeof a.mozDash || 1 == g.length && 0 == g[0] || (a.mozDash = g);
                            var h = this.style("stroke-dashoffset").numValueOrDefault(1);
                            "undefined" != typeof a.lineDashOffset ? a.lineDashOffset = h : "undefined" != typeof a.webkitLineDashOffset ? a.webkitLineDashOffset = h : "undefined" != typeof a.mozDashOffset && (a.mozDashOffset = h)
                        }
                        if ("undefined" != typeof a.font && (a.font = f.Font.CreateFont(this.style("font-style").value, this.style("font-variant").value, this.style("font-weight").value, this.style("font-size").hasValue() ? this.style("font-size").toPixels() + "px" : "", this.style("font-family").value).toString()),
                            this.style("transform", !1, !0).hasValue()) {
                            var i = new f.Transform(this.style("transform", !1, !0).value);
                            i.apply(a)
                        }
                        if (this.style("clip-path", !1, !0).hasValue()) {
                            var j = this.style("clip-path", !1, !0).getDefinition();
                            null != j && j.apply(a)
                        }
                        this.style("opacity").hasValue() && (a.globalAlpha = this.style("opacity").numValue())
                    }
              }
              ,
              f.Element.RenderedElementBase.prototype = new f.Element.ElementBase,
              f.Element.PathElementBase = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.path = function(a) {
                        return null != a && a.beginPath(),
                          new f.BoundingBox
                    }
                    ,
                    this.renderChildren = function(a) {
                        this.path(a),
                          f.Mouse.checkPath(this, a),
                        "" != a.fillStyle && ("inherit" != this.style("fill-rule").valueOrDefault("inherit") ? a.fill(this.style("fill-rule").value) : a.fill()),
                        "" != a.strokeStyle && a.stroke();
                        var b = this.getMarkers();
                        if (null != b) {
                            if (this.style("marker-start").isUrlDefinition()) {
                                var c = this.style("marker-start").getDefinition();
                                c.render(a, b[0][0], b[0][1])
                            }
                            if (this.style("marker-mid").isUrlDefinition())
                                for (var c = this.style("marker-mid").getDefinition(), d = 1; d < b.length - 1; d++)
                                    c.render(a, b[d][0], b[d][1]);
                            if (this.style("marker-end").isUrlDefinition()) {
                                var c = this.style("marker-end").getDefinition();
                                c.render(a, b[b.length - 1][0], b[b.length - 1][1])
                            }
                        }
                    }
                    ,
                    this.getBoundingBox = function() {
                        return this.path()
                    }
                    ,
                    this.getMarkers = function() {
                        return null
                    }
              }
              ,
              f.Element.PathElementBase.prototype = new f.Element.RenderedElementBase,
              f.Element.svg = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.baseClearContext = this.clearContext,
                    this.clearContext = function(a) {
                        this.baseClearContext(a),
                          f.ViewPort.RemoveCurrent()
                    }
                    ,
                    this.baseSetContext = this.setContext,
                    this.setContext = function(a) {
                        a.strokeStyle = "rgba(0,0,0,0)",
                          a.lineCap = "butt",
                          a.lineJoin = "miter",
                          a.miterLimit = 4,
                        "undefined" != typeof a.font && "undefined" != typeof window.getComputedStyle && (a.font = window.getComputedStyle(a.canvas).getPropertyValue("font")),
                          this.baseSetContext(a),
                        this.attribute("x").hasValue() || (this.attribute("x", !0).value = 0),
                        this.attribute("y").hasValue() || (this.attribute("y", !0).value = 0),
                          a.translate(this.attribute("x").toPixels("x"), this.attribute("y").toPixels("y"));
                        var b = f.ViewPort.width()
                          , c = f.ViewPort.height();
                        if (this.attribute("width").hasValue() || (this.attribute("width", !0).value = "100%"),
                          this.attribute("height").hasValue() || (this.attribute("height", !0).value = "100%"),
                          "undefined" == typeof this.root) {
                            b = this.attribute("width").toPixels("x"),
                              c = this.attribute("height").toPixels("y");
                            var d = 0
                              , e = 0;
                            this.attribute("refX").hasValue() && this.attribute("refY").hasValue() && (d = -this.attribute("refX").toPixels("x"),
                              e = -this.attribute("refY").toPixels("y")),
                            "visible" != this.attribute("overflow").valueOrDefault("hidden") && (a.beginPath(),
                              a.moveTo(d, e),
                              a.lineTo(b, e),
                              a.lineTo(b, c),
                              a.lineTo(d, c),
                              a.closePath(),
                              a.clip())
                        }
                        if (f.ViewPort.SetCurrent(b, c),
                            this.attribute("viewBox").hasValue()) {
                            var g = f.ToNumberArray(this.attribute("viewBox").value)
                              , h = g[0]
                              , i = g[1];
                            b = g[2],
                              c = g[3],
                              f.AspectRatio(a, this.attribute("preserveAspectRatio").value, f.ViewPort.width(), b, f.ViewPort.height(), c, h, i, this.attribute("refX").value, this.attribute("refY").value),
                              f.ViewPort.RemoveCurrent(),
                              f.ViewPort.SetCurrent(g[2], g[3])
                        }
                    }
              }
              ,
              f.Element.svg.prototype = new f.Element.RenderedElementBase,
              f.Element.rect = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a),
                    this.path = function(a) {
                        var b = this.attribute("x").toPixels("x")
                          , c = this.attribute("y").toPixels("y")
                          , d = this.attribute("width").toPixels("x")
                          , e = this.attribute("height").toPixels("y")
                          , g = this.attribute("rx").toPixels("x")
                          , h = this.attribute("ry").toPixels("y");
                        return this.attribute("rx").hasValue() && !this.attribute("ry").hasValue() && (h = g),
                        this.attribute("ry").hasValue() && !this.attribute("rx").hasValue() && (g = h),
                          g = Math.min(g, d / 2),
                          h = Math.min(h, e / 2),
                        null != a && (a.beginPath(),
                          a.moveTo(b + g, c),
                          a.lineTo(b + d - g, c),
                          a.quadraticCurveTo(b + d, c, b + d, c + h),
                          a.lineTo(b + d, c + e - h),
                          a.quadraticCurveTo(b + d, c + e, b + d - g, c + e),
                          a.lineTo(b + g, c + e),
                          a.quadraticCurveTo(b, c + e, b, c + e - h),
                          a.lineTo(b, c + h),
                          a.quadraticCurveTo(b, c, b + g, c),
                          a.closePath()),
                          new f.BoundingBox(b,c,b + d,c + e)
                    }
              }
              ,
              f.Element.rect.prototype = new f.Element.PathElementBase,
              f.Element.circle = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a),
                    this.path = function(a) {
                        var b = this.attribute("cx").toPixels("x")
                          , c = this.attribute("cy").toPixels("y")
                          , d = this.attribute("r").toPixels();
                        return null != a && (a.beginPath(),
                          a.arc(b, c, d, 0, 2 * Math.PI, !0),
                          a.closePath()),
                          new f.BoundingBox(b - d,c - d,b + d,c + d)
                    }
              }
              ,
              f.Element.circle.prototype = new f.Element.PathElementBase,
              f.Element.ellipse = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a),
                    this.path = function(a) {
                        var b = 4 * ((Math.sqrt(2) - 1) / 3)
                          , c = this.attribute("rx").toPixels("x")
                          , d = this.attribute("ry").toPixels("y")
                          , e = this.attribute("cx").toPixels("x")
                          , g = this.attribute("cy").toPixels("y");
                        return null != a && (a.beginPath(),
                          a.moveTo(e, g - d),
                          a.bezierCurveTo(e + b * c, g - d, e + c, g - b * d, e + c, g),
                          a.bezierCurveTo(e + c, g + b * d, e + b * c, g + d, e, g + d),
                          a.bezierCurveTo(e - b * c, g + d, e - c, g + b * d, e - c, g),
                          a.bezierCurveTo(e - c, g - b * d, e - b * c, g - d, e, g - d),
                          a.closePath()),
                          new f.BoundingBox(e - c,g - d,e + c,g + d)
                    }
              }
              ,
              f.Element.ellipse.prototype = new f.Element.PathElementBase,
              f.Element.line = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a),
                    this.getPoints = function() {
                        return [new f.Point(this.attribute("x1").toPixels("x"),this.attribute("y1").toPixels("y")), new f.Point(this.attribute("x2").toPixels("x"),this.attribute("y2").toPixels("y"))]
                    }
                    ,
                    this.path = function(a) {
                        var b = this.getPoints();
                        return null != a && (a.beginPath(),
                          a.moveTo(b[0].x, b[0].y),
                          a.lineTo(b[1].x, b[1].y)),
                          new f.BoundingBox(b[0].x,b[0].y,b[1].x,b[1].y)
                    }
                    ,
                    this.getMarkers = function() {
                        var a = this.getPoints()
                          , b = a[0].angleTo(a[1]);
                        return [[a[0], b], [a[1], b]]
                    }
              }
              ,
              f.Element.line.prototype = new f.Element.PathElementBase,
              f.Element.polyline = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a),
                    this.points = f.CreatePath(this.attribute("points").value),
                    this.path = function(a) {
                        var b = new f.BoundingBox(this.points[0].x,this.points[0].y);
                        null != a && (a.beginPath(),
                          a.moveTo(this.points[0].x, this.points[0].y));
                        for (var c = 1; c < this.points.length; c++)
                            b.addPoint(this.points[c].x, this.points[c].y),
                            null != a && a.lineTo(this.points[c].x, this.points[c].y);
                        return b
                    }
                    ,
                    this.getMarkers = function() {
                        for (var a = [], b = 0; b < this.points.length - 1; b++)
                            a.push([this.points[b], this.points[b].angleTo(this.points[b + 1])]);
                        return a.length > 0 && a.push([this.points[this.points.length - 1], a[a.length - 1][1]]),
                          a
                    }
              }
              ,
              f.Element.polyline.prototype = new f.Element.PathElementBase,
              f.Element.polygon = function(a) {
                  this.base = f.Element.polyline,
                    this.base(a),
                    this.basePath = this.path,
                    this.path = function(a) {
                        var b = this.basePath(a);
                        return null != a && (a.lineTo(this.points[0].x, this.points[0].y),
                          a.closePath()),
                          b
                    }
              }
              ,
              f.Element.polygon.prototype = new f.Element.polyline,
              f.Element.path = function(a) {
                  this.base = f.Element.PathElementBase,
                    this.base(a);
                  var b = this.attribute("d").value;
                  b = b.replace(/,/gm, " ");
                  for (var c = 0; c < 2; c++)
                      b = b.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2");
                  b = b.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2"),
                    b = b.replace(/([0-9])([+\-])/gm, "$1 $2");
                  for (var c = 0; c < 2; c++)
                      b = b.replace(/(\.[0-9]*)(\.)/gm, "$1 $2");
                  b = b.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, "$1 $3 $4 "),
                    b = f.compressSpaces(b),
                    b = f.trim(b),
                    this.PathParser = new function(a) {
                        this.tokens = a.split(" "),
                          this.reset = function() {
                              this.i = -1,
                                this.command = "",
                                this.previousCommand = "",
                                this.start = new f.Point(0,0),
                                this.control = new f.Point(0,0),
                                this.current = new f.Point(0,0),
                                this.points = [],
                                this.angles = []
                          }
                          ,
                          this.isEnd = function() {
                              return this.i >= this.tokens.length - 1
                          }
                          ,
                          this.isCommandOrEnd = function() {
                              return !!this.isEnd() || null != this.tokens[this.i + 1].match(/^[A-Za-z]$/)
                          }
                          ,
                          this.isRelativeCommand = function() {
                              switch (this.command) {
                                  case "m":
                                  case "l":
                                  case "h":
                                  case "v":
                                  case "c":
                                  case "s":
                                  case "q":
                                  case "t":
                                  case "a":
                                  case "z":
                                      return !0
                              }
                              return !1
                          }
                          ,
                          this.getToken = function() {
                              return this.i++,
                                this.tokens[this.i]
                          }
                          ,
                          this.getScalar = function() {
                              return parseFloat(this.getToken())
                          }
                          ,
                          this.nextCommand = function() {
                              this.previousCommand = this.command,
                                this.command = this.getToken()
                          }
                          ,
                          this.getPoint = function() {
                              var a = new f.Point(this.getScalar(),this.getScalar());
                              return this.makeAbsolute(a)
                          }
                          ,
                          this.getAsControlPoint = function() {
                              var a = this.getPoint();
                              return this.control = a,
                                a
                          }
                          ,
                          this.getAsCurrentPoint = function() {
                              var a = this.getPoint();
                              return this.current = a,
                                a
                          }
                          ,
                          this.getReflectedControlPoint = function() {
                              if ("c" != this.previousCommand.toLowerCase() && "s" != this.previousCommand.toLowerCase() && "q" != this.previousCommand.toLowerCase() && "t" != this.previousCommand.toLowerCase())
                                  return this.current;
                              var a = new f.Point(2 * this.current.x - this.control.x,2 * this.current.y - this.control.y);
                              return a
                          }
                          ,
                          this.makeAbsolute = function(a) {
                              return this.isRelativeCommand() && (a.x += this.current.x,
                                a.y += this.current.y),
                                a
                          }
                          ,
                          this.addMarker = function(a, b, c) {
                              null != c && this.angles.length > 0 && null == this.angles[this.angles.length - 1] && (this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(c)),
                                this.addMarkerAngle(a, null == b ? null : b.angleTo(a))
                          }
                          ,
                          this.addMarkerAngle = function(a, b) {
                              this.points.push(a),
                                this.angles.push(b)
                          }
                          ,
                          this.getMarkerPoints = function() {
                              return this.points
                          }
                          ,
                          this.getMarkerAngles = function() {
                              for (var a = 0; a < this.angles.length; a++)
                                  if (null == this.angles[a])
                                      for (var b = a + 1; b < this.angles.length; b++)
                                          if (null != this.angles[b]) {
                                              this.angles[a] = this.angles[b];
                                              break
                                          }
                              return this.angles
                          }
                    }
                    (b),
                    this.path = function(a) {
                        var b = this.PathParser;
                        b.reset();
                        var c = new f.BoundingBox;
                        for (null != a && a.beginPath(); !b.isEnd(); )
                            switch (b.nextCommand(),
                              b.command) {
                                case "M":
                                case "m":
                                    var d = b.getAsCurrentPoint();
                                    for (b.addMarker(d),
                                           c.addPoint(d.x, d.y),
                                         null != a && a.moveTo(d.x, d.y),
                                           b.start = b.current; !b.isCommandOrEnd(); ) {
                                        var d = b.getAsCurrentPoint();
                                        b.addMarker(d, b.start),
                                          c.addPoint(d.x, d.y),
                                        null != a && a.lineTo(d.x, d.y)
                                    }
                                    break;
                                case "L":
                                case "l":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var e = b.current
                                          , d = b.getAsCurrentPoint();
                                        b.addMarker(d, e),
                                          c.addPoint(d.x, d.y),
                                        null != a && a.lineTo(d.x, d.y)
                                    }
                                    break;
                                case "H":
                                case "h":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var g = new f.Point((b.isRelativeCommand() ? b.current.x : 0) + b.getScalar(),b.current.y);
                                        b.addMarker(g, b.current),
                                          b.current = g,
                                          c.addPoint(b.current.x, b.current.y),
                                        null != a && a.lineTo(b.current.x, b.current.y)
                                    }
                                    break;
                                case "V":
                                case "v":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var g = new f.Point(b.current.x,(b.isRelativeCommand() ? b.current.y : 0) + b.getScalar());
                                        b.addMarker(g, b.current),
                                          b.current = g,
                                          c.addPoint(b.current.x, b.current.y),
                                        null != a && a.lineTo(b.current.x, b.current.y)
                                    }
                                    break;
                                case "C":
                                case "c":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var h = b.current
                                          , i = b.getPoint()
                                          , j = b.getAsControlPoint()
                                          , k = b.getAsCurrentPoint();
                                        b.addMarker(k, j, i),
                                          c.addBezierCurve(h.x, h.y, i.x, i.y, j.x, j.y, k.x, k.y),
                                        null != a && a.bezierCurveTo(i.x, i.y, j.x, j.y, k.x, k.y)
                                    }
                                    break;
                                case "S":
                                case "s":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var h = b.current
                                          , i = b.getReflectedControlPoint()
                                          , j = b.getAsControlPoint()
                                          , k = b.getAsCurrentPoint();
                                        b.addMarker(k, j, i),
                                          c.addBezierCurve(h.x, h.y, i.x, i.y, j.x, j.y, k.x, k.y),
                                        null != a && a.bezierCurveTo(i.x, i.y, j.x, j.y, k.x, k.y)
                                    }
                                    break;
                                case "Q":
                                case "q":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var h = b.current
                                          , j = b.getAsControlPoint()
                                          , k = b.getAsCurrentPoint();
                                        b.addMarker(k, j, j),
                                          c.addQuadraticCurve(h.x, h.y, j.x, j.y, k.x, k.y),
                                        null != a && a.quadraticCurveTo(j.x, j.y, k.x, k.y)
                                    }
                                    break;
                                case "T":
                                case "t":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var h = b.current
                                          , j = b.getReflectedControlPoint();
                                        b.control = j;
                                        var k = b.getAsCurrentPoint();
                                        b.addMarker(k, j, j),
                                          c.addQuadraticCurve(h.x, h.y, j.x, j.y, k.x, k.y),
                                        null != a && a.quadraticCurveTo(j.x, j.y, k.x, k.y)
                                    }
                                    break;
                                case "A":
                                case "a":
                                    for (; !b.isCommandOrEnd(); ) {
                                        var h = b.current
                                          , l = b.getScalar()
                                          , m = b.getScalar()
                                          , n = b.getScalar() * (Math.PI / 180)
                                          , o = b.getScalar()
                                          , p = b.getScalar()
                                          , k = b.getAsCurrentPoint()
                                          , q = new f.Point(Math.cos(n) * (h.x - k.x) / 2 + Math.sin(n) * (h.y - k.y) / 2,-Math.sin(n) * (h.x - k.x) / 2 + Math.cos(n) * (h.y - k.y) / 2)
                                          , r = Math.pow(q.x, 2) / Math.pow(l, 2) + Math.pow(q.y, 2) / Math.pow(m, 2);
                                        r > 1 && (l *= Math.sqrt(r),
                                          m *= Math.sqrt(r));
                                        var s = (o == p ? -1 : 1) * Math.sqrt((Math.pow(l, 2) * Math.pow(m, 2) - Math.pow(l, 2) * Math.pow(q.y, 2) - Math.pow(m, 2) * Math.pow(q.x, 2)) / (Math.pow(l, 2) * Math.pow(q.y, 2) + Math.pow(m, 2) * Math.pow(q.x, 2)));
                                        isNaN(s) && (s = 0);
                                        var t = new f.Point(s * l * q.y / m,s * -m * q.x / l)
                                          , u = new f.Point((h.x + k.x) / 2 + Math.cos(n) * t.x - Math.sin(n) * t.y,(h.y + k.y) / 2 + Math.sin(n) * t.x + Math.cos(n) * t.y)
                                          , v = function(a) {
                                            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2))
                                        }
                                          , w = function(a, b) {
                                            return (a[0] * b[0] + a[1] * b[1]) / (v(a) * v(b))
                                        }
                                          , x = function(a, b) {
                                            return (a[0] * b[1] < a[1] * b[0] ? -1 : 1) * Math.acos(w(a, b))
                                        }
                                          , y = x([1, 0], [(q.x - t.x) / l, (q.y - t.y) / m])
                                          , z = [(q.x - t.x) / l, (q.y - t.y) / m]
                                          , A = [(-q.x - t.x) / l, (-q.y - t.y) / m]
                                          , B = x(z, A);
                                        w(z, A) <= -1 && (B = Math.PI),
                                        w(z, A) >= 1 && (B = 0);
                                        var C = 1 - p ? 1 : -1
                                          , D = y + C * (B / 2)
                                          , E = new f.Point(u.x + l * Math.cos(D),u.y + m * Math.sin(D));
                                        if (b.addMarkerAngle(E, D - C * Math.PI / 2),
                                            b.addMarkerAngle(k, D - C * Math.PI),
                                            c.addPoint(k.x, k.y),
                                          null != a) {
                                            var w = l > m ? l : m
                                              , F = l > m ? 1 : l / m
                                              , G = l > m ? m / l : 1;
                                            a.translate(u.x, u.y),
                                              a.rotate(n),
                                              a.scale(F, G),
                                              a.arc(0, 0, w, y, y + B, 1 - p),
                                              a.scale(1 / F, 1 / G),
                                              a.rotate(-n),
                                              a.translate(-u.x, -u.y)
                                        }
                                    }
                                    break;
                                case "Z":
                                case "z":
                                    null != a && a.closePath(),
                                      b.current = b.start
                            }
                        return c
                    }
                    ,
                    this.getMarkers = function() {
                        for (var a = this.PathParser.getMarkerPoints(), b = this.PathParser.getMarkerAngles(), c = [], d = 0; d < a.length; d++)
                            c.push([a[d], b[d]]);
                        return c
                    }
              }
              ,
              f.Element.path.prototype = new f.Element.PathElementBase,
              f.Element.pattern = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.createPattern = function(a, b) {
                        var c = this.attribute("width").toPixels("x", !0)
                          , d = this.attribute("height").toPixels("y", !0)
                          , e = new f.Element.svg;
                        e.attributes.viewBox = new f.Property("viewBox",this.attribute("viewBox").value),
                          e.attributes.width = new f.Property("width",c + "px"),
                          e.attributes.height = new f.Property("height",d + "px"),
                          e.attributes.transform = new f.Property("transform",this.attribute("patternTransform").value),
                          e.children = this.children;
                        var g = document.createElement("canvas");
                        g.width = c,
                          g.height = d;
                        var h = g.getContext("2d");
                        this.attribute("x").hasValue() && this.attribute("y").hasValue() && h.translate(this.attribute("x").toPixels("x", !0), this.attribute("y").toPixels("y", !0));
                        for (var i = -1; i <= 1; i++)
                            for (var j = -1; j <= 1; j++)
                                h.save(),
                                  e.attributes.x = new f.Property("x",i * g.width),
                                  e.attributes.y = new f.Property("y",j * g.height),
                                  e.render(h),
                                  h.restore();
                        var k = a.createPattern(g, "repeat");
                        return k
                    }
              }
              ,
              f.Element.pattern.prototype = new f.Element.ElementBase,
              f.Element.marker = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.baseRender = this.render,
                    this.render = function(a, b, c) {
                        a.translate(b.x, b.y),
                        "auto" == this.attribute("orient").valueOrDefault("auto") && a.rotate(c),
                        "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && a.scale(a.lineWidth, a.lineWidth),
                          a.save();
                        var d = new f.Element.svg;
                        d.attributes.viewBox = new f.Property("viewBox",this.attribute("viewBox").value),
                          d.attributes.refX = new f.Property("refX",this.attribute("refX").value),
                          d.attributes.refY = new f.Property("refY",this.attribute("refY").value),
                          d.attributes.width = new f.Property("width",this.attribute("markerWidth").value),
                          d.attributes.height = new f.Property("height",this.attribute("markerHeight").value),
                          d.attributes.fill = new f.Property("fill",this.attribute("fill").valueOrDefault("black")),
                          d.attributes.stroke = new f.Property("stroke",this.attribute("stroke").valueOrDefault("none")),
                          d.children = this.children,
                          d.render(a),
                          a.restore(),
                        "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && a.scale(1 / a.lineWidth, 1 / a.lineWidth),
                        "auto" == this.attribute("orient").valueOrDefault("auto") && a.rotate(-c),
                          a.translate(-b.x, -b.y)
                    }
              }
              ,
              f.Element.marker.prototype = new f.Element.ElementBase,
              f.Element.defs = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.render = function(a) {}
              }
              ,
              f.Element.defs.prototype = new f.Element.ElementBase,
              f.Element.GradientBase = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.stops = [];
                  for (var b = 0; b < this.children.length; b++) {
                      var c = this.children[b];
                      "stop" == c.type && this.stops.push(c)
                  }
                  this.getGradient = function() {}
                    ,
                    this.gradientUnits = function() {
                        return this.attribute("gradientUnits").valueOrDefault("objectBoundingBox")
                    }
                    ,
                    this.attributesToInherit = ["gradientUnits"],
                    this.inheritStopContainer = function(a) {
                        for (var b = 0; b < this.attributesToInherit.length; b++) {
                            var c = this.attributesToInherit[b];
                            !this.attribute(c).hasValue() && a.attribute(c).hasValue() && (this.attribute(c, !0).value = a.attribute(c).value)
                        }
                    }
                    ,
                    this.createGradient = function(a, b, c) {
                        var d = this;
                        this.getHrefAttribute().hasValue() && (d = this.getHrefAttribute().getDefinition(),
                          this.inheritStopContainer(d));
                        var e = function(a) {
                            if (c.hasValue()) {
                                var b = new f.Property("color",a);
                                return b.addOpacity(c).value
                            }
                            return a
                        }
                          , g = this.getGradient(a, b);
                        if (null == g)
                            return e(d.stops[d.stops.length - 1].color);
                        for (var h = 0; h < d.stops.length; h++)
                            g.addColorStop(d.stops[h].offset, e(d.stops[h].color));
                        if (this.attribute("gradientTransform").hasValue()) {
                            var i = f.ViewPort.viewPorts[0]
                              , j = new f.Element.rect;
                            j.attributes.x = new f.Property("x",-f.MAX_VIRTUAL_PIXELS / 3),
                              j.attributes.y = new f.Property("y",-f.MAX_VIRTUAL_PIXELS / 3),
                              j.attributes.width = new f.Property("width",f.MAX_VIRTUAL_PIXELS),
                              j.attributes.height = new f.Property("height",f.MAX_VIRTUAL_PIXELS);
                            var k = new f.Element.g;
                            k.attributes.transform = new f.Property("transform",this.attribute("gradientTransform").value),
                              k.children = [j];
                            var l = new f.Element.svg;
                            l.attributes.x = new f.Property("x",0),
                              l.attributes.y = new f.Property("y",0),
                              l.attributes.width = new f.Property("width",i.width),
                              l.attributes.height = new f.Property("height",i.height),
                              l.children = [k];
                            var m = document.createElement("canvas");
                            m.width = i.width,
                              m.height = i.height;
                            var n = m.getContext("2d");
                            return n.fillStyle = g,
                              l.render(n),
                              n.createPattern(m, "no-repeat")
                        }
                        return g
                    }
              }
              ,
              f.Element.GradientBase.prototype = new f.Element.ElementBase,
              f.Element.linearGradient = function(a) {
                  this.base = f.Element.GradientBase,
                    this.base(a),
                    this.attributesToInherit.push("x1"),
                    this.attributesToInherit.push("y1"),
                    this.attributesToInherit.push("x2"),
                    this.attributesToInherit.push("y2"),
                    this.getGradient = function(a, b) {
                        var c = "objectBoundingBox" == this.gradientUnits() ? b.getBoundingBox() : null;
                        this.attribute("x1").hasValue() || this.attribute("y1").hasValue() || this.attribute("x2").hasValue() || this.attribute("y2").hasValue() || (this.attribute("x1", !0).value = 0,
                          this.attribute("y1", !0).value = 0,
                          this.attribute("x2", !0).value = 1,
                          this.attribute("y2", !0).value = 0);
                        var d = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("x1").numValue() : this.attribute("x1").toPixels("x")
                          , e = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("y1").numValue() : this.attribute("y1").toPixels("y")
                          , f = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("x2").numValue() : this.attribute("x2").toPixels("x")
                          , g = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("y2").numValue() : this.attribute("y2").toPixels("y");
                        return d == f && e == g ? null : a.createLinearGradient(d, e, f, g)
                    }
              }
              ,
              f.Element.linearGradient.prototype = new f.Element.GradientBase,
              f.Element.radialGradient = function(a) {
                  this.base = f.Element.GradientBase,
                    this.base(a),
                    this.attributesToInherit.push("cx"),
                    this.attributesToInherit.push("cy"),
                    this.attributesToInherit.push("r"),
                    this.attributesToInherit.push("fx"),
                    this.attributesToInherit.push("fy"),
                    this.getGradient = function(a, b) {
                        var c = b.getBoundingBox();
                        this.attribute("cx").hasValue() || (this.attribute("cx", !0).value = "50%"),
                        this.attribute("cy").hasValue() || (this.attribute("cy", !0).value = "50%"),
                        this.attribute("r").hasValue() || (this.attribute("r", !0).value = "50%");
                        var d = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("cx").numValue() : this.attribute("cx").toPixels("x")
                          , e = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("cy").numValue() : this.attribute("cy").toPixels("y")
                          , f = d
                          , g = e;
                        this.attribute("fx").hasValue() && (f = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("fx").numValue() : this.attribute("fx").toPixels("x")),
                        this.attribute("fy").hasValue() && (g = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("fy").numValue() : this.attribute("fy").toPixels("y"));
                        var h = "objectBoundingBox" == this.gradientUnits() ? (c.width() + c.height()) / 2 * this.attribute("r").numValue() : this.attribute("r").toPixels();
                        return a.createRadialGradient(f, g, 0, d, e, h)
                    }
              }
              ,
              f.Element.radialGradient.prototype = new f.Element.GradientBase,
              f.Element.stop = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.offset = this.attribute("offset").numValue(),
                  this.offset < 0 && (this.offset = 0),
                  this.offset > 1 && (this.offset = 1);
                  var b = this.style("stop-color", !0);
                  "" === b.value && (b.value = "#000"),
                  this.style("stop-opacity").hasValue() && (b = b.addOpacity(this.style("stop-opacity"))),
                    this.color = b.value
              }
              ,
              f.Element.stop.prototype = new f.Element.ElementBase,
              f.Element.AnimateBase = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    f.Animations.push(this),
                    this.duration = 0,
                    this.begin = this.attribute("begin").toMilliseconds(),
                    this.maxDuration = this.begin + this.attribute("dur").toMilliseconds(),
                    this.getProperty = function() {
                        var a = this.attribute("attributeType").value
                          , b = this.attribute("attributeName").value;
                        return "CSS" == a ? this.parent.style(b, !0) : this.parent.attribute(b, !0)
                    }
                    ,
                    this.initialValue = null,
                    this.initialUnits = "",
                    this.removed = !1,
                    this.calcValue = function() {
                        return ""
                    }
                    ,
                    this.update = function(a) {
                        if (null == this.initialValue && (this.initialValue = this.getProperty().value,
                            this.initialUnits = this.getProperty().getUnits()),
                          this.duration > this.maxDuration) {
                            if ("indefinite" == this.attribute("repeatCount").value || "indefinite" == this.attribute("repeatDur").value)
                                this.duration = 0;
                            else if ("freeze" != this.attribute("fill").valueOrDefault("remove") || this.frozen) {
                                if ("remove" == this.attribute("fill").valueOrDefault("remove") && !this.removed)
                                    return this.removed = !0,
                                      this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue,
                                      !0
                            } else
                                this.frozen = !0,
                                  this.parent.animationFrozen = !0,
                                  this.parent.animationFrozenValue = this.getProperty().value;
                            return !1
                        }
                        this.duration = this.duration + a;
                        var b = !1;
                        if (this.begin < this.duration) {
                            var c = this.calcValue();
                            if (this.attribute("type").hasValue()) {
                                var d = this.attribute("type").value;
                                c = d + "(" + c + ")"
                            }
                            this.getProperty().value = c,
                              b = !0
                        }
                        return b
                    }
                    ,
                    this.from = this.attribute("from"),
                    this.to = this.attribute("to"),
                    this.values = this.attribute("values"),
                  this.values.hasValue() && (this.values.value = this.values.value.split(";")),
                    this.progress = function() {
                        var a = {
                            progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
                        };
                        if (this.values.hasValue()) {
                            var b = a.progress * (this.values.value.length - 1)
                              , c = Math.floor(b)
                              , d = Math.ceil(b);
                            a.from = new f.Property("from",parseFloat(this.values.value[c])),
                              a.to = new f.Property("to",parseFloat(this.values.value[d])),
                              a.progress = (b - c) / (d - c)
                        } else
                            a.from = this.from,
                              a.to = this.to;
                        return a
                    }
              }
              ,
              f.Element.AnimateBase.prototype = new f.Element.ElementBase,
              f.Element.animate = function(a) {
                  this.base = f.Element.AnimateBase,
                    this.base(a),
                    this.calcValue = function() {
                        var a = this.progress()
                          , b = a.from.numValue() + (a.to.numValue() - a.from.numValue()) * a.progress;
                        return b + this.initialUnits
                    }
              }
              ,
              f.Element.animate.prototype = new f.Element.AnimateBase,
              f.Element.animateColor = function(b) {
                  this.base = f.Element.AnimateBase,
                    this.base(b),
                    this.calcValue = function() {
                        var b = this.progress()
                          , c = new a(b.from.value)
                          , d = new a(b.to.value);
                        if (c.ok && d.ok) {
                            var e = c.r + (d.r - c.r) * b.progress
                              , f = c.g + (d.g - c.g) * b.progress
                              , g = c.b + (d.b - c.b) * b.progress;
                            return "rgb(" + parseInt(e, 10) + "," + parseInt(f, 10) + "," + parseInt(g, 10) + ")"
                        }
                        return this.attribute("from").value
                    }
              }
              ,
              f.Element.animateColor.prototype = new f.Element.AnimateBase,
              f.Element.animateTransform = function(a) {
                  this.base = f.Element.AnimateBase,
                    this.base(a),
                    this.calcValue = function() {
                        for (var a = this.progress(), b = f.ToNumberArray(a.from.value), c = f.ToNumberArray(a.to.value), d = "", e = 0; e < b.length; e++)
                            d += b[e] + (c[e] - b[e]) * a.progress + " ";
                        return d
                    }
              }
              ,
              f.Element.animateTransform.prototype = new f.Element.animate,
              f.Element.font = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.horizAdvX = this.attribute("horiz-adv-x").numValue(),
                    this.isRTL = !1,
                    this.isArabic = !1,
                    this.fontFace = null,
                    this.missingGlyph = null,
                    this.glyphs = [];
                  for (var b = 0; b < this.children.length; b++) {
                      var c = this.children[b];
                      "font-face" == c.type ? (this.fontFace = c,
                      c.style("font-family").hasValue() && (f.Definitions[c.style("font-family").value] = this)) : "missing-glyph" == c.type ? this.missingGlyph = c : "glyph" == c.type && ("" != c.arabicForm ? (this.isRTL = !0,
                        this.isArabic = !0,
                      "undefined" == typeof this.glyphs[c.unicode] && (this.glyphs[c.unicode] = []),
                        this.glyphs[c.unicode][c.arabicForm] = c) : this.glyphs[c.unicode] = c)
                  }
              }
              ,
              f.Element.font.prototype = new f.Element.ElementBase,
              f.Element.fontface = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.ascent = this.attribute("ascent").value,
                    this.descent = this.attribute("descent").value,
                    this.unitsPerEm = this.attribute("units-per-em").numValue()
              }
              ,
              f.Element.fontface.prototype = new f.Element.ElementBase,
              f.Element.missingglyph = function(a) {
                  this.base = f.Element.path,
                    this.base(a),
                    this.horizAdvX = 0
              }
              ,
              f.Element.missingglyph.prototype = new f.Element.path,
              f.Element.glyph = function(a) {
                  this.base = f.Element.path,
                    this.base(a),
                    this.horizAdvX = this.attribute("horiz-adv-x").numValue(),
                    this.unicode = this.attribute("unicode").value,
                    this.arabicForm = this.attribute("arabic-form").value
              }
              ,
              f.Element.glyph.prototype = new f.Element.path,
              f.Element.text = function(a) {
                  this.captureTextNodes = !0,
                    this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.baseSetContext = this.setContext,
                    this.setContext = function(a) {
                        this.baseSetContext(a);
                        var b = this.style("dominant-baseline").toTextBaseline();
                        null == b && (b = this.style("alignment-baseline").toTextBaseline()),
                        null != b && (a.textBaseline = b)
                    }
                    ,
                    this.getBoundingBox = function() {
                        var a = this.attribute("x").toPixels("x")
                          , b = this.attribute("y").toPixels("y")
                          , c = this.parent.style("font-size").numValueOrDefault(f.Font.Parse(f.ctx.font).fontSize);
                        return new f.BoundingBox(a,b - c,a + Math.floor(2 * c / 3) * this.children[0].getText().length,b)
                    }
                    ,
                    this.renderChildren = function(a) {
                        this.x = this.attribute("x").toPixels("x"),
                          this.y = this.attribute("y").toPixels("y"),
                        this.attribute("dx").hasValue() && (this.x += this.attribute("dx").toPixels("x")),
                        this.attribute("dy").hasValue() && (this.y += this.attribute("dy").toPixels("y")),
                          this.x += this.getAnchorDelta(a, this, 0);
                        for (var b = 0; b < this.children.length; b++)
                            this.renderChild(a, this, this, b)
                    }
                    ,
                    this.getAnchorDelta = function(a, b, c) {
                        var d = this.style("text-anchor").valueOrDefault("start");
                        if ("start" != d) {
                            for (var e = 0, f = c; f < b.children.length; f++) {
                                var g = b.children[f];
                                if (f > c && g.attribute("x").hasValue())
                                    break;
                                e += g.measureTextRecursive(a)
                            }
                            return -1 * ("end" == d ? e : e / 2)
                        }
                        return 0
                    }
                    ,
                    this.renderChild = function(a, b, c, d) {
                        var e = c.children[d];
                        e.attribute("x").hasValue() ? (e.x = e.attribute("x").toPixels("x") + b.getAnchorDelta(a, c, d),
                        e.attribute("dx").hasValue() && (e.x += e.attribute("dx").toPixels("x"))) : (e.attribute("dx").hasValue() && (b.x += e.attribute("dx").toPixels("x")),
                          e.x = b.x),
                          b.x = e.x + e.measureText(a),
                          e.attribute("y").hasValue() ? (e.y = e.attribute("y").toPixels("y"),
                          e.attribute("dy").hasValue() && (e.y += e.attribute("dy").toPixels("y"))) : (e.attribute("dy").hasValue() && (b.y += e.attribute("dy").toPixels("y")),
                            e.y = b.y),
                          b.y = e.y,
                          e.render(a);
                        for (var d = 0; d < e.children.length; d++)
                            b.renderChild(a, b, e, d)
                    }
              }
              ,
              f.Element.text.prototype = new f.Element.RenderedElementBase,
              f.Element.TextElementBase = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.getGlyph = function(a, b, c) {
                        var d = b[c]
                          , e = null;
                        if (a.isArabic) {
                            var f = "isolated";
                            (0 == c || " " == b[c - 1]) && c < b.length - 2 && " " != b[c + 1] && (f = "terminal"),
                            c > 0 && " " != b[c - 1] && c < b.length - 2 && " " != b[c + 1] && (f = "medial"),
                            c > 0 && " " != b[c - 1] && (c == b.length - 1 || " " == b[c + 1]) && (f = "initial"),
                            "undefined" != typeof a.glyphs[d] && (e = a.glyphs[d][f],
                            null == e && "glyph" == a.glyphs[d].type && (e = a.glyphs[d]))
                        } else
                            e = a.glyphs[d];
                        return null == e && (e = a.missingGlyph),
                          e
                    }
                    ,
                    this.renderChildren = function(a) {
                        var b = this.parent.style("font-family").getDefinition();
                        if (null == b)
                            "" != a.fillStyle && a.fillText(f.compressSpaces(this.getText()), this.x, this.y),
                            "" != a.strokeStyle && a.strokeText(f.compressSpaces(this.getText()), this.x, this.y);
                        else {
                            var c = this.parent.style("font-size").numValueOrDefault(f.Font.Parse(f.ctx.font).fontSize)
                              , d = this.parent.style("font-style").valueOrDefault(f.Font.Parse(f.ctx.font).fontStyle)
                              , e = this.getText();
                            b.isRTL && (e = e.split("").reverse().join(""));
                            for (var g = f.ToNumberArray(this.parent.attribute("dx").value), h = 0; h < e.length; h++) {
                                var i = this.getGlyph(b, e, h)
                                  , j = c / b.fontFace.unitsPerEm;
                                a.translate(this.x, this.y),
                                  a.scale(j, -j);
                                var k = a.lineWidth;
                                a.lineWidth = a.lineWidth * b.fontFace.unitsPerEm / c,
                                "italic" == d && a.transform(1, 0, .4, 1, 0, 0),
                                  i.render(a),
                                "italic" == d && a.transform(1, 0, -.4, 1, 0, 0),
                                  a.lineWidth = k,
                                  a.scale(1 / j, -1 / j),
                                  a.translate(-this.x, -this.y),
                                  this.x += c * (i.horizAdvX || b.horizAdvX) / b.fontFace.unitsPerEm,
                                "undefined" == typeof g[h] || isNaN(g[h]) || (this.x += g[h])
                            }
                        }
                    }
                    ,
                    this.getText = function() {}
                    ,
                    this.measureTextRecursive = function(a) {
                        for (var b = this.measureText(a), c = 0; c < this.children.length; c++)
                            b += this.children[c].measureTextRecursive(a);
                        return b
                    }
                    ,
                    this.measureText = function(a) {
                        var b = this.parent.style("font-family").getDefinition();
                        if (null != b) {
                            var c = this.parent.style("font-size").numValueOrDefault(f.Font.Parse(f.ctx.font).fontSize)
                              , d = 0
                              , e = this.getText();
                            b.isRTL && (e = e.split("").reverse().join(""));
                            for (var g = f.ToNumberArray(this.parent.attribute("dx").value), h = 0; h < e.length; h++) {
                                var i = this.getGlyph(b, e, h);
                                d += (i.horizAdvX || b.horizAdvX) * c / b.fontFace.unitsPerEm,
                                "undefined" == typeof g[h] || isNaN(g[h]) || (d += g[h])
                            }
                            return d
                        }
                        var j = f.compressSpaces(this.getText());
                        if (!a.measureText)
                            return 10 * j.length;
                        a.save(),
                          this.setContext(a);
                        var k = a.measureText(j).width;
                        return a.restore(),
                          k
                    }
              }
              ,
              f.Element.TextElementBase.prototype = new f.Element.RenderedElementBase,
              f.Element.tspan = function(a) {
                  this.captureTextNodes = !0,
                    this.base = f.Element.TextElementBase,
                    this.base(a),
                    this.text = f.compressSpaces(a.value || a.text || a.textContent || ""),
                    this.getText = function() {
                        return this.children.length > 0 ? "" : this.text
                    }
              }
              ,
              f.Element.tspan.prototype = new f.Element.TextElementBase,
              f.Element.tref = function(a) {
                  this.base = f.Element.TextElementBase,
                    this.base(a),
                    this.getText = function() {
                        var a = this.getHrefAttribute().getDefinition();
                        if (null != a)
                            return a.children[0].getText()
                    }
              }
              ,
              f.Element.tref.prototype = new f.Element.TextElementBase,
              f.Element.a = function(a) {
                  this.base = f.Element.TextElementBase,
                    this.base(a),
                    this.hasText = a.childNodes.length > 0;
                  for (var b = 0; b < a.childNodes.length; b++)
                      3 != a.childNodes[b].nodeType && (this.hasText = !1);
                  this.text = this.hasText ? a.childNodes[0].value : "",
                    this.getText = function() {
                        return this.text
                    }
                    ,
                    this.baseRenderChildren = this.renderChildren,
                    this.renderChildren = function(a) {
                        if (this.hasText) {
                            this.baseRenderChildren(a);
                            var b = new f.Property("fontSize",f.Font.Parse(f.ctx.font).fontSize);
                            f.Mouse.checkBoundingBox(this, new f.BoundingBox(this.x,this.y - b.toPixels("y"),this.x + this.measureText(a),this.y))
                        } else if (this.children.length > 0) {
                            var c = new f.Element.g;
                            c.children = this.children,
                              c.parent = this,
                              c.render(a)
                        }
                    }
                    ,
                    this.onclick = function() {
                        window.open(this.getHrefAttribute().value)
                    }
                    ,
                    this.onmousemove = function() {
                        f.ctx.canvas.style.cursor = "pointer"
                    }
              }
              ,
              f.Element.a.prototype = new f.Element.TextElementBase,
              f.Element.image = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a);
                  var b = this.getHrefAttribute().value;
                  if ("" != b) {
                      var c = b.match(/\.svg$/);
                      if (f.Images.push(this),
                          this.loaded = !1,
                          c)
                          this.img = f.ajax(b),
                            this.loaded = !0;
                      else {
                          this.img = document.createElement("img"),
                          1 == f.opts.useCORS && (this.img.crossOrigin = "Anonymous");
                          var d = this;
                          this.img.onload = function() {
                              d.loaded = !0
                          }
                            ,
                            this.img.onerror = function() {
                                f.log('ERROR: image "' + b + '" not found'),
                                  d.loaded = !0
                            }
                            ,
                            this.img.src = b
                      }
                      this.renderChildren = function(a) {
                          var b = this.attribute("x").toPixels("x")
                            , d = this.attribute("y").toPixels("y")
                            , e = this.attribute("width").toPixels("x")
                            , g = this.attribute("height").toPixels("y");
                          0 != e && 0 != g && (a.save(),
                            c ? a.drawSvg(this.img, b, d, e, g) : (a.translate(b, d),
                              f.AspectRatio(a, this.attribute("preserveAspectRatio").value, e, this.img.width, g, this.img.height, 0, 0),
                              a.drawImage(this.img, 0, 0)),
                            a.restore())
                      }
                        ,
                        this.getBoundingBox = function() {
                            var a = this.attribute("x").toPixels("x")
                              , b = this.attribute("y").toPixels("y")
                              , c = this.attribute("width").toPixels("x")
                              , d = this.attribute("height").toPixels("y");
                            return new f.BoundingBox(a,b,a + c,b + d)
                        }
                  }
              }
              ,
              f.Element.image.prototype = new f.Element.RenderedElementBase,
              f.Element.g = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.getBoundingBox = function() {
                        for (var a = new f.BoundingBox, b = 0; b < this.children.length; b++)
                            a.addBoundingBox(this.children[b].getBoundingBox());
                        return a
                    }
              }
              ,
              f.Element.g.prototype = new f.Element.RenderedElementBase,
              f.Element.symbol = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.render = function(a) {}
              }
              ,
              f.Element.symbol.prototype = new f.Element.RenderedElementBase,
              f.Element.style = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a);
                  for (var b = "", d = 0; d < a.childNodes.length; d++)
                      b += a.childNodes[d].data;
                  b = b.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ""),
                    b = f.compressSpaces(b);
                  for (var e = b.split("}"), d = 0; d < e.length; d++)
                      if ("" != f.trim(e[d]))
                          for (var g = e[d].split("{"), h = g[0].split(","), i = g[1].split(";"), j = 0; j < h.length; j++) {
                              var k = f.trim(h[j]);
                              if ("" != k) {
                                  for (var l = f.Styles[k] || {}, m = 0; m < i.length; m++) {
                                      var n = i[m].indexOf(":")
                                        , o = i[m].substr(0, n)
                                        , p = i[m].substr(n + 1, i[m].length - n);
                                      null != o && null != p && (l[f.trim(o)] = new f.Property(f.trim(o),f.trim(p)))
                                  }
                                  if (f.Styles[k] = l,
                                      f.StylesSpecificity[k] = c(k),
                                    "@font-face" == k)
                                      for (var q = l["font-family"].value.replace(/"/g, ""), r = l.src.value.split(","), s = 0; s < r.length; s++)
                                          if (r[s].indexOf('format("svg")') > 0)
                                              for (var t = r[s].indexOf("url"), u = r[s].indexOf(")", t), v = r[s].substr(t + 5, u - t - 6), w = f.parseXml(f.ajax(v)), x = w.getElementsByTagName("font"), y = 0; y < x.length; y++) {
                                                  var z = f.CreateElement(x[y]);
                                                  f.Definitions[q] = z
                                              }
                              }
                          }
              }
              ,
              f.Element.style.prototype = new f.Element.ElementBase,
              f.Element.use = function(a) {
                  this.base = f.Element.RenderedElementBase,
                    this.base(a),
                    this.baseSetContext = this.setContext,
                    this.setContext = function(a) {
                        this.baseSetContext(a),
                        this.attribute("x").hasValue() && a.translate(this.attribute("x").toPixels("x"), 0),
                        this.attribute("y").hasValue() && a.translate(0, this.attribute("y").toPixels("y"))
                    }
                  ;
                  var b = this.getHrefAttribute().getDefinition();
                  this.path = function(a) {
                      null != b && b.path(a)
                  }
                    ,
                    this.getBoundingBox = function() {
                        if (null != b)
                            return b.getBoundingBox()
                    }
                    ,
                    this.renderChildren = function(a) {
                        if (null != b) {
                            var c = b;
                            "symbol" == b.type && (c = new f.Element.svg,
                              c.type = "svg",
                              c.attributes.viewBox = new f.Property("viewBox",b.attribute("viewBox").value),
                              c.attributes.preserveAspectRatio = new f.Property("preserveAspectRatio",b.attribute("preserveAspectRatio").value),
                              c.attributes.overflow = new f.Property("overflow",b.attribute("overflow").value),
                              c.children = b.children),
                            "svg" == c.type && (this.attribute("width").hasValue() && (c.attributes.width = new f.Property("width",this.attribute("width").value)),
                            this.attribute("height").hasValue() && (c.attributes.height = new f.Property("height",this.attribute("height").value)));
                            var d = c.parent;
                            c.parent = null,
                              c.render(a),
                              c.parent = d
                        }
                    }
              }
              ,
              f.Element.use.prototype = new f.Element.RenderedElementBase,
              f.Element.mask = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.apply = function(a, b) {
                        var c = this.attribute("x").toPixels("x")
                          , d = this.attribute("y").toPixels("y")
                          , e = this.attribute("width").toPixels("x")
                          , g = this.attribute("height").toPixels("y");
                        if (0 == e && 0 == g) {
                            for (var h = new f.BoundingBox, i = 0; i < this.children.length; i++)
                                h.addBoundingBox(this.children[i].getBoundingBox());
                            var c = Math.floor(h.x1)
                              , d = Math.floor(h.y1)
                              , e = Math.floor(h.width())
                              , g = Math.floor(h.height())
                        }
                        var j = b.attribute("mask").value;
                        b.attribute("mask").value = "";
                        var k = document.createElement("canvas");
                        k.width = c + e,
                          k.height = d + g;
                        var l = k.getContext("2d");
                        this.renderChildren(l);
                        var m = document.createElement("canvas");
                        m.width = c + e,
                          m.height = d + g;
                        var n = m.getContext("2d");
                        b.render(n),
                          n.globalCompositeOperation = "destination-in",
                          n.fillStyle = l.createPattern(k, "no-repeat"),
                          n.fillRect(0, 0, c + e, d + g),
                          a.fillStyle = n.createPattern(m, "no-repeat"),
                          a.fillRect(0, 0, c + e, d + g),
                          b.attribute("mask").value = j
                    }
                    ,
                    this.render = function(a) {}
              }
              ,
              f.Element.mask.prototype = new f.Element.ElementBase,
              f.Element.clipPath = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.apply = function(a) {
                        var b = CanvasRenderingContext2D.prototype.beginPath;
                        CanvasRenderingContext2D.prototype.beginPath = function() {}
                        ;
                        var c = CanvasRenderingContext2D.prototype.closePath;
                        CanvasRenderingContext2D.prototype.closePath = function() {}
                          ,
                          b.call(a);
                        for (var d = 0; d < this.children.length; d++) {
                            var e = this.children[d];
                            if ("undefined" != typeof e.path) {
                                var g = null;
                                e.style("transform", !1, !0).hasValue() && (g = new f.Transform(e.style("transform", !1, !0).value),
                                  g.apply(a)),
                                  e.path(a),
                                  CanvasRenderingContext2D.prototype.closePath = c,
                                g && g.unapply(a)
                            }
                        }
                        c.call(a),
                          a.clip(),
                          CanvasRenderingContext2D.prototype.beginPath = b,
                          CanvasRenderingContext2D.prototype.closePath = c
                    }
                    ,
                    this.render = function(a) {}
              }
              ,
              f.Element.clipPath.prototype = new f.Element.ElementBase,
              f.Element.filter = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.apply = function(a, b) {
                        var c = b.getBoundingBox()
                          , d = Math.floor(c.x1)
                          , e = Math.floor(c.y1)
                          , f = Math.floor(c.width())
                          , g = Math.floor(c.height())
                          , h = b.style("filter").value;
                        b.style("filter").value = "";
                        for (var i = 0, j = 0, k = 0; k < this.children.length; k++) {
                            var l = this.children[k].extraFilterDistance || 0;
                            i = Math.max(i, l),
                              j = Math.max(j, l)
                        }
                        var m = document.createElement("canvas");
                        m.width = f + 2 * i,
                          m.height = g + 2 * j;
                        var n = m.getContext("2d");
                        n.translate(-d + i, -e + j),
                          b.render(n);
                        for (var k = 0; k < this.children.length; k++)
                            "function" == typeof this.children[k].apply && this.children[k].apply(n, 0, 0, f + 2 * i, g + 2 * j);
                        a.drawImage(m, 0, 0, f + 2 * i, g + 2 * j, d - i, e - j, f + 2 * i, g + 2 * j),
                          b.style("filter", !0).value = h
                    }
                    ,
                    this.render = function(a) {}
              }
              ,
              f.Element.filter.prototype = new f.Element.ElementBase,
              f.Element.feDropShadow = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.addStylesFromStyleDefinition(),
                    this.apply = function(a, b, c, d, e) {}
              }
              ,
              f.Element.feDropShadow.prototype = new f.Element.ElementBase,
              f.Element.feMorphology = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.apply = function(a, b, c, d, e) {}
              }
              ,
              f.Element.feMorphology.prototype = new f.Element.ElementBase,
              f.Element.feComposite = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.apply = function(a, b, c, d, e) {}
              }
              ,
              f.Element.feComposite.prototype = new f.Element.ElementBase,
              f.Element.feColorMatrix = function(a) {
                  function b(a, b, c, d, e, f) {
                      return a[c * d * 4 + 4 * b + f]
                  }
                  function c(a, b, c, d, e, f, g) {
                      a[c * d * 4 + 4 * b + f] = g
                  }
                  function d(a, b) {
                      var c = e[a];
                      return c * (c < 0 ? b - 255 : b)
                  }
                  this.base = f.Element.ElementBase,
                    this.base(a);
                  var e = f.ToNumberArray(this.attribute("values").value);
                  switch (this.attribute("type").valueOrDefault("matrix")) {
                      case "saturate":
                          var g = e[0];
                          e = [.213 + .787 * g, .715 - .715 * g, .072 - .072 * g, 0, 0, .213 - .213 * g, .715 + .285 * g, .072 - .072 * g, 0, 0, .213 - .213 * g, .715 - .715 * g, .072 + .928 * g, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                          break;
                      case "hueRotate":
                          var h = e[0] * Math.PI / 180
                            , i = function(a, b, c) {
                              return a + Math.cos(h) * b + Math.sin(h) * c
                          };
                          e = [i(.213, .787, -.213), i(.715, -.715, -.715), i(.072, -.072, .928), 0, 0, i(.213, -.213, .143), i(.715, .285, .14), i(.072, -.072, -.283), 0, 0, i(.213, -.213, -.787), i(.715, -.715, .715), i(.072, .928, .072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                          break;
                      case "luminanceToAlpha":
                          e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .2125, .7154, .0721, 0, 0, 0, 0, 0, 0, 1]
                  }
                  this.apply = function(a, e, f, g, h) {
                      for (var i = a.getImageData(0, 0, g, h), f = 0; f < h; f++)
                          for (var e = 0; e < g; e++) {
                              var j = b(i.data, e, f, g, h, 0)
                                , k = b(i.data, e, f, g, h, 1)
                                , l = b(i.data, e, f, g, h, 2)
                                , m = b(i.data, e, f, g, h, 3);
                              c(i.data, e, f, g, h, 0, d(0, j) + d(1, k) + d(2, l) + d(3, m) + d(4, 1)),
                                c(i.data, e, f, g, h, 1, d(5, j) + d(6, k) + d(7, l) + d(8, m) + d(9, 1)),
                                c(i.data, e, f, g, h, 2, d(10, j) + d(11, k) + d(12, l) + d(13, m) + d(14, 1)),
                                c(i.data, e, f, g, h, 3, d(15, j) + d(16, k) + d(17, l) + d(18, m) + d(19, 1))
                          }
                      a.clearRect(0, 0, g, h),
                        a.putImageData(i, 0, 0)
                  }
              }
              ,
              f.Element.feColorMatrix.prototype = new f.Element.ElementBase,
              f.Element.feGaussianBlur = function(a) {
                  this.base = f.Element.ElementBase,
                    this.base(a),
                    this.blurRadius = Math.floor(this.attribute("stdDeviation").numValue()),
                    this.extraFilterDistance = this.blurRadius,
                    this.apply = function(a, c, d, e, g) {
                        return "undefined" == typeof b.canvasRGBA ? void f.log("ERROR: StackBlur.js must be included for blur to work") : (a.canvas.id = f.UniqueId(),
                          a.canvas.style.display = "none",
                          document.body.appendChild(a.canvas),
                          b.canvasRGBA(a.canvas.id, c, d, e, g, this.blurRadius),
                          void document.body.removeChild(a.canvas))
                    }
              }
              ,
              f.Element.feGaussianBlur.prototype = new f.Element.ElementBase,
              f.Element.title = function(a) {}
              ,
              f.Element.title.prototype = new f.Element.ElementBase,
              f.Element.desc = function(a) {}
              ,
              f.Element.desc.prototype = new f.Element.ElementBase,
              f.Element.MISSING = function(a) {
                  f.log("ERROR: Element '" + a.nodeName + "' not yet implemented.")
              }
              ,
              f.Element.MISSING.prototype = new f.Element.ElementBase,
              f.CreateElement = function(a) {
                  var b = a.nodeName.replace(/^[^:]+:/, "");
                  b = b.replace(/\-/g, "");
                  var c = null;
                  return c = "undefined" != typeof f.Element[b] ? new f.Element[b](a) : new f.Element.MISSING(a),
                    c.type = a.nodeName,
                    c
              }
              ,
              f.load = function(a, b) {
                  f.loadXml(a, f.ajax(b))
              }
              ,
              f.loadXml = function(a, b) {
                  f.loadXmlDoc(a, f.parseXml(b))
              }
              ,
              f.loadXmlDoc = function(a, b) {
                  f.init(a);
                  var c = function(b) {
                      for (var c = a.canvas; c; )
                          b.x -= c.offsetLeft,
                            b.y -= c.offsetTop,
                            c = c.offsetParent;
                      return window.scrollX && (b.x += window.scrollX),
                      window.scrollY && (b.y += window.scrollY),
                        b
                  };
                  1 != f.opts.ignoreMouse && (a.canvas.onclick = function(a) {
                        var b = c(new f.Point(null != a ? a.clientX : event.clientX,null != a ? a.clientY : event.clientY));
                        f.Mouse.onclick(b.x, b.y)
                    }
                      ,
                      a.canvas.onmousemove = function(a) {
                          var b = c(new f.Point(null != a ? a.clientX : event.clientX,null != a ? a.clientY : event.clientY));
                          f.Mouse.onmousemove(b.x, b.y)
                      }
                  );
                  var d = f.CreateElement(b.documentElement);
                  d.root = !0,
                    d.addStylesFromStyleDefinition();
                  var e = !0
                    , g = function() {
                      f.ViewPort.Clear(),
                      a.canvas.parentNode && f.ViewPort.SetCurrent(a.canvas.parentNode.clientWidth, a.canvas.parentNode.clientHeight),
                      1 != f.opts.ignoreDimensions && (d.style("width").hasValue() && (a.canvas.width = d.style("width").toPixels("x"),
                        a.canvas.style.width = a.canvas.width + "px"),
                      d.style("height").hasValue() && (a.canvas.height = d.style("height").toPixels("y"),
                        a.canvas.style.height = a.canvas.height + "px"));
                      var c = a.canvas.clientWidth || a.canvas.width
                        , g = a.canvas.clientHeight || a.canvas.height;
                      if (1 == f.opts.ignoreDimensions && d.style("width").hasValue() && d.style("height").hasValue() && (c = d.style("width").toPixels("x"),
                          g = d.style("height").toPixels("y")),
                          f.ViewPort.SetCurrent(c, g),
                        null != f.opts.offsetX && (d.attribute("x", !0).value = f.opts.offsetX),
                        null != f.opts.offsetY && (d.attribute("y", !0).value = f.opts.offsetY),
                        null != f.opts.scaleWidth || null != f.opts.scaleHeight) {
                          var h = null
                            , i = null
                            , j = f.ToNumberArray(d.attribute("viewBox").value);
                          null != f.opts.scaleWidth && (d.attribute("width").hasValue() ? h = d.attribute("width").toPixels("x") / f.opts.scaleWidth : isNaN(j[2]) || (h = j[2] / f.opts.scaleWidth)),
                          null != f.opts.scaleHeight && (d.attribute("height").hasValue() ? i = d.attribute("height").toPixels("y") / f.opts.scaleHeight : isNaN(j[3]) || (i = j[3] / f.opts.scaleHeight)),
                          null == h && (h = i),
                          null == i && (i = h),
                            d.attribute("width", !0).value = f.opts.scaleWidth,
                            d.attribute("height", !0).value = f.opts.scaleHeight,
                            d.style("transform", !0, !0).value += " scale(" + 1 / h + "," + 1 / i + ")"
                      }
                      1 != f.opts.ignoreClear && a.clearRect(0, 0, c, g),
                        d.render(a),
                      e && (e = !1,
                      "function" == typeof f.opts.renderCallback && f.opts.renderCallback(b))
                  }
                    , h = !0;
                  f.ImagesLoaded() && (h = !1,
                    g()),
                    f.intervalID = setInterval(function() {
                        var a = !1;
                        if (h && f.ImagesLoaded() && (h = !1,
                            a = !0),
                          1 != f.opts.ignoreMouse && (a |= f.Mouse.hasEvents()),
                          1 != f.opts.ignoreAnimation)
                            for (var b = 0; b < f.Animations.length; b++)
                                a |= f.Animations[b].update(1e3 / f.FRAMERATE);
                        "function" == typeof f.opts.forceRedraw && 1 == f.opts.forceRedraw() && (a = !0),
                        a && (g(),
                          f.Mouse.runEvents())
                    }, 1e3 / f.FRAMERATE)
              }
              ,
              f.stop = function() {
                  f.intervalID && clearInterval(f.intervalID)
              }
              ,
              f.Mouse = new function() {
                  this.events = [],
                    this.hasEvents = function() {
                        return 0 != this.events.length
                    }
                    ,
                    this.onclick = function(a, b) {
                        this.events.push({
                            type: "onclick",
                            x: a,
                            y: b,
                            run: function(a) {
                                a.onclick && a.onclick()
                            }
                        })
                    }
                    ,
                    this.onmousemove = function(a, b) {
                        this.events.push({
                            type: "onmousemove",
                            x: a,
                            y: b,
                            run: function(a) {
                                a.onmousemove && a.onmousemove()
                            }
                        })
                    }
                    ,
                    this.eventElements = [],
                    this.checkPath = function(a, b) {
                        for (var c = 0; c < this.events.length; c++) {
                            var d = this.events[c];
                            b.isPointInPath && b.isPointInPath(d.x, d.y) && (this.eventElements[c] = a)
                        }
                    }
                    ,
                    this.checkBoundingBox = function(a, b) {
                        for (var c = 0; c < this.events.length; c++) {
                            var d = this.events[c];
                            b.isPointInBox(d.x, d.y) && (this.eventElements[c] = a)
                        }
                    }
                    ,
                    this.runEvents = function() {
                        f.ctx.canvas.style.cursor = "";
                        for (var a = 0; a < this.events.length; a++)
                            for (var b = this.events[a], c = this.eventElements[a]; c; )
                                b.run(c),
                                  c = c.parent;
                        this.events = [],
                          this.eventElements = []
                    }
              }
              ,
              f
        }
        if ("undefined" != typeof Element) {
            var e, f = function(a, b, c) {
                if (null != a || null != b || null != c) {
                    "string" == typeof a && (a = document.getElementById(a)),
                    null != a.svg && a.svg.stop();
                    var e = d(c || {});
                    1 == a.childNodes.length && "OBJECT" == a.childNodes[0].nodeName || (a.svg = e);
                    var g = a.getContext("2d");
                    "undefined" != typeof b.documentElement ? e.loadXmlDoc(g, b) : "<" == b.substr(0, 1) ? e.loadXml(g, b) : e.load(g, b)
                } else
                    for (var h = document.querySelectorAll("svg"), i = 0; i < h.length; i++) {
                        var j = h[i]
                          , k = document.createElement("canvas");
                        k.width = j.clientWidth,
                          k.height = j.clientHeight,
                          j.parentNode.insertBefore(k, j),
                          j.parentNode.removeChild(j);
                        var l = document.createElement("div");
                        l.appendChild(j),
                          f(k, l.innerHTML)
                    }
            };
            "undefined" != typeof Element.prototype.matches ? e = function(a, b) {
                return a.matches(b)
            }
              : "undefined" != typeof Element.prototype.webkitMatchesSelector ? e = function(a, b) {
                return a.webkitMatchesSelector(b)
            }
              : "undefined" != typeof Element.prototype.mozMatchesSelector ? e = function(a, b) {
                return a.mozMatchesSelector(b)
            }
              : "undefined" != typeof Element.prototype.msMatchesSelector ? e = function(a, b) {
                return a.msMatchesSelector(b)
            }
              : "undefined" != typeof Element.prototype.oMatchesSelector ? e = function(a, b) {
                return a.oMatchesSelector(b)
            }
              : ("function" != typeof jQuery && "function" != typeof Zepto || (e = function(a, b) {
                  return $(a).is(b)
              }
            ),
            "undefined" == typeof e && (e = Sizzle.matchesSelector));
            var g = /(\[[^\]]+\])/g
              , h = /(#[^\s\+>~\.\[:]+)/g
              , j = /(\.[^\s\+>~\.\[:]+)/g
              , k = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi
              , l = /(:[\w-]+\([^\)]*\))/gi
              , m = /(:[^\s\+>~\.\[:]+)/g
              , n = /([^\s\+>~\.\[:]+)/g;
            return "undefined" != typeof CanvasRenderingContext2D && (CanvasRenderingContext2D.prototype.drawSvg = function(a, b, c, d, e, g) {
                  var h = {
                      ignoreMouse: !0,
                      ignoreAnimation: !0,
                      ignoreDimensions: !0,
                      ignoreClear: !0,
                      offsetX: b,
                      offsetY: c,
                      scaleWidth: d,
                      scaleHeight: e
                  };
                  for (var i in g)
                      g.hasOwnProperty(i) && (h[i] = g[i]);
                  f(this.canvas, a, h)
              }
            ),
              f
        }
    }),
    function(a) {
        "use strict";
        function b(a, b) {
            var c = document.createElement("canvas");
            c.width = a,
              c.height = b;
            var d = a - 1
              , e = b - 1
              , f = c.getContext("2d");
            try {
                f.fillStyle = "rgb(1,1,1)",
                  f.fillRect(d, e, 1, 1);
                var g = f.getImageData(d, e, 1, 1).data;
                if (1 !== g[0] || 1 !== g[1] || 1 !== g[2])
                    return !1
            } catch (h) {
                return !1
            }
            return !0
        }
        function c(a, b) {
            var c = f(b)
              , d = g.rect({
                x: -c.left,
                y: -c.top,
                width: c.left + c.right,
                height: c.top + c.bottom
            });
            if (b.width && b.height) {
                var e = a.width + c.left + c.right
                  , h = a.height + c.top + c.bottom;
                d.scale(e / b.width, h / b.height)
            }
            return g.Rect(a).moveAndExpand(d)
        }
        function d(a) {
            var b = 1;
            if (void 0 !== a && (b = parseFloat(a),
              !Number.isFinite(b) || 0 === b))
                throw new Error("dia.Paper: invalid raster size (" + a + ")");
            return b
        }
        function e(a, b) {
            return {
                width: Math.max(Math.round(a.width * b), 1),
                height: Math.max(Math.round(a.height * b), 1)
            }
        }
        function f(b) {
            var c = a.util.normalizeSides(b.padding);
            return b.width && b.height && (c.left + c.right >= b.width && (c.left = c.right = 0),
            c.top + c.bottom >= b.height && (c.top = c.bottom = 0)),
              c
        }
        function h(a) {
            return a.replace(/\<image[^>]*>/g, function(a) {
                var b = a.match(/href="([^"]*)"/)
                  , c = b && b[1]
                  , d = "data:image/svg+xml";
                if (c && c.substr(0, d.length) === d) {
                    var e = atob(c.substr(c.indexOf(",") + 1));
                    return e.substr(e.indexOf("<svg"))
                }
                return a
            })
        }
        a.dia.Paper.prototype.toDataURL = function(f, g) {
            if ("function" != typeof this.toSVG)
                throw new Error("The joint.format.svg.js plugin must be loaded.");
            g = g || {};
            var i = g.area || this.paperToLocalRect(this.getContentBBox())
              , j = c(i, g)
              , k = a.util.isNumber(g.width) && a.util.isNumber(g.height) ? g : j
              , l = e(k, d(g.size));
            if (!b(l.width, l.height))
                throw new Error("dia.Paper: raster size exceeded.");
            var m, n = new Image;
            n.onload = function() {
                function b() {
                    j = document.createElement("canvas"),
                      j.width = l.width,
                      j.height = l.height,
                      i = j.getContext("2d"),
                      i.fillStyle = g.backgroundColor || "white",
                      i.fillRect(0, 0, l.width, l.height)
                }
                function c() {
                    e = j.toDataURL(g.type, g.quality),
                      f(e),
                      d()
                }
                function d() {
                    j.svg && a.util.isFunction(j.svg.stop) && setTimeout(j.svg.stop, 1)
                }
                var e, i, j;
                b();
                try {
                    i.drawImage(n, 0, 0, l.width, l.height),
                      c()
                } catch (k) {
                    if ("undefined" == typeof canvg)
                        return void console.error("Canvas tainted. Canvg library required.");
                    b();
                    var o = {
                        ignoreDimensions: !0,
                        ignoreClear: !0,
                        ignoreMouse: !0,
                        ignoreAnimation: !0,
                        offsetX: 0,
                        offsetY: 0,
                        useCORS: !0
                    };
                    canvg(j, m, a.util.assign(o, {
                        forceRedraw: function() {
                            return !this.called && (this.called = !0,
                                !0)
                        }
                          .bind({
                              called: !1
                          }),
                        renderCallback: function() {
                            try {
                                c()
                            } catch (e) {
                                d(),
                                  m = h(m),
                                  b(),
                                  canvg(j, m, a.util.assign(o, {
                                      renderCallback: c
                                  }))
                            }
                        }
                    }))
                }
            }
              ,
              this.toSVG(function(a) {
                  m = a,
                    n.src = "data:image/svg+xml," + encodeURIComponent(a)
              }, {
                  convertImagesToDataUris: !0,
                  area: j,
                  useComputedStyles: g.useComputedStyles,
                  stylesheet: g.stylesheet,
                  preserveDimensions: {
                      width: l.width,
                      height: l.height
                  }
              })
        }
          ,
          a.dia.Paper.prototype.toPNG = function(a, b) {
              b = b || {},
                b.type = "image/png",
                this.toDataURL(a, b)
          }
          ,
          a.dia.Paper.prototype.toJPEG = function(a, b) {
              b = b || {},
                b.type = "image/jpeg",
                this.toDataURL(a, b)
          }
          ,
          a.dia.Paper.prototype.openAsPNG = function(b) {
              var c = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
                , d = a.util.uniqueId("png_output");
              this.toPNG(function(a) {
                  var b = window.open("", d, c);
                  b.document.write('<img src="' + a + '"/>')
              }, a.util.assign({
                  padding: 10
              }, b))
          }
    }(joint);


  /**
   * @name
   * @desc 构建主画布区
   */
  !function(a, b, c) {
        var d = 200
          , e = 200;
        c.dia.Paper.prototype.print = function(b) {
            var c, d = j(b), e = m.call(this, d), f = [], g = a(document.body);
            if (d.poster)
                for (var h = o(e, d.poster), i = n(e, h), k = 0; k < i.length; k++)
                    c = this.preparePrintArea(i[k], d),
                      f.push(c.$el);
            else
                c = this.preparePrintArea(e, d),
                  f.push(c.$el);
            c && l(c.css, d),
              d.ready(f, function(c) {
                  if (c) {
                      g.addClass("joint-print");
                      var d = this.$el.children().detach();
                      c.forEach(function(a) {
                          a.removeClass("preview").addClass("print-ready"),
                            a.prependTo(document.body)
                      });
                      var e = !1
                        , f = function() {
                          e || (e = !0,
                            g.removeClass("joint-print"),
                            c.forEach(function(a) {
                                a.remove()
                            }),
                            this.$el.append(d),
                            this.trigger("afterprint", b),
                            a(window).off("afterprint", f))
                      }
                        .bind(this);
                      a(window).one("afterprint", f),
                        setTimeout(f, 200),
                        window.print()
                  }
              }
                .bind(this))
        }
          ,
          c.dia.Paper.prototype.preparePrintArea = function(c, d) {
              this.trigger("beforeprint", d);
              var e = a("<div/>").addClass("printarea");
              d.size && e.addClass("printarea-size-" + d.size);
              var f = this.scale();
              this.scale(1);
              var g = this.$el.clone().appendTo(e)
                , h = i(this.getArea(), c, d)
                , j = h.rect
                , k = h.scaleToFit;
              g.css({
                  left: 0,
                  top: 0,
                  width: "200%",
                  height: "200%"
              }),
                b(g.find("svg")[0]).attr({
                    width: j.width,
                    height: j.height,
                    viewBox: [j.x, j.y, j.width, j.height].join(" ")
                });
              var l = this.options.gridSize;
              if (l > 1) {
                  var m = e.find(".joint-paper-grid");
                  m.css({
                      transform: ["translate(", -j.x % l, "px, ", -j.y % l, "px)"].join("")
                  })
              }
              return this.scale(f.sx, f.sy),
                e.addClass("preview"),
              {
                  $el: e,
                  css: {
                      width: j.width + "px",
                      height: j.height + "px",
                      transform: "scale(" + k + ")",
                      "transform-origin": "0 0"
                  }
              }
          }
        ;


        var f = function(a) {
            return Object.keys(a).map(function(b) {
                  return b + ":" + a[b]
              }).join(";") + ";"
        }
          , h = function(a, b) {
            var c = p.toPx(b.left + b.right, b.unit)
              , d = p.toPx(b.top + b.bottom, b.unit);
            return {
                width: Math.max(p.toPx(a.width, a.unit) - c, 1),
                height: Math.max(p.toPx(a.height, a.unit) - d, 1)
            }
        }
          , i = function(a, b, d) {
            var e = g.Rect({
                x: b.x - a.x,
                y: b.y - a.y,
                width: b.width,
                height: b.height
            })
              , f = c.util.normalizeSides(d.margin)
              , i = d.sheet;
            f.unit = d.marginUnit,
              i.unit = d.sheetUnit;
            var j, k = h(i, f), l = e.width / e.height, m = k.width / k.height;
            return j = l > m ? k.width / e.width : k.height / e.height,
            {
                rect: e,
                scaleToFit: j
            }
        }
          , j = function(a) {
            var b = c.util.defaultsDeep({}, a, {
                area: null,
                poster: !1,
                sheet: {
                    width: 210,
                    height: 297
                },
                sheetUnit: "mm",
                ready: function(a, b) {
                    b(a)
                },
                margin: .4,
                marginUnit: "in",
                padding: 5
            });
            return b.area || (b.printingAll = !0),
              b
        }
          , k = function(b) {
            var c = a("#print-styles")
              , d = '<style type="text/css" id="print-styles">' + b + "</style>";
            c.length ? c.html(b) : a("head").append(d)
        }
          , l = function(a, b) {
            var d = f(a)
              , e = c.util.normalizeSides(b.margin)
              , g = b.marginUnit
              , h = [e.top + g, e.right + g, e.bottom + g, e.left + g].join(" ")
              , i = b.sheet.width > b.sheet.height ? "landscape" : "portrait"
              , j = ["@media print {", ".printarea.print-ready {", d, "}", "@page {", "margin:" + h + ";", "size:" + i + ";", "}", "}", ".printarea.preview {", d, "}"];
            k(j.join(""))
        }
          , m = function(a) {
            var b = a.area;
            if (!b) {
                var d = c.util.normalizeSides(a.padding);
                b = this.getContentArea().moveAndExpand({
                    x: -d.left,
                    y: -d.top,
                    width: d.left + d.right,
                    height: d.top + d.bottom
                })
            }
            return b
        }
          , n = function(a, b) {
            for (var c, f = b.width, h = b.height, i = [], j = 0, k = 0, l = 0, m = 0; j < a.height; ) {
                for (; k < a.width && (c = g.Rect(a.x + k, a.y + j, f, h),
                  i.push(c),
                  k += f,
                  !(m > e)); )
                    m++;
                if (k = 0,
                    m = 0,
                    j += h,
                  l > d)
                    break;
                l++
            }
            return i.reverse()
        }
          , o = function(a, b) {
            var c = {
                width: b.width,
                height: b.height
            };
            return c.width || (c.width = Math.ceil(a.width / (b.columns || 1))),
            c.height || (c.height = Math.ceil(a.height / (b.rows || 1))),
              c
        }
          , p = {
            supportedUnits: {
                px: function(a) {
                    return a
                },
                mm: function(a) {
                    return this.millimeterSize * a
                },
                cm: function(a) {
                    return this.millimeterSize * a * 10
                },
                "in": function(a) {
                    return this.millimeterSize * a * 25.4
                },
                pt: function(a) {
                    return this.millimeterSize * (25.4 * a / 72)
                },
                pc: function(a) {
                    return this.millimeterSize * (25.4 * a / 6)
                }
            },
            measureMillimeter: function() {
                var b = a("<div/>").css({
                    display: "inline-block",
                    position: "absolute",
                    left: -5e3,
                    width: "1mm",
                    height: "1mm"
                }).appendTo(document.body)
                  , c = b.width();
                return b.remove(),
                  c
            },
            toPx: function(a, b) {
                if (this.millimeterSize || (this.millimeterSize = this.measureMillimeter()),
                    b = (b || "").toLowerCase(),
                    !this.supportedUnits[b])
                    throw new Error("Unsupportted unit " + b);
                return this.supportedUnits[b].call(this, a)
            }
        }
    }($, V, joint);






  if ("object" == typeof exports)
      var WebSocketServer = require("ws").Server
        , WebSocket = require("ws")
        , url = require("url");
  WebSocket = WebSocket || "undefined" != typeof window && window.WebSocket,
    joint.com = joint.com || {},
    joint.com.Channel = function(a) {
        if (this.options = a,
          !this.options || !this.options.graph)
            throw new Error("Channel: missing a graph.");
        this.options.ttl = this.options.ttl || 60,
          this.options.healthCheckInterval = this.options.healthCheckInterval || 36e5,
          this.options.reconnectInterval = this.options.reconnectInterval || 1e4,
          this.options.serverShouldSendGraph = void 0 === this.options.serverShouldSendGraph || this.options.serverShouldSendGraph,
          this._isClient = !!this.options.url,
          this._clients = [],
          this.messageQueue = [],
          this.id = this.options.id || (this._isClient ? "c_" : "s_") + joint.util.uuid(),
          this.state = {},
          this.state[this.id] = 0,
          this.sites = {},
          this.sites[this.id] = {
              socket: void 0,
              outgoing: [],
              ttl: this.options.ttl
          },
          this.initialize()
    }
    ,
    joint.util.assign(joint.com.Channel.prototype, Backbone.Events),
    joint.com.Channel.prototype.initialize = function() {
        this.options.graph.on("all", this.onGraphChange.bind(this)),
          this._isClient ? this.connectClient() : this.options.port && (this.server = new WebSocketServer({
              port: this.options.port
          }),
            this.server.on("connection", this.onConnection.bind(this))),
        this._isClient || (this._healthCheckInterval = setInterval(this.healthCheck.bind(this), this.options.healthCheckInterval))
    }
    ,
    joint.com.Channel.prototype.connectClient = function() {
        var a = this.options.url + "/?channelId=" + this.id + "&state=" + JSON.stringify(this.state) + (this.options.query ? "&query=" + JSON.stringify(this.options.query) : "");
        this.options.debugLevel > 0 && this.log("connectClient", a);
        var b = new WebSocket(a);
        b.onopen = this.onConnection.bind(this, b),
          b.onclose = this.onClose.bind(this, b)
    }
    ,
    joint.com.Channel.prototype.close = function() {
        this._reconnectTimeout && clearTimeout(this._reconnectTimeout),
        this._healthCheckInterval && clearInterval(this._healthCheckInterval),
          this._closed = !0,
          joint.util.forIn(this.sites, function(a) {
              a.socket && a.socket.close()
          }),
        this.server && this.server.close()
    }
    ,
    joint.com.Channel.prototype.healthCheck = function() {
        if (this.options.debugLevel > 0) {
            var a = Object.keys(this.sites).reduce(function(a, b) {
                return a[b] = this[b].ttl,
                  a
            }
              .bind(this.sites), {});
            this.log("healthCheck", a)
        }
        joint.util.forIn(this.sites, function(a, b) {
            b !== this.id && (a.socket && 1 === a.socket.readyState ? a.ttl = this.options.ttl : a.ttl -= 1,
            a.ttl <= 0 && (this.sites = joint.util.omit(this.sites, b),
              this.state = joint.util.omit(this.state, b)))
        }
          .bind(this))
    }
    ,
    joint.com.Channel.prototype.onConnection = function(a) {
        if (this._clients.push(a),
            this.trigger("open", a),
            this._isClient)
            this.sites[this.id].socket = a,
              a.onmessage = function(b) {
                  this.onMessage(a, b.data)
              }
                .bind(this);
        else {
            var b = url.parse(a.upgradeReq.url, !0)
              , c = b.query.channelId;
            if (this.sites[c])
                this.sites[c].socket = a;
            else if (this.debugLevel > 1 && this.log("new_site", c),
                this.sites[c] = {
                    socket: a,
                    outgoing: [],
                    ttl: this.options.ttl
                },
                this.state[c] = 0,
                this.options.serverShouldSendGraph) {
                var d = {
                    channelId: this.id,
                    state: JSON.parse(JSON.stringify(this.state)),
                    action: "graph",
                    graph: this.options.graph.toJSON()
                };
                this.messageQueue.push({
                    type: "op",
                    data: d,
                    source: this.id,
                    target: [c]
                }),
                  this.send()
            }
            a.on("message", this.onMessage.bind(this, a)),
              a.on("close", this.onClose.bind(this, a))
        }
    }
    ,
    joint.com.Channel.prototype.onClose = function(a) {
        var b = this._clients.indexOf(a);
        b !== -1 && this._clients.splice(b, 1),
        this._isClient && !this._closed && (this._reconnectTimeout && clearTimeout(this._reconnectTimeout),
          this._reconnectTimeout = setTimeout(this.connectClient.bind(this), this.options.reconnectInterval)),
          this.trigger("close", a)
    }
    ,
    joint.com.Channel.prototype.onMessage = function(a, b) {
        this.trigger("message:received", b),
        this.options.debugLevel > 1 && this.log("message", b);
        try {
            b = JSON.parse(b)
        } catch (c) {
            return console.error("Channel: message parsing failed.", c)
        }
        if ("notification" == b.type)
            return this.trigger(b.data.event, b.data.data),
              this.sendNotification(b);
        var d, e, f = b.data;
        this._isClient ? (d = this.sites[this.id],
          f = this.receive(d, this.id, f)) : (e = this.sites[f.channelId],
          f = this.receive(e, f.channelId, f),
          d = this.sites[this.id],
          f = this.receive(d, this.id, f)),
          "graph" === f.action ? this.state[f.channelId] = f.state[f.channelId] : this.state[f.channelId] = (this.state[f.channelId] || 0) + 1,
        this.options.debugLevel > 1 && this.log("new state", this.state),
          this.execute(f),
          joint.util.forIn(this.sites, function(a, b) {
              b !== this.id && b !== f.channelId && this.receive(a, b, f)
          }
            .bind(this)),
        this._isClient || (b.op = f,
          this.messageQueue.push(b),
          this.broadcast(b)),
          this.trigger("message:processed", b)
    }
    ,
    joint.com.Channel.prototype.receive = function(a, b, c) {
        if (!a)
            return c;
        this.options.debugLevel > 1 && this.log("receive", b, c),
        this.options.debugLevel > 1 && this.log("outgoing", a.outgoing),
          a.outgoing = a.outgoing.filter(function(a) {
              return a.state[a.channelId] >= (c.state[a.channelId] || 0)
          }),
        this.options.debugLevel > 1 && this.log("outgoing.length", a.outgoing.length);
        for (var d = 0; d < a.outgoing.length; d++) {
            var e = a.outgoing[d]
              , f = this.transform(c, e);
            c = f[0],
              a.outgoing[d] = f[1]
        }
        return c
    }
    ,
    joint.com.Channel.prototype.transform = function(a, b) {
        return this.options.debugLevel > 1 && this.log("transform", a, b),
        "change:target" === a.action && "remove" === b.action && a.cell.target.id === b.cell.id && (a.cell.target = {
            x: 0,
            y: 0
        }),
        "change:source" === a.action && "remove" === b.action && a.cell.source.id === b.cell.id && (a.cell.source = {
            x: 0,
            y: 0
        }),
          [a, b]
    }
    ,
    joint.com.Channel.prototype.execute = function(a) {
        var b;
        switch (a.action) {
            case "add":
                this.options.graph.addCell(a.cell, {
                    remote: !0
                });
                break;
            case "remove":
                b = this.options.graph.getCell(a.cell.id),
                b && b.remove({
                    remote: !0,
                    disconnectLinks: !0
                });
                break;
            case "graph":
                this.options.graph.fromJSON(a.graph);
                break;
            default:
                var c = a.action.substr("change:".length);
                b = this.options.graph.getCell(a.cell.id),
                b && b.set(c, a.cell[c], {
                    remote: !0
                })
        }
    }
    ,
    joint.com.Channel.prototype.broadcast = function(a) {
        this._isClient ? a.target = Object.keys(this.sites) : a.target = Object.keys(joint.util.omit(this.sites, this.id, a.source)),
          this.send()
    }
    ,
    joint.com.Channel.prototype.send = function() {
        if (!this._paused) {
            for (var a = [], b = 0; b < this.messageQueue.length; b++) {
                var c = this.messageQueue[b];
                this.sendMessage(c) && a.push(b)
            }
            a.forEach(function(a) {
                this.messageQueue.splice(a, 1)
            }, this)
        }
    }
    ,
    joint.com.Channel.prototype.sendMessage = function(a) {
        this.debugLevel > 1 && this.log("sendMessage", a);
        var b = [];
        return a.target.forEach(function(c, d) {
            var e = this.sites[c];
            return e ? void (e.socket && 1 === e.socket.readyState && (this.debugLevel > 1 && this.log("sendMessage", c, a),
              e.socket.send(JSON.stringify(a)),
              b.push(d))) : b.push(d)
        }, this),
          b.forEach(function(b) {
              a.target.splice(b, 1)
          }),
          !a.target.length
    }
    ,
    joint.com.Channel.prototype.log = function(a, b) {
        var c = "Channel [" + this.id + "] " + a.toUpperCase() + ": ";
        console.log.apply(console, [c].concat(Array.prototype.slice.call(arguments, 1)))
    }
    ,
    joint.com.Channel.prototype.pause = function() {
        this._paused = !0
    }
    ,
    joint.com.Channel.prototype.unpause = function() {
        this._paused = !1,
          this.send()
    }
    ,
    joint.com.Channel.prototype.notify = function(a, b) {
        var c = {
            type: "notification",
            source: this.id,
            data: {
                event: a,
                data: b
            }
        };
        this.sendNotification(c)
    }
    ,
    joint.com.Channel.prototype.sendNotification = function(a) {
        this._isClient ? a.target = Object.keys(this.sites) : a.target = Object.keys(joint.util.omit(this.sites, this.id, a.source)),
          this.sendMessage(a)
    }
    ,
    joint.com.Channel.prototype.onGraphChange = function(a, b, c, d) {
        if (!d || !d.remote) {
            var e = "add" === a || "remove" === a || "change:" === a.substr(0, "change:".length);
            if (e) {
                var f = {
                    channelId: this.id,
                    state: JSON.parse(JSON.stringify(this.state)),
                    action: a,
                    cell: b.toJSON()
                }
                  , g = {
                    type: "op",
                    data: f,
                    source: this.id
                };
                this.options.debugLevel > 1 && this.log("generate", g),
                  this.messageQueue.push(g),
                  this.broadcast(g),
                  this.sites[this.id].outgoing.push(f),
                  this.state[this.id]++
            }
        }
    }
    ,
    joint.com.ChannelHub = function(a) {
        if (this.options = a,
            !this.options.port)
            throw new Error("ChannelHub: missing a port.");
        this.initialize()
    }
    ,
    joint.util.assign(joint.com.ChannelHub.prototype, Backbone.Events),
    joint.com.ChannelHub.prototype.initialize = function() {
        this.server = new WebSocketServer({
            port: this.options.port
        }),
          this.server.on("connection", this.onConnection.bind(this))
    }
    ,
    joint.com.ChannelHub.prototype.onConnection = function(a) {
        var b = url.parse(a.upgradeReq.url, !0)
          , c = {
            query: b.query
        };
        if (!this.router)
            throw new Error("ChannelHub: missing a router.");
        var d = !1
          , e = this.router(c, function(b, c) {
            if (b)
                throw new Error(b);
            c && !d && (c.onConnection(a),
              d = !0)
        });
        e instanceof joint.com.Channel && (e.onConnection(a),
          d = !0)
    }
    ,
    joint.com.ChannelHub.prototype.route = function(a) {
        this.router = a
    }
    ,
    joint.com.ChannelHub.prototype.close = function() {
        this.server.close()
    }
  ;



    joint.alg = joint.alg || {},
      joint.alg.Dijkstra = function(a, b, c) {
          c = c || function(a, b) {
                return 1
            }
          ;
          var d = {};
          d[b] = 0;
          var e = {}
            , f = new joint.alg.PriorityQueue;
          for (var g in a)
              g !== b && (d[g] = 1 / 0),
                f.insert(d[g], g, g);
          for (var h, i, j, k, l = {}; !f.isEmpty(); )
              for (h = f.remove(),
                     l[h] = !0,
                     i = a[h] || [],
                     j = 0; j < i.length; j++)
                  g = i[j],
                  l[g] || (k = d[h] + c(h, g),
                  k < d[g] && (d[g] = k,
                    e[g] = h,
                    f.updatePriority(g, k)));
          return e
      }
    ;
    joint.alg = joint.alg || {},
      joint.alg.PriorityQueue = function(a) {
          a = a || {},
            this.comparator = a.comparator || function(a, b) {
                  return a - b
              }
            ,
            this.index = {},
            this.data = a.data || [],
            this.heapify()
      }
      ,
      joint.alg.PriorityQueue.prototype.isEmpty = function() {
          return 0 === this.data.length
      }
      ,
      joint.alg.PriorityQueue.prototype.insert = function(a, b, c) {
          var d = {
              priority: a,
              value: b
          };
          this.data.push(d);
          var e = this.data.length - 1;
          c && (d.id = c,
            this.index[c] = e),
            this.bubbleUp(e)
      }
      ,
      joint.alg.PriorityQueue.prototype.peek = function() {
          return this.data[0] && this.data[0].value
      }
      ,
      joint.alg.PriorityQueue.prototype.peekPriority = function() {
          return this.data[0] && this.data[0].priority
      }
      ,
      joint.alg.PriorityQueue.prototype.updatePriority = function(a, b) {
          var c = this.index[a];
          if (null === c || "undefined" == typeof c)
              throw new Error("Node with id " + a + " was not found in the heap.");
          var d = this.data
            , e = d[c].priority
            , f = this.comparator(b, e);
          f < 0 ? (d[c].priority = b,
            this.bubbleUp(c)) : f > 0 && (d[c].priority = b,
            this.bubbleDown(c))
      }
      ,
      joint.alg.PriorityQueue.prototype.remove = function() {
          var a = this.data
            , b = a[0]
            , c = a.pop();
          return this.index[a.length] = null,
          a.length > 0 && (a[0] = c,
          c.id && (this.index[c.id] = 0),
            this.bubbleDown(0)),
          b && b.value
      }
      ,
      joint.alg.PriorityQueue.prototype.heapify = function() {
          for (var a = 0; a < this.data.length; a++)
              this.bubbleUp(a)
      }
      ,
      joint.alg.PriorityQueue.prototype.bubbleUp = function(a) {
          for (var b, c, d = this.data; a > 0 && (b = a - 1 >>> 1,
          this.comparator(d[a].priority, d[b].priority) < 0); )
              c = d[b],
                d[b] = d[a],
              d[a].id && (this.index[d[a].id] = b),
                d[a] = c,
              d[a].id && (this.index[d[a].id] = a),
                a = b
      }
      ,
      joint.alg.PriorityQueue.prototype.bubbleDown = function(a) {
          for (var b = this.data, c = b.length - 1; ; ) {
              var d = (a << 1) + 1
                , e = d + 1
                , f = a;
              if (d <= c && this.comparator(b[d].priority, b[f].priority) < 0 && (f = d),
                e <= c && this.comparator(b[e].priority, b[f].priority) < 0 && (f = e),
                f === a)
                  break;
              var g = b[f];
              b[f] = b[a],
              b[a].id && (this.index[b[a].id] = f),
                b[a] = g,
              b[a].id && (this.index[b[a].id] = a),
                a = f
          }
      }
    ;
    joint.storage = joint.storage || {},
      joint.storage.Local = {
          prefix: "joint.storage",
          insert: function(a, b, c) {
              var d = b.id || joint.util.uuid()
                , e = this.loadIndex(a);
              e.keys.indexOf(d) === -1 && e.keys.push(d),
                this.setItem(this.docKey(a, d), b),
                this.setItem(this.indexKey(a), e),
                this.callback(c, null, joint.util.assign({}, b, {
                    id: d
                }))
          },
          find: function(a, b, c) {
              var d = this.loadIndex(a)
                , e = [];
              if (joint.util.isEmpty(b))
                  d.keys.forEach(function(b) {
                      var d = this.getItem(this.docKey(a, b));
                      d || this.callback(c, new Error("Storage incosistency. No document found for an ID " + b + " from index.")),
                        e.push(d)
                  }, this),
                    this.callback(c, null, e);
              else if (b.id) {
                  var f = this.getItem(this.docKey(a, b.id));
                  this.callback(c, null, f ? [f] : [])
              } else
                  this.callback(c, null, [])
          },
          remove: function(a, b, c) {
              var d = this.loadIndex(a);
              joint.util.isEmpty(b) ? (d.keys.forEach(function(b) {
                  localStorage.removeItem(this.docKey(a, b))
              }, this),
                localStorage.removeItem(this.indexKey(a)),
                this.callback(c, null)) : b.id && (d.keys = d.keys.filter(function(a) {
                  return a !== b.id
              }),
                localStorage.removeItem(this.docKey(a, b.id)),
                this.setItem(this.indexKey(a), d),
                this.callback(c, null))
          },
          callback: function(a, b, c) {
              a && setTimeout(function() {
                  a(b, c)
              }, 1)
          },
          setItem: function(a, b) {
              localStorage.setItem(a, JSON.stringify(b))
          },
          getItem: function(a) {
              var b = localStorage.getItem(a);
              return b ? JSON.parse(b) : b
          },
          loadIndex: function(a) {
              var b = this.getItem(this.indexKey(a)) || {};
              return b.keys = b.keys || [],
                b
          },
          docKey: function(a, b) {
              return this.prefix + "." + a + ".docs." + b
          },
          indexKey: function(a) {
              return this.prefix + "." + a + ".index"
          }
      };

    joint.g = g;
    joint.V = joint.Vectorizer = V;

    return joint;

}));
