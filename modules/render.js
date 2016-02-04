/**
 * co-views
 *
 * @author victor li
 * @date 2016/02/01
 */

const views = require('co-views');

module.exports = views('views', {
    //'map': {'html': 'jade'},
    default: 'jade',
    map: {jade: 'jade'}
});
