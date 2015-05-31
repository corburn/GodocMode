// The MIT License (MIT)
//
// Copyright (c) 2015 Jason Travis
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeWebRequest.onRequest.removeRules(null, function() {
        // With a new rule ...
        chrome.declarativeWebRequest.onRequest.addRules([{
            // That fires when a page's URL matches 'golang.org/pkg/*' ...
            conditions: [
                new chrome.declarativeWebRequest.RequestMatcher({
                    url: {
                        hostEquals: 'golang.org',
                        pathPrefix: '/pkg/'
                    },
                    resourceType: ['main_frame'],
                    stages: ['onBeforeRequest']
                }),
            ],
            // And append the URL parameter '?m=all' to show the documentation
            // for all, not just exported, declarations.
            // See: https://godoc.org/golang.org/x/tools/cmd/godoc
            actions: [
                // FIXME: Adds parameter to to the root /pkg/ path
                // FIXME: Does not add parameter to anchored paths
                // eg /pkg/foo#bar
                new chrome.declarativeWebRequest.RedirectByRegEx({
                    from: '(.*/$)',
                    to: '$1?m=all'
                })
            ]
        }]);
    });
});

