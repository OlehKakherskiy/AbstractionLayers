var requestFilterPrototype = {

	doBeforeRequestProcessing: function(req, res){},

	onOk: function(req, res, reqResult){},

	onError: function(req, res, reqResult){},
};

var AbstractRequestFilter = function(processBefore, processResolve, processError){
	if(processBefore !== undefined)
		this.doBeforeRequestProcessing = processBefore;
	if(processResolve !== undefined)
		this.onOk = processResolve;
	if(processError !== undefined)
		this.onError = processError;
}

AbstractRequestFilter.prototype = requestFilterPrototype;

module.exports = AbstractRequestFilter;
//module.exports.abstractChain = abstractChain;