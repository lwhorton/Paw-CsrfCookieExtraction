var CsrfCookieExtraction = function() {
  const xsrfCookieMatcher = new RegExp("xsrf-token" + "=([^;]+)", "i");
  const parseCsrf = req => {
    const cookieHeader = req.ex.getResponseHeaderByName("Set-Cookie");

    const csrf =
      typeof cookieHeader == "undefined"
        ? null
        : cookieHeader.match(xsrfCookieMatcher)[1];

    return Object.assign({}, req, { csrf: csrf });
  };

  this.evaluate = function(context) {
    const requests = context
      .getAllRequests()
      .map(r => ({ name: r.name, ex: r.getLastExchange() }))
      .filter(r => typeof r.ex != "undefined")
      .map(parseCsrf)
      .filter(req => req.csrf);

    if (requests.length == 0) {
      return null;
    }

    const exchDate = exch => Date.parse(exch.getResponseHeaderByName("Date"));
    const newerExchange = (a, b) => (exchDate(a.ex) > exchDate(b.ex) ? a : b);
    return requests.reduce(newerExchange).csrf;
  };

  this.text = function(context) {
    return this.header;
  };
};

CsrfCookieExtraction.identifier = "com.lwhorton.CsrfCookieExtraction";

CsrfCookieExtraction.title = "CSRF Cookie Extraction";

registerDynamicValueClass(CsrfCookieExtraction);
