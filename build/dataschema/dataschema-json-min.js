/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("dataschema-json",function(c){var a=c.Lang,b={getPath:function(d){var g=null,f=[],e=0;if(d){d=d.replace(/\[(['"])(.*?)\1\]/g,function(i,h,j){f[e]=j;return".@"+(e++);}).replace(/\[(\d+)\]/g,function(i,h){f[e]=parseInt(h,10)|0;return".@"+(e++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(d)){g=d.split(".");for(e=g.length-1;e>=0;--e){if(g[e].charAt(0)==="@"){g[e]=f[parseInt(g[e].substr(1),10)];}}}else{}}return g;},getLocationValue:function(g,f){var e=0,d=g.length;for(;e<d;e++){if(a.isObject(f)&&(g[e] in f)){f=f[g[e]];}else{f=undefined;break;}}return f;},apply:function(g,h){var d=h,f={results:[],meta:{}};if(!a.isObject(h)){try{d=c.JSON.parse(h);}catch(i){f.error=i;return f;}}if(a.isObject(d)&&g){if(!a.isUndefined(g.resultListLocator)){f=b._parseResults.call(this,g,d,f);}if(!a.isUndefined(g.metaFields)){f=b._parseMeta(g.metaFields,d,f);}}else{f.error=new Error("JSON schema parse failure");}return f;},_parseResults:function(h,d,g){var f=[],i,e;if(h.resultListLocator){i=b.getPath(h.resultListLocator);if(i){f=b.getLocationValue(i,d);if(f===undefined){g.results=[];e=new Error("JSON results retrieval failure");}else{if(a.isArray(f)){if(a.isArray(h.resultFields)){g=b._getFieldValues.call(this,h.resultFields,f,g);}else{g.results=f;}}else{g.results=[];e=new Error("JSON Schema fields retrieval failure");}}}else{e=new Error("JSON Schema results locator failure");}if(e){g.error=e;}}return g;},_getFieldValues:function(m,r,e){var g=[],o=m.length,h,f,q,s,u,d,l=[],p=[],n=[],t,k;for(h=0;h<o;h++){q=m[h];s=q.key||q;u=b.getPath(s);if(u){if(u.length===1){l[l.length]={key:s,path:u[0]};}else{p[p.length]={key:s,path:u};}}else{}d=(a.isFunction(q.parser))?q.parser:c.Parsers[q.parser+""];if(d){n[n.length]={key:s,parser:d};}}for(h=r.length-1;h>=0;--h){k={};t=r[h];if(t){for(f=l.length-1;f>=0;--f){k[l[f].key]=c.DataSchema.Base.parse.call(this,(a.isUndefined(t[l[f].path])?t[f]:t[l[f].path]),l[f]);}for(f=p.length-1;f>=0;--f){k[p[f].key]=c.DataSchema.Base.parse.call(this,(b.getLocationValue(p[f].path,t)),p[f]);}for(f=n.length-1;f>=0;--f){s=n[f].key;k[s]=n[f].parser.call(this,k[s]);if(a.isUndefined(k[s])){k[s]=null;}}g[h]=k;}}e.results=g;return e;},_parseMeta:function(g,d,f){if(a.isObject(g)){var e,h;for(e in g){if(g.hasOwnProperty(e)){h=b.getPath(g[e]);if(h&&d){f.meta[e]=b.getLocationValue(h,d);}}}}else{f.error=new Error("JSON meta data retrieval failure");}return f;}};c.DataSchema.JSON=c.mix(b,c.DataSchema.Base);},"3.2.0",{requires:["json","dataschema-base"]});