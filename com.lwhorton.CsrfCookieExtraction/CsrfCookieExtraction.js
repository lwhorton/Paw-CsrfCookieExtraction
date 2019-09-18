var CsrfCookieExtraction = function() {
	this.evaluate = function(context) {
        // populate the value by extracting {csrfCookieName} from "Set-Cookie:
        // {csrfCookieName}={csrf-token}" from the provided {Source Request}'s
        // most recent exchange
        let request = context.getRequestByName(this.req.name)
        let matcher = new RegExp( this.csrfCookieName + '=(.)+;', 'i')

        let setCookieHeader = request.getLastExchange().getResponseHeaderByName("Set-Cookie") || ''

        let header = setCookieHeader.match(matcher)

        if (!header) {
            return undefined
        }

        let csrfHeader = header[0]
        let token = (csrfHeader.split('=')[1]).slice(0, -1)

        return token
	}

	this.text = function(context) {
		if(this.req !== null) {
			return this.req.name + " ➤ " + this.csrfCookieName;
		}
		return this.header;
	}
}

CsrfCookieExtraction.identifier = "com.lwhorton.CsrfCookieExtraction";

CsrfCookieExtraction.title = "CSRF Cookie Extraction";

CsrfCookieExtraction.inputs = [
	InputField("req", "Source Request", "Request"),
    InputField("csrfCookieName", "Set-Cookie: {CSRF-COOKIE-NAME}", "Select", {"choices": {"xsrf-token": "XSRF-TOKEN"}})
];

registerDynamicValueClass(CsrfCookieExtraction);
