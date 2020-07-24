/** This script works as an utility class.
 *
 *  <p>
 *      Version 1
 *  </p>
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export {getUrlParameter};