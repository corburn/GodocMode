GodocMode
=========

GodocMode is a Chrome Extension to show all declarations when viewing the
standard library documentation on golang.org/pkg, not just the exported fields.
It does this by appending ?m=all to the URL.

Other presentation modes available on web pages served by godoc include:

````
all     show documentation for all declarations, not just the exported ones
methods show all embedded methods, not just those of unexported anonymous fields
src     show the original source code rather then the extracted documentation
text    present the page in textual (command-line) form rather than HTML
flat    present flat (not indented) directory listings using full paths
````

See https://godoc.org/golang.org/x/tools/cmd/godoc to learn more about godoc.

At time of writing, the [declarativeWebRequest](https://developer.chrome.com/extensions/declarativeWebRequest) API is available only to Chrome
users on the beta and dev channel.

## Why does the manifest request host permissions for all hosts instead of just golang.org/pkg?

https://code.google.com/p/chromium/issues/detail?id=255103#c2

> see http://developer.chrome.com/beta/extensions/declarativeWebRequest.html (look for "All other actions require host permissions to all URLs").
>
> We changed this recently for security purposes.

Specifying https://golang.org/* results in the following error:

> Unchecked runtime.lastError while running events.addRules: To execute the action 'declarativeWebRequest.RedirectByRegEx', you need to request host permission for all hosts.

## Wishlist

- Toggle on/off: While this could be useful for perusing, it is clutter for reference.

- Highlight interfaces: Create a interfaces section, apply colors/styling, or
in some other way differentiate the interfaces from the other types.

- localhost: support local godoc instances
