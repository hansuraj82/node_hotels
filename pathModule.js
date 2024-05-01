const path = require('path');
 const b = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
 console.log(b);
 const c = path.extname(__filename);
 console.log(__filename, c);