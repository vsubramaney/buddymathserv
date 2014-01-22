/**
 * Created by vsubramaney on 1/22/14.
 */


exports.addNumericIdentifier = function(problems, pageNo) {
    if ( (typeof(pageNo) == 'undefined') ||(pageNo == 0)) {
        pageNo = 1;
    }
    for (i=0; i< problems.length; i++){
        problems[i].id = pageNo++;
    }
    return problems;
}