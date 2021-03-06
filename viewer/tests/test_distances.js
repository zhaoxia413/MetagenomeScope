describe("distance()", function() {
    it("Computes distance between two [x, y] points", function() {
        chai.assert.equal(distance([1, 2], [3, 4]), Math.sqrt(8));
    });
    it("Returns 0 when the two points are the same", function() {
        chai.assert.equal(distance([-1, -5], [-1, -5]), 0);
    });
    it("Can handle large-ish distances (i.e. results on the order of 1 million)", function() {
        chai.assert.approximately(
            distance([0, 0], [-12345, 10000000]),
            // generated by python3 via sqrt(12345**2 + 10000000**2)
            10000007.619948346,
            0.001 // "delta" value
        );
    });
});

describe("pointToLineDistance()", function() {
    // TODO: It'd probably be best to either figure out why the negation
    // inside pointToLineDistance works, or just check the absolute values
    // of the distances
    it("Properly computes distance from a point to a line", function() {
        // These example datasets are from
        // https://www.intmath.com/plane-analytic-geometry/perpendicular-distance-point-line.php
        // (The two points defining each line were computed by just
        // substituting x = 0 and then y = 0 to figure out the y- and
        // x-intercepts for each line.)
        var d = pointToLineDistance([5, 6], [0, -4 / 3], [2, 0]);
        chai.assert.approximately(d, 3.328, 0.001);

        var d2 = pointToLineDistance([-3, 7], [0, 2], [-5 / 3, 0]);
        chai.assert.approximately(d2, -5.506, 0.001);
    });
    it("Works properly when (0, 0) is used as the point", function() {
        // Using the same example line as in the first test case
        chai.assert.approximately(
            pointToLineDistance([0, 0], [0, -4 / 3], [2, 0]),
            1.1094,
            0.001
        );
    });
    it("Works properly when given a horizontal line", function() {
        // The line is at y = 1. First we try with a point at (2, 0)
        // (below the line).
        var d = pointToLineDistance([2, 0], [1, 1], [8, 1]);
        chai.assert.equal(d, -1);
        // Similarly, a point at (2, 2) (above the line) should be equally far
        // from the line, but in the opposite direction.
        var d2 = pointToLineDistance([2, 2], [1, 1], [8, 1]);
        chai.assert.equal(d2, 1);
    });
    it("Works properly when given a vertical line", function() {
        // The line is at x = -1. First we try with a point at (1.5, 0) (to the
        // right of the line).
        var d = pointToLineDistance([1.5, 0], [-1, -1], [-1, 6]);
        chai.assert.equal(d, -2.5);
        // Next, we try with a point at (-1.5, 0) (to the left of the line).
        var d2 = pointToLineDistance([-1.5, 0], [-1, -1], [-1, 6]);
        chai.assert.equal(d2, 0.5);
    });
    it("Throws an error if distance(linePoint1, linePoint2) is 0", function() {
        chai.assert.throws(function() {
            pointToLineDistance([1, 2], [3, 4], [3, 4]);
        }, /pointToLineDistance\(\) given a line of the same point twice/);
    });
});
