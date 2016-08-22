
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global);
    } else {
        global.Circle = factory(global);
    }
})(this, function(self) {

    function Circle() {
        var PI = Math.PI;
        var area = function (r) {
            console.log(PI * r * r);
            return PI * r * r;
        };
        var circumference = function (r) {
            console.log(2 * PI * r);
            return 2 * PI * r;
        };
    }
    return Circle;
});
