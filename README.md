# CsrfHeaderExtraction

When interacting with a server that enables CSRF via cookies (spring, django,
etc.) we need a way to send the CSRF token provided by the server in all
subsequent requests. Paw's [response
cookies](https://paw.cloud/docs/dynamic-values/cookies#Response_Cookies) don't
quite work because they parse the entire cookie, name and all. We only want to
return the _value_ of the cookie to the server in subsequent requests.

Add a header to your request object in Paw with the CSRF header name expected by
your server implementation (for example, spring security uses `X-Xsrf-Token`.)
Set a dynamic value `CSRF Cookie Extraction` to point to another request which
received the `Set-Cookie` header, and set the `Set-Cookie: {CSRF-COOKIE-NAME}`
option from the dropdown menu (for example, spring security uses `XSRF-TOKEN`).

```
GET / -> 401, Set-Cookie: XSRF-TOKEN=abc123; Path=/
POST /login Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l, X-Xsrf-Token: abc123 -> 200
```

![login example](/login-example.png?raw=true)

## Installation

manual:
```
cp -r /path/to/Paw-CsrfCookieExtraction/com.lwhorton.CsrfCookieExtraction ~/Library/Containers/com.luckymarmot.Paw/Data/Library/"Application Support"/com.luckymarmot.Paw/Extensions/
```
