(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{923:function(n,e){n.exports=function(n){var e="[a-zA-Z-_][^\\n{]+\\{",a={className:"attribute",begin:/[a-zA-Z-_]+/,end:/\s*:/,excludeEnd:!0,starts:{end:";",relevance:0,contains:[{className:"variable",begin:/\.[a-zA-Z-_]+/},{className:"keyword",begin:/\(optional\)/}]}};return{aliases:["graph","instances"],case_insensitive:!0,keywords:"import",contains:[{begin:"^facet "+e,end:"}",keywords:"facet",contains:[a,n.HASH_COMMENT_MODE]},{begin:"^\\s*instance of "+e,end:"}",keywords:"name count channels instance-data instance-state instance of",illegal:/\S/,contains:["self",a,n.HASH_COMMENT_MODE]},{begin:"^"+e,end:"}",contains:[a,n.HASH_COMMENT_MODE]},n.HASH_COMMENT_MODE]}}}}]);
//# sourceMappingURL=136.bundle.js.map