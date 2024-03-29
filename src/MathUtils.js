/**
 * Created by Trent on 9/26/2015.
 */

var StaticMathUtils = function() {
    /**
     * Determines whether or not two 2d lines intersect and returns the intersect point
     * @param returnPoint (optional)
     * @param line1
     * @param line2
     * @returns {Boolean} whether or not the two lines intersect
     */
    this.intersectLines2D = function(returnPoint, line1, line2) {
        var x1 = line1[0][0];
        var y1 = line1[0][1];
        var x2 = line1[1][0];
        var y2 = line1[1][1];
        var x3 = line2[0][0];
        var y3 = line2[0][1];
        var x4 = line2[1][0];
        var y4 = line2[1][1];

        var d = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (d == 0) {
            return false;
        }

        var yd = y1 - y3;
        var xd = x1 - x3;
        var ua = ((x4 - x3) * yd - (y4 - y3) * xd) / d;
        if (ua < 0 || ua > 1) {
            return false;
        }

        var ub = ((x2 - x1) * yd - (y2 - y1) * xd) / d;
        if (ub < 0 || ub > 1) {
            return false;
        }

        if (returnPoint != null && returnPoint.length != 0) {
            returnPoint[0] = x1 + (x2 - x1) * ua;
            returnPoint[1] = y1 + (y2 - y1) * ua;
        }

        return true;
    };

    /**
     * Determines whether or not the given point is inside the given polygon
     * @param polygon
     * @param point
     * @returns {Boolean} whether or not the point lies inside the polygon
     */
    this.isPointInPolygon2D = function(polygon, point) {
        var j = polygon.length - 1;
        var oddNodes = false;

        for (var i = 0; i < polygon.length; i++) {
            if ((polygon[i][1] < point[1] && polygon[j][1] >= point[1]
                || polygon[j][1] < point[1] && polygon[i][1] >= point[1])
                && (polygon[i][0] <= point[0] || polygon[j][0] <= point[0])) {
                if (polygon[i][0] + (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1])
                    * (polygon[j][0] - polygon[i][0]) < point[0]) {
                    oddNodes = !oddNodes;
                }
            }
            j = i;
        }

        return oddNodes;
    };

    /**
     * Determines the closest point on the given line to the given point. The
     * closest point may be the end points.
     * @param returnPoint
     * @param line
     * @param point
     */
    this.nearestLinePoint2D = function(returnPoint, line, point) {
        var length2 = vec2.sqrDist(line[0], line[1]);
        if (length2 == 0) {
            returnPoint[0] = line[0][0];
            returnPoint[1] = line[0][1];
            return;
        }

        var t = ((point[0] - line[0][0]) * (line[1][0] - line[0][0]) + (point[1] - line[0][1]) * (line[1][1] - line[0][1])) / length2;
        if (t < 0) {
            returnPoint[0] = line[0][0];
            returnPoint[1] = line[0][1];
            return;
        }
        if (t > 1) {
            returnPoint[0] = line[1][0];
            returnPoint[1] = line[1][1];
            return;
        }

        returnPoint[0] = line[0][0] + t * (line[1][0] - line[0][0]);
        returnPoint[1] = line[0][1] + t * (line[1][1] - line[0][1]);
    };

    this.radiansBetweenTwoAngles = function(angleFrom, angleTo) {
        angleFrom = angleFrom % (Math.PI * 2);
        angleTo = angleTo % (Math.PI * 2);

        if (angleFrom < -Math.PI) {
            angleFrom = Math.PI * 2 + angleFrom;
        }
        if (angleFrom > Math.PI) {
            angleFrom = -(Math.PI * 2 - angleFrom);
        }
        if (angleTo < -Math.PI) {
            angleTo = Math.PI * 2 + angleTo;
        }
        if (angleTo > Math.PI) {
            angleTo = -(Math.PI * 2 - angleTo);
        }

        if (angleFrom > Math.PI || angleFrom < -Math.PI) {
            console.error('Error: angleFrom not in bounds of [-Math.PI, Math.PI]. angleFrom: ' + angleFrom);
        }
        if (angleTo > Math.PI || angleTo < -Math.PI) {
            console.error('Error: angleTo not in bounds of [-Math.PI, Math.PI]. angleTo: ' + angleTo);
        }

        if (angleTo < angleFrom) {
            if (angleFrom - angleTo > Math.PI) {
                return Math.PI * 2 - (angleFrom - angleTo);
            } else {
                return -(angleFrom - angleTo);
            }
        } else {
            if (angleTo - angleFrom > Math.PI) {
                return -(Math.PI * 2 - (angleTo - angleFrom));
            } else {
                return angleTo - angleFrom;
            }
        }
    };

    this.mod = function(a, n) {
        return a - Math.floor(a / n) * n;
    };
};