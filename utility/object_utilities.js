const supported_sort_attr = {DATE_asc: 'date', DATE_dsc: '-date', DATETIME_asc: 'datetime', DATETIME_dsc: '-datetime'},
SORT_BY = 'sort_by',
endpoints = {SHOWS: 'shows', DATES: 'dates'};
/**
 * This function returns an array of a given object's own enumerable properties.
 * @param {Object} obj: The object whose enumerable own properties are to be returned.
 *  @example
 * // returns ['0', '1', '2']
 * get_all_keys(['a', 'b', 'c']);
 *  @example
 * // returns [ '2', '7', '100' ]
 * get_all_keys({ 100: 'a', 2: 'b', 7: 'c' });
 */
function get_all_keys(obj){
    var r = []
    for (var k in obj) {
        if (!obj.hasOwnProperty(k)) 
            continue
        r.push(k)
    }
    return r;
  }

/**
 * This function returns an array of a given object's own enumerable property values.
 * @param {Object} obj: The object whose enumerable own property values are to be returned.
 *  @example
 * // returns ['bar', 42]
 * get_all_values({ foo: 'bar', baz: 42 });
 *  @example
 * // returns ['b', 'c', 'a']
 * get_all_values({ 100: 'a', 2: 'b', 7: 'c' });
 */

function get_all_values(obj){
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
  }

/**
 * This function returns filter_query and sort_query for shows and dates endpoint.
 * @param {Object} query: The object contains filter query and sort_query
 * @param {String} endpoint: The String contains the name of the endpoint, like 'dates' or 'shows'
 *  @example
 * // returns [{promo_code: promo1}, {date: 1}]
 * get_sort_by_params({promo_code: 'promo1', sort_by: ['date']});
 */
function get_sort_by_params(query, endpoint) {
    var sort_query = {};
    if(query !== null && typeof query === 'object') {  
      if(query.hasOwnProperty(SORT_BY)){
           for(key in query[SORT_BY]) {
                var attr = query[SORT_BY][key].toLowerCase();
               if(endpoint == endpoints.DATES){
                   switch(attr) {
                        case supported_sort_attr.DATE_asc : sort_query = Object.assign(sort_query, {'date': 1});break;
                        case supported_sort_attr.DATE_dsc: sort_query = Object.assign(sort_query, {'date': -1});break;
                        default:      sort_query;          
                    }
               }
               else if(endpoint == endpoints.SHOWS){
                   switch(attr) {
                        case supported_sort_attr.DATE_asc : sort_query = Object.assign(sort_query, {'start_date': 1});break;
                        case supported_sort_attr.DATE_dsc: sort_query = Object.assign(sort_query, {'start_date': -1});break;
                        case supported_sort_attr.DATETIME_asc: sort_query = Object.assign(sort_query, {'date_time': 1});break;
                        case supported_sort_attr.DATETIME_dsc: sort_query = Object.assign(sort_query, {'date_time': -1});break;
                        default:      sort_query;          
                    }
               }
            }
          delete query[SORT_BY];
      }
  }
    return [query, sort_query];
}


module.exports = {
                  get_all_keys: get_all_keys,
                  get_all_values: get_all_values,
                  get_sort_by_params: get_sort_by_params
                };